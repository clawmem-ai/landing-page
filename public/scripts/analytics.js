function ph(event, props) {
  if (typeof posthog !== "undefined" && posthog.capture) {
    posthog.capture(event, props);
  }
}

function defaultAnalyticsEndpoint() {
  const host = window.location.hostname;
  if (host === "staging.clawmem.ai") {
    return "https://git.staging.clawmem.ai/api/v3/analytics/events";
  }
  if (host === "clawmem.ai" || host === "www.clawmem.ai") {
    return "https://git.clawmem.ai/api/v3/analytics/events";
  }
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:8080/api/v3/analytics/events";
  }
  return "";
}

const analyticsEndpoint = window.__CLAWMEM_ANALYTICS_ENDPOINT || defaultAnalyticsEndpoint();

function currentPath() {
  return window.location.pathname || "/";
}

function currentSource() {
  const path = currentPath();
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/docs")) return "docs";
  return "landing_page";
}

function referrerDomain() {
  if (!document.referrer) return "";
  try {
    return new URL(document.referrer).hostname;
  } catch {
    return "";
  }
}

function searchParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function pathFromHref(href) {
  if (!href) return "";
  try {
    const url = new URL(href, window.location.href);
    return url.pathname || "/";
  } catch {
    return "";
  }
}

function platformFromButton(buttonId) {
  const id = (buttonId || "").toLowerCase();
  if (id.includes("claude")) return "claude_code";
  if (id.includes("codex")) return "codex";
  if (id.includes("hermes")) return "hermes";
  if (id.includes("openclaw")) return "openclaw";
  if (id.includes("mcp")) return "mcp";
  return "unknown";
}

function locationFromButton(buttonId, element) {
  const id = (buttonId || "").toLowerCase();
  if (id.startsWith("hero-")) return "hero";
  if (id.startsWith("cta-")) return "cta";
  if (id.startsWith("blog-")) return "blog";
  if (element?.closest?.("article")) return "article";
  if (element?.closest?.(".hero")) return "hero";
  if (element?.closest?.(".section-cta")) return "cta";
  return "unknown";
}

function linkLocation(a) {
  if (a.closest(".nav-links")) return "nav";
  if (a.closest(".footer-nav")) return "footer";
  if (a.closest(".cta-console")) return "cta";
  if (a.closest("article")) return "article";
  return "unknown";
}

function linkTarget(a) {
  const href = a.getAttribute("href") || "";
  if (href.includes("console.clawmem.ai")) return "console";
  return href.replace("#", "") || a.textContent.trim();
}

function frontendPayload(event, props = {}) {
  return {
    event_name: event,
    source: props.source || currentSource(),
    path: props.path || currentPath(),
    target_path: props.target_path || "",
    page: props.page || "",
    platform: props.platform || "",
    location: props.location || "",
    button_id: props.button_id || "",
    success: typeof props.success === "boolean" ? props.success : undefined,
    traffic_source: props.traffic_source || "",
    utm_source: searchParam("utm_source"),
    referrer_domain: referrerDomain(),
  };
}

function sendFrontendMetric(event, props) {
  if (!analyticsEndpoint) return;

  const body = JSON.stringify(frontendPayload(event, props));

  // Keep this as an explicit credentialless CORS request. Cross-origin
  // sendBeacon can use credentialed CORS in browsers, which requires a
  // different server contract than this public analytics endpoint needs.
  fetch(analyticsEndpoint, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    keepalive: true,
    body,
  }).catch(() => {});
}

function track(event, props = {}) {
  ph(event, props);
  sendFrontendMetric(event, props);
}

window.__clawmemTrack = track;
sendFrontendMetric("page_view", {});

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  requestAnimationFrame(() => {
    track("theme_toggled", {
      theme: document.documentElement.dataset.theme || "dark",
    });
  });
});

document.querySelectorAll("[data-copy-button]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const buttonId = btn.dataset.copyButton || "unknown";
    setTimeout(() => {
      track("install_command_copied", {
        button_id: buttonId,
        platform: platformFromButton(buttonId),
        location: locationFromButton(buttonId, btn),
        success: btn.dataset.copySuccess === "true",
      });
    }, 100);
  });
});

document.querySelectorAll("[data-lang-option]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const prevLang = document.documentElement.lang || "en";
    requestAnimationFrame(() => {
      const newLang = document.documentElement.lang || "en";
      track("language_changed", {
        from: prevLang,
        to: newLang,
        language: newLang,
      });
    });
  });
});

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    track("nav_clicked", {
      target: linkTarget(a),
      location: "nav",
      target_path: pathFromHref(a.href),
    });
  });
});

document.querySelectorAll(".footer-nav a").forEach((a) => {
  a.addEventListener("click", () => {
    track("footer_clicked", {
      target: linkTarget(a),
      location: "footer",
      target_path: pathFromHref(a.href),
    });
  });
});

document.querySelectorAll("a[href]").forEach((a) => {
  a.addEventListener("click", () => {
    const href = a.getAttribute("href") || "";
    const location = linkLocation(a);
    const targetPath = pathFromHref(a.href);
    if (href.includes("console.clawmem.ai")) {
      track("console_clicked", {
        location,
        target_path: targetPath,
      });
    }
    if (targetPath === "/blog/" || targetPath.startsWith("/blog/")) {
      track("blog_click", {
        location,
        target_path: targetPath,
      });
    }
  });
});

const sectionMap = {
  "section-how": "features",
  "section-inspectable": "inspectable_memory",
  "section-hood": "under_the_hood",
  "section-compare": "comparison",
  "section-cta": "cta_install",
};

if ("IntersectionObserver" in window) {
  const viewedSections = new Set();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        for (const [cls, name] of Object.entries(sectionMap)) {
          if (el.classList.contains(cls) && !viewedSections.has(name)) {
            viewedSections.add(name);
            track("section_viewed", { section: name });
            sectionObserver.unobserve(el);
            break;
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  for (const cls of Object.keys(sectionMap)) {
    const el = document.querySelector("." + cls);
    if (el) sectionObserver.observe(el);
  }
}

const heroEl = document.querySelector(".hero");
if (heroEl && "IntersectionObserver" in window) {
  let heroTracked = false;
  const heroObs = new IntersectionObserver(
    (entries) => {
      if (heroTracked) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroTracked = true;
          track("section_viewed", { section: "hero", location: "hero" });
          heroObs.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  heroObs.observe(heroEl);
}

(() => {
  const milestones = [25, 50, 75, 100];
  const reached = new Set();

  function checkDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);

    for (const m of milestones) {
      if (pct >= m && !reached.has(m)) {
        reached.add(m);
        track("scroll_depth", { percent: m });
      }
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        checkDepth();
        ticking = false;
      });
    }
  }, { passive: true });
})();

requestAnimationFrame(() => {
  const i18n = window.__i18n;
  window.posthog?.register?.({
    initial_theme: document.documentElement.dataset.theme || "dark",
    initial_language: i18n ? i18n.currentLang() : document.documentElement.lang || "en",
  });
});

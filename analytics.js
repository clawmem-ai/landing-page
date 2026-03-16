/* ── PostHog Event Tracking ── */

function ph(event, props) {
  if (typeof posthog !== "undefined" && posthog.capture) {
    posthog.capture(event, props);
  }
}

/* ── Theme toggle ── */
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  // read after toggle (main.js toggles first since it loads before this)
  requestAnimationFrame(() => {
    ph("theme_toggled", {
      theme: document.documentElement.dataset.theme || "dark",
    });
  });
});

/* ── Install command copy ── */
document.querySelectorAll("[data-copy-button]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const location = btn.dataset.copyButton === "hero-skill" ? "hero" : "cta";
    // delay slightly so we can check the is-copied class set by main.js
    setTimeout(() => {
      ph("install_command_copied", {
        location,
        success: btn.classList.contains("is-copied"),
      });
    }, 100);
  });
});

/* ── Language changed ── */
document.querySelectorAll("[data-lang-option]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const prevLang = document.documentElement.lang || "en";
    // i18n.js updates lang synchronously on click
    requestAnimationFrame(() => {
      const newLang = document.documentElement.lang || "en";
      ph("language_changed", {
        from: prevLang,
        to: newLang,
        language: newLang,
      });
    });
  });
});

/* ── Link click helper ── */
function linkTarget(a) {
  const href = a.getAttribute("href") || "";
  if (href.includes("console.clawmem.ai")) return "console";
  return href.replace("#", "") || a.textContent.trim();
}

/* ── Nav link clicks ── */
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    ph("nav_clicked", { target: linkTarget(a) });
  });
});

/* ── Footer link clicks ── */
document.querySelectorAll(".footer-nav a").forEach((a) => {
  a.addEventListener("click", () => {
    ph("footer_clicked", { target: linkTarget(a) });
  });
});

/* ── CTA console link ── */
document.querySelector(".cta-console a")?.addEventListener("click", () => {
  ph("console_clicked", { location: "cta" });
});

/* ── Section viewed (scroll tracking) ── */
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
            ph("section_viewed", { section: name });
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

/* ── Hero viewed (track if user actually sees the hero content) ── */
const heroEl = document.querySelector(".hero");
if (heroEl && "IntersectionObserver" in window) {
  let heroTracked = false;
  const heroObs = new IntersectionObserver(
    (entries) => {
      if (heroTracked) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroTracked = true;
          ph("section_viewed", { section: "hero" });
          heroObs.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  heroObs.observe(heroEl);
}

/* ── Scroll depth tracking ── */
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
        ph("scroll_depth", { percent: m });
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

/* ── Initial page properties ── */
requestAnimationFrame(() => {
  const i18n = window.__i18n;
  posthog?.register?.({
    initial_theme: document.documentElement.dataset.theme || "dark",
    initial_language: i18n ? i18n.currentLang() : document.documentElement.lang || "en",
  });
});

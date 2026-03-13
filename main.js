/* ── Theme toggle ── */
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try { localStorage.setItem("cm-theme", theme); } catch { /* noop */ }
}

themeToggle?.addEventListener("click", () => {
  const current = root.dataset.theme || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* ── Copy buttons ── */
const copyButtons = document.querySelectorAll("[data-copy-button]");
const copyFeedback = document.querySelector("[data-copy-feedback]");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
}

copyButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copyText ?? "";
    if (!text) return;

    const copied = await copyText(text);
    btn.classList.add("is-copied");
    if (copyFeedback) {
      copyFeedback.textContent = copied
        ? "Install command copied."
        : "Copy failed. Please copy manually.";
    }
    setTimeout(() => {
      btn.classList.remove("is-copied");
      if (copyFeedback) copyFeedback.textContent = "";
    }, 1600);
  });
});

/* ── Memory Scene (Canvas Animation) ── */
(() => {
  const canvas = document.getElementById("memory-canvas");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!canvas || reducedMotion.matches) return;

  const ctx = canvas.getContext("2d");
  const hero = canvas.closest(".hero");
  const lobsterEl = hero?.querySelector(".lobster-icon");
  const clawLeftEl = lobsterEl?.querySelector(".claw-left");
  const clawRightEl = lobsterEl?.querySelector(".claw-right");
  if (!ctx || !hero || !lobsterEl) return;

  let W, H, dpr;
  const resize = () => {
    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  /* ── Theme-aware colors ── */
  function getColors() {
    const dark = root.dataset.theme !== "light";
    return {
      bubbleHuman: dark ? "rgba(255,77,77,0.18)" : "rgba(239,75,88,0.15)",
      bubbleAI: dark ? "rgba(0,229,204,0.18)" : "rgba(0,143,135,0.15)",
      bubbleStroke: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      bubbleTextLine: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
      orbCoral: dark ? "rgba(255,77,77,0.6)" : "rgba(239,75,88,0.5)",
      orbCyan: dark ? "rgba(0,229,204,0.55)" : "rgba(0,143,135,0.45)",
      orbGlow: dark ? "rgba(0,229,204,0.3)" : "rgba(0,143,135,0.25)",
      lineFaint: dark ? "rgba(136,146,176,0.08)" : "rgba(15,23,42,0.06)",
      lineActive: dark ? "rgba(0,229,204,0.25)" : "rgba(0,143,135,0.2)",
    };
  }

  /* ── Lobster position helpers ── */
  function lobsterCenter() {
    const lr = lobsterEl.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    return {
      x: lr.left - hr.left + lr.width / 2,
      y: lr.top - hr.top + lr.height / 2,
      w: lr.width,
      h: lr.height,
    };
  }

  /* ── Background memory orbs ── */
  const bgOrbs = [];
  function initOrbs() {
    bgOrbs.length = 0;
    const count = Math.max(10, Math.floor(W * H / 25000));
    for (let i = 0; i < count; i++) {
      bgOrbs.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 2 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        coral: Math.random() > 0.5,
        alpha: 0.25 + Math.random() * 0.35,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }
  initOrbs();
  window.addEventListener("resize", initOrbs);

  function drawOrbs(t, colors) {
    for (const orb of bgOrbs) {
      orb.x += orb.vx;
      orb.y += orb.vy;
      if (orb.x < -20) orb.x = W + 20;
      if (orb.x > W + 20) orb.x = -20;
      if (orb.y < -20) orb.y = H + 20;
      if (orb.y > H + 20) orb.y = -20;

      const pulse = Math.sin(t * 0.001 + orb.pulse) * 0.15 + 1;
      const r = orb.r * pulse;
      const baseColor = orb.coral ? colors.orbCoral : colors.orbCyan;

      // glow
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r * 3);
      grad.addColorStop(0, baseColor);
      grad.addColorStop(1, "transparent");
      ctx.globalAlpha = orb.alpha * 0.4;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      // core
      ctx.globalAlpha = orb.alpha;
      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawOrbConnections(colors) {
    const maxDist = 120;
    ctx.strokeStyle = colors.lineFaint;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < bgOrbs.length; i++) {
      for (let j = i + 1; j < bgOrbs.length; j++) {
        const a = bgOrbs[i], b = bgOrbs[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.globalAlpha = (1 - dist / maxDist) * 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ── Chat bubbles ── */
  const bubbles = [];
  let nextBubbleTime = 0;
  let nextSide = "left"; // alternate

  function spawnBubble(t) {
    const lob = lobsterCenter();
    const isHuman = nextSide === "left";
    nextSide = isHuman ? "right" : "left";

    // human bubbles: wider, on the left; AI: narrower, on the right
    const bw = isHuman ? 60 + Math.random() * 40 : 40 + Math.random() * 25;
    const bh = isHuman ? 24 + Math.random() * 16 : 18 + Math.random() * 12;
    const lines = isHuman ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);

    // spawn below the hero area
    const spawnX = isHuman
      ? lob.x - 60 - Math.random() * 80
      : lob.x + 60 + Math.random() * 80;
    const spawnY = H + 20;

    // target: near the claw
    const targetY = lob.y + lob.h * 0.15;
    const targetX = isHuman ? lob.x - lob.w * 0.45 : lob.x + lob.w * 0.45;

    bubbles.push({
      x: spawnX,
      y: spawnY,
      w: bw,
      h: bh,
      lines,
      isHuman,
      targetX,
      targetY,
      speed: 30 + Math.random() * 20,
      alpha: 0,
      phase: "rising", // rising → grabbed → orb → merge
      grabTimer: 0,
      orbX: 0,
      orbY: 0,
      orbAlpha: 0,
      born: t,
    });
  }

  function drawBubble(b, colors) {
    const fill = b.isHuman ? colors.bubbleHuman : colors.bubbleAI;
    const stroke = colors.bubbleStroke;
    const lineColor = colors.bubbleTextLine;

    ctx.globalAlpha = b.alpha;

    // rounded rect
    const r = 8;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, r);
    ctx.fill();
    ctx.stroke();

    // fake text lines
    const lineW = b.w - 16;
    const lineH = 3;
    const startY = b.y - b.h / 2 + 8;
    ctx.fillStyle = lineColor;
    for (let i = 0; i < b.lines; i++) {
      const w = i === b.lines - 1 ? lineW * (0.4 + Math.random() * 0.3) : lineW;
      ctx.beginPath();
      ctx.roundRect(b.x - b.w / 2 + 8, startY + i * 7, w, lineH, 1.5);
      ctx.fill();
    }

    // small triangle tail
    const tailDir = b.isHuman ? -1 : 1;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(b.x + tailDir * (b.w / 2 - 6), b.y + b.h / 2 - 2);
    ctx.lineTo(b.x + tailDir * (b.w / 2 + 4), b.y + b.h / 2 + 4);
    ctx.lineTo(b.x + tailDir * (b.w / 2 - 6), b.y + b.h / 2 + 2);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  /* ── Glowing orb (after grab) ── */
  function drawGlowOrb(x, y, alpha, colors) {
    const r = 6;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    grad.addColorStop(0, colors.orbCyan);
    grad.addColorStop(0.5, colors.orbGlow);
    grad.addColorStop(1, "transparent");
    ctx.globalAlpha = alpha;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors.orbCyan;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /* ── Connection lines from new orb to nearby bg orbs ── */
  function drawMergeLines(x, y, alpha, colors) {
    const maxDist = 160;
    ctx.strokeStyle = colors.lineActive;
    ctx.lineWidth = 1;
    for (const orb of bgOrbs) {
      const dx = orb.x - x, dy = orb.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.globalAlpha = alpha * (1 - dist / maxDist) * 0.6;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(orb.x, orb.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ── Claw grab CSS class management ── */
  function triggerGrab(side) {
    const el = side === "left" ? clawLeftEl : clawRightEl;
    if (!el) return;
    el.classList.add("grabbing");
    setTimeout(() => el.classList.remove("grabbing"), 700);
  }

  /* ── Main loop ── */
  let lastTime = 0;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 1000, 0.1); // seconds, capped
    lastTime = timestamp;

    ctx.clearRect(0, 0, W, H);
    const colors = getColors();
    const lob = lobsterCenter();

    // background orb connections
    drawOrbConnections(colors);
    // background orbs
    drawOrbs(timestamp, colors);

    // spawn bubbles
    if (timestamp > nextBubbleTime) {
      spawnBubble(timestamp);
      nextBubbleTime = timestamp + 2200 + Math.random() * 1600;
    }

    // update & draw bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];

      if (b.phase === "rising") {
        // fade in
        b.alpha = Math.min(b.alpha + dt * 1.5, 0.35);

        // move upward + drift toward target X
        b.y -= b.speed * dt;
        b.x += (b.targetX - b.x) * 0.008;

        // check if reached claw area
        if (b.y <= b.targetY + 10) {
          b.phase = "grabbed";
          b.grabTimer = 0;
          triggerGrab(b.isHuman ? "left" : "right");
          b.orbX = b.x;
          b.orbY = b.y;
        }

        drawBubble(b, colors);
      } else if (b.phase === "grabbed") {
        // bubble compresses and brightens into an orb over 0.7s
        b.grabTimer += dt;
        const p = Math.min(b.grabTimer / 0.7, 1);

        // shrink bubble
        b.w *= 1 - dt * 2.5;
        b.h *= 1 - dt * 2.5;
        b.alpha = 0.35 * (1 - p);

        if (b.w > 4) drawBubble(b, colors);

        // simultaneously grow orb
        b.orbAlpha = p;
        drawGlowOrb(b.orbX, b.orbY, b.orbAlpha * 0.8, colors);

        if (p >= 1) {
          b.phase = "orb";
          b.grabTimer = 0;
        }
      } else if (b.phase === "orb") {
        // orb ascends to head area over 0.5s
        b.grabTimer += dt;
        const p = Math.min(b.grabTimer / 0.5, 1);
        const headY = lob.y - lob.h * 0.35;
        const headX = lob.x;

        b.orbX += (headX - b.orbX) * (dt * 4);
        b.orbY += (headY - b.orbY) * (dt * 4);
        b.orbAlpha = 1;

        drawGlowOrb(b.orbX, b.orbY, b.orbAlpha, colors);

        if (p >= 1) {
          b.phase = "merge";
          b.grabTimer = 0;
        }
      } else if (b.phase === "merge") {
        // merge into background graph over 0.6s
        b.grabTimer += dt;
        const p = Math.min(b.grabTimer / 0.6, 1);

        b.orbAlpha = 1 - p * 0.5;
        drawGlowOrb(b.orbX, b.orbY, b.orbAlpha, colors);
        drawMergeLines(b.orbX, b.orbY, b.orbAlpha, colors);

        if (p >= 1) {
          // add as a new background orb
          bgOrbs.push({
            x: b.orbX,
            y: b.orbY,
            r: 3 + Math.random() * 4,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.1,
            coral: !b.isHuman,
            alpha: 0.3 + Math.random() * 0.2,
            pulse: Math.random() * Math.PI * 2,
          });
          // remove old orbs if too many
          if (bgOrbs.length > 35) bgOrbs.shift();
          bubbles.splice(i, 1);
        }
      }
    }

    // remove stale bubbles that have been alive too long (safety)
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (timestamp - bubbles[i].born > 20000) bubbles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();

/* ── Scroll reveal ── */
const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
  document.body.classList.add("has-motion");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

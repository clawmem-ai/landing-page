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
  const titleEl = hero.querySelector(".hero-title");
  const heroInstallEl = hero.querySelector(".hero-install-block");
  if (!ctx || !hero || !lobsterEl) return;

  let W, H, dpr, resizeReady = false;
  const resize = () => {
    const rect = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const oldW = W || rect.width;
    const oldH = H || rect.height;
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // scale existing orb/bubble positions proportionally (skipped on first call)
    if (resizeReady && (oldW !== W || oldH !== H)) {
      const sx = W / oldW, sy = H / oldH;
      for (const orb of bgOrbs) { orb.x *= sx; orb.y *= sy; }
      for (const b of bubbles) {
        b.x *= sx; b.y *= sy;
        b.targetX *= sx; b.targetY *= sy;
        if (b.orbX) b.orbX *= sx;
        if (b.orbY) b.orbY *= sy;
      }
    }
  };
  resize();
  window.addEventListener("resize", resize);

  /* ── Theme-aware colors ── */
  function getColors() {
    const dark = root.dataset.theme !== "light";
    return {
      bubbleHuman: dark ? "rgba(224,71,90,0.30)" : "rgba(214,56,74,0.25)",
      bubbleAI: dark ? "rgba(45,212,184,0.30)" : "rgba(13,138,127,0.25)",
      bubbleStroke: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
      bubbleTextLine: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)",
      orbCoral: dark ? "rgba(224,71,90,0.6)" : "rgba(214,56,74,0.5)",
      orbCoralGlow: dark ? "rgba(224,71,90,0.3)" : "rgba(214,56,74,0.25)",
      orbCyan: dark ? "rgba(45,212,184,0.55)" : "rgba(13,138,127,0.45)",
      orbGlow: dark ? "rgba(45,212,184,0.3)" : "rgba(13,138,127,0.25)",
      lineFaint: dark ? "rgba(136,146,176,0.45)" : "rgba(15,23,42,0.30)",
      lineActive: dark ? "rgba(45,212,184,0.4)" : "rgba(13,138,127,0.35)",
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
        r: 4 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.12,
        coral: Math.random() > 0.5,
        alpha: 0.25 + Math.random() * 0.35,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }
  initOrbs();

  const OOB_MARGIN = 80;

  function drawOrbs(t, colors, lob) {
    const exclR = lob.w * 1.2;
    for (let i = bgOrbs.length - 1; i >= 0; i--) {
      const orb = bgOrbs[i];
      orb.x += orb.vx;
      orb.y += orb.vy;

      // remove orbs that drifted far out of bounds
      if (orb.x < -OOB_MARGIN || orb.x > W + OOB_MARGIN ||
          orb.y < -OOB_MARGIN || orb.y > H + OOB_MARGIN) {
        bgOrbs.splice(i, 1);
        continue;
      }

      // repel from lobster center
      const dx = orb.x - lob.x, dy = orb.y - lob.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < exclR && dist > 0) {
        const push = (exclR - dist) / exclR * 0.8;
        orb.x += (dx / dist) * push;
        orb.y += (dy / dist) * push;
      }

      // only draw if within visible area (with some margin for glow)
      if (orb.x < -30 || orb.x > W + 30 || orb.y < -30 || orb.y > H + 30) continue;

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

  function drawOrbConnections(colors, t) {
    const maxDist = 180;
    ctx.strokeStyle = colors.lineFaint;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < bgOrbs.length; i++) {
      for (let j = i + 1; j < bgOrbs.length; j++) {
        const a = bgOrbs[i], b = bgOrbs[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist && dist > 0) {
          // use pulsed radius + margin so lines never overlap circles
          const ar = a.r * (Math.sin(t * 0.001 + a.pulse) * 0.15 + 1) + 2;
          const br = b.r * (Math.sin(t * 0.001 + b.pulse) * 0.15 + 1) + 2;
          if (dist <= ar + br) continue; // too close, skip
          const nx = dx / dist, ny = dy / dist;
          const ax = a.x - nx * ar, ay = a.y - ny * ar;
          const bx = b.x + nx * br, by = b.y + ny * br;
          ctx.globalAlpha = (1 - dist / maxDist);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
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
  resizeReady = true;

  function spawnBubble(t) {
    const lob = lobsterCenter();
    const isHuman = nextSide === "left";
    nextSide = isHuman ? "right" : "left";

    // human bubbles: wider; AI: narrower
    const bw = isHuman ? 100 + Math.random() * 50 : 70 + Math.random() * 35;
    const bh = isHuman ? 28 + Math.random() * 18 : 22 + Math.random() * 14;
    const lines = isHuman ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2);

    // target: near the claw
    const targetY = lob.y + lob.h * 0.15;
    const targetX = isHuman ? lob.x - lob.w * 0.45 : lob.x + lob.w * 0.45;

    // spawn from behind the hero install block (or bottom of hero if not found)
    let spawnY = H + 20;
    if (heroInstallEl) {
      const ir = heroInstallEl.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      spawnY = ir.top - hr.top + ir.height / 2;
    }
    const spawnX = targetX;

    bubbles.push({
      x: spawnX,
      y: spawnY,
      w: bw,
      h: bh,
      lines,
      lastLineRatio: 0.4 + Math.random() * 0.3,
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

    // bubble body with integrated curved tail
    const r = Math.min(b.h / 2, 12);
    const left = b.x - b.w / 2;
    const right = b.x + b.w / 2;
    const top = b.y - b.h / 2;
    const bot = b.y + b.h / 2;
    const tailDir = b.isHuman ? -1 : 1;
    // tail anchor on bottom edge
    const tailBaseX = b.x + tailDir * (b.w * 0.3);
    const tailTipX = tailBaseX + tailDir * 8;
    const tailTipY = bot + 6;

    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(left + r, top);
    ctx.lineTo(right - r, top);
    ctx.quadraticCurveTo(right, top, right, top + r);
    ctx.lineTo(right, bot - r);
    ctx.quadraticCurveTo(right, bot, right - r, bot);
    // bottom edge with curved tail
    if (tailDir > 0) {
      // tail on right side
      ctx.lineTo(tailBaseX + 5, bot);
      ctx.quadraticCurveTo(tailBaseX + 3, bot + 2, tailTipX, tailTipY);
      ctx.quadraticCurveTo(tailBaseX - 2, bot + 1, tailBaseX - 3, bot);
    } else {
      // tail on left side
      ctx.lineTo(tailBaseX + 3, bot);
      ctx.quadraticCurveTo(tailBaseX + 2, bot + 1, tailTipX, tailTipY);
      ctx.quadraticCurveTo(tailBaseX - 3, bot + 2, tailBaseX - 5, bot);
    }
    ctx.lineTo(left + r, bot);
    ctx.quadraticCurveTo(left, bot, left, bot - r);
    ctx.lineTo(left, top + r);
    ctx.quadraticCurveTo(left, top, left + r, top);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // fake text lines
    const lineW = b.w - 14;
    const lineH = 2.5;
    const startY = top + 7;
    ctx.fillStyle = lineColor;
    for (let i = 0; i < b.lines; i++) {
      const w = i === b.lines - 1 ? lineW * b.lastLineRatio : lineW;
      ctx.beginPath();
      ctx.roundRect(left + 7, startY + i * 6.5, w, lineH, 1.2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  /* ── Glowing orb (after grab) ── */
  function drawGlowOrb(x, y, alpha, colors, isHuman) {
    const r = 6;
    const coreColor = isHuman ? colors.orbCoral : colors.orbCyan;
    const glowColor = isHuman ? colors.orbCoralGlow : colors.orbGlow;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    grad.addColorStop(0, coreColor);
    grad.addColorStop(0.5, glowColor);
    grad.addColorStop(1, "transparent");
    ctx.globalAlpha = alpha;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = coreColor;
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
  }
  function triggerRelease(side) {
    const el = side === "left" ? clawLeftEl : clawRightEl;
    if (!el) return;
    el.classList.remove("grabbing");
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

    // background orbs first, then connections on top — but connections behind orb cores
    drawOrbConnections(colors, timestamp);
    drawOrbs(timestamp, colors, lob);

    // spawn bubbles
    if (timestamp > nextBubbleTime) {
      spawnBubble(timestamp);
      nextBubbleTime = timestamp + 2200 + Math.random() * 1600;
    }

    // update & draw bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];

      const side = b.isHuman ? "left" : "right";

      if (b.phase === "rising") {
        // fade in — gets brighter as it approaches the claw
        const progress = 1 - Math.max(0, (b.y - b.targetY) / (H - b.targetY));
        b.alpha = 0.25 + progress * 0.6;

        // move straight up
        b.y -= b.speed * dt;

        // check if reached claw area
        if (b.y <= b.targetY + 10) {
          b.phase = "grabbed";
          b.grabTimer = 0;
          triggerGrab(side);
          b.orbStartX = b.x;
          b.orbStartY = b.y;
          // just outside the claw mouth
          const clawSvgX = b.isHuman ? -22 : 142;
          const clawSvgY = 52;
          b.clawTipX = (lob.x - lob.w / 2) + (clawSvgX / 120) * lob.w;
          b.clawTipY = (lob.y - lob.h / 2) + (clawSvgY / 120) * lob.h;
          b.orbX = b.x;
          b.orbY = b.y;
          b.origW = b.w;
          b.origH = b.h;
        }

        drawBubble(b, colors);

      } else if (b.phase === "grabbed") {
        // bubble shrinks and slides toward claw tip, becoming an orb (0.8s)
        b.grabTimer += dt;
        const p = Math.min(b.grabTimer / 0.8, 1);
        const ease = p * p * (3 - 2 * p); // smoothstep

        // shrink bubble
        b.w = b.origW * (1 - ease);
        b.h = b.origH * (1 - ease);
        b.alpha = 0.85 * (1 - ease);
        // slide bubble toward claw tip
        b.x = b.orbStartX + (b.clawTipX - b.orbStartX) * ease;
        b.y = b.orbStartY + (b.clawTipY - b.orbStartY) * ease;
        if (b.w > 4) drawBubble(b, colors);

        // orb grows at the converging position
        b.orbX = b.x;
        b.orbY = b.y;
        b.orbAlpha = ease;
        drawGlowOrb(b.orbX, b.orbY, b.orbAlpha * 0.8, colors, b.isHuman);

        if (p >= 1) {
          // launch directly from claw tip
          b.phase = "release";
          b.grabTimer = 0;
          b.orbAlpha = 1;
          triggerRelease(side);
          const angle = Math.random() * Math.PI * 2;
          b.driftTargetVx = Math.cos(angle) * 30;
          b.driftTargetVy = Math.sin(angle) * 30;
          b.driftVx = 0;
          b.driftVy = 0;
        }

      } else if (b.phase === "release") {
        // orb gently accelerates away, glow fades smoothly (2.5s)
        b.grabTimer += dt;
        const p = Math.min(b.grabTimer / 2.5, 1);

        // ease into drift speed — smooth acceleration
        const accel = Math.min(b.grabTimer / 0.8, 1); // ramp over 0.8s
        const ease = accel * accel * (3 - 2 * accel); // smoothstep
        b.driftVx = b.driftTargetVx * ease;
        b.driftVy = b.driftTargetVy * ease;

        b.orbX += b.driftVx * dt;
        b.orbY += b.driftVy * dt;

        // glow: hold strong for first 40%, then smooth cubic fade
        if (p < 0.4) {
          b.orbAlpha = 1;
        } else {
          const fade = (p - 0.4) / 0.6; // 0→1
          b.orbAlpha = 1 - fade * fade * fade; // cubic ease-in fade
        }

        drawGlowOrb(b.orbX, b.orbY, b.orbAlpha, colors, b.isHuman);
        drawMergeLines(b.orbX, b.orbY, b.orbAlpha * Math.min(p * 1.5, 1), colors);

        if (p >= 1) {
          // become a background orb at wherever it drifted to
          bgOrbs.push({
            x: b.orbX,
            y: b.orbY,
            r: 5 + Math.random() * 8,
            vx: b.driftVx * 0.005,
            vy: b.driftVy * 0.005,
            coral: b.isHuman,
            alpha: 0.3 + Math.random() * 0.2,
            pulse: Math.random() * Math.PI * 2,
          });
          // culling happens naturally in drawOrbs when orbs drift out of bounds
          bubbles.splice(i, 1);
        }
      }
    }

    // remove stale bubbles that have been alive too long (safety)
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (timestamp - bubbles[i].born > 20000) bubbles.splice(i, 1);
    }

    // ── Reactive text-shadow — nearby objects cast letter-shaped light ──
    if (titleEl) {
      const tr = titleEl.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const tcx = tr.left - hr.left + tr.width / 2;
      const tcy = tr.top - hr.top + tr.height / 2;
      const influenceR = 280;
      const dark = root.dataset.theme !== "light";

      const shadows = [];

      function addShadow(x, y, strength, isCoral) {
        const dx = x - tcx, dy = y - tcy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= influenceR || dist < 1) return;

        const falloff = 1 - dist / influenceR;
        const intensity = falloff * falloff * strength;
        if (intensity < 0.03) return;

        // offset: light from left → shadow shifts right, etc.
        const ox = (dx / dist) * falloff * 3;
        const oy = (dy / dist) * falloff * 2;
        // closer = tighter blur, further = more spread
        const blur = 4 + (1 - falloff) * 14;
        const alpha = Math.min(intensity * 0.7, 0.55);

        const r = isCoral ? (dark ? 224 : 214) : (dark ? 45 : 13);
        const g = isCoral ? (dark ? 71 : 56) : (dark ? 212 : 138);
        const b = isCoral ? (dark ? 90 : 74) : (dark ? 184 : 127);

        shadows.push(`${ox.toFixed(1)}px ${oy.toFixed(1)}px ${blur.toFixed(1)}px rgba(${r},${g},${b},${alpha.toFixed(2)})`);
      }

      for (const orb of bgOrbs) {
        addShadow(orb.x, orb.y, orb.alpha * (orb.r / 8), orb.coral);
      }
      for (const b of bubbles) {
        if (b.phase === "rising") {
          addShadow(b.x, b.y, b.alpha * 2.5, b.isHuman);
        } else if (b.phase === "grabbed") {
          const combined = Math.max(b.alpha, b.orbAlpha || 0);
          addShadow(b.orbX || b.x, b.orbY || b.y, combined * 2.5, b.isHuman);
        } else {
          addShadow(b.orbX, b.orbY, (b.orbAlpha || 0) * 2.5, b.isHuman);
        }
      }

      titleEl.style.textShadow = shadows.length ? shadows.join(", ") : "none";
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

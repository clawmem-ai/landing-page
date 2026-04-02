/* ── Scenario Tab Rotation ── */

(() => {
  const container = document.getElementById("scenario-tabs");
  if (!container) return;

  const tabs = Array.from(container.querySelectorAll(".scenario-tab"));
  const panels = Array.from(container.querySelectorAll(".scenario-panel"));
  const progressBar = container.querySelector(".scenario-tab-progress");

  const SCENARIOS = ["daily", "family", "work", "team"];
  const AUTO_INTERVAL = 5000; // 5s per tab
  const PAUSE_AFTER_CLICK = 15000; // 15s pause after manual click

  let currentIndex = 0;
  let autoTimer = null;
  let progressTimer = null;
  let pauseTimer = null;

  function activate(index, animate = true) {
    currentIndex = index;

    tabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === index);
    });

    panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle("is-active", isActive);
      if (isActive && animate) {
        panel.style.animation = "none";
        // force reflow
        panel.offsetHeight;
        panel.style.animation = "";
      }
    });

    // Reapply translations to new panel (i18n may have updated after initial render)
    if (window.__i18n) {
      const activePanel = panels[index];
      activePanel.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = window.__i18n.t(el.dataset.i18n);
      });
      activePanel.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = window.__i18n.t(el.dataset.i18nHtml);
      });
    }

    startProgress();
  }

  function next() {
    activate((currentIndex + 1) % SCENARIOS.length);
  }

  function startProgress() {
    stopProgress();

    // Position progress bar under active tab
    const activeTab = tabs[currentIndex];
    if (!activeTab || !progressBar) return;

    const barRect = progressBar.parentElement.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    progressBar.style.left = (tabRect.left - barRect.left) + "px";
    progressBar.style.width = tabRect.width + "px";

    // Reset fill
    let fill = progressBar.querySelector(".progress-fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.className = "progress-fill";
      progressBar.appendChild(fill);
    }

    fill.style.transition = "none";
    fill.style.width = "0%";
    progressBar.classList.remove("is-running");

    // Start fill animation after a frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = `width ${AUTO_INTERVAL}ms linear`;
        fill.style.width = "100%";
        progressBar.classList.add("is-running");
      });
    });

    autoTimer = setTimeout(next, AUTO_INTERVAL);
  }

  function stopProgress() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
    if (progressBar) {
      progressBar.classList.remove("is-running");
      const fill = progressBar.querySelector(".progress-fill");
      if (fill) {
        fill.style.transition = "none";
        fill.style.width = "0%";
      }
    }
  }

  function pauseAutoRotation() {
    stopProgress();
    if (pauseTimer) clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => {
      startProgress();
    }, PAUSE_AFTER_CLICK);
  }

  // Tab click handlers
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      if (i === currentIndex) return;
      activate(i);
      pauseAutoRotation();

      // Analytics
      if (typeof posthog !== "undefined" && posthog.capture) {
        posthog.capture("scenario_tab_clicked", {
          scenario: SCENARIOS[i],
          auto: false,
        });
      }
    });
  });

  // Pause on hover
  container.addEventListener("mouseenter", () => {
    stopProgress();
  });
  container.addEventListener("mouseleave", () => {
    if (!pauseTimer || pauseTimer._cleared) {
      startProgress();
    }
  });

  // Start auto-rotation
  startProgress();
})();

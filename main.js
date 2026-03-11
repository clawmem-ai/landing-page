const copyButton = document.querySelector("[data-copy-button]");
const copyFeedback = document.querySelector("[data-copy-feedback]");
const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const graphNodes = Array.from(document.querySelectorAll("[data-graph-node]"));
const memoryEvents = Array.from(document.querySelectorAll("[data-memory-event]"));
const memoryLogCards = Array.from(document.querySelectorAll("[data-memory-log-card]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    document.body.removeChild(textArea);
    return copied;
  }
}

copyButton?.addEventListener("click", async () => {
  const text = copyButton.dataset.copyText ?? "";
  if (!text) {
    return;
  }

  const copied = await copyText(text);
  copyButton.classList.add("is-copied");
  if (copyFeedback) {
    copyFeedback.textContent = copied
      ? "Onboarding instructions copied."
      : "Copy failed. Please copy the command manually.";
  }

  window.setTimeout(() => {
    copyButton.classList.remove("is-copied");
    if (copyFeedback) {
      copyFeedback.textContent = "";
    }
  }, 1600);
});

if (!prefersReducedMotion.matches) {
  document.body.classList.add("has-motion");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10%" }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  if (graphNodes.length > 1 && memoryEvents.length > 0 && memoryLogCards.length > 0) {
    let cycleIndex = 0;

    const syncGraphMemory = () => {
      const activeNodeIndex = (cycleIndex % (graphNodes.length - 1)) + 1;
      const activeEventIndex = cycleIndex % memoryEvents.length;
      const activeLogIndex = cycleIndex % memoryLogCards.length;

      graphNodes.forEach((node, index) => {
        node.classList.toggle("is-active", index === 0 || index === activeNodeIndex);
      });

      memoryEvents.forEach((event, index) => {
        event.classList.toggle("is-active", index === activeEventIndex);
      });

      memoryLogCards.forEach((card, index) => {
        card.classList.toggle("is-active", index === activeLogIndex);
      });

      cycleIndex += 1;
    };

    syncGraphMemory();
    window.setInterval(syncGraphMemory, 2200);
  }
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const onboardingShell = document.querySelector("[data-onboarding-shell]");
const onboardingCommand = document.querySelector("[data-onboarding-command]");
const onboardingTabs = document.querySelectorAll("[data-onboarding-version-tab]");
const betaHighlights = document.querySelector("[data-beta-highlights]");
const copyButton = document.querySelector("[data-copy-button]");
const copyFeedback = document.querySelector("[data-copy-feedback]");

function setOnboardingVersion(version) {
  if (!onboardingShell || !onboardingCommand || !copyButton || !betaHighlights) {
    return;
  }

  const stableCommand = onboardingCommand.dataset.commandStable ?? "";
  const betaCommand = onboardingCommand.dataset.commandBeta ?? "";
  const nextCommand = version === "beta" ? betaCommand : stableCommand;

  onboardingShell.dataset.onboardingVersion = version;
  onboardingCommand.textContent = nextCommand;
  copyButton.dataset.copyText = nextCommand;

  if (version === "beta") {
    betaHighlights.hidden = false;
    betaHighlights.classList.remove("is-visible");
    window.requestAnimationFrame(() => {
      betaHighlights.classList.add("is-visible");
    });
  } else {
    betaHighlights.classList.remove("is-visible");
    betaHighlights.hidden = true;
  }

  onboardingTabs.forEach((tab) => {
    const isActive = tab.dataset.onboardingVersionTab === version;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

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

onboardingTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const version = tab.dataset.onboardingVersionTab;
    if (version === "stable" || version === "beta") {
      setOnboardingVersion(version);
    }
  });
});

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

setOnboardingVersion("stable");

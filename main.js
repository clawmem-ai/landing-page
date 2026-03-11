const copyButton = document.querySelector("[data-copy-button]");
const copyFeedback = document.querySelector("[data-copy-feedback]");

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

function simulateTyping(element, text, typingSpeed = 100) {
  let i = 0;

  function typeCharacter() {
    if (i < text.length) {
      const char = text[i];
      const keydownEvent = new KeyboardEvent('keydown', { key: char });
      const keypressEvent = new KeyboardEvent('keypress', { key: char });
      const inputEvent = new InputEvent('input', { data: char });
      const keyupEvent = new KeyboardEvent('keyup', { key: char });

      element.dispatchEvent(keydownEvent);
      element.dispatchEvent(keypressEvent);
      element.value += char;
      element.dispatchEvent(inputEvent);
      element.dispatchEvent(keyupEvent);

      i++;
      setTimeout(typeCharacter, typingSpeed);
    }
  }

  typeCharacter();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "insertText") {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      simulateTyping(activeElement, request.text, request.typingSpeed);
    } else if (activeElement && activeElement.isContentEditable) {
      simulateTyping(activeElement, request.text, request.typingSpeed);
    }
  } else if (request.action === "clearFocusedElement") {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
      activeElement.value = "";
    } else if (activeElement && activeElement.isContentEditable) {
      activeElement.innerText = "";
    }
  }
});
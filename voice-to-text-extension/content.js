chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertText") {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        activeElement.value += request.text;
      } else if (activeElement && activeElement.isContentEditable) {
        activeElement.innerText += request.text;
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
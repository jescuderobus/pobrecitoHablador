document.addEventListener('DOMContentLoaded', function () {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.continuous = true;
  recognition.interimResults = false; // Asegúrate de que solo se envíen resultados finales
  let transcripcion = "";

  recognition.onresult = event => {
    for (const result of event.results) {
      transcripcion += result[0].transcript;
      console.log("Texto reconocido: ", result[0].transcript); // Debugging statement
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Sending message to tab: ", tabs[0].id); // Debugging statement
        chrome.tabs.sendMessage(tabs[0].id, { action: "insertText", text: result[0].transcript });
      });
    }
  };

  recognition.onerror = event => {
    console.error("Recognition error: ", event.error); // Debugging statement
    if (event.error === 'not-allowed') {
      alert("Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en la configuración del navegador.");
    }
  };

  recognition.onend = () => {
    console.log("Recognition ended"); // Debugging statement
  };

  document.getElementById("start").addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log("Recognition started"); // Debugging statement
        recognition.start();
      })
      .catch(err => {
        console.error("Error accessing microphone: ", err); // Debugging statement
        alert("Error accediendo al micrófono. Por favor, permite el acceso al micrófono en la configuración del navegador.");
      });
  });

  document.getElementById("stop").addEventListener('click', () => {
    console.log("Recognition stopped"); // Debugging statement
    recognition.stop();
  });

  document.getElementById("clear").addEventListener('click', () => {
    transcripcion = "";
    console.log("Clearing text"); // Debugging statement
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "clearFocusedElement" });
    });
  });

  document.getElementById("insertTest").addEventListener('click', () => {
    console.log("Inserting 'test'"); // Debugging statement
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "insertText", text: "test" });
    });
  });
});
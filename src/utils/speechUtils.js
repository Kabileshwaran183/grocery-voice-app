export const startSpeechRecognition = (onResult, onEnd = () => {}) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "ta-IN,en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    onResult(speechResult);
  };

  recognition.onerror = (event) => {
    console.error("Speech Error:", event.error);
    if (event.error === 'not-allowed') {
      alert('Please enable microphone permissions');
    }
  };

  recognition.onend = onEnd;

  window.recognition = recognition; // Store globally so we can stop it manually
  recognition.start();
};

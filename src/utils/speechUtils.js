export const startSpeechRecognition = (onResult, onEnd = () => {}) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "ta-IN"; // Tamil (India)
    recognition.interimResults = false;
    recognition.maxAlternatives = 3; // Better for Tamil recognition
  
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
  
    recognition.start();
  };
  
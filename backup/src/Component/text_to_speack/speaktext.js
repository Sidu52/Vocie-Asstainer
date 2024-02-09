const voiceName = 'Google हिन्दी';

const getVoices = () => {
    return new Promise((resolve) => {
        const synthesis = window.speechSynthesis;
        let voices = synthesis.getVoices();
        if (voices.length) {
            resolve(voices);
        } else {
            synthesis.onvoiceschanged = () => {
                voices = synthesis.getVoices();
                resolve(voices);
            };
        }
    });
};

const speakText = async (message, lang = 'en') => {
    return new Promise((resolve, reject) => {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const chunkSize = 100; // Adjust the chunk size based on your needs
            const chunks = message.match(new RegExp(`.{1,${chunkSize}}`, 'g'));
            const speakChunk = (index) => {
                if (index < chunks.length) {
                    const utterance = new SpeechSynthesisUtterance(chunks[index]);
                    utterance.lang = lang;
                    utterance.volume = 1;
                    utterance.rate = 1;
                    utterance.pitch = 1;

                    getVoices().then((availableVoices) => {
                        const selectedVoice = availableVoices.find((voice) => voice.name === voiceName) || availableVoices[0];
                        utterance.voice = selectedVoice;

                        synthesis.speak(utterance);

                        utterance.onend = () => {
                            // Move on to the next chunk
                            speakChunk(index + 1);
                        };

                        utterance.onerror = (error) => {
                            reject(error);
                        };
                    });
                } else {
                    // All chunks have been spoken
                    resolve();
                }
            };

            // Start speaking the first chunk
            speakChunk(0);
        } else {
            reject('Your browser does not support the Speech Synthesis API.');
        }
    });
};


export { speakText };



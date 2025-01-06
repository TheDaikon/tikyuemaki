const audioButton = document.getElementById("audioButton");
const stopButton = document.getElementById("stopButton");

// 読み上げる文字列
const descriptionText = `この絵巻物は、一本の森を通じて人間の活動が自然に与える影響を描いています。左側には豊かな森と多様な生態系が広がり、時代が進むにつれて伐採や都市化が進み、森が減少していく様子が表現されています。右側では、生態系の崩壊や環境再生に取り組む人々の姿が描かれ、持続可能な未来への希望を象徴しています。`;

// 横スクロールと読み上げの制御用変数
let scrollInterval;
let voices = [];
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

// 再生ボタンのクリックイベント
audioButton.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(descriptionText);

    const japaneseVoice = voices.find(voice => voice.lang === "ja-JP");
    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    const readingRate = 0.85;
    utterance.rate = readingRate;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);

    const totalScrollWidth = document.body.scrollWidth - window.innerWidth;
    const readingDuration = descriptionText.length / (readingRate * 10);
    const scrollSpeed = totalScrollWidth / (readingDuration * 100);

    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.style.position = "absolute";

    scrollInterval = setInterval(() => {
        window.scrollBy(scrollSpeed, 0);
        buttonContainer.style.left = `${window.scrollX + 20}px`;
        if (window.scrollX + window.innerWidth >= document.body.scrollWidth) {
            clearInterval(scrollInterval);
        }
    }, 10);
});

stopButton.addEventListener("click", () => {
    speechSynthesis.cancel();
    clearInterval(scrollInterval);
});

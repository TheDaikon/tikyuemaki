const audioButton = document.getElementById("audioButton");
const stopButton = document.getElementById("stopButton");

// 読み上げる文字列
const descriptionText = `この絵巻物は、空と大気の変化を通じて人間の活動が環境に与える影響を描いています。左側には澄んだ青空が広がり、時代が進むにつれて工業化や車の排気ガスで空が汚染されていく様子が表現されています。右側では、大気汚染の影響を受けた風景と、それを改善しようとする人々の取り組みが描かれ、未来への希望を象徴しています。`;

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

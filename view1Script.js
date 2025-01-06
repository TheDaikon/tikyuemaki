const audioButton = document.getElementById("audioButton");
const stopButton = document.getElementById("stopButton");

// 読み上げる文字列
const descriptionText = `この絵巻物は、一本の川を通じて過去から現代に至る環境変化と人間の影響を描いています。左側には美しい水と豊かな自然が描かれ、時代が進むにつれて工場や建物が現れ、川が汚染されていく様子が表現されています。右側では、濁った水と生態系の崩壊が描かれ、現代の環境問題を象徴しています。`;

// 横スクロールと読み上げの制御用変数
let scrollInterval;
let voices = [];
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

// 再生ボタンのクリックイベント
audioButton.addEventListener("click", () => {
    // SpeechSynthesis APIでテキストを読み上げ
    const utterance = new SpeechSynthesisUtterance(descriptionText);

    // 日本語の音声を選択
    const japaneseVoice = voices.find(voice => voice.lang === "ja-JP");
    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    // 読み上げ設定（速度、ピッチ、音量）
    const readingRate = 0.85; // 読み上げ速度
    utterance.rate = readingRate;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    // 読み上げ開始
    speechSynthesis.speak(utterance);

    // スクロール速度の計算
    const totalScrollWidth = document.body.scrollWidth - window.innerWidth; // スクロール可能な幅
    const readingDuration = descriptionText.length / (readingRate * 10); // 読み上げ時間 (秒)
    const scrollSpeed = totalScrollWidth / (readingDuration * 100); // スクロール速度 (px/ms)

    // ボタンを追従するスクロール
    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.style.position = "absolute";

    scrollInterval = setInterval(() => {
        window.scrollBy(scrollSpeed, 0);
        buttonContainer.style.left = `${window.scrollX + 20}px`; // スクロール位置に追従
        if (window.scrollX + window.innerWidth >= document.body.scrollWidth) {
            clearInterval(scrollInterval); // スクロール終了
        }
    }, 10); // 10msごとにスクロール
});

// 停止ボタンのクリックイベント
stopButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // 読み上げを停止
    clearInterval(scrollInterval); // 横スクロールを停止
});

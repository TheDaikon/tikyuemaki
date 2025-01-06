// 再生ボタンと停止ボタンを取得
const audioButton = document.getElementById("audioButton");
const stopButton = document.getElementById("stopButton");

// 読み上げるテキストを取得
const descriptionText = document.querySelector(".intro-section p").textContent;

// 横スクロールと読み上げの制御用変数
let scrollInterval;

// 利用可能な音声リストを取得
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
        utterance.voice = japaneseVoice; // 日本語の音声を設定
    }

    // 昔ばなし風の調整
    utterance.rate = 0.85; // ゆっくり目
    utterance.pitch = 0.9; // 少し低め
    utterance.volume = 1; // 音量は最大

    // 読み上げを開始
    speechSynthesis.speak(utterance);

    // 横スクロールを開始
    scrollInterval = setInterval(() => {
        window.scrollBy(1, 0); // 1pxずつ横スクロール
        if (window.scrollX + window.innerWidth >= document.body.scrollWidth) {
            clearInterval(scrollInterval); // スクロールを停止
        }
    }, 10); // 10msごとにスクロール
});

// 停止ボタンのクリックイベント
stopButton.addEventListener("click", () => {
    speechSynthesis.cancel(); // 読み上げを停止
    clearInterval(scrollInterval); // 横スクロールを停止
});

// グローバル変数
let currentQuestion = 0;
let score = 0;
let showingExplanation = false; // 解説表示のための状態変数

// クイズデータ
// (省略: クイズデータの定義)
// クイズデータ
const quizData = [
    {
        id:"01",
        image: "yaen.jpg", // 画像ファイルのパス
        question: "Q1.このラーメンはどこの店のものでしょう？",
        options: {
            A: "ラーメン二郎仙川駅前店",
            B: "ラーメン二郎生田駅前店",
            C: "ラーメン二郎八王子野猿街道店２",
            D: "ラーメン二郎越谷店"
        },
        correct: "C",
        explanation: "解説:カウンターの色を見れば一発！"
    },
    {
        id: "02",
        image: "kannai.jpg", // 画像ファイルのパス
        question: "Q2.このラーメンはどこの店のものでしょう？",
        options: {
            A: "ラーメン二郎横浜関内店",
            B: "ラーメン二郎目黒店",
            C: "ラーメン二郎湘南藤沢店",
            D: "ラーメン二郎会津若松店"
        },
        correct: "A",
        explanation: "解説:湘南藤沢を選んだ人は惜しい、カウンターの色が違うね！"
    },
    {
        id:"03",
        image: "sengawa.jpg", // 画像ファイルのパス
        question: "Q3.このラーメンはどこの店のものでしょう？",
        options: {
            A: "ラーメン二郎相模大野店",
            B: "ラーメン二郎仙川駅前店",
            C: "ラーメン二郎ひばりが丘駅前店",
            D: "ラーメン二郎亀戸店"
        },
        correct: "B",
        explanation: "解説:仙川ブラック！独特のアブラでわかるよね？"
    },
    {
        id:"04",
        image: "kaminoge.jpg", // 画像ファイルのパス
        question: "Q4.このラーメンはどこの店のものでしょう？",
        options: {
            A: "ラーメン二郎上野毛店",
            B: "ラーメン二郎札幌店",
            C: "ラーメン二郎千住大橋駅前店",
            D: "ラーメン二郎小岩店"
        },
        correct: "A",
        explanation: "解説:スープのブラック具合でわからなきゃだめ！"
    },
    {
        id:"05",
        image: "kanjin.jpg", // 画像ファイルのパス
        question: "Q5.このラーメンはどこの店のものでしょう？",
        options: {
            A: "ラーメン二郎西台駅前店",
            B: "ラーメン二郎一橋学園駅前店",
            C: "ラーメン二郎三田本店",
            D: "ラーメン二郎神田神保町店"
        },
        correct: "D",
        explanation: "解説:レベルの高い合格点を超える二郎オールウェイズ出してくれる"
    },
    
];
// クイズの初期化
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    showingExplanation = false; // 初期化時に解説非表示
    showQuestion();
}

// 回答のチェックと解説表示
function checkAnswer(selectedAnswer, correctAnswer) {
    if (showingExplanation) {
        // 解説が表示中の場合、次の問題に進む
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showingExplanation = false;
            showQuestion();
        } else {
            // 5問のクイズが終了した場合
            showQuizResult();
        }
    } else {
        if (selectedAnswer === correctAnswer) {
            score++;
        }

        // 正解と解説の表示
        const explanationElement = document.getElementById('explanation');
        explanationElement.textContent = `正解: ${correctAnswer}. ${quizData[currentQuestion].explanation}`;
        showingExplanation = true;

        // 「次へ」ボタンを表示
        const nextButton = document.getElementById('next-button');
        nextButton.style.display = "block";
    }
}

// 「次へ」ボタンのクリックハンドラ
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showingExplanation = false;
        showQuestion();
    } else {
        // 5問のクイズが終了した場合
        showQuizResult();
    }
}

// クイズの表示
function showQuestion() {
    const questionElement = document.querySelector('.quiz-number');
    const optionsContainer = document.querySelector('.options');
    const resultElement = document.getElementById('result');
    const imageElement = document.getElementById('quiz-image');
    const nextButton = document.getElementById('next-button');

    if (currentQuestion < quizData.length) {
        const currentQuiz = quizData[currentQuestion];
        questionElement.textContent = currentQuiz.question;
        optionsContainer.innerHTML = "";

        // 画像の設定
        imageElement.src = currentQuiz.image;

        for (const option in currentQuiz.options) {
            const optionButton = document.createElement('button');
            optionButton.textContent = `${option}. ${currentQuiz.options[option]}`;
            optionButton.onclick = function () {
                checkAnswer(option, currentQuiz.correct);
            };
            optionsContainer.appendChild(optionButton);
        }

        nextButton.style.display = "次へ"; // 「次へ」ボタンを非表示
    } else {
        // 5問のクイズが終了した場合
        showQuizResult();
    }
}

// クイズの結果を表示
function showQuizResult() {
    const questionElement = document.querySelector('.quiz-number');
    const optionsContainer = document.querySelector('.options');
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');
    const imageElement = document.getElementById('quiz-image');
    const nextButton = document.getElementById('next-button');

    questionElement.textContent = "クイズ終了";
    optionsContainer.innerHTML = "";
    resultElement.textContent = "正解数: " + score + " / " + quizData.length;
    explanationElement.textContent = "当然全問正解しなければいけない。今回は初心者向けの問題なので間違えた問題があった場合にはどうして間違えたのか分析してよく復習すること.";
    imageElement.src = ""; // 画像を非表示にする
    nextButton.style.display = "none"; // 「次へ」ボタンを非表示
}

// クイズの初期化
initQuiz();

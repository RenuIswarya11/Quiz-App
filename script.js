const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinking Text Marking Language", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "What does JS stand for?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "JavaServer", correct: false },
            { text: "JustScript", correct: false },
            { text: "JollyScript", correct: false }
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "JavaScript Online Notation", correct: false },
            { text: "Java System Object Notation", correct: false },
            { text: "JavaScript Object Name", correct: false }
        ]
    },
    {
        question: "What is the use of the <canvas> element in HTML?",
        answers: [
            { text: "To draw graphics", correct: true },
            { text: "To create a container for images", correct: false },
            { text: "To create forms", correct: false },
            { text: "To display text", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which is not a JavaScript framework?",
        answers: [
            { text: "React", correct: false },
            { text: "Angular", correct: false },
            { text: "Vue", correct: false },
            { text: "Django", correct: true }
        ]
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            { text: "Angular", correct: false },
            { text: "jQuery", correct: false },
            { text: "ESLint", correct: true },
            { text: "RequireJS", correct: false }
        ]
    },
    {
        question: "Which company developed the React library?",
        answers: [
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Facebook", correct: true },
            { text: "Twitter", correct: false }
        ]
    },
    {
        question: "What is Git?",
        answers: [
            { text: "A version control system", correct: true },
            { text: "A programming language", correct: false },
            { text: "A software framework", correct: false },
            { text: "A web browser", correct: false }
        ]
    },
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const popup = document.getElementById('popup');
const scoreElement = document.getElementById('score');

let currentQuestionIndex, shuffledQuestions, score;

document.addEventListener('DOMContentLoaded', startGame);

function startGame() {
    popup.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct', 'wrong');
        button.disabled = false;
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        answerButtonsElement.querySelector(`button[data-correct="true"]`).classList.add('correct');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(() => {
            setNextQuestion();
        }, 1000);
    } else {
        setTimeout(showPopup, 1000);
    }
}

function showPopup() {
    questionContainer.classList.add('hide');
    scoreElement.innerText = score;
    popup.classList.remove('hide');
    setTimeout(() => {
        popup.classList.add('hide');
        startGame();
    }, 3000);
}

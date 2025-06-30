const questions1 = [
  {
    "question": "Which data structure uses FIFO (First In First Out) principle?",
    "choices": ["Stack", "Queue", "Tree", "Graph"],
    "answer": "Queue"
  },
  {
    "question": "What is the time complexity of binary search on a sorted array?",
    "choices": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    "answer": "O(log n)"
  },
  {
    "question": "Which HTML tag is used to define a hyperlink?",
    "choices": ["<link>", "<a>", "<href>", "<url>"],
    "answer": "<a>"
  },
  {
    "question": "Which protocol is used to send emails?",
    "choices": ["HTTP", "FTP", "SMTP", "IMAP"],
    "answer": "SMTP"
  },
  {
    "question": "Who developed the Python programming language?",
    "choices": ["James Gosling", "Dennis Ritchie", "Guido van Rossum", "Bjarne Stroustrup"],
    "answer": "Guido van Rossum"
  }
]

const questions2 = [
  {
    "question": "What does the CAP theorem state in distributed computing?",
    "choices": [
      "Consistency, Availability, Partition Tolerance",
      "Concurrency, Accuracy, Performance",
      "Cache, Authentication, Persistence",
      "Client, API, Protocol"
    ],
    "answer": "Consistency, Availability, Partition Tolerance"
  },
  {
    "question": "Which scheduling algorithm can suffer from starvation without aging?",
    "choices": [
      "Round Robin",
      "First Come First Serve",
      "Shortest Job Next",
      "Multilevel Queue Scheduling"
    ],
    "answer": "Shortest Job Next"
  },
  {
    "question": "Which of the following is true about the ACID properties of a database?",
    "choices": [
      "Atomicity ensures operations are always committed",
      "Consistency guarantees isolation",
      "Isolation ensures concurrent transactions do not interfere",
      "Durability prevents transaction failure"
    ],
    "answer": "Isolation ensures concurrent transactions do not interfere"
  },
  {
    "question": "In cryptography, which algorithm is asymmetric?",
    "choices": [
      "AES",
      "RSA",
      "Blowfish",
      "DES"
    ],
    "answer": "RSA"
  },
  {
    "question": "What does the term 'event loop' refer to in Node.js?",
    "choices": [
      "The function that blocks all async operations",
      "A loop that executes synchronous JavaScript only",
      "A design pattern for REST APIs",
      "A mechanism to handle async callbacks non-blockingly"
    ],
    "answer": "A mechanism to handle async callbacks non-blockingly"
  }
]

const startBtn = document.getElementById("start-btn");
const nextLvlBtn = document.getElementById("next-level-btn");
const restartBtn = document.getElementById("restart-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const choicesList = document.getElementById("choices");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
// const win1 = document.getElementById("level-1-congrats");
// const win2 = document.getElementById("level-2-congrats");
const winMsg = document.getElementById("win-message");

let currentQuestionIndex = 0;
let score = 0;
let flag = true;

startBtn.addEventListener("click", () => {
  startGame(questions1);
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if(flag) {
    LoadQuestion(questions1);
  } else {
    LoadQuestion(questions2);
  }
});

nextLvlBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  flag = false;
  startGame(questions2);
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  startGame(questions1);
});

function startGame(questions) {
  startBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  LoadQuestion(questions);
}

function LoadQuestion(questions) {
  let answered = false;
  if( currentQuestionIndex >= questions.length) { showQuizResults(); return; }
  nextBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  questionText.innerText = questions[currentQuestionIndex].question;
  choicesList.innerHTML = "";
  questions[currentQuestionIndex].choices.forEach(choice => {
    const li = document.createElement("li");
    li.classList.add("cursor-pointer", "p-2", "rounded", "hover:bg-gray-400" , "border", "border-gray-300", "mb-2");
    li.innerText = choice;
    choicesList.appendChild(li);
    li.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      if (li.innerText === questions[currentQuestionIndex].answer) {
        score++;
        li.classList.add("bg-green-500");
      } else {
        li.classList.add("bg-red-500");
      }
      Array.from(choicesList.children).forEach(choice => {
        choice.classList.add("pointer-events-none", "opacity-50");
      });
      nextBtn.classList.remove("hidden");
    });
  });
}

function showQuizResults() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreDisplay.innerText = `${score} out of ${questions1.length}`;
  if (score >= questions1.length / 2) {
    if (!flag) {
      winMsg.innerText = "Congratulations! You won the Quiz.";
      restartBtn.classList.add("hidden");
      nextLvlBtn.classList.add("hidden");
    } else {
      winMsg.innerText = "Congratulations you have cleared Level-1";
    }
    winMsg.classList.remove("hidden");
    nextLvlBtn.classList.remove("hidden");
  } else {
    restartBtn.classList.remove("hidden");
    winMsg.classList.remove("hidden");
    winMsg.innerText = "Better luck next time!";
  }
}
// Sample data
const questions = [
  {
    q: "Which company developed JavaScript?",
    choices: ["Netscape", "Microsoft", "Google", "IBM"],
    correct: 0
  },
  {
    q: "What is the output of: typeof null?",
    choices: ["object", "null", "undefined", "number"],
    correct: 0
  },
  {
    q: "Which of the following is a JavaScript data type?",
    choices: ["Float", "Number", "Decimal", "Character"],
    correct: 1
  },
  {
    q: "Which keyword declares a constant in JavaScript?",
    choices: ["let", "var", "const", "static"],
    correct: 2
  },
  {
    q: "Which method converts JSON to a JavaScript object?",
    choices: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.decode()"],
    correct: 0
  },
  {
    q: "What does NaN stand for?",
    choices: ["Not a Null", "Not a Number", "No any Number", "Negative and Null"],
    correct: 1
  },
  {
    q: "What is the output of: '2' + 2?",
    choices: ["4", "22", "NaN", "Error"],
    correct: 1
  },
  {
    q: "How do you write a comment in JavaScript?",
    choices: ["<!-- comment -->", "# comment", "// comment", "** comment **"],
    correct: 2
  },
  {
    q: "Which symbol is used for strict equality?",
    choices: ["==", "!=", "===", "!=="],
    correct: 2
  },
  {
    q: "Which of these is NOT a loop structure in JS?",
    choices: ["for", "foreach", "while", "do...while"],
    correct: 1
  }
];

let currentIndex = 0;
let answers = new Array(questions.length).fill(null);
let timeLeft = 5 * 60;
let timer;

const questionText = document.getElementById("question-text");
const choicesDiv = document.getElementById("choices");
const timeDisplay = document.getElementById("time");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    timeDisplay.textContent = `${min}:${sec}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function loadQuestion(index) {
  const q = questions[index];
  questionText.textContent = `Q${index + 1}. ${q.q}`;
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, i) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = i;
    if (answers[index] === i) input.checked = true;
    input.onclick = () => answers[index] = i;
    label.appendChild(input);
    label.append(" " + choice);
    choicesDiv.appendChild(label);
  });

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === questions.length - 1;
}

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion(currentIndex);
  }
};

nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(currentIndex);
  }
};

submitBtn.onclick = () => {
  const confirmSubmit = confirm("Are you sure you want to submit the quiz?");
  if (confirmSubmit) {
    submitQuiz();
  }
};

function submitQuiz() {
  clearInterval(timer);
  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) score++;
  });

  document.body.innerHTML = `
    <div class="container">
      <h2>Quiz Completed</h2>
      <p>Your Score: ${score} / ${questions.length}</p>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

// Start everything
window.onload = () => {
  loadQuestion(currentIndex);
  startTimer();
};

const questions = [
  {
    question: "Who was the first human to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin"],
    correctAnswer: "Neil Armstrong"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Uranus"],
    correctAnswer: "Jupiter"
  },
  {
    question: "Which star is at the center of our solar system?",
    options: ["Venus", "Mars", "Sun"],
    correctAnswer: "Sun"
  },
  {
    question: "Which spacecraft was the first to reach the Moon?",
    options: ["Apollo 11", "Sputnik 1", "Voyager 1"],
    correctAnswer: "Sputnik 1"
  }
];

const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".option");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  currentQuestion.options.forEach((option, index) => {
    optionButtons[index].textContent = option;
  });
}

function flashScreen(color) {
  document.body.style.backgroundColor = color;
  document.body.style.backgroundImage = "none"; // Remove background image temporarily
  setTimeout(() => {
    document.body.style.backgroundColor = ""; // Reset background color
    document.body.style.backgroundImage = 'url("https://tse2.mm.bing.net/th?id=OIP.fKwLkO7ajV5K6mDm7SfVywHaEo&pid=Api&P=0&h=180")'; // Restore background image
  }, 1000); // Change the delay to 1000 milliseconds (1 second)
}


function checkAnswer(selectedIndex) {
  const selectedOption = optionButtons[selectedIndex].textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedOption === correctAnswer) {
    score++;
    feedback.textContent = "Correct!";
    flashScreen("green");
  } else {
    feedback.textContent = "Incorrect. The correct answer is: " + correctAnswer;
    flashScreen("red");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    feedback.textContent = `Quiz completed! Your score is ${score} out of ${questions.length}.`;
    submitButton.disabled = true;
  }
}

displayQuestion();

submitButton.addEventListener("click", () => {
  const selectedOptionIndex = Array.from(optionButtons).findIndex(button => button.classList.contains("selected"));
  if (selectedOptionIndex !== -1) {
    checkAnswer(selectedOptionIndex);
  }
});

optionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    optionButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

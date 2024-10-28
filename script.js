let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');

function loadQuestion() {
  const currentQuestion = footballQuestions[currentQuestionIndex];
  
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectAnswer(index));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedOptionIndex) {
  const currentQuestion = footballQuestions[currentQuestionIndex];
  
  if (selectedOptionIndex === currentQuestion.correctAnswer) {
    score++;
  }

  highlightAnswers(selectedOptionIndex);
  
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
  });
  
  nextButton.style.display = 'inline-block';
}

function highlightAnswers(selectedOptionIndex) {
  const currentQuestion = footballQuestions[currentQuestionIndex];
  
  document.querySelectorAll('.option-btn').forEach((btn, index) => {
    if (index === currentQuestion.correctAnswer) {
      btn.classList.add('correct');
    } else if (index === selectedOptionIndex) {
      btn.classList.add('incorrect');
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < footballQuestions.length) {
    nextButton.style.display = 'none';
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.textContent = `Quiz Completed! Your score is ${score} out of ${footballQuestions.length}`;
  optionsElement.innerHTML = '';
  nextButton.style.display = 'none';
  restartButton.style.display = 'inline-block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  restartButton.style.display = 'none';
  loadQuestion();
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

loadQuestion();

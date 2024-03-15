// Global variables
let questions = [];

// Event listeners
document.getElementById("addQuestionBtn").addEventListener("click", addQuestion);
document.getElementById("finishBtn").addEventListener("click", finishQuiz);

// Function to add a new question
function addQuestion() {
    const question = prompt("Enter the question:");
    const options = [];
    for (let i = 0; i < 4; i++) {
        options.push(prompt(`Enter option ${i + 1}:`));
    }
    const correctAnswer = parseInt(prompt("Enter the correct answer (1-4):"));
    questions.push({ question, options, correctAnswer });
    renderQuestions();
}

// Function to render questions in the DOM
function renderQuestions() {
    const questionsContainer = document.getElementById("questionsContainer");
    questionsContainer.innerHTML = "";
    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <h3>Question ${index + 1}:</h3>
            <p>${question.question}</p>
            <ul>
                ${question.options.map((option, i) => `
                    <li>${option} ${i === question.correctAnswer - 1 ? '(Correct)' : ''}</li>
                `).join("")}
            </ul>
        `;
        questionsContainer.appendChild(questionElement);
    });
}

// Function to generate a random 6-digit code for the quiz
function generateQuizCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to save the quiz data to JSON
function saveQuizToJSON(quizCode) {
    const quizData = { quizCode, questions };
    localStorage.setItem(`quiz_${quizCode}`, JSON.stringify(quizData));
}

// Function to finish creating the quiz
function finishQuiz() {
    const quizCode = generateQuizCode();
    saveQuizToJSON(quizCode);
    alert(`Quiz created successfully! Quiz code: ${quizCode}`);
    // Redirect to another page or perform other actions as needed
}

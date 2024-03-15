// Event listener
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
    const quizCode = document.getElementById("quizCodeInput").value;
    const quizDataJSON = localStorage.getItem(`quiz_${quizCode}`);
    if (quizDataJSON) {
        const quizData = JSON.parse(quizDataJSON);
        displayQuiz(quizData.questions);
    } else {
        alert("Quiz not found. Please enter a valid quiz code.");
    }
}

// Function to display quiz questions
function displayQuiz(questions) {
    const quizQuestions = document.getElementById("quizQuestions");
    quizQuestions.innerHTML = "";
    questions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `
            <h3>Question ${index + 1}:</h3>
            <p>${question.question}</p>
            <form id="question${index}Form">
                ${question.options.map((option, i) => `
                    <input type="radio" id="option${i + 1}" name="answer" value="${i + 1}">
                    <label for="option${i + 1}">${option}</label><br>
                `).join("")}
                <button type="button" onclick="submitAnswer(${index}, ${question.correctAnswer})">Submit Answer</button>
                <p id="result${index}"></p>
            </form>
        `;
        quizQuestions.appendChild(questionElement);
    });
}

// Function to submit answer and show result
function submitAnswer(questionIndex, correctAnswer) {
    const selectedAnswer = document.querySelector(`#question${questionIndex}Form input[name="answer"]:checked`);
    if (selectedAnswer) {
        const resultElement = document.getElementById(`result${questionIndex}`);
        if (parseInt(selectedAnswer.value) === correctAnswer) {
            resultElement.textContent = "Correct!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Incorrect. Correct answer: Option ${correctAnswer}`;
            resultElement.style.color = "red";
        }
    } else {
        alert("Please select an answer.");
    }
}

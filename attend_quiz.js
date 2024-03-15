let quizData; // Global variable to store quiz data
let currentQuestionIndex = 0; // Global variable to track the current question index
let userName; // Global variable to store the user's name
let userScores = {}; // Object to store user scores

// Event listener
document.getElementById("startQuizBtn").addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
    if (!userName) {
        userName = prompt("Enter your name:");
        if (!userName) {
            alert("Please enter a valid name.");
            return;
        }
    }

    const quizCode = document.getElementById("quizCodeInput").value;
    const quizDataJSON = localStorage.getItem(`quiz_${quizCode}`);
    if (quizDataJSON) {
        quizData = JSON.parse(quizDataJSON);
        displayNextQuestion();
    } else {
        alert("Quiz not found. Please enter a valid quiz code.");
    }
}

// Function to display the next question
function displayNextQuestion() {
    if (currentQuestionIndex < quizData.questions.length) {
        const question = quizData.questions[currentQuestionIndex];
        const quizQuestions = document.getElementById("quizQuestions");
        quizQuestions.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1}</h2>
            <p>${question.question}</p>
            <form id="questionForm">
                ${question.options.map((option, i) => `
                    <input type="radio" id="option${i + 1}" name="answer" value="${i + 1}">
                    <label for="option${i + 1}">${option}</label><br>
                `).join("")}
                <button type="button" onclick="submitAnswer()">Submit Answer</button>
            </form>
        `;
    } else {
        alert("End of quiz. Thank you for participating!");
        showLeaderboard();
    }
}

// Function to submit answer and display result
function submitAnswer() {
    const selectedAnswer = document.querySelector(`#questionForm input[name="answer"]:checked`);
    if (selectedAnswer) {
        const question = quizData.questions[currentQuestionIndex];
        const correctAnswer = question.correctAnswer;
        const resultElement = document.createElement("p");
        resultElement.style.marginTop = "10px";

        if (parseInt(selectedAnswer.value) === correctAnswer) {
            resultElement.textContent = "Correct!";
            resultElement.style.color = "green";
            updateUserScore(userName);
        } else {
            resultElement.textContent = `Incorrect. Correct answer: Option ${correctAnswer}`;
            resultElement.style.color = "red";
        }

        const quizQuestions = document.getElementById("quizQuestions");
        quizQuestions.appendChild(resultElement);
        currentQuestionIndex++;
        displayNextQuestion();
    } else {
        alert("Please select an answer.");
    }
}
// Function to update user score
function updateUserScore(userName) {
    if (!userScores[userName]) {
        userScores[userName] = 1;
    } else {
        userScores[userName]++;
    }
}

// Function to display leaderboard
function showLeaderboard() {
    let leaderboardHTML = "<h2>Leaderboard</h2>";
    const sortedScores = Object.entries(userScores).sort((a, b) => b[1] - a[1]);
    sortedScores.forEach(([userName, score], index) => {
        leaderboardHTML += `<p>${index + 1}. ${userName}: ${score}</p>`;
    });
    const quizQuestions = document.getElementById("quizQuestions");
    quizQuestions.innerHTML = leaderboardHTML;
}

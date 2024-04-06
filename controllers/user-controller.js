const { options } = require("../routes/user-routes");
const allQuestions = require("../services/questions.json");
const { ok200 } = require("../utils/response-utils");

async function getQuestions(req, res, next) {
  const questionsArray = [];
  const questionIds = [];
  while (questionsArray.length < 10) {
    const question =
      allQuestions[Math.floor(Math.random() * allQuestions.length)];
    if (!questionIds.includes(question.id)) {
      questionsArray.push(question);
      questionIds.push(question.id);
    }
  }
  ok200(res, { questions: questionsArray });
}

async function evaluateQuiz(req, res, next) {
  const answerArray = req.body;
  const quizResult = [];
  let totalScore = 0;
  answerArray.forEach((answer, index) => {
    const question = allQuestions.find(
      (question) => question.id === answer.id
    );
    const correctAnswer = question.correctAnswer;
    const isCorrect = answer.answerGiven === correctAnswer;
    if (isCorrect) totalScore += 1;
    quizResult.push({
      question: question.question,
      options: question.options,
      answerGiven: answer.answerGiven,
      correctAnswer,
      isCorrect,
    });
  });
  ok200(res, { quizResult, totalScore });
}

module.exports = {
  getQuestions,
  evaluateQuiz,
};

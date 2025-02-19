const questions=[
    {
        question:"What is the largest lake in the world?",
        answers:[
            {text:"Caspian Sea", correct:false},
            {text:"Baikal", correct:true},
            {text:"Lake Superior", correct:false},
            {text:"Ontario", correct:false},
        ]
    },
    {
        question:"Which planet in the solar system is known as the “Red Planet”?",
        answers:[
            {text:"Venus" ,correct:false},
            {text:"Earth", correct:false},
            {text:"Mars", correct:true},
            {text:"Jupiter", correct:false},
        ]
    },
    {
        question:"What is the capital of Japan?",
        answers:[
            {text:"Beijing" ,correct:false},
            {text:"Tokyo", correct:true},
            {text:"Seoul" ,correct:false},
            {text:"Bangkok", correct:false},
        ]
    },
    {
        question:"Which river is the longest in the world?",
        answers:[
            {text:"Amazon", correct:false},
            {text:"Mississippi" ,correct:false},
            {text:"Nile" ,correct:true  },
            {text:"Yangtze" ,correct:false},
        ]
    },
];
const questionElement=document.querySelector(".ques h3");
const answerButtons=document.querySelector(".options")
const nextButton=document.querySelector(".next");
console.log(questions.length);
let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer=>{
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
    
}
function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
        console.log("c");
    }
    else{
        selectedBtn.classList.add("incorrect");
        console.log("I");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }    
        button.disabled=true;
    })
    nextButton.style.display="block";
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You have scored ${score} out of ${questions.length} questions`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
startQuiz();
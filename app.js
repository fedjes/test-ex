const DATA = [
    {
        question: 'вопрос 1',
        answers: [
            {
                id: '1',
                value: 'ответ1',
                correct: true,
            },
            {
                id: '2',
                value: 'ответ2',
                correct: false,
            },
            {
                id: '3',
                value: 'ответ3',
                correct: false,
            },
           
        ]
    },
    {
        question: 'вопрос 2',
        answers: [
            {
                id: '4',
                value: 'ответ1',
                correct: false,
            },
            {
                id: '5',
                value: 'ответ2',
                correct: true,
            },
       
           
        ]
    },
    {
        question: 'вопрос 3',
        answers: [
            {
                id: '6',
                value: 'ответ1',
                correct: false,
            },
            {
                id: '7',
                value: 'ответ2',
                correct: true,
            },
            {
                id: '8',
                value: 'ответ1',
                correct: false,
            }
       
           
        ]
    },
    {
        question: 'вопрос 4',
        answers: [
            {
                id: '9',
                value: 'ответ1',
                correct: false,
            },
            {
                id: '10',
                value: 'ответ2',
                correct: false,
            },
            {
                id: '11',
                value: 'ответ2',
                correct: true,
            }
       
           
        ]
    }
];



const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

 let localResults ={};

const renderQuestions = (index) =>{
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map((answer)=> `
            <li>
                 <label>
                <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                ${answer.value}
                </label>
            </li>
        `)
    .join('');

    questions.innerHTML = `
    <div class="quiz-questions-item">
            <div class="quiz_questions-item__question"> ${DATA[index].question} </div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () =>{
    let content = '';

    getClassName = (answer, questionIndex) => {
        let classname = '';
        if(!answer.correct && answer.id === localResults[questionIndex]){
            classname = 'answer--invalid';
        }else if(answer.correct){
            classname = 'answer--valid';
        }
        return classname;
    };

    const getAnswers =(questionIndex)=> DATA[questionIndex].answers
    .map((answer)=> `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
        .join('');
    
    DATA.forEach((question, index)=>{
        content += `
        <div class="quiz-results-item">
            <div class="quiz-results-item__question">${question.question}</div>
                <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
        </div>
        `;
    });

    results.innerHTML = content;
}

const renderIndicator = (currentStep) =>{
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
}

quiz.addEventListener('change', (event)=>{
    if(event.target.classList.contains('answer-input')) { 
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
})

quiz.addEventListener('click', (event)=>{
    //next, restart btn
  
    if (event.target.classList.contains('btn-next')) {
        const nextQuestIndex = Number(questions.dataset.currentStep) + 1;
        

        if(DATA.length === nextQuestIndex) {
                //step result
            
            questions.classList.add('question--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            renderResults();
        } else {
            renderQuestions(nextQuestIndex) //next quest step
        }

        btnNext.disabled = true;
    }

    if(event.target.classList.contains('btn-restart')) {
        console.log('restart');
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('question--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');

        renderQuestions(0); //выводим первый вопрос 
    }
})

renderQuestions(0);
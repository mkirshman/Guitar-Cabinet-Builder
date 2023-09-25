var cabinetData = new Array();

function cycleSubQuestions(action, questions, subQuestions, currentQuestionId){
    var returnVar = false
    for(var i = 0 ; i < subQuestions.length ; i++){
       
        if( subQuestions[i].classList.contains('current')
        && i < subQuestions.length ){
            
            
            if(action === 'next'){
                if(i !== (subQuestions.length-1)){
                    subQuestions[i].classList.remove('current');
                    subQuestions[i+1].classList.add('current');
                    returnVar = false;
                    break;
                
                }else{

                    questions[i].classList.remove('current');
                    // alert(document.getElementById(currentQuestionId).getAttribute('id'))
                    questions[i+1].classList.add('current');
                    subQuestions[i].classList.remove('current');
                    returnVar = true;
                    break;
                    

                }
            }else if(action === 'previous'){
                if(i > 0){
                    subQuestions[i].classList.remove('current');
                    subQuestions[i-1].classList.add('current');
                    returnVar = false;
                    break;
                
                }else{

                    questions[i].classList.remove('current');
                    // alert(document.getElementById(currentQuestionId).getAttribute('id'))
                    if(i>0){
                        questions[i-1].classList.add('current');
                    }
                    subQuestions[i].classList.remove('current');
                    returnVar = true;
                    break;
                    

                }
            }
    
        }
    }

    return returnVar;
}

function nextBtnHandler(){
    //add data to cabinetData array
    //get current question id
    var questions = document.getElementsByClassName('step');
    var subQuestions = document.getElementsByClassName('sub-step');
    var questionNum = 'q'+(questions.length-1);
    var subQuestionNum = 'q3-sq'+(subQuestions.length-1);
    var allSubQuestionsPrev = '';
    var allSubQuestionsCurrent = '';
    var allSubQuestionsNext = '';
    var currentQuestionIndex = '';

    for(var i = 0 ; i < questions.length ; i++){

        if( questions[i].classList.contains('current')
        && i < questions.length ){
            currentQuestionIndex = questions[i].getAttribute('id');
            allSubQuestionsCurrent = questions[i].querySelectorAll('.sub-step');
                allSubQuestionsNext = questions[i+1].querySelectorAll('.sub-step');

                
                
            if(allSubQuestionsNext.length === 0 && allSubQuestionsCurrent.length === 0){
                questions[i].classList.remove('current');
                questions[i+1].classList.add('current');
               
               
            }else if(allSubQuestionsNext.length > 0 && allSubQuestionsCurrent.length === 0){
                questions[i].classList.remove('current');
                questions[i+1].classList.add('current');
                subQuestions[0].classList.add('current');
               
            }else if(allSubQuestionsCurrent.length > 0){
                
                var cycledSubQuestions = cycleSubQuestions('next', questions, subQuestions, i);
                // alert(cycledSubQuestions)
                if(cycledSubQuestions === true){
                    for(var j = 0 ; j < questions.length ; j++){
                        questions[j].classList.remove('current');
                    }
                    
                    questions[i+1].classList.add('current');
                    break;
                    
                }
        
            } 
          
            if(questions[i].getAttribute('id') === 'q1'){
                    document.getElementById('mkbtn-previous').classList.remove('disabled');
            }
            if(questions[i].getAttribute('id') === questionNum){
                document.getElementById('mkbtn-submit').classList.remove('disabled');
                document.getElementById('mkbtn-next').classList.add('disabled');
            }
            break; 
            
        }
    }

}

function previousBtnHandler(){
    //add data to cabinetData array
    //get current question id
    var questions = document.getElementsByClassName('step');
    var subQuestions = document.getElementsByClassName('sub-step');
    var questionNum = 'q'+(questions.length);
    var subQuestionNum = 'q3-sq'+(subQuestions.length-1);
    var allSubQuestionsPrev = '';
    var allSubQuestionsCurrent = '';
    var allSubQuestionsNext = '';
    var currentQuestionIndex = '';

    for(var i = 0 ; i < questions.length ; i++){

        if( questions[i].classList.contains('current')
        && i < questions.length ){
            currentQuestionIndex = questions[i].getAttribute('id');
            allSubQuestionsCurrent = questions[i].querySelectorAll('.sub-step');
                allSubQuestionsNext = questions[i-1].querySelectorAll('.sub-step');

                
                
            if(allSubQuestionsNext.length === 0 && allSubQuestionsCurrent.length === 0){
                questions[i].classList.remove('current');
                questions[i-1].classList.add('current');
               
               
            }else if(allSubQuestionsNext.length > 0 && allSubQuestionsCurrent.length === 0){
                questions[i].classList.remove('current');
                questions[i-1].classList.add('current');
                subQuestions[subQuestions.length-1].classList.add('current');
               
            }else if(allSubQuestionsCurrent.length > 0){
                
                var cycledSubQuestions = cycleSubQuestions('previous', questions, subQuestions, i);
                // alert(cycledSubQuestions)
                if(cycledSubQuestions === true){
                    for(var j = 0 ; j < questions.length ; j++){
                        questions[j].classList.remove('current');
                    }
                    
                    questions[i-1].classList.add('current');
                    break;
                    
                }
        
            } 
            
          
            if(questions[i].getAttribute('id') === 'q2'){
                    document.getElementById('mkbtn-previous').classList.add('disabled');
            }
            if(questions[i].getAttribute('id') === questionNum){
                document.getElementById('mkbtn-submit').classList.add('disabled');
                document.getElementById('mkbtn-next').classList.remove('disabled');
            }
            break; 
            
        }
    }
}

function submitBtnHandler(){
    //add event to add cabinetData array to the woocommerce cart(wp-admin ajax hook), then redirect to the shopping cart page
}

function buttonHandler(){
    var buttonClicked = this.getAttribute('id');

    switch(buttonClicked.trim()){
        case 'mkbtn-previous' :
        previousBtnHandler();
        break;
        case 'mkbtn-next' :
            
        nextBtnHandler();
        break;
        case 'mkbtn-submit' :
            submitBtnHandler();
        break;
    }
}

function addAllEventListeners(){
    var prevButton = document.getElementById('mkbtn-previous');
    var nextButton = document.getElementById('mkbtn-next');
    var submitButton = document.getElementById('mkbtn-submit');
    prevButton.addEventListener('click', buttonHandler);
    nextButton.addEventListener('click', buttonHandler);
    submitButton.addEventListener('click', buttonHandler);
}

function loadCabinetBuilder(){
    if(document.getElementsByClassName('mk-cabinet-builder').length > 0){
        addAllEventListeners();
    }
}

window.addEventListener('load', loadCabinetBuilder);


    
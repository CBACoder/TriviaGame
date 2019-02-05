$(document).ready(function() {

    //initialize variables here

    // vars to store the counts for correct and incorrect, unanswered questions
    var correctAnswers = 0;
    var incorrectAnswers =0;
    var unAnswered =0;
    var quizTime = 10;
    var intervalId;
    var isRunning=false;
    var radioButtonArray=["q1","q2","q3"];
    // // declare a variable to holds the questions this section will be for the advanced section.
    // var quiz = [
    //     {
    //         question: "Who was the first president of USA?",
    //         answerOptions: {
    //             A:"Ronald Reagan",
    //             B: "Denis Roberts",
    //             c: "Barack Obama",
    //             D: "George Washington"
    //         },
    //         correctAnswer: "D"
    //     },
    //     {
    //         question: "In which year did Minnesota become a state?",
    //         answerOptions: {
    //             A:"1958",
    //             B: "1889",
    //             c: "1858",
    //             D: "1833"
    //         },
    //         correctAnswer: `C`
    //     }    
    // ]
    
    // for(let i=0; i<quiz.length;i++){
    //     console.log('quiz length : ',quiz.length);
    //     console.log('i is :',i);
    //     console.log('question ',i, quiz[i].question);
    //     console.log('answer options: ',quiz[i].answerOptions);
    //     console.log('Correct answer is: ',quiz[i].correctAnswer) ;
    // }

    // // display the quiz on the div

    // // click handle goes here: when use selects an answer
    // $(".answerSelector").on("click", function(event){
    //     console.log('you selected :',$(this).val());
    //     userAnswerArray[parseInt($(this).name)] = $(this).val();

    //     console.log("response arrar",userAnswerArray);
    // });


// THE SIMPLE GAME STARTS HERE commented above 11-51 for the advanced game coding

//hide the results div on load game
    $("#displayResult").hide();
    
    // add a click for the start game to hide the start button and display the quiz
    $("#btnStart").on("click", function(){
        quizTime = 10;
        $("#startDiv").hide();
        $("#mainQuiz").show();
        run();
    });

    // add click function for stop quiz and display result div
    $("#btnStop").on("click", function(){
        stop();
        $("#mainQuiz").hide();
        for(let j=0; j<radioButtonArray.length; j++){
            getAnswers(radioButtonArray[j]);
        }

        $("#displayResult").show();

        $('#correctAnswers').text('Correct Answers : '+correctAnswers);
        $('#inCorrectAnswers').text('Incorrect Answers : '+incorrectAnswers);
        $('#unAnswered').text('Unswered : '+unAnswered);
    })

    // add a click function for the restart quiz
    $("#btnResetQuiz").on("click",function(){
        stop();
        console.log("interval id : ",intervalId);
        console.log('is running true/false: ',isRunning);
        console.log("quiz initial start : ",quizTime);
        $("#displayResult").hide();
        $("#mainQuiz").show();
        
        run();
        console.log("interval id : ",intervalId);
        console.log('is running true/false: ',isRunning);
        console.log("quiz initial start : ",quizTime);
    })

    // add answer selection click function



    // timer function
    function decrement() {
        quizTime--;
        $("#timeRemaining").html("<h5> Time Remaining : " + quizTime + "</h5>");
        if (quizTime === 0) {
            isRunning = false;
            clearInterval(intervalId);
            $("#mainQuiz").hide();
            $("#displayResult").show();
        }
    }

    // stop quiz timer
    function stop() {
        isRunning = false;
        quizTime = 10;
        clearInterval(intervalId);
    }


    // quiz timer run function
    function run() {
        if (isRunning === false && quizTime >0) {
            intervalId = setInterval(decrement, 1000);
            isRunning = true;
        } else {
            console.log("Interval already running")
        }
    }
    
    // function to check for answers
    function getAnswers(radioName) {

        var rdButton = document.getElementsByName(radioName);
        var rdButtonValue = '';

        for (var i = 0, length = rdButton.length; i < length; i++) {
            if (rdButton[i].checked) {
                rdButtonValue = rdButton[i].value;
                // if answer is correct increment otherwise decrement
                if(radioName === "q1" && rdButtonValue === 'D'){
                    correctAnswers++; 
                }else{
                    incorrectAnswers++;
                }
                // only one radio can be logically checked, don't check the rest
                break;
            }else{
                //increment unanswered
                unAnswered++;
            }
        }
    }


});
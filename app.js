$(".stopwatch-btn").click(function(){
  $(".outer-wrapper > div").slideUp()
  $(".stopwatch").slideDown()
  $(".type").html("stopwatch")
})
$(".timer-btn").click(function(){
  $(".outer-wrapper > div").slideUp()
  $(".timer").slideDown()
  $(".type").html("timer")
})

$(".back-btn").click(function(){
  $(".outer-wrapper > div").slideUp()
  $(".clock").slideDown()
  $(".type").html("clock")
})


const addTrailingZero = (num) =>{
    return num < 10 ? "0" + num : num;
  };

const updateTime = () =>{
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "pm" : "am";
  let otherampm = hours >= 12 ? "am" : "pm";


  //converting 24h to 12
  hours = hours % 12 || 12;

//add zeros if less than 10
hours = addTrailingZero(hours);
minutes = addTrailingZero(minutes);
seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
   $("#min").html(minutes);
   $("#sec").html(seconds);
   $("#ampm").html(ampm);
   $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

//stopwatch

let stopwatchHours = 0
    stopwatchMinutes = 0
    stopwatchSeconds = 0
    stopwatchMiliSeconds = 0
    stopwatchRunning = false
    laps = 0
    stopwatchInterval=0;


const stopwatch = () =>{
    stopwatchMiliSeconds++
    if(stopwatchMiliSeconds == 100){
       stopwatchSeconds++
       stopwatchMiliSeconds =0
    }
    if(stopwatchSeconds == 60){
        stopwatchMinutes++
        stopwatchSeconds = 0
       
     }
     if(stopwatchMinutes == 60){
        stopwatchHours++
        stopwatchMinutes = 0
     }

     //shows values
     $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
     $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
     $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
     $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}
 

//function to start stopwatch

 const startStopwatch = () =>{
   if(!stopwatchRunning){
    stopwatchInterval = setInterval(stopwatch, 10)
    stopwatchRunning = true
   }
 }
 const stopStopwatch = () =>{
     clearInterval(stopwatchInterval)
     stopwatchRunning = false
  }

 //reset
 const resetStopwatch = () =>{
    //clear and set all values
  clearInterval(stopwatchInterval)
    stopwatchHours = 0
    stopwatchMinutes = 0
    stopwatchSeconds = 0
    stopwatchMiliSeconds = 0
    stopwatchRunning = false
    laps = 0

    //update values
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("")
 }

  //stopwatch start button
  $(".start-stopwatch").click(function(){
    startStopwatch()
    //hide start button show lap
    $(".start-stopwatch").hide()
    $(".lap-stopwatch").show()
  })
  //reset stopwatch button
  $(".reset-stopwatch").click(function(){
    resetStopwatch()
    //hide lap button show start
    $(".start-stopwatch").show()
    $(".lap-stopwatch").hide()
  })
  //lap button
  $(".lap-stopwatch").click(function(){
    laps++
    //remove active class
    $(".lap").removeClass("active")
    $(".laps").prepend(
       `<div class="lap active">
       <p>lap ${laps}</p>
       <p>
       ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} :
       ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}
       </p>
   </div>` 
    )
  

  })

  //timer
  let time = 0
    timerHours = 0
    timerMinutes = 0
    timerSeconds = 0
    timerMiliSeconds = 0
    timerInterval= 0;

const getTime = () =>{
  time = prompt("Enter time in minutes")
  time = time * 60
  setTime()
}    

const setTime = () =>{
  timerHours = Math.floor(time / 3600)
  timerMinutes = Math.floor((time % 3600) / 60)
  timerSeconds = Math.floor(time % 60)

  //shows values
  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliSeconds));
}

const timer = () =>{
 timerMiliSeconds--
 if(timerMiliSeconds == -1){
  timerMiliSeconds = 99
  timerSeconds--
 }
 if(timerSeconds == -1){
  timerSeconds = 59
  timerMinutes--
 }
 if(timerMinutes == -1){
  timerMinutes = 59
  timerHours--
 }

 //update values
 $("#timer-hour").html(addTrailingZero(timerHours));
 $("#timer-min").html(addTrailingZero(timerMinutes));
 $("#timer-sec").html(addTrailingZero(timerSeconds));
 $("#timer-ms").html(addTrailingZero(timerMiliSeconds));

 //check time up
 timeup()

}
const startTimer = () =>{
  if ((timerHours == 0) & (timerMinutes == 0) && timerSeconds ==0 && timerMiliSeconds == 0){
    getTime()
  } else {
    timerInterval = setInterval(timer, 10)
    $(".start-timer").hide()
    $(".stop-timer").show()
  }
}

const stopTimer = () =>{
  clearInterval(timerInterval)
  $(".start-timer").show()
  $(".stop-timer").hide()
}

const resetTimer = () =>{
  stopTimer()
  time = 0
  setTime()
}
 const timeup = () =>{
  if (timerHours == 0 && timerMinutes == 0 
       && timerSeconds ==0 && timerMiliSeconds == 0){
        resetTimer()
        alert("Tiime`s up")
       }
 }

$(".start-timer").click(function (){
  startTimer()
})
$(".stop-timer").click(function (){
  stopTimer()
})
$(".reset-timer").click(function (){
  resetTimer()
})
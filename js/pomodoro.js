var sessionSetTime = 25, breakSetTime = 5,
    clockMin = 0, clockSecs = 0,
    paused = true, started = false, work = true,
    statusTxt = "Time To Work!",
    timerID,
    alarm = new Audio('http://cdn.rawgit.com/ignacio-long/freeCodeCamp_projectFiles/master/Pomodoro%20Bell.mp3');


// Time Control Refresh
function refreshCtrls() {
   $("#session").text(sessionSetTime);
   $("#break").text(breakSetTime);
   displayClock(sessionSetTime, 0);
}


// Display Formatted
function displayClock(min, sec) {
   var minutes, seconds;
   minutes = min < 10 ? "0" + String(min) : String(min);
   seconds = sec < 10 ? "0" + String(sec) : String(sec);
   $("#timer").text(minutes + ":" + seconds);
}


// Let's Do The Pomodoro, Baby!!
function runTheClock() {
   // Counter
   clockSecs -= 1;
   if (clockSecs < 0) {
      clockMin -= 1;
      clockSecs = 59;
   }

   // Display Time
   displayClock(clockMin, clockSecs);

   // Sound Alarm & Alternate Work/Break Sessions
   if (clockMin === 0 && clockSecs === 0) {
      clockSecs = 0;
      alarm.play();
      if (work) {
         work = false;
         clockMin = breakSetTime;
         statusTxt = "Time To Relax!";
      } else {
         work = true;
         clockMin = sessionSetTime;
         statusTxt = "Time To Work!";
      }
      $('#status').text(statusTxt);
   }
}


// Full Reset
function reset() {
   clockMin = sessionSetTime;
   clockSecs = 0;
   $('.controls').show(800);
   $('#resetBtn').hide();
   $('#status').text("Click Here To Start");
   displayClock(sessionSetTime, 0);
   started = false;
}



// -------------------- App Core -------------------- //

$(document).ready(function() {
   refreshCtrls();
   reset();

   // Time Control Button Assignments 
   $("#sessionLess").on('click', function() {
      if (sessionSetTime > 1) {
         sessionSetTime--;
         refreshCtrls();
      }
   });


   $("#sessionMore").on('click', function() {
      if (sessionSetTime < 60) {
         sessionSetTime++;
         refreshCtrls();
      }
   });


   $("#breakLess").on('click', function() {
      if (breakSetTime > 1) {
         breakSetTime--;
         refreshCtrls();
      }
   });


   $("#breakMore").on('click', function() {
      if (breakSetTime < 30) {
         breakSetTime++;
         refreshCtrls();
      }
   });


   // theClock Starts and Pauses the Pomodoro!
   $("#theClock").on('click', function() {
      if (!started) {
         started = true;
         clockMin = sessionSetTime;
      }
      if (paused){
         paused = false;
         timerID = setInterval(runTheClock, 1000);
         $('.controls').hide(800);
         $('#resetBtn').hide(200);
         $('#status').text(statusTxt);
      } else if (!paused) {
         clearInterval(timerID);
         paused = true;
         $('#status').text("Paused");
         $('#resetBtn').show(200);
      }

   });


   // Reset Btn shows up in Pause Mode
   $('#resetBtn').on('click', function() {
      reset();
   });

});
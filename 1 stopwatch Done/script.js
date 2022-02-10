var startButton = document.querySelector(".startButton");
var timer = document.querySelector(".watch");
var reset = document.querySelector(".resetButton");
var pauseOrPlay = document.querySelector(".toggleButton");
var historyT = document.querySelector(".historyTime");
var maximize = document.querySelector(".maximize");

var newDateTime;
var interval;
var timerRunnig = false;
var pauseTime = true;
var time = [0, 0, 0]
// time[0] = minute
// time[1] = second
// time[2] = second/100

function leadingZero(timee) {
  if (timee <= 9) {
    timee = "0" + timee;
  }
  return timee;
}

function runTime() {
  time[2]++;

  if (time[2] == 100) {
    time[2] = time[2] - 100;
    time[1]++;
  }
  if (time[1] == 60) {
    time[1] = time[1] - 60;
    time[0]++;
  }
  var currentTime = leadingZero(time[0]) + ":" + leadingZero(time[1]) + "." + leadingZero(time[2]);
  timer.innerHTML = currentTime;
}

function startTime() {
  if (timerRunnig == false) {
    interval = setInterval(function () {
      runTime();
    }, 10);
    timerRunnig = true;
  }
}

function resetTime() {
  time = [0, 0, 0]
  timerRunnig = false;
  clearInterval(interval);
  interval = null;
  setTimeout(function () {
    runTime();
  }, interval);
  timer.innerHTML = "00:00.00";
  time[2] -= 1;
}

var container = 1;
function createLiForHistory(newDate) {
  if (newDate == "h") {
    // historyT.removeChild(historyT.lastElementChild);
    // historyT.removeChild(historyT.lastChild);
    // historyT.children.remove();
    historyT.innerHTML="";
  }else{
    var newDiv = document.createElement("div");
    historyT.appendChild(newDiv);
    
    var newSpan = document.createElement("span");
    var textSpan = document.createTextNode(container++ + "." );
    newSpan.appendChild(textSpan);
    newDiv.appendChild(newSpan);
    
    var newLi = document.createElement("li");
    var textLi = document.createTextNode(time[0] + ":" + time[1] + "." + time[2]);
    newLi.appendChild(textLi);
    newDiv.appendChild(newLi);
  }
}



function toggleTime() {

  if (pauseTime = true) {
    clearInterval(interval);

    time.innerHTML = newDateTime;
    createLiForHistory();
    pauseTime = false;
    timerRunnig = false;
  }

  if (pauseTime = false) {
    startTime();
    pauseTime = true;
    timerRunnig = true;
  }
}

function maximizeDo(){
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    element = maximize.get(0);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}

window.onload = function () {
  startButton.onclick = function () {
    startTime();
  }
  reset.onclick = function () {
    container = 1;
    resetTime();
    createLiForHistory("h");
    startButton.innerHTML = "start";
  }
  pauseOrPlay.onclick = function () {
    toggleTime();
    startButton.innerHTML = "play";
  }
  maximize.onclick = function () {
    maximizeDo();
  }
}

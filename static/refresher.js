// code inspired by Brandt Lareau @https://jsfiddle.net/newdark/rGRA3/

// Refresh Rate is how often you want to refresh the page 
// based off the user inactivity. 
var refresh_rate = 3600; //<-- refresh every one hour or 3600 seconds
var last_user_action = 0;
var has_focus = false;
var lost_focus_count = 0;
// If the user loses focus on the browser to many times 
// we want to refresh anyway even if they are typing. 
// This is so we don't get the browser locked into 
// a state where the refresh never happens.    
var focus_margin = 10;

// Reset the Timer on users last action
function reset() {
  last_user_action = 0;
  updateVisualTimer(refresh_rate);
}

function updateVisualTimer(value) {
  var element = document.getElementById('refreshTimer');
  if (value) {
    element.textContent = value;
//   } else if (has_focus) { // will not refresh
//     element.textContent = "has focus so will not refresh";
//   } else if (last_user_action >= refresh_rate) {
//     element.textContent = 'Refreshing';
  } else {
    element.textContent = (refresh_rate - last_user_action);
  }
}

function windowHasFocus() {
  has_focus = true;
}

function windowLostFocus() {
  has_focus = false;
  lost_focus_count++;
  console.log(lost_focus_count + " <~ Lost Focus");
}

// Count Down that executes ever second
setInterval(function() {
  last_user_action++;
  refreshCheck();
  updateVisualTimer();
}, 1000);

// The code that checks if the window needs to reload
function refreshCheck() {
  var focus = window.onfocus;
  if ((last_user_action >= refresh_rate && !has_focus && document.readyState == "complete") || lost_focus_count > focus_margin) {
    window.location.reload(); // If this is called no reset is needed
    reset(); // We want to reset just to make sure the location reload is not called.
  }

}
window.addEventListener("focus", windowHasFocus, false);
window.addEventListener("blur", windowLostFocus, false);
window.addEventListener("click", reset, false);
window.addEventListener("mousemove", reset, false);
window.addEventListener("keypress", reset, false);
window.addEventListener("scroll", reset, false);
document.addEventListener("touchMove", reset, false);
document.addEventListener("touchEnd", reset, false);
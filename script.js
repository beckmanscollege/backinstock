

const inputs = document.querySelectorAll("input");
const order = [0, 1, 2, 3, 4];
const labels = document.querySelectorAll("label");
let swiping = false;
let index = getActiveInput();
let slideIndex;
let activeInput = inputs[index];

for (let label of labels) {
  label.addEventListener("click", function() {
    window.location.href = label.getAttribute("data-href");
  });
}

function getActiveInput() {
  let i = 0;
  for (let input of inputs) {
    if (input.checked === true) {
      return i;
    }
    i++;
  }
}

function goLeft() {
  let last = order.pop();
  order.unshift(last);
  slideIndex = order[0];
  index = order[2];
  update();
}

function goRight() {
  let first = order.shift();
  order.push(first);
  slideIndex = order[4];
  index = order[2];
  update();
}

function update() {
  console.log(order)
  inputs[index].checked = true;
  let label = labels[slideIndex]
  label.classList.add("hide");
  setTimeout(function() {
    label.classList.remove("hide");
  }, 400);
  //document.querySelector("#log").textContent = index;
}

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchend", handleTouchEnd, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchEnd(evt) {
  swiping = false;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      if (swiping === false) {
        goRight();
      }
    } else {
      if (swiping === false) {
        goLeft();
      }
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
  swiping = true;
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    showImage();
    setInterval(hideImage, 0);
  }, 3800);
});
function hideImage() {
  document.getElementById("wrapperHideShow").style.display = "none";
}
function showImage() {
  document.getElementById("wrapperHideShow").style.display = "block";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



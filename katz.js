const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
let swiping = false;
let index = getActiveInput();
let activeInput = inputs[index];

/* label click goes to website */

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

function goToInput() {
  if (index > inputs.length) index = 0;
  if (index < 0) index = inputs.length - 1;
  inputs[index].checked = true;
  document.querySelector("#log").textContent = index;
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
        index++;
        goToInput();
      }
    } else {
      if (swiping === false) {
        index--;
        goToInput();
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



var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function goBack() {
  window.history.back();
}

// Remove the transition class
const square = document.querySelector('.stang-container');
square.classList.remove('stang-container-transition');

// Create the observer, same as before:
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      square.classList.add('stang-container-transition');
      return;
    }

    square.classList.remove('stang-container-transition');
  });
});

observer.observe(document.querySelector('.stang-ani'));
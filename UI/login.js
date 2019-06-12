function openForm() {
 	document.getElementById('myForm').style.display = 'block';
 	document.getElementById('id001').style.display = 'none';
}

function closeForm() {
 	document.getElementById('myForm').style.display = 'none';
}
function openSignup() {
	  document.getElementById('id001').style.display = 'block';
	  document.getElementById('myForm').style.display = 'none';
}
function closeSignup() {
 	document.getElementById('id001').style.display = 'none';
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

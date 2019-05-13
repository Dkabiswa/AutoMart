let Index = 0;
//slide();

function slide() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  Index++;
  if (Index > x.length) {Index = 1} 
  x[Index-1].style.display = "block"; 
  setTimeout(slide, 2000); // Change image every 2 seconds
}
function goBack() {
	window.history.back();
}
let y =document.getElementById('ul1');
let x =document.getElementById('i1');

function openMenu() {
	if(y.style.display === "block"){
		y.style.display = "none";
	}
	else {
		y.style.display = "block";
	}
}

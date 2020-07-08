function pageSelect(x) {
	var elems=document.getElementsByClassName('main');
	for(var i=0; i<elems.length; i++){
		elems[i].style.display='none';
	}
	elems[x].style.display='block';
}
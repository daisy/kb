
// remove the "enhanced by google" background from the search box before displaying it

function clean_search() {

	var search_box = document.getElementById('gsc-i-id1');
	var search_div = document.getElementById('search');
	
	if (search_box) {
		search_box.style.background = '';
		search_div.removeAttribute('hidden');
	}
	
	else {
		window.setTimeout(clean_search, 100);
	}
}

window.setTimeout(clean_search, 100);

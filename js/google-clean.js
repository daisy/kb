
// remove the "enhanced by google" background from the search box before displaying it

function clean_search() {

	var search_box = document.getElementById('gsc-i-id1');
	var search = (document.getElementsByTagName('search'))[0];
	
	if (search_box) {
		search_box.style.background = '';
		search.removeAttribute('hidden');
		
		// erase google's attempts to re-insert the branding when focus leaves
		search_box.addEventListener('blur', strip_searchbg);
	}
	
	else {
		window.setTimeout(clean_search, 100);
	}
}

window.setTimeout(clean_search, 100);

function strip_searchbg() {
	var search_box = document.getElementById('gsc-i-id1');
		search_box.style.background = '';
}

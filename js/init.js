
window.onload = makeMiniToc();

function makeMiniToc() {
	
	var main = document.querySelector('main');
	
	if (main === null) {
		console.log('Could not find main element. Unable to insert mini-toc.');
		return;
	}
	
	var nav = document.createElement('nav');
		nav.setAttribute('role', 'doc-toc');
		nav.setAttribute('class', 'mini-toc');
	
	/* add section heading */
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode('In this section:'));
	
	nav.appendChild(h3);
	
	var ol = document.createElement('ol');
	
	var headings = document.querySelectorAll('h3');
	
	headings.forEach(function(heading) {
		var li = document.createElement('li');
		
		var a = document.createElement('a');
			a.setAttribute('href','#'+heading.id);
			a.appendChild(document.createTextNode(heading.textContent == 'Frequently Asked Questions' ? 'FAQ' : heading.textContent));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	});
	
	nav.appendChild(ol);
	
	var breadcrumb = document.querySelector('main > nav.breadcrumb');
	
	if (breadcrumb === null) {
		var h2 = document.querySelector('h2');
		h2.insertAdjacentElement('afterEnd', nav);
	}
	
	else {
		breadcrumb.insertAdjacentElement('afterEnd', nav);
	}
}

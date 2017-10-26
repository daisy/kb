
window.onload = makeMiniToc();

function makeMiniToc() {
	
	var mini_toc = document.getElementById('mini-toc');
	
	if (mini_toc === null) {
		console.log('Could not find nav element with id=mini-toc.');
		return;
	}
	
	/* add section heading */
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode('In this section:'));
	
	mini_toc.appendChild(h3);
	
	var ol = document.createElement('ol');
	
	var headings = document.querySelectorAll('h3');
	
	headings.forEach(function(heading) {
		var li = document.createElement('li');
		
		var a = document.createElement('a');
			a.setAttribute('href','#'+heading.id);
			a.appendChild(document.createTextNode(heading.textContent));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	});
	
	mini_toc.appendChild(ol);
}

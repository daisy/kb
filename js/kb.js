
/* 
 * 
 * KB Class
 * 
 */

function KB() {
	
	this.shortForms = {};
		this.shortForms.en = {
			"Frequently Asked Questions": "FAQ"
		};
		this.shortForms.ja = {
		    "よくある質問": "よくある質問"
		};
	
	this.ui = {};
		this.ui.en = {
			"copy": "Copy",
			"permalinkSymbol": "§ "
		};
		this.ui.ja = {
		    "copy": "コピー",
		    "permalinkSymbol": "§"
		};
	
	this.lang = document.documentElement.lang ? document.documentElement.lang.toLowerCase() : 'en';
	
	if (page_info.hasOwnProperty('404') && page_info['404']) {
		if (document.location.href.match('/ja/')) {
			this.lang = 'ja';
		}
	}
}


KB.prototype.initialize = function () {
	this.generateMiniToc();
	this.trackCurrentHeading();
	this.addPermaLinks();
	this.addExampleCopy();
	this.splitOnixHd();
	
	// call google pretty print for the examples
	prettyPrint();
	
	// ensure target location gets scrolled into view
	var hash = window.location.hash;
	
	if (hash) {
		this.scrollHash(hash);
	}
}


/* 
 * 
 * Generate the mini table of contents for the page
 * 
 */

KB.prototype.generateMiniToc = function () {

	var mini_nav = document.getElementById('mini-nav');
	
	if (!mini_nav) {
		return;
	}
	
	// grab all the subsection headings on the page
	var h = document.querySelectorAll('div#body h3');
	
	if (h.length > 0) {
	
		var ol = document.createElement('ol');
			ol.setAttribute('role', 'list');
			ol.setAttribute('id', 'mini-toc');
		
		// iterate each heading and add a link to it
		for (var i = 0; i < h.length; i++) {
			
			var li = document.createElement('li');
			var parent = h[i].parentNode;
			
			var a = document.createElement('a');
				a.setAttribute('href','#'+parent.id);
				
				// if a short form of a title is necessary for the menu, add to the shortForm section of the messages file
				var sectionName = h[i].textContent.trim();
					sectionName = this.shortForms[this.lang].hasOwnProperty(h[i].textContent) ? this.shortForms[this.lang][h[i].textContent] : h[i].textContent;
				
				a.appendChild(document.createTextNode(sectionName));
			 
			 li.appendChild(a);
			 
			 if (page_info.hasOwnProperty('addh4') && page_info.addh4) {
			 
			 	var h4 = parent.querySelectorAll('div#body h4');
			 	
			 	if (h4) {
			 	
			 		var sub_ol = document.createElement('ol');
			 		
			 		for (var j = 0; j < h4.length; j++) {
			 			
			 			var sub_li = document.createElement('li');
			 			
			 			var sub_a = document.createElement('a');
			 				sub_a.setAttribute('href', '#' + h4[j].parentNode.id);
			 				sub_a.appendChild(document.createTextNode(h4[j].textContent.trim()));
			 			
			 			sub_li.appendChild(sub_a);
			 			
			 			sub_ol.appendChild(sub_li);
			 			
			 		}
			 		
			 		li.appendChild(sub_ol);
			 	}
			 }
			 
			 ol.appendChild(li);
		}
		
		mini_nav.appendChild(ol);
	}
}


/* 
 * 
 * Add permalinks for examples and faqs
 * 
 */

KB.prototype.addPermaLinks = function() {

	var hasExamples = document.getElementById('ex');
	
	if (hasExamples) {
		var examples = hasExamples.querySelectorAll('.label');
		
		for (var i = 0; i < examples.length; i++) {
			var permalink = this.createPermaLink(i+1, 'example', examples[i].parentNode.parentNode.id);
			examples[i].insertAdjacentElement('afterBegin', permalink);
		}
	}
	
	var hasFAQ = document.getElementById('faq');
	
	if (hasFAQ) {
		var faqs = hasFAQ.querySelectorAll('dt');
		
		for (var i = 0; i < faqs.length; i++) {
			var permalink = this.createPermaLink(i+1, 'FAQ', faqs[i].id);
			faqs[i].insertAdjacentElement('afterBegin', permalink);
		}
	}
}


/* 
 * 
 * Create the permalink tag
 * 
 */

KB.prototype.createPermaLink = function(num, label, dest) {

	var a = document.createElement('a');
		a.href = '#' + dest;
		a.setAttribute('class', 'permalink');
		a.setAttribute('aria-label', this.ui[this.lang].permalinkSymbol + label + ' ' + num);
		a.appendChild(document.createTextNode(this.ui[this.lang].permalinkSymbol));
	
	return a;

}


/* 
 * 
 * Add copy buttons for the examples
 * 
 */

KB.prototype.addExampleCopy = function() {
	var ex = document.querySelectorAll('section#ex > figure > pre');
	
	for (var i = 0; i < ex.length; i++) {
		
		var input = document.createElement('input');
			input.setAttribute('type','button');
			input.setAttribute('value', this.ui[this.lang].copy);
			input.setAttribute('class','copy');
			
			input.addEventListener('click', kb.copyExampleDelegate(ex[i].id), false);
		
		ex[i].insertAdjacentElement('afterEnd', input);
	}
}


/* 
 * 
 * highlight the current heading in the mini toc during scrolling
 * 
 */

KB.prototype.trackCurrentHeading = function() {

	var mini_toc = document.querySelector('nav.mini-toc');
	
	if (mini_toc) {
	
		let callback = (entries, observer) => {
	 		entries.forEach(entry => {
				var id = entry.target.getAttribute('id');
				
				var toc_entry = document.querySelector(`nav.mini-toc li a[href="#${id}"]`);
				
				if (toc_entry) {
					if (entry.intersectionRatio > 0) {
						toc_entry.parentElement.classList.add('active');
					}
					else {
						toc_entry.parentElement.classList.remove('active');
					}
					
				}
			});
		};
	
	
		var observer = new IntersectionObserver(callback, { rootMargin: '-94px 0px -200px 0px' } );
	
		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});
	}
}



/* 
 * 
 * Breaks onix headings across two lines
 * 
 */

KB.prototype.splitOnixHd = function() {

	if (page_info.hasOwnProperty('category') && page_info.category.includes('meta-onix') && !window.location.pathname.match('index.html')) {
		var pg_title_elem = document.querySelector('div#page-title h2');
		var pg_title = pg_title_elem.innerText;
		
		pg_title_elem.innerHTML = '<span class="onix-num">' + pg_title.substring(0, pg_title.indexOf(':') + 1) + '</span><span class="onix-def">' + pg_title.substring(pg_title.indexOf(':') + 1) + '</span>';
	}
}


/* 
 * 
 * Example copying callback functions
 * 
 */


KB.prototype.copyExampleDelegate = function(ex_id) {
	return function() {
		// select the example
		var pre_orig = document.querySelector('pre#'+ex_id);
		
		// create a clone of the element to operate on
		var pre = pre_orig.cloneNode(true);
		
		// grab all the list items in the example (each li is a pretty-printed line of code)
		var li = pre.querySelectorAll('li');
		
		// add a line break to the end of each list item so formatting is retained when the li tags are stripped later
		for (var i = 0; i < li.length; i++) {
			li[i].appendChild(document.createTextNode('\n'));
		}
		
		// create a temporary textarea to copy the example out of and paste the text content of the example into it to remove any tags
		var textArea = document.createElement("textarea");
			textArea.value = pre.textContent;
		
		document.body.appendChild(textArea);
		
		textArea.select();
		
		// copy the example to the clipboard
		try {
			document.execCommand('copy');
			alert('Code successfully copied.')
		}
		catch (err) {
			console.error('Copy failed: ', err);
		}
		
		// discard the textarea
		document.body.removeChild(textArea);
	}
}



/* 
 * 
 * Scroll a specific id into focus on load
 * 
 */

KB.prototype.scrollHash = function(hash) {
	
	var hash_id = hash.substring(1);
	var elem = document.getElementById(hash_id);
	
	if (elem) {
		elem.scrollIntoView();
	}
	
	if (hash_id.match(/^(faq|ex)-[0-9]+/)) {
		var scrolledY = window.scrollY;
		
		if(scrolledY){
			window.scroll(0, scrolledY - 140);
		}
	}
}



/* 
 * 
 * Change the page language
 * 
 */

KB.prototype.switchLanguage = function(elem) {
	var old_lang = this.lang === 'en' ? 'docs' : this.lang;
	var new_lang = elem.value === 'en' ? 'docs' : elem.value;
	document.location.href = document.location.href.replace('/'+old_lang+'/', '/'+new_lang+'/');
}

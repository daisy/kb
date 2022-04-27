
/* 
 * 
 * This file contains the KB class of functions, a set of callbacks
 * for copying examples, and the initiation code for each page.
 * It is only required that each page that needs formatting include
 * a reference to this script in its head - no further initiation
 * is needed.
 * 
 */



/* hack to eliminate the flash of unstyled content */

createCSSSelector('.hidden', 'display: none');
document.documentElement.classList.add('hidden');


/* 
 * 
 * 
 * KB Class
 * - consider importing this over embedding if IE ever dies
 * 
 * 
 */



function KB() {
	
	this.kb_url = 'http://kb.daisy.org/';
	this.kb_repo = 'https://github.com/DAISY/kb/commits/main/';
	this.kb_id = (window.location.href.split('/'))[3];
	this.host = '';
	
	this.page_hd = document.getElementsByTagName('head')[0];
	this.lang = document.documentElement.lang ? document.documentElement.lang.toLowerCase() : 'en'

	this.kb_root = '/' + this.kb_id + '/' + (this.lang == 'en' ? 'docs/' : this.lang + '/');
	
	this.isRootIndex = page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'] ? true : false;
	this.isIndex = ((page_info.hasOwnProperty('isIndex') && page_info['isIndex']) || (page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'])) ? true : false;
	this.noBreadcrumb = (page_info.hasOwnProperty('breadcrumb') && !page_info['breadcrumb']) ? true : false;
	this.noFooter = (page_info.hasOwnProperty('footer') && !page_info['footer']) ? true : false;
	
	this.title = document.title;
}


/* 
 * Generates the header meta, css and js tags needed to generate the template
 */

KB.prototype.initializePage = function (type) {
	if (type == 'kb') {
		this.host = 'kb';
		this.writeShiv();
		this.writeHeadTag('js', '/js/lang/'+this.lang+'.js');
		this.writeHeadTag('css', '/css/kb.css');
		this.writeHeadTag('css', '/css/prettify.css');
		
		if (this.isIndex) {
			this.writeHeadTag('css', '/css/primary-nav.css');
		}
		
		this.writeHeadTag('js', '/js/prettify.js');
		this.writeGoogleAnalytics();
	}
	else {
		this.host = 'ace';
		// add ace desired heading tags here
	}
}


/* 
 * write the html5 shim file to enable tag support in older IE browsers
 */

KB.prototype.writeShiv = function() {
	var shiv = document.createComment('[if lt IE 9]> <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script> <![endif]');
	this.page_hd.appendChild(shiv);
}


/* 
 * generic function that write a meta or link tag depending on the type of file being referenced
 */

KB.prototype.writeHeadTag = function (type, path, options) {

	var tag;
	
	if (type == "css") {
		// generate a link tag for css references
		tag = document.createElement('link');
		tag.setAttribute('rel', 'stylesheet');
		tag.setAttribute('href', path);
	}
	
	else if (type == 'js') {
		// generate a script tag for js references
		tag = document.createElement('script');
		tag.setAttribute('src', path);
		
		/* 
		 * options can be used if additional attribute are needed (e.g., async)
		 * - must contain an array of attribute names and values
		 */
		
		if (options) { 
			for (var property in options) {
				if (options.hasOwnProperty(property)) {
					tag.setAttribute(property, options[property]);
				}
			}
		}
	}
	
	// add the generated tag to the page header
	this.page_hd.appendChild(tag);
}



/* 
 * writes the google analytics code
 */

KB.prototype.writeGoogleAnalytics = function () {

	this.writeHeadTag('js', 'https://www.googletagmanager.com/gtag/js?id=UA-327448-3', {async: 'async'});
	
	var ga = document.createElement('script');
		ga.appendChild(document.createTextNode("\
			window.dataLayer = window.dataLayer || [];\
			function gtag(){dataLayer.push(arguments);}\
			gtag('js', new Date());\
			gtag('config', 'UA-327448-3');\
		"));
	
	this.page_hd.appendChild(ga);
}


/* 
 * reformats the page for visual display depending on the hosting location (on the web or inside an ace browser view)
 */

KB.prototype.writeTemplate = function () {
	if (this.host == 'kb') {
		kb.generateTitles();
		kb.generateHeader();
		kb.generateBreadcrumb();
		kb.generateMiniToc();
		kb.generateAppliesTo();
		kb.generateFooter();
		kb.prettyPrint();
		kb.addExampleCopy();
		kb.addGlossaryLinks();
		
		var cur_href = window.location.href.toString();
		var href_len = cur_href.length - 1;
		var last_slash = cur_href.lastIndexOf('/')
		
		//if (!this.isRootIndex && cur_href.indexOf('index.html') == -1 && last_slash != href_len) {
		//	kb.addHeadingDestinations();
		//}
	}
	
	else {
		// add template for use in ace
	}
}


/* generates the page title and header */

KB.prototype.generateTitles = function () {

	// this processing is skipped for the master list of topics
	if (!this.isRootIndex) {
		// create the h2 from the contents of the page title
		var h2 = document.createElement('h2');
			h2.appendChild(document.createTextNode(this.title));
		
		document.querySelector('main').insertAdjacentElement('afterBegin', h2);
		
		// append the kb name to the page title
		document.title = this.title + ' / ' + msg.kb_name[this.kb_id];
	}
}


/* generates the standard page header */

KB.prototype.generateHeader = function () {

	var header = document.createElement('header');
	
	var h1 = document.createElement('h1');
	
	// add the daisy logo
	var logo = document.createElement('img');
		logo.setAttribute('class','logo');
		logo.setAttribute('src','/graphics/daisy_logo.png');
		logo.setAttribute('alt','DAISY')
	
	h1.appendChild(logo);
	h1.appendChild(document.createTextNode(' '));
	
	var a = document.createElement('a');
		a.setAttribute('href',this.kb_root);
		a.appendChild(document.createTextNode(msg.kb_name[this.kb_id]));
	
	h1.appendChild(a);
	
	header.appendChild(h1);
	
	var top_links = document.createElement('div');
		top_links.setAttribute('class','toplinks');
	
	// add the what's new link
	var whatsnew_a = document.createElement('a');
		whatsnew_a.setAttribute('href', this.kb_root + 'new/index.html');
		whatsnew_a.appendChild(document.createTextNode(msg.header.m01));
	
	top_links.appendChild(whatsnew_a);
	
	// add the glossary link
	var gloss_a = document.createElement('a');
		gloss_a.setAttribute('href', this.kb_root + 'glossary/index.html');
		gloss_a.appendChild(document.createTextNode(msg.header.m02));
	
	top_links.appendChild(gloss_a);
	
	// add search link
	var srch_a = document.createElement('a');
		srch_a.setAttribute('href', this.kb_root + '/search/index.html');
		srch_a.appendChild(document.createTextNode(msg.header.m03));
	
	top_links.appendChild(srch_a);
	
	header.appendChild(top_links);
	
	document.body.insertAdjacentElement('afterBegin',header);
}


/* creates the breadcrumb to the current location */

KB.prototype.generateBreadcrumb = function () {

	if (this.isRootIndex || this.noBreadcrumb) {
		return;
	}
	
	if (page_info.hasOwnProperty('topic')) {
		if (!Array.isArray(page_info.topic)) {
			page_info.topic = [page_info.topic];
		}
	}
	else {
		page_info.topic = [];
	}

	
	var breadcrumb = document.createElement('nav');
		breadcrumb.setAttribute('class','breadcrumb');
	
	var p = document.createElement('p');
	
	var kb_url = '../';
	
	if (page_info.topic.length > 1) {
		for (var z = page_info.topic.length-1; z > 0; z--) {
			kb_url += '../';
		}
	}
	
	kb_url += 'index.html';
	
	// add link to the top-level index
	var home = document.createElement('a');
		home.setAttribute('href',kb_url);
		home.appendChild(document.createTextNode(msg.UI.m01))
	
	p.appendChild(home);
	p.appendChild(document.createTextNode(' > '));
	
	if (page_info.topic.length > 0) {
	
		for (var x = 0; x < page_info['topic'].length; x++) {
			
			if (window.location.href.indexOf('index.html') > -1 && x == page_info.topic.length -1) {
				// if on an index page, add the final topic as a span
				var span = document.createElement('span');
					span.appendChild(document.createTextNode(page_info.topic[x]));
				
				p.appendChild(span);
			}
			
			else {
				// otherwise add a link to the topic index and a span with the current topic title
				
				var index_url = '';
				
				// if more than one topic, need to add ../ to reach the right page
				if (page_info.topic.length > 1) {
					for (var y = page_info.topic.length-1; y > x; y--) {
						index_url += '../';
					}
				}
				
				index_url += 'index.html'
				
				var index = document.createElement('a');
					index.setAttribute('href',index_url);
					index.appendChild(document.createTextNode(page_info.topic[x]))
				
				p.appendChild(index);
				p.appendChild(document.createTextNode(' > '));
			}
		}
	}
	
	if (window.location.href.indexOf('index.html') == -1) {
		// add page title for content pages
		var span = document.createElement('span');
			span.appendChild(document.createTextNode(this.title));
		
		p.appendChild(span);
	}
	
	breadcrumb.appendChild(p);
	
	var h2 = document.querySelector('h2');
		h2.insertAdjacentElement('afterEnd', breadcrumb);
}


/* 
 * generate the list of links to the sections on the page
 */

KB.prototype.generateMiniToc = function () {
	
	if (this.isIndex || this.isRootIndex) {
		return;
	}
	
	// grab all the subsection headings on the page
	var h = document.querySelectorAll('h3');
	
	var nav = document.createElement('nav');
		nav.setAttribute('role', 'doc-toc');
		nav.setAttribute('class', 'mini-toc');
	
	if (h.length > 0) {
	
		/* add section heading */
		var h3 = document.createElement('h3');
			h3.appendChild(document.createTextNode(msg.UI.m02));
		
		nav.appendChild(h3);
		
		var ol = document.createElement('ol');
		
		// iterate each heading and add a link to it
		for (var i = 0; i < h.length; i++) {
			var li = document.createElement('li');
			
			var a = document.createElement('a');
				a.setAttribute('href','#'+h[i].parentNode.id);
				
				// if a short form of a title is necessary for the menu, add to the shortForm section of the messages file
				var sectionName = h[i].textContent.trim();
					sectionName = msg.shortForm.hasOwnProperty(h[i].textContent) ? msg.shortForm[h[i].textContent] : h[i].textContent;
				
				a.appendChild(document.createTextNode(sectionName));
			 
			 li.appendChild(a);
			 ol.appendChild(li);
		}
		
		nav.appendChild(ol);
	}
	
	document.querySelector('main > nav.breadcrumb').insertAdjacentElement('afterEnd', nav);
}


/* generates the box that identifies what format the topic applies to */

KB.prototype.generateAppliesTo = function () {
	
	if (this.isRootIndex || this.isIndex) {
		return;
	}
	
	if (!page_info.hasOwnProperty('appliesTo')) {
		return;
	}
	
	var aside = document.createElement('aside');
		aside.setAttribute('class', 'applies-to');
	
	/* add section heading */
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode(msg.UI.m03));
	
	aside.appendChild(h3);
	
	var ol = document.createElement('ul');
	
	// add an entry for each format identified in the page_info
	for (var i = 0; i < page_info.appliesTo.length; i++) {
		var li = document.createElement('li');
		
		var at_url = '';
		
		switch (page_info.appliesTo[i]) {
			case 'Audiobooks':
				at_url = 'https://www.w3.org/TR/audiobooks/';
				break;
			case 'EPUB3':
				at_url = 'https://www.w3.org/TR/epub/';
				break;
			case 'EPUB2':
				at_url = 'http://idpf.org/epub/201/';
				break;
			default:
				at_url = '#unknown';
		}
		
		var a = document.createElement('a');
			a.setAttribute('href', at_url);
			a.appendChild(document.createTextNode(page_info.appliesTo[i].replace(/EPUB([2-3])/,'EPUB $1')));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	}
	
	aside.appendChild(ol);
	
	document.querySelector('main > nav.mini-toc').insertAdjacentElement('afterEnd', aside);
}


/* create the default footer for the pages */

KB.prototype.generateFooter = function () {
	
	if (this.noFooter) {
		return;
	}
	
	// add back to top link
	
	var top = document.createElement('p');
		top.setAttribute('class','backtotop');
	
	var toplink = document.createElement('a');
		toplink.setAttribute('href','#');
		toplink.appendChild(document.createTextNode(msg.footer.m08));
	
	top.appendChild(toplink);

	document.body.appendChild(top);
	
	var footer = document.createElement('footer');
	var spacer = '\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0';
	
	// add link lists
	
	var linklists = document.createElement('div');
		linklists.setAttribute('class','footer-lists');
	
	// add how-to links
	
	var help = document.createElement('div');
		help.setAttribute('class','footer-list');
	
	var helphd = document.createElement('div');
		helphd.appendChild(document.createTextNode(msg.footer.m09));
	help.appendChild(helphd);
	
	var helplist = document.createElement('ul')
	
	var bugitem = document.createElement('li');
	var buglink = document.createElement('a');
		buglink.setAttribute('href', this.kb_root + 'reporting/#bugs');
		buglink.appendChild(document.createTextNode(msg.footer.m05));
	
	bugitem.appendChild(buglink);
	helplist.appendChild(bugitem);
	
	var topicitem = document.createElement('li');
	var newlink = document.createElement('a');
		newlink.setAttribute('href', this.kb_root + 'reporting/#new');
		newlink.appendChild(document.createTextNode(msg.footer.m06));
	
	topicitem.appendChild(newlink);
	helplist.appendChild(topicitem);
	
	var contribitem = document.createElement('li');
	var contriblink = document.createElement('a');
		contriblink.setAttribute('href', this.kb_root + 'contribute');
		contriblink.appendChild(document.createTextNode(msg.footer.m14));
	
	contribitem.appendChild(contriblink);
	helplist.appendChild(contribitem);
	
	help.appendChild(helplist);
	
	linklists.appendChild(help);
	
	// add the github links
	
	var github = document.createElement('div');
		github.setAttribute('class','footer-list');
	
	var githd = document.createElement('div');
		githd.appendChild(document.createTextNode(msg.footer.m10));
	github.appendChild(githd);
	
	var gitlist = document.createElement('ul')
	
	var commititem = document.createElement('li');
	
	var page_path = window.location.href.substring(window.location.href.indexOf(this.kb_id+'/')+this.kb_id.length+1,window.location.href.length);
	
	page_path = (page_path == '') ? 'index.html' : page_path;
	
	var commitlink = document.createElement('a');
		commitlink.setAttribute('href',this.kb_repo + this.kb_id + '/' + page_path);
		commitlink.appendChild(document.createTextNode(msg.footer.m04));
	
	commititem.appendChild(commitlink);
	gitlist.appendChild(commititem);
	
	var repoitem = document.createElement('li');
	var repolink = document.createElement('a');
		repolink.setAttribute('href', 'https://github.com/daisy/kb/issues');
		repolink.appendChild(document.createTextNode(msg.footer.m07));
	
	repoitem.appendChild(repolink);
	gitlist.appendChild(repoitem);
	
	github.appendChild(gitlist);
	
	linklists.appendChild(github);
	
	footer.appendChild(linklists);
	
	// add specification links
	
	var spec = document.createElement('div');
		spec.setAttribute('class','footer-list');
	
	var spechd = document.createElement('div');
		spechd.appendChild(document.createTextNode(msg.footer.m11));
	spec.appendChild(spechd);
	
	var speclist = document.createElement('ul')
	
	var a11yitem = document.createElement('li');
	var a11ylink = document.createElement('a');
		a11ylink.setAttribute('href', 'https://www.w3.org/TR/epub-a11y/');
		a11ylink.appendChild(document.createTextNode(msg.footer.m12));
	
	a11yitem.appendChild(a11ylink);
	speclist.appendChild(a11yitem);
	
	var epubitem = document.createElement('li');
	var epublink = document.createElement('a');
		epublink.setAttribute('href', 'https://www.w3.org/TR/epub/');
		epublink.appendChild(document.createTextNode(msg.footer.m13));
	
	epubitem.appendChild(epublink);
	speclist.appendChild(epubitem);
	spec.appendChild(speclist);
	
	linklists.appendChild(spec);
	
	// add daisy links
	
	var daisy = document.createElement('p');
		daisy.setAttribute('class','copy');

	// add the copyright
	
	daisy.appendChild(document.createTextNode(msg.footer.m01.replace('%yr%', new Date().getFullYear()) + spacer));

	// add the link to the terms of use and privacy policy
	
	var termslink = document.createElement('a');
		termslink.setAttribute('href','http://www.daisy.org/terms-use');
		termslink.appendChild(document.createTextNode(msg.footer.m02 + spacer));
	
	daisy.appendChild(termslink);
	
	var privacylink = document.createElement('a');
		privacylink.setAttribute('href','https://daisy.org/about-us/terms-and-conditions/privacy/');
		privacylink.appendChild(document.createTextNode(msg.footer.m03));
	
	daisy.appendChild(privacylink);
	
	footer.appendChild(daisy);

	document.body.appendChild(footer);
}


/* call the google pretty print function for examples */

KB.prototype.prettyPrint = function() {
	if (!this.isIndex && !this.isRootIndex) {
		prettyPrint();
	}
}


/* add buttons to copy example text */

KB.prototype.addExampleCopy = function() {
	var ex = document.querySelectorAll('section#ex > figure > pre');
	
	for (var i = 0; i < ex.length; i++) {
		
		var input = document.createElement('input');
			input.setAttribute('type','button');
			input.setAttribute('value','Copy to clipboard');
			
			input.addEventListener('click', copyExampleDelegate(ex[i].id), false);
		
		ex[i].insertAdjacentElement('afterEnd', input);
	}
}


/* add reference links */

KB.prototype.addHeadingDestinations = function() {

	var h3 = document.querySelectorAll('section > h3');
	
	for (var i = 0; i < h3.length; i++) {
		var dest = document.createElement('a');
			dest.setAttribute('class','dest');
			dest.href = '#' + h3[i].parentNode.id;
			dest.appendChild(document.createTextNode('\u00a7'));
		h3[i].prepend(document.createTextNode('\u00a0\u00a0'));
		h3[i].prepend(dest);
	}
}



/* add links to glossary terms */

KB.prototype.addGlossaryLinks = function() {

	var links = document.querySelectorAll('a:not([href])');
	
	for (var i = 0; i < links.length; i++) {
		var linktext = links[i].textContent;
			linktext = linktext.replace(/ /g, '-');
			linktext = linktext.replace(/s$/, '');
		
		links[i].href = '/publishing/docs/glossary/' + linktext.substring(0,1).toLowerCase() + '.html#' + linktext.toLowerCase();
		links[i].classList.add('gloss');
		links[i].setAttribute('role', 'doc-glossref');
		links[i].setAttribute('title', 'Go to definition');
	}
}



/* 
 * 
 * Example copying callback functions
 * 
 */


function copyExampleDelegate(ex_id) {
	return function(){
		copyExample(ex_id);
	}
}

function copyExample(ex_id) {

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
	}
	catch (err) {
		console.error('Copy failed: ', err);
	}
	
	// discard the textarea
	document.body.removeChild(textArea);
}





/* 
 * 
 * 
 * INITIALIZATION
 * 
 * 
 * 
 */


var kb = new KB();

// write the header tags immediately so that js and css are processed
if (document.location.host == 'kb.daisy.org' || document.location.host.match(/^localhost/i)) {
	kb.initializePage('kb');
}

else {
	// not yet implemented, but allows use in ace without web wrapper
	kb.initializePage('ace');
}

/* delay loading the template until the page has loaded so that the page elements are all available */
window.onload = function () {
	kb.writeTemplate();
	document.documentElement.classList.remove('hidden');
}



/* adds initial hidden class */

function createCSSSelector (selector, style) {
	
	if (!document.styleSheets) return;
	
	if (document.getElementsByTagName('head').length == 0) return;
	
	var styleSheet,mediaType;
	
	if (document.styleSheets.length > 0) {
		for (var i = 0, l = document.styleSheets.length; i < l; i++) {
		if (document.styleSheets[i].disabled) 
		continue;
		var media = document.styleSheets[i].media;
		mediaType = typeof media;
		
		if (mediaType === 'string') {
			if (media === '' || (media.indexOf('screen') !== -1)) {
				styleSheet = document.styleSheets[i];
			}
		}
		else if (mediaType=='object') {
			if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
				styleSheet = document.styleSheets[i];
			}
		}
		
		if (typeof styleSheet !== 'undefined') 
			break;
		}
	}
	
	if (typeof styleSheet === 'undefined') {
		var styleSheetElement = document.createElement('style');
		styleSheetElement.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(styleSheetElement);
		
		for (i = 0; i < document.styleSheets.length; i++) {
			if (document.styleSheets[i].disabled) {
				continue;
			}
			styleSheet = document.styleSheets[i];
		}
		
		mediaType = typeof styleSheet.media;
	}
	
	if (mediaType === 'string') {
		for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
			if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
				styleSheet.rules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.addRule(selector,style);
	}
	else if (mediaType === 'object') {
		var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
		for (var i = 0; i < styleSheetLength; i++) {
			if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
				styleSheet.cssRules[i].style.cssText = style;
				return;
			}
		}
		styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
	}
}




var terms = {
	"accessibility tree": 1,
	"ace": 1,
	"aria": 1,
	"assistive technology": 1,
	"author": 1
}
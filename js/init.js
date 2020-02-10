
/* 
 * 
 * This file contains the KB class of functions, a set of callbacks
 * for copying examples, and the initiation code for each page.
 * It is only required that each page that needs formatting include
 * a reference to this script in its head - no further initiation
 * is needed.
 * 
 */



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
	this.kb_repo = 'https://github.com/DAISY/kb/commits/master/';
	this.kb_id = (window.location.href.split('/'))[3];
	this.host = '';
	
	this.page_hd = document.getElementsByTagName('head')[0];
	this.lang = document.documentElement.lang ? document.documentElement.lang.toLowerCase() : 'en'
	
	this.isRootIndex = page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'] ? true : false;
	this.isIndex = ((page_info.hasOwnProperty('isIndex') && page_info['isIndex']) || (page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'])) ? true : false;
	
	this.title = document.title;
}


/* 
 * Generates the header meta, css and js tags needed to generate the template
 */

KB.prototype.initializePage = function (type) {
	if (type == 'kb') {
		this.host = 'kb';
		this.writeCoreMeta();
		this.writeShiv();
		this.writeHeadTag('js', '/js/lang/'+this.lang+'.js');
		this.writeHeadTag('css', '/css/kb.css');
		this.writeHeadTag('css', '/css/prettify.css');
		
		if (this.isRootIndex || (window.location.href.indexOf('index.html') > -1 && page_info.hasOwnProperty('topic'))) {
			this.writeHeadTag('css', '/css/primary-nav.css');
		}
		
		this.writeHeadTag('js', '/js/prettify.js');
		this.writeHeadTag('js', '/js/jquery172min.js');
		this.writeGoogleAnalytics();
	}
	else {
		this.host = 'ace';
		// add ace desired heading tags here
	}
}


/* 
 * writes meta/charset and meta/viewport tags
 */

KB.prototype.writeCoreMeta = function () {
	var charset = document.createElement('meta');
		charset.setAttribute('charset', 'utf-8');
	this.page_hd.appendChild(charset);
	
	var viewport = document.createElement('meta');
		viewport.setAttribute('name', 'viewport');
		viewport.setAttribute('content', 'width=device-width, initial-scale=1');
	this.page_hd.appendChild(viewport);
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
		kb.generateMeta();
		kb.generateHeader();
		kb.generateBreadcrumb();
		kb.generateMiniToc();
		kb.generateAppliesTo();
		kb.generateFooter();
		kb.prettyPrint();
		kb.addExampleCopy();
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


/* 
 * generates additional meta tags from the page_info
 * - currently only supports adding descriptions 
 */

KB.prototype.generateMeta = function () {
	if (page_info.hasOwnProperty('description')) {
		var description = document.createElement('meta');
			description.setAttribute('name','description');
			description.setAttribute('value',page_info['description']);
		document.querySelector('title').insertAdjacentElement('afterEnd', description);
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
	
	// add the kb name
	var a = document.createElement('a');
		a.setAttribute('href','/' + this.kb_id + '/');
		a.appendChild(document.createTextNode(msg.kb_name[this.kb_id]));
	
	h1.appendChild(a);
	
	header.appendChild(h1);
	
	document.body.insertAdjacentElement('afterBegin',header);
}


/* creates the breadcrumb to the current location */

KB.prototype.generateBreadcrumb = function () {

	if (this.isRootIndex) {
		return;
	}
	
	var breadcrumb = document.createElement('nav');
		breadcrumb.setAttribute('class','breadcrumb');
	
	var p = document.createElement('p');
	
	// add link to the top-level index
	var home = document.createElement('a');
		home.setAttribute('href','../index.html');
		home.appendChild(document.createTextNode(msg.UI.m01))
	
	p.appendChild(home);
	p.appendChild(document.createTextNode(' > '));
	
	if (window.location.href.indexOf('index.html') > -1 && page_info.hasOwnProperty('topic')) {
		// if on an index page, just add the topic as a span
		var span = document.createElement('span');
			span.appendChild(document.createTextNode(page_info['topic']));
		
		p.appendChild(span);
	}
	
	else {
		// otherwise add a link to the topic index and a span with the current topic title
		if (page_info.hasOwnProperty('topic')) {
			var index = document.createElement('a');
				index.setAttribute('href','index.html');
				index.appendChild(document.createTextNode(page_info['topic']))
			
			p.appendChild(index);
			p.appendChild(document.createTextNode(' > '));
		}
		
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
	
	var nav = document.createElement('nav');
		nav.setAttribute('role', 'doc-toc');
		nav.setAttribute('class', 'mini-toc');
	
	/* add section heading */
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode(msg.UI.m02));
	
	nav.appendChild(h3);
	
	var ol = document.createElement('ol');
	
	// grab all the subsection headings on the page
	var h = document.querySelectorAll('h3');
	
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
		
		var a = document.createElement('a');
			a.setAttribute('href', (page_info.appliesTo[i] == 'EPUB3' ? 'https://www.idpf.org/epub3/latest' : (page_info.appliesTo[i] == 'EPUB2' ? 'http://idpf.org/epub/201' : '#')));
			a.appendChild(document.createTextNode(page_info.appliesTo[i]));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	}
	
	aside.appendChild(ol);
	
	document.querySelector('main > nav.mini-toc').insertAdjacentElement('afterEnd', aside);
}


/* create the default footer for the pages */

KB.prototype.generateFooter = function () {
	var footer = document.createElement('footer');
	
	// add the link to the issue tracker
	
	var typos = document.createElement('p');
		typos.appendChild(document.createTextNode(msg.footer.m01));
	
	var issuelink = document.createElement('a');
		issuelink.setAttribute('href','https://github.com/DAISY/kb/issues');
		issuelink.appendChild(document.createTextNode(msg.footer.m02));
	
		typos.appendChild(issuelink);
		typos.appendChild(document.createTextNode('.'));
	
	footer.appendChild(typos);
	
	// add the link to the commit log
	
	var changes = document.createElement('p');
		changes.appendChild(document.createTextNode(msg.footer.m03));
	
	var page_path = window.location.href.substring(window.location.href.indexOf(this.kb_id+'/')+this.kb_id.length+1,window.location.href.length);
	
	page_path = (page_path == '') ? 'index.html' : page_path;
	
	var commitlink = document.createElement('a');
		commitlink.setAttribute('href',this.kb_repo + this.kb_id + '/' + page_path);
		commitlink.appendChild(document.createTextNode(msg.footer.m04));
	
		changes.appendChild(commitlink);
		changes.appendChild(document.createTextNode('.'));
	
	footer.appendChild(changes);
	
	// add the link to the terms of use
	
	var terms = document.createElement('p');
	
	var termslink = document.createElement('a');
		termslink.setAttribute('href','http://www.daisy.org/terms-use');
		termslink.appendChild(document.createTextNode(msg.footer.m05));
	
	footer.appendChild(termslink);
	
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
if (document.location.host == 'kb.daisy.org' || document.location.host == 'localhost') {
	kb.initializePage('kb');
}

else {
	// not yet implemented, but allows use in ace without web wrapper
	kb.initializePage('ace');
}

/* delay loading the template until the page has loaded so that the page elements are all available */
window.onload = function () {
	kb.writeTemplate();
}

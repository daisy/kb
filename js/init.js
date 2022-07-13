
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
	this.isCategoryIndex = (page_info.hasOwnProperty('isIndex') && page_info['isIndex']) ? true : false;
	this.isIndex = (this.isRootIndex || this.isCategoryIndex) ? true : false;
	this.isSearch = page_info.hasOwnProperty('search') ? true : false;
	this.isHomePage = page_info.hasOwnProperty('isSiteHome') ? true : false;
	this.noCategory = (!page_info.hasOwnProperty('category')) ? true : false;
	this.noTopLink = page_info.hasOwnProperty('noTopLink') ? true: false;
	this.noTitle = page_info.hasOwnProperty('noTitle') ? true: false;
	this.noFooter = (page_info.hasOwnProperty('footer') && !page_info['footer']) ? true : false;
	
	this.title = document.title;
}


/* 
 * Generates the header meta, css and js tags needed to generate the template
 */

KB.prototype.initializePage = function (type) {
	if (type == 'kb') {
		this.host = 'kb';
		this.writeHeadTag('js', '/js/lang/'+this.lang+'.js');
		this.writeHeadTag('js', '/js/topics/'+this.lang+'.js');
		this.writeHeadTag('js', '/js/sc/'+this.lang+'.js');
		this.writeHeadTag('css', '/css/kb.css');
		this.writeHeadTag('css', '/css/prettify.css');
		
		if (this.isIndex || this.isHomePage) {
			this.writeHeadTag('css', '/css/primary-nav.css');
		}
		
		else {
			this.writeHeadTag('js', '/js/menuspy.min.js');
		}
		
		this.writeHeadTag('js', '/js/prettify.js');
		this.writeGoogleAnalytics();
		
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		
		if (isIE11 && (this.isIndex || document.getElementsByTagName('details').length > 0)) {
			this.writeHeadTag('js', 'https://cdn.jsdelivr.net/npm/details-polyfill@1/index.min.js');
		}
	}
	else {
		this.host = 'ace';
		// add ace desired heading tags here
	}
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
		kb.generateHeader();
		
		// don't regenerate the body for the search page or the results won't get returned to the div (google can't handle nesting)
		if (!this.isSearch) {
			kb.generateBody();
		}
		
		kb.generatePageTitle();
		
		if (!page_info.hasOwnProperty('nav') || page_info.nav) {
			
			if (page_info.hasOwnProperty('appliesTo')) {
				kb.generateAppliesTo();
			}
			
			kb.generateMiniToc();
		}
		
		if (page_info.hasOwnProperty('nav') && !page_info.nav) {
			kb.formatOpenPage();
		}
		
		if (this.isSearch) {
			kb.formatSearchPage();
		}
		
		kb.generateFooter();
		
		if (!this.isIndex && !this.isSearch && !this.isHomePage) {
			kb.prettyPrint();
			kb.addExampleCopy();
			kb.addGlossaryLinks();
			kb.generateWCAGLinks();
		}
		
		var cur_href = window.location.href.toString();
		var href_len = cur_href.length - 1;
		var last_slash = cur_href.lastIndexOf('/')
		
		if (this.isIndex) {
			kb.addTopicLinks();
		}
	}
	
	else {
		// add template for use in ace
	}
}


/* generates the standard page header */

KB.prototype.generateHeader = function () {

	var header = document.createElement('header');
	
	var skip_a = document.createElement('a');
		skip_a.setAttribute('href', '#main');
		skip_a.setAttribute('id','skip-main');
		skip_a.appendChild(document.createTextNode(msg.header.m05));
	
	header.appendChild(skip_a);
	
	document.getElementsByTagName('main')[0].setAttribute('id','main');
	
	var h1 = document.createElement('h1');
	
	// add the daisy logo
	var logo = document.createElement('img');
		logo.setAttribute('class','logo');
		logo.setAttribute('src','/graphics/daisy_logo.png');
		logo.setAttribute('alt','DAISY')

	var a = document.createElement('a');
		a.setAttribute('href','https://daisy.org');
		a.appendChild(logo);

	h1.appendChild(a);
	
	h1.appendChild(document.createTextNode(' '));
	
	var h1_span = document.createElement('span');
		h1_span.appendChild(document.createTextNode(msg.kb_name[this.kb_id]))
	
	h1.appendChild(h1_span);
	
	header.appendChild(h1);
	
	var top_links = document.createElement('div');
		top_links.setAttribute('class','toplinks');
	
	// add the home link
	var home_a = document.createElement('a');
		home_a.setAttribute('href', this.kb_root);
		home_a.appendChild(document.createTextNode(msg.UI.m01));
	
	top_links.appendChild(home_a);
	
	// add the contents link
	var contents_a = document.createElement('a');
		contents_a.setAttribute('href', this.kb_root + 'topics.html');
		contents_a.appendChild(document.createTextNode(msg.header.m04));
	
	top_links.appendChild(contents_a);
	
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


/* generates the standard page body inside main */

KB.prototype.generateBody = function () {
	
	// create a new main element to contain the body
	var new_main = document.createElement('main');
		new_main.id = 'main';
	
	// create new body div for the page content
	var new_body = document.createElement('div');
		new_body.setAttribute('id', 'body');
		
	// copy the old main inside
	var old_main = document.getElementsByTagName('main')[0];
		new_body.innerHTML = old_main.innerHTML;
	
	// add the new main element and delete the old
	new_main.appendChild(new_body);
	
	document.getElementsByTagName('header')[0].insertAdjacentElement('afterEnd', new_main);
	
	document.body.removeChild(old_main);
}


/* creates the page title and category for the current topic */

KB.prototype.generatePageTitle = function () {

	// skip adding a title for the master list of topics
	if (!this.isRootIndex && !this.noTitle) {
	
		var title_div = document.createElement('div');
		
		if (!this.isIndex && (!page_info.hasOwnProperty('nav') || page_info.nav) && !page_info.hasOwnProperty('search')) {
			title_div.id = 'page-title';
		}
		
		// create the h2 from the contents of the page title
		var h2 = document.createElement('h2');
			h2.appendChild(document.createTextNode(this.title));
		
		title_div.appendChild(h2);
		
		if (this.isSearch) {
			// search page doesn't have the body wrapper or results don't display
			document.querySelector('main').insertAdjacentElement('afterBegin', title_div);
		}
		else {
			document.getElementById('body').insertAdjacentElement('afterBegin', title_div);
		}
		
		// append the kb name to the page title
		document.title = this.title + ' / ' + msg.kb_name[this.kb_id];
	}
	
	// skip adding the category for indexes and other uncategorized pages
	if (this.isIndex || this.noCategory) {
		if (!this.isRootIndex && !this.noTitle) {
			var h2 = document.getElementsByTagName('h2')[0];
				h2.setAttribute('class', 'noCategory');
		}
		return;
	}
	
	// add the category marker
	if (page_info.hasOwnProperty('category')) {
		if (!Array.isArray(page_info.category)) {
			page_info.category = [page_info.category];
		}
	}
	else {
		page_info.category = [];
	}

	
	var div = document.createElement('div');
		div.setAttribute('class', 'category');
		div.appendChild(document.createTextNode(msg.UI.m04))
	
	if (page_info.category.length > 0) {
	
		for (var x = 0; x < page_info['category'].length; x++) {
		
			var index_url = '';
			
			// if more than one category, need to add ../ to reach the right page
			if (page_info.category.length > 1) {
				for (var y = page_info.category.length-1; y > x; y--) {
					index_url += '../';
				}
			}
			
			index_url += 'index.html'
			
			if (x > 0) {
				div.appendChild(document.createTextNode(' - '));
			}
			
			var index = document.createElement('a');
				index.setAttribute('href',index_url);
				index.appendChild(document.createTextNode(page_info.category[x]))
			
			div.appendChild(index);
		}
	}
	
	document.getElementById('page-title').insertAdjacentElement('afterBegin', div);
}


/* 
 * generate the list of links to the sections on the page
 */

KB.prototype.generateMiniToc = function () {

	if (this.isIndex || this.isSearch || this.isHomePage) {
		var class_type = this.isIndex ? 'index' : (this.isSearch ? 'search' : 'home');
		document.getElementsByTagName('main')[0].setAttribute('class', class_type);
		return;
	}
	
	var flex_div = document.createElement('div');
		flex_div.setAttribute('class', 'col-wrapper');
	
	var navcol = document.createElement('div');
		navcol.setAttribute('id', 'nav-col');
	
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
			ol.setAttribute('role', 'list');
			ol.setAttribute('id', 'mini-toc');
		
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
	
	navcol.appendChild(nav);
	flex_div.appendChild(navcol);
	flex_div.appendChild(document.getElementById('body'));
	
	document.getElementsByTagName('main')[0].insertAdjacentElement('afterBegin', flex_div);
}


/* generates the box that identifies what format the topic applies to */

KB.prototype.generateAppliesTo = function () {

	if (this.isIndex || this.isSearch || this.isHomePage) {
		return;
	}
	
	if (!page_info.hasOwnProperty('appliesTo')) {
		return;
	}
	
	var section = document.createElement('section');
		section.id = 'applies-to';
	
	/* add section heading */
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode(msg.UI.m03));
	
	section.appendChild(h3);
	
	var notes = null;
	
	var formats = ['EPUB3', 'EPUB2', 'Audiobooks'];
	
	var table = document.createElement('table');
	
	var thead = document.createElement('tr');
	var tbody = document.createElement('tr');
	
	// add an entry for each format identified in the page_info
	for (var i = 0; i < formats.length; i++) {
		
		var th = document.createElement('th');
		
		var td = document.createElement('td');
		
		var at_url = '';
		
		switch (formats[i]) {
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
			a.appendChild(document.createTextNode(formats[i].replace(/EPUB([2-3])/,'EPUB $1')));
		 
		th.appendChild(a);
		thead.appendChild(th);
		
		if (page_info.appliesTo.includes(formats[i])) {
			td.appendChild(document.createTextNode('Yes'));
			td.setAttribute('class', 'yes');
		}
		
		else if (page_info.appliesTo.includes('Audiobooks*') && formats[i] == 'Audiobooks') {
			
			td.setAttribute('class', 'partial');
			td.appendChild(document.createTextNode('Partial'));
			
			var a_ref = document.createElement('a');
				a_ref.setAttribute('href','#aud01');
				a_ref.setAttribute('role','doc-noteref');
				a_ref.appendChild(document.createTextNode('*'));
			
			td.appendChild(a_ref);
			
			var note = document.createElement('p');
				note.id = 'aud01';
				note.setAttribute('class','small');
				note.setAttribute('role', 'doc-footnote');
			
			note.appendChild(document.createTextNode(msg.appliesto.m01));
			notes = note;
		}
		
		else {
			td.appendChild(document.createTextNode('No'));
			td.setAttribute('class', 'no');
		}
		
		tbody.appendChild(td);
	}
	
	table.appendChild(thead);
	table.appendChild(tbody);
	
	section.appendChild(table);
	
	if (notes) {
		section.appendChild(notes);
	}
	
	// add before the related links section, otherwise at end of body
	
	var techniques = document.querySelector('section#refs');
	
	if (techniques !== null) {
		techniques.insertAdjacentElement('beforeBegin', section);
	}
	
	else {
		document.querySelector('div#body').insertAdjacentElement('beforeEnd', section)
	}
}


/* create the default footer for the pages */

KB.prototype.generateFooter = function () {
	
	if (this.noFooter) {
		return;
	}
	
	if (!this.noTopLink) {
		// add back to top link
		
		var top = document.createElement('p');
			top.setAttribute('class','backtotop');
		
		var toplink = document.createElement('a');
			toplink.setAttribute('href','#');
			toplink.appendChild(document.createTextNode(msg.footer.m08));
		
		top.appendChild(toplink);
	
		document.getElementById('body').insertAdjacentElement('beforeEnd', top);
	}
	
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
	if (!this.isIndex && !this.isSearch && !this.isHomePage) {
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

/* write the navigation topics */

KB.prototype.addTopicLinks = function() {

	if (this.isCategoryIndex && !this.isRootIndex) {
		
		// category index
		
		var toc = document.createElement('nav');
			toc.id = 'toc';
			toc.setAttribute('role', 'doc-toc');
			toc.setAttribute('aria-label', 'Table of contents');
		
		var root_topic = findTopics(topic_list, page_info.root_id);
		
		if (!root_topic) {
			console.log('No matching topic index for ' + page_info.root_id);
			return;
		}
		
		if (root_topic.hasOwnProperty('categories')) {
		
			for (var j = 0; j < root_topic.categories.length; j++) {
				
				var section = document.createElement('section');
				
				section.id = root_topic.categories[j].id;
				
				var h3 = document.createElement('h3');
					h3.appendChild(document.createTextNode(root_topic.categories[j].title));
				
				section.appendChild(h3);
				
				if (root_topic.categories[j].hasOwnProperty('subtitle')) {
					section.appendChild(createDescription(root_topic.categories[j].subtitle));
				}
				
				section.appendChild(this.createLinkList(root_topic.categories[j], false))
				toc.appendChild(section);
			}
		}
		
		else {
			toc.appendChild(this.createLinkList(root_topic, false));
		}
		
		document.getElementsByTagName('h2')[0].insertAdjacentElement('afterEnd', toc);
		
	}
	
	else {
		
		// generate site root index
		
		var toc = document.getElementById('toc');
		
		for (var i = 0; i < topic_list.length; i++) {
		
			if (topic_list[i].hasOwnProperty('showInRootIndex') && !topic_list[i].showInRootIndex) {
				continue;
			}
			
			var details = document.createElement('details');
				details.id = topic_list[i].id;
				details.setAttribute('open', 'open');
			
			var summary = document.createElement('summary');
				summary.innerHTML = topic_list[i].title;
			
			details.appendChild(summary);
			
			if (topic_list[i].hasOwnProperty('subtitle')) {
				details.appendChild(createDescription(topic_list[i].subtitle));
			}
			
			if (topic_list[i].hasOwnProperty('categories')) {
			
				for (var j = 0; j < topic_list[i].categories.length; j++) {
					
					var section = document.createElement('section');
					
					section.id = topic_list[i].categories[j].id;
					
					var h3 = document.createElement('h3');
						h3.innerHTML = topic_list[i].categories[j].title;
					
					section.appendChild(h3);
					
					if (topic_list[i].categories[j].hasOwnProperty('subtitle')) {
						section.appendChild(createDescription(topic_list[i].categories[j].subtitle));
					}
					
					section.appendChild(this.createLinkList(topic_list[i].categories[j], true))
					details.appendChild(section);
				}
			}
			
			else {
				details.appendChild(this.createLinkList(topic_list[i], true));
			}
			
			toc.insertAdjacentElement('beforeEnd', details);
		}
	}
}

function findTopics(topic_list, id) {

	for (var i = 0; i < topic_list.length; i++) {
	
		if (topic_list[i].id == id) {
			return topic_list[i];
		}
		
		else {
		
			if (topic_list[i].hasOwnProperty('categories')) {
			
				var result = findTopics(topic_list[i].categories, id);
				
				if (result) {
					return result;
				}
			}
		}
	}
	
	return null;
}


function createDescription(desc_text) {
	var desc = document.createElement('p');
		desc.setAttribute('class', 'topic_subtitle');
		desc.innerHTML = desc_text;
	return desc;
}


KB.prototype.createLinkList = function(topic, isRoot) {

	var ol = document.createElement('ol');
		ol.setAttribute('role', 'list');
	
	for (var j = 0; j < topic.topics.length; j++) {
	
		var li = document.createElement('li');
			li.id = topic.topics[j].id;
		
		var a = document.createElement('a');
			
			if (topic.topics[j].hasOwnProperty('href-override')) {
				// for linking to topics in a separate directory
				a.setAttribute('href', '/publishing/docs/' + topic.topics[j]['href-override']);
			}
			
			else {
				a.setAttribute('href', (isRoot ? topic.path + '/' : '') + topic.topics[j].href);
			}
			
			if (topic.topics[j].hasOwnProperty('aria-label')) {
				a.setAttribute('aria-label', topic.topics[j]['aria-label']);
			}
			
			a.innerHTML = topic.topics[j].title;
		
		li.appendChild(a);
		
		if (topic.topics[j].hasOwnProperty('subtitle')) {
			li.appendChild(document.createElement('br'));
			li.innerHTML += '<span class="topic_subtitle">' + topic.topics[j].subtitle + '</span>';
		}
		
		ol.appendChild(li);
	}
	
	return ol;
}


/* convert shorthand references to WCAG in techniques */

KB.prototype.generateWCAGLinks = function() {
	document.body.innerHTML = document.body.innerHTML.replace(/\[\[WCAG-([0-9.]+)\]\]/gi, wcagLink);
}

function wcagLink(match, p1) {
	return '<span class="wcag-level">[<a href="/publishing/docs/wcag/' + sc_map[p1].id + '.html">WCAG ' + p1 + ' - ' + sc_map[p1].level + '</a>]</span>';
}


/* format the search page layout */

KB.prototype.formatSearchPage = function () {
	document.getElementsByTagName('main')[0].setAttribute('class', 'search');
}



/* format nav-less layouts */

KB.prototype.formatOpenPage = function () {
	document.getElementsByTagName('main')[0].setAttribute('class', 'no-nav');
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
	
	var mini_toc = document.getElementById('mini-toc');
	
	if (mini_toc) {
		var ms = new MenuSpy(mini_toc,{
			activeClass   : 'mini-toc-active',
			threshold     : -190
		});
	}
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
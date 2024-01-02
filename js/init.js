
/* 
 * 
 * This file contains the KB class of functions, a set of callbacks
 * for copying examples, and the initiation code for each page.
 * It is only required that each page that needs formatting include
 * a reference to this script in its head, with page-specific
 * configuration done through a json object in the header.
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
	
	this.kb_url = 'https://kb.daisy.org/';
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
		
		this.writeHeadTag('js', '/js/prettify.js');
		this.writeGoogleAnalytics();
		this.writeHeadTag('favicon', null, null);
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
	
	else if (type === 'favicon') {
		tag = document.createElement('link');
		tag.setAttribute('rel', 'icon');
		tag.setAttribute('type', 'image/x-icon');
		tag.setAttribute('href', this.kb_url + 'favicon.ico');
		tag.setAttribute('sizes', 'any');
	}
	
	// add the generated tag to the page header
	this.page_hd.appendChild(tag);
}



/* 
 * writes the google analytics code
 */

KB.prototype.writeGoogleAnalytics = function () {

	this.writeHeadTag('js', 'https://www.googletagmanager.com/gtag/js?id=G-FKBYKZH39R', {async: 'async'});
	
	var ga = document.createElement('script');
		ga.appendChild(document.createTextNode("\
			window.dataLayer = window.dataLayer || [];\
			function gtag(){dataLayer.push(arguments);}\
			gtag('js', new Date());\
			gtag('config', 'G-FKBYKZH39R');\
		"));
	
	this.page_hd.appendChild(ga);

}


/* 
 * reformats the page for visual display depending on the hosting location (on the web or inside an ace browser view)
 */

KB.prototype.writeTemplate = function () {

	if (this.host == 'kb') {
	
		kb.generateHeader();
		
		// don't regenerate the body for the search page or the results won't get returned to the div
		if (!this.isSearch) {
			kb.generateBody();
		}
		
		kb.generatePageTitle();
		
		if (this.isIndex) {
			kb.addTopicLinks();
		}
		
		if (!page_info.hasOwnProperty('nav') || page_info.nav) {
			
			if (page_info.hasOwnProperty('appliesTo')) {
				kb.generateAppliesTo();
			}
			
			kb.generateMiniToc();
			
			if (page_info.hasOwnProperty('related')) {
				kb.generateRelatedTopics();
			}
		
		}
		
		
		if (this.isSearch) {
			kb.formatSearchPage();
		}
		
		else {
			kb.generateCategoryList();
			// kb.generateSponsorBox();
		}
		
		kb.generateFooter();
		
		if (!this.isIndex && !this.isSearch && !this.isHomePage) {
			kb.prettyPrint();
			kb.addGlossaryLinks();
			kb.addPermaLinks();
			kb.generateWCAGLinks();
			/* add functions with event listeners after generating wcag links or they get stripped */
			kb.addExampleCopy();
		}
		
		var cur_href = window.location.href.toString();
		var href_len = cur_href.length - 1;
		var last_slash = cur_href.lastIndexOf('/')
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
		skip_a.appendChild(document.createTextNode(msg.header.skip));
	
	header.appendChild(skip_a);
	
	document.getElementsByTagName('main')[0].setAttribute('id','main');
	
	var h1 = document.createElement('h1');
	
	var h1_a = document.createElement('a');
		h1_a.setAttribute('href', this.kb_root);
		h1_a.setAttribute('class', 'home-link');
		
	// add the daisy logo
	var logo = document.createElement('img');
		logo.setAttribute('class','logo');
		logo.setAttribute('src','/graphics/daisy_logo.png');
		logo.setAttribute('alt', msg.header.logo);
	
	h1_a.appendChild(logo);
	
	// add kb name
	h1_a.appendChild(document.createTextNode(' ' + msg.kb_name[this.kb_id]));
	
	h1.appendChild(h1_a);
	
	header.appendChild(h1);
	
	var search = document.createElement('search');
		search.setAttribute('title','knowledge base');
		search.setAttribute('hidden', 'hidden');
	
	var search_script = document.createElement('script');
		search_script.setAttribute('async', '');
		search_script.setAttribute('src', 'https://cse.google.com/cse.js?cx=012567327240487320396:ngadtxfagto');
	
	search.appendChild(search_script);
	
	var search_box = document.createElement('div');
		search_box.setAttribute('class', 'gcse-searchbox-only');
	
	search.appendChild(search_box);
	header.appendChild(search);
	
	document.body.insertAdjacentElement('afterBegin',header);
}


/* generates the standard page body inside main */

KB.prototype.generateBody = function () {
	
	// create a new main element to contain the body
	var new_main = document.createElement('main');
		new_main.id = 'main';
	
	var is2Col = ((page_info.hasOwnProperty('nav') && !page_info.nav) || page_info.isIndex) ? true : false;
	
	// create the flex layout container
	var flex_div = document.createElement('div');
		flex_div.setAttribute('id', 'col-wrapper');
	
	if (is2Col) {
		flex_div.setAttribute('class','two-col');
	}
	
	new_main.appendChild(flex_div);
	
	// create new body div for the page content
	var new_body = document.createElement('div');
		new_body.setAttribute('id', 'body');

	if (is2Col) {
		new_body.setAttribute('class','two-col');
	}
	
	// copy the old main inside
	var old_main = document.getElementsByTagName('main')[0];
		new_body.innerHTML = old_main.innerHTML;
	
	// add the new main element and delete the old
	flex_div.appendChild(new_body);
	
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
		document.title = this.title + ' - ' + msg.kb_name[this.kb_id];
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
		div.appendChild(document.createTextNode(msg.UI.cat));
	
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
			
			div.appendChild(document.createTextNode(page_info.category[x]));
		}
	}
	
	document.getElementById('page-title').insertAdjacentElement('afterBegin', div);
}


/* 
 * generate the list of links to the sections on the page
 */

KB.prototype.generateMiniToc = function () {

	if (this.isCategoryIndex || this.isSearch || this.isHomePage) {
		var class_type = this.isIndex ? 'index' : (this.isSearch ? 'search' : 'home');
		if (this.isIndex && !this.isRootIndex) {
			class_type += ' category';
		}
		document.getElementsByTagName('main')[0].setAttribute('class', class_type);
		return;
	}
	
	var navcol = document.createElement('div');
		navcol.setAttribute('id', 'nav-col');
	
	// grab all the subsection headings on the page
	var h = document.querySelectorAll('h3');
	
	var nav = document.createElement('nav');
		nav.setAttribute('role', 'doc-toc');
		nav.setAttribute('class', 'mini-toc');
		nav.setAttribute('aria-labelledby', 'page-toc-hd');
	
	if (h.length > 0) {
	
		/* add section heading */
		var h3 = document.createElement('h3');
			h3.setAttribute('id', 'page-toc-hd');
			h3.appendChild(document.createTextNode(msg.UI.onpage));
		
		nav.appendChild(h3);
		
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
					sectionName = msg.shortForm.hasOwnProperty(h[i].textContent) ? msg.shortForm[h[i].textContent] : h[i].textContent;
				
				a.appendChild(document.createTextNode(sectionName));
			 
			 li.appendChild(a);
			 
			 if (page_info.hasOwnProperty('addh4') && page_info.addh4) {
			 
			 	var h4 = parent.querySelectorAll('h4');
			 	
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
		
		nav.appendChild(ol);
	}
	
	navcol.appendChild(nav);
	
	document.getElementById('col-wrapper').insertAdjacentElement('afterBegin', navcol);

}


/* 
 * generate the list of links to related topics
 */

KB.prototype.generateRelatedTopics = function () {

	var nav = document.createElement('nav');
		nav.setAttribute('class', 'mini-toc');
	
	var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode('Related Topics'));
	
	nav.appendChild(h3);
	
	var ol = document.createElement('ol');
	
	for (var i = 0; i < page_info.related.length; i++) {
	
		var topic = findTopic(topic_list, page_info.related[i]);
		
		if (topic === null) {
			continue;
		}
		
		var li = document.createElement('li');
		
		var a = document.createElement('a');
			a.setAttribute('href', topic.href);
			a.appendChild(document.createTextNode(topic.title));
		
		li.appendChild(a);
		ol.appendChild(li);
	}
	
	nav.appendChild(ol);
	
	document.getElementById('nav-col').insertAdjacentElement('beforeEnd', nav);
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
		h3.appendChild(document.createTextNode(msg.UI.applies));
	
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
			
			note.appendChild(document.createTextNode(msg.appliesto.audiobooks));
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



/* create the sponsorhip box at the top of the categories box */

KB.prototype.generateSponsorBox = function () {
	
	var sponsor = document.createElement('aside');
		sponsor.setAttribute('id', 'sponsor');
	
	var sponsor_h2 = document.createElement('h2');
		sponsor_h2.appendChild(document.createTextNode('Sponsored by'));
	sponsor.appendChild(sponsor_h2);
	
	var sponsor_img = document.createElement('img');
		sponsor_img.src = '/graphics/daisy_logo.png';
		sponsor_img.alt = 'Example'
	sponsor.appendChild(sponsor_img);
	
	document.getElementById('categories').insertAdjacentElement('afterBegin', sponsor);
}



/* generate the sticky category menu */

KB.prototype.generateCategoryList = function () {
	
	var cat_div = document.createElement('div');
		cat_div.setAttribute('id', 'categories');
	
	var cat_nav = document.createElement('nav');
		cat_nav.setAttribute('role', 'doc-toc');
		cat_nav.setAttribute('class', 'mini-toc');
		cat_nav.setAttribute('aria-labelledby', 'cat-hd');
	
	var cat_hd = document.createElement('h3');
		cat_hd.appendChild(document.createTextNode('Categories'));
		cat_hd.setAttribute('id', 'cat-hd');
	
	cat_nav.appendChild(cat_hd);
	
	var categories = [
		{
			name: msg.category.conf,
			id: 'conf',
			href: 'conformance'
		},
		{
			name: msg.category.css,
			id: 'css',
			href: 'css'
		},
		{
			name: msg.category.epub,
			id: 'epub',
			href: 'epub'
		},
		{
			name: msg.category.fxl,
			id: 'fxl',
			href: 'fxl'
		},
		{
			name: msg.category.html,
			id: 'html',
			href: 'html'
		},
		{
			name: msg.category.meta,
			id: 'meta',
			href: 'metadata'
		},
		{
			name: msg.category.nav,
			id: 'nav',
			href: 'navigation'
		},
		{
			name: msg.category.script,
			id: 'script',
			href: 'script',
			cat: 'Scripted Content and Forms'
		},
		{
			name: msg.category.sync,
			id: 'sync',
			href: 'sync-media',
			cat: 'Synchronized Multimedia'
		},
		{
			name: msg.category.tts,
			id: 'tts',
			href: 'text-to-speech'
		}
	];
	
	// make sure categories are in an array
	
	if (page_info.hasOwnProperty('category')) {
		if (!Array.isArray(page_info.category)) {
			page_info.category = [page_info.category];
		}
	}
	else {
		page_info.category = [];
	}

	
	var cat_list = '<ol role="list">';
	
	for (var i = 0; i < categories.length; i++) {
	
		cat_list += '<li id="' + categories[i].id + '-link"';
		
		var isActiveCategory = (page_info.category.includes(categories[i].name) || page_info.category.includes(categories[i].cat)) ? true : false;
		
		// highlight if the active category
		
		if (isActiveCategory) {
			cat_list += ' class="active-cat" aria-current="location"';
		}
		
		cat_list += '><a href="' + this.kb_root + categories[i].href + '">' + categories[i].name + '</a>'; 
		
		// add a sub-category entry if an array of more than one category
		
		if (isActiveCategory && page_info.category.length > 0) {
			
			cat_list += '<ol>';
			
			// skip the top-level category
			for (var x = 1; x < page_info['category'].length; x++) {
			
				var index_url = '';
				
				// if more than one category, need to add ../ to reach the right page
				if (page_info.category.length > 1) {
					for (var y = page_info.category.length-1; y > x; y--) {
						index_url += '../';
					}
				}
				
				index_url += 'index.html'
				
				cat_list += '<li><a href="' + index_url + '">' + page_info.category[x] + '</a></li>';
			}
			
			cat_list += '</ol>';
		}
		
		// close the list item
		cat_list += '</li>';
	}
	
	cat_list += '</ol>';
	
	cat_nav.innerHTML += cat_list;
	
	cat_div.appendChild(cat_nav);
	
	document.getElementById('col-wrapper').appendChild(cat_div);
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
			toplink.appendChild(document.createTextNode(msg.footer.top));
		
		top.appendChild(toplink);
	
		document.getElementById('body').insertAdjacentElement('beforeEnd', top);
	}
	
	var footer = document.createElement('footer');
	var spacer = '\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0';
	
	// add link lists
	
	var linklists = document.createElement('div');
		linklists.setAttribute('class','footer-lists');
	
	// add the site links
	
	var site = document.createElement('div');
		site.setAttribute('class','footer-list');
	
	var sitehd = document.createElement('div');
		sitehd.appendChild(document.createTextNode(msg.footer.site));
	site.appendChild(sitehd);
	
	var sitelist = document.createElement('ul')
	
	var site_links = [
		{
			/* all topics */
			name: msg.footer.topics,
			href: 'topics.html'
		},
		{
			/* glossary */
			name: msg.footer.gloss,
			href: 'glossary'
		},
		{
			/* what's new */
			name: msg.footer.whatnew,
			href: 'new'
		},
		{
			/* about */
			name: msg.footer.about,
			href: 'about.html'
		}
	];
	
	for (var i = 0; i < site_links.length; i++) {
		sitelist.appendChild(this.createFooterLink(site_links[i]));
	}
	
	site.appendChild(sitelist);
	linklists.appendChild(site);
	
	// add feedback links
	
	var feedback = document.createElement('div');
		feedback.setAttribute('class','footer-list');
	
	var feedbackhd = document.createElement('div');
		feedbackhd.appendChild(document.createTextNode(msg.footer.feedback));
	feedback.appendChild(feedbackhd);
	
	var feedbacklist = document.createElement('ul')
	
	var page_path = window.location.href.substring(window.location.href.indexOf(this.kb_id+'/')+this.kb_id.length+1,window.location.href.length);
		page_path = (page_path == '') ? 'index.html' : page_path;
	
	var feedback_links = [
		{
			/* error reporting */
			name: msg.footer.report,
			href: 'reporting/#bugs'
		},
		{
			/* revision history */
			name: msg.footer.rev,
			href: this.kb_repo + this.kb_id + '/' + page_path
		},
		{
			/* new topic */
			name: msg.footer.request,
			href: 'reporting/#new'
		},
		{
			/* contribute */
			name: msg.footer.contrib,
			href: 'contribute'
		}
	];
	
	for (var i = 0; i < feedback_links.length; i++) {
		feedbacklist.appendChild(this.createFooterLink(feedback_links[i]));
	}
	
	feedback.appendChild(feedbacklist);
	linklists.appendChild(feedback);
	
	// add specification links
	
	var spec = document.createElement('div');
		spec.setAttribute('class','footer-list');
	
	var spechd = document.createElement('div');
		spechd.appendChild(document.createTextNode(msg.footer.spec));
	spec.appendChild(spechd);
	
	var speclist = document.createElement('ul')
	
	var spec_links = [
		{
			/* epub accessibility */
			name: msg.footer.a11y,
			href: 'https://www.w3.org/TR/epub-a11y/'
		},
		{
			/* epub 3 */
			name: msg.footer.epub3,
			href: 'https://www.w3.org/TR/epub/'
		}
	];
	
	for (var i = 0; i < spec_links.length; i++) {
		speclist.appendChild(this.createFooterLink(spec_links[i]));
	}
	
	spec.appendChild(speclist);
	linklists.appendChild(spec);
	footer.appendChild(linklists);
	
	// add daisy links
	
	var daisy = document.createElement('p');
		daisy.setAttribute('class','copy');

	// add the copyright
	
	daisy.appendChild(document.createTextNode(msg.footer.copy.replace('%yr%', new Date().getFullYear()) + spacer));

	// add the link to the terms of use and privacy policy
	
	var termslink = document.createElement('a');
		termslink.setAttribute('href','http://www.daisy.org/terms-use');
		termslink.appendChild(document.createTextNode(msg.footer.terms + spacer));
	
	daisy.appendChild(termslink);
	
	var privacylink = document.createElement('a');
		privacylink.setAttribute('href','https://daisy.org/about-us/terms-and-conditions/privacy/');
		privacylink.appendChild(document.createTextNode(msg.footer.privacy));
	
	daisy.appendChild(privacylink);
	
	footer.appendChild(daisy);

	document.body.appendChild(footer);
}


/* create the list links at the bottom of each page */

KB.prototype.createFooterLink = function(link_info) {
	
	/* don't override absolute URLs */
	var link_href = link_info.href.match(/^http/) ? link_info.href : this.kb_root + link_info.href;
	
	var li = document.createElement('li');
	
	var link = document.createElement('a');
		link.setAttribute('href', link_href);
		link.appendChild(document.createTextNode(link_info.name));
	
	li.appendChild(link);
	
	return li;
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
			input.setAttribute('value', msg.pageControl.copy);
			input.setAttribute('class','copy');
			
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
		links[i].setAttribute('title', msg.pageControl.dfnLink);
	}
}


/* add permalinks to examples and faqs */

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


/* creates a permalink for the specified content */

KB.prototype.createPermaLink = function(num, label, dest) {

	var a = document.createElement('a');
		a.href = '#' + dest;
		a.setAttribute('class', 'permalink');
		a.setAttribute('aria-label', msg.pageControl.permalink + label + ' ' + num);
		a.appendChild(document.createTextNode(msg.pageControl.permalinkSymbol));
	
	return a;

}


/* write the navigation topics */

KB.prototype.addTopicLinks = function() {

	if (this.isCategoryIndex && !this.isRootIndex) {
		
		// category index
		
		var root_topic = findCategory(topic_list, page_info.root_id);
		
		var toc = document.createElement('nav');
			toc.id = 'toc';
			toc.setAttribute('role', 'doc-toc');
			toc.setAttribute('aria-label', msg.topics.toc);
		
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
		
		var sec_hd = document.getElementsByTagName('h2')[0]; 
		
		sec_hd.insertAdjacentElement('afterEnd', toc);
		
		if (root_topic.hasOwnProperty('subtitle')) {
			sec_hd.insertAdjacentElement('afterEnd',createDescription(root_topic.subtitle));
		}
	}
	
	else {
		
		// generate site root index
		
		var toc = document.getElementById('toc');
		
		for (var i = 0; i < topic_list.length; i++) {
		
			if (topic_list[i].hasOwnProperty('showInRootIndex') && !topic_list[i].showInRootIndex) {
				continue;
			}
			
			var section = document.createElement('section');
				section.id = topic_list[i].id;
			
			var h3 = document.createElement('h3');
				h3.innerHTML = topic_list[i].title;
			
			section.appendChild(h3);
			
			if (topic_list[i].hasOwnProperty('subtitle')) {
				section.appendChild(createDescription(topic_list[i].subtitle));
			}
			
			if (topic_list[i].hasOwnProperty('categories')) {
			
				for (var j = 0; j < topic_list[i].categories.length; j++) {
					
					var cat_section = document.createElement('section');
						cat_section.id = topic_list[i].categories[j].id;
					
					var h4 = document.createElement('h4');
						h4.innerHTML = topic_list[i].categories[j].title;
					
					cat_section.appendChild(h4);
					
					if (topic_list[i].categories[j].hasOwnProperty('subtitle')) {
						cat_section.appendChild(createDescription(topic_list[i].categories[j].subtitle));
					}
					
					cat_section.appendChild(this.createLinkList(topic_list[i].categories[j], true))
					section.appendChild(cat_section);
				}
			}
			
			else {
				section.appendChild(this.createLinkList(topic_list[i], true));
			}
			
			toc.insertAdjacentElement('beforeEnd', section);
		}
	}
}

function findCategory(topic_list, id) {

	for (var i = 0; i < topic_list.length; i++) {
	
		if (topic_list[i].id == id) {
			return topic_list[i];
		}
		
		else {
		
			if (topic_list[i].hasOwnProperty('categories')) {
			
				var result = findCategory(topic_list[i].categories, id);
				
				if (result) {
					return result;
				}
			}
		}
	}
	
	return null;
}


function findTopic(topic_list, id) {

	for (var i = 0; i < topic_list.length; i++) {
	
		var topic;
		
		if (topic_list[i].id == id) {
			topic = topic_list[i];
		}
		
		else if (topic_list[i].hasOwnProperty('topics')) {
			topic = findTopic(topic_list[i].topics, id);
			
		}
		
		else if (topic_list[i].hasOwnProperty('categories')) {
			topic = findTopic(topic_list[i].categories, id);
		}
		
		if (topic) {
			return topic;
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
		alert('Code successfully copied.')
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
	
	// ensure target location gets scrolled into view
	var hash = window.location.hash;
	
	if (hash) {
		
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
	
	// scrub the search box
	var script = document.createElement('script');
		script.setAttribute('src', '/js/google-clean.js');
	
	document.body.insertAdjacentElement('beforeEnd', script);
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
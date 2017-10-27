
window.onload = function () {
	var kb = new KB();
	if (kb.setKBInfo()) {
		kb.generateTitles();
		kb.generateHeader();
		kb.generateBreadcrumb();
		kb.generateMiniToc();
		kb.generateFooter();
		kb.prettyPrint();
	}
}

function KB() {
	this.kb_id = '';
	this.isIndex = false;
	this.isRootIndex = false;
	
	this.kb_name = {
		'publishing': 'Accessible Publishing Knowledge Base'
	}
	
	this.kb_url = 'http://kb.daisy.org/';
	this.kb_repo = 'https://github.com/DAISY/kb/commits/master/';
}


KB.prototype.setKBInfo = function () {
	
	var docsMatch = window.location.href.toString().match(/\/docs\//i);
	
	if (docsMatch) {
		var idMatch = window.location.href.toString().match(/\/([A-Z0-9]+)\/docs\//i);
		
		if (!idMatch) {
			console.log('Failed to determine id from path: ' + window.location.href);
			return false;
		}
		
		this.kb_id = idMatch[1];
	}
	
	else {
		var seg = window.location.href.split('/');
		this.kb_id = seg[seg.length-1] == 'index.html' ? seg[seg.length-2] : seg[seg.length-1];
	}
	
	this.isRootIndex = page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'] ? true : false;
	
	this.isIndex = ((page_info.hasOwnProperty('isIndex') && page_info['isIndex']) || (page_info.hasOwnProperty('isRootIndex') && page_info['isRootIndex'])) ? true : false;
	
	return true;
}


KB.prototype.generateTitles = function () {
	
	document.title = (this.isRootIndex ? '' : page_info['page_title'] + ' / ') + this.kb_name[this.kb_id];
	
	if (!this.isRootIndex) {
		var h2 = document.createElement('h2');
			h2.appendChild(document.createTextNode(page_info['page_title']));
		
		document.querySelector('main').insertAdjacentElement('afterBegin', h2);
	}
}


KB.prototype.generateHeader = function () {

	var header = document.createElement('header');
	
	var h1 = document.createElement('h1');
	
	var pathUp = (this.isRootIndex) ? '../' : '../../../';
	
	var logo = document.createElement('img');
		logo.setAttribute('class','logo');
		logo.setAttribute('src',pathUp+'graphics/daisy_logo.png');
		logo.setAttribute('alt','DAISY')
	
	h1.appendChild(logo);
	h1.appendChild(document.createTextNode(' '));
	
	var a = document.createElement('a');
		a.setAttribute('href',this.kb_url[this.kb_id] + this.kb_id + '/');
		a.appendChild(document.createTextNode(this.kb_name[this.kb_id]));
	
	h1.appendChild(a);
	
	header.appendChild(h1);
	
	document.body.insertAdjacentElement('afterBegin',header);
}


KB.prototype.generateBreadcrumb = function () {

	if (this.isRootIndex) {
		return;
	}
	
	var breadcrumb = document.createElement('nav');
		breadcrumb.setAttribute('class','breadcrumb');
	
	var p = document.createElement('p');
	
	var home = document.createElement('a');
		home.setAttribute('href','../../index.html');
		home.appendChild(document.createTextNode('KB'))
	
	p.appendChild(home);
	p.appendChild(document.createTextNode(' > '));
	
	if (window.location.href.indexOf('index.html') > -1) {
		var span = document.createElement('span');
			span.appendChild(document.createTextNode(page_info['topic']));
		
		p.appendChild(span);
	}
	
	else {
		var index = document.createElement('a');
			index.setAttribute('href','index.html');
			index.appendChild(document.createTextNode(page_info['topic']))
		
		p.appendChild(index);
		p.appendChild(document.createTextNode(' > '));
		
		var span = document.createElement('span');
			span.appendChild(document.createTextNode(page_info['page_title']));
		
		p.appendChild(span);
	}
	
	breadcrumb.appendChild(p);
	
	var h2 = document.querySelector('h2');
		h2.insertAdjacentElement('afterEnd', breadcrumb);
}


KB.prototype.generateMiniToc = function () {
	
	if (window.location.href.indexOf('index.html') > -1 || window.location.href.lastIndexOf('/') == window.location.href.length-1) {
		// don't build for indexes
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
	
	var h = document.querySelectorAll('h3');
	
	for (var i = 0; i < h.length; i++) {
		var li = document.createElement('li');
		
		var a = document.createElement('a');
			a.setAttribute('href','#'+h[i].parentNode.id);
			a.appendChild(document.createTextNode(h[i].textContent == 'Frequently Asked Questions' ? 'FAQ' : h[i].textContent));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	}
	
	nav.appendChild(ol);
	
	document.querySelector('main > nav.breadcrumb').insertAdjacentElement('afterEnd', nav);
}


KB.prototype.generateFooter = function () {
	var footer = document.createElement('footer');
	
	var typos = document.createElement('p');
		typos.appendChild(document.createTextNode('To report typos, errors and omissions, please open an issue in the '));
	
	var issuelink = document.createElement('a');
		issuelink.setAttribute('href','https://github.com/DAISY/kb/issues');
		issuelink.appendChild(document.createTextNode('GitHub tracker'));
	
		typos.appendChild(issuelink);
		typos.appendChild(document.createTextNode('.'));
	
	footer.appendChild(typos);
	
	var changes = document.createElement('p');
		changes.appendChild(document.createTextNode('For a list of changes to this page, refer to the '));
	
	var page_path = window.location.href.substring(window.location.href.indexOf(this.kb_id+'/')+this.kb_id.length+1,window.location.href.length);
	
	page_path = (page_path == '') ? 'index.html' : page_path;
	
	var commitlink = document.createElement('a');
		commitlink.setAttribute('href',this.kb_repo[this.kb_id] + this.kb_id + '/' + page_path);
		commitlink.appendChild(document.createTextNode('commit log'));
	
		changes.appendChild(commitlink);
		changes.appendChild(document.createTextNode('.'));
	
	footer.appendChild(changes);
	
	var terms = document.createElement('p');
	
	var termslink = document.createElement('a');
		termslink.setAttribute('href','http://www.daisy.org/terms-use');
		termslink.appendChild(document.createTextNode('Terms of Use'));
	
	footer.appendChild(termslink);
	
	document.body.appendChild(footer);
}


KB.prototype.prettyPrint = function() {
	if (!this.isIndex) {
		prettyPrint();
	}
}

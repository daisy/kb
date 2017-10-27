
window.onload = function () {
	generateTitles();
	generateHeader();
	generateBreadcrumb();
	generateMiniToc();
	generateFooter();
}


var kb_name = {
	'publishing': 'Accessible Publishing Knowledge Base'
}

var kb_repo = {
	'publishing': 'https://github.com/DAISY/kb/commits/master/publishing/'
}


function generateTitles() {
	
	document.title = ((kb_info.hasOwnProperty('isRootIndex') && kb_info['isRootIndex']) ? '' : kb_info['page_title'] + ' / ') + kb_name[kb_info['id']];
	
	if (!kb_info.hasOwnProperty('isRootIndex') || !kb_info['isRootIndex']) {
		var h2 = document.createElement('h2');
			h2.appendChild(document.createTextNode(kb_info['page_title']));
		
		document.querySelector('main').insertAdjacentElement('afterBegin', h2);
	}
}


function generateHeader() {

	var header = document.createElement('header');
	
	var h1 = document.createElement('h1');
	
	var pathUp = (kb_info.hasOwnProperty('isRootIndex') || kb_info['isRootIndex']) ? '../' : '../../../';
	
	var logo = document.createElement('img');
		logo.setAttribute('class','logo');
		logo.setAttribute('src',pathUp+'graphics/daisy_logo.png');
		logo.setAttribute('alt','DAISY')
	
	h1.appendChild(logo);
	h1.appendChild(document.createTextNode(' '));
	
	var a = document.createElement('a');
		a.setAttribute('href',kb_info['url']);
		a.appendChild(document.createTextNode(kb_name[kb_info['id']]));
	
	h1.appendChild(a);
	
	header.appendChild(h1);
	
	document.body.insertAdjacentElement('afterBegin',header);
}


function generateBreadcrumb() {

	if (kb_info.hasOwnProperty('isRootIndex') && kb_info['isRootIndex']) {
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
			span.appendChild(document.createTextNode(kb_info['topic']));
		
		p.appendChild(span);
	}
	
	else {
		var index = document.createElement('a');
			index.setAttribute('href','index.html');
			index.appendChild(document.createTextNode(kb_info['topic']))
		
		p.appendChild(index);
		p.appendChild(document.createTextNode(' > '));
		
		var span = document.createElement('span');
			span.appendChild(document.createTextNode(kb_info['page_title']));
		
		p.appendChild(span);
	}
	
	breadcrumb.appendChild(p);
	
	var h2 = document.querySelector('h2');
		h2.insertAdjacentElement('afterEnd', breadcrumb);
}


function generateMiniToc() {
	
	if (window.location.href.indexOf('index.html') > -1 || window.location.href.lastIndexOf('/') == window.location.href.length-1) {
		// don't build for index pages
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
			a.setAttribute('href','#'+heading.parentNode.id);
			a.appendChild(document.createTextNode(heading.textContent == 'Frequently Asked Questions' ? 'FAQ' : heading.textContent));
		 
		 li.appendChild(a);
		 ol.appendChild(li);
	});
	
	nav.appendChild(ol);
	
	document.querySelector('main > nav.breadcrumb').insertAdjacentElement('afterEnd', nav);
}


function generateFooter() {
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
	
	var page_path = window.location.href.substring(window.location.href.indexOf(kb_info['id']+'/')+kb_info['id'].length+1,window.location.href.length);
	
	page_path = '' ? 'index.html' : page_path;
	
	var commitlink = document.createElement('a');
		commitlink.setAttribute('href',kb_repo[kb_info['id']] + page_path);
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

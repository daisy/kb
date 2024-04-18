
'use strict';

var daisySponsor = (function() {

	const sponsorship_config = 'https://dl.daisy.org/tools/sponsorship.json';
	
	const sponsorship_fallback = {
		"KnowledgeBase": {
			"en": {
				"messageText": "If you find this Knowledge Base useful, please help us by donating to support its ongoing maintenance.",
				"buttonText": "Support our work",
				"url": "https://daisy.org/KBSponsor",
				"active": true
			}
		},
		"SMART": {
			"en": {
				"messageText": "If you use SMART, please help us by donating to support its ongoing maintenance.",
				"buttonText": "Support our work",
				"url": "https://daisy.org/SMARTSponsor",
				"active": true
			}
		}
	};
	
	const lang = document.documentElement.lang;
	
	function loadSponsorInfo(site) {
	
		if (getCookieValue('sponsor')) {
			return;
		}
		
		fetch(sponsorship_config)
			
			.then(response => {
				if (!response.ok) {
					// throw new Error("Error fetching config file: " + response.status);
					generateSponsorInfo(sponsorship_fallback, site);
				}
				generateSponsorInfo(response.json(), site);
			})
			
			.catch(function () {
				generateSponsorInfo(sponsorship_fallback, site);
			})
	}
	
	function generateSponsorInfo(json, site) {
	
		var sponsorInfo;
		
		if (site == 'kb') {
			sponsorInfo = json.KnowledgeBase
		}
		
		else if (site == 'smart') {
			sponsorInfo = json.SMART
		}
		
		else {
			return;
		}
		
		if (!sponsorInfo[lang].active) {
			return;
		}
		
		// add the aside
		var sponsor = document.createElement('aside');
			sponsor.setAttribute('id', 'sponsor');
			sponsor.setAttribute('class', 'kb');
			sponsor.setAttribute('aria-label', 'Sponsor');

		var msg = document.createElement('span');
			msg.appendChild(document.createTextNode(sponsorInfo[lang].messageText));
		sponsor.appendChild(msg);
		
		var button = document.createElement('a');
			button.href = sponsorInfo[lang].url;
			button.appendChild(document.createTextNode(sponsorInfo[lang].buttonText));
		sponsor.appendChild(button);
		
		var sponsor_close = document.createElement('input');
			sponsor_close.setAttribute('type', 'button');
			sponsor_close.setAttribute('value', 'X');
			sponsor_close.setAttribute('onclick', 'daisySponsor.closeSponsorBox()');
			sponsor_close.setAttribute('aria-label', 'Close');
		
		sponsor.appendChild(sponsor_close);
		
		if (site == 'kb') {
			document.getElementById('col-wrapper').insertAdjacentElement('beforeBegin', sponsor);
		}
		
		else if (site == 'smart') {
			document.getElementById('page-wrapper').insertAdjacentElement('afterBegin', sponsor);
		}
	}
	
	function closeSponsorBox() {
		document.getElementById('sponsor').setAttribute('hidden','hidden');
		
		// set cookie to not show again for a month
		var date = new Date();
			date.setDate(date.getDate() + 30);
		
		var expires = date.toGMTString();
		
		document.cookie = 'sponsor=false; expires= ' + expires + '; Secure';
	}
	
	
	function getCookieValue(value) {
		var result = document.cookie.match('(^|;)\\s*' + value + '\\s*=\\s*([^;]+)');
		return result ? result.pop() : '';
	}

	return {
		loadSponsorInfo: function(site) {
			loadSponsorInfo(site);
		},
		
		closeSponsorBox: function() {
			closeSponsorBox();
		}
	}
})();

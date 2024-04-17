
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
	
	function loadSponsorInfo(kb) {
	
		if (getCookieValue('sponsor')) {
			return;
		}
		
		fetch(sponsorship_config)
			
			.then(response => {
				if (!response.ok) {
					// throw new Error("Error fetching config file: " + response.status);
					generateSponsorInfo(sponsorship_fallback, kb);
				}
				generateSponsorInfo(response.json(), kb);
			})
			
			.catch(function () {
				generateSponsorInfo(sponsorship_fallback, kb);
			})
	}
	
	function generateSponsorInfo(json, kb) {
	
		var sponsorInfo;
		
		if (kb) {
			sponsorInfo = json.KnowledgeBase
			
			// add the missing aside
			var sponsor = document.createElement('aside');
				sponsor.setAttribute('id', 'sponsor');
				sponsor.setAttribute('class', 'kb');
			document.getElementById('col-wrapper').insertAdjacentElement('beforeBegin', sponsor);
		}
		
		else {
			sponsorInfo = json.SMART
		}
		
		if (!sponsorInfo[lang].active) {
			closeSponsorBox();
			return;
		}
		
		var sponsorBox = document.getElementById('sponsor');
		
		var msg = document.createElement('span');
			msg.appendChild(document.createTextNode(sponsorInfo[lang].messageText));
		sponsorBox.appendChild(msg);
		
		var button = document.createElement('a');
			button.href = sponsorInfo[lang].url;
			button.appendChild(document.createTextNode(sponsorInfo[lang].buttonText));
		sponsorBox.appendChild(button);
		
		var sponsor_close = document.createElement('input');
			sponsor_close.setAttribute('type', 'button');
			sponsor_close.setAttribute('value', 'X');
			sponsor_close.setAttribute('onclick', 'daisySponsor.closeSponsorBox()');
			sponsor_close.setAttribute('aria-label', 'Close');
		
		sponsorBox.appendChild(sponsor_close);
		
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
		loadSponsorInfo: function(kb) {
			loadSponsorInfo(kb);
		},
		
		closeSponsorBox: function(kb) {
			closeSponsorBox();
		}
	}
})();

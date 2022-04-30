
var topic_list = [
	{
		'title': 'Accessibility Conformance',
		'id': 'conformance',
		'path': 'conformance',
		'topics': [
			{
				'id': 'conf-epub',
				'href': 'epub.html',
				'title': 'EPUB Accessibility'
			},
			{
				'id': 'conf-s508',
				'href': 's508.html',
				'title': 'Section 508 (US)'
			},
			{
				'id': 'conf-wcag',
				'href': 'wcag.html',
				'title': 'WCAG Overview'
			},
			{
				'id': 'conf-wcag-expl',
				'href': '../wcag/',
				'title': 'WCAG Explainers'
			}
		]
	},
	
	{
		'title': 'EPUB',
		'id': 'epub',
		'path': 'epub',
		'topics': [
			{
				'id': 'epub-cmt',
				'href': 'cmt.html',
				'title': 'Core Media Types'
			},
			{
				'id': 'epub-cover',
				'href': 'cover.html',
				'title': 'Cover'
			},
			{
				'id': 'epub-language',
				'href': 'language.html',
				'title': 'Publication Language'
			},
			{
				'id': 'epub-title',
				'href': 'title.html',
				'title': 'Publication Title'
			},
			{
				'id': 'epub-validation',
				'href': 'validation/overview.html',
				'title': 'Validation',
				'showtopics': false
			}
		]
	},
	
	{
		'title': 'Navigation',
		'id': 'nav',
		'path': 'navigation',
		'topics': [
			{
				'id': 'nav-contentlist',
				'href': 'content-list.html',
				'title': 'Content Lists'
			},
			{
				'id': 'nav-landmarks',
				'href': 'landmarks.html',
				'title': 'Landmarks'
			},
			{
				'id': 'nav-pagelist',
				'href': 'pagelist.html',
				'title': 'Page Navigation'
			},
			{
				'id': 'nav-toc',
				'href': 'toc.html',
				'title': 'Table of Contents'
			}
		]
	},

	{
		'title': 'Metadata',
		'id': 'metadata',
		'path': 'metadata',
		'topics': [
			{
				'id': 'meta-evaluation',
				'href': 'evaluation.html',
				'title': 'Evaluation'
			},
			{
				'id': 'meta-onix',
				'href': 'onix.html',
				'title': 'ONIX'
			},
			{
				'id': 'meta-schema.org',
				'href': 'schema.org',
				'title': 'Schema.org'
			}
		]
	},
	
	{
		'title': 'HTML',
		'id': 'html',
		'categories': [
			{
				'id': 'html-elem-attr',
				'title': 'Elements and Attributes',
				'path': 'html',
				'topics': [
					{
						'id': 'html-abbr',
						'href': 'abbr.html',
						'title': 'Abbreviations'
					},
					{
						'id': 'html-accesskeys',
						'href': 'accesskeys.html',
						'title': 'Access Keys'
					},
					{
						'id': 'html-audio',
						'href': 'audio.html',
						'title': 'Audio'
					},
					{
						'id': 'html-emphasis',
						'href': 'emphasis.html',
						'title': 'Bolding and Italics'
					},
					{
						'id': 'html-context',
						'href': 'context.html',
						'title': 'Context Breaks'
					},
					{
						'id': 'html-details',
						'href': 'details.html',
						'title': 'Details'
					},
					{
						'id': 'html-figures',
						'href': 'figures.html',
						'title': 'Figures'
					},
					{
						'id': 'html-notes',
						'href': 'notes.html',
						'title': 'Footnotes and Endnotes'
					},
					{
						'id': 'html-forms',
						'href': 'forms.html',
						'title': 'Forms'
					},
					{
						'id': 'html-hgroup',
						'href': 'hgroup.html',
						'title': 'Heading Groups'
					},
					{
						'id': 'html-headings',
						'href': 'headings.html',
						'title': 'Headings'
					},
					{
						'id': 'html-ids',
						'href': 'ids.html',
						'title': 'Identifiers'
					},
					{
						'id': 'html-iframes',
						'href': 'iframes.html',
						'title': 'Inline Frames'
					},
					{
						'id': 'html-lang',
						'href': 'lang.html',
						'title': 'Language'
					},
					{
						'id': 'html-links',
						'href': 'links.html',
						'title': 'Links'
					},
					{
						'id': 'html-lists',
						'href': 'lists.html',
						'title': 'Lists'
					},
					{
						'id': 'html-main',
						'href': 'main.html',
						'title': 'Main Content'
					},
					{
						'id': 'html-mathml',
						'href': 'mathml.html',
						'title': 'MathML'
					},
					{
						'id': 'html-meta',
						'href': 'meta.html',
						'title': 'Meta'
					},
					{
						'id': 'html-object',
						'href': 'object.html',
						'title': 'Object'
					},
					{
						'id': 'html-title',
						'href': 'title.html',
						'title': 'Page Title'
					},
					{
						'id': 'html-sections',
						'href': 'sections.html',
						'title': 'Sections'
					},
					{
						'id': 'html-svg',
						'href': 'svg.html',
						'title': 'SVG'
					},
					{
						'id': 'html-tables',
						'href': 'tables.html',
						'title': 'Tables'
					},
					{
						'id': 'html-video',
						'href': 'video.html',
						'title': 'Video'
					}
				]
			},
			{
				'id': 'html-images',
				'title': 'Images',
				'path': 'html',
				'topics': [
					{
						'id': 'html-image-anim',
						'href': 'images-animated.html',
						'title': 'Animated Images'
					},
					{
						'id': 'html-image-deco',
						'href': 'images-deco.html',
						'title': 'Decorative Images'
					},
					{
						'id': 'html-image-icon',
						'href': 'images-icons.html',
						'title': 'Icons'
					},
					{
						'id': 'html-image-desc',
						'href': 'images-desc.html',
						'title': 'Image Descriptions'
					},
					{
						'id': 'html-image-maps',
						'href': 'maps.html',
						'title': 'Image Maps'
					},
					{
						'id': 'html-image-text',
						'href': 'images-text.html',
						'title': 'Images of Text'
					}
				]
			},
			{
				'id': 'html-structures',
				'title': 'Structures',
				'path': 'html',
				'topics': [
					{
						'id': 'html-biblio',
						'href': 'bibliographies.html',
						'title': 'Bibliographies'
					},
					{
						'id': 'html-glossary',
						'href': 'glossaries.html',
						'title': 'Glossaries'
					},
					{
						'id': 'html-indexes',
						'href': 'indexes.html',
						'title': 'Indexes'
					}
				]
			},
			{
				'id': 'html-patterns',
				'title': 'Patterns',
				'path': 'html',
				'topics': [
					{
						'id': 'html-dropcaps',
						'href': 'dropcaps.html',
						'title': 'Drop Caps'
					},
					{
						'id': 'html-hidden-conent',
						'href': 'hidden.html',
						'title': 'Hidden Content'
					},
					{
						'id': 'htmk-refs',
						'href': 'reflinks.html',
						'title': 'Links to Reference Marks'
					}
				]
			},
			{
				'id': 'html-concepts',
				'title': 'Concepts',
				'path': 'html',
				'topics': [
					{
						'id': 'html-reading-order',
						'href': 'order.html',
						'title': 'Logical Reading Order'
					},
					{
						'id': 'html-sep-style',
						'href': 'separation.html',
						'title': 'Separation of Style'
					}
				]
			},
			{
				'id': 'html-aria',
				'title': 'ARIA',
				'path': 'html',
				'topics': [
					{
						'id': 'html-landmarks',
						'href': 'landmarks.html',
						'title': 'ARIA Landmarks'
					},
					{
						'id': 'html-role',
						'href': 'roles.html',
						'title': 'ARIA role Attribute'
					},
					{
						'id': 'html-dpub',
						'href': 'dpub-aria/index.html',
						'title': 'Digital Publishing Roles'
					}
				]
			},
			{
				'id': 'html-semantics',
				'title': 'Semantics',
				'path': 'html',
				'topics': [
					{
						'id': 'epub-type',
						'href': 'epub-type.html',
						'title': 'EPUB type Attribute'
					}
				]
			}
		]
	},
	
	{
		'title': 'CSS',
		'id': 'css',
		'path': 'css',
		'topics': [
			{
				'id': 'css-color',
				'href': 'color.html',
				'title': 'Color'
			},
			{
				'id': 'css-contrast',
				'href': 'contrast.html',
				'title': 'Contrast'
			},
			{
				'id': 'css-ref',
				'href': 'reference.html',
				'title': 'CSS Property Reference'
			},
			{
				'id': 'css-reflow',
				'href': 'reflow.html',
				'title': 'Reflow'
			},
			{
				'id': 'css-text-resize',
				'href': 'text-resize.html',
				'title': 'Text Resizing'
			},
			{
				'id': 'css-text-spacing',
				'href': 'text-spacing.html',
				'title': 'Text Spacing'
			}
		]
	},
	
	{
		'title': 'Scripted Content and Forms',
		'id': 'script',
		'path': 'script',
		'topics': [
			{
				'id': 'script-autocomplete',
				'href': 'autocomplete.html',
				'title': 'Autocomplete'
			},
			{
				'id': 'script-controls',
				'href': 'controls.html',
				'title': 'Custom Controls'
			},
			{
				'id': 'script-validation',
				'href': 'input-validation.html',
				'title': 'Input Validation'
			},
			{
				'id': 'script-keyboard',
				'href': 'keyboard.html',
				'title': 'Keyboard Control'
			},
			{
				'id': 'script-labels',
				'href': 'labels.html',
				'title': 'Labels'
			},
			{
				'id': 'script-pe',
				'href': 'pe.html',
				'title': 'Progressive Enhancement'
			},
			{
				'id': 'script-tab-order',
				'href': 'tab-order.html',
				'title': 'Tab Order'
			},
			{
				'id': 'script-timers',
				'href': 'timers.html',
				'title': 'Timers'
			}
		]
	},
	
	{
		'title': 'Fixed Layouts',
		'id': 'fxl',
		'categories': [
			{
				'id': 'fxl-general',
				'title': 'General',
				'path': 'fxl',
				'topics': [
					{
						'id': 'fxl-overview',
						'aria-label': 'Fixed Layouts Overview',
						'href': 'overview.html',
						'title': 'Overview'
					},
					{
						'id': 'fxl-html',
						'href': 'html.html',
						'title': 'HTML Layouts'
					},
					{
						'id': 'fxl-img-spine',
						'href': 'img-spine.html',
						'title': 'Images in Spine'
					},
					{
						'id': 'fxl-svg',
						'href': 'svg.html',
						'title': 'SVG Layouts'
					},
					{
						'id': 'fxl-wcag',
						'href': 'wcag.html',
						'title': 'WCAG Conformance'
					}
				]
			},
			{
				'id': 'fxl-tech',
				'title': 'Techniques',
				'path': 'fxl',
				'topics': [
					{
						'id': 'fxl-img',
						'aria-label': 'Fixed Layout Images',
						'href': 'img.html',
						'title': 'Images'
					},
					{
						'id': 'fxl-spreads',
						'href': 'spreads.html',
						'title': 'Multipage Spreads'
					},
					{
						'id': 'fxl-orient',
						'href': 'orientation.html',
						'title': 'Orientation'
					}
				]
			}
		]
	},
	
	{
		'title': 'Synchronized Multimedia',
		'id': 'sync',
		'categories': [
			{
				'id': 'sync-implementation',
				'title': 'Implementations',
				'path': 'sync-media',
				'topics': [
					{
						'id': 'sync-overview',
						'href': 'overlays.html',
						'title': 'EPUB 3 Media Overlays'
					}
				]
			},
			{
				'id': 'sync-techniques',
				'title': 'Techniques',
				'path': 'sync-media',
				'topics': [
					{
						'id': 'sync-highlight',
						'href': 'highlight.html',
						'title': 'Highlighting'
					},
					{
						'id': 'sync-lists',
						'aria-label': 'Synchronized Media Lists',
						'href': 'lists.html',
						'title': 'Lists'
					},
					{
						'id': 'sync-tables',
						'aria-label': 'Synchronized Media Tables',
						'href': 'tables.html',
						'title': 'Tables'
					}
				]
			}
		]
	},
	
	{
		'title': 'Text to Speech',
		'id': 'tts',
		'path': 'text-to-speech',
		'topics': [
			{
				'id': 'tts-overview',
				'href': 'overview.html',
				'title': 'Overview'
			},
			{
				'id': 'tts-speech',
				'href': 'speech.html',
				'title': 'CSS3 Speech'
			},
			{
				'id': 'tts-pls',
				'href': 'pls.html',
				'title': 'PLS Lexicons'
			},
			{
				'id': 'tts-ssml',
				'href': 'ssml.html',
				'title': 'SSML'
			}
		]
	},
	
	{
		'title': 'Glossary',
		'id': 'glossary',
		'path': 'glossary',
		'showInRootIndex': false,
		'topics': [
			{
				'id': 'glossary-a',
				'href': 'a.html',
				'title': 'A'
			},
			{
				'id': 'glossary-c',
				'href': 'c.html',
				'title': 'C'
			},
			{
				'id': 'glossary-d',
				'href': 'd.html',
				'title': 'D'
			},
			{
				'id': 'glossary-e',
				'href': 'e.html',
				'title': 'E'
			},
			{
				'id': 'glossary-f',
				'href': 'f.html',
				'title': 'F'
			},
			{
				'id': 'glossary-h',
				'href': 'h.html',
				'title': 'H'
			},
			{
				'id': 'glossary-i',
				'href': 'i.html',
				'title': 'I'
			},
			{
				'id': 'glossary-l',
				'href': 'l.html',
				'title': 'L'
			},
			{
				'id': 'glossary-m',
				'href': 'm.html',
				'title': 'M'
			},
			{
				'id': 'glossary-n',
				'href': 'n.html',
				'title': 'N'
			},
			{
				'id': 'glossary-o',
				'href': 'o.html',
				'title': 'O'
			},
			{
				'id': 'glossary-p',
				'href': 'p.html',
				'title': 'P'
			},
			{
				'id': 'glossary-r',
				'href': 'r.html',
				'title': 'R'
			},
			{
				'id': 'glossary-s',
				'href': 's.html',
				'title': 'S'
			},
			{
				'id': 'glossary-t',
				'href': 't.html',
				'title': 'T'
			},
			{
				'id': 'glossary-u',
				'href': 'u.html',
				'title': 'U'
			},
			{
				'id': 'glossary-v',
				'href': 'v.html',
				'title': 'V'
			},
			{
				'id': 'glossary-w',
				'href': 'w.html',
				'title': 'W'
			},
			{
				'id': 'glossary-x',
				'href': 'x.html',
				'title': 'X'
			},
			{
				'id': 'glossary-z',
				'href': 'z.html',
				'title': 'Z'
			},
		]
	}
];

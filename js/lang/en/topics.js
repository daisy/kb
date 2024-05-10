var topic_list = 
[
	{
		"title": "Accessibility Conformance",
		"subtitle": "The accessibility conformance topics provide information on meeting the various accessibility standards that apply to digital publications.",
		"id": "conformance",
		"path": "conformance",
		"topics": [
			{
				"id": "conf-epub",
				"href": "epub.html",
				"title": "EPUB Accessibility",
				"subtitle": "Explanation of the EPUB Accessibility specification."
			},
			{
				"id": "conf-s508",
				"href": "s508.html",
				"title": "Section 508 (US)",
				"subtitle": "Explanation of the US Section 508 requirements for publications."
			},
			{
				"id": "conf-wcag",
				"href": "wcag.html",
				"title": "WCAG Overview",
				"subtitle": "Introduction to the W3C's Web Content Accessibility Guidelines."
			},
			{
				"id": "conf-wcag-expl",
				"href": "../wcag/",
				"title": "WCAG Explainers",
				"subtitle": "Introductions to each WCAG success criterion. Link leads to a submenu of topics."
			}
		]
	},
	
	{
		"title": "EPUB",
		"subtitle": "The EPUB topics cover accessibility issues that are unique to the EPUB format.",
		"id": "epub",
		"categories": [
			{
				"id": "epub-general",
				"title": "General",
				"path": "epub",
				"topics": [
					{
						"id": "epub-cmt",
						"href": "cmt.html",
						"title": "Core Media Types",
						"subtitle": "Explanation of formats that are assured to render in EPUB publications."
					},
					{
						"id": "epub-cover",
						"href": "cover.html",
						"title": "Cover",
						"subtitle": "Accessible practices for including a cover image."
					},
					{
						"id": "epub-title",
						"href": "title.html",
						"title": "Publication Title",
						"subtitle": "Providing a title for an EPUB publication."
					},
					{
						"id": "epub-order",
						"href": "reading-order.html",
						"title": "Reading Order",
						"subtitle": "Specifying the reading order of documents the spine."
					},
					{
						"id": "epub-remote",
						"href": "remote-resources.html",
						"title": "Remote Resources",
						"subtitle": "Overview of the problems hosting resources outside the EPUB container."
					},
					{
						"id": "epub-language",
						"href": "language.html",
						"title": "Setting the Language",
						"subtitle": "Language identification in the package document and in content documents."
					},
					{
						"id": "epub-dir",
						"href": "dir.html",
						"title": "Text Direction",
						"subtitle": "Specifying whether metadata text direction is left-to-right or right-to-left."
					}
				]
			},
			{
				"id": "epub-validation",
				"title": "Validation",
				"path": "epub",
				"topics": [
					{
						"id": "epub-val-overview",
						"href": "validation/overview.html",
						"title": "Validation Process",
						"subtitle": "Overview of the validation process and tools and for EPUB publications."
					},
					{
						"id": "epub-val-epubcheck",
						"href": "validation/epubcheck.html",
						"title": "Epubcheck",
						"subtitle": "How to use epubcheck to check publications for conformance issues."
					},
					{
						"id": "epub-val-ace",
						"href": "validation/ace.html",
						"title": "Ace by DAISY",
						"subtitle": "How to use the Ace checker to find accessibility issues."
					},
					{
						"id": "epub-val-smart",
						"href": "validation/smart.html",
						"title": "Ace SMART",
						"subtitle": "How to use the Ace SMART tool to evaluate a publication against the EPUB Accessibility specification."
					}
				]
			}
		]
	},
	
	{
		"title": "Navigation",
		"subtitle": "The navigation topics describe how to author accessible navigation aids.",
		"id": "nav",
		"path": "navigation",
		"categories": [
			{
				"id": "nav-aids",
				"title": "Publication Navigation",
				"path": "nav",
				"topics": [
					{
						"id": "nav-contentlist",
						"href": "content-list.html",
						"title": "Content Lists",
						"subtitle": "Describes how to add lists of tables, figures, etc."
					},
					{
						"id": "nav-landmarks",
						"href": "landmarks.html",
						"title": "Landmarks",
						"subtitle": "Describes the EPUB concept of publication landmarks."
					},
					{
						"id": "nav-toc",
						"href": "toc.html",
						"title": "Table of Contents",
						"subtitle": "Describes best practices for including tables of contents."
					}
				]
			},
			{
				"id": "nav-page",
				"title": "Page Navigation",
				"path": "nav",
				"topics": [
					{
						"id": "nav-pagenav",
						"href": "pagenav.html",
						"title": "Overview",
						"subtitle": "Introduction to the components of page navigation."
					},
					{
						"id": "nav-pagebreaks",
						"href": "pagebreaks.html",
						"title": "Page Break Markers",
						"subtitle": "Describes the how to add page break markers."
					},
					{
						"id": "nav-pagelist",
						"href": "pagelist.html",
						"title": "Page List",
						"subtitle": "Describes the purpose and construction of a page list."
					},
					{
						"id": "nav-pagesrc",
						"href": "pagesrc.html",
						"title": "Page Source",
						"subtitle": "How to identify the source of pagination."
					}
				]
			}
		]
	},

	{
		"title": "Metadata",
		"subtitle": "The metadata topics describe the accessibility properties available in widely used digital publishing metadata standards.",
		"id": "metadata",
		"categories": [
			{
				"id": "meta-general",
				"title": "General",
				"path": "metadata",
				"topics": [
					{
						"id": "meta-evaluation",
						"href": "evaluation.html",
						"title": "Evaluation",
						"subtitle": "Covers the conformance and evaluation metadata required by the EPUB Accessibility specification."
					},
					{
						"id": "meta-onix",
						"href": "onix.html",
						"title": "ONIX",
						"subtitle": "Covers the ONIX metadata standard's code list 196 accessibility properties."
					}
				]
			},
			{
				"id": "meta-schema",
				"title": "Schema.org",
				"path": "metadata",
				"topics": [
					{
						"id": "schema-overview",
						"href": "schema.org/index.html",
						"title": "Overview",
						"subtitle": "Introduction to the accessibility metadata properties defined in the schema.org CreativeWork type."
					},
					{
						"id": "schema-a11yAPI",
						"href": "schema.org/accessibilityAPI.html",
						"title": "Accessibility APIs",
						"subtitle": "Identifying compatibility with platform APIs using the <code>accessibilityAPI</code> property."
					},
					{
						"id": "schema-a11yControl",
						"href": "schema.org/accessibilityControl.html",
						"title": "Accessibility Controls",
						"subtitle": "Identifying how users can control the content using the <code>accessibilityControl</code> property."
					},
					{
						"id": "schema-a11yFeature",
						"href": "schema.org/accessibilityFeature.html",
						"title": "Accessibility Features",
						"subtitle": "Expressing features of the content using the <code>accessibilityFeature</code> property."
					},
					{
						"id": "schema-a11yHazard",
						"href": "schema.org/accessibilityHazard.html",
						"title": "Accessibility Hazards",
						"subtitle": "Expressing dangers for users using the <code>accessibilityHazard</code> property."
					},
					{
						"id": "schema-a11ySummary",
						"href": "schema.org/accessibilitySummary.html",
						"title": "Accessibility Summary",
						"subtitle": "Providing a summary using the <code>accessibilitySummary</code> property."
					},
					{
						"id": "schema-accessMode",
						"href": "schema.org/accessMode.html",
						"title": "Access Modes",
						"subtitle": "Identifying the nature of the content using the <code>accessMode</code> property."
					},
					{
						"id": "schema-accessModeSufficient",
						"href": "schema.org/accessModeSufficient.html",
						"title": "Sufficient Access Modes",
						"subtitle": "Identifying sufficient means of reading that provide access to the information using <code>accessModeSufficient</code> property."
					}
				]
			}
		]
	},
	
	{
		"title": "HTML",
		"subtitle": "The HTML topics cover issues related to producing accessible HTML content. Guidelines include how to use elements and attributes accessibly, how to create common publishing structures such as indexes and glossaries accessibly, and how to apply ARIA roles, states, and properties.",
		"id": "html",
		"categories": [
			{
				"id": "html-elem-attr",
				"title": "Elements and Attributes",
				"path": "html",
				"topics": [
					{
						"id": "html-abbr",
						"href": "abbr.html",
						"title": "Abbreviations",
						"subtitle": "The <code>abbr</code> element"
					},
					{
						"id": "html-accesskeys",
						"href": "accesskeys.html",
						"title": "Access Keys",
						"subtitle": "The <code>accesskey</code> attribute"
					},
					{
						"id": "html-articles",
						"href": "articles.html",
						"title": "Articles",
						"subtitle": "The <code>article</code> element"
					},
					{
						"id": "html-asides",
						"href": "asides.html",
						"title": "Asides",
						"subtitle": "The <code>aside</code> element"
					},
					{
						"id": "html-audio",
						"href": "audio.html",
						"title": "Audio",
						"subtitle": "The <code>audio</code> element"
					},
					{
						"id": "html-emphasis",
						"href": "emphasis.html",
						"title": "Bolding and Italics",
						"subtitle": "The <code>b</code>, <code>em</code>, <code>i</code>, and <code>strong</code> elements"
					},
					{
						"id": "html-context",
						"href": "context.html",
						"title": "Context Breaks",
						"subtitle": "The <code>hr</code> element"
					},
					{
						"id": "html-details",
						"href": "details.html",
						"title": "Details",
						"subtitle": "The <code>details</code> element"
					},
					{
						"id": "html-figures",
						"href": "figures.html",
						"title": "Figures",
						"subtitle": "The <code>figure</code> element"
					},
					{
						"id": "html-forms",
						"href": "forms.html",
						"title": "Forms",
						"subtitle": "The <code>form</code> element"
					},
					{
						"id": "html-headings",
						"href": "headings.html",
						"title": "Headings",
						"subtitle": "The <code>h1</code> to <code>h6</code>, <code>hgroup</code>, and <code>heading</code> elements"
					},
					{
						"id": "html-ids",
						"href": "ids.html",
						"title": "Identifiers",
						"subtitle": "The <code>id</code> attribute"
					},
					{
						"id": "html-iframes",
						"href": "iframes.html",
						"title": "Inline Frames",
						"subtitle": "The <code>iframe</code> element"
					},
					{
						"id": "html-lang",
						"href": "lang.html",
						"title": "Language",
						"subtitle": "The <code>lang</code> and <code>xml:lang</code> attributes"
					},
					{
						"id": "html-links",
						"href": "links.html",
						"title": "Links",
						"subtitle": "The <code>a</code> element"
					},
					{
						"id": "html-lists",
						"href": "lists.html",
						"title": "Lists",
						"subtitle": "The <code>dl</code>, <code>ol</code>, and <code>ul<code> elements"
					},
					{
						"id": "html-main",
						"href": "main.html",
						"title": "Main Content",
						"subtitle": "The <code>main</code> element"
					},
					{
						"id": "html-mathml",
						"href": "mathml.html",
						"title": "MathML",
						"subtitle": "The <code>math</code> element"
					},
					{
						"id": "html-meta",
						"href": "meta.html",
						"title": "Meta",
						"subtitle": "The <code>meta</code> element"
					},
					{
						"id": "html-object",
						"href": "object.html",
						"title": "Object",
						"subtitle": "The <code>object</code> element"
					},
					{
						"id": "html-title",
						"href": "title.html",
						"title": "Page Title",
						"subtitle": "The <code>title</code> element"
					},
					{
						"id": "html-quote",
						"href": "quotes.html",
						"title": "Quotes",
						"subtitle": "The <code>blockquote</code> and <code>q</code> elements"
					},
					{
						"id": "html-sections",
						"href": "sections.html",
						"title": "Sections",
						"subtitle": "The <code>section</code> element"
					},
					{
						"id": "html-dir",
						"href": "dir.html",
						"title": "Text Direction",
						"subtitle": "The <code>dir</code> attribute"
					},
					{
						"id": "html-svg",
						"href": "svg.html",
						"title": "SVG",
						"subtitle": "The <code>svg</code> element"
					},
					{
						"id": "html-video",
						"href": "video.html",
						"title": "Video",
						"subtitle": "The <code>video</code> element"
					}
				]
			},
			{
				"id": "html-images",
				"title": "Images",
				"path": "html",
				"topics": [
					{
						"id": "html-image-anim",
						"href": "images-animated.html",
						"title": "Animated Images",
						"subtitle": "Best practices for accessible animated images."
					},
					{
						"id": "html-image-deco",
						"href": "images-deco.html",
						"title": "Decorative Images",
						"subtitle": "How to identify images that do not convey information to users."
					},
					{
						"id": "html-image-icon",
						"href": "images-icons.html",
						"title": "Icons",
						"subtitle": "Best practices for including accessible icons."
					},
					{
						"id": "html-image-desc",
						"href": "images-desc.html",
						"title": "Image Descriptions",
						"subtitle": "Methods and writing techniques for alternative text and descriptions."
					},
					{
						"id": "html-image-maps",
						"href": "maps.html",
						"title": "Image Maps",
						"subtitle": "Best practices for including accessible image maps."
					},
					{
						"id": "html-image-select",
						"href": "images-selection.html",
						"title": "Image Selection",
						"subtitle": "Methods for including images optimized for different device rendering capabilities."
					},
					{
						"id": "html-image-text",
						"href": "images-text.html",
						"title": "Images of Text",
						"subtitle": "Best practices when images contain text."
					},
					{
						"id": "html-textbased",
						"href": "images-text-based.html",
						"title": "Text-based Images",
						"subtitle": "Techniques for making accessible text-based images, such as ASCII art, emoticons, redacted text, and fill-in-the-blank questions."
					}
				]
			},
			{
				"id": "html-tables",
				"title": "Tables",
				"path": "html",
				"topics": [
					{
						"id": "html-table-basics",
						"href": "tables-basics.html",
						"title": "Table Basics",
						"subtitle": "Introduction to the basics of accessible table markup."
					},
					{
						"id": "html-table-headers",
						"href": "tables-headers.html",
						"title": "Complex Headers",
						"subtitle": "Best practices for making complex table headers accessible."
					},
					{
						"id": "html-table-scope",
						"href": "tables-scope.html",
						"title": "Header Scope",
						"subtitle": "Identifying when table headers apply to row or columns."
					},
					{
						"id": "html-table-layout",
						"href": "tables-layout.html",
						"title": "Layout Tables",
						"subtitle": "Best practices for when table layouts cannot be avoided."
					},
					{
						"id": "html-table-captions",
						"href": "tables-captions.html",
						"title": "Table Captions",
						"subtitle": "Adding a caption to explain the purpose of a table."
					},
					{
						"id": "html-table-summary",
						"href": "tables-summary.html",
						"title": "Table Summaries",
						"subtitle": "Adding a summary to describe the structure of a table."
					}
				]
			},
			{
				"id": "html-structures",
				"title": "Structures",
				"path": "html",
				"topics": [
					{
						"id": "html-biblio",
						"href": "bibliographies.html",
						"title": "Bibliographies",
						"subtitle": "Markup recommendations for producing accessible bibliographies."
					},
					{
						"id": "html-glossary",
						"href": "glossaries.html",
						"title": "Glossaries",
						"subtitle": "Markup recommendations for producing accessible glossaries."
					},
					{
						"id": "html-indexes",
						"href": "indexes.html",
						"title": "Indexes",
						"subtitle": "Markup recommendations for producing accessible indexes."
					}
				]
			},
			{
				"id": "html-patterns",
				"title": "Patterns",
				"path": "html",
				"topics": [
					{
						"id": "html-dropcaps",
						"href": "dropcaps.html",
						"title": "Drop Caps",
						"subtitle": "Methods for creating accessible drop caps."
					},
					{
						"id": "html-notes",
						"href": "notes.html",
						"title": "Footnotes and Endnotes",
						"subtitle": "Accessibly identifying, structuring, and linking notes and their references."
					},
					{
						"id": "html-hidden-conent",
						"href": "hidden.html",
						"title": "Hidden Content",
						"subtitle": "Techniques for hiding content both from visual rendering and from assistive technologies."
					},
					{
						"id": "html-poetry",
						"href": "poetry.html",
						"title": "Poetry",
						"subtitle": "Techniques for formatting and describing line-based content."
					},
					{
						"id": "htmk-refs",
						"href": "reflinks.html",
						"title": "Links to Reference Marks",
						"subtitle": "Practices for linking back to the references to tables, figures, notes, etc."
					}
				]
			},
			{
				"id": "html-concepts",
				"title": "Concepts",
				"path": "html",
				"topics": [
					{
						"id": "html-reading-order",
						"href": "order.html",
						"title": "Logical Reading Order",
						"subtitle": "Practices for ensuring that the primary narrative is clearly separated from secondary content."
					},
					{
						"id": "html-sep-style",
						"href": "separation.html",
						"title": "Separation of Style",
						"subtitle": "Practices for ensuring that style is not the only way that necessary information is conveyed."
					}
				]
			},
			{
				"id": "html-aria",
				"title": "ARIA",
				"path": "html",
				"topics": [
					{
						"id": "html-landmarks",
						"href": "landmarks.html",
						"title": "ARIA Landmarks",
						"subtitle": "Introduces the ARIA landmark roles for identifying key sections of publications."
					},
					{
						"id": "html-role",
						"href": "roles.html",
						"title": "ARIA role Attribute",
						"subtitle": "Describes how the ARIA <code>role</code> attribute influences how assistive technologies understand elements that carry the attribute."
					},
					{
						"id": "html-dpub",
						"href-override": "html/dpub-aria/index.html",
						"title": "Digital Publishing Roles",
						"subtitle": "Introduction to the DPUB-ARIA module for use with the ARIA <code>role</code> attribute. The page also links through to detailed descriptions for each role in the module."
					}
				]
			},
			{
				"id": "html-semantics",
				"title": "Semantics",
				"path": "html",
				"topics": [
					{
						"id": "epub-type",
						"href": "epub-type.html",
						"title": "EPUB <code>type</code> Attribute",
						"subtitle": "Overview of how the attribute can improve reading system experiences even though it does not affect assistive technologies."
					}
				]
			}
		]
	},
	
	{
		"title": "CSS",
		"subtitle": "The CSS topics cover the accessible styling of content using the cascading style sheets technology.",
		"id": "css",
		"path": "css",
		"topics": [
			{
				"id": "css-color",
				"href": "color.html",
				"title": "Color",
				"subtitle": "Techniques to ensure color is not the only means by which information is conveyed."
			},
			{
				"id": "css-contrast",
				"href": "contrast.html",
				"title": "Contrast",
				"subtitle": "Techniques to ensure sufficient contrast when setting foreground and background colors."
			},
			{
				"id": "css-ref",
				"href": "reference.html",
				"title": "CSS Property Reference",
				"subtitle": "Reference to core CSS properties that have known accessibility issues."
			},
			{
				"id": "css-reflow",
				"href": "reflow.html",
				"title": "Reflow",
				"subtitle": "Discussion of the issues styling presents in meeting WCAG's reflow requirement."
			},
			{
				"id": "css-text-resize",
				"href": "text-resize.html",
				"title": "Text Resizing",
				"subtitle": "Techniques for avoiding accessibility issues when text is resized."
			},
			{
				"id": "css-text-spacing",
				"href": "text-spacing.html",
				"title": "Text Spacing",
				"subtitle": "Techniques for avoiding accessibility issues when text spacing is changed."
			}
		]
	},
	
	{
		"title": "Scripted Content and Forms",
		"subtitle": "The scripting and forms topics cover issues related to adding interactive content to digital publications.",
		"id": "script",
		"path": "script",
		"topics": [
			{
				"id": "script-autocomplete",
				"href": "autocomplete.html",
				"title": "Autocomplete",
				"subtitle": "Using the <code>autocomplete</code> attribute to help users fill in common form fields."
			},
			{
				"id": "script-controls",
				"href": "controls.html",
				"title": "Custom Controls",
				"subtitle": "Using ARIA roles, states, and properties to make custom controls accessible."
			},
			{
				"id": "script-validation",
				"href": "input-validation.html",
				"title": "Input Validation",
				"subtitle": "Techniques for ensuring that users can understand and correct input errors in forms."
			},
			{
				"id": "script-keyboard",
				"href": "keyboard.html",
				"title": "Keyboard Control",
				"subtitle": "Techniques for ensuring that keyboard users can control scripted content."
			},
			{
				"id": "script-labels",
				"href": "labels.html",
				"title": "Labels",
				"subtitle": "Techniques for ensuring that inputs and controls are accessibly labelled."
			},
			{
				"id": "script-pe",
				"href": "pe.html",
				"title": "Progressive Enhancement",
				"subtitle": "Review of progressively enhancing content so that it remains accessible when scripting is not available."
			},
			{
				"id": "script-tab-order",
				"href": "tab-order.html",
				"title": "Tab Order",
				"subtitle": "Techniques for ensuring the keyboard tab order is accessible."
			},
			{
				"id": "script-timers",
				"href": "timers.html",
				"title": "Timers",
				"subtitle": "Techniques for ensuring timed content is accessible."
			}
		]
	},
	
	{
		"title": "Fixed Layouts",
		"subtitle": "The fixed layouts topics cover issues with creating content that is laid out on pages with fixed dimensions (i.e., the content does not reflow to fit the screen but stays where it is positioned).",
		"id": "fxl",
		"categories": [
			{
				"id": "fxl-general",
				"title": "General",
				"path": "fxl",
				"topics": [
					{
						"id": "fxl-overview",
						"aria-label": "Fixed Layouts Overview",
						"href": "overview.html",
						"title": "Overview",
						"subtitle": "General introduction to creating fixed layouts in EPUB."
					},
					{
						"id": "fxl-html",
						"href": "html.html",
						"title": "HTML Layouts",
						"subtitle": "Overview of creating accessible fixed layouts in HTML."
					},
					{
						"id": "fxl-img-spine",
						"href": "img-spine.html",
						"title": "Images in Spine",
						"subtitle": "Overview of accessibility issues putting images directly in the EPUB spine."
					},
					{
						"id": "fxl-svg",
						"href": "svg.html",
						"title": "SVG Layouts",
						"subtitle": "Overview of creating accessible fixed layouts in SVG."
					},
					{
						"id": "fxl-wcag",
						"href": "wcag.html",
						"title": "WCAG Conformance",
						"subtitle": "Overview of the difficulties making fixed layouts conform to WCAG accessibility requirements."
					}
				]
			},
			{
				"id": "fxl-tech",
				"title": "Techniques",
				"path": "fxl",
				"topics": [
					{
						"id": "fxl-img",
						"aria-label": "Fixed Layout Images",
						"href": "img.html",
						"title": "Images",
						"subtitle": "Explores the issues making image-based fixed layouts accessible."
					},
					{
						"id": "fxl-spreads",
						"href": "spreads.html",
						"title": "Multipage Spreads",
						"subtitle": "Explores the issues with content that is split across fixed-layout pages."
					},
					{
						"id": "fxl-orient",
						"href": "orientation.html",
						"title": "Orientation",
						"subtitle": "Explores the issues with constraining the orientation in which fixed layouts render."
					}
				]
			}
		]
	},
	
	{
		"title": "Synchronized Multimedia",
		"subtitle": "The synchronized multimedia topics cover the creation of digital publications that provide synchronized text and audio playback. These types of publications are often referred to as \"read aloud\" books.",
		"id": "sync-media",
		"categories": [
			{
				"id": "sync-implementation",
				"title": "Implementations",
				"path": "sync-media",
				"topics": [
					{
						"id": "sync-overview",
						"href": "overlays.html",
						"title": "EPUB 3 Media Overlays",
						"subtitle": "Overview of EPUB 3's media overlays feature for synchronizing text with prerecorded audio playback."
					}
				]
			},
			{
				"id": "sync-techniques",
				"title": "Techniques",
				"path": "sync-media",
				"topics": [
					{
						"id": "sync-highlight",
						"href": "highlight.html",
						"title": "Highlighting",
						"subtitle": "Considerations for accessible text highlighting."
					},
					{
						"id": "sync-lists",
						"aria-label": "Synchronized Media Lists",
						"href": "lists.html",
						"title": "Lists",
						"subtitle": "Structuring lists for synchronized playback."
					},
					{
						"id": "sync-tables",
						"aria-label": "Synchronized Media Tables",
						"href": "tables.html",
						"title": "Tables",
						"subtitle": "Structuring tables for synchronized playback."
					}
				]
			}
		]
	},
	
	{
		"title": "Text to Speech",
		"subtitle": "The text-to-speech (TTS) topics cover technologies that aid in producing high-quality TTS playback.",
		"id": "tts",
		"path": "text-to-speech",
		"topics": [
			{
				"id": "tts-overview",
				"href": "overview.html",
				"title": "Overview",
				"subtitle": "Overview of the issues with text-to-speech playback and the technologies available to help."
			},
			{
				"id": "tts-speech",
				"href": "speech.html",
				"title": "CSS3 Speech",
				"subtitle": "Review of the Speech module properties for controlling TTS playback through style sheets."
			},
			{
				"id": "tts-pls",
				"href": "pls.html",
				"title": "PLS Lexicons",
				"subtitle": "Review of using pronunciation lexicons to create dictionaries of terms."
			},
			{
				"id": "tts-ssml",
				"href": "ssml.html",
				"title": "SSML",
				"subtitle": "Review of EPUB's attribute implementation of the Synthetic Speech Markup Language."
			}
		]
	},
	
	{
		"title": "Glossary",
		"id": "glossary",
		"path": "glossary",
		"showInRootIndex": false,
		"topics": [
			{
				"id": "glossary-a",
				"href": "a.html",
				"title": "A"
			},
			{
				"id": "glossary-c",
				"href": "c.html",
				"title": "C"
			},
			{
				"id": "glossary-d",
				"href": "d.html",
				"title": "D"
			},
			{
				"id": "glossary-e",
				"href": "e.html",
				"title": "E"
			},
			{
				"id": "glossary-f",
				"href": "f.html",
				"title": "F"
			},
			{
				"id": "glossary-h",
				"href": "h.html",
				"title": "H"
			},
			{
				"id": "glossary-i",
				"href": "i.html",
				"title": "I"
			},
			{
				"id": "glossary-l",
				"href": "l.html",
				"title": "L"
			},
			{
				"id": "glossary-m",
				"href": "m.html",
				"title": "M"
			},
			{
				"id": "glossary-n",
				"href": "n.html",
				"title": "N"
			},
			{
				"id": "glossary-o",
				"href": "o.html",
				"title": "O"
			},
			{
				"id": "glossary-p",
				"href": "p.html",
				"title": "P"
			},
			{
				"id": "glossary-r",
				"href": "r.html",
				"title": "R"
			},
			{
				"id": "glossary-s",
				"href": "s.html",
				"title": "S"
			},
			{
				"id": "glossary-t",
				"href": "t.html",
				"title": "T"
			},
			{
				"id": "glossary-u",
				"href": "u.html",
				"title": "U"
			},
			{
				"id": "glossary-v",
				"href": "v.html",
				"title": "V"
			},
			{
				"id": "glossary-w",
				"href": "w.html",
				"title": "W"
			},
			{
				"id": "glossary-x",
				"href": "x.html",
				"title": "X"
			},
			{
				"id": "glossary-z",
				"href": "z.html",
				"title": "Z"
			}
		]
	}
]

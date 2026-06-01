module Jekyll
  module TopicFilter
    def format_breadcrumb_link(label, path)
    	"<a href=\"#{path}index.html\" class=\"breadcrumb\">#{label}</a>"
    end
    
    def format_topic_li(topic, path)
      
      if topic[1]['subpath']
      	url = path + topic[1]['subpath'] + topic[0] + '.html'
      
      elsif topic[1]['subpath-root']
      	url = path + topic[1]['subpath-root'] + 'index.html'
      
      else
      	url = path + topic[0] + '.html'
      end
      
      <<LI
		<li>
			<a href="#{url}">#{topic[1]['title']}</a>
			<br>
			<span class="topic_subtitle">#{topic[1]['subtitle']}</span>
		</li>
LI
    end
    
    def appliesTo_section(input, site, page)
      lang = page['language'];
      sec = <<SEC
<section id="applies-to">
	<h3>Applies To</h3>
	<table>
		<tbody>
			<tr>
				<th><a href="https://www.w3.org/TR/epub/">EPUB 3</a></th>
				<th><a href="http://idpf.org/epub/201/">EPUB 2</a></th>
				<th><a href="https://www.w3.org/TR/audiobooks/">Audiobooks</a></th>
			</tr>
			<tr>
SEC
	  
	  if input.include?('EPUB3')
        sec += "<td class=\"yes\">" + site['data'][lang]['ui']['appliesTo']['yes'] + "</td>"
	  else
        sec += "<td class=\"no\">" + site['data'][lang]['ui']['appliesTo']['no'] + "</td>"
	  end
	  
	  if input.include?('EPUB2')
        sec += "<td class=\"yes\">" + site['data'][lang]['ui']['appliesTo']['yes'] + "</td>"
	  else
        sec += "<td class=\"no\">" + site['data'][lang]['ui']['appliesTo']['no'] + "</td>"
	  end

	  if input.include?('Audiobooks') or input.include?('Audiobooks*')
	    if input.include?('Audiobooks')
          sec += "<td class=\"yes\">" + site['data'][lang]['ui']['appliesTo']['yes'] + "</td>"
        else
          sec += "<td class=\"partial\">" + site['data'][lang]['ui']['appliesTo']['partial'] + " <a href=\"#aud01\" role=\"doc-noteref\">*</a></td>"
        end
	  else
        sec += "<td class=\"no\">" + site['data'][lang]['ui']['appliesTo']['no'] + "</td>"
	  end
	  
	  sec += <<END
			</tr>
		</tbody>
	</table>
END

      if input.include?('Audiobooks*')
        sec += "<p id=\"aud01\" class=\"small\" role=\"doc-footnote\">" + site['data'][lang]['ui']['appliesTo']['partialNote'] + "</p>"
      end
      
      sec += "</section>"
      
      sec
    end
  end
end

Liquid::Template.register_filter(Jekyll::TopicFilter)
module Jekyll
  module WCAGFilter
    def wcag_link(input, site, page)
      lang = page['language'];
      path = lang == 'en' ? 'docs' : lang
      "<span class=\"wcag-level\">[<a href=\"/publishing/" + path + "/wcag/" + site['data'][lang]['sc'][input]['id'] + ".html\">WCAG " + input + " - " + site['data'][lang]['sc'][input]['level'] + "</a>]</span>"
    end
  end
end

Liquid::Template.register_filter(Jekyll::WCAGFilter)

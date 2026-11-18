
$('body').on('click', 'div.details', function() {
	var expanded = $(this).find('button').attr('aria-expanded');
	$(this).find('button').attr('aria-expanded', expanded === 'false' ? 'true' : 'false');
	$(this).find('span.status').html(expanded === 'true' ? '▶' : '▼');
	$(this).find('div.details-body').toggle();
});

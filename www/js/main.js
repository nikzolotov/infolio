$(function(){
	/* Процентные отступы у лого */
	var header = $('.l-header'),
		logo = $('.b-logo', header);
	
	setHeaderPadding();
	$(window).resize(setHeaderPadding);
	
	function setHeaderPadding(){
		header.css({
			'padding-top': Math.round(logo.height() * 0.33),
			'padding-bottom': Math.round(logo.height() * 0.37)
		});
	}
});
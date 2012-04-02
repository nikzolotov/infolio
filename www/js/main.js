$(function(){
	/* Содержание */
	contents.init();
	
	/* Процентные отступы у лого */
	var header = $('.l-header'),
		logo = $('.b-logo .image', header);
	
	logo.load(setHeaderPadding);
	$(window).resize(setHeaderPadding);
	
	function setHeaderPadding(){
		header.css({
			'padding-top': Math.round(logo.height() * 0.33),
			'padding-bottom': Math.round(logo.height() * 0.37)
		});
		
		contents.update();
	}
});
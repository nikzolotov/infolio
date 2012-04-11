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
	
	/* Табы услуг */
	$('#services').tabs({
		linkSelector: '.b-tabs .link',
		tabSelector: '.js-tab'
	});
	
	
	/* Галереи в портфолио */
	$('.b-project').gallery({
		linkSelector: '.b-previews .link',
		imageClass: 'illustration',
		loaderHTML: '<span class="b-loading"><img class="image" src="./img/loading.gif" alt="Loading"/></span>'
	});
	
	/* Подсказки в полях ввода */
	$('.b-hint-label').hints();
});
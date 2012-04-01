/**
 * Имитация background-size: cover
 */
var coverBackground = (function(){
	var SETTINGS = {
		illustrationContainerSelector: '.l-back-layer',
		illustrationClass: 'b-illustration'
	};
	
	var _illustration, _illustrationContainer,
		_backgroundImagePath;
	
	function initBackground(){
		
		var body = $('body'),
			backgroundImageProperty = body.css('background-image');
		
		_backgroundImagePath = backgroundImageProperty.match(/http:\/\/[\/\w \.-]+/);
		
		if( _backgroundImagePath !== null ){
			_backgroundImagePath = _backgroundImagePath[0];
			
			body.css('background-image', 'none');
			
			_illustration = $('<img/>');
			_illustration.load(resizeIllustration).attr('src', _backgroundImagePath);
		}
	}
	
	function assignResizeEvent(){
		if( _backgroundImagePath !== null && !($.browser.msie && $.browser.version == '6.0') ){
			$(window).resize(resizeIllustration);
		}
	}
	
	function resizeIllustration(){
		_illustration.hide().appendTo(_illustrationContainer);
		
		var illustrationWidth = _illustration.width(),
			illustrationHeight = _illustration.height(),
			illustrationRatio = illustrationWidth / illustrationHeight,
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			windowRatio = windowWidth / windowHeight;
		
		if( windowRatio >= illustrationRatio ){
			_illustration.css({
				'width': '100%',
				'height': 'auto'
			});
			
			_illustration.css('top', (windowHeight - _illustration.height()) / 2);
		}
		else {
			_illustration.css({
				'width': 'auto',
				'height': windowHeight
			});

			_illustration.css('left', (windowWidth - _illustration.width()) / 2);
		}
		
		_illustration.addClass(SETTINGS.illustrationClass).show();
	}
	
	return {
		init: function( userSettings ){
			if($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || $.browser.version == '8.0') ){
				$.extend(SETTINGS, userSettings);
			
				_illustrationContainer = $(SETTINGS.illustrationContainerSelector);
				
				initBackground();
				assignResizeEvent();
			}
		}
	};
})();
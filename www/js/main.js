$(function(){
	/* Процентные отступы у лого */
	var header = $('.l-header'),
		logo = $('.b-logo', header);
	
	logo.load(setHeaderPadding);
	$(window).resize(setHeaderPadding);
	
	function setHeaderPadding(){
		header.css({
			'padding-top': Math.round(logo.height() * 0.33),
			'padding-bottom': Math.round(logo.height() * 0.37)
		});
	}
	
	/* Содержание */
	var theWindow = $(window),
		theBody = $(document.body),
		contents = $('#contents'),
		contentsParent = contents.parent(),
		contentsParentOffset,
		windowScrolledTop = 0;
	
	toggleContents();
	
	theWindow.resize(function(){
		toggleContents();
		toggleFixContents();
	})
	.scroll(toggleFixContents);
	
	function toggleContents(){
		if( theBody.width() < 1180 ){
			if( contents.css('display') == 'block' ){
				contents.hide();
			}
		}
		else{
			if( contents.css('display') == 'none' ){
				contents.show();
			}
		}
	}
	
	function toggleFixContents(){
		if( !($.browser.msie && $.browser.version == '6.0') ){
			windowScrolledTop = theWindow.scrollTop();
			contentsParentOffset = contentsParent.offset();
			
			if( contents.hasClass('b-contents-fixed') ){
				if( windowScrolledTop < contentsParentOffset.top - 30 ){
					contents.removeClass('b-contents-fixed');
				}
			}
			else{
				if( windowScrolledTop >= contentsParentOffset.top - 30 ){
					contents.addClass('b-contents-fixed');
				}
			}
		}
	}
});
/**
 * Оглавление страницы
 */
var contents = (function(){
	var SETTINGS = {
		containerSelector: '#contents',
		linksSelector: '.link',
		selectedClass: 'selected',
		sliderSelector: '.slider',
		sectionsSelector: '.b-section',
		fixedClass: 'b-contents-fixed',
		fixedTopPosition: 30,
		scrollTime: 400
	};
	
	var _window, _body, _container, _parent, _parentOffset, _windowScrollTop,
		_links, _slider, _sections;
	
	function assignEvents(){
		_window.resize(function(){
			toggleContainer();
			toggleFixingContainer();
		})
		.scroll(function(){
			toggleFixingContainer();
			hightlightSection();
		});
		
		_links.click(function(event){
			var thisLink = $(this),
				thisLinkTarget = thisLink.attr('href').substr(1);
			
			scrollToSection( thisLinkTarget );
			moveSlider( thisLink.position().top );
			
			event.preventDefault();
		});
	}
	
	function toggleContainer(){
		if( _body.width() < 1180 ){
			if( _container.css('display') == 'block' ){
				_container.hide();
			}
		}
		else{
			if( _container.css('display') == 'none' ){
				_container.show();
			}
		}
	}
	
	function toggleFixingContainer(){
		if( !($.browser.msie && $.browser.version == '6.0') ){
			_windowScrollTop = _window.scrollTop();
			_parentOffset = _parent.offset();
			
			if( _container.hasClass(SETTINGS.fixedClass) ){
				if( _windowScrollTop < _parentOffset.top - SETTINGS.fixedTopPosition ){
					_container.removeClass(SETTINGS.fixedClass);
				}
			}
			else{
				if( _windowScrollTop >= _parentOffset.top - SETTINGS.fixedTopPosition ){
					_container.addClass(SETTINGS.fixedClass);
				}
			}
		}
	}
	
	function hightlightSection(){
		console.log(_slider.offset().top)
	}
	
	function scrollToSection( sectionName ){
		var targetSection = _sections.filter(function(){ return $(this).attr('id') == sectionName; }),
			targetSectionHeight = targetSection.height() + parseInt(targetSection.css("padding-top"), 10) + parseInt(targetSection.css("padding-bottom"), 10),
			scrollTopToTarget = targetSection.offset().top - SETTINGS.fixedTopPosition;
		
		$('html, body').animate({
			scrollTop: scrollTopToTarget
		}, SETTINGS.scrollTime);
	}
	
	function moveSlider( to ){
		_slider.animate({
			top: to
		}, SETTINGS.scrollTime);
		
		$('.list', _slider).animate({
			top: -to
		}, SETTINGS.scrollTime);
	}
	
	return {
		init: function( userSettings ){
			_window = $(window);
			_body = $(document.body);
			_container = $(SETTINGS.containerSelector);
			_parent = _container.parent();
			_windowScrollTop = 0;
			
			_links = $(SETTINGS.linksSelector, _container);
			_slider = $(SETTINGS.sliderSelector);
			_sections = $(SETTINGS.sectionsSelector);
			
			toggleContainer();
			toggleFixingContainer();
			assignEvents();
		}
	};
})();	
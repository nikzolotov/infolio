/**
 * Оглавление страницы
 */
var contents = (function(){
	var SETTINGS = {
		contentsSelector: '#contents',
		linksSelector: '.link',
		selectedClass: 'selected',
		sliderSelector: '.slider',
		sectionsSelector: '.b-section',
		fixedClass: 'b-contents-fixed',
		fixedTopPosition: 30,
		sectionMargin: 40,
		scrollTime: 400
	};
	
	var _window, _document, _body,
		_contents, _parent, _parentOffsetTop, _windowScrollTop, _links,
		_slider, _sliderOptions, _sliderContents, _sections, _sectionsAreas,
		_enabled;
	
	function assignEvents(){
		_window.resize(function(){
			toggleContents();
			
			if( _enabled ){
				toggleFixingContents();
				updateSectionAreas();
			}
		})
		.scroll(function(){
			if( _enabled ){
				toggleFixingContents();
				hightlightSection();
			}
		});
		
		_links.click(function(event){
			var thisLink = $(this),
				thisLinkTarget = thisLink.attr('href').substr(1);
			
			scrollToSection( thisLinkTarget );
			moveSlider( thisLink.position().top );
			
			event.preventDefault();
		});
	}
	
	function toggleContents(){
		if( _body.width() < 1180 ){
			if( _contents.css('display') == 'block' ){
				_contents.hide();
			}
			_enabled = false;
		}
		else{
			if( _contents.css('display') == 'none' ){
				_contents.show();
			}
			
			_enabled = true;
		}
	}
	
	function toggleFixingContents(){
		if( !($.browser.msie && $.browser.version == '6.0') ){
			_windowScrollTop = _window.scrollTop();
			_parentOffsetTop = _parent.offset().top;
			
			if( _contents.hasClass(SETTINGS.fixedClass) ){
				if( _windowScrollTop < _parentOffsetTop - SETTINGS.fixedTopPosition ){
					_contents.removeClass(SETTINGS.fixedClass);
				}
			}
			else{
				if( _windowScrollTop >= _parentOffsetTop - SETTINGS.fixedTopPosition ){
					_contents.addClass(SETTINGS.fixedClass);
				}
			}
		}
	}
	
	function initSectionAreas(){
		for( var i = 0; i < _sections.length; i++ ){
			_sectionsAreas.push({
				height: 0,
				begin: 0,
				end: 0
			});
		}
	}
	
	function updateSectionAreas(){
		for( var i = 0; i < _sectionsAreas.length; i++ ){
			_sectionsAreas[i].height = _sections.eq(i).height() + parseInt(_sections.eq(i).css("padding-top"), 10) + parseInt(_sections.eq(i).css("padding-bottom"), 10);
			_sectionsAreas[i].begin = (i == 0) ? 0 : _sections.eq(i).offset().top - SETTINGS.sectionMargin;
			_sectionsAreas[i].end = (i == _sectionsAreas.length - 1) ? _document.height() : _sections.eq(i).offset().top + _sectionsAreas[i].height + SETTINGS.sectionMargin;
		}
	}
	
	function hightlightSection(){
		if( !_sliderOptions.animated ){
			_sliderOptions.offsetPoint = _slider.offset().top + _sliderOptions.height / 2;
			
			// При определённой конфигурации (много коротких блоков) возможен вариант, что указатель показывает не на тот блок
			for( var i = 0; i < _sectionsAreas.length; i++ ){
				if( _sliderOptions.offsetPoint >= _sectionsAreas[i].begin && _sliderOptions.offsetPoint < _sectionsAreas[i].end ){
					_slider.css('top', _sliderOptions.height * i);
					_sliderContents.css('top', _sliderOptions.height * i * -1);
					
					break;
				}
			}
		}
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
		_sliderOptions.animated = true;
		
		_slider.animate({
			top: to
		},SETTINGS.scrollTime,
		function(){
			_sliderOptions.animated = false;
		});
		
		_sliderContents.animate({
			top: -to
		}, SETTINGS.scrollTime);
	}
	
	return {
		init: function( userSettings ){
			_window = $(window);
			_document = $(document);
			_body = $(document.body);
			
			_contents = $(SETTINGS.contentsSelector);
			_parent = _contents.parent();
			_windowScrollTop = 0;
			_links = $(SETTINGS.linksSelector, _contents);
			
			_slider = $(SETTINGS.sliderSelector);
			_sliderContents = $('.list', _slider);
			_sections = $(SETTINGS.sectionsSelector);
			_sectionsAreas = [];
			
			_sliderOptions = {
				height: _slider.height(),
				offsetPoint: 0,
				animated: false
			};
			
			_enabled = true;
			
			toggleContents();
			toggleFixingContents();
			
			initSectionAreas();
			updateSectionAreas();
			hightlightSection();
			
			assignEvents();
		},
		update: function(){
			updateSectionAreas();
		}
	};
})();
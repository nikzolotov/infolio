/*
 * Табы
 */

(function($){
	$.fn.tabs = function( userSettings ){
		var SETTINGS = {
			linkSelector: '',
			tabSelector: '',
			selectedClass: 'selected',
			animation: {
				type: 'horizontal',
				time: 300
			},
			onSwitchTab: null
		};
		
		return this.each(function(){
			if( userSettings ){
				$.extend( SETTINGS, userSettings );
			}
			
			var tabsContainer = $(this),
				links = $(SETTINGS.linkSelector, tabsContainer),
				tabs = $(SETTINGS.tabSelector, tabsContainer),
				tabsParent = tabs.eq(0).parent();
			
			initTabs();
			assignEvents();
			showTabByHash();
			
			function initTabs(){
				if( SETTINGS.animation.type == 'horizontal' ){
					tabs.show();
				}
				else {
					tabs.filter(':not(:first)').hide();
				}
				
				links.eq(0).addClass(SETTINGS.selectedClass);
			}
			
			function assignEvents(){
				links.click(
					clickHandler
				);
				
				// Shit hack. Нужен для того, чтобы просто переключить таб, без вызова callback-функции
				links.bind(
					'clickOnly',
					clickOnlyHandler
				);
			}
			
			function clickHandler( event ){
				switchTab( $(this) );
				changeHash( $(this) );
				
				if( $.isFunction(SETTINGS.onSwitchTab) ){
					SETTINGS.onSwitchTab.call(this, event);
				}
				
				event.preventDefault();
			}
			
			function clickOnlyHandler( event ){
				switchTab( $(this) );
				changeHash( $(this) );
				
				event.preventDefault();
			}
			
			function switchTab( link ) {
				var thisLinkTarget = link.attr('href').substr(1),
					targetTab = tabs.filter(function(){ return $(this).attr('id') == 'tab-' + thisLinkTarget; });
				
				if( SETTINGS.animation.type == 'horizontal' ){
					tabsParent.animate({
						marginLeft: - targetTab.position().left
					}, SETTINGS.animation.time);
				}
				else{
					tabs.hide();
					targetTab.show();
				}
				
				links.removeClass(SETTINGS.selectedClass);
				link.addClass(SETTINGS.selectedClass);
			}
			
			function changeHash( link ){
				document.location.hash = link.attr('href').substr(1);
			}
			
			function showTabByHash(){
				if( document.location.hash ){
					var linkFromHash = links.filter(function(){
						return $(this).attr('href') == document.location.hash;
					});
					
					if( linkFromHash.length ){
						// Хардкод для перемотки страницы к блоку с табами
						var sectionFromHash = document.location.hash.substr(1),
							sectionDividerPosition = sectionFromHash.indexOf('-');
						
						if( sectionDividerPosition != -1 ){
							sectionFromHash = sectionFromHash.substr(0, sectionDividerPosition);
						}
						
						contents.scroll( sectionFromHash );

						switchTab( linkFromHash );
					}
				}
			}
		});
	};
})( jQuery );
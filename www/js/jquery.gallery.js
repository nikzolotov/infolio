/*
* Galllery
*/

(function($){
	$.fn.gallery = function( userSettings ){
		var SETTINGS = {
			linkSelector: '',
			imageSelector: '',
			selectedClass: 'selected'
		};

		return this.each(function(){
			if( userSettings ){
				$.extend( SETTINGS, userSettings );
			}

			var container = $(this),
				links = $(SETTINGS.linkSelector, container),
				images = $(SETTINGS.imageSelector, container),
				currentImage = images.eq(0),
				imagesContainer = currentImage.parent();
			
			assignEvents();
			
			function assignEvents(){
				links.click(function( event ){
					var thisLink = $(this),
						thisHref = thisLink.attr('href'),
						targetImage = images.filter(function(){ return $(this).attr('src') == thisHref; });
					
					if( targetImage.length ){
						if( !targetImage.is(currentImage) ){
							switchImage(targetImage);
						}
					}
					else {
						var newImage = images.eq(0).clone().hide().appendTo(imagesContainer);
						
						refreshImages();
						
						newImage.load(function(){
							switchImage(newImage);
						}).attr('src', thisHref);
					}
					
					links.removeClass(SETTINGS.selectedClass);
					thisLink.addClass(SETTINGS.selectedClass);
					
					event.preventDefault();
				});
			}
			
			function switchImage( imageToShow ){
				imageToShow.fadeIn(function(){
					currentImage = imageToShow;
				});
			}
			
			function refreshImages(){
				images = $(SETTINGS.imageSelector, container);
			}
		});
	};
})( jQuery );

/*
* Galllery
*/

(function($){
	$.fn.gallery = function( userSettings ){
		var SETTINGS = {
			linkSelector: '',
			imageClass: '',
			selectedClass: 'selected',
			animationTime: 200,
			loaderHTML: '<span class="loading">Loading...</span>'
		};

		return this.each(function(){
			if( userSettings ){
				$.extend( SETTINGS, userSettings );
			}

			var container = $(this),
				links = $(SETTINGS.linkSelector, container),
				images = new Array(links.length),
				currentImageNumber = 0,
				loader = $(SETTINGS.loaderHTML),
				loaderTimeout = 0;
						
			init();
			assignEvents();
			
			function init(){
				images[0] = $('.' + SETTINGS.imageClass, container);
				
				loader.insertAfter(images[0]);
			}
			
			function assignEvents(){
				links.click(function( event ){
					var thisLink = $(this),
						thisIndex = links.index(thisLink),
						thisHref = thisLink.attr('href'),
						thisTitle = thisLink.attr('title'),
						targetImage = images[thisIndex];
					
					if( typeof targetImage === 'undefined' ){
						images[thisIndex] = $('<img class="' + SETTINGS.imageClass + '" alt="' + thisTitle + '"/>').hide().insertAfter(images[prevImageNumber(thisIndex)]);
						
						loaderTimeout = setTimeout(function(){
							loader.fadeIn(SETTINGS.selectedClass);
						}, 200)
						
						images[thisIndex].load(function(){
							clearTimeout(loaderTimeout);
							loader.fadeOut(SETTINGS.selectedClass);
							
							switchImage(thisIndex);
						}).attr('src', thisHref);
					}
					else {
						switchImage(thisIndex);
					}
					
					links.removeClass(SETTINGS.selectedClass);
					thisLink.addClass(SETTINGS.selectedClass);
					
					event.preventDefault();
				});
			}
			
			function switchImage( imageNumber ){
				if( imageNumber > currentImageNumber ){
					images[imageNumber].fadeIn(SETTINGS.animationTime, function(){
						images[currentImageNumber].hide(function(){
							currentImageNumber = imageNumber;
						});
					});
				}
				else if( imageNumber < currentImageNumber ) {
					images[imageNumber].show();
					images[currentImageNumber].fadeOut(SETTINGS.animationTime, function(){
						currentImageNumber = imageNumber;
					});
				}
			}
			
			function prevImageNumber( imageNumber ){
				for( var i = imageNumber - 1; i >= 0; i-- ){
					if( typeof images[i] !== 'undefined' ){
						return i;
					}
				}
			}
		});
	};
})( jQuery );

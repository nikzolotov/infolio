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
			loaderHTML: '<span class="loader">Loading...</span>'
		};

		return this.each(function(){
			if( userSettings ){
				$.extend( SETTINGS, userSettings );
			}

			var container = $(this),
				links = $(SETTINGS.linkSelector, container),
				images = new Array(links.length),
				loaders = [],
				currentImageNumber = 0;
				//loader = $(SETTINGS.loaderHTML),
				//loaderTimeout = 0;
						
			init();
			assignEvents();
			
			function init(){
				images[0] = $('.' + SETTINGS.imageClass, container);
				
				for( var i = 0; i < links.length; i++ ){
					loaders[i] = {
						image: $(SETTINGS.loaderHTML),
						timeout: 0
					}
					
					loaders[i].image.appendTo(links.eq(i));
				}
				//loader.insertAfter(images[0]);
			}
			
			function assignEvents(){
				links.click(function( event ){
					var thisLink = $(this),
						thisIndex = links.index(thisLink),
						thisHref = thisLink.attr('href'),
						thisTitle = thisLink.attr('title'),
						targetImage = images[thisIndex];
					
					stopOtherLoading();
					
					if( typeof targetImage === 'undefined' ){
						images[thisIndex] = $('<img class="' + SETTINGS.imageClass + '" alt="' + thisTitle + '"/>')
							.data('loading', true)
							.hide()
							.insertAfter(images[prevImageNumber(thisIndex)]);
						
						loaders[thisIndex].timeout = setTimeout(function(){
							loaders[thisIndex].image.show();
						}, 200);
						
						images[thisIndex].load(function(){
							$(this).removeData('loading');
							
							clearTimeout(loaders[thisIndex].timeout);
							loaders[thisIndex].image.hide();
							
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
						images[currentImageNumber].hide(0, function(){
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
			
			function stopOtherLoading(){
				for( var i = 0; i < images.length; i++ ){
					if( typeof images[i] !== 'undefined' && images[i].data('loading') ){
						images[i].remove();
						images[i] = void 0;
						
						loaders[i].image.hide();
						clearTimeout(loaders[i].timeout);
					}
				}
			}
		});
	};
})( jQuery );

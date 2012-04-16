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
		linkSelector: '.b-tab-links .link',
		tabSelector: '.b-tab'
	});
	
	/* Табы проектов в портфолио */
	$('#portfolio').tabs({
		linkSelector: '.b-circle-tab-links .link',
		tabSelector: '.b-tab'
	});
	
	/* Галереи в портфолио */
	$('.b-project').gallery({
		linkSelector: '.b-previews .link',
		imageClass: 'illustration',
		loaderHTML: '<span class="b-loading"><img class="image" src="./img/loading.gif" alt="Loading"/></span>'
	});
	
	/* Подсказки в полях ввода */
	$('.b-hint-label').hints();
	
	/* Вход для клиентов */
	var loginModal = $('#login .b-modal-window'),
		loginForm = $('#login-form'),
		loaderHTMLTemplate = '<div class="b-loading-overlay"><span class="b-loading"><img class="image" src="./img/loading.gif" alt="Loading"/></span></div>',
		loginFormLoader = $(loaderHTMLTemplate);
	
	loginFormLoader.appendTo(loginModal);
	
	loginForm.submit(function(event){
		loginFormLoader.show();
		$('.b-error', loginForm).remove();
		
		$.ajax({
			type: 'post',
			url: '/login.html',
			data: {
				login: $('input[type=text]', loginForm).val(),
				password: $('input[type=password]', loginForm).val()
			},
			dataType: 'json',
			success: function(response){
				loginFormLoader.hide();
				
				if( response.hasOwnProperty('success') ){
					window.location = window.location;
				}
				else if( response.hasOwnProperty('error') ){
					$('fieldset', loginForm).prepend('<div class="b-error">' + response.error + '</div>');
				}
			}
		});
		
		event.preventDefault();
	});
	
	/* Форма отправки резюме */
	var hireLink = $('#hire-link'),
		hireImage = $('#hire-image'),
		hireForm = $('#hire-form');
	
	hireForm.hide();
	
	hireLink.click(function(event){
		$(this).toggleClass('selected');
		
		hireImage.toggle();
		hireForm.toggle();
		
		event.preventDefault();
	});
});
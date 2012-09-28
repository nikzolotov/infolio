$(function(){
	/* Содержание */
	contents.init();
	
	/* Процентные отступы у лого и отступ снизу */
	var theWindow = $(window),
		header = $('.l-header'),
		logo = $('.b-logo .image', header);
		footer = $('.l-footer'),
		contactsSection = $('#tab-contacts'),
		footerPadding = 0;
	
	logo.load(function(){
		setHeaderPadding();
		setFooterPadding();
	});
	setFooterPadding();
	
	theWindow.resize(function(){
		setHeaderPadding();
		setFooterPadding();
	});
	
	function setHeaderPadding(){
		header.css({
			'padding-top': Math.round(logo.height() * 0.33),
			'padding-bottom': Math.round(logo.height() * 0.37)
		});
		
		contents.update();
	}
	
	function setFooterPadding(){
		footerPadding = theWindow.height() - contactsSection.height() - parseInt(contactsSection.css("padding-top"), 10) - parseInt(contactsSection.css("padding-bottom"), 10) - 84;
		
		if( footerPadding < 38 || contents.isHidden() ){
			footerPadding = 38;
		}
		
		footer.css('padding-bottom', footerPadding);
	}
	
	/* Табы услуг */
	$('#tab-services').tabs({
		linkSelector: '.b-tab-links .link',
		tabSelector: '.b-tab'
	});
	
	/* Табы проектов в портфолио */
	$('#tab-portfolio').tabs({
		linkSelector: '.b-circle-tab-links .link',
		tabSelector: '.b-tab'
	});
	
	/* Галереи в портфолио */
	$('.b-project').gallery({
		linkSelector: '.b-previews .link',
		nextLinkSelector: '.next-link',
		imageClass: 'illustration',
		loaderHTML: '<span class="b-loading"><img class="image" src="./img/loading.gif" alt="Loading"/></span>'
	});
	
	/* Подсказки в полях ввода */
	$('.b-hint-label').hints();
	
	/* Форма логина */
	var loginModalLink = $('#tab-clients .js-modal'),
		loginModal = $('#login .b-modal-window'),
		loginForm = $('#login-form'),
		loaderHTMLTemplate = '<div class="b-loading-overlay"><span class="b-loading"><img class="image" src="./img/loading.gif" alt="Loading"/></span></div>',
		loginFormLoader = $(loaderHTMLTemplate);
	
	loginFormLoader.appendTo(loginModal);
	
	loginModalLink.click(function(){
		$('.b-error', loginForm).remove();
	});
	
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
	
	/* Форма обратной связи */
	var feedbackContainer = $('#feedback'),
		feedbackForm = $('#feedback-form'),
		feedbackInputs = $('input, textarea', feedbackForm),
		feedbackCloseButton = $('#feedback-close'),
		feedbackFormLoader = $(loaderHTMLTemplate);
	
	feedbackFormLoader.appendTo(feedbackContainer);
	
	feedbackForm.submit(function(event){
		feedbackFormLoader.show();
		
		$.ajax({
			type: 'post',
			url: '/feedback.html',
			data: feedbackForm.serializeArray(),
			dataType: 'html',
			success: function(response){
				feedbackFormLoader.hide();
				
				if( typeof response === 'string' ){
					feedbackForm.css('visibility', 'hidden').after(response);
				}
			}
		});
		
		event.preventDefault();
	});
	
	feedbackCloseButton.live('click', function(event){
		$(this).parent().remove();
		
		feedbackForm.clearForm();
		feedbackInputs.blur();
		feedbackForm.css('visibility', 'visible');
		
		event.preventDefault();
	});
	
	/* Форма отправки резюме */
	var hireModalLink = $('#tab-contacts .js-modal'),
		hireModal = $('#hire .b-modal-window'),
		hireContainer = $('#hire .b-hire'),
		hireLink = $('#hire-link'),
		hireImage = $('#hire-image'),
		hireForm = $('#hire-form'),
		hireInputs = $('input, textarea', hireForm),
		hireFileContainer = $('#hire-resume-container'),
		hireCloseButton = $('#hire-close'),
		hireFormLoader = $(loaderHTMLTemplate);
	
	hireFormLoader.appendTo(hireModal);
	
	hireModalLink.click(function(){
		hireLink.removeClass('selected');
		
		hireImage.show();
		hireForm.hide();
	});
	
	hireLink.click(function(event){
		$(this).toggleClass('selected');
		
		hireImage.toggle();
		hireForm.toggle();
		
		event.preventDefault();
	});
	
	hireForm.ajaxForm({
		type: 'post',
		url: '/hr.html',
		beforeSubmit: function(){
			hireFormLoader.show();
		},
		success: function(response){
			hireFormLoader.hide();
			
			if( typeof response === 'string' ){
				hireContainer.css('visibility', 'hidden').after(response);
			}
		} 
	});
	
	hireCloseButton.live('click', function(event){
		modal.hide();
		
		$(this).parent().remove();
		
		hireForm.clearForm();
		hireInputs.blur();
		hireFileContainer.html(hireFileContainer.html());
		hireContainer.css('visibility', 'visible');
		
		event.preventDefault();
	});
});
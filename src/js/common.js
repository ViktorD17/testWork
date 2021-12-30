
jQuery(function($) {

	// vacancies toggle

	$('.vacancies-list__caption').click(function() {
		$(this).toggleClass('close').next('.vacancies-list__wrapper').toggle();
	})

	$('.vacancies-available span').click(function() {
		$('.vacancies-available__list').toggle();
	})


	// search popup

	$('.vacancies-search__search-button').click(function() {
		$('.vacancies-search__input').show();
		$('.vacancies-search__close-button').show();
	})

	$('.vacancies-search__close-button').click(function() {
		$('.vacancies-search__input').hide();
		$('.vacancies-search__close-button').hide();
	})

});


// header menu

function mobMenu() {
	document.querySelector('#rezume span').innerHTML = 'Резюме'
	document.querySelector('#vacancies span').innerHTML = 'Вакансия'
	document.querySelector('#reactor span').innerHTML = 'Реактор'
}

function desktopMenu() {
	document.querySelector('#rezume span').innerHTML = 'Найти кандидатов'
	document.querySelector('#vacancies span').innerHTML = 'Создать вакансию'
	document.querySelector('#reactor span').innerHTML = 'Реактор'
}

if (document.documentElement.clientWidth < 1200) {
	mobMenu()
} else {
	desktopMenu()
}

window.addEventListener('resize', function() {
	if (document.documentElement.clientWidth < 1200) {
		mobMenu()
	} else {
		desktopMenu()
	}
})
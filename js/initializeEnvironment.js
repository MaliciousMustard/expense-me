function useLanguage(language) {
	if (language === "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac") {
		lang = gr_lang;
	} else {
		lang = en_lang;
	}
}

function findLanguage() {
	var storedLangPreference = localStorage[langKey];
	if (storedLangPreference) {
		useLanguage(storedLangPreference);
	} else {
		if (navigator.globalization) {
			navigator.globalization.getPreferredLanguage(
				function (language) {
					useLanguage(language.value);
				},
				function () {
					useLanguage("English");
				});
		} else {
			useLanguage("English");
		}
	}
}

function initializeAngular() {
	findLanguage();
	angular.bootstrap(document, ['expenseMeApp']);
}

document.addEventListener("deviceready", initializeAngular, false);
initializeAngular();
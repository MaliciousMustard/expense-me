function useLanguage(language) {
	if (language === "Ελληνικά") {
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

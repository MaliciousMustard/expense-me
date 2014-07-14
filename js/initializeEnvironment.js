function useLanguage(language) {
	if (language === "Ελληνικά") {
		alert("Found greek");
		lang = gr_lang;
		alert("Used greek");
		alert(lang);
	} else {
		alert("Found english");
		lang = en_lang;
		alert("Used english");
		alert(lang);
	}
}

function findLanguage() {
	var storedLangPreference = localStorage[langKey];
	if (storedLangPreference) {
		useLanguage(storedLangPreference);
	} else {
		navigator.globalization.getPreferredLanguage(
			function (language) {
				useLanguage(language.value);
			},
			function () {
				useLanguage("English");
			});
	}
}

function initializeAngular() {
	alert("Initializing angular");
	findLanguage();
	alert("Found language: " + lang);
	angular.bootstrap($('body'), ['expenseMeApp']);
	alert("Angular started!");
}

document.addEventListener("deviceready", initializeAngular, false);
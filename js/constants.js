var langKey = "random394885996049";
var lang = null;
var itemsKey = "random2938495873";
var beenHereBefore = "beenHereBefore293949";
var noCategory = function() {
	return lang.noneOfTheAbove;
};

var categories = [
	{
		name: function() {
			return lang.bills;
		},
		value: "Bills",
		icon: "img/glyphicons_442_earphone.png"
	},
	{
		name: function() {
			return lang.book;
		},
		value: "Book",
		icon: "img/glyphicons_351_book_open.png"
	},
	{
		name: function() {
			return lang.cleaning;
		},
		value: "Cleaning",
		icon: "img/glyphicons_067_cleaning.png"
	},
	{
		name: function() {
			return lang.clothing;
		},
		value: "Clothing",
		icon: "img/glyphicons_285_sweater.png"
	},
	{
		name: function() {
			return lang.coffee;
		},
		value: "Coffee",
		icon: "img/glyphicons_294_coffe_cup.png"
	},
	{
		name: function() {
			return lang.drink;
		},
		value: "Drink",
		icon: "img/glyphicons_274_beer.png"
	},
	{
		name: function() {
			return lang.electronics;
		},
		value: "Electronics",
		icon: "img/glyphicons_166_ipod.png"
	},
	{
		name: function() {
			return lang.food;
		},
		value: "Food",
		icon: "img/glyphicons_276_cutlery.png"
	},
	{
		name: function() {
			return lang.gas;
		},
		value: "Gas",
		icon: "img/glyphicons_005_car.png"
	},
	{
		name: function() {
			return lang.movies;
		},
		value: "Movies",
		icon: "img/glyphicons_008_film.png"
	},
	{
		name: function() {
			return lang.music;
		},
		value: "Music",
		icon: "img/glyphicons_017_music.png"
	},
	{
		name: function() {
			return lang.pets;
		},
		value: "Pets",
		icon: "img/glyphicons_002_dog.png"
	},
	{
		name: function() {
			return lang.shopping;
		},
		value: "Shopping",
		icon: "img/glyphicons_202_shopping_cart.png"
	},
	{
		name: function() {
			return lang.smoking;
		},
		value: "Smoking",
		icon: "img/glyphicons_362_smoking.png"
	}, 
	{
		name: function() {
			return lang.sports;
		},
		value: "Sports",
		icon: "img/glyphicons_306_bicycle.png"
	},
	{
		name: function() {
			return lang.transportation;
		},
		value: "Transportation",
		icon: "img/glyphicons_014_train.png"
	},
	{
		name: function() {
			return lang.travelling;
		},
		value: "Travelling",
		icon: "img/glyphicons_033_luggage.png"
	}
];

var colors = [
	"btn-primary", 
	"btn-success",
	"btn-info",
	"btn-warning",
	"btn-danger"
];

var months = function() {
	return lang.months;
};

var languages = function() {
	return lang.languages;
};

var maxItemsKey = "random238423942812312";
var maxItems = function() {
	var maxItemsSetting = localStorage[maxItemsKey];
	if (!maxItemsSetting) {
		maxItemsSetting = "20";
	}
	return parseInt(maxItemsSetting);
}

var setMaxItems = function(m) {
	localStorage[maxItemsKey] = m;
}
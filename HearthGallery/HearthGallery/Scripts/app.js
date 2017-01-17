(function () {

    var app = angular.module('hearthgallery', []);

    //Gallery page
    app.controller('GalleryController', GalleryController);

    //Deck Builder page
    app.controller('DeckBuilderController', DeckBuilderController);

    //Navigation menu controller
    app.controller('NavigationController', NavigationController);

    //Login page
    app.controller('LoginController', LoginController);

    //Register page
    app.controller('RegisterController', RegisterController);

    //Decks page
    app.controller('DeckController', DeckController);

})();
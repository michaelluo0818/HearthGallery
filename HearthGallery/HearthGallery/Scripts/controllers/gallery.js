var GalleryController = function ($scope, $http) {
    //all available cards after sorting
    $scope.cards = [];
    //position in cards array
    $scope.index = 0;

    //get header for required api key
    var config = {
        headers: {
            'X-Mashape-Key': 'D7ee08bjh0mshgOSSg5u8KFOtsM9p1fghQ3jsn53SBZyt0Kv9l'
        }
    };

    //pushing cards into array after getting source data
    $scope.pushData = function (response) {
        $scope.index = 0;
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].type !== 'Hero') {
                $scope.cards.push({
                    img: response.data[i].img,
                    flavor: response.data[i].flavor
                });
            }
        }
    };

    //move to the next 3 cards in the array
    $scope.nextPage = function () {
        if ($scope.index < $scope.cards.length) {
            $scope.index += 3;
        }
    };

    //move to the previous 3 cards in the array
    $scope.prevPage = function () {
        if ($scope.index != 0) {
            $scope.index -= 3;
        }
    };

    //get all class specifc cards
    $scope.sortDruid = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Druid?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortHunter = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Hunter?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortMage = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Mage?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortNeutral = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Neutral?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortPaladin = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Paladin?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortPriest = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Priest?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortRogue = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Rogue?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortShaman = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Shaman?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortWarlock = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Warlock?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.sortWarrior = function () {
        $scope.cards = [];
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Warrior?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    
    //get all neutral cards after page load
    $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Neutral?collectible=1", config).then(function (response) {
        $scope.pushData(response);
    });

};

GalleryController.$inject = ['$scope', '$http'];
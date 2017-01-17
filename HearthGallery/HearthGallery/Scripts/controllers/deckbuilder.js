var DeckBuilderController = function ($scope, $http, $filter, $window) {
    //all available cards after sorting
    $scope.cards = [];
    //the deck to be built upon
    $scope.deck = [];
    //all available cards for selection
    $scope.allCards = [];
    //position in cards array
    $scope.index = 0;
    //how many cards the deck currently holds
    $scope.cardsInDeck = 0;
    $scope.deckName = '';
    //the class of the deck
    $scope.activeHero = '';
    //toggle class selection and deck building modes
    $scope.deckBuilding = false;
    $scope.classSelection = true;

    //get header for required api key
    var config = {
        headers: {
            'X-Mashape-Key': 'D7ee08bjh0mshgOSSg5u8KFOtsM9p1fghQ3jsn53SBZyt0Kv9l'
        }
    };

    //pushing cards into array after getting source data
    $scope.pushData = function (response) {
        $scope.cards = [];
        $scope.index = 0;
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].type !== 'Hero') {
                $scope.cards.push({
                    id: response.data[i].cardId,
                    img: response.data[i].img,
                    name: response.data[i].name,
                    cost: response.data[i].cost,
                    rarity: response.data[i].rarity
                });
            }
        }
        //backingup all cards since $scope.cards will be fragmented in sorting operations
        $scope.allCards = $scope.cards;
    };

    //params id: The id of the card
    //params name: The name of the card
    //params cost: The mana cost of the card
    //add a card to a deck.
    $scope.addCard = function (id, name, cost) {
        if ($scope.cardsInDeck < 30) {
            //if a card is already in a deck and it isn't a legendary rank card, add another copy
            if ($filter('filter')($scope.deck, { id: id }).length === 1 &&
                $filter('filter')($scope.allCards, { id: id })[0].rarity !== 'Legendary' &&
                $filter('filter')($scope.deck, { id: id })[0].quantity !== 2) {
                $filter('filter')($scope.deck, { id: id })[0].quantity = 2;
                $scope.cardsInDeck++;
                //if a card doesn't exist in the deck, add one copy to the deck
            } else if ($filter('filter')($scope.deck, { id: id }).length < 1) {
                $scope.deck.push({
                    id: id,
                    name: name,
                    cost: cost,
                    quantity: 1
                });
                $scope.cardsInDeck++;
            }
        }
    };

    //Sort all available cards based on its mana cost.
    //0-6 will be counted indivdually, 7 will be 7mana and above
    $scope.sortMana = function (cost) {
        $scope.cards = [];
        $scope.index = 0;
        for (var i = 0; i < $scope.allCards.length; i++) {
            if (cost === 7) {
                if ($scope.allCards[i].cost >= 7) {
                    $scope.cards.push({
                        id: $scope.allCards[i].id,
                        img: $scope.allCards[i].img,
                        name: $scope.allCards[i].name,
                        cost: $scope.allCards[i].cost,
                        rarity: $scope.allCards[i].rarity
                    });
                }
            } else if ($scope.allCards[i].cost === cost) {
                $scope.cards.push({
                    id: $scope.allCards[i].id,
                    img: $scope.allCards[i].img,
                    name: $scope.allCards[i].name,
                    cost: $scope.allCards[i].cost,
                    rarity: $scope.allCards[i].rarity
                });
            }
        }
    };

    //submit a deck to the server
    //The deck must have 30 cards before submitting. If the deck does not have a name, a default one will be added.
    $scope.submitDeck = function () {
        if ($scope.cardsInDeck === 30) {
            if (!$scope.deckName) {
                $scope.deckName = $scope.activeHero + ' Deck';
            }
            var data = JSON.stringify($scope.deck);
            var url = '/deckbuilder/create?deckName=' + $scope.deckName +
                '&Hero=' + $scope.activeHero;
            $http.post(url, data).then(
            function successCallback(response) {
                if (response && response.data.Succeeded) {
                    $window.location.href = '/deckbuilder/decks';
                } else {
                    alert(response.data.Message);
                }
            }, function errorCallback(response) {
                if (response && response.data && response.data.Errors) {
                    alert("Error occured within server.")
                }
            }
        );
        }
    }

    //clear all sorting filters
    $scope.clearFilter = function () {
        $scope.cards = $scope.allCards;
        $scope.index = 0;
    };

    //move to the next 6 cards in the array
    $scope.nextPage = function () {
        if ($scope.index < $scope.cards.length) {
            $scope.index += 6;
        }
    };

    //move to the previous 6 cards in the array
    $scope.prevPage = function () {
        if ($scope.index != 0) {
            $scope.index -= 6;
        }
    };

    //Get all cards that belong to the currently enabled class
    $scope.sortHero = function () {
        $scope.getUrl = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/' + $scope.activeHero + '?collectible=1';
        $http.get($scope.getUrl, config).then(function (response) {
            $scope.pushData(response);
        });
    }

    //Get all neutral monster cards(open to all classes)
    $scope.sortNeutral = function () {
        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Neutral?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    }

    //Set the currently enabled class based on user selection
    $scope.setDruid = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Druid';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Druid?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setHunter = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Hunter';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Hunter?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setMage = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Mage';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Mage?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setPaladin = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Paladin';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Paladin?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setPriest = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Priest';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Priest?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setRogue = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Rogue';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Rogue?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setShaman = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Shaman';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Shaman?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setWarlock = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Warlock';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Warlock?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

    $scope.setWarrior = function () {
        $scope.deckBuilding = true;
        $scope.classSelection = false;
        $scope.activeHero = 'Warrior';

        $http.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Warrior?collectible=1", config).then(function (response) {
            $scope.pushData(response);
        });
    };

};

DeckBuilderController.$inject = ['$scope', '$http', '$filter', '$window'];
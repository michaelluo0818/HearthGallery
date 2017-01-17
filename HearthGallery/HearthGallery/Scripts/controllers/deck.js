var DeckController = function ($scope, $http, $filter, $window) {
    //A corresponding array of decks for each class
    $scope.druidDecks = [];
    $scope.hunterDecks = [];
    $scope.mageDecks = [];
    $scope.paladinDecks = [];
    $scope.priestDecks = [];
    $scope.rogueDecks = [];
    $scope.shamanDecks = [];
    $scope.warlockDecks = [];
    $scope.warriorDecks = [];
    //Toggle between deck overview mode and deck detail
    $scope.deckSelected = false;
    //The deck to be viewed in detail
    $scope.selectedDeck = [];

    //param hero: which class this deck belongs to
    //param response: Data to be pushed in the class array
    $scope.pushData = function (hero, response) {
        hero.push({
            id: response.id,
            name: response.deckName,
            hero: response.hero
        });
    };

    //param id: The specific id belong to the selected deck
    $scope.selectDeck = function (id) {
        $scope.deckSelected = true;
        $http.post('/deckbuilder/deckinfo?id=' + id).then(
          function successCallback(response) {
              if (response && response.data.Succeeded) {
                  for (var i = 0; i < response.data.Deck.cards.length; i++) {
                      $scope.selectedDeck.push({
                          id: response.data.Deck.cards[i].id,
                          name: response.data.Deck.cards[i].name,
                          cost: response.data.Deck.cards[i].cost,
                          quantity: response.data.Deck.cards[i].quantity
                      });
                  }
              } else if (response && !response.data.Succeeded) {
                  alert(response.data.Message);
              }
          });
    }

    //ng-show isn't updating, so reload the page
    $scope.reset = function () {
        $window.location.href = '/deckbuilder/decks';
    }

    //param hero: which class this deck belongs to
    //param id: which class this id belongs to
    //Finds which class array holds the specific deck based on id
    $scope.deckDetail = function (hero, id) {
        switch (hero) {
            case 'Druid':
                $scope.selectDeck($filter('filter')($scope.druidDecks, { id: id })[0].id);
                break;
            case 'Hunter':
                $scope.selectDeck($filter('filter')($scope.hunterDecks, { id: id })[0].id);
                break;
            case 'Mage':
                $scope.selectDeck($filter('filter')($scope.mageDecks, { id: id })[0].id);
                break;
            case 'Paladin':
                $scope.selectDeck($filter('filter')($scope.paladinDecks, { id: id })[0].id);
                break;
            case 'Priest':
                $scope.selectDeck($filter('filter')($scope.priestDecks, { id: id })[0].id);
                break;
            case 'Rogue':
                $scope.selectDeck($filter('filter')($scope.rogueDecks, { id: id })[0].id);
                break;
            case 'Shaman':
                $scope.selectDeck($filter('filter')($scope.shamanDecks, { id: id })[0].id);
                break;
            case 'Warlock':
                $scope.selectDeck($filter('filter')($scope.warlockDecks, { id: id })[0].id);
                break;
            case 'Warrior':
                $scope.selectDeck($filter('filter')($scope.warriorDecks, { id: id })[0].id);
                break;
        }
    }

    //Get all deck lists and sort them into matching class arrays.
    $http.post('/deckbuilder/decklists').then(
          function successCallback(response) {
              if (response && response.data.Succeeded) {
                  for (var i = 0; i < response.data.Lists.length; i++) {
                      switch (response.data.Lists[i].hero) {
                          case "Druid":
                              $scope.pushData($scope.druidDecks, response.data.Lists[i]);
                              break;
                          case "Hunter":
                              $scope.pushData($scope.hunterDecks, response.data.Lists[i]);
                              break;
                          case 'Mage':
                              $scope.pushData($scope.mageDecks, response.data.Lists[i]);
                              break;
                          case 'Paladin':
                              $scope.pushData($scope.paladinDecks, response.data.Lists[i]);
                              break;
                          case 'Priest':
                              $scope.pushData($scope.priestDecks, response.data[i].Lists[i]);
                              break;
                          case 'Rogue':
                              $scope.pushData($scope.rogueDecks, response.data[i].Lists[i]);
                              break;
                          case 'Shaman':
                              $scope.pushData($scope.shamanDecks, response.data[i].Lists[i]);
                              break;
                          case 'Warlock':
                              $scope.pushData($scope.warlockDecks, response.data[i].Lists[i]);
                              break;
                          case 'Warrior':
                              $scope.pushData($scope.warriorDecks, response.data[i].Lists[i]);
                              break;
                      }
                  }
              } else if (response && !response.data.Succeeded) {
                  alert(response.data.Message);
              }
          });
};

DeckController.$inject = ['$scope', '$http', '$filter', '$window'];

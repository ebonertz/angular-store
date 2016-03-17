app.controller('MainController', ['$scope', function($scope) {
  $scope.title = 'Upcoming Events';
  $scope.promo = 'Performing Live with Uncle Evan and the Drinkers';
  $scope.product = {
  	name: 'Maywood',
    location:'Raleigh',
    price: '$8.99',
    date:'March 18th'
};
}]);

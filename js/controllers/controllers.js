IronTix.controller('MainController', ['$scope', function($scope) {
  $scope.title = 'Upcoming Events';
  $scope.promo = 'Awesome Event You Love!';
  $scope.product = {
  	name: 'Maywood',
    location:'Raleigh',
    price: '$8.99',
    date:'March 18th'
};
}]);

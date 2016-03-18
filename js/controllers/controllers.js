IronTix.controller('MainController', ['$http', '$scope', function($http, $scope) {
  // $scope.title = 'Upcoming Events';
  // $scope.promo = 'Awesome Event You Love!';
  // $scope.product = {
  // 	name: 'Maywood',
  //   location:'Raleigh',
  //   price: '$8.99',
  //   date:'March 18th'

  // below is an alternative way to call our json data
  // $http.get('events.json')
  // .then(function(response){
  //   $scope.event = response.data;
  //   console.log("shit!");
  //   console.log(event.events[0]);
  // });

  $http.get('events.json').success(function(data){
    console.log("json has been successfully called");
    $scope.event = data;
  });
}]);

// this was suggested as a thing by Mike
// IronTix.controller('MainController', ['$http', '$scope', 'eventService' function($http, $scope, eventService) {
//   console.log('controller.js ran');

IronTix.controller('MainController', ['$http', '$scope' function($http, $scope) {
  console.log('controller.js ran');
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

  // this, according to Mike, was supposed to replace the ajax call below. the getEvents() function was to be defined in my angular 'service' file. 
  // $scope.events = eventService.getEvents();

  $http.get('events.json').success(function(data){
    console.log("storefront page has been populated");
    $scope.event = data;
  });
}]);

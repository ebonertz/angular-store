var IronTix = angular.module("IronTix", ['ngRoute']);

IronTix.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'storefront.html',
      controller: 'MainController'
    })
    .when('/cart', {
      templateUrl: 'admin.html',
      controller: 'CartController'
    })
    .when('/eventDetails', {
      templateUrl: 'details.html',
      controller: 'DetailsController'
    })
    .when('/StoreFront', {
      templateUrl: 'storefront.html',
      // controller: '????'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

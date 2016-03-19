var IronTix = angular.module("IronTix", ['ngRoute']);

IronTix.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'storefront.html',
      // controller: 'MainController'
    })
    .when('/AdminDashboard', {
      templateUrl: 'admin.html',
      // controller: 'CartController'
    })
    .when('/StoreFront', {
      templateUrl: 'storefront.html',
      // controller: '????'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

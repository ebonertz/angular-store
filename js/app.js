var IronTix = angular.module("IronTix", ['ngRoute']);

IronTix.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'index.html',
      // controller: 'MainController'
    })
    .when('/AdminDashboard', {
      templateUrl: 'admin.html',
      // controller: '????'
    })
    .when('/StoreFront', {
      templateUrl: 'storefront.html',
      // controller: '????'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

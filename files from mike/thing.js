/*globals angular, console, document */
(function () {
    'use strict';

/**
 * @ngdoc function
 * @name mapcApp.controller:UserLoginController
 * @description
 * # UserLoginController
 *
 * Controller for User  Login
 *
 */
    angular.module('mapcApp')
        .controller('UserLoginController', ['$scope', 'userService',
            function ($scope, userService) {

                angular.element('#tabs').tabs();

                $scope.login = function () {
                    var credentials = userService.userLogin($scope.form.email, $scope.form.password);
                    credentials.then(function (result) {
                        userService.writeCookie('teacher', result.session.id, result.session.expires);
                        userService.redirectToDestination('teacher');
                    });
                };
                $scope.studentLogin = function () {
                    var credentials = userService.studentLogin($scope.form.redemptionCode);
                    credentials.then(function (result) {
                        //console.log(result.state);
                        userService.writeCookie('student', result.redemptionCode);
                        if (result.state !== 'PUBLISHED') {
                            userService.redirectToDestination('student');
                        } else {
                            userService.redirectToDestination('student', result.state);
                        }
                    });
                };



            }]);
}());

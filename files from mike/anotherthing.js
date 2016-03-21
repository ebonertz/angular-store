/*globals angular, console, document*/

//error checking functions are not returned from this service; Any new methods must be included in the return method at the end of the file

(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name mapcApp.controller:UserRegisterController
     * @description
     * # UserRegisterController
     *
     * Controller for User Registration
     *
     */
    angular.module('mapcApp')
        .controller('UserRegisterController', ['$scope', 'userService',
            function ($scope, userService) {

                this.register = function () {
                    var credentials = userService.register($scope.form.name, $scope.form.email, $scope.form.password);
                    credentials.then(function (result) {
                        userService.writeCookie('teacher', result.session.id);
                        userService.redirectToMain();
                    });
                };
            }
            ]);

    angular.module('mapcApp')
        .directive('togglePwdVisibility', [function () {
            return {
                restrict: 'A',
                link: function (scope, element) {

                    var $pwdField = angular.element('#password'),
                        $showPwdCheckbox = element.find('#showPassword'),

                        updatePwdVisibility = function (type) {
                            scope.type = type;
                            $pwdField.attr('type', type);
                        };

                    scope.type = $showPwdCheckbox.is(":checked") ? "text" : "password";

                    $showPwdCheckbox.on('change', function () {

                        if (scope.type === 'password') {
                            updatePwdVisibility('text');
                        } else {
                            updatePwdVisibility('password');
                        }

                    });
                }
            };
        }]);

}());

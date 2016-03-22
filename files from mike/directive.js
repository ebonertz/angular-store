/*globals angular, console */
(function () {
    'use strict';

    // primary search widget for shop

    var vapeSearch = angular.module('vapeSearch.productManager');
    <juice-picker>

    </juice-picker>
    <div juice-picker></div>

    vapeSearch
        .directive('juicePicker', ['localEventLibrary', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '../../components/shop/juice-picker-template.html',
                link: function (scope, element, attrs, localEventLibrary) {
                  localEventLibrary[1].name;
                    element.select2({
                        tags: "true",
                        placeholder: "Enter Your Favorite Flavors",
                        allowClear: true
                    });

                }
            };
        }]);
}());

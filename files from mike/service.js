/*globals angular, console, document */

//error checking functions are not returned from this service; Any new methods must be included in the return method at the end of the file

(function () {
    'use strict';

    angular.module('mapcApp')
        .service('eventService', ['$http', '$q', '$location', 'mapcConfig', 'MessageService',
            function ($http, $q, $location, mapcConfig, MessageService) {
                this.destination = '';

                //console.log(mapcConfig);

                var cookieName = mapcConfig.config.cookieName,
                    cookiePath = mapcConfig.config.cookiePath,
                    cookieDomain = mapcConfig.config.cookieDomain,

                    // transform the error response, unwrapping the application data from
                    // the API response payload.
                    handleError = function (response) {
                             // Normalize API Response in case of unexpected error
                        if (!angular.isObject(response.data) || !response.data.notifications[0].code) {
                            //console.log($q.reject("An unknown error occured"));
                            MessageService.post(
                                'There was an error while working with your user account, please try again in a few minutes.',
                                'error'
                            );
                            return ($q.reject('An unknown error occured'));
                        }
                        // Otherwise, use expected error message.
                        switch (response.data.notifications[0].code) {
                        case 2100020004:
                            MessageService.post(
                                'Are you sure you entered your project ID correctly? We could not find it.',
                                'error'
                            );
                            document.getElementById('messageError').focus();
                            return ($q.reject(response.data.notifications[0].text));

                        case 1000000002:
                            MessageService.post(
                                'We could not find an account with that email and password combination. Please check your entry and try again!',
                                'error'
                            );
                            return ($q.reject(response.data.notifications[0].text));

                        case 2100020005:
                            MessageService.post(
                                'That email address is already in use. Please log in or use a different address to continue.',
                                'error'
                            );

                            return ($q.reject(response.data.notifications[0].text));

                        case 1000000003:
                            MessageService.post(
                                'It appears the author is making a last minute change to this book. We will notify you when the student re-publishes their work.',
                                'error'
                            );
                            return ($q.reject(response.data.notifications[0].text));


                        case 2100020006:
                        case 2100020007:
                            MessageService.post(
                                'There was an error while trying to Publish this book. Please try again later.',
                                'error'
                            );
                            return ($q.reject(response.data.notifications[0].text));

                        default:
                            MessageService.post(
                                'There was an error while working with your user account, please try again in a few minutes.',
                                'error'
                            );
                            return ($q.reject('An unknown error occured'));
                        }

                    },
                    // Transform successful response, unwrapping data
                    // from the response payload.
                    handleSuccess = function (response) {
                        return (response.data);
                    },

                    getCookieVal = function (val, type) {
                        var parts = document.cookie.split(val + '='),
                            value,
                            retval;

                        // console.log(parts);
                        // console.log(type);

                        // console.log('----------------');
                        // console.log(parts);
                        // console.log(parts.length);
                        // console.log('----------------');


                        if (parts.length === 2) {
                            value = decodeURIComponent(parts.pop().split(';').shift());
                            // console.log(parts.pop().split(';').shift());
                            if (type === 'sessionId') {
                                retval = value.split(':')[1];
                            } else if (type === 'role') {
                                retval = value.split(':')[0];
                            }

                            // console.log('retval is: ' + retval);

                            return retval;
                        }
                    },

                    getRole = function () {
                        var role;

                        if (getCookieVal(cookieName, 'role') === 'T') {
                            role = 'teacher';
                        } else if (getCookieVal(cookieName, 'role') === 'S') {
                            role = 'student';
                        } else {
                            role = false;
                        }

                        return role;
                    },

                    getEvents = function () {
                      //write aja call that gets ALL events
                      return data;
                    },

                    getSpecificEvent = function (eventID) {
                      //write ajax call that gets specific event
                      return someEvent;
                    },

                    updateEvent = function (eventID) {
                      //write some ajax that updates an event
                      return updatedEvent;
                    },

                    writeCookie = function (role, sessionId, expires) {
                        var expDate, cookieRole;

                        if (expires === null) {
                            expDate = new Date();
                            expDate.setDate(expDate.getDate() + 30);
                            expDate = expDate.toUTCString();
                        } else {
                            expDate = new Date(expires).toUTCString();
                        }

                        if (role === 'teacher') {
                            cookieRole = "T";
                        } else if (role === 'student') {
                            cookieRole = "S";
                        }

                        document.cookie = cookieName + '=' +
                            encodeURIComponent(cookieRole + ':' + sessionId) +
                            ';expires=' + expDate +
                            ';path=' + cookiePath +
                            ';domain=' + cookieDomain;
                    },

                    register = function (name, email, password) {
                        //console.log(mapcConfig.config.responseJSON.grunt.connectMapcHost);
                        var request = $http({
                                method: 'post',
                                // url: '//' + mapcConfig.config.responseJSON.grunt.connectMapcHost + "/mapc/v1/teacher/register",
                                url: '/mapc/v1/teacher/register',
                                params: {
                                    action: 'get'
                                },
                                data: {
                                    'name': name,
                                    'email': email,
                                    'password': password
                                }
                            });
                        return (request.then(handleSuccess, handleError));
                    },

                    redirectToLogin = function (next) {
                        $location.path('/user/login');
                        this.destination = next;
                    },

                    redirectToMain = function () {
                        var role = getRole();
                        if (role === 'teacher') {
                            $location.path('/teacher/dashboard');
                        } else if (role === 'student') {
                            $location.path('/');
                        }
                    },

                    redirectToLogout = function () {
                        $location.path('/logout');
                    },

                    redirectToDestination = function (role, status) {
                        var base;
                        if (role === 'teacher') {
                            base = '/teacher/dashboard';
                        } else if (role === 'student') {
                            base = '/';
                            if (status && status === 'PUBLISHED') {
                                base = base + 'shelf';
                            }
                        } else {
                            base = '/user/login';
                        }
                        //console.log(this.destination);
                        if (!this.destination) {
                            $location.path(base);
                        } else if (role !== this.destination.$$route.permission) {
                            $location.path(base);
                        } else {
                            $location.path(this.destination.$$route.originalPath);
                            this.destination = '';
                        }
                    },

                    getUserAuthentication = function () {
                        var retval;

                        if (getCookieVal(cookieName, 'sessionId')) {
                            retval = getCookieVal(cookieName, 'sessionId');
                        } else {
                            retval = false;
                        }

                        return retval;
                    },

                    isUserAuthenticated = function () {
                        var request,
                            session,
                            retval,
                            role;

                        session = getCookieVal(cookieName, 'sessionId');
                        role = getCookieVal(cookieName, 'role');

                        if (session && role === 'T') {
                            // console.log(session);
                            // console.log(role);
                            request = $http({
                                method: 'get',
                                url: '/mapc/v1/teacher/session/' + session
                            });
                            retval = request.then(handleSuccess, handleError);

                        } else if (session && role === 'S') {
                            request = $http({
                                method: 'get',
                                url: '/mapc/v1/student/project/' + session
                            });
                            retval = request.then(handleSuccess, handleError);
                        } else {
                            request = $q.defer();
                            request.reject('You are not logged in!');
                            retval = request.promise;
                        }

                        return retval;

                    },

                    userLogin = function (email, password) {
                        var request = $http({
                                method: 'post',
                                // url: '//' + mapcConfig.config.responseJSON.grunt.connectMapcHost + "/mapc/v1/teacher/session",
                                url: '/mapc/v1/teacher/session',
                                params: {
                                    action: 'get'
                                },
                                data: {
                                    'email': email,
                                    'password': password
                                }
                            });
                        return (request.then(handleSuccess, handleError));
                    },


                    studentLogin = function (redemptionCode) {
                        redemptionCode = redemptionCode.toUpperCase();
                        var request = $http({
                                method: 'get',
                                // url: '//' + mapcConfig.config.responseJSON.grunt.connectMapcHost + "/mapc/v1/student/session/" + redemptionCode
                                url: '/mapc/v1/student/project/' + redemptionCode
                            });
                        return (request.then(handleSuccess, handleError));
                    },

                    userLogout = function (sessionId) {
                        var request = $http({
                                method: 'delete',
                                // url: '//' + mapcConfig.config.responseJSON.grunt.connectMapcHost + "/mapc/v1/teacher/session/" + sessionId
                                url: '/mapc/v1/teacher/session/' + sessionId
                            });
                        return (request.then(handleSuccess, handleError));
                    };

                //private (non-returned) functions are: handleError, handleSuccess, and getCookieValue

                //Angular returns these functions through the injector service to anything that registers userService as a dependency
                return ({
                    writeCookie: writeCookie,
                    register: register,
                    redirectToMain: redirectToMain,
                    redirectToLogout: redirectToLogout,
                    redirectToLogin: redirectToLogin,
                    isUserAuthenticated: isUserAuthenticated,
                    getUserAuthentication: getUserAuthentication,
                    getRole: getRole,
                    userLogin: userLogin,
                    studentLogin: studentLogin,
                    handleSuccess: handleSuccess,
                    handleError: handleError,
                    redirectToDestination: redirectToDestination,
                    userLogout: userLogout

                });

            }]);


}());

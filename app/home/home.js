'use strict';

angular.module('lander.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function ($scope) {
        $scope.facebook = "https://www.facebook.com/marsfmie";
        $scope.twitter = "https://twitter.com/marsfmie";
    });
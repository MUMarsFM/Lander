'use strict';

angular.module('lander.getInvolved', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/getInvolved', {
            templateUrl: 'getInvolved/getInvolved.html',
            controller: 'GetInvolvedCtrl'
        });
    }])

    .controller('GetInvolvedCtrl', [function () {

    }]);
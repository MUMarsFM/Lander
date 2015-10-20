'use strict';

var Dependencies = [
    'ngRoute',
    'ngMaterial',
    'ngResource',
    'lander.home',
    'lander.schedule',
    'lander.getInvolved'
];

// Declare app level module which depends on views, and components
var app = angular.module('lander', Dependencies)
    .config(["$mdThemingProvider", "$mdIconProvider", Config])
    .controller('NavController', NavController)
    .controller('PlayerController', PlayerController);

function Config($mdThemingProvider, $mdIconProvider, $location) {

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('orange');

    $mdIconProvider
        .icon('facebook', 'img/icons/facebook.svg', 24)
        .icon('twitter', 'img/icons/twitter.svg', 24)
        .icon('instagram', 'img/icons/instagram.svg', 24);

/*    soundManager.setup({
        url: 'bower_components/soundmanager2/swf/',
        flashVersion: 9,
        preferFlash: false,
        onready: function () {
            soundManager.createSound({
                id: "stream",
                url: ["http://stream.marsfm.ie/listenogg", "http://stream.marsfm.ie/listen"]
            });
        }
    });*/
}

function NavController($scope, $location) {
    $scope.initSlider = function () {
        switch ($location.path()) {
            case "/":
                $scope.selectedIndex = 0;
                break;
            case "/schedule":
                $scope.selectedIndex = 1;
                break;
            case "/getInvolved":
                $scope.selectedIndex = 2;
                break;
        }
    }

    $scope.$watch('selectedIndex', function (current, old) {
        switch (current) {
            case 0:
                $location.url("/");
                break;
            case 1:
                $location.url("/schedule");
                break;
            case 2:
                $location.url("/getInvolved");
                break;
        }
    });
}

function PlayerController($scope, $interval, scheduleAPI) {
    function updateLiveData() {
        var start = new Date();
        var end = new Date(start);

        end.setSeconds(start.getSeconds() + 1);

        var timeMin = start.toISOString();
        var timeMax = end.toISOString();

        scheduleAPI.getData({timeMin: timeMin, timeMax: timeMax}).$promise.then(
            function (data) {
                if (data.items.length == 0) {
                    $scope.showtitle = "Off Air";
                } else {
                    $scope.showtitle = data.items[0].summary;
                }
            },
            function (error) {

            }
        );
    }

    updateLiveData();

    var timer = $interval(updateLiveData, 20000);

    $scope.playicon = 'play_arrow';

    $scope.playing = false;
    $scope.muted = false;

    $scope.toggleMuteIcon = function () {
        $scope.muted = !$scope.muted;
    }

    $scope.togglePlayIcon = function () {
        if ($scope.playing) {
            $scope.playicon = 'play_arrow';
            $scope.playing = false;
        } else {
            $scope.playicon = 'stop';
            $scope.playing = true;
        }
    };


}
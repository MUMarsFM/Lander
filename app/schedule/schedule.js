'use strict';

angular.module('lander.schedule', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/schedule', {
            templateUrl: 'schedule/schedule.html',
            controller: 'ScheduleCtrl'
        });
    }])

    .controller('ScheduleCtrl', ["$scope", "scheduleAPI", function ($scope, scheduleAPI) {
        var now = new Date();
        var start = new Date(now.setHours(0, 0, 0, 0));
        var end = new Date(start);

        end.setDate(start.getDate() + 7);

        var timeMin = start.toISOString();
        var timeMax = end.toISOString();

        scheduleAPI.getData({timeMin: timeMin, timeMax: timeMax}).$promise.then(
            function (data) {
                var result = {
                    success: true,
                    days: [
                        {day: "Monday", events: []},
                        {day: "Tuesday", events: []},
                        {day: "Wednesday", events: []},
                        {day: "Thursday", events: []},
                        {day: "Friday", events: []}
                    ]
                };

                angular.forEach(data.items, function (value, key) {
                    var event = {
                        name: value.summary,
                        start: new Date(value.start.dateTime),
                        end: new Date(value.end.dateTime)
                    }

                    result.days[event.start.getDay() - 1].events.push(event);
                });


                $scope.events = result;
                $scope.todaysDay = new Date().getDay() - 1;
            },
            function (error) {
                var result = {
                    success: false
                };

                $scope.events = result;
            }
        );
    }]);

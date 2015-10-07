app.factory("scheduleAPI", function ($resource) {
    return $resource("https://www.googleapis.com/calendar/v3/calendars/" +
        "nuimsu.com_804lfpn1pf57fpo9ptgskc4hck%40group.calendar.google.com/events" +
        "?orderBy=startTime&singleEvents=true" +
        "&timeMax=:timeMax" +
        "&timeMin=:timeMin" +
        "&key=AIzaSyALf7xaEw2DTvlZe-H5u7Fq0wkloee16QM",
        {
            callback: "JSON_CALLBACK"
        },
        {
            getData: {
                method: "JSONP",
                isArray: false
            }
        });
    ;
});
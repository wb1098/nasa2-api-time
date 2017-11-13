//  JavaScript Document

// screen view code
$(document).ready(function () {

    $('#search').on('submit', function (event) {
        event.preventDefault();

        if ($('#start-date').val() === '' || $('#end-date').val() === '' || !getDaysBetweenDates($('#start-date').val(), $('#end-date').val())) {
            alert('You must enter a starting Date and an ending Date and only 7 days at a time!')
        }

        if (($('#start-date').val()) && ($('#end-date').val()) && (getDaysBetweenDates($('#start-date').val(), $('#end-date').val()))) {

            var postData = {
                startDate: $('#start-date').val(),
                endDate: $('#end-date').val(),
            }

            $.post('/search', postData, function (dataFromServer) {

                var displaySpot = new Vue({
                    el: '.displayText',
                    data: {
                        smallBodies: dataFromServer
                    }

                });
            })
        }
    })

    function getDaysBetweenDates(date1, date2) {
        var result = null;
        const oneDayMs = 1000 * 60 * 60 * 24;
        var firstDateMs = Date.parse(date1);
        var secondDateMs = Date.parse(date2);

        result = Math.abs((secondDateMs - firstDateMs) / oneDayMs);

        if (result < 7) {
            return (true);
        }

        return (false);

    }

})

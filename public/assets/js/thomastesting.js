$(document).ready(function () {
    // When submit button is pressed executes a POST request
    $('#message').on('submit', function () {
        // event.preventDefault();
        $.post('/api/message', {body: $('#body').val().trim()}, function () {
            $('#body').val('');
            window.location.reload();
        });
    });
    //unrolls paper when clicked
    $('.paper').on('click', function() {
        $(this).css("transition", "2s");
        $(this).css("transform", "rotate3d(1,0,0,0deg)");
        $(this).css("color", "black");
    });
    
    $('.close').on('click', function() {
        $('.paper').remove();
    })
});

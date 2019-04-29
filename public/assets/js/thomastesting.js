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
    $(document).on('click','.paper', function() {
        $(this).css("transition", "2s");
        $(this).css("transform", "rotate3d(1,0,0,0deg)");
        $(this).css("color", "black");
    });

    $('.bottle').on('click', function() {
        console.log($(this).attr('data-body'));
        var randomY = Math.floor(Math.random() * 200) + 400
        console.log(randomY);
        var randomX = Math.floor(Math.random() * 1920)
        $('#letter').append('<div class="paper"> <div class="row"> <div class="col s2 offset-s10 close">X</div> </div> <p>' + $(this).attr('data-body') + '</p> </div>');
    });
    
    $(document).on('click', '.close', function() {
        $('.paper').remove();
    });
});

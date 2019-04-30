$(document).ready(function () {
    const sound = new Audio()

    // When submit button is pressed executes a POST request
    $('#message').on('submit', function () {
        event.preventDefault();
        $.post('/api/message', { body: $('#body').val().trim() }, function () {
            $('#bottles').append('<img class="bottle" data-read="false" data-body="' + $('#body').val().trim() + '" style="top:' + (Math.floor(Math.random() * 100) + 750) + 'px; left: ' + (Math.floor(Math.random() * 1920)) + 'px" src="assets/images/bottle.png" alt="bottle">');
            $('#body').val('');
            // window.location.reload();
        });
    });
    var paperExist = false;

    $(document).on('click', '.close', function () {
        $('.paper').remove();
        paperExist = false;
    });

    //unrolls paper when clicked
    $(document).on('click', '.paper', function () {
        var paper = $(this);
        sound.src = 'assets/music/paperscroll.wav'
        sound.play()
        var msg = new SpeechSynthesisUtterance($(this).attr('data-body'));
        $(this).css("transition", "2s");
        $(this).css("transform", "rotate3d(1,0,0,0deg)");
        $(this).css("color", "black");
        setTimeout(function () {
            if (paper.attr('data-read') === 'false') {
                window.speechSynthesis.speak(msg);
                paper.attr('data-read', 'true');
            }
        }, 2000)

    });

    $(document).on('click', '.bottle', function () {
        if (paperExist === false) {
            $('#letter').append('<div class="paper" data-read="false" data-body="' + $(this).attr('data-body') + '"> <div class="row"> <div class="col s2 offset-s10 close">X</div> </div> <p>' + $(this).attr('data-body') + '</p> </div>');
            paperExist = true;
        }
    });
});

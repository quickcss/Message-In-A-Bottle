$(document).ready(function () {
	const sound = new Audio()

	const stolenWaves = {};

	stolenWaves.PI = Math.PI;
	stolenWaves.TAU = stolenWaves.PI * 2;

	stolenWaves.rand = function (min, max) {
		if (!max) {
			var max = min;
			min = 0;
		}
		return Math.random() * (max - min) + min;
	};

	stolenWaves.init = () => {
		stolenWaves.c = document.querySelector('canvas');
		stolenWaves.ctx = stolenWaves.c.getContext('2d');
		stolenWaves.simplex = new SimplexNoise();
		stolenWaves.events();
		stolenWaves.reset();
		stolenWaves.loop();
	};

	stolenWaves.reset = () => {
		stolenWaves.w = window.innerWidth;
		stolenWaves.h = window.innerHeight;
		stolenWaves.cx = stolenWaves.w / 2;
		stolenWaves.cy = stolenWaves.h / 2;
		stolenWaves.c.width = stolenWaves.w;
		stolenWaves.c.height = stolenWaves.h;
		stolenWaves.count = Math.floor(stolenWaves.w / 50);
		stolenWaves.xoff = 0;
		stolenWaves.xinc = 0.05;
		stolenWaves.yoff = 0;
		stolenWaves.yinc = 0.003;
		stolenWaves.goff = 0;
		stolenWaves.ginc = 0.003;
		stolenWaves.y = stolenWaves.h * 0.66;
		stolenWaves.length = stolenWaves.w + 10;
		stolenWaves.amp = 40;
	};

	stolenWaves.events = () => {
		window.addEventListener('resize', stolenWaves.reset.bind(this));
	};

	stolenWaves.wave = () => {
		stolenWaves.ctx.beginPath();
		let sway = stolenWaves.simplex.noise2D(stolenWaves.goff, 0) * stolenWaves.amp;
		for (let i = 0; i <= stolenWaves.count; i++) {
			stolenWaves.xoff += stolenWaves.xinc;
			let x = stolenWaves.cx - stolenWaves.length / 2 + (stolenWaves.length / stolenWaves.count) * i;
			let y = stolenWaves.y + stolenWaves.simplex.noise2D(stolenWaves.xoff, stolenWaves.yoff) * stolenWaves.amp + sway;
			stolenWaves.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
		}
		stolenWaves.ctx.lineTo(stolenWaves.w, stolenWaves.h);
		stolenWaves.ctx.lineTo(0, stolenWaves.h);
		stolenWaves.ctx.closePath();
		stolenWaves.ctx.fillStyle = 'hsla(210, 90%, 50%, 0.2)';
		stolenWaves.ctx.fill();
	};

	stolenWaves.loop = () => {
		requestAnimationFrame(stolenWaves.loop);
		stolenWaves.ctx.clearRect(0, 0, stolenWaves.w, stolenWaves.h);
		stolenWaves.xoff = 0;
		stolenWaves.wave();
		stolenWaves.wave();
		stolenWaves.wave();
		stolenWaves.wave();
		stolenWaves.yoff += stolenWaves.yinc;
		stolenWaves.goff += stolenWaves.ginc;
	};

	//Starts the waves
	stolenWaves.init();

	sound.src = 'assets/music/paperscroll.wav';

	$('#message').on('submit', function () {
		event.preventDefault();
		$.post('/api/message', { body: $('#body').val().trim() }, function (response) {
			$('#bottles').append('<img class="bottle" view-count="' + response.viewCount + '" data-id="' + response.id + '" data-read="false" data-body="' + $('#body').val().trim() + '" style="animation: float '+ (Math.random() * 1.5 + 3.5) +'s ease-in-out infinite; top:' + (Math.floor(Math.random() * 100) + 775) + 'px; left: ' + (Math.floor(Math.random() * 1920)) + 'px" src="assets/images/bottle.png" alt="bottle">');
			$('#body').val('');
		});
	});
	var paperExist = false;

	$(document).on('click', '.close', function () {
		sound.play();
		$('.paper').remove();
		paperExist = false;
	});

	$(document).on('click', '.paper', function () {
		var paper = $(this);
		var messageId = paper.attr('data-id');
		if (paper.attr('data-read') === 'false') {
			sound.play();
			updateViews(messageId);
			paper.attr('data-read', 'true');
			setTimeout(function () {
					window.speechSynthesis.speak(msg);
			}, 2000);
		}
		var msg = new SpeechSynthesisUtterance($(this).attr('data-body'));
		$(this).css("transition", "2s");
		$(this).css("transform", "rotate3d(1,0,0,0deg)");
		$(this).css("color", "black");

	});

	$(document).on('click', '.bottle', function () {
		if (paperExist === false) {
			var bottle = $(this);
			var messageId = bottle.attr('data-id')
			$('#letter').append('<div class="paper" data-id="' + $(this).attr('data-id') + '" data-read="false" data-body="' + $(this).attr('data-body') + '"> <div class="row"> <div class="col s2 offset-s10 close">X</div> </div> <p id="burrito">' + $(this).attr('data-body') + '</p> <p class="view-count">View Count: </p></div>');
			paperExist = true;
		}
	});

	function updateViews(id) {
		$.ajax({
			method: "PUT",
			url: "/api/message/viewcount",
			data: {
				id,
			}
		})
			.then(function (data) {
				console.log("Data: ", data)
				$('.view-count').text('View Count: ' + data.newViews)
			});
	};
});
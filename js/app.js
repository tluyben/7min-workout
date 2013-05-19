function ga() {}

document.addEventListener("deviceready",function() {

$(document).ready(function() {
	function ex() {
		var e, n, r, i;
		t.sounds.tick.play();
		if (t.current + 1 > t.exe.length) {
			if ($("#timer").css("font-size")=="200px") $("#timer").css("font-size", "100px");
			$("#timer").text("DONE");
			$("#picture").hide();
			$("#activity").hide();
			$("#balls").hide();
			return !0
		}
		e = Math.round((t.duration - t.rest.time * t.exe.length) / t.exe.length);
		n = Math.round(e / t.exe[t.current].split);
		r = t.rest.time;
		$("#picture").attr("src", "images/" + (t.current + 1) + ".png");
		$("#timer .nums").text(e);
		$("#activity").text(t.exe[t.current].name);
		i = window.setInterval(function() {
			if (e > 1) {
				e--;
				t.sounds.tick.play();
				e == n + 1 && t.sounds.swit.play();
				$("#timer .nums").text(e)
			} else if (r > 1) {
				r--;
				r == 9 && t.sounds.done.play();
				$("#ball" + (t.current - 1)).addClass("ball-fade");
				$("body, #timer, #image").removeClass("go").addClass("rest");
				$("#timer .nums").text(r);
				$("#activity").text(t.rest.name);
				$("#picture").hide();
				$("#next").text("(" + t.exe[t.current].name + ")").fadeIn()
			} else {
				clearInterval(i);
				ga("send", "section", "sections", "complete", "section", t.current);
				$("#picture").show();
				$("#next").fadeOut();
				$("body, #timer, #image").removeClass("rest").addClass("go");
				ex()
			}
		}, 1e3);
		t.current++
	}
	var e, t;
	$(".app").hide().removeClass("hidden");
	e = {
		duration: 480,
		rest: {
			name: "Rest",
			time: 10
		}
	};
	t = {
		duration: e.duration,
		rest: e.rest,
		current: 0,
		sounds: {
			tick: "tick.wav",
			done: "done.wav",
			swit: "switch.wav",
			init: function() {
				for (sound in this) if (sound != "load") {
					this[sound] = new Audio("sounds/" + this[sound]);
					this[sound].load()
				}
			}
		},
		exe: [{
			name: "Jumping Jacks"
		}, {
			name: "Wall Sit"
		}, {
			name: "Push-Up"
		}, {
			name: "Abdominal Crunch"
		}, {
			name: "Step-Up onto Chair",
			split: 2
		}, {
			name: "Squat"
		}, {
			name: "Triceps Dip on Chair"
		}, {
			name: "Plank"
		}, {
			name: "High Knees Running"
		}, {
			name: "Lunge",
			split: 2
		}, {
			name: "Push-up and Rotation",
			split: 2
		}, {
			name: "Side Plank",
			split: 2
		}]
	};
	for (i in t.exe) i > 0 && ($("<img/>")[0].src = "images/" + i + ".png");
	$(".duration").focus(function() {
		t.duration = $(this).val("");
		ga("send", "event", "general", "focus", "duration", !0)
	});
	$(".duration").keyup(function() {
		ga("send", "event", "general", "change", "duration", !0);
		ga("send", "event", "general", "change", "duration from", t.duration);
		$(this).val() > 1 ? t.duration = $(this).val() * 60 : t.duration = 420;
		ga("send", "event", "general", "change", "duration to", t.duration)
	});
	$(".start").click(function() {
		var e, n, r;
		t.sounds.init();
		ga("send", "event", "general", "click", "button", !0);
		ga("send", "event", "general", "select", "duration", t.duration);
		e = 3;
		$(".title-elements").slideUp();
		n = $(this).parents(".start-button");
		n.text(e);
		r = window.setInterval(function() {
			if (e > 0) {
				e--;
				n.text(e)
			} else clearInterval(e)
		}, 1e3);
		window.setTimeout(function() {
			n.hide();
			$(".app").fadeIn(500);
			for (i in t.exe) $("#balls.row-fluid").append("<div class='span1 ball' id='ball" + i + "'><img src='images/ball.png' /></div>");
			ex()
		}, 3e3);
		return !1
	})
});

}, false);

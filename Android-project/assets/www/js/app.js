function ga() {}

document.addEventListener("deviceready",function() {
if (loadedJS) return;

   window.plugins.tts.startup(speechStart, function(){});
   function speechStart() {
      
   
function onSuccess() {
}

function onError(error) {
alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
}
$(document).ready(function() {
	var storage = window.localStorage;
	
	var soundsOn = (storage.getItem("sounds"))?(storage.getItem("sounds")=="true"?"true":"false"):"true"; 
	var vibrateOn = (storage.getItem("vibrate"))?(storage.getItem("vibrate")=="true"?"true":"false"):"true"; 
	var speechOn = (storage.getItem("speech"))?(storage.getItem("speech")=="true"?"true":"false"):"true"; 
	
	$('#sounds').attr('checked', soundsOn=="true");
	$('#vibrate').attr('checked', vibrateOn=="true");
	$('#speech').attr('checked', speechOn=="true");
	
	$('#sounds').change(function() {
		soundsOn = $(this).is(":checked")?"true":"false";
		storage.setItem("sounds", soundsOn);
	});
	$('#vibrate').change(function() {
		vibrateOn = $(this).is(":checked")?"true":"false";
		storage.setItem("vibrate", vibrateOn);
	});
	$('#speech').change(function() {
		speechOn = $(this).is(":checked")?"true":"false";
		storage.setItem("speech", speechOn);
	});	
	function ex() {
		var e, n, r, i, oe;
		if (soundsOn=="true") t.sounds.tick.play();
		
		if (t.current + 1 > t.exe.length) {
			if ($("#timer").css("font-size")=="200px") $("#timer").css("font-size", "100px");
			$("#timer").text("DONE");
			if (speechOn == "true") window.plugins.tts.speak("You are done! Congratulations!", function() {}, function() {});
			$("#picture").hide();
			$("#activity").hide();
			$("#balls").hide();
			return !0
		}
		oe = e = Math.round((t.duration - t.rest.time * t.exe.length) / t.exe.length);
		n = Math.round(e / t.exe[t.current].split);
		r = t.rest.time;
		$("#picture").attr("src", "images/" + (t.current + 1) + ".png");
		$("#timer .nums").text(e);
		$("#activity").text(t.exe[t.current].name);
		i = window.setInterval(function() {
			if (e > 1) {
				if (oe == e) {
					if (speechOn == "true") window.plugins.tts.speak("You are doing "+t.exe[t.current-1].name, function() {}, function() {});
					if (vibrateOn=="true") navigator.notification.vibrate(1000);
				}
				
				e--;
				if (soundsOn=="true") t.sounds.tick.play();
				if (e == n+1) {
					if (soundsOn=="true") t.sounds.swit.play();
					if (vibrateOn=="true") navigator.notification.vibrate(1000);
				}
				$("#timer .nums").text(e)
			} else if (r > 1) {
				r--;
				if (r == 9) {
					if (soundsOn=="true") t.sounds.done.play();
					if (vibrateOn=="true") navigator.notification.vibrate(1000);
				}
				if (r == 8) {
					if (speechOn == "true") window.plugins.tts.speak("Get ready for "+t.exe[t.current].name, function() {}, function() {});
				}
				
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
				//if (vibrateOn=="true")  navigator.notification.vibrate(1000);
				
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
			tick: "tick",
			done: "done",
			swit: "switch",
			init: function() {
				/*for (sound in this) if (sound != "load") {
					this[sound] = new Audio("/assets/www/sounds/" + this[sound]);
					this[sound].load()
				}*/
				for (sound in this) if (sound != "load") {
					this[sound] = new Media("/android_asset/www/sounds/" + this[sound] +".mp3", onSuccess, onError);

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
	if (!loadedJS) $(".start").click(function() {
		var e, n, r;
		t.sounds.init();
		ga("send", "event", "general", "click", "button", !0);
		ga("send", "event", "general", "select", "duration", t.duration);
		e = 3;
		$('.options').hide();
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
	});
	loadedJS = true;
	
});
}

}, false);

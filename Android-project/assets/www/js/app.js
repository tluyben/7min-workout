function ga() {}

document.addEventListener("deviceready",function() {
if (loadedJS) return;

// on device suspend
var devicePaused = false; 
document.addEventListener("pause", function() {
	window.location.reload(true);

}, false);


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
	var pain = (storage.getItem("pain"))?storage.getItem("pain"):10; 
	
	$('#sounds').attr('checked', soundsOn=="true");
	$('#vibrate').attr('checked', vibrateOn=="true");
	$('#speech').attr('checked', speechOn=="true");
	$('#pain1').attr('checked', pain == 10); 
	$('#pain2').attr('checked', pain == 5); 
	
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
	
	$('#pain1').change(function() {
		if ($(this).is(":checked")) {
			pain = 10; 
			e.rest.time = pain;
			t.rest.time = pain;
			$('#pain2').attr('checked', false);
			storage.setItem("pain", pain); 
		}
	});
	$('#pain2').change(function() {
	
		if ($(this).is(":checked")) {
		
			pain = 5; 
			e.rest.time = pain;
			t.rest.time = pain;
			$('#pain1').attr('checked', false);
			storage.setItem("pain", pain); 
		}
		
	});
	

	
	var running = false; 
	var bound = false; 
	function ex() {
		running = true; 
		var e, n, r, i, oe;
		if (soundsOn=="true") t.sounds.tick.play();
		if (t.current + 1 > t.exe.length) {
			return !0;
		}
		//if (!bound) {

		//	bound = true; 		
		//}
				
		oe = e = 30; //Math.round((t.duration - t.rest.time * t.exe.length) / t.exe.length);
		n = Math.round(e / t.exe[t.current].split);
		r = t.rest.time;
		$("#picture").attr("src", "images/" + (t.current + 1) + ".png");
		$("#timer .nums").text(e);
		$("#activity").text(t.exe[t.current].name+" - "+(t.current+1)+"/"+t.exe.length);
		bound = false;
		i = window.setInterval(function() {
			if (!bound) {
				bound = true;
				//console.log("current: "+t.current);
				$("#goprev").unbind("click");
				$("#gonext").unbind("click");
				$("#goprev").click(function () {
					//console.log("currentp: "+t.current);
					t.current-=2; 
					if (t.current < 0) t.current = 0;
					e=0;
				}); 
				
				$("#gonext").click(function () {
					if (e<=0) r = 0; 
					e=0;
				}); 		
			}
			
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
			} else if (r > 0) {
					$(".pauseblock").hide();
					$("#goprev").unbind("click");
					$("#gonext").unbind("click");
					if (t.current + 1 > t.exe.length) {
						clearInterval(i);
						if ($("#timer").css("font-size")=="200px") $("#timer").css("font-size", "100px");
						$("#timer").text("DONE");
						
						if (speechOn == "true") window.plugins.tts.speak("You are done! Congratulations!", function() {}, function() {});
						$("#picture").hide();
						$("#activity").hide();
						//$("#balls").hide();
						return !0
					}
				$("#timer .nums").text(r);
				r--;
				if (r == t.rest.time-1) {
					if (soundsOn=="true") t.sounds.done.play();
					if (vibrateOn=="true") navigator.notification.vibrate(1000);
					$("#picture").attr("src", "images/" + (t.current+1) + ".png");
					$("#picture").show();
				}
				if (r == t.rest.time-2) {
					if (speechOn == "true") window.plugins.tts.speak("Get ready for "+t.exe[t.current].name+", Exercise number "+(t.current+1)+" of "+t.exe.length, function() {}, function() {});

				}
				
				$("#ball" + (t.current - 1)).addClass("ball-fade");
				$("body, #timer, #image").removeClass("go").addClass("rest");
				//$("#timer .nums").text(r);
				$("#activity").text(t.rest.name+" - "+(t.current+1)+"/"+t.exe.length);
				
				$("#next").text("(" + t.exe[t.current].name + ")").fadeIn()
			} else {
				clearInterval(i);
				ga("send", "section", "sections", "complete", "section", t.current);
				$("#picture").show();
				$("#next").fadeOut();
				$(".pauseblock").show();
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
		duration: 420,
		rest: {
			name: "Rest",
			time: pain
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
		var e, n, r, oe;
		t.sounds.init();
		ga("send", "event", "general", "click", "button", !0);
		ga("send", "event", "general", "select", "duration", t.duration);
		oe = e = 5;
		//e = t.rest.time;
		$('.options').hide();
		$('.pain').hide();
		$(".title-elements").slideUp();
		n = $(this).parents(".start-button");
		//$("#firstexpic").attr("src", "images/" + (t.current+1) + ".png");
		
		//n.text(e);
		r = window.setInterval(function() {
			
			n.text(e)
			e--;
			if (e==oe-1) {
				if (speechOn == "true") window.plugins.tts.speak("Get ready for "+t.exe[t.current].name+", Exercise number "+(t.current+1)+" of "+t.exe.length, function() {}, function() {});
				$("#firstex").show();
			} 
			if (e >= 0) {
				
			} else {
				$("#firstex").hide();
				clearInterval(r)
				n.hide();
				$(".app").fadeIn(500);
				//for (i in t.exe) $("#balls.row-fluid").append("<div class='span1 ball' id='ball" + i + "'><img src='images/ball.png' /></div>");
				$("#gopause").click(function () {
					alert("Paused! Click OK to continue.");
				}); 

				ex()
			}
		}, 1e3);
		/*window.setTimeout(function() {
			
		}, 1000*(t.rest.time));*/
		return !1
	});
	loadedJS = true;
	
});
}

}, false);

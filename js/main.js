function init() {
	Crafty.init(1280, 720);

	Crafty.sprite(1, "images/background/bluesky.png", { bluesky: [0,0]});
	Crafty.sprite(1, "images/background/pavement.png", { pavement: [0,0]});
	Crafty.sprite(1, "images/background/worldbuilding.png", { worldbuilding: [0,0]});
	Crafty.sprite(1, "images/text/nelliebly-title.png", { titletext: [0,0]});

	Crafty.scene("loading", function() {
		//load takes an array of assets and a callback when complete
		Crafty.load(["images/background/bluesky.png", "images/background/worldbuilding.png", "audio/music/grassy_world.ogg", "images/text/nelliebly-title.png"], function() {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});
		
		//black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
			.text("Loading")
			.css({"text-align": "center"});
	});

	//automatically play the loading scene
	Crafty.scene("loading");
	
	Crafty.scene("main", function() {
		Crafty.audio.add("titletheme", [
			"audio/music/grassy_world.ogg"
		]);
		Crafty.audio.add("typekey", [
			"audio/effects/typewriter_key.ogg"
		]);
		Crafty.audio.play("titletheme");

		Crafty.e("2D, DOM, Tween, bluesky")
			.attr({x: 0, y: 0, w: 1280, h: 2400})
			.timeout(function() {
				this.tween({y: -1000}, 2000);
			}, 10000);

		Crafty.e("2D, DOM, Tween, pavement")
			.attr({x: 0, y: 3900, w: 1438, h: 161})
			.timeout(function() {
				this.tween({y: 600}, 2500);
			}, 10000);

		Crafty.e("2D, DOM, Tween, worldbuilding")
			.attr({x: 80, y: 800, w: 1124, h: 3120})
			.timeout(function() {
				this.tween({y: -2500}, 2500);
			}, 10000);

		Crafty.e("2D, DOM, Tween, titletext")
			.attr({alpha: 0.0, x: 280, y: 100, w: 694, h: 240})
			.tween({alpha: 1.0}, 125)
			.timeout(function() {
				this.tween({alpha: 0.0}, 100);
			}, 8000);

		Crafty.e("2D, DOM, Tween, Typewriter").attr({w: 800, h: 20, x: 200, y: 280})
			.css({"text-align": "center", "font-family": "GNUTypewriter", "font-size": "40pt", "line-height": "1.6em", "color": "#bb0000"})
			.timeout(function() {
				this.write("In\nTrinity Tenements", "typekey", 200, 100);
			}, 3000)
			.timeout(function() {
				this.tween({alpha: 0.0}, 100);
			}, 8000);
	});
}

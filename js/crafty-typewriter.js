/*
 * Crafty Typewriter
 * Version 1.0
 *
 * Copyright 2012, Mike Sheldon <elleo@gnu.org>
 * Dual licensed under the MIT or GPL licenses.
 */

Crafty.c("Typewriter", {
	init : function() {
		this._l = 1
		this.addComponent("Delay");
		this.addComponent("Text");
	},

	/**@
	* #.write
	* @comp Typewriter
	* @sign public this.write(String sentence, String keysound, Number maxkeytime, Number minkeytime)
	* @param sentence - The string to write in the style of a typewriter, "\n" characters will be replaced with <br />s.
	* @param keysound - A sound to make when each letter is displayed.
	* @param maxkeytime - Maximum amount of time between key presses.
	* @param minkeytime - Minimum amount of time between key presses.
	* 
	* Writes out a string of text one character at a time in the style of a typewriter.
	*
	* If maxkeytime and minkeytime have different values then the amount of time
	* between key presses will be a randomised based on these two limits.
	* This allows for a more realistic simulation of typing.
	* 
	* @example
	* ~~~
	* Crafty.audio.add("typekey", [
	* 	"audio/effects/typewriter_key.ogg"
	* ]);
	* Crafty.e("2D, DOM, Typewriter").attr({w: 100, h: 20, x: 200, y: 280})
	* 	.write("Hello World!", "typekey", 200, 100);
	* ~~~
	*/
	write : function(sentence, keysound, maxkeytime, minkeytime) {
		keydiff = maxkeytime - minkeytime
		for(var i = 1 ; i < sentence.length + 1; i++) {
			this.delay(function() {
				if(sentence.substr(this._l - 1, this._l).match(/\n/)) {
					sentence = sentence.substr(0, this._l) + "<br />" + sentence.substr(this._l + 1, sentence.length - 1);
					this._l += 5;
				}
				Crafty.audio.play(keysound);
				this.text(sentence.substr(0, this._l));
				this._l++;
			}, i * maxkeytime - Math.random() * keydiff);
		}
	}
});

var memory_array = [ 
					'design/blue.jpg', 'design/blue.jpg',
					'design/gold.jpg', 'design/gold.jpg',
					'design/flawless.jpg', 'design/flawless.jpg',
					'design/queen.jpg', 'design/queen.jpg',
					'design/selfie.jpg', 'design/selfie.jpg',
					'design/sunglasses.jpg', 'design/sunglasses.jpg',
				   ];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var max_height=0;


$(document).ready(function(e){
	newBoard();
});

window.onresize=function(e) {
	$();
};

Array.prototype.memory_tile_shuffle = function() {
	var i = this.length, j, temp;
	while (--i > 0) {
		j = Math.floor(Math.random () * (i+1));
		temp = this [j];
		this [j] = this [i];
		this [i] = temp;
	}
};

function newBoard() {
	//shuffle
	memory_array.memory_tile_shuffle();
	
    var space = $("#memory_board");
	space.html('');
 
    var row = $("<div>").addClass("row").appendTo(space);
 
    // loop over the set of images
    for (i = 0; i < memory_array.length; i++) {
        // create an image html tag
        var tile = $("<img>");
 
        //
        tile.attr("src", 'design/card-backs.jpg');
		tile.attr("id", 'card' + i);
 
        tile.addClass("col-xs-4 col-md-3").addClass("img-responsive").addClass("game-images");
		tile.click ({val:memory_array[i]},memoryFlipTile);
 
        row.append(tile);
    }
    console.log(space);
}

function memoryFlipTile(e) {
	var tile = this;
	var val = e.data.val;
	if(tile.innerHTML === "" && memory_values.length < 2) {
		tile.src = val;
		if (memory_values.length === 0) {
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1) {
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]) {
				tiles_flipped += 2;
				memory_values = [];
				memory_tile_ids = [];
				if (tiles_flipped == memory_array.length) {
					alert ("YOU'RE FLAWLESS");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back() {
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.src = 'design/card-backs.jpg';
					tile_2.src = 'design/card-backs.jpg';
					memory_values = [];
					memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

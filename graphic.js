"use strict";
//alert("we");
var lastId = -1;
var id = -1;
var imgs = [];
var graphicBoard = new Board();
var engine = new ComputerEngine(graphicBoard, Colors.Black);
graphicBoard.updateMoves();
var color = Colors.White;

var playingAgainstComputer = true;
var computerColor = Colors.Black;
function goBack() {

	graphicBoard = clones.pop();
	for (var x = 0; x < 64; x++) {
		imgs[x].src = graphicBoard.squares[x].getAsset();
	}
}
function main() {
	//alert(getStringValue(30));
	for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			var img = document.getElementById(getStringValueXY(x, y));
			imgs[y * 8 + x] = img;
			img.title=y * 8 + x;
		}
	}
}
main();
var promotionPiece = undefined;
var isEnabled = true;
var clones = [];
function specialMove(start, dest) {
	if (graphicBoard.squares[dest].piece.kind == Pieces.King) {
		if (dest == 6) {
			var rook = graphicBoard.squares[7].piece;
			graphicBoard.squares[5].piece = rook;
			graphicBoard.squares[7].piece = undefined;
			imgs[5].src = imgs[7].src;
			imgs[7].src = "assets\\empty.png";
		}
		else if (dest == 2) {
			var rook = graphicBoard.squares[0].piece;
			graphicBoard.squares[3].piece = rook;
			graphicBoard.squares[0].piece = undefined;
			imgs[3].src = imgs[0].src;
			imgs[0].src = "assets\\empty.png";
		}
		else if (dest == 62) {
			var rook = graphicBoard.squares[7].piece;
			graphicBoard.squares[61].piece = rook;
			graphicBoard.squares[63].piece = undefined;
			imgs[61].src = imgs[63].src;
			imgs[63].src = "assets\\empty.png";
		}
		else if (dest == 58) {
			var rook = graphicBoard.squares[56].piece;
			graphicBoard.squares[59].piece = rook;
			graphicBoard.squares[56].piece = undefined;
			imgs[59].src = imgs[56].src;
			imgs[56].src = "assets\\empty.png";
		}
	}
	else if (graphicBoard.squares[dest].piece.kind == Pieces.Pawn) {
		if (dest > 55) {
			var dialog = document.getElementById("promoteDialog");
			dialog.style.display = "inline";
			promotionPiece = graphicBoard.squares[dest].piece;
			isEnabled = false;
		}
	}
}
function promote(kind) {
	switch (kind) {
		case 0:
			promotionPiece.kind = Pieces.Queen;
			break;
		case 1:
			promotionPiece.kind = Pieces.Rook;
			break;
		case 2:
			promotionPiece.kind = Pieces.Bishop;
			break;
		case 3:
			promotionPiece.kind = Pieces.Knight;
			break;
	}
	imgs[promotionPiece.pos].src = promotionPiece.getAsset();
	isEnabled = true;
	promotionPiece = undefined;
	var dialog = document.getElementById("promoteDialog");
	dialog.style.display = "none";
	graphicBoard.updateMoves();
}
function doClick(obj,ev) {
	if (!isEnabled) return;
	id = (getIntegerValue(obj.id));
	if (lastId == -1) {
		if (graphicBoard.squares[id].piece == undefined) return;
		lastId = id;
	}
	else {
		var cloned = graphicBoard.clone();
		clones.push(graphicBoard);
		cloned.updateMoves();
		var possible = cloned.squares[lastId].piece.possibleMoves[id];
		if (possible == 1 || possible == 2) {
			var piece = cloned.squares[lastId].piece;
			cloned.squares[lastId].piece = undefined;
			cloned.squares[id].piece = piece;
			piece.pos = id;
			piece.hasMoved = true;
			cloned.updateMoves();
			if (cloned.isKingCheck(piece.color)) {
				return;
			}

			var last = imgs[lastId].src;
			imgs[lastId].src = "assets\\empty.png";
			imgs[id].src = last;

			graphicBoard = cloned;

			specialMove(lastId, id);
			color = colorOpposite(color);

			engine.board = graphicBoard;
			graphicBoard.updateMoves();
			if (playingAgainstComputer) {
				computerMove();
			}
			else{
				color=colorOpposite(color);
			}

		}

		lastId = -1;
	}

}
function computerMove() {
	var move = engine.think(computerColor, computerColor, graphicBoard, 0, null, -10000, +10000);
	var temp = graphicBoard.squares[move.start].piece;
	graphicBoard.squares[move.start].piece = graphicBoard.squares[move.dest].piece;
	graphicBoard.squares[move.dest].piece = temp;

	temp.pos = move.dest;
	temp.hasMoved = true;
	var last = imgs[move.start].src;
	imgs[move.start].src = "assets\\empty.png";
	imgs[move.dest].src = last;
	graphicBoard.updateMoves();
}
function debugClick(obj,ev) {
	
	  
	//let outDiv=document.getElementById("outputDiv");
	//outDiv.innerText=JSON.stringify(graphicBoard,getCircularReplacer,2);
	if(lastId==-1){
		lastId= (getIntegerValue(obj.id));return;
	}
	else{
		let id=(getIntegerValue(obj.id));
		let move=new Move(graphicBoard.squares[lastId].piece,lastId,id,graphicBoard);
		engine.rateMove(move,graphicBoard);
		let outDiv=document.getElementById("outputDiv");
		console.log(move.extendedRating)
		outDiv.innerText=JSON.stringify(move.extendedRating,null,2);
		lastId=-1;
	}
	return false;
}
function save() {
	var res = "";
	for (var i = 0; i < 64; i++) {
		var square = graphicBoard.squares[i];
		var kind = "-";
		if (square.piece != undefined) {
			switch (square.piece.kind) {
				case Pieces.Pawn:
					kind = "P"; break;
				case Pieces.Rook:
					kind = "R"; break;
				case Pieces.Knight:
					kind = "N"; break;
				case Pieces.Bishop:
					kind = "B"; break;
				case Pieces.King:
					kind = "K"; break;
				case Pieces.Queen:
					kind = "Q"; break;
			}
			if (square.piece.color == Colors.Black) {
				kind = kind.toLowerCase();
			}

		}
		res += kind;

	}
	window.localStorage.setItem("board", res);

}
function load() {

	var res = window.localStorage.getItem("board");
	for (var i = 0; i < 64; i++) {
		var ch = res.charAt(i);
		var sq = graphicBoard.squares[i];
		if (ch == '-') {
			sq.piece = undefined;
		}
		else {
			var col = ch.toLowerCase() == ch ? Colors.Black : Colors.White;
			ch = ch.toUpperCase();
			var kind = 0;
			switch (ch) {
				case 'P':
					kind = Pieces.Pawn; break;
				case 'R':
					kind = Pieces.Rook; break;
				case 'N':
					kind = Pieces.Knight; break;
				case 'B':
					kind = Pieces.Bishop; break;
				case 'K':
					kind = Pieces.King; break;
				case 'Q':
					kind = Pieces.Queen; break;
			}
			sq.piece = new Piece(kind, col);

		}


	}
	graphicBoard.updateMoves();
	Board.showBoard(graphicBoard);
}
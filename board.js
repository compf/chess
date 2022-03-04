"use strict";

class Piece {
    constructor(kind, color) {
        this.kind = kind;
        this.preservedId = ++UID;
        this.color = color;
        this.possibleMoves = [];
        this.pos = 0;
        this.hasMoved = false;
        this.clone = function () {
            let p = new Piece(this.kind, this.color);
            p.color = this.color;
            p.kind = this.kind;
            p.preservedId = this.preservedId;
            p.hasMoved = this.hasMoved;
            p.pos = this.pos;
            return p;
        };
        this.equals = function (p) {
            return this === p || this.preservedId === p.preservedId;
        };
        this.getPieceBaseValue = function () {
            switch (this.kind) {
                case Pieces.Pawn: return 10;
                case Pieces.Rook: return 50;
                case Pieces.Knight:
                case Pieces.Bishop: return 30;
                case Pieces.Queen: return 90;
                case Pieces.King: return 0;
            }
            return 0;
        };
        this.toString = function () {
            let ret = "";
            switch (this.kind) {
                case Pieces.Pawn:
                    ret = "B";
                    break;
                case Pieces.Rook:
                    ret = "T";
                    break;
                case Pieces.Knight:
                    ret = "S";
                    break;
                case Pieces.Bishop:
                    ret = "L";
                    break;
                case Pieces.King:
                    ret = "K";
                    break;
                case Pieces.Queen:
                    ret = "D";
                    break;
            }
            if (this.color === Pieces.Colors.Black) {
                ret = ret.toLowerCase();
            }
            return ret;
        };
        this.getAsset = function () {
            if (this.color === Colors.White) {
                if (this.kind === Pieces.Pawn)
                    return "assets\\WBauer.png";
                if (this.kind === Pieces.Rook)
                    return "assets\\WTurm.png";
                if (this.kind === Pieces.Knight)
                    return "assets\\WSpringer.png";
                if (this.kind === Pieces.Bishop)
                    return "assets\\WLaeufer.png";
                if (this.kind === Pieces.King)
                    return "assets\\WKoenig.png";
                if (this.kind === Pieces.Queen)
                    return "assets\\WDame.png";
            }
            else {
                if (this.kind === Pieces.Pawn)
                    return "assets\\SBauer.png";
                if (this.kind === Pieces.Rook)
                    return "assets\\STurm.png";
                if (this.kind === Pieces.Knight)
                    return "assets\\SSpringer.png";
                if (this.kind === Pieces.Bishop)
                    return "assets\\SLaeufer.png";
                if (this.kind === Pieces.King)
                    return "assets\\SKoenig.png";
                if (this.kind === Pieces.Queen)
                    return "assets\\SDame.png";
            }
            return "assets\\empty.png";
        };
    }
}

class Square {
    constructor(x, y, piece, board) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        if (piece !== undefined) {
            board.pieces.push(piece);
            piece.pos = y * 8 + x;
        }
        this.getAsset = function () {
            if (this.piece === undefined)
                return "assets\\empty.png";
            else
                return this.piece.getAsset();
        };
        this.attacking = [];
        this.getAttackingValue = function (color, countOnly) {
            let result = 0;
            for (let p of this.attacking) {
                if (p.color !== color)
                    continue;
                if (countOnly)
                    result++;
                else
                    result += p.getPieceBaseValue();
                if(isDebug(boardDebugHelper,getIndexValue(this.x,this.y),p.pos)){
                    console.log(p);
                }
            }
            return result;
        };
        
    }
}
class MoveScore{
    constructor(){
    this.pieceBaseValue={start:0,dest:0};
       this.positionValue={start:0,dest:0};
       this.factors={start:0,dest:0};
       this.attackedValue={start:0,dest:0};
       this.score=0;
    }

    toString(){
     var res="me\tenemy\n";
     res+=this.pieceBaseValue.start+"\t"+this.pieceBaseValue.dest+"\n";
     res+=this.positionValue.start+"\t"+this.positionValue.dest+"\n";
     res+=(Pieces.getStringValue(this.move.start)+"\t"+Pieces.getStringValue(this.move.dest)+"\n");
     res+="rating="+this.score;
     return res;
    }
   }
class Move {
    constructor(p, a, b, board) {
        this.piece = p;
        this.start = a;
        this.dest = b;
        this.board = board;
        this.rating = 0;
        this.extendedRating=new MoveScore();
    }
}
const shareHelper=true;
const boardDebugHelper={
    start:0,
    dest:35,
    enabled:true
};
function isDebug(helper,start,dest){
    if(helper.enabled)
    {
        if((helper.start==start || start==null) && (helper.dest==dest || helper.dest==null)){
            return true;
        }
        //console.log(rating.toString());
    }
    return false;
}

class Board {
    constructor() {
        this.id = UID++;
        this.squares = [];
        this.pieces = [];
        this.move = function (from, to) {
            this.squares[to].piece = this.squares[from].piece;
            this.squares[from].piece = undefined;
            this.updateMoves(false);
        };
        this.init = function () {
            // Add all squares with their respective pieces
            this.squares.push(new Square(0, 0, new Piece(Pieces.Rook, Colors.White), this));
            this.squares.push(new Square(1, 0, new Piece(Pieces.Knight, Colors.White), this));
            this.squares.push(new Square(2, 0, new Piece(Pieces.Bishop, Colors.White), this));
            this.squares.push(new Square(3, 0, new Piece(Pieces.Queen, Colors.White), this));
            this.squares.push(new Square(4, 0, new Piece(Pieces.King, Colors.White), this));
            this.squares.push(new Square(5, 0, new Piece(Pieces.Bishop, Colors.White), this));
            this.squares.push(new Square(6, 0, new Piece(Pieces.Knight, Colors.White), this));
            this.squares.push(new Square(7, 0, new Piece(Pieces.Rook, Colors.White), this));
            this.squares.push(new Square(0, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(1, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(2, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(3, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(4, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(5, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(6, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(7, 1, new Piece(Pieces.Pawn, Colors.White), this));
            this.squares.push(new Square(0, 2, undefined, this));
            this.squares.push(new Square(1, 2, undefined, this));
            this.squares.push(new Square(2, 2, undefined, this));
            this.squares.push(new Square(3, 2, undefined, this));
            this.squares.push(new Square(4, 2, undefined, this));
            this.squares.push(new Square(5, 2, undefined, this));
            this.squares.push(new Square(6, 2, undefined, this));
            this.squares.push(new Square(7, 2, undefined, this));
            this.squares.push(new Square(0, 3, undefined, this));
            this.squares.push(new Square(1, 3, undefined, this));
            this.squares.push(new Square(2, 3, undefined, this));
            this.squares.push(new Square(3, 3, undefined, this));
            this.squares.push(new Square(4, 3, undefined, this));
            this.squares.push(new Square(5, 3, undefined, this));
            this.squares.push(new Square(6, 3, undefined, this));
            this.squares.push(new Square(7, 3, undefined, this));
            this.squares.push(new Square(0, 4, undefined, this));
            this.squares.push(new Square(1, 4, undefined, this));
            this.squares.push(new Square(2, 4, undefined, this));
            this.squares.push(new Square(3, 4, undefined, this));
            this.squares.push(new Square(4, 4, undefined, this));
            this.squares.push(new Square(5, 4, undefined, this));
            this.squares.push(new Square(6, 4, undefined, this));
            this.squares.push(new Square(7, 4, undefined, this));
            this.squares.push(new Square(0, 5, undefined, this));
            this.squares.push(new Square(1, 5, undefined, this));
            this.squares.push(new Square(2, 5, undefined, this));
            this.squares.push(new Square(3, 5, undefined, this));
            this.squares.push(new Square(4, 5, undefined, this));
            this.squares.push(new Square(5, 5, undefined, this));
            this.squares.push(new Square(6, 5, undefined, this));
            this.squares.push(new Square(7, 5, undefined, this));
            this.squares.push(new Square(0, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(1, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(2, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(3, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(4, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(5, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(6, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(7, 6, new Piece(Pieces.Pawn, Colors.Black), this));
            this.squares.push(new Square(0, 7, new Piece(Pieces.Rook, Colors.Black), this));
            this.squares.push(new Square(1, 7, new Piece(Pieces.Knight, Colors.Black), this));
            this.squares.push(new Square(2, 7, new Piece(Pieces.Bishop, Colors.Black), this));
            this.squares.push(new Square(3, 7, new Piece(Pieces.Queen,Colors. Black), this));
            this.squares.push(new Square(4, 7, new Piece(Pieces.King,Colors. Black), this));
            this.squares.push(new Square(5, 7, new Piece(Pieces.Bishop, Colors.Black), this));
            this.squares.push(new Square(6, 7, new Piece(Pieces.Knight, Colors.Black), this));
            this.squares.push(new Square(7, 7, new Piece(Pieces.Rook, Colors.Black), this));
            this.whiteKing = this.squares[4].piece;
            this.blackKing = this.squares[60].piece;
            let deb = 4;
        };
        const justMoving = 2;
        const practical = 1;
        const impossible = 0;
        const theoretical = -1;
        this.checkCastling = function (color, dest) {
            let rook = null;
            let king = null;
            switch (color) {
                case Colors.White:
                    king = this.whiteKing;
                    if (dest === 6) {
                        rook = this.squares[7].piece;
                        if (rook === undefined)
                            return false;
                        if (!king.hasMoved && !rook.hasMoved && this.squares[5].piece === undefined && this.squares[6].piece === undefined &&
                            this.squares[5].getAttackingValue(Colors.Black, true) === 0 && this.squares[4].getAttackingValue(Colors.Black, true) === 0) {
                            return true;
                        }
                    }
                    else if (dest === 2) {
                        rook = this.squares[0].piece;
                        if (rook === undefined)
                            return false;
                        if (!king.hasMoved && !rook.hasMoved && this.squares[3].piece === undefined && this.squares[1].piece === undefined &&
                            this.squares[3].getAttackingValue(Colors.Black, true) === 0 && this.squares[2].getAttackingValue(Colors.Black, true) === 0) {
                            return true;
                        }
                    }
                    break;
                case Pieces.Black:
                    king = this.blackKing;
                    if (dest === 62) {
                        rook = this.squares[63].piece;
                        if (rook === undefined)
                            return false;
                        if (!king.hasMoved && !rook.hasMoved && this.squares[61].piece === undefined && this.squares[62].piece === undefined &&
                            this.squares[61].getAttackingValue(Colors.White, true) === 0 && this.squares[60].getAttackingValue(Colors.White, true) === 0) {
                            return true;
                        }
                    }
                    else if (dest === 58) {
                        rook = this.squares[56].piece;
                        if (rook === undefined)
                            return false;
                        if (!king.hasMoved && !rook.hasMoved && this.squares[59].piece === undefined && this.squares[57].piece === undefined &&
                            this.squares[59].getAttackingValue(Colors.White, true) === 0 && this.squares[58].getAttackingValue(Colors.White, true) === 0) {
                            return true;
                        }
                    }
                    break;
            }
        };
        this.checkMove = function (piece, i, checkCheck = true) {
            let dist = (i - piece.pos);
            let distAbs = Math.abs(dist);
            let rowDist = getRow(i) - getRow(piece.pos);
            let colDist = getCol(i) - getCol(piece.pos);
            let result=impossible;
            if(isDebug(boardDebugHelper,piece.pos,i)){
                let a=40;
            }
           
            
            else if (piece.pos === i)
                return impossible;
            /*if(this.isKingCheck(piece.color)){
                let clone=this.clone();
               clone.squares[piece.pos].piece =clone.squares[i].piece;
               clone.squares[i].piece=piece;
               clone.updateMoves(false);
               if(clone.isKingCheck(piece.color))return impossible;
            }*/
            //debug helper
            
            switch (piece.kind) {
                case Pieces.Pawn:
                    if (Math.abs(rowDist) > 2 || Math.abs(colDist) > 1)
                        return impossible;
                    if (piece.color === Colors.White) {
                        // one or two step forward
                        if (dist === 8 && this.squares[i].piece === undefined || dist === 16 && !piece.hasMoved && this.squares[piece.pos + 8].piece === undefined) {
                            result= justMoving;
                        } // Attacking an existing pice diagonally
                        else if ((dist === 9 || dist === 7) && this.squares[i].piece !== undefined) {
                            result= practical;
                        } // Atacking a square without piece
                        else if ((dist === 9 || dist === 7)) {
                            result= theoretical;
                        }
                    }
                    else {
                        if (dist === -8 && this.squares[i].piece === undefined || dist === -16 && !piece.hasMoved && this.squares[piece.pos - 8].piece === undefined) {
                            result= justMoving;
                        }
                        else if ((dist === -9 || dist === -7) && this.squares[i].piece !== undefined) {
                            result= practical;
                        }
                        else if ((dist === -9 || dist === -7)) {
                            result= theoretical;
                        }
                    }
                    break;
                case Pieces.Rook:
                    if (colDist === 0 && rowDist !== 0 || colDist !== 0 && rowDist === 0) {
                        let steps = calculateVector(rowDist, colDist, piece.kind);
                        for (let x = piece.pos + steps; x !== i; x += steps) {
                            //check every square if it's occupied
                            if (this.squares[x].piece !== undefined && x !== i)
                            return impossible
                        }
                        result= practical;
                    }
                    break;
                case Pieces.Knight:
                    if (rowDist === 2 && colDist === 1 || rowDist === 2 && colDist === -1 || rowDist === 1 && colDist === 2 || rowDist === -1 && colDist === 2 ||
                        rowDist === 1 && colDist === -2 || rowDist === -1 && colDist === -2 || rowDist === -2 && colDist === 1 || rowDist === -2 && colDist === -1) {
                            result= practical;
                    }
                    break;
                case Pieces.Bishop:
                    if (Math.abs(rowDist) === Math.abs(colDist)) {
                        let steps = calculateVector(rowDist, colDist, piece.kind);
                        for (let x = piece.pos + steps; x !== i; x += steps) {
                            if (this.squares[x].piece !== undefined && x !== i)
                                return impossible;
                        }
                        result= practical;
                    }
                    break;
                case Pieces.Queen:
                    if (colDist === 0 && rowDist !== 0 || colDist !== 0 && rowDist === 0 || Math.abs(rowDist) === Math.abs(colDist)) {
                        let steps = calculateVector(rowDist, colDist, piece.kind);
                        for (let x = piece.pos + steps; x !== i; x += steps) {
                            if (this.squares[x].piece !== undefined && x !== i)
                                return impossible;
                        }
                        result= practical;
                    }
                case Pieces.King:
                    if (dist === 1 || dist === -1 || dist === 8 || dist === -8 || dist === -7 || dist === 7 || dist === 9 || dist === -9)
                        result= practical;
                    break;
            }
            if (this.squares[i].piece !== undefined && this.squares[i].piece.color === piece.color && result!=impossible) {
                result= theoretical;
                //prevent moving to same position
            }
            return result;
        };
        function calculateVector(rowDist, colDist, kind) {
            if (kind === Pieces.Bishop || kind === Pieces.Queen) {
                if (rowDist > 0 && colDist > 0)
                    return 9;
                else if (rowDist > 0 && colDist < 0)
                    return 7;
                else if (rowDist < 0 && colDist > 0)
                    return -7;
                else if (rowDist < 0 && colDist < 0)
                    return -9;
            }
            if (kind === Pieces.Rook || kind === Pieces.Queen) {
                if (rowDist > 0 && colDist === 0)
                    return 8;
                else if (rowDist < 0 && colDist === 0)
                    return -8;
                else if (rowDist === 0 && colDist > 0)
                    return 1;
                else if (rowDist === 0 && colDist < 0)
                    return -1;
            }
        }
        this.clone = function () {
            let board = new Board();
            board.pieces = [];
            for (let x = 0; x < 64; x++) {
                //board.squares[x]=this.squares[x];
                if (this.squares[x].piece !== undefined) {
                    let p = this.squares[x].piece.clone();
                    board.squares[x].piece = p;
                    board.pieces.push(p);
                    if (p.color === Colors.White && p.kind === Pieces.King)
                        board.whiteKing = p;
                    if (p.color === Colors.Black && p.kind === Pieces.King)
                        board.blackKing = p;
                }
                else
                    board.squares[x].piece = undefined;
            }
            return board;
        };
        this.toString = function () {
            let result = "  ";
            for (let c = 0; c < 8; c++) {
                result += (xCoordinates[c]);
            }
            result += "\n ";
            for (c = 0; c < 8; c++) {
                result += "-";
            }
            result += "\n";
            for (let i = 0; i < 64; i++) {
                let col = getCol(i);
                if (col === 0) {
                    result += (getRow(i) + 1) + "|";
                }
                if (this.squares[i].piece === undefined) {
                    result += " ";
                }
                else {
                    result += this.squares[i].piece.toString();
                }
                if (col === 7) {
                    result += "\n";
                }
            }
            return result;
        };
        this.moves = [];
        this.isKingCheck = function (col) {
            if (col === Pieces.White && this.squares[this.whiteKing.pos].getAttackingValue(Colors.Black, true) > 0)
                return true;
            if (col === Pieces.Black && this.squares[this.blackKing.pos].getAttackingValue(Colors.Black, true) > 0)
                return true;
            return false;
        };
        this.updateMoves = function (checkCheck = true) {
            this.moves = [];
            this.pieces = [];
            for (let p = 0; p < 64; p++) {
                if (this.squares[p].piece !== undefined) {
                    this.squares[p].piece.pos=p;
                    this.pieces.push(this.squares[p].piece);
                }
            }
            for (let d = 0; d < 64; d++) {
                this.squares[d].attacking.length = 0;
            }
            for (let piece of this.pieces) {
                for (let i = 0; i < 64; i++) {
                   
                    piece.possibleMoves[i] = this.checkMove(piece, i, checkCheck);
                    if (piece.possibleMoves[i] === practical || piece.possibleMoves[i] === theoretical) {
                        this.squares[i].attacking.push(piece);
                    }
                    if (piece.possibleMoves[i] === practical || piece.possibleMoves[i] === justMoving) {
                        this.moves.push(new Move(piece, piece.pos, i, this));
                    }
                }
            }
            for (let wh = 0; wh < 64; wh++) {
                remove(this.squares[wh].attacking, this.whiteKing);
            }
            for (let bl = 0; bl < 64; bl++) {
                remove(this.squares[bl].attacking, this.whiteKing);
            }
            if (!this.whiteKing.hasMoved && this.checkCastling(Colors.White, 6)) {
                this.whiteKing.possibleMoves[6] = justMoving;
            }
            else if (!this.whiteKing.hasMoved && this.checkCastling(Colors.White, 2)) {
                this.whiteKing.possibleMoves[2] = justMoving;
            }
            else if (!this.blackKing.hasMoved && this.checkCastling(Colors.Black, 62)) {
                this.blackKing.possibleMoves[62] = justMoving;
            }
            else if (!this.blackKing.hasMoved && this.checkCastling(Colors.Black, 58)) {
                this.blackKing.possibleMoves[58] = justMoving;
            }
            let deb = 4.7;
        };
        this.init();
    }
}
Board.showBoard = null;

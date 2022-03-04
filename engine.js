"use strict";
function scalarProduct(arr1, arr2) {
    if (arr1.length !== arr2.length) return 0;
    let result = 0;
    for (let i = 0; i < arr1.length; i++) {
        result += (arr1[i] * arr2[i]);
    }
    return result;
}
var con="";
class Tree
{
    left=null;
    right=null;
    data=null;
    constructor(d)
    {
       this.data=d;
    }
    print(level)
    {
       
        if(level==undefined)level=0;
        this.printMultiple("  ",level*1);
        con+=this.data;
        con+="\n";
        if(this.left!=null)
        {
            this.left.print(level+1);
          
        }
        if(this.right!=null)
        {
            this.right.print(level+1);
        }
        concolor
        if(this.left==null  && this.right==null)
        {
            return -1;
        }
        var left=this.left.calculateDepth();
        var right=this.right.calculateDepth();
        return 1+ Math.max(left,right);
    }
    printLevel(tree,level,spaces)
    {
        if(level==0)
        {
            this.printMultiple(" ",spaces);
            if(tree!=null)con+=tree.data;
            else con+=" ";
            this.printMultiple(" ",spaces);
        }
        else
        {
            if(tree!=null && tree.left!=null)
            {
                this.printLevel(tree.left,level-1,spaces);
            }
            else
            {
                this.printLevel(null,level-1,spaces);
            }
            if(tree!=null && tree.right!=null)
            {
                this.printLevel(tree.right,level-1,spaces);
            }
            else
            {
                this.printLevel(null,level-1,spaces);
            }
        }
    }
    spaces(level)
    {
        if(level==1)return 2;
        return 2*this.spaces(level-1)+1;
    }

}
/*
       2
       / \
      /   \
     /     \
    1       3
   / \     / \
  0   7   9   1
 /   / \     / \
2   1   0   8   8
       
      
*/
function testTree()
{
    
   var root=new Tree("0002");
   var L=root.left=new Tree("0001");
   var R=root.right=new Tree("0003");
   
   var L_L=L.left=new Tree("0000");
   var L_R=L.right=new Tree("0007");
   var R_L=R.left=new Tree("0009");
   var R_R=R.right=new Tree("0001");

   var L_L_L=L_L.left=new Tree("0002");
   var L_L_R=L_L.right=new Tree("0010");
   var L_R_L=L_R.left=new Tree("0001");
   var L_R_R=L_R.right=new Tree("0000");
   
   var R_L_L=L_L.left=new Tree("0008");
   var R_L_R=L_L.right=new Tree("0015");
   var R_R_L=L_R.left=new Tree("0020");
   var R_R_R=L_R.right=new Tree("0074");
   //root.print();
}
//testTree();
//throw new Error();
let whitePawn = [100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 50, 50, 35, 30, 0, 100, 100, 40, 50, 50, 35, 30, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0,];
let blackPawn = [0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 30, 35, 50, 50, 40, 100, 100, 0, 30, 35, 50, 50, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100,];
let knight = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let bishop = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let queen = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let whiteKing = [0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30,];
let blackKing = [30, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0,];
let rook = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
const MAXDEPTH = 6;

const engineDebughelper=shareHelper?boardDebugHelper:{
    enabled:true,
    start:44,
    dest:null
}
class ComputerEngine {


    constructor(board) {
        this.board = board;

        this.observedPiece = undefined;

    }
    sortFactor=+1;
    insertionSort()
    {
        for(var i=1;i<this.board.moves.length;i++)
        {
            var val=sortFactor*this.board.moves[i];
            var j=i;
            while(j>0 && this.board.moves[j-1].rating>this.sortFactor*val.rating)
            {
                this.board.moves[j]= this.board.moves[j-1];
                j--;
            }
            this.board.moves[j]=val;
        }
    }
    rateAllMoves()
    {
        for(var mv of this.board.moves)
        {
            this.rateMove(mv,this.board);
        }
    }
    findMinMax(board, color, orgColor) {
        board.updateMoves();
        this.rateAllMoves();
        let max = color === orgColor|true;
        const factor=max?-1:+1;
        var index=0;
        var result=[0,null,0,null];
        calc.shallLog = false;
        board.moves.sort((o1,o2)=>max?o2.rating-o1.rating:o1.rating-o2.rating);
        for(let i=0;i<board.moves.length;i++)
        {
            if(board.moves[i].piece.color!=color)continue;
            result[index++]=board.moves[i].rating;
            result[index++]=board.moves[i];
            if(index>3)return result;

        }
        return null;
    }
    think(color, originalColor, board, depth,tree,alpha,beta) {
    

        let bestMoves = this.findMinMax(board, color, originalColor);
        let maxScore = bestMoves[0];
        let maxMove = bestMoves[1];
        let scndMaxScore = bestMoves[2];
        let scndMaxMove = bestMoves[3];
        if(tree==null || tree==undefined)
        {
            tree=new Tree("0000");
        }
        tree.left=new Tree((getStringValue(maxMove.start)+getStringValue(maxMove.dest)));
        tree.right=new Tree((getStringValue(scndMaxMove.start)+getStringValue(scndMaxMove.dest)));

        let board1 = board.clone();
        let board2 = board.clone();
        board1.move(maxMove.start, maxMove.dest);

        board2.move(scndMaxMove.start, scndMaxMove.dest);

        let s1 = this.rateBoard(board1, color);
        let s2 = this.rateBoard(board2, color);
        let result=null;
        if (depth >= MAXDEPTH) {
            if (color == originalColor) {
                 result=s1>=s2?s1:s2;
                 
            }
            else{
                result= s1<=s2?s1:s2;
            }
          
            return result;

        }
        else {
            let scores1 = this.think(colorOpposite(color), originalColor, board1, depth + 1,tree.left);
            if(color==originalColor)
            {
                alpha=Math.max(alpha,scores1);

            }
            else
            {
                beta=Math.min(beta,scores1);
            }
            if(alpha>=beta)return scores1;
            let scores2 = this.think(colorOpposite(color), originalColor, board2, depth + 1,tree.right);
            if (depth === 0) {

                let result= scores1 >= scores2 ? maxMove : scndMaxMove;
                //console.log(result);
                return result;
            }
            else {
                if (color == originalColor) {
                    return scores1 >= scores2 ?scores1:scores2;
                }
                else{
                    return scores1 <= scores2 ?scores1:scores2;
                }
            }
        }


    }

    rateBoard(board, col) {
        let sum = 0;
        for (let piece of board.pieces) {
            let value = piece.getPieceBaseValue() * this.getPositionValue(board, piece, false, piece.pos);
            if (col === piece.color) sum += value;
            else sum -= value;
        }
        return sum;

    }
    
    rateMove(move, board) {
        let rating = move.extendedRating;
        const start = 0;
        const dest = 1;
        let result = 0;
        
        if (board.squares[move.dest].piece === undefined) {


            rating.pieceBaseValue.start = move.piece.getPieceBaseValue();
            rating.positionValue.start = this.getPositionValue(board, move.piece, false, move.start);
            rating.positionValue.dest = this.getPositionValue(board, move.piece, false, move.dest);
            let diff=rating.positionValue.dest - rating.positionValue.start;
            result = -rating.pieceBaseValue.start + (diff);
        }
        else {

            let enemy = board.squares[move.dest].piece;
            rating.pieceBaseValue.start= move.piece.getPieceBaseValue();
            rating.pieceBaseValue.dest= enemy.getPieceBaseValue();
            rating.positionValue.start = this.getPositionValue(board, move.piece, false, move.start);
            rating.positionValue.dest= this.getPositionValue(board, move.piece, false, move.dest);
            result = (rating.pieceBaseValue.dest - rating.pieceBaseValue.start) + (rating.positionValue.dest - rating.positionValue.start);

        }
        rating.attackedValue.start = board.squares[move.start].getAttackingValue(colorOpposite(move.piece.color), false);
        rating.attackedValue.dest = board.squares[move.dest].getAttackingValue(colorOpposite(move.piece.color), false);
        result += (rating.attackedValue.start - rating.attackedValue.dest);
        if (move.piece.kind == Pieces.King) {
            result -=100000;
        }
        move.rating = result;
        rating.move=move;
        move.extendedRating=rating;
        rating.score=result;
       if(isDebug(engineDebughelper,move.start,move.dest)){
           console.log(move.extendedRating);
       }
        return result;
    }

    getPositionValue(board, piece, endgame, pos) {
        switch (piece.kind) {
            case Pieces.Pawn:
                if (piece.color === Colors.White) return whitePawn[pos];
                else return blackPawn[pos];
            case Pieces.Rook:
                return rook[pos];
            case Pieces.Knight:
                return knight[pos];
            case Pieces.Bishop:
                return bishop[pos];
            case Pieces.Queen:
                return queen[pos];
            case Pieces.King:
                if (piece.color === Colors.White) return whiteKing[pos];
                else return blackKing[pos];

        }

    }

}
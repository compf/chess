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
    public left:Tree|null=null;
    public right:Tree|null=null;
    public data=null;
    constructor(d:any)
    {
       this.data=d;
    }
    printMultiple(chars:string,n:number){
        let result="";
        for(let i=0;i<n;i++){
            result+=chars;
        }
        console.log(result);
    }
    calculateDepth(){
        return Tree.calculateDepthRec(this,0);
    }
    private static calculateDepthRec(tree:Tree,depth:number):number{
        let leftDepth=depth;
        let rightDepth=depth;
        if(tree.left!=null){
            leftDepth=Tree.calculateDepthRec(tree.left,depth+1);
        }
        if(tree.right!=null){
            rightDepth=Tree.calculateDepthRec(tree.right,depth+1);
        }
        return Math.max(leftDepth,rightDepth);
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
2   1   0   8   8*/   
      

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

const MAXDEPTH = 6;

const engineDebughelper=shareHelper?boardDebugHelper:{
    enabled:true,
    start:44,
    dest:null
}
function checkWeakPieceAttack(mv1:Move,mv2:Move,resultObj:{result:number}){
    if(mv1.destPiece()!=undefined && mv2.destPiece()==undefined && mv1.piece.getPieceBaseValue()<mv1.destPiece().getPieceBaseValue()){
        resultObj.result=-1;
    }
    else if(mv2.destPiece()!=undefined && mv1.destPiece()==undefined && mv2.piece.getPieceBaseValue()<mv2.destPiece().getPieceBaseValue()){
        resultObj.result=+1;
    }
    else if(mv2.destPiece()!=undefined && mv1.destPiece()!=undefined && mv2.piece.getPieceBaseValue()<mv2.destPiece().getPieceBaseValue() && mv1.piece.getPieceBaseValue()<mv1.destPiece().getPieceBaseValue()){
        if(mv1.destPiece().getPieceBaseValue()-mv1.piece.getPieceBaseValue()>mv2.destPiece().getPieceBaseValue()-mv2.piece.getPieceBaseValue()){
            resultObj.result=-1;
        }
        else{
            resultObj.result=-1;
        }
        
    }
}
function MoveComparator(mv1:Move,mv2:Move):number{
    let result=mv1.rating>mv2.rating?-1:+1;
    const diff=Math.abs(mv1.rating-mv2.rating);
    const maxDiff=500;
    if(diff<=maxDiff){
       let resultObj={result:result};
       checkWeakPieceAttack(mv1,mv2,resultObj);
       result=resultObj.result;
    }
    return result;
}
class ComputerEngine {

    public board:Board;
    public observedPiece:Piece|undefined;
    constructor(board) {
        this.board = board;
        this.observedPiece = undefined;

    }
    sortFactor=+1;


    rateAllMoves()
    {
        for(var mv of this.board.moves)
        {
            this.rateMove(mv,this.board);
        }
    }
    findMinMax(board:Board, color:Colors, orgColor:Colors) {
        board.updateMoves();
        this.rateAllMoves();
        let max = color === orgColor || true;
        const factor=max?-1:+1;
        var index=0;
        var result:(number|Move)[]=[0,null,0,null];

        board.moves.sort(MoveComparator);
        for(let i=0;i<board.moves.length;i++)
        {
            if(board.moves[i].piece.color!=color)continue;
            result[index++]=board.moves[i].rating;
            result[index++]=board.moves[i];
            if(index>3)return result;

        }
        return null;
    }
    think(color:Colors, originalColor:Colors, board:Board, depth:number,tree:Tree,alpha:number,beta:number) {
    

        let bestMoves = this.findMinMax(board, color, originalColor);
        let maxScore = bestMoves[0];
        let maxMove = bestMoves[1]  as unknown as Move;
        let scndMaxScore = bestMoves[2];
        let scndMaxMove = bestMoves[3] as unknown as Move;;
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
            let scores1 = this.think(colorOpposite(color), originalColor, board1, depth + 1,tree.left,alpha,beta);
            if(color==originalColor)
            {
                alpha=Math.max(alpha,scores1);

            }
            else
            {
                beta=Math.min(beta,scores1);
            }
            if(alpha>=beta)return scores1;
            let scores2 = this.think(colorOpposite(color), originalColor, board2, depth + 1,tree.right,alpha,beta);
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
    private phase:GamePhase=GamePhase.Middle;
    rateBoard(board:Board, col:Colors) {
        let sum = 0;
        for (let piece of board.pieces) {
            let value = piece.getPieceBaseValue() * getPositionValue(piece.kind,piece.color, this.phase, piece.pos);
            if (col === piece.color) sum += value;
            else sum -= value;
        }
        return sum;

    }
    getPhase(){
        const initalNumberOfPieces=32.0;
        const percentage=this.board.pieces.length/initalNumberOfPieces;
        if(percentage<=0.25){
            return GamePhase.Ending;
        }
        else if(percentage<=0.6){
            return GamePhase.Middle;
        }
        else{
            return GamePhase.Beginning;
        }
    }
    rateMove(move:Move, board:Board) {
        const phase=this.getPhase();
       move.rating=calculateMetricResult(board,move,phase);
    }



}
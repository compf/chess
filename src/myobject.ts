const xCoordinates=["A","B","C","D","E","F","G","H"]
function getIntegerValue(value)
{
	var x=(value.charCodeAt(0))-65;
	var y=parseInt(value.charAt(1))-1;
	return y*8+x;
}
function getStringValueXY(x,y)
{
	var arr=["A","B","C","D","E","F","G","H"];
	return arr[x]+(y+1);
}
function getIndexValue(x,y){
	return y*8+x;
}
function getStringValue(value:number)
{
	var x=value%8;
	var y=Math.floor(value/8);
	return getStringValueXY(x,y);
}
function getCol(id)
{
	return id %8;
}
function getRow(id:number)
{
	return Math.floor(id/8);
}
function remove (arr,obj){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==obj){
			arr.splice(i,1);
			return;
		}
	}
}
var UID=0;
enum Pieces  {
    Rook= 0,
    Knight= 1,
    Bishop= 2,
    King= 3,
    Queen= 4,
    Pawn= 5
};
enum Colors  {
    White= 0,
    Black= 1
};
function colorOpposite(col:Colors) {
	if (col == Colors.White) return Colors.Black;
	else if (col == Colors.Black) return Colors.White;
}
enum GamePhase{
	Beginning,
	Middle,
	Ending
}
let whitePawn = [100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 50, 50, 35, 30, 0, 100, 100, 40, 50, 50, 35, 30, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0, 100, 100, 40, 40, 30, 10, 50, 0,];
let blackPawn = [0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 30, 35, 50, 50, 40, 100, 100, 0, 30, 35, 50, 50, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100, 0, 50, 10, 30, 40, 40, 100, 100,];
let knight = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let bishop = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let queen = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
let whiteKing = [0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 20, 50, 0, 0, 0, 0, 0, 0, 20, 30,];
let blackKing = [30, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0, 50, 20, 0, 0, 0, 0, 0, 0, 30, 20, 0, 0, 0, 0, 0, 0,];
let rook = [10, 14, 18, 20, 20, 10, 14, 18, 11, 15, 19, 30, 30, 11, 15, 19, 12, 16, 20, 40, 40, 12, 16, 20, 13, 17, 30, 50, 50, 13, 17, 30, 13, 17, 30, 50, 50, 13, 17, 30, 12, 16, 20, 40, 40, 12, 16, 20, 11, 15, 19, 30, 30, 11, 15, 19, 10, 14, 18, 20, 20, 10, 14, 18,];
function getPositionValue( kind:Pieces,color:Colors, gamePhase:GamePhase, pos:number) {
    switch (kind) {
        case Pieces.Pawn:
            if (color === Colors.White) return whitePawn[pos];
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
            if (color === Colors.White) return whiteKing[pos];
            else return blackKing[pos];

    }

}
let debugEnabled=false;
function toggleDebug(){
	debugEnabled= !debugEnabled;
}
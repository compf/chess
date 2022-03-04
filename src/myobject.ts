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
function colorOpposite(col) {
	if (col == Colors.White) return Colors.Black;
	else if (col == Colors.Black) return Colors.White;
}

const MIN_SCORE=0;
const MAX_SCORE=100;
let debugStart=0;
let debugDest=0;
const metricDebugHelper = {
    start: 0,
    dest: 35,
    enabled: false
};
function logd(...data){
    if(metricDebugHelper.enabled && debugStart==metricDebugHelper.start && debugDest==metricDebugHelper.dest){
        console.log(data);
    }
}
function boundedGrowth(start:number,limit:number,k:number,t:number){
    return limit-(limit-start)*Math.exp(-k*t);
}
function falling(k:number,t:number){
    if(t<0)return MAX_SCORE;
    return boundedGrowth(MAX_SCORE,MIN_SCORE,k,t);
}
function growing(k:number,t:number){
    if(t<0)return MIN_SCORE;
    return boundedGrowth(MIN_SCORE,MAX_SCORE,k,t);
}
type MetricType={
    name:string,
    analyze:(board:Board,move:Move,phase:GamePhase)=>(number|null),
    weight:number
}
const metrics:MetricType[] = [
    {
        name: "position difference",
        analyze: function (board: Board, move: Move,phase:GamePhase) {
            let startPosVal=getPositionValue(move.piece.kind,move.piece.color,phase,move.start);
            let endPosVal=getPositionValue(move.piece.kind,move.piece.color,phase,move.dest);
            let diff=endPosVal-startPosVal;
            const k=0.01;
            return growing(k,diff);
        },
        weight:0.1

    },
    {
        name: "capture strong pieces",
        analyze: function (board: Board, move: Move,phase:GamePhase) {
            if(board.squares[move.dest].piece!=undefined){
                let startVal=move.piece.getPieceBaseValue();
                let destVal=board.squares[move.dest].piece.getPieceBaseValue();
                let diff=destVal-startVal;
                const k=0.1;
                return growing(k,diff)
            }
            else{
                return null;
            }
        },
        weight:3

    },
    {
        name: "don't go to dangerous places",
        analyze: function (board: Board, move: Move,phase:GamePhase) {
            let color=colorOpposite(board.squares[move.start].piece.color);
            let startVal=board.squares[move.start].getAttackingValue(color,false)
            let destVal=board.squares[move.start].getAttackingValue(color,false);
            let diff=destVal-startVal;
            const k=10;
            return falling(k,diff);
        },
        weight:3

    },
   
];
function calculateMetricResult(board:Board,move:Move,phase:GamePhase):number{
    let sum=0;
    let weightSum=0;
    debugStart=move.start;
    debugDest=move.dest;
    logd(move.start,move.dest);
    for(let m of metrics){


        let metricResult=m.analyze(board,move,phase);
        logd(m.name,metricResult);
        if(metricResult!=null){
            sum+=m.weight*metricResult;
            weightSum+=m.weight;
        }
        
    }
    logd();
    logd(weightSum,weightSum,sum/weightSum);
    return sum/weightSum;
}
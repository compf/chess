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
    if(debugEnabled ){
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
    getWeight:(phase:GamePhase)=>number
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
        getWeight(phase) {return 0.1}

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
        getWeight(phase) {return 3}

    },
    {
        name: "don't go to dangerous places",
        analyze: function (board: Board, move: Move,phase:GamePhase) {
            let color=colorOpposite(board.squares[move.start].piece.color);
            let startVal=board.squares[move.start].getAttackingValue(color,false)
            let destVal=board.squares[move.dest].getAttackingValue(color,false);
            let diff=destVal-startVal;
            const k=10;
            return falling(k,diff);
        },
        getWeight(phase) {return 3}

    },
    {
        name:"Don't use strong pieces too early",
        analyze(board, move, phase) {
            return falling(0.1,move.piece.getPieceBaseValue());
        },
        getWeight(phase) {
            if(phase==GamePhase.Beginning)return 3;
            else return 0.5;
        },
    },
    {
        name:"Don't move constrained pieces",
        analyze(board, move, phase) {
            const radius=move.piece.getRadius();
            if(move.start==56 && move.dest==56){
                console.log(radius)
            }
            return growing(2,radius);
        },
        getWeight(phase) {
            return 1.5;
        },
    },
    {
        name:" Don't move the king unless absolutely neccessary",
        analyze(board, move, phase) {
            if(move.piece.kind!=Pieces.King)return 100;
            let dx=Math.abs(getCol(move.start)-getCol(move.dest));
            if(dx==2)return 100;
            else return 0.5;
        },
        getWeight(phase) {
            if(phase== GamePhase.Ending)return 0.5;
            else return 10;
        },
    }
   
];
function calculateMetricResult(board:Board,move:Move,phase:GamePhase):number{
    let sum=0;
    let weightSum=0;
    debugStart=move.start;
    debugDest=move.dest;
    if(move.piece.color==Colors.Black)
        logd(move.start,move.dest);
    for(let m of metrics){


        let metricResult=m.analyze(board,move,phase);
        logd(m.name,metricResult);
        if(metricResult!=null){
            const weight=m.getWeight(phase);
            sum+=weight*metricResult;
            weightSum+=weight;
        }
        
    }
    logd();
    return sum/weightSum;
}
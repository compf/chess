class Calculator{
    constructor(){
        this.value=0;
        this.shallLog=true;
    }
    add(val,descr){
        this.log("add " +this.value+" [storage] "+ val + "["+descr+"]="+(this.value+val));
        this.value+=val;
    }
    subtract(val,descr){
        this.log("subtract " +this.value+" [storage] "+ val + "["+descr+"]="+(this.value-val));
        this.value-=val;
    }
    multiply(val,descr){
        this.log("mult " +this.value+" [storage] "+ val + "["+descr+"]="+(this.value*val));
        this.value*=val;
    }
    divide(val,descr){
        this.log("div " +this.value+" [storage] "+ val + "["+descr+"]="+(this.value/val));
        this.value+=val;
    }
    reset(val=0){
        this.value=val;
    }
    log(str){
        if(this.shallLog){
            console.log(str);
        }
       
    }
}
var calc=new Calculator();
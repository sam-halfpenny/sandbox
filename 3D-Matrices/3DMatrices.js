let score=0
class ship{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:GAME_WIDTH/2,y:GAME_HEIGHT/2}
        this.speed={x:0,y:0}
        this.rspeed=0
        this.rotated=270
        this.size=25
        this.matrixMatrix=[
            [
                [Math.cos(Math.PI/180),-Math.sin(Math.PI/180)],
                [Math.sin(Math.PI/180),Math.cos(Math.PI/180)]
            ],[
                [Math.cos(Math.PI/180),-Math.sin(Math.PI/180)],
                [Math.sin(Math.PI/180),Math.cos(Math.PI/180)]
            ]
        ]
        this.vectorMatrix=[[Math.cos(Math.PI/180),-Math.sin(Math.PI/180)],[Math.sin(Math.PI/180),Math.cos(Math.PI/180)]]
        this.maxSpeed=2
        this.relpoints=[
            {x:0,y:-this.size},
            {x:+this.size/2,y:+this.size/2},
            {x:-this.size/2,y:+this.size/2},
        ]
        var i
        this.points=[]
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.hypotenuse=Math.sqrt(2)*(this.size/2)
        this.rotation=0
    }
    draw(){
        var i
        for(i=0;i<this.points.length-1;i++){
            JTD(this.points[i],this.points[i+1])
        }
        JTD(this.points[this.points.length-1],this.points[0])
    }
    update(deltaTime) {
        if(!deltaTime) return;
        // console.log(this.rotated)
        this.rotated+=this.rotation
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=transform_vector(this.relpoints[i],this.vectorMatrix)
        }
        console.log(this.vectorMatrix)
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.rotation>=360)this.rotation=0
        if(this.rotation<=-1)this.rotation=359
        if(this.position.x<0) this.position.x=this.gamewidth
        if(this.position.x > this.gamewidth) this.position.x = 0;
        if(this.position.y<0) this.position.y=this.gameheight
        if(this.position.y > this.gameheight) this.position.y = 0;
    }
}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/**
 * transforms the vector with the Matrix where n<26 && m<26
 * @param {Vector} vector n-dimensional point (key-format: x,y,z,a,b,c...)
 * @param {Array} Matrix m*n Matrix
 * @returns m-dimensional point (key-format: x,y,z,a,b,c...)
 */
function transform_vector(vector,Matrix){
    let npoint={}
    let value=0
    if(Object.keys(vector).length!=Matrix[0].length) return;
    if(Matrix.length>26||Matrix[0].length>26) return;
    for(var i=0;i<Matrix.length;i++){
        value=0
        for(var j=0;j<Matrix[0].length;j++){
            value+=Matrix[i][j]*vector[letters(33+j)]
        }
        key=letters(33+i)
        Object.assign(npoint,{temp:value})
        renameKey(npoint,'temp',key)
    }
    return npoint
}
/**
 * 
 * @param {2D Array} Matrix2D a*b Matrix
 * @param {3D Array} Matrix3D a*b*c Matrix
 * @returns {2D Array} a*c Matrix
 */
function transform_Matrix(Matrix2D,Matrix3D){
    // debugger
    let outputMatrix=[]
    let value=0
    console.log(Matrix2D.length,Matrix3D.length)
    if(Matrix2D.length!=Matrix3D.length)return;
    if(Matrix2D[0].length!=Matrix3D[0].length)return;
    for(var i=0;i<Matrix3D.length;i++){
        outputMatrix.push([])
        for(var j=0;j<Matrix3D[0][0].length;j++){
            value=0
            for(var k=0;k<Matrix3D[0].length;k++){
                value+=Matrix2D[i][k]*Matrix3D[i][k][j]
            }
            outputMatrix[i].push(value)
        }
    }
    return outputMatrix
}
function letters(num){
    let alpha="0123456789abcdefghijklmnopqrstuvwxyz"
    nstr=alpha[num%alpha.length]
    return nstr
}
function renameKey(obj, old_key, new_key) {   
    if (old_key !== new_key) {                  
        Object.defineProperty(obj, new_key,Object.getOwnPropertyDescriptor(obj, old_key));
        delete obj[old_key];
    }
}
function detect2shapecollision(points1,points2){
    var i
    for(i=0;i<points1.length;i++){
        if(detect_rotated_shape(points2,points1[i])){
            return true
        }
    }
    for(i=0;i<points2.length;i++){
        if(detect_rotated_shape(points1,points2[i])){
            return true
        }
    }
    return false
}
function xyswitch(coord){
    let ncoord={
        x:coord.y,
        y:coord.x
    }
    return ncoord
}
function detect_rotated_shape(points,p){
    pointnum=points.length
    var i
    sidetruecount=0
    for(i=0;i<pointnum-1;i++){
        if(angleline_detection(points[i],points[i+1],p,true)){
            sidetruecount++
        }
    }
    if(angleline_detection(points[pointnum-1],points[0],p,true)){
        sidetruecount++
    }
    if(sidetruecount==pointnum){
        return true
    }
    else{
        return false
    }
}
function angularmov(ang,speed){
    rang=ang*(Math.PI/180)
    xymot={
        x:0,
        y:0
    }
    xymot.y=speed*Math.sin(rang)
    xymot.x=speed*Math.cos(rang)
    return xymot
}
function diff(p1,p2){
    dist={x:0,y:0}
    if(p1.x>p2.x){
        dist.x=p1.x-p2.x
    }
    else{
        dist.x=p2.x-p1.x
        // dist.sector+=10
    }
    if(p1.y>p2.y){
        dist.y=p1.y-p2.y
    }
    else{
        dist.y=p2.y-p1.y
        // dist.sector++
    }
    return dist

}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function anglefinder(p1,p2){
    dist=diff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    switch(dist.sector){
        case 0:
            ang+=270
            break
        case 10:
            ang=360-ang
            break
        case 1:
            ang=180-ang
            break
        case 11:
            break

    }
    return ang
}
function pnanglefinder(p1,p2){
    dist=pndiff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    return ang
}
function angleline_detection(lp1,lp2,p,inv){
    np={x:p.x-lp1.x,y:p.y-lp1.y}
    //y=mx+b
    let m=pndiff(lp1,lp2).y/pndiff(lp1,lp2).x
    if(np.x<0&&lp1.x<lp2.x){
        inv=!inv
    }
    if(np.x>=0&&lp1.x>=lp2.x){
        inv=!inv
    }
    if(np.y/np.x>m){
        if(!inv){
            return false
        }
        else{
            return true
        }
    }
    else{
        if(inv){
            return false
        }
        else{
            return true
        }
    }
}
function JTD(p1,p2){
    if(pndiff(p1,p2).x>=0){
        angle=pnanglefinder(p1,p2)+180
    }
    else{
        angle=pnanglefinder(p1,p2)
    }
    
    dist=Math.sqrt(Math.pow(diff(p1,p2).x,2)+Math.pow(diff(p1,p2).y,2))
    drawline(p1,angle,dist)
}
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillStyle='#000'
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    kill=true
                    break
                case 77:
                    dodger.vectorMatrix=transform_Matrix(dodger.vectorMatrix,dodger.matrixMatrix)
                    break
            }
        });

    }
}
let kill = false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
const GAME_WIDTH=600
const GAME_HEIGHT=600
dodger1 = new ship(GAME_WIDTH,GAME_HEIGHT)
new Handler(dodger1)
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    let start = Date.now()
    loop++
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    dodger1.update(deltaTime);
    dodger1.draw(ctx);
    document.getElementById('score').textContent='score:'+score
    if(!kill){
        while((Date.now()-start)<15){
        }
        requestAnimationFrame(gameloop)
    }
    else{
        console.log('killed')
    }
}
gameloop()
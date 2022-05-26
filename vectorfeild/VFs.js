bullets=[]
asteroids=[]
let score=0
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
//---------------------------------------start shape detection----------------------------------------------------------//
function xcomponent(x,y){
    return -1/Math.pow(y,2)
}
function ycomponent(x,y){
    return -1/Math.pow(x,2)
}
function vectorfeild(x,y){
    let vector={
        x:xcomponent(x,y),
        y:ycomponent(x,y)
    }
    return vector
}
function drawVF(res,zoom){
    for(var i=0;i<GAME_WIDTH/res;i++){
        for(var j=0;j<GAME_HEIGHT/res;j++){
            let stuf={x:i*res+vectorfeild(i*res/zoom,j*res/zoom).x,y:j*res+vectorfeild(i*res/zoom,j*res/zoom).y}
            JTD({x:i*res,y:j*res},stuf)
        }
    }
}
function rotate_point(point,ang){
    angle=ang*(Math.PI/180)
    let Matrix=[
        [Math.cos(angle),-Math.sin(angle)],
        [Math.sin(angle),Math.cos(angle)]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
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
function unit_vector(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
    }
    return a_hat
}
//------------------------------------------end shape detection code-------------------------------------------------//
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                // case 38:
                //     dodger.accelerate()
                //     break
                // case 37:
                //     dodger.rotation=357
                //     break
                // case 39:
                //     dodger.rotation=3
                //     break
                // case 32:
                //     dodger.shoot()
                //     break
                // case 75:
                //     kill=true
                //     break

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                // case 37:
                //     dodger.rotation=0
                //     break
                // case 39:
                //     dodger.rotation=0
                //     break
                // case 38:
                //     this.rspeed=0
                //     break
            }
        });

    }
}
let kill = false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
const GAME_WIDTH=600
const GAME_HEIGHT=600
new Handler()
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    let start = Date.now()
    loop++
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    drawVF(10,10000)
    if(!kill){
        while((Date.now()-start)<15){
        }
        requestAnimationFrame(gameloop)
    }
    else{
        console.log('killed')
        WORLDBOOM()
    }
}
gameloop()
bullets=[]
asteroids=[]
let score=0
//     |   
//     |
//     |
//     |
//     |
//     |
//     v
let CBD=[
    [
        {
            x: -4,
            y: -2
        },
        {
            x: -6,
            y: -2
        },
        {
            x: -4,
            y: -3
        },
        '#000000'
    ],
    [
        {
            x: -4,
            y: 2
        },
        {
            x: -6,
            y: 2
        },
        {
            x: -4,
            y: 3
        },
        '#000000'
    ],
    [
        {
            x: -7,
            y: 0
        },
        {
            x: -6,
            y: 0
        },
        {
            x: -6,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: -7,
            y: 0
        },
        {
            x: -6,
            y: 0
        },
        {
            x: -6,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: -6,
            y: -2
        },
        {
            x: -6,
            y: -1
        },
        {
            x: -5,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: -5,
            y: -1
        },
        {
            x: -6,
            y: -1
        },
        {
            x: -5,
            y: -2
        },
        '#808080'
    ],
    [
        {
            x: -5,
            y: 1
        },
        {
            x: -6,
            y: 1
        },
        {
            x: -5,
            y: 2
        },
        '#808080'
    ],
    [
        {
            x: -5,
            y: 1
        },
        {
            x: -6,
            y: 1
        },
        {
            x: -5,
            y: -1
        },
        '#808080'
    ],
    [
        {
            x: -6,
            y: -1
        },
        {
            x: -6,
            y: 1
        },
        {
            x: -5,
            y: -1
        },
        '#808080'
    ],
    [
        {
            x: -2,
            y: -2
        },
        {
            x: -5,
            y: 0
        },
        {
            x: -5,
            y: -2
        },
        '#808080'
    ],
    [
        {
            x: -2,
            y: 2
        },
        {
            x: -5,
            y: 0
        },
        {
            x: -5,
            y: 2
        },
        '#808080'
    ],
    [
        {
            x: -2,
            y: 2
        },
        {
            x: -5,
            y: 0
        },
        {
            x: -2.5,
            y: 0
        },
        '#808080'
    ],
    [
        {
            x: -2,
            y: -2
        },
        {
            x: -5,
            y: 0
        },
        {
            x: -2.5,
            y: 0
        },
        '#808080'
    ],
    [
        {
            x: -1,
            y: -3
        },
        {
            x: -2,
            y: -2
        },
        {
            x: -4,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: -1,
            y: 3
        },
        {
            x: -2,
            y: 2
        },
        {
            x: -4,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: -1,
            y: -3
        },
        {
            x: -4,
            y: -2
        },
        {
            x: -4,
            y: -3
        },
        '#000000'
    ],
    [
        {
            x: -1,
            y: 3
        },
        {
            x: -4,
            y: 2
        },
        {
            x: -4,
            y: 3
        },
        '#000000'
    ],
    [
        {
            x: -2.5,
            y: 0
        },
        {
            x: -2,
            y: 0
        },
        {
            x: -2,
            y: -2
        },
        '#66b3ff'
    ],
    [
        {
            x: -2.5,
            y: 0
        },
        {
            x: -2,
            y: 0
        },
        {
            x: -2,
            y: 2
        },
        '#66b3ff'
    ],
    [
        {
            x: -1,
            y: -3
        },
        {
            x: -2,
            y: 0
        },
        {
            x: -2,
            y: -2
        },
        '#66b3ff'
    ],
    [
        {
            x: -1,
            y: 3
        },
        {
            x: -2,
            y: 0
        },
        {
            x: -2,
            y: 2
        },
        '#66b3ff'
    ],
    [
        {
            x: -1,
            y: -3
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -2,
            y: 0
        },
        '#66b3ff'
    ],
    [
        {
            x: -1,
            y: 3
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -2,
            y: 0
        },
        '#66b3ff'
    ],
    [
        {
            x: 2,
            y: -3
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -1,
            y: -3
        },
        '#66b3ff'
    ],
    [
        {
            x: 2,
            y: 3
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -1,
            y: 3
        },
        '#66b3ff'
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: -2
        },
        {
            x: 1,
            y: -2
        },
        '#66b3ff'
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 2
        },
        {
            x: 1,
            y: 2
        },
        '#66b3ff'
    ],
    [
        {
            x: 0,
            y: -1
        },
        {
            x: 0,
            y: 1
        },
        {
            x: -1,
            y: 0
        },
        '#66b3ff'
    ],
    [
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: -2
        },
        {
            x: 2,
            y: -1
        },
        '#000000'
    ],
    [
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 2,
            y: 1
        },
        '#000000'
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: 2,
            y: -2
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: 2,
            y: -2
        },
        {
            x: 2,
            y: -3
        },
        {
            x: 1,
            y: -2
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 2,
            y: 3
        },
        {
            x: 1,
            y: 2
        },
        '#808080'
    ],
    [
        {
            x: 3,
            y: -2
        },
        {
            x: 3,
            y: -3
        },
        {
            x: 4,
            y: -2
        },
        '#808080'
    ],
    [
        {
            x: 3,
            y: 2
        },
        {
            x: 3,
            y: 3
        },
        {
            x: 4,
            y: 2
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: -2
        },
        {
            x: 2,
            y: -3
        },
        {
            x: 3,
            y: -3
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 2,
            y: 3
        },
        {
            x: 3,
            y: 3
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: -2
        },
        {
            x: 3,
            y: -2
        },
        {
            x: 3,
            y: -3
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 3,
            y: 2
        },
        {
            x: 3,
            y: 3
        },
        '#808080'
    ],
    [
        {
            x: 2,
            y: 2
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 4,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: 2,
            y: -2
        },
        {
            x: 2,
            y: -1
        },
        {
            x: 4,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: 5,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 4,
            y: 2
        },
        '#000000'
    ],
    [
        {
            x: 5,
            y: -1
        },
        {
            x: 1,
            y: -1
        },
        {
            x: 4,
            y: -2
        },
        '#000000'
    ],
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 5,
            y: 0
        },
        '#ff1a1a'
    ],
    [
        {
            x: 2,
            y: -1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 5,
            y: 0
        },
        '#ff1a1a'
    ],
    [
        {
            x: 2,
            y: 1
        },
        {
            x: 5,
            y: 1
        },
        {
            x: 5,
            y: 0
        },
        '#ff1a1a'
    ],
    [
        {
            x: 2,
            y: -1
        },
        {
            x: 5,
            y: -1
        },
        {
            x: 5,
            y: 0
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: 1
        },
        {
            x: 5,
            y: 1
        },
        {
            x: 7,
            y: -1
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: -1
        },
        {
            x: 5,
            y: -1
        },
        {
            x: 5,
            y: 1
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: 1
        },
        {
            x: 5,
            y: 1
        },
        {
            x: 3,
            y: 3
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: -1
        },
        {
            x: 5,
            y: -1
        },
        {
            x: 3,
            y: -3
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: 1
        },
        {
            x: 5,
            y: 3
        },
        {
            x: 3,
            y: 3
        },
        '#ff1a1a'
    ],
    [
        {
            x: 7,
            y: -1
        },
        {
            x: 5,
            y: -3
        },
        {
            x: 3,
            y: -3
        },
        '#ff1a1a'
    ],
    [
        {
            x: 5.5,
            y: 0.5
        },
        {
            x: 5.6,
            y: 0.5
        },
        {
            x: 5.5,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 5.6,
            y: 0.5
        },
        {
            x: 5.6,
            y: -0.5
        },
        {
            x: 5.5,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6.6,
            y: 0.5
        },
        {
            x: 6.6,
            y: -0.5
        },
        {
            x: 6.5,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6.5,
            y: 0.5
        },
        {
            x: 6.6,
            y: 0.5
        },
        {
            x: 6.5,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6.1,
            y: 0.5
        },
        {
            x: 6.1,
            y: -0.5
        },
        {
            x: 6,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6,
            y: 0.5
        },
        {
            x: 6.1,
            y: 0.5
        },
        {
            x: 6.0,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 5.75,
            y: 0.5
        },
        {
            x: 5.85,
            y: -0.5
        },
        {
            x: 5.75,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 5.75,
            y: 0.5
        },
        {
            x: 5.85,
            y: 0.5
        },
        {
            x: 5.85,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6.25,
            y: 0.5
        },
        {
            x: 6.35,
            y: -0.5
        },
        {
            x: 6.25,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: 6.25,
            y: 0.5
        },
        {
            x: 6.35,
            y: 0.5
        },
        {
            x: 6.35,
            y: -0.5
        },
        '#000000'
    ],
    [
        {
            x: -6,
            y: 2
        },
        {
            x: -6,
            y: 1
        },
        {
            x: -5,
            y: 2
        },
        '#000000'
    ]
] /* <-----------------   JACK PUT YOUR ARRAY HERE */
//     ^
//     |
//     |
//     |
//     |
//     |
//     |
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
//---------------------------------------start shape detection----------------------------------------------------------//
function Draw(points){
    let hp=0
    let lp=0
    let mp=0
    if(points[0].y<=points[1].y && points[0].y<=points[2].y){
        hp=points[0]
        if(points[1].y>points[2].y){
            lp=points[1]
            mp=points[2]
        }
        else{
            lp=points[2]
            mp=points[1]
        }
    }
    else if(points[1].y<=points[0].y && points[1].y<=points[2].y){
        hp=points[1]
        if(points[0].y>points[2].y){
            lp=points[0]
            mp=points[2]
        }
        else{
            lp=points[2]
            mp=points[0]
        }
    }
    else{
        hp=points[2]
        if(points[1].y>points[0].y){
            lp=points[1]
            mp=points[0]
        }
        else{
            lp=points[0]
            mp=points[1]
        }
    }
    let lindiffhl=pndiff(lp,hp)
    let lindiffhm=pndiff(mp,hp)
    let lindiffml=pndiff(lp,mp)
    let vectorhl=lindiffhl.x/lindiffhl.y
    let vectorhm=lindiffhm.x/lindiffhm.y
    let vectorml=lindiffml.x/lindiffml.y
    let linpointss=[]
    let linpointsl=[]
    for(var i=0;i<Math.floor(lindiffhl.y);i++){
        linpointss.push({x:hp.x+i*vectorhl,y:i+hp.y})
        // ctx.fillRect(linpoints[i].x,linpoints[i].y,8,1)
    }
    for(var i=0;i<Math.floor(lindiffhm.y);i++){
        linpointsl.push({x:hp.x+i*vectorhm,y:i+hp.y})
    }
    for(var i=0;i<Math.floor(lindiffml.y)+1;i++){
        linpointsl.push({x:mp.x+i*vectorml,y:i+mp.y})
    }
    for(var i=0;i<linpointss.length;i++){
        ctx.fillRect(Math.floor(linpointss[i].x),Math.floor(linpointss[i].y),linpointsl[i].x-linpointss[i].x,1)
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
//------------------------------------------end shape detection code-------------------------------------------------//
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 38:
                    dodger.accelerate()
                    break
                case 37:
                    dodger.rotation=357
                    break
                case 39:
                    dodger.rotation=3
                    break
                case 32:
                    dodger.shoot()
                    break
                case 75:
                    kill=true
                    break

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.rotation=0
                    break
                case 39:
                    dodger.rotation=0
                    break
                case 38:
                    this.rspeed=0
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
const G=300
let lastTime = 0
let loop=0
let points=[]
for(var i=0;i<CBD.length;i++){
    ctx.fillStyle=CBD[i][3]
    for(j=0;j<3;j++){
        CBD[i][j]={x:CBD[i][j].x*10+G,y:CBD[i][j].y*10+G}
    }
    Draw(CBD[i])
}
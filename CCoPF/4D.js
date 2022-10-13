window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
balls=[]
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 38:
                    rotationfactor++
                    break;
                case 40:
                    rotationfactor--
                    break;
                case 37:
                    tiltfactor--
                    break
                case 39:
                    tiltfactor++
                    break
                case 32:
                    dead=true
                    break
                case 97:
                    rotation4D.xw++
                    break
                case 98:
                    rotation4D.yw++
                    break
                case 99:
                    rotation4D.zw++
                    break
                case 100:
                    rotation4D.zx++
                    break
                case 101:
                    rotation4D.zy++
                    break
                case 102:
                    rotation4D.xy++
                    break
            }
        });
    }
}
function circleParam(x,mag){
    return {
        x:G+Math.cos(x.re)*Math.cosh(x.im)*mag,
        y:G-Math.sin(x.re)*Math.sinh(x.im)*mag,
        z:G+Math.sin(x.re)*Math.cosh(x.im)*mag,
        w:G+Math.cos(x.re)*Math.sinh(x.im)*mag
    }
}
let kill=false
let dead=false
let intensity=12
let perspective=8800
let rotationfactor=10
let tiltfactor=10
let spinfactor=90
let rotation4D={
    xw:0,
    yw:0,
    zw:0,
    zx:0,
    zy:0,
    xy:0
}
function iso_map(pos){
    let isopos
    let relpos=pndiff4D(pos,epicenter4D)
    isopos=add_perspective3D(rotate3D(add_perspective4D(rotate4D(relpos,rotation4D),perspective,intensity),tiltfactor,rotationfactor,spinfactor),perspective,intensity)
    let final={
        x:isopos.x+epicenter.x,
        y:isopos.y+epicenter.y
    }
    return final
}
function rotate3D(point,rx,ry,rz){
    let xpoint={
        x:point.x,
        y:rotate_point({x:point.y,y:point.z},rx).x,
        z:rotate_point({x:point.y,y:point.z},rx).y
    }
    let ypoint={
        x:rotate_point({x:xpoint.x,y:xpoint.z},ry).x,
        y:xpoint.y,
        z:rotate_point({x:xpoint.x,y:xpoint.z},ry).y
    }
    let zpoint={
        x:rotate_point({x:ypoint.x,y:ypoint.y},rz).x,
        y:rotate_point({x:ypoint.x,y:ypoint.y},rz).y,
        z:ypoint.z
    }
    return zpoint
}
function rotate4D(point,r){
    let xwpoint={
        x:point.x,
        y:rotate_point({x:point.y,y:point.z},r.xw).x,
        z:rotate_point({x:point.y,y:point.z},r.xw).y,
        w:point.w
    }
    let ywpoint={
        x:rotate_point({x:xwpoint.x,y:xwpoint.z},r.yw).x,
        y:xwpoint.y,
        z:rotate_point({x:xwpoint.x,y:xwpoint.z},r.yw).y,
        w:xwpoint.w
    }
    let zwpoint={
        x:rotate_point({x:ywpoint.x,y:ywpoint.y},r.zw).x,
        y:rotate_point({x:ywpoint.x,y:ywpoint.y},r.zw).y,
        z:ywpoint.z,
        w:ywpoint.w
    }
    let zxpoint={
        x:zwpoint.x,
        y:rotate_point({x:zwpoint.y,y:zwpoint.w},r.zx).x,
        z:zwpoint.z,
        w:rotate_point({x:zwpoint.y,y:zwpoint.w},r.zx).y
    }
    let zypoint={
        x:rotate_point({x:zxpoint.x,y:zxpoint.w},r.zy).x,
        y:zxpoint.y,
        z:zxpoint.z,
        w:rotate_point({x:zxpoint.x,y:zxpoint.w},r.zy).y
    }
    let xypoint={
        x:zypoint.x,
        y:zypoint.y,
        z:rotate_point({x:zypoint.z,y:zypoint.w},r.xy).x,
        w:rotate_point({x:zypoint.z,y:zypoint.w},r.xy).y
    }
    return xypoint
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
function add_perspective4D(point,perspective,intensity){
    let w = intensity*G-point.w
    let npoint={
        x:(point.x*perspective)/w,
        y:(point.y*perspective)/w,
        z:(point.z*perspective)/w,
        w:0
    }
    return npoint
}
function add_perspective3D(point,perspective,intensity){
    let z = intensity*G-point.z
    let npoint={
        x:(point.x*perspective)/z,
        y:(point.y*perspective)/z,
        z:0
    }
    return npoint
}
function Bdraw(points){
    var i
    for(i=0;i<points.length-1;i++){
        JTD(points[i],points[i+1])
    }
    JTD(points[points.length-1],points[0])
}
function Bdraw3D(points,faces){
    var isopoints=[]
    var fpoints=[]
    for(var i=0;i<points.length;i++){
        isopoints.push(iso_map(points[i]))
    }
    for(i=0;i<faces.length;i++){
        fpoints=[]
        for(var j=0;j<faces[i].length;j++){
            fpoints.push(isopoints[faces[i][j]])
        }
        Bdraw(fpoints)
        
    }
}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function pndiff4D(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y,z:p1.z-p2.z,w:p1.w-p2.w}
    return dist
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
function scale_point(point,scale){
    let Matrix=[
        [scale,0],
        [0,scale],
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
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
function pnanglefinder(p1,p2){
    dist=pndiff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    return ang
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
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
function drawParamSheet(extent,step,mag){
    let squares=[]
    for(var re=-(extent/2);re<extent/2;re+=step){
        for(var im=-(extent/2);im<extent/2;im+=step){
            squares.push([circleParam({re:re,im:im},mag),circleParam({re:re+1,im:im},mag),circleParam({re:re+1,im:im+1},mag),circleParam({re:re,im:im+1},mag)])
        }
    }
    for(var i=0;i<squares.length;i++){
        Bdraw3D(squares[i],[[0,1,2,3]])
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')


const GAME_SIZE=4000
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter4D={x:G,y:G,z:G,w:G}
new Handler();
let borderpoints=[
    {x:GAME_SIZE,y:GAME_SIZE,z:GAME_SIZE,w:GAME_SIZE},
    {x:0,y:GAME_SIZE,z:GAME_SIZE,w:GAME_SIZE},
    {x:GAME_SIZE,y:0,z:GAME_SIZE,w:GAME_SIZE},
    {x:0,y:0,z:GAME_SIZE,w:GAME_SIZE},
    {x:GAME_SIZE,y:GAME_SIZE,z:0,w:GAME_SIZE},
    {x:0,y:GAME_SIZE,z:0,w:GAME_SIZE},
    {x:GAME_SIZE,y:0,z:0,w:GAME_SIZE},
    {x:0,y:0,z:0,w:GAME_SIZE},
    {x:GAME_SIZE,y:GAME_SIZE,z:GAME_SIZE,w:0},
    {x:0,y:GAME_SIZE,z:GAME_SIZE,w:0},
    {x:GAME_SIZE,y:0,z:GAME_SIZE,w:0},
    {x:0,y:0,z:GAME_SIZE,w:0},
    {x:GAME_SIZE,y:GAME_SIZE,z:0,w:0},
    {x:0,y:GAME_SIZE,z:0,w:0},
    {x:GAME_SIZE,y:0,z:0,w:0},
    {x:0,y:0,z:0,w:0}
]
let faces = [
    [0,1,3,2],
    [4,5,7,6],
    [2,3,7,6],
    [1,3,7,5],
    [0,1,5,4],
    [0,2,6,4],
    [8,9,11,10],
    [12,13,15,14],
    [10,11,15,14],
    [9,11,15,13],
    [8,9,13,12],
    [8,10,14,12],
    [0,1,9,8],
    [3,2,10,11],
    [1,3,11,9],
    [0,2,10,8],
    [4,5,13,12],
    [7,6,14,15],
    [5,7,15,13],
    [6,4,12,14]
]
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    loop++
    if(kill){
        ctx.fillStyle='#f00'
    }
    ctx.clearRect(0,0,4000,4000);
    ctx.fillStyle='#000'
    ctx.fillRect(0,0,4000,4000)
    ctx.fillStyle='#fff'
    drawParamSheet(2*Math.PI,0.1,100)
    // Bdraw3D(borderpoints,faces)
    if(!dead){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)
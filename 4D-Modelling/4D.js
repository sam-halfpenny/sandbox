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
        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 65:
                    dodger.stopx()
                    break
                case 68:
                    dodger.stopx()
                    break
                case 87:
                    dodger.stopy()
                    break
                case 83:
                    dodger.stopy()
                    break
                case 82:
                    dodger.stopz()
                    break
                case 67:
                    dodger.stopz()
                    break
            }
        });
    }
}
class ball{
    constructor(gamesize,speed){
        this.gamesize=gamesize
        this.position={x:0,y:0,z:0}
        this.size=10
        this.speed=speed
        this.relpoints=[
            {x:this.size/2,y:this.size/2,z:this.size/2},
            {x:-this.size/2,y:this.size/2,z:this.size/2},
            {x:this.size/2,y:-this.size/2,z:this.size/2},
            {x:-this.size/2,y:-this.size/2,z:this.size/2},
            {x:this.size/2,y:this.size/2,z:-this.size/2},
            {x:-this.size/2,y:this.size/2,z:-this.size/2},
            {x:this.size/2,y:-this.size/2,z:-this.size/2},
            {x:-this.size/2,y:-this.size/2,z:-this.size/2},
        ]
        this.faces=[
            [0,1,3,2],
            [4,5,7,6],
            [2,3,7,6],
            [1,3,7,5],
            [0,1,5,4],
            [0,2,6,4]
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z})
        }
    }
    draw(ctx){
        Bdraw3D(this.points,this.faces)
    }
    update(deltaTime) {
        this.position.x+=this.speed.x
        this.position.y+=this.speed.y
        this.position.z+=this.speed.z
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z}
        }
        if(this.position.x<this.size/2){
            this.position.x=this.size/2
            this.speed.x=-this.speed.x
        }
        if(this.position.y<this.size/2){
            this.position.y=this.size/2
            this.speed.y=-this.speed.y
        }
        if(this.position.z<this.size/2){
            this.position.z=this.size/2
            this.speed.z=-this.speed.z
        }
        if(this.position.x>this.gamesize-this.size/2){
            this.position.x=this.gamesize-this.size/2
            this.speed.x=-this.speed.x
        }
        if(this.position.y>this.gamesize-this.size/2){
            this.position.y=this.gamesize-this.size/2
            this.speed.y=-this.speed.y
        }
        if(this.position.z>this.gamesize-this.size/2){
            this.position.z=this.gamesize-this.size/2
            this.speed.z=-this.speed.z
        }
    }
}
class dodger{
    constructor(gamesize){
        this.gamesize=gamesize
        this.position={x:G,y:G,z:G}
        this.size=50
        this.speed={
            x:0,
            y:0,
            z:0
        }
        this.maxspeed=10
        this.relpoints=[
            {x:this.size/2,y:this.size/2,z:this.size/2},
            {x:-this.size/2,y:this.size/2,z:this.size/2},
            {x:this.size/2,y:-this.size/2,z:this.size/2},
            {x:-this.size/2,y:-this.size/2,z:this.size/2},
            {x:this.size/2,y:this.size/2,z:-this.size/2},
            {x:-this.size/2,y:this.size/2,z:-this.size/2},
            {x:this.size/2,y:-this.size/2,z:-this.size/2},
            {x:-this.size/2,y:-this.size/2,z:-this.size/2},
        ]
        this.faces=[
            [0,1,3,2],
            [4,5,7,6],
            [2,3,7,6],
            [1,3,7,5],
            [0,1,5,4],
            [0,2,6,4]
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z})
        }
    }
    draw(ctx){
        Bdraw3D(this.points,this.faces)
    }
    moveLeft(){
        this.speed.x=-this.maxspeed
    }
    moveRight(){
        this.speed.x=this.maxspeed
    }
    moveFwd(){
        this.speed.y=-this.maxspeed
    }
    moveBwd(){
        this.speed.y=this.maxspeed
    }
    moveup(){
        this.speed.z=-this.maxspeed
    }
    movedown(){
        this.speed.z=this.maxspeed
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    stopz(){
        this.speed.z=0
    }
    update(deltaTime) {
        this.position.x+=this.speed.x
        this.position.y+=this.speed.y
        this.position.z+=this.speed.z
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y,z:this.position.z+this.relpoints[i].z}
        }
        if(this.position.x<this.size/2){
            this.position.x=this.size/2
        }
        if(this.position.y<this.size/2){
            this.position.y=this.size/2
        }
        if(this.position.z<this.size/2){
            this.position.z=this.size/2
        }
        if(this.position.x>this.gamesize-this.size/2){
            this.position.x=this.gamesize-this.size/2
        }
        if(this.position.y>this.gamesize-this.size/2){
            this.position.y=this.gamesize-this.size/2
        }
        if(this.position.z>this.gamesize-this.size/2){
            this.position.z=this.gamesize-this.size/2
        }
        balls.forEach(ball=>{
            if(this.position.x-this.size/2<ball.position.x && ball.position.x<this.position.x+this.size/2){
                if(this.position.y-this.size/2<ball.position.y && ball.position.y<this.position.y+this.size/2){
                    if(this.position.z-this.size/2<ball.position.z && ball.position.z<this.position.z+this.size/2){
                        kill=true
                        console.log('hi')
                    }
                }
            }
        })
    }
}
let kill=false
let dead=false
let intensity=5
let perspective=intensity*160
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
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')


const GAME_SIZE=600
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter4D={x:G,y:G,z:G,w:G}
dodger1 = new dodger(GAME_SIZE)
for(var i=0;i<10;i++){
    let nball= new ball(GAME_SIZE,{x:Math.random()*10+5,y:Math.random()*10+5,z:Math.random()*10+5})
    balls.push(nball)
}
new Handler(dodger1);
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
    ctx.clearRect(0,0,600,600);
    Bdraw3D(borderpoints,faces)
    // dodger1.draw(ctx)
    // if(!kill){
    //     document.getElementById('score').textContent=
    //         'score:'+loop;
    //     dodger1.update()
    // }
    // balls.forEach(ball=>{
    //     ball.draw(ctx)
    //     if(!kill){
    //         ball.update()
    //     }
    // })
    if(!dead){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)
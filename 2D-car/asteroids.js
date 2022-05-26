bullets=[]
let score=0
const rigidity=3
const dampening=0.1
function WORLDBOOM(){
    ctx.clearRect(0,0,800,600);
    let image = document.getElementById("boom")
    ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT)
}
class Police{
    constructor(gamewidth,gameheight,pos){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position=pos
        this.steering=0
        this.width=10
        this.length=20
        this.wscale=2
        this.hypotenuse=Math.sqrt(Math.pow(this.length,2)+Math.pow(this.width,2))
        this.brwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.brwheel.position.x=this.position.x+this.width
        this.brwheel.position.y=this.position.y
        this.blwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.blwheel.position.x=this.position.x
        this.blwheel.position.y=this.position.y
        this.frwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.frwheel.position.x=this.position.x+this.width
        this.frwheel.position.y=this.position.y-this.length
        this.flwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.flwheel.position.y=this.position.y-this.length
        this.flwheel.position.x=this.position.x
        this.DOT={x:0,y:1}
        this.turncap=10
    }
    draw(ctx){
        this.brwheel.draw(ctx);
        this.blwheel.draw(ctx);
        this.frwheel.draw(ctx);
        this.flwheel.draw(ctx);
    }
    accelerate(acc){
        if(acc){
            this.brwheel.acc=true
            this.brwheel.fwd=1
            this.blwheel.acc=true
            this.blwheel.fwd=-1
        }
        else{
            this.brwheel.acc=false
            this.brwheel.fwd=0
            this.blwheel.acc=false
            this.blwheel.fwd=0
        }
    }
    rev(rev){
        if(rev){
            this.brwheel.acc=true
            this.brwheel.fwd=-1
            this.blwheel.acc=true
            this.blwheel.fwd=1
        }
        else{
            this.brwheel.acc=false
            this.brwheel.fwd=0
            this.blwheel.acc=false
            this.blwheel.fwd=0
        }
    }
    brake(bra){
        if(bra){
            this.brwheel.brake()
            this.blwheel.brake()
        }
        else{
            this.brwheel.ubrake()
            this.blwheel.ubrake()
        }
    }
    update(deltaTime){
        this.position.x=(this.flwheel.position.x+this.frwheel.position.x+this.blwheel.position.x+this.brwheel.position.x)/4
        this.position.y=(this.flwheel.position.y+this.frwheel.position.y+this.blwheel.position.y+this.brwheel.position.y)/4
        let fapos = {x:(this.flwheel.position.x+this.frwheel.position.x)/2,y:(this.flwheel.position.y+this.frwheel.position.y)/2}
        this.DOT=unit_vector(pndiff(this.position,fapos))
        let dir = recoordinate(pndiff(car.position,this.position),this.DOT)
        console.log(dir)
        if(dir.y>0){
            if(this.steering>-this.turncap){
                this.steering--
            }
            else{
                this.steering=-this.turncap
            }
        }
        else{
            if(this.steering<this.turncap){
                this.steering++
            }
            else{
                this.steering=this.turncap
            }
        }
        if(dir.x>10){
            this.brake(true)
            this.turncap=45
        }
        else{
            this.turncap=10
            this.brake(false)
        }
        this.accelerate(true)
        axelflex(this.brwheel,this.blwheel,this.width,0)
        axelflex(this.frwheel,this.flwheel,this.width,this.steering)
        structflex(this.brwheel,this.frwheel,this.length)
        structflex(this.blwheel,this.flwheel,this.length)
        structflex(this.brwheel,this.flwheel,this.hypotenuse)
        structflex(this.blwheel,this.frwheel,this.hypotenuse)
        JTD(this.brwheel.position,this.blwheel.position)
        JTD(this.frwheel.position,this.flwheel.position)
        JTD(this.brwheel.position,this.frwheel.position)
        JTD(this.blwheel.position,this.flwheel.position)
        this.brwheel.update(deltaTime);
        this.blwheel.update(deltaTime);
        this.frwheel.update(deltaTime);
        this.flwheel.update(deltaTime);
    }
}
class Car{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:GAME_WIDTH/2,y:GAME_HEIGHT/2}
        this.steering=0
        this.width=10
        this.length=20
        this.wscale=2
        this.hypotenuse=Math.sqrt(Math.pow(this.length,2)+Math.pow(this.width,2))
        this.brwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.brwheel.position.x+=this.width
        this.blwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.frwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.frwheel.position.x+=this.width
        this.frwheel.position.y-=this.length
        this.flwheel = new wheel(GAME_WIDTH,GAME_HEIGHT,this.wscale)
        this.flwheel.position.y-=this.length
        this.DOT={x:0,y:1}
    }
    draw(ctx){
        this.brwheel.draw(ctx);
        this.blwheel.draw(ctx);
        this.frwheel.draw(ctx);
        this.flwheel.draw(ctx);
    }
    accelerate(acc){
        if(acc){
            this.brwheel.acc=true
            this.brwheel.fwd=1
            this.blwheel.acc=true
            this.blwheel.fwd=-1
        }
        else{
            this.brwheel.acc=false
            this.brwheel.fwd=0
            this.blwheel.acc=false
            this.blwheel.fwd=0
        }
    }
    rev(rev){
        if(rev){
            this.brwheel.acc=true
            this.brwheel.fwd=-1
            this.blwheel.acc=true
            this.blwheel.fwd=1
        }
        else{
            this.brwheel.acc=false
            this.brwheel.fwd=0
            this.blwheel.acc=false
            this.blwheel.fwd=0
        }
    }
    brake(bra){
        if(bra){
            this.brwheel.brake()
            this.blwheel.brake()
        }
        else{
            this.brwheel.ubrake()
            this.blwheel.ubrake()
        }
    }
    update(deltaTime){
        this.position.x=(this.flwheel.position.x+this.frwheel.position.x+this.blwheel.position.x+this.brwheel.position.x)/4
        this.position.y=(this.flwheel.position.y+this.frwheel.position.y+this.blwheel.position.y+this.brwheel.position.y)/4
        let fapos = {x:(this.flwheel.position.x+this.frwheel.position.x)/2,y:(this.flwheel.position.y+this.frwheel.position.y)/2}
        this.DOT=pndiff(this.position,fapos)
        axelflex(this.brwheel,this.blwheel,this.width,0)
        axelflex(this.frwheel,this.flwheel,this.width,this.steering)
        structflex(this.brwheel,this.frwheel,this.length)
        structflex(this.blwheel,this.flwheel,this.length)
        structflex(this.brwheel,this.flwheel,this.hypotenuse)
        structflex(this.blwheel,this.frwheel,this.hypotenuse)
        JTD(this.brwheel.position,this.blwheel.position)
        JTD(this.frwheel.position,this.flwheel.position)
        JTD(this.brwheel.position,this.frwheel.position)
        JTD(this.blwheel.position,this.flwheel.position)
        this.brwheel.update(deltaTime);
        this.blwheel.update(deltaTime);
        this.frwheel.update(deltaTime);
        this.flwheel.update(deltaTime);
    }
}
class wheel{
    constructor(gamewidth,gameheight,s){
        this.acc=false
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:GAME_WIDTH/2,y:GAME_HEIGHT/2}
        this.speed={x:0,y:0}
        this.rotated=270
        this.friction={fb:0.995,side:0.85}
        this.size=s
        this.maxSpeed=2
        this.relpoints=[
            {x:-this.size/2,y:-this.size},
            {x:+this.size/2,y:-this.size},
            {x:+this.size/2,y:+this.size},
            {x:-this.size/2,y:+this.size},
        ]
        var i
        this.rotpoints=[]
        for(i=0;i<this.relpoints.length;i++){
            this.rotpoints.push({x:this.relpoints[i].x,y:this.relpoints[i].y})
        }
        this.points=[]
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
        this.hypotenuse=Math.sqrt(2)*(this.size/2)
        this.rotation=0
        this.fwd=1
    }
    draw(){
        var i
        for(i=0;i<this.points.length-1;i++){
            JTD(this.points[i],this.points[i+1])
        }
        JTD(this.points[this.points.length-1],this.points[0])
    }
    accelerate(){
        this.speed={
            x:this.speed.x+angularmov(this.rotated+90,0.1).x*this.fwd,
            y:this.speed.y+angularmov(this.rotated+90,0.1).y*this.fwd
        }
    }
    brake(){
        this.friction={fb:0.84,side:0.85}
    }
    ubrake(){
        this.friction={fb:0.995,side:0.85}
    }
    update(deltaTime) {
        if(!deltaTime) return;
        // console.log(this.rotated)
        this.speed=frictioncalc(this.speed,this.friction,angularmov(this.rotated,1))
        if(this.acc)this.accelerate();
        for(i=0;i<this.points.length;i++){
            this.rotpoints[i]=rotate_point(this.relpoints[i],this.rotated)
        }
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.rotpoints[i].x,y:this.position.y+this.rotpoints[i].y}
        }
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        // if(this.position.x<0) this.position.x=0
        // if(this.position.x > this.gamewidth) this.position.x = this.gamewidth;
        // if(this.position.y<0) this.position.y=0
        // if(this.position.y > this.gameheight) this.position.y = this.gameheight;
    }
}
function axelflex(frontwheel,backwheel,interval,steer){
    let wvector = pndiff(frontwheel.position,backwheel.position)
    COMposition={x:backwheel.position.x+wvector.x/2,y:backwheel.position.y+wvector.y/2}
    let fwdivvector=unit_vector(pndiff(frontwheel.position,COMposition))
    let bwdivvector=unit_vector(pndiff(backwheel.position,COMposition))
    let bwacc=mag(pndiff(backwheel.position,COMposition))>(interval/2)
    let fwacc=mag(pndiff(frontwheel.position,COMposition))>(interval/2)
    if(bwacc){
        backwheel.speed={x:backwheel.speed.x-bwdivvector.x*rigidity,y:backwheel.speed.y-bwdivvector.y*rigidity}
    }
    else{
        backwheel.speed={x:backwheel.speed.x+bwdivvector.x*rigidity,y:backwheel.speed.y+bwdivvector.y*rigidity}
    }
    if(fwacc){
        frontwheel.speed={x:frontwheel.speed.x-fwdivvector.x*rigidity,y:frontwheel.speed.y-fwdivvector.y*rigidity}
    }
    else{
        frontwheel.speed={x:frontwheel.speed.x+fwdivvector.x*rigidity,y:frontwheel.speed.y+fwdivvector.y*rigidity}
    }
    carspeed={x:(backwheel.speed.x+frontwheel.speed.x)/2,y:(backwheel.speed.y+frontwheel.speed.y)/2}
    let cfws=recoordinate(pndiff(frontwheel.speed,carspeed),fwdivvector)
    let cbws=recoordinate(pndiff(backwheel.speed,carspeed),bwdivvector)
    let fws=recoordinate({x:cfws.x*dampening,y:cfws.y},revert_vector(fwdivvector))
    let bws=recoordinate({x:cbws.x*dampening,y:cbws.y},revert_vector(bwdivvector))
    frontwheel.speed={x:fws.x+carspeed.x,y:fws.y+carspeed.y}
    backwheel.speed={x:bws.x+carspeed.x,y:bws.y+carspeed.y}
    frontwheel.rotated = anglefinder(fwdivvector,{x:0,y:0})+steer
    backwheel.rotated = anglefinder(bwdivvector,{x:0,y:0})+steer
}
function structflex(frontwheel,backwheel,interval){
    let wvector = pndiff(frontwheel.position,backwheel.position)
    COMposition={x:backwheel.position.x+wvector.x/2,y:backwheel.position.y+wvector.y/2}
    let fwdivvector=unit_vector(pndiff(frontwheel.position,COMposition))
    let bwdivvector=unit_vector(pndiff(backwheel.position,COMposition))
    let bwacc=mag(pndiff(backwheel.position,COMposition))>(interval/2)
    let fwacc=mag(pndiff(frontwheel.position,COMposition))>(interval/2)
    if(bwacc){
        backwheel.speed={x:backwheel.speed.x-bwdivvector.x*rigidity,y:backwheel.speed.y-bwdivvector.y*rigidity}
    }
    else{
        backwheel.speed={x:backwheel.speed.x+bwdivvector.x*rigidity,y:backwheel.speed.y+bwdivvector.y*rigidity}
    }
    if(fwacc){
        frontwheel.speed={x:frontwheel.speed.x-fwdivvector.x*rigidity,y:frontwheel.speed.y-fwdivvector.y*rigidity}
    }
    else{
        frontwheel.speed={x:frontwheel.speed.x+fwdivvector.x*rigidity,y:frontwheel.speed.y+fwdivvector.y*rigidity}
    }
    carspeed={x:(backwheel.speed.x+frontwheel.speed.x)/2,y:(backwheel.speed.y+frontwheel.speed.y)/2}
    let cfws=recoordinate(pndiff(frontwheel.speed,carspeed),fwdivvector)
    let cbws=recoordinate(pndiff(backwheel.speed,carspeed),bwdivvector)
    let fws=recoordinate({x:cfws.x*dampening,y:cfws.y},revert_vector(fwdivvector))
    let bws=recoordinate({x:cbws.x*dampening,y:cbws.y},revert_vector(bwdivvector))
    frontwheel.speed={x:fws.x+carspeed.x,y:fws.y+carspeed.y}
    backwheel.speed={x:bws.x+carspeed.x,y:bws.y+carspeed.y}
}
function frictioncalc(speed,friction,vector){
    recspeed=recoordinate(speed,vector)
    nspeed=recoordinate({x:recspeed.x*friction.side,y:recspeed.y*friction.fb},revert_vector(vector))
    return nspeed
}
function recoordinate(v,a){
    if(v.x==0 && v.y==0){
        return {x:0,y:0}
    }
    else{
        let A={
            hat:unit_vector(a),
            vector:a,
            perp:{x:0,y:0}
        }
        let V={
            mag:Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2)),
            x_y:{
                hat:unit_vector(v),
                vector:v
            },
            a_ap:{
                hat:{a:0,ap:0},
                vector:{a:0,ap:0}
            }
        }
        A.perp={x:-A.hat.y,y:A.hat.x}
        V.a_ap.hat.a=dot_product(A.hat,V.x_y.hat)
        V.a_ap.hat.ap=dot_product(A.perp,V.x_y.hat)
        V.a_ap.vector={a:V.a_ap.hat.a*V.mag,ap:V.a_ap.hat.ap*V.mag}
        return {x:V.a_ap.vector.a,y:V.a_ap.vector.ap}
    } 
}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
//---------------------------------------start shape detection----------------------------------------------------------//
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
function revert_vector(A){
    return {x:A.x,y:-A.y}
}
function unit_vector(a){
    if(a.x==0 && a.y==0){
        return {x:0,y:0}
    }
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
    }
    return a_hat
}
function dot_product(vector1,vector2){
    return vector1.x*vector2.x+vector1.y*vector2.y
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
    dist={x:0,y:0,sector:0}
    if(p1.x>p2.x){
        dist.x=p1.x-p2.x
    }
    else{
        dist.x=p2.x-p1.x
        dist.sector+=10
    }
    if(p1.y>p2.y){
        dist.y=p1.y-p2.y
    }
    else{
        dist.y=p2.y-p1.y
        dist.sector++
    }
    return dist

}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function anglefinder(p1,p2){
    dist=pndiff(p1,p2)
    if(dist.x>0){
        rang=Math.atan(dist.y/dist.x)
        ang=rang/(Math.PI/180)+180
    }
    else{
        rang=Math.atan(dist.y/dist.x)
        ang=rang/(Math.PI/180)
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
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
function mag(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2))
    return a_mag
}
//------------------------------------------end shape detection code-------------------------------------------------//
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 38:
                    car.accelerate(true)
                    break
                case 40:
                    car.rev(true)
                    break
                case 39:
                    if(car.steering<45){
                        car.steering++
                    }
                    break
                case 37:
                    if(car.steering>-45){
                        car.steering--
                    }
                    break
                case 32:
                    car.brake(true)
                    break
                case 75:
                    kill=true
                    break

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 38:
                    car.accelerate(false)
                    break
                case 40:
                    car.rev(false)
                    break
                case 32:
                    car.brake(false)
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
car = new Car(GAME_WIDTH,GAME_HEIGHT)
police = new Police(GAME_WIDTH,GAME_HEIGHT,{x:100,y:500})
new Handler()
let lastTime = 0
let loop=0
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    let start = Date.now()
    loop++
    ctx.fillStyle='#fff'
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT)
    ctx.fillStyle='#000'
    car.draw(ctx)
    car.update(deltaTime)
    police.draw(ctx)
    police.update(deltaTime)
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
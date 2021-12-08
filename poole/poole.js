const screenresolution=2
const wall_cor=0.7
let ballstop=true
let balls=[]
let playerballred={
    p1:true,
    p2:false
}
let playerball={
    p1:'Not Confirmed',
    p2:'Not Confirmed'
}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
class Pots{
    constructor(gameheight,gamewidth,radii,offset){
        this.radii=radii
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.positions=[
            {x:offset,y:offset},
            {x:this.gamewidth/2,y:offset},
            {x:this.gamewidth-offset,y:offset},
            {x:offset,y:this.gameheight-offset},
            {x:this.gamewidth/2,y:this.gameheight-offset},
            {x:this.gamewidth-offset,y:this.gameheight-offset},
        ]
    }
    draw(ctx){
        ctx.fillStyle='#000'
        for(var i=0;i<this.positions.length;i++){
            DrawCircle(this.radii,this.positions[i],ctx,screenresolution)
        }
    }
    inPot(position){
        for(var i=0;i<this.positions.length;i++){
            let distvector=diff(position,this.positions[i])
            let distscalar=Math.sqrt(Math.pow(distvector.x,2)+Math.pow(distvector.y,2))
            if(distscalar<this.radii){
                return true
            }
        }
        return false
    }
}
class Cue_ball{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.size=10
        this.position={x:600,y:300}
        this.speed={x:0,y:0}
        this.p1turn=true
        this.wasp1turn=true
        this.colors={
            p1:'#0ff',
            p2:'#f0f'
        }
        this.firsthit='none'
        this.maxSpeed=10
        this.cor=0.9
        this.cof=0.01
        this.mass=1
        this.goes=1
        this.aim={
            angle:180,
            power:5,
            drawn:true
        }
        this.fouled=false
    }
    draw(ctx){
        if(!this.fouled){
            ctx.fillStyle = '#fff'
        }
        else{
            if(this.p1turn){
                ctx.fillStyle=this.colors.p1
            }
            else{
                ctx.fillStyle=this.colors.p2
            }
        }
        DrawCircle(this.size,this.position,ctx,screenresolution)
        if(this.aim.drawn){
            if(this.p1turn){
                ctx.fillStyle=this.colors.p1
            }
            else{
                ctx.fillStyle=this.colors.p2
            }
            drawline(this.position,this.aim.angle,this.aim.power*10,3)
        }
    }
    fupdate(){
        if(this.position.x<this.size){
            this.position.x=this.size;
        }
        if(this.position.x + this.size > 800){
            this.position.x = 800 - this.size;
        }
        if(this.position.y<this.size){
            this.position.y=this.size;
        }
        if(this.position.y + this.size > 600){
            this.position.y = 600 - this.size;
        }
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed={x:this.speed.x*(1-this.cof),y:this.speed.y*(1-this.cof)}
        if(!ballstop){
            this.aim.drawn=false
        }
        if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))<0.1){
            if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))>0){
                console.log(this.firsthit)
                if(this.wasp1turn){
                    if(playerballred.p1){
                        if(this.firsthit=='#ff0' || this.firsthit=='none'){
                            this.goes=2
                            this.p1turn=!this.wasp1turn
                        }
                    }
                    else{
                        if(this.firsthit=='#f00' || this.firsthit=='none'){
                            this.goes=2
                            this.p1turn=!this.wasp1turn
                        }
                    }
                }
                else{
                    if(playerballred.p2){
                        if(this.firsthit=='#ff0' || this.firsthit=='none'){
                            this.goes=2
                            this.p1turn=!this.wasp1turn
                        }
                    }
                    else{
                        if(this.firsthit=='#f00' || this.firsthit=='none'){
                            this.goes=2
                            this.p1turn=!this.wasp1turn
                        }
                    }
                }
            }
            this.speed={x:0,y:0}
            if(ballstop){
                this.aim.drawn=true
            }
        }
        if(this.position.x<this.size){
            this.position.x=this.size;
            this.speed.x=-this.speed.x*wall_cor
        }
        if(this.position.x + this.size > 800){
            this.position.x = 800 - this.size;
            this.speed.x=-this.speed.x*wall_cor
        }
        if(this.position.y<this.size){
            this.position.y=this.size;
            this.speed.y=-this.speed.y*wall_cor
        }
        if(this.position.y + this.size > 600){
            this.position.y = 600 - this.size;
            this.speed.y=-this.speed.y*wall_cor
        }
        if(pots.inPot(this.position)){
            this.fouled=true
            this.aim.drawn=false
            this.goes++
            this.position={x:this.gamewidth/2,y:this.gameheight/2}
            this.speed={x:0,y:0}
        }
    }
}
class Ball{
    constructor(gamewidth,gameheight,color,pos,i){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.identifier=i
        this.size=10
        this.position=pos
        this.speed={x:0,y:0}
        this.color=color
        this.maxSpeed=10
        this.cor=0.9
        this.cof=0.01
        this.mass=1
        this.dead=false
        this.stopped=true
        if(this.color=='#f00'){
            this.red=true
        }
        else{
            this.red=false
        }
    }
    draw(ctx){
        ctx.fillStyle=this.color
        DrawCircle(this.size,this.position,ctx,screenresolution)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed={x:this.speed.x*(1-this.cof),y:this.speed.y*(1-this.cof)}
        if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))<0.1){
            this.speed={x:0,y:0}
            this.stopped=true
        }
        else{
            this.stopped=false
        }
        if(this.position.x<this.size){
            this.position.x=this.size;
            this.speed.x=-this.speed.x*wall_cor
        }
        if(this.position.x + this.size > 800){
            this.position.x = 800 - this.size;
            this.speed.x=-this.speed.x*this.cor
        }
        if(this.position.y<this.size){
            this.position.y=this.size;
            this.speed.y=-this.speed.y*wall_cor
        }
        if(this.position.y + this.size > 600){
            this.position.y = 600 - this.size;
            this.speed.y=-this.speed.y*wall_cor
        }
        if(pots.inPot(this.position)){
            this.dead=true
            if(cue_ball.wasp1turn){
                if(this.red=playerballred.p1){
                    cue_ball.p1turn=true//extra go
                }
                else{
                    cue_ball.goes=2//fouled
                }
            }
            else{
                if(this.red=playerballred.p2){
                    cue_ball.p1turn=true//extra go
                }
                else{
                    cue_ball.goes=2//fouled
                }
            }
        }
        balls.forEach(ball=>{
            if(this.identifier!=ball.identifier){
                if(CircleDetect(this.position,this.size,ball.position,ball.size)){
                    let reversepos=reverse(ball.position,ball.size,this.position,this.size,ball.speed)
                    ball.position=reversepos
                    let A=pndiff(ball.position,this.position)
                    let speed1 = recoordinate(this.speed,A)
                    let speed2 = recoordinate(ball.speed,A)
                    let aspeed1 = {x:OCC(this.mass,ball.mass,speed1.x,speed2.x,this.cor).u1,y:speed1.y}
                    let aspeed2 = {x:OCC(this.mass,ball.mass,speed1.x,speed2.x,this.cor).u2,y:speed2.y}
                    let Ar={x:A.x,y:-A.y}
                    this.speed=recoordinate(aspeed1,Ar)
                    ball.speed=recoordinate(aspeed2,Ar)
                }
            }
        })
        
    }
    detectCue(){
        if(CircleDetect(this.position,this.size,cue_ball.position,cue_ball.size)){
            cue_ball.position=reverse(cue_ball.position,cue_ball.size,this.position,this.size,cue_ball.speed)
            let A=pndiff(cue_ball.position,this.position)
            let speed1 = recoordinate(this.speed,A)
            let speed2 = recoordinate(cue_ball.speed,A)
            let aspeed1 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u1,y:speed1.y}
            let aspeed2 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u2,y:speed2.y}
            let Ar={x:A.x,y:-A.y}
            this.speed=recoordinate(aspeed1,Ar)
            cue_ball.speed=recoordinate(aspeed2,Ar)
            if(cue_ball.firsthit=='none'){
                cue_ball.firsthit=this.color
            }
        }
    }
}
class Handler{
    constructor(){
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle++
                    }
                    else{
                        cue_ball.position.x-=5
                    }
                    break;
                case 39:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle--
                    }
                    else{
                        cue_ball.position.x+=5
                    }
                    break;
                case 38:
                    if(!cue_ball.fouled){
                        cue_ball.aim.power++
                    }
                    else{
                        cue_ball.position.y-=5
                    }
                    break
                case 40:
                    if(!cue_ball.fouled){
                        cue_ball.aim.power--
                    }
                    else{
                        cue_ball.position.y+=5
                    }
                    break
                case 32:
                    if(!cue_ball.fouled){
                        if(cue_ball.aim.drawn){
                            cue_ball.speed=angularmov(cue_ball.aim.angle,cue_ball.aim.power)
                            cue_ball.aim.drawn=false
                            cue_ball.firsthit='none'
                            cue_ball.wasp1turn=cue_ball.p1turn
                            if(cue_ball.goes==1){
                                cue_ball.p1turn=!cue_ball.p1turn
                            }
                            else{
                                cue_ball.goes--
                            }
                        }
                    }
                    else{
                        cue_ball.fouled=false
                    }
                    break
            }
        });

    }
}
function reverse(pos1,rad1,pos2,rad2,speed){
    let Speed=unit_vector(speed)
    if(speed.x==0 && speed.y==0){
        return pos1
    }
    let newpos1={x:pos1.x-Speed.x,y:pos1.y-Speed.y}
    if(CircleDetect(newpos1,rad1,pos2,rad2)){
        return reverse(newpos1,rad1,pos2,rad2,speed)
    }
    else{
        return newpos1
    }
}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
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
function drawline(origin,ang,length,width){
    for(i=0;i<length;i+=screenresolution){
        pos=angularmov(ang,i)
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,screenresolution*width/2,screenresolution*width/2)
    }
}
function DrawCircle(radius,position,ctx,resolution){
    for(var i=-radius;i<radius;i+=resolution){
        for(var j=-radius;j<radius;j+=resolution){
            if(Math.floor(Math.sqrt(Math.pow(j,2)+Math.pow(i,2)))<radius){
                ctx.fillRect(position.x+i,position.y+j,resolution,resolution)
            }
        }
    }
}
function CircleDetect(p1,r1,p2,r2){
    let sr=r1+r2
    let distvector=diff(p1,p2)
    let distscalar=Math.sqrt(Math.pow(distvector.x,2)+Math.pow(distvector.y,2))
    if(distscalar<=sr){
        return true
    }
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
function dot_product(vector1,vector2){
    return vector1.x*vector2.x+vector1.y*vector2.y
}
function unit_vector(a){
    if(a=={x:0,y:0}){
        return {x:0,y:0}
    }
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
    }
    return a_hat
}
function OCC(m1,m2,v1,v2,E){
    return {
        u1:(v1*(m1-m2)+2*m2*v2)/(m1+m2),
        u2:(v2*(m2-m1)+2*m1*v1)/(m2+m1)
    }
}
let score=1
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600
pots = new Pots(GAME_HEIGHT,GAME_WIDTH,20,5)
for(var i=0;i<3;i++){
    balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,'#f00',{x:300-21*i,y:289},i))
}
for(var i=0;i<3;i++){
    balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,'#ff0',{x:300-20*i,y:311},i+3))
}
cue_ball = new Cue_ball(GAME_WIDTH,GAME_HEIGHT)
new Handler(cue_ball);

let lastTime = 0
cue_ball.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle='#080'
    ctx.fillRect(0,0,800,600)
    pots.draw(ctx)
    ballstop=true
    balls.forEach(ball=>{
        if(!ball.dead){
            ball.draw(ctx)
            ball.update(deltaTime)
        }
        else{
            ball.stopped=true
        }
        if(!ball.stopped){
            ballstop=false
        }
        if(!cue_ball.fouled){
            ball.detectCue()
        }
    })
    if(!cue_ball.fouled){
        cue_ball.update(deltaTime);
    }
    else{
        cue_ball.fupdate()
    }
    if(playerballred.p1){
        playerball.p1='Red'
    }
    else{
        playerball.p1='Yellow'
    }
    if(playerballred.p2){
        playerball.p2='Red'
    }
    else{
        playerball.p2='Yellow'
    }
    document.getElementById('goes').textContent='number of goes = '+cue_ball.goes
    document.getElementById('playerballs').textContent='player1(cyan) is '+playerball.p1+'; player2(magenta) is '+playerball.p2
    cue_ball.draw(ctx);
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)
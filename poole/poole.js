const screenresolution=2
const wall_cor=0.7
let ballstop=true
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
        this.position={x:this.size,y:this.size}
        this.speed={x:0,y:0}
        this.p1turn=true
        this.colors={
            p1:'#ff0',
            p2:'#0ff'
        }
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
            drawline(this.position,this.aim.angle,this.aim.power*3,3)
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
        if(this.goes>0){
            this.p1turn=true
        }
        else{
            this.p1turn=false
        }
        if(!ballstop){
            this.aim.drawn=false
        }
        if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))<0.1){
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
            this.position={x:this.gamewidth/2,y:this.gameheight/2}
            this.speed={x:0,y:0}
        }
    }
}
class Ball{
    constructor(gamewidth,gameheight,color){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.size=10
        this.position={x:300,y:300}
        this.speed={x:0,y:0}
        this.color=color
        this.maxSpeed=10
        this.cor=0.9
        this.cof=0.01
        this.mass=1
        this.dead=false
        this.stopped=true
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
        if(Math.sqrt(Math.pow(this.speed.x,2)+this.speed.y,2)<0.1){
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
        }
        // if(CircleDetect(this.position,this.size,cue_ball.position,cue_ball.size)){
        //     let A=pndiff(cue_ball.position,this.position)
        //     cue_ball.position={x:this.position.x+unit_vector(A).x*(this.size+cue_ball.size),y:this.position.y+unit_vector(A).y*(this.size+cue_ball.size)}
        //     let speed1 = recoordinate(this.speed,A)
        //     let speed2 = recoordinate(cue_ball.speed,A)
        //     let aspeed1 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u1,y:speed1.y}
        //     let aspeed2 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u2,y:speed2.y}
        //     let Ar={x:A.x,y:-A.y}
        //     this.speed=recoordinate(aspeed1,Ar)
        //     cue_ball.speed=recoordinate(aspeed2,Ar)
        //     console.log(this.position)
        // }
    }
    detectCue(){
        if(CircleDetect(this.position,this.size,cue_ball.position,cue_ball.size)){
            let A=pndiff(cue_ball.position,this.position)
            cue_ball.position={x:this.position.x+unit_vector(A).x*(this.size+cue_ball.size),y:this.position.y+unit_vector(A).y*(this.size+cue_ball.size)}
            let speed1 = recoordinate(this.speed,A)
            let speed2 = recoordinate(cue_ball.speed,A)
            let aspeed1 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u1,y:speed1.y}
            let aspeed2 = {x:OCC(this.mass,cue_ball.mass,speed1.x,speed2.x,this.cor).u2,y:speed2.y}
            let Ar={x:A.x,y:-A.y}
            this.speed=recoordinate(aspeed1,Ar)
            cue_ball.speed=recoordinate(aspeed2,Ar)
        }
    }
}
class Handler{
    constructor() {
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
                            if(cue_ball.p1turn){
                                if(cue_ball.goes==1){
                                    cue_ball.goes-=2
                                }
                                cue_ball.goes--
                            }
                            else{
                                if(cue_ball.goes==1){
                                    cue_ball.goes+=2
                                }
                                cue_ball.goes++
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
ball = new Ball(GAME_WIDTH,GAME_HEIGHT,'#f00')
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
    if(!ball.dead){
        ball.draw(ctx)
        ball.update(deltaTime)
    }
    if(!cue_ball.fouled){
        ball.detectCue()
        cue_ball.update(deltaTime);
    }
    else{
        cue_ball.fupdate()
    }
    console.log(ballstop)
    if(ball.stopped){
        ballstop=true
    }
    else{
        ballstop=false
    }
    cue_ball.draw(ctx);
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)
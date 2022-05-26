const screenresolution=1
const wall_cor=0.8
const gravity=0.05
let balls=[]
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
class Ball{
    constructor(gamewidth,gameheight,pos,i,size,mass){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.identifier=i
        this.size=size
        this.position=pos
        this.speed={x:0,y:0}
        if(size==20){
            this.speed={x:3,y:0}
        }
        this.maxSpeed=10
        this.cor=1.1
        this.cof=0
        this.mass=mass
        this.dead=false
    }
    draw(ctx){
        DrawCircle(this.size,this.position,ctx,screenresolution)
        // ctx.fillRect(this.position.x,this.position.y,1,1)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed={x:this.speed.x*(1-this.cof),y:this.speed.y*(1-this.cof)}
        this.speed.y+=gravity
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
        balls.forEach(ball=>{
            if(this.identifier!=ball.identifier){
                if(CircleDetect(this.position,this.size,ball.position,ball.size)){
                    let reversepoints = reverse1(this.position,this.size,this.speed,ball.position,ball.size,ball.speed)
                    this.position=reversepoints.p1
                    ball.position=reversepoints.p2
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
}
function reverse1(pos1,rad1,speed1,pos2,rad2,speed2){
    let mag1 = Math.sqrt(Math.pow(speed1.x,2)+Math.pow(speed1.y,2))
    let mag2 = Math.sqrt(Math.pow(speed2.x,2)+Math.pow(speed2.y,2))
    let Speed1
    let Speed2
    if(mag2>mag1){
        Speed1={
            x:speed1.x/mag2,
            y:speed1.y/mag2
        }
        Speed2={
            x:speed2.x/mag2,
            y:speed2.y/mag2
        }
    }
    else{
        Speed1={
            x:speed1.x/mag1,
            y:speed1.y/mag1
        }
        Speed2={
            x:speed2.x/mag1,
            y:speed2.y/mag1
        }
    }
    let newpos1={x:pos1.x-Speed1.x,y:pos1.y-Speed1.y}
    let newpos2={x:pos2.x-Speed2.x,y:pos2.y-Speed2.y}
    if(CircleDetect(newpos1,rad1,pos2,rad2)){
        return reverse1(newpos1,rad1,speed1,newpos2,rad2,speed2)
    }
    else{
        return {p1:newpos1,p2:newpos2}
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
    let distvector=pndiff(p1,p2)
    let distscalar=Math.sqrt(Math.pow(distvector.x,2)+Math.pow(distvector.y,2))
    if(distscalar<=sr){
        return true
    }
    return false
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
for(var i=0;i<9;i++){
    balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:600-50*i,y:289},i,5,1))
}
for(var i=0;i<9;i++){
    balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:700-60*i,y:311},i+9,5,1))
}
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:300-20*i,y:311},19,20,16))
let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    balls.forEach(ball=>{
        ball.update(deltaTime)
        ball.draw(ctx)
    })
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)
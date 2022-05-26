const screenresolution=1
const wall_cor=0.8
const bigG=1
const EM =5000
var textFileUrl = null
let dead=false
let balls=[]
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
class Ball{
    constructor(gamewidth,gameheight,pos,i,size,mass,charge){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.identifier=i
        this.size=size
        this.position=pos
        this.speed={x:0,y:0}
        this.maxSpeed=10
        this.cor=1
        this.cof=0
        this.mass=mass
        this.charge=charge
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
                // if(CircleDetect(this.position,this.size,ball.position,ball.size)){
                //     let reversepoints = reverse1(this.position,this.size,this.speed,ball.position,ball.size,ball.speed)
                //     this.position=reversepoints.p1
                //     ball.position=reversepoints.p2
                //     let A=pndiff(ball.position,this.position)
                //     let speed1 = recoordinate(this.speed,A)
                //     let speed2 = recoordinate(ball.speed,A)
                //     let aspeed1 = {x:OCC(this.mass,ball.mass,speed1.x,speed2.x,this.cor).u1,y:speed1.y}
                //     let aspeed2 = {x:OCC(this.mass,ball.mass,speed1.x,speed2.x,this.cor).u2,y:speed2.y}
                //     let Ar={x:A.x,y:-A.y}
                //     this.speed=recoordinate(aspeed1,Ar)
                //     ball.speed=recoordinate(aspeed2,Ar)
                // }
                //GRAVITY
                let dist = mag(pndiff(ball.position,this.position))
                let dvector=pndiff(ball.position,this.position)
                let force = (ball.mass*this.mass/Math.pow(dist,2))*bigG
                this.speed={x:this.speed.x+unit_vector(dvector).x*(force/this.mass),y:this.speed.y+unit_vector(dvector).y*(force/this.mass)}
                ball.speed={x:ball.speed.x-unit_vector(dvector).x*(force/ball.mass),y:ball.speed.y-unit_vector(dvector).y*(force/ball.mass)}
                //ELECTROMAGNETIC FORCE
                dist = mag(pndiff(ball.position,this.position))
                dvector=pndiff(ball.position,this.position)
                force = -(ball.charge*this.charge/Math.pow(dist,3))*EM
                this.speed={x:this.speed.x+unit_vector(dvector).x*(force/this.mass),y:this.speed.y+unit_vector(dvector).y*(force/this.mass)}
                ball.speed={x:ball.speed.x-unit_vector(dvector).x*(force/ball.mass),y:ball.speed.y-unit_vector(dvector).y*(force/ball.mass)}
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
function mag(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2))
    return a_mag
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
function generateJsonFileUrl(array) {
    var json = JSON.stringify(array)
    let fileData = new Blob([json],{type: 'application/json'});
    if (textFileUrl !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFileUrl = window.URL.createObjectURL(fileData);
    return textFileUrl;
};
function downloaddata(data){
    document.getElementById('downloadLink').href = generate=generateJsonFileUrl(data);
}
function rubbersheet(obs,pixels){
    let forcevectors
    let cut
    let gradient=[]
    for(var i=0;i<GAME_WIDTH/pixels;i++){
        gradient.push([])
        for(var j=0;j<GAME_HEIGHT/pixels;j++){
            forcevectors=[]
            cut=false
            obs.forEach(ball =>{
                let dist = mag(pndiff({x:i*pixels,y:j*pixels},ball.position))
                if(dist>0){
                    let dvector = pndiff({x:i*pixels,y:j*pixels},ball.position)
                    let Gforce = (ball.mass/dist)*bigG
                    let EMforce = -(ball.charge*2/Math.pow(dist,2))*EM
                    forcevectors.push({x:-unit_vector(dvector).x*(Gforce),y:-unit_vector(dvector).y*(Gforce)})
                }
                else{
                    cut=true
                    ctx.fillStyle='#000'
                    ctx.fillRect(i*pixels,j*pixels,pixels,pixels)
                    gradient[i].push(0)
                }
                
            })
            if(!cut){
                let sum =0
                for(var n=0;n<forcevectors.length;n++){
                    sum+=mag(forcevectors[n])
                }
                let percent=(1-sum*2)
                if(percent>0){
                    let color=letters(basebasher(Math.floor(percent*Math.pow(16,2)),16,2))
                    ctx.fillStyle=color
                    ctx.fillRect(i*pixels,j*pixels,pixels,pixels)
                }
                else{
                    ctx.fillStyle='#000'
                    ctx.fillRect(i*pixels,j*pixels,pixels,pixels)
                }
                gradient[i].push(percent*100)
                
            }
        }
    }
    return gradient
}
function basebasher(dec,base,dignum){
    var digits=[]
    x=true
    while(x){
        digits.push(dec%base)
        dec=rounding(dec/base,0)
        if(dec==0){
            x=false
        }
    }
    if(digits.length<dignum){
        while(dignum>digits.length){
            digits.push(0)
        }
    }
    return digits.reverse()
}
function letters(arr){
    let alpha="0123456789abcdefghijklmnopqrstuvwxyz"
    nstr=''
    for(i=0;i<arr.length;i++){
        nstr=nstr+alpha[arr[i]]
    }
    return '#'+nstr+nstr+nstr
}
function rounding(num,ud){
    if(num%1==0){
        return num
    }
    else{
        rem=num%1
        num-=rem
        num+=ud
        return num
    }
}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    dead=true
                    downloaddata(rubbersheet(balls,1))
                    break
            }
        });
    }
}
let score=1
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
new Handler()
const GAME_WIDTH=800
const GAME_HEIGHT=600
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:100,y:300},1,10,10,1))
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:200,y:400},2,10,10,1))
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:300,y:300},3,10,10,1))
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:400,y:300},4,10,10,1)) 
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:500,y:400},5,10,10,1))
balls.push(new Ball(GAME_WIDTH,GAME_HEIGHT,{x:500,y:300},6,10,10,1))
let lastTime = 0
// balls[2].speed.y+=0.1
balls[2].speed.y-=0
balls[1].speed.y-=0.1
balls[0].speed.y+=0.3
function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    balls.forEach(ball=>{
        ball.update(deltaTime)
        ctx.fillStyle='#0ff'
        ball.draw(ctx)
    })
    // rubbersheet(balls,2)
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    
}
requestAnimationFrame(gameloop)
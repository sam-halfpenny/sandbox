class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:5,y:0}
        this.size=10
        this.maxSpeed=10
        this.cor=0.7
        this.cof=0.01
    }
    draw(ctx){
        ctx.fillStyle = '#0ff'
        DrawCircle(this.size,this.position,ctx,1)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.speed={x:this.speed.x*(1-this.cof),y:this.speed.y*(1-this.cof)}
        if(this.speed.x<0.1 && this.speed.x>-0.1){
            this.speed.x=0
        }
        if(this.speed.y<0.1 && this.speed.y>-0.1){
            this.speed.y=0
        }
        if(this.position.x<this.size){
            this.position.x=0;
            this.speed.x=-this.speed.x*this.cor
        }
        if(this.position.x + this.size > 800){
            this.position.x = 800 - this.size;
            this.speed.x=-this.speed.x*this.cor
        }
        if(this.position.y<this.size){
            this.position.y=0;
            this.speed.y=-this.speed.y*this.cor
        }
        if(this.position.y + this.size > 600){
            this.position.y = 600 - this.size;
            this.speed.y=-this.speed.y*this.cor
        }
    }

}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.moveLeft()
                    break;
                case 39:
                    dodger.moveRight()
                    break;
                case 38:
                    dodger.moveup()
                    break
                case 40:
                    dodger.movedown()
                    break
            

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(dodger.speed.x<0){
                        dodger.stopx()
                    }
                    break
                case 39:
                    if(dodger.speed.x>0){
                        dodger.stopx()
                    }
                    break;
                case 38:
                    if(dodger.speed.y<0){
                        dodger.stopy()
                    }
                    break
                
                case 40:
                    if(dodger.speed.y>0){
                        dodger.stopy()
                    }
                    break
                

            }
        });

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
let score=1
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
dodger.position.x = GAME_WIDTH/2 - dodger.size/2
dodger.position.y = GAME_HEIGHT/2 - dodger.size/2
new Handler(dodger);

let lastTime = 0
dodger.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    dodger.update(deltaTime);
    dodger.draw(ctx);
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
balls=[]
const wall_cor=0.7
const phi=(1+Math.sqrt(5))/2
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
                    tiltfactor++
                    break
                case 39:
                    tiltfactor--
                    break
                case 32:
                    dead=true
                    break
                case 65:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle.lat++
                    }
                    else{
                        cue_ball.position.x-=5
                    }
                    break;
                case 68:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle.lat--
                    }
                    else{
                        cue_ball.position.x+=5
                    }
                    break;
                case 87:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle.long++
                    }
                    else{
                        cue_ball.position.y-=5
                    }
                    break
                case 83:
                    if(!cue_ball.fouled){
                        cue_ball.aim.angle.long--
                    }
                    else{
                        cue_ball.position.y+=5
                    }
                    break
                case 107:
                    if(!cue_ball.fouled){
                        cue_ball.aim.power++
                    }
                    else{
                        cue_ball.position.y+=5
                    }
                    break
                case 109:
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
class Cue_ball{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.size=100
        this.position={x:200,y:200,z:200}
        this.speed={x:0,y:0,z:0}
        this.p1turn=true
        // this.wasp1turn=true
        this.colors={
            p1:'#0ff',
            p2:'#f0f'
        }
        // this.firsthit='none'
        // this.maxSpeed=10
        this.cor=0.9
        this.cof=0.01
        this.mass=1
        this.goes=1
        this.aim={
            angle:{
                lat:180,
                long:180
            },
            power:5,
            drawn:true
        }
        this.fouled=false
        this.onblack={
            p1:false,
            p2:false
        }
    }
    draw(ctx){
        // if(!this.fouled){
        //     ctx.fillStyle = '#fff'
        // }
        // else{
        //     if(this.p1turn){
        //         ctx.fillStyle=this.colors.p1
        //     }
        //     else{
        //         ctx.fillStyle=this.colors.p2
        //     }
        // }
        drawsphere(this.position,this.size)
        if(this.aim.drawn){
            if(this.p1turn){
                ctx.fillStyle=this.colors.p1
            }
            else{
                ctx.fillStyle=this.colors.p2
            }
            console.log(iso_map(this.position),{x:iso_map(this.position).x+angularmov3D(this.aim.angle.lat,this.aim.angle.long,this.aim.power).x,y:iso_map(this.position).y+angularmov3D(this.aim.angle.lat,this.aim.angle.long,this.aim.power).y})
            JTD(iso_map(this.position),iso_map({x:this.position.x+angularmov3D(this.aim.angle.lat,this.aim.angle.long,this.aim.power).x,y:this.position.y+angularmov3D(this.aim.angle.lat,this.aim.angle.long,this.aim.power).y}))
        }
    }
    // fupdate(){
    //     if(this.position.x<this.size){
    //         this.position.x=this.size;
    //     }
    //     if(this.position.x + this.size > 800){
    //         this.position.x = 800 - this.size;
    //     }
    //     if(this.position.y<this.size){
    //         this.position.y=this.size;
    //     }
    //     if(this.position.y + this.size > 600){
    //         this.position.y = 600 - this.size;
    //     }
    // }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.position.z += this.speed.z
        this.speed={x:this.speed.x*(1-this.cof),y:this.speed.y*(1-this.cof),z:this.speed.z*(1-this.cof)}
        // if(!ballstop){
        //     this.aim.drawn=false
        // }
        // if(this.p1turn){
        //     if(playerballred.p1){
        //         this.onblack.p1=true
        //         for(var i=0;i<7;i++){
        //             if(!balls[i].dead){
        //                 this.onblack.p1=false
        //             }
        //         }
        //     }
        //     else{
        //         this.onblack.p1=true
        //         for(var i=7;i<14;i++){
        //             if(!balls[i].dead){
        //                 this.onblack.p1=false
        //             }
        //         }
        //     }
        // }
        // else{
        //     if(playerballred.p2){
        //         this.onblack.p2=true
        //         for(var i=0;i<7;i++){
        //             if(!balls[i].dead){
        //                 this.onblack.p2=false
        //             }
        //         }
        //     }
        //     else{
        //         this.onblack.p2=true
        //         for(var i=7;i<14;i++){
        //             if(!balls[i].dead){
        //                 this.onblack.p2=false
        //             }
        //         }
        //     }
        // }
        // if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))<0.1){
        //     if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2))>0){
        //         console.log(this.firsthit)
        //         if(playerballred.p1!='nc'){
        //             if(this.wasp1turn){
        //                 if(playerballred.p1){
        //                     if(this.firsthit=='#ff0' || this.firsthit=='none'){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                     else if(this.firsthit=='#000' && this.onblack.p1!=true){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                 }
        //                 else{
        //                     if(this.firsthit=='#f00' || this.firsthit=='none'){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                     else if(this.firsthit=='#000' && this.onblack.p1!=true){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                 }
        //             }
        //             else{
        //                 if(playerballred.p2){
        //                     if(this.firsthit=='#ff0' || this.firsthit=='none'){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                     else if(this.firsthit=='#000' && this.onblack.p2!=true){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                 }
        //                 else{
        //                     if(this.firsthit=='#f00' || this.firsthit=='none'){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                     else if(this.firsthit=='#000' && this.onblack.p2!=true){
        //                         this.goes=2
        //                         this.p1turn=!this.wasp1turn
        //                     }
        //                 }
        //             }
        //         }
        //         else{
        //             if(this.wasp1turn){
        //                 if(this.firsthit=='#000' && this.onblack.p1!=true){
        //                     this.goes=2
        //                     this.p1turn=!this.wasp1turn
        //                 }
        //             }
        //             else{
        //                 if(this.firsthit=='#000' && this.onblack.p2!=true){
        //                     this.goes=2
        //                     this.p1turn=!this.wasp1turn
        //                 }
        //             }
        //         }
        //     }
        //     this.speed={x:0,y:0}
        //     if(ballstop){
        //         this.aim.drawn=true
        //     }
        // }
        if(Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2)+Math.pow(this.speed.z,2))<1){
            this.speed={x:0,y:0,z:0}
            this.aim.drawn=true
        }
        if(this.position.x<this.size){
            this.position.x=this.size;
            this.speed.x=-this.speed.x*wall_cor
        }
        if(this.position.x + this.size > 600){
            this.position.x = 600 - this.size;
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
        if(this.position.z<this.size){
            this.position.z=this.size;
            this.speed.z=-this.speed.z*wall_cor
        }
        if(this.position.z + this.size > 600){
            this.position.z = 600 - this.size;
            this.speed.z=-this.speed.z*wall_cor
        }
        // if(pots.inPot(this.position)){
        //     this.fouled=true
        //     this.aim.drawn=false
        //     this.goes++
        //     this.position={x:this.gamewidth/2,y:this.gameheight/2}
        //     this.speed={x:0,y:0}
        // }
    }
}
function unit_vector(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)+Math.pow(a.z,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
        z:a.z/a_mag
    }
    return a_hat
}
const sunang=0
const ambientlightfactor=0
let lightsourcevector=unit_vector({x:0,y:-4,z:0})
const GAME_SIZE=600
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter3D={x:G,y:G,z:G}
let pixeldepth=[]
for(var i=0;i<GAME_SIZE;i++){
    pixeldepth.push([])
    for(var j=0;j<GAME_SIZE;j++){
        pixeldepth[i].push({filled:false,depth:0})
    }
}
let lv={
    x:0,
    y:0,
    z:0
}
let kill=false
let dead=false
let intensity=10
let perspective=intensity*GAME_SIZE
let rotationfactor=10
let tiltfactor=10
let spinfactor=90
function iso_map(pos){
    let isopos
    let relpos=pndiff3D(pos,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,tiltfactor,rotationfactor,spinfactor),perspective,intensity)
    let final={
        x:isopos.x+epicenter3D.x,
        y:isopos.y+epicenter3D.y,
        z:isopos.z+epicenter3D.z
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
function add_perspective(point,perspective,intensity){
    // let Matrix = [
    //     [1,0,0,0],
    //     [0,1,0,0],
    //     [0,0,1,0],
    //     [0,0,1/perspective,0]
    // ]
    let z = intensity*G-point.z
    let npoint={
        x:point.x/perspective*z,
        y:point.y/perspective*z,
        z:point.z
    }
    return npoint
}
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
    let values
    let lindiffhl=pndiff3D(lp,hp)
    let lindiffhm=pndiff3D(mp,hp)
    let lindiffml=pndiff3D(lp,mp)
    let vectorhl=lindiffhl.x/lindiffhl.y
    let vectorhm=lindiffhm.x/lindiffhm.y
    let vectorml=lindiffml.x/lindiffml.y
    let dvectorhl=lindiffhl.z/lindiffhl.y
    let dvectorhm=lindiffhm.z/lindiffhm.y
    let dvectorml=lindiffml.z/lindiffml.y
    let linpointss=[]
    let linpointsl=[]
    let lindifflr=0
    let dvectorlr=0
    let leftpoints=0
    let rightpoints=0
    for(var i=0;i<=Math.floor(lindiffhl.y);i++){
        linpointss.push({x:hp.x+i*vectorhl,y:i+hp.y,z:hp.z+i*dvectorhl})
    }
    for(var i=0;i<=Math.floor(lindiffhm.y);i++){
        linpointsl.push({x:hp.x+i*vectorhm,y:i+hp.y,z:hp.z+i*dvectorhm})
    }
    for(var i=0;i<=Math.floor(lindiffml.y)+1;i++){
        linpointsl.push({x:mp.x+i*vectorml,y:i+mp.y,z:mp.z+i*dvectorml})
    }
    if(vectorhm>vectorhl){
        leftpoints=linpointss
        rightpoints=linpointsl
    }
    else{
        leftpoints=linpointsl
        rightpoints=linpointss
    }
    for(var i=0;i<linpointss.length;i++){
        // console.log(rightpoints[i],leftpoints[i])
        lindifflr=pndiff3D(rightpoints[i],leftpoints[i])
        dvectorlr=lindifflr.z/lindifflr.x
        // ctx.fillRect(Math.floor(leftpoints[i].x),Math.floor(leftpoints[i].y),leftpoints[i].x-leftpoints[i].x,1)
        for(var j=0;j<lindifflr.x;j++){
            if(pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)].depth>leftpoints[i].z+dvectorlr*j || pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)].filled==false){
                //console.log(leftpoints[i].z+dvectorlr*j)
                values={filled:true,depth:leftpoints[i].z+dvectorlr*j}
                pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)]=values
                ctx.fillRect(Math.floor(leftpoints[i].x)+j,Math.floor(leftpoints[i].y),1,1)
            }
        }
    }
}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function pndiff3D(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y,z:p1.z-p2.z}
    return dist
}
function JTD(p1,p2){
    ctx.fillStyle='#0f0'
    let hp
    let lp
    if(p1.y<p2.y){
        hp=p1
        lp=p2
    }
    else{
        hp=p2
        lp=p1
    }
    let lindiffhl=pndiff3D(lp,hp)
    let vectorhl=lindiffhl.x/lindiffhl.y
    let dvectorhl=lindiffhl.z/lindiffhl.y
    for(var i=0;i<lindiffhl.y;i++){
        if(pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)].depth>i*dvectorhl+hp.z || pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)].filled==false){
            values={filled:true,depth:hp.z+dvectorhl*i}
            pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)]=values
            if(i==lindiffhl.y-1){
                ctx.fillRect(Math.floor(i*vectorhl)+hp.x,hp.y+i,2,2)
            }
            else{
                ctx.fillRect(Math.floor(i*vectorhl)+hp.x,hp.y+i,2,2)
            }
        }
    }
    if(p1.x<p2.x){
        hp=p1
        lp=p2
    }
    else{
        hp=p2
        lp=p1
    }
    lindiffhl=pndiff3D(lp,hp)
    vectorhl=lindiffhl.y/lindiffhl.x
    dvectorhl=lindiffhl.z/lindiffhl.x
    for(var i=0;i<lindiffhl.x;i++){
        if(pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)].depth>i*dvectorhl+hp.z || pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)].filled==false){
            values={filled:true,depth:hp.z+dvectorhl*i}
            pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)]=values
            ctx.fillRect(hp.x+i,Math.floor(i*vectorhl)+hp.y,2,2)
        }
    }
}
function scale_point(point,scale){
    let Matrix=[
        [scale,0,0],
        [0,scale,0],
        [0,0,scale]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1]+point.z*Matrix[0][2],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]+point.z*Matrix[1][2],
        z:point.x*Matrix[2][0]+point.y*Matrix[2][1]+point.z*Matrix[2][2]
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
function angularmov3D(latang,longang,speed){
    rlatang=latang*(Math.PI/180)
    rlongang=longang*(Math.PI/180)
    xymot={
        x:0,
        y:0,
        z:0
    }
    xymot.z=speed*Math.cos(rlatang)
    xymot.y=speed*Math.sin(rlatang)*Math.sin(rlongang)
    xymot.x=speed*Math.sin(rlatang)*Math.cos(rlongang)
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
function Bdraw3D(points,faces){
    //functions: iso_map(pndiff3D,add_perspective,rotate3D(rotate_point)),Bdraw(JTD)
    //externalvariables: epicenter3D,GAME_SIZE,tiltfactor,rotationfactor,spinfactor,perspective,intensity,ctx,pixeldepth
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
function Bdraw(points){
    var i
    for(i=0;i<points.length-1;i++){
        JTD(points[i],points[i+1])
    }
    JTD(points[points.length-1],points[0])
}
function Draw3D(shapecenter,points,faces){
    //functions: iso_map(pndiff3D,add_perspective,rotate3D(rotate_point)),shader(unit_vector,cross_product,dot_product,letters,basebasher(rounding)),Draw
    //externalvariables: epicenter3D,GAME_SIZE,tiltfactor,rotationfactor,spinfactor,perspective,intensity,ctx,pixeldepth,lightsourcevector,ambientlightfactor
    var isopoints=[]
    var fpoints=[]
    var rfpoints=[]
    for(var i=0;i<points.length;i++){
        isopoints.push(iso_map(points[i]))
    }
    for(i=0;i<faces.length;i++){
        fpoints=[]
        rfpoints=[]
        for(var j=0;j<faces[i].length;j++){
            fpoints.push(isopoints[faces[i][j]])
            rfpoints.push(points[faces[i][j]])
        }
        // if(i%4==0){
        //     console.log(dot_product(unit_vector(planevector),unit_vector(inner)))
        //     console.log(invert)
        //     console.log(unit_vector(planevector),unit_vector(inner))
        //     console.log(colorpercent)
        //     console.log(color)
        // }
        ctx.fillStyle = shader(shapecenter,rfpoints)
        Draw(fpoints)
        
    }
}
function shader(shpcntr,pnts){
    let points=[]
    let isopos
    let relpos
    relpos=pndiff3D(shpcntr,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,tiltfactor,rotationfactor,spinfactor),perspective,intensity)
    shapecenter={
        x:isopos.x+epicenter3D.x,
        y:isopos.y+epicenter3D.y,
        z:isopos.z+epicenter3D.z
    }
    for(var i=0;i<pnts.length;i++){
        relpos=pndiff3D(pnts[i],epicenter3D)
        isopos=add_perspective(rotate3D(relpos,tiltfactor,rotationfactor,spinfactor),perspective,intensity)
        points.push({
            x:isopos.x+epicenter3D.x,
            y:isopos.y+epicenter3D.y,
            z:isopos.z+epicenter3D.z
        })
    }
    let v1=unit_vector(pndiff3D(points[1],points[0]))
    let v2=unit_vector(pndiff3D(points[2],points[0]))
    let inner=unit_vector(pndiff3D(shapecenter,points[0]))
    let planevector=unit_vector(cross_product(v1,v2))
    if(dot_product(planevector,inner)<0){
        planevector={
            x:-planevector.x,
            y:-planevector.y,
            z:-planevector.z
        }
    }
    colorpercent=(dot_product(planevector,lightsourcevector))
    ambientlight=((-dot_product(planevector,lightsourcevector))/2+1)*ambientlightfactor
    if(colorpercent<0){
        colorpercent=0
    }
    colorpercent+=ambientlight
    if(colorpercent>1){
        colorpercent=0.99
    }
    console.log()
    color=letters(basebasher(Math.floor(colorpercent*Math.pow(15,2)),15,2))
    return color
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
function dot_product(vector1,vector2){
    return vector1.x*vector2.x+vector1.y*vector2.y+vector1.z*vector2.z
}
function cross_product(a,b){
    let final={
        x:a.y*b.z-a.z*b.y,
        y:a.z*b.x-a.x*b.z,
        z:a.x*b.y-a.y*b.x
    }
    return final
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
function drawsphere(pseudoposition,radius){
    let position=iso_map(pseudoposition)
    let degresolution=Math.PI*radius*2
    let angdelta=1/(radius*2)
    for(var i=0;i<degresolution;i++){
        let nrpos={
            x:position.x,
            y:position.y,
            z:Math.cos(i*angdelta)*radius+position.z
        }
        drawring(nrpos,Math.sin(i*angdelta)*radius,position)
    }
}
function drawring(position,radius,centerpoint){
    let degresolution=Math.PI*radius*2
    let angdelta=1/radius
    for(var i=0;i<degresolution;i++){
        let point={
            x:position.x+radius*Math.sin(i*angdelta),
            y:position.y+radius*Math.cos(i*angdelta),
            z:position.z
        }
        let surfacevector=unit_vector(pndiff3D(point,centerpoint))
        let colorpercent=(dot_product(surfacevector,lightsourcevector))
        let ambientlight=((-dot_product(surfacevector,lightsourcevector))/2+1)*ambientlightfactor
        if(colorpercent<0){
            colorpercent=0
        }
        colorpercent+=ambientlight
        if(colorpercent>1){
            colorpercent=0.99
        }
        let color=letters(basebasher(Math.floor(colorpercent*Math.pow(15,2)),15,2))
        ctx.fillStyle=color
        if(pixeldepth[Math.floor(position.x+radius*Math.sin(i*angdelta))][Math.floor(position.y+radius*Math.cos(i*angdelta))].depth>position.z || pixeldepth[Math.floor(position.x+radius*Math.sin(i*angdelta))][Math.floor(position.y+radius*Math.cos(i*angdelta))].filled==false){
            //console.log(leftpoints[i].z+dvectorlr*j)
            values={filled:true,depth:position.z}
            pixeldepth[Math.floor(position.x+radius*Math.sin(i*angdelta))][Math.floor(position.y+radius*Math.cos(i*angdelta))]=values
            ctx.fillRect(Math.floor(position.x+radius*Math.sin(i*angdelta)),Math.floor(position.y+radius*Math.cos(i*angdelta)),1,1)
        }
    }
}
let cue_ball=new Cue_ball(GAME_SIZE)
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')
new Handler();
let borderpoints=[
    {x:GAME_SIZE,y:GAME_SIZE,z:GAME_SIZE},
    {x:0,y:GAME_SIZE,z:GAME_SIZE},
    {x:GAME_SIZE,y:0,z:GAME_SIZE},
    {x:0,y:0,z:GAME_SIZE},
    {x:GAME_SIZE,y:GAME_SIZE,z:0}, 
    {x:0,y:GAME_SIZE,z:0},
    {x:GAME_SIZE,y:0,z:0},
    {x:0,y:0,z:0}
]
let faces = [
    [0,1,3,2],
    [4,5,7,6],
    [2,3,7,6],
    [1,3,7,5],
    [0,1,5,4],
    [0,2,6,4]
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
    ctx.fillStyle='#333'
    ctx.fillRect(0,0,GAME_SIZE,GAME_SIZE);
    for(var i=0;i<GAME_SIZE;i++){
        for(var j=0;j<GAME_SIZE;j++){
            pixeldepth[i][j]={filled:false,depth:0}
        }
    }
    cue_ball.draw(ctx)
    cue_ball.update(deltaTime)
    // Bdraw3D(borderpoints,faces)
    // rotationfactor+=3
    // tiltfactor+=3
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    else{
        console.log('dead')
    }
}
requestAnimationFrame(gameloop)
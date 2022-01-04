//-------------------------------------------------------------------------------------------------ANTICLOCKWISE RULE----------------------------------------------------------------------------------------------------------------------------------
const sunang=0
const ambientlightfactor=0
let lightsourcevector={x:0,y:1,z:0}
const GAME_SIZE=600
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter3D={x:G,y:G,z:G}
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
const chunksize=100
const landscapedata=[]
let startingpoint={x:0,y:0}
const Nopoints=600
const c2resolution=GAME_SIZE/Nopoints
const oscillation_frequency=10
const landscale=1
const heightflux=60
const zero=heightflux*2
let deltaang=oscillation_frequency*2*Math.PI/Nopoints
let deltaang2=oscillation_frequency*2*Math.PI/Nopoints
let terr = {x:random_map(Nopoints,GAME_SIZE),y:random_map(Nopoints,GAME_SIZE),crosspos:random_map(Nopoints,GAME_SIZE),crossneg:random_map(Nopoints,GAME_SIZE)}
for(var i=0;i<Nopoints;i++){
    landscapedata.push([])
    for(var j=0;j<Nopoints;j++){
        landscapedata[i].push(zero+heightflux*(Math.cos(i*deltaang)+Math.cos(j*deltaang2)+Math.cos(Math.floor((i+j))*deltaang))/2)
    }
}
const resolution=GAME_SIZE/(chunksize)
class landscape{
    constructor(chunksize,resolution){
        this.points=[]
        for(var i=0;i<chunksize;i++){
            for(var j=0;j<chunksize;j++){
                this.points.push({x:i*resolution,y:j*resolution,z:GAME_SIZE/*GAME_SIZE-(landscale*contourdata[i][j]*resolution)*/})
            }
        }
        this.faces=[]
        for(var i=0;i<chunksize*(chunksize-1);i++){
            if(i%chunksize<chunksize-1){
                this.faces.push([i,i+chunksize,i+1])
                this.faces.push([i+1,i+chunksize,i+chunksize+1])
            }
        }
        this.pseudoposition={x:G,y:G,z:5*G}
    }
    draw(contourdata,startingpoint){
        for(var i=0;i<chunksize;i++){
            for(var j=0;j<chunksize;j++){
                this.points[chunksize*i+j].z=GAME_SIZE-contourdata[startingpoint.x+i][startingpoint.y+j]
            }
        }
        Draw3D(this.pseudoposition,this.points,this.faces)
    }
    
}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    console.log(rotation3D)
                    dead=true
                    break
                case 38:
                    lightsourcevector=rotate3D(lightsourcevector,{x:-1,y:0,z:0})
                    break;
                case 40:
                    lightsourcevector=rotate3D(lightsourcevector,{x:1,y:0,z:0})
                    break;
                case 37:
                    lightsourcevector=rotate3D(lightsourcevector,{x:0,y:1,z:0})
                    break
                case 39:
                    lightsourcevector=rotate3D(lightsourcevector,{x:0,y:-1,z:0})
                    break
                case 87:
                    rotation3D.x-=1
                    break;
                case 83:
                    rotation3D.x+=1
                    break;
                case 65:
                    rotation3D.y+=1
                    break
                case 68:
                    rotation3D.y-=1
                    break
                case 102:
                    if(startingpoint.y<Nopoints-chunksize){
                        startingpoint.x++
                    }
                    break;
                case 100:
                    if(startingpoint.x>0){
                        startingpoint.x--
                    }
                    break;
                case 101:
                    if(startingpoint.x<Nopoints-chunksize){
                        startingpoint.y++
                    }
                    break
                case 104:
                    if(startingpoint.y>0){
                        startingpoint.y--
                    }
                    break
                
            }
        });
    }
}
let pixeldepth=[]
for(var i=0;i<GAME_SIZE;i++){
    pixeldepth.push([])
    for(var j=0;j<GAME_SIZE;j++){
        pixeldepth[i].push({filled:false,depth:0})
    }
}
const AOG=89.9
let kill=false
let dead=false
let intensity=2.5*G
let rotation3D={
    x:-60,
    y:0,
    z:0
}
function accel_change(pos,accel,r,height){
    n=0
    if(height/6<pos && pos<height/2){
        //console.log("low")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-0.3
                break
        }
    }
    else if(5*height/6>pos && pos>height/2){
        //console.log("high")
        switch(r){
            case 0:
                n=accel-1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel+0.3
                break
        }
    }
    else if(pos>5*height/6){
        //console.log("VERY HIGH")
        switch(r){
            case 0:
                n=accel-1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel
                break
        }
    }
    else if(pos<height/6){
        //console.log("VERY LOW")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel
                break
        }
    }
    else{
        //console.log("normal")
        switch(r){
            case 0:
                n=accel+1
                break
            case 1:
                n=accel
                break
            case 2:
                n=accel-1
                break
        }
    }
    if(n>8 || n<-8){
        n=n/2
    }
    return n
}
function random_map(length,height){
    let terr = []
    levs=height
    reps=length
    terr=[Math.floor(Math.random()*(levs/3))+levs/3]
    accel=0
    sped=0
    for(i=1;i<reps;i++){
        prev=terr[i-1]
        r=Math.floor(Math.random()*3)
        sped=accel_change(prev,sped,r,height)
        terr.push(prev+sped*2)
    }
    return terr
}
function iso_map(pos){
    let isopos
    let relpos=pndiff3D(pos,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,rotation3D),intensity,AOG)
    let final={
        x:isopos.x+epicenter3D.x,
        y:isopos.y+epicenter3D.y,
        z:isopos.z+epicenter3D.z
    }
    return final
}
function rotate3D(point,rot){
    let xpoint={
        x:point.x,
        y:rotate_point({x:point.y,y:point.z},rot.x).x,
        z:rotate_point({x:point.y,y:point.z},rot.x).y
    }
    let ypoint={
        x:rotate_point({x:xpoint.x,y:xpoint.z},rot.y).x,
        y:xpoint.y,
        z:rotate_point({x:xpoint.x,y:xpoint.z},rot.y).y
    }
    let zpoint={
        x:rotate_point({x:ypoint.x,y:ypoint.y},rot.z).x,
        y:rotate_point({x:ypoint.x,y:ypoint.y},rot.z).y,
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
function add_perspective(point,camdist,aog){
    let gog=Math.tan(aog*(Math.PI/180))
    let sidemeasure = G+point.z
    let pcdist = camdist+sidemeasure
    let npoint={
        x:gog*point.x/pcdist,
        y:gog*point.y/pcdist,
        z:pcdist
    }
    return npoint
}
function Draw(points){
    Bdraw(points)
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
        for(var j=0;j<=lindifflr.x+1;j++){
            values={filled:true,depth:leftpoints[i].z+dvectorlr*j}
            if(Math.floor(leftpoints[i].x)+j<GAME_SIZE && Math.floor(leftpoints[i].y)<GAME_SIZE && Math.floor(leftpoints[i].x)+j>0 && Math.floor(leftpoints[i].y)>0 && values.depth>0){
                if(pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)].depth>leftpoints[i].z+dvectorlr*j || pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)].filled==false){
                    //console.log(leftpoints[i].z+dvectorlr*j)
                    pixeldepth[Math.floor(leftpoints[i].x)+j][Math.floor(leftpoints[i].y)]=values
                    ctx.fillRect(Math.floor(leftpoints[i].x)+j,Math.floor(leftpoints[i].y),1,1)
                }
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
        values={filled:true,depth:hp.z+dvectorhl*i}
        if(Math.floor(i*vectorhl+hp.x)<GAME_SIZE && Math.floor(i+hp.y)<GAME_SIZE && Math.floor(i*vectorhl+hp.x)>0 && Math.floor(i+hp.y)>0 && values.depth>0){
            if(pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)].depth>i*dvectorhl+hp.z || pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)].filled==false){
                
                pixeldepth[Math.floor(i*vectorhl+hp.x)][Math.floor(i+hp.y)]=values
                if(i==lindiffhl.y-1){
                    ctx.fillRect(Math.floor(i*vectorhl+hp.x),Math.floor(hp.y+i),1,1)
                }
                else{
                    ctx.fillRect(Math.floor(i*vectorhl+hp.x),Math.floor(hp.y+i),1,1)
                }
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
        values={filled:true,depth:hp.z+dvectorhl*i}
        if(Math.floor(i+hp.x)<GAME_SIZE && Math.floor(i*vectorhl+hp.y)<GAME_SIZE && Math.floor(i+hp.x)>=0 && Math.floor(i*vectorhl+hp.y)>=0 && values.depth>0){
            if(pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)].depth>i*dvectorhl+hp.z || pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)].filled==false){
                
                pixeldepth[Math.floor(i+hp.x)][Math.floor(i*vectorhl+hp.y)]=values
                ctx.fillRect(Math.floor(hp.x+i),Math.floor(i*vectorhl+hp.y),1,1)
            }
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
    //externalvariables: epicenter3D,GAME_SIZE,rotation3D,perspective,intensity,ctx,pixeldepth
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
function Draw3D(shapecenter,points,faces,manualoveride){
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
        ctx.fillStyle = shader(shapecenter,rfpoints,manualoveride)
        Draw(fpoints)
        
    }
}
function shader(shpcntr,pnts,manualoveride){
    let points=[]
    let isopos
    let relpos
    relpos=pndiff3D(shpcntr,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,rotation3D),intensity,AOG)
    shapecenter={
        x:isopos.x+epicenter3D.x,
        y:isopos.y+epicenter3D.y,
        z:isopos.z+epicenter3D.z
    }
    for(var i=0;i<pnts.length;i++){
        relpos=pndiff3D(pnts[i],epicenter3D)
        isopos=add_perspective(rotate3D(relpos,rotation3D),intensity,AOG)
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
    if(!manualoveride){
        if(dot_product(planevector,inner)<0){
            planevector={
                x:-planevector.x,
                y:-planevector.y,
                z:-planevector.z
            }
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
    color=letters(basebasher(Math.floor(colorpercent*Math.pow(15,2)),16,2))
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
function unit_vector(a){
    let a_mag=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)+Math.pow(a.z,2))
    let a_hat={
        x:a.x/a_mag,
        y:a.y/a_mag,
        z:a.z/a_mag
    }
    return a_hat
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
function elevationmap(data){
    for(var i=0;i<Nopoints;i++){
        for(var j=0;j<Nopoints;j++){
            color=letters(basebasher(Math.floor((-(data[i][j]-GAME_SIZE)/GAME_SIZE)*Math.pow(16,2)),16,2))
            ctx2.fillStyle=color
            ctx2.fillRect(i*c2resolution,j*c2resolution,c2resolution,c2resolution)
        }
    }
}
let Landscape=new landscape(chunksize,resolution)
let canvas = document.getElementById("gamescreen")
let canvas2 = document.getElementById('gamescreen2')
let ctx = canvas.getContext('2d')
let ctx2 = canvas2.getContext('2d')
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
    ctx.clearRect(0,0,GAME_SIZE,GAME_SIZE)
    ctx2.clearRect(0,0,GAME_SIZE,GAME_SIZE)
    
    ctx.fillStyle='#111'
    ctx.fillRect(0,0,GAME_SIZE,GAME_SIZE)
    for(var i=0;i<GAME_SIZE;i++){
        for(var j=0;j<GAME_SIZE;j++){
            pixeldepth[i][j]={filled:false,depth:0}
        }
    }
    elevationmap(landscapedata)
    ctx2.fillStyle='#0ff'
    ctx2.fillRect(startingpoint.x*c2resolution,startingpoint.y*c2resolution,chunksize*c2resolution,chunksize*c2resolution)
    Landscape.draw(landscapedata,startingpoint)
    ctx.fillStyle='#0f0'
    Bdraw3D(borderpoints,faces)
    // rotation3D.y++
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    else{
        console.log('dead')
    }
}
requestAnimationFrame(gameloop)
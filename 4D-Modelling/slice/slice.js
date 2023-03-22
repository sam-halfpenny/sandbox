window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
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
                case 87:
                    sliceoffset++
                    break
                case 83:
                    sliceoffset--
                    break
                case 190:
                    scale=scale*1.02
                    break
                case 188:
                    scale=scale*0.98
                    break

            }
        });
    }
}
const GAME_SIZE=600
const G=GAME_SIZE/2
const epicenter={x:G,y:G}
const epicenter3D={x:G,y:G,z:G}
let kill=false
let dead=false
const permutations = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
let intensity=10
let perspective=intensity*100
let rotation4D={
    xw:0,
    yw:0,
    zw:0,
    zx:0,
    zy:0,
    xy:0
}
let scale=1
let sliceoffset=G
let rotationfactor=-6
let tiltfactor=-180
let spinfactor=90
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
function rotate4D(realpoint,r,midpoint){
    let point=pndiff4D(realpoint,midpoint)
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
    return {x:xypoint.x*scale+midpoint.x,y:xypoint.y*scale+midpoint.y,z:xypoint.z*scale+midpoint.z,w:xypoint.w*scale+midpoint.w}
}
function iso_map(pos){
    let isopos
    let relpos=pndiff3D(pos,epicenter3D)
    isopos=add_perspective(rotate3D(relpos,tiltfactor,rotationfactor,spinfactor),perspective,intensity)
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
function add_perspective(point,perspective,intensity){
    let z = intensity*G-point.z
    let Matrix=[
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,1/perspective,0]
    ]
    let hpoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1]+z*Matrix[0][2]+0*Matrix[0][3],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]+z*Matrix[1][2]+0*Matrix[1][3],
        z:point.x*Matrix[2][0]+point.y*Matrix[2][1]+z*Matrix[2][2]+0*Matrix[2][3],
        w:point.x*Matrix[3][0]+point.y*Matrix[3][1]+z*Matrix[3][2]+0*Matrix[3][3],
    }
    let npoint={
        x:hpoint.x,
        y:hpoint.y,
        z:hpoint.z
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
function pndiff3D(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y,z:p1.z-p2.z}
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
function overlap(nums){
    del=[]
    overlaps=[]
    for(var i=0;i<nums.length-1;i++){
        for(var j=i+1;j<nums.length;j++){
            if(nums[i]==nums[j]){
                overlaps.push([i,j])
            }
        }
    }
    if(overlaps.length==3){
        return 'all'
    }
    for(i=0;i<overlaps.length;i++){
        return (overlaps[i][Math.floor(Math.random()*2)])
    }
}
function slice(globalobj,faces,slice){
    let obj=globalobj
    for(j=0;j<obj.length;j++){
        obj[j].w-=slice
        if(obj[j].w==0){
            obj[j].w+=0.0001
        }
    }
    let fpoints=[]
    for(var i=0;i<faces.length;i++){
        fpoints.push([])
        for(var j=0;j<faces[i].length;j++){
            fpoints[i].push(obj[faces[i][j]])
        }
    }
    let slicepoints=[]
    for(i=0;i<fpoints.length;i++){
        let lines=[]
        for(j=0;j<permutations.length;j++){
            lines.push([fpoints[i][permutations[j][0]],fpoints[i][permutations[j][1]]])
        }
        let ilines=[]
        for(j=0;j<lines.length;j++){
            if((lines[j][0].w<0||lines[j][1].w<0) && !(lines[j][0].w<0 && lines[j][1].w<0)){
                ilines.push(lines[j])
            }
        }
        if((ilines.length<3||ilines>4) && ilines.length!=0){
            console.log('iline error:')
        }
        slicepoints.push([])
        for(j=0;j<ilines.length;j++){
            slicepoints[i].push({
                x:(ilines[j][0].x-(ilines[j][0].w*((ilines[j][0].x-ilines[j][1].x)/(ilines[j][0].w-ilines[j][1].w)))),
                y:(ilines[j][0].y-(ilines[j][0].w*((ilines[j][0].y-ilines[j][1].y)/(ilines[j][0].w-ilines[j][1].w)))),
                z:(ilines[j][0].z-(ilines[j][0].w*((ilines[j][0].z-ilines[j][1].z)/(ilines[j][0].w-ilines[j][1].w)))),
            })
        }
    }
    return slicepoints
}
function sliceDraw(points,faces,slicefactor){
    let rotpoints=[]
    for(var i=0;i<points.length;i++){
        rotpoints.push(rotate4D(points[i],rotation4D,{x:G,y:G,z:G,w:G}))
    }
    let slicepoints=slice(rotpoints,faces,slicefactor)
    for(var i=0;i<slicepoints.length;i++){
        let propoints=[]
        for(j=0;j<slicepoints[i].length;j++){
            propoints.push(iso_map(slicepoints[i][j]))
        }
        if(propoints.length>0){
            Bdraw(propoints)
        }
        
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')



new Handler();
let borderpoints=[
    {x:GAME_SIZE,y:GAME_SIZE,z:GAME_SIZE,w:0},
    {x:0,y:GAME_SIZE,z:GAME_SIZE,w:0},
    {x:GAME_SIZE,y:0,z:GAME_SIZE,w:0},
    {x:0,y:0,z:GAME_SIZE,w:0},
    {x:GAME_SIZE,y:GAME_SIZE,z:0,w:0},
    {x:0,y:GAME_SIZE,z:0,w:0},
    {x:GAME_SIZE,y:0,z:0,w:0},
    {x:0,y:0,z:0,w:0},
    {x:G,y:G,z:G,w:GAME_SIZE}
]
let faces = [
    [0,1,8,2],
    [3,1,8,2],
    [4,5,8,6],
    [7,5,8,6],
    [2,3,8,6],
    [7,3,8,6],
    [1,3,8,5],
    [7,3,8,5],
    [0,1,8,4],
    [5,1,8,4],
    [0,2,8,4],
    [6,2,8,4],
    [2,4,0,1],
    [2,4,6,1],
    [2,6,3,1],
    [1,3,5,4],
    [7,3,5,4],
    [3,7,4,6]
]
let lastTime = 0
function gameloop(timestamp) {
    var start = Date.now()
    ctx.clearRect(0,0,GAME_SIZE,GAME_SIZE);
    sliceDraw(borderpoints,faces,sliceoffset)
    if(!dead){
        while((Date.now()-start)<15){
        }
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)
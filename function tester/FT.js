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
let v = {
    x:prompt('v.x'),
    y:prompt('v.y')
}
let a = {
    x:prompt('a.x'),
    y:prompt('a.y')
}
let ar = {x:a.x,y:-a.y}
console.log(v,a)
console.log(recoordinate(recoordinate(v,a),ar))
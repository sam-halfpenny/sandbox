import math
import imageio
import time
import numpy as np
lightsourcevector = {'x':-1/math.sqrt(3),'y':-1/math.sqrt(3),'z':-1/math.sqrt(3)}
IMWIDTH=600
IMHEIGHT=600
RAYCAP=1000
G=100
RENDERCAP=603*math.sqrt(2)
class Planet():
    def __init__(self,radius,position,mass,id):
        self.id=id
        self.mass=mass
        self.radius=radius
        self.position=position
        self.colorRat={'r':0,'g':0,'b':0}
    def hit(self,pos,entryVector):
        output={'intersect':False,'intersection':0}
        dist=pndiff(pos,self.position)
        mag=math.sqrt(dist['x']**2+dist['y']**2+dist['z']**2)
        if mag <= self.radius:
            output['intersect']=True
            if dot_product(unit_vector(dist),unit_vector(entryVector))>-1:
                if dot_product(unit_vector(dist),unit_vector(entryVector))<1:
                    planeDef={'r':unit_vector(dist),'l':unit_vector(cross_product(unit_vector(cross_product(dist,entryVector)),dist))}
                    pdist={'r':mag,'l':0}
                    pvector={'r':dot_product(planeDef['r'],entryVector),'l':dot_product(planeDef['l'],entryVector)}
                    a=pvector['r']/pvector['l']
                    b=pdist['r']
                    pintersection={
                        'r':((-2*(a**2)*b-a*math.sqrt(4*((self.radius**2)*(a**2)-(b**2)+(self.radius**2))))/(2*((a**2)+1)))+b,
                        'l':((-2*a*b-math.sqrt(4*((self.radius**2)*(a**2)-(b**2)+(self.radius**2))))/(2*((a**2)+1)))
                    }
                    output['intersection']={
                        'x':planeDef['r']['x']*pintersection['r']+planeDef['l']['x']*pintersection['l'],
                        'y':planeDef['r']['y']*pintersection['r']+planeDef['l']['y']*pintersection['l'],
                        'z':planeDef['r']['z']*pintersection['r']+planeDef['l']['z']*pintersection['l'],
                    }
                else:
                    output['intersection']={
                        'x':-unit_vector(dist)['x']*self.radius,
                        'y':-unit_vector(dist)['y']*self.radius,
                        'z':-unit_vector(dist)['z']*self.radius,
                    }
            else:
                output['intersection']={
                        'x':unit_vector(dist)['x']*self.radius,
                        'y':unit_vector(dist)['y']*self.radius,
                        'z':unit_vector(dist)['z']*self.radius,
                    }
        return output
    def shade(self,vector):
        mag=math.sqrt(vector['x']**2+vector['y']**2+vector['z']**2)
        if mag==0:
            return 'the flagnog u trying to do :('
        shadePercentage=dot_product(unit_vector(vector),unit_vector(lightsourcevector))
        if shadePercentage<0:
            shadePercentage=0
        color=[self.colorRat['r']*shadePercentage*255,self.colorRat['g']*shadePercentage*255,self.colorRat['b']*shadePercentage*255,255]
        return color
class Background():
    def __init__(self,depth):
        self.depth=depth
    def hit(self,pos,entryVector):
        output={'intersect':False,'intersection':{'x':0,'y':0}}
        if pos['z']>=self.depth:
            output['intersect']=True
            if entryVector['x']>0:
                a=entryVector['z']/entryVector['x']
                b=pos['z']-a*pos['x']
                output['intersection']['x']=(self.depth-b)/a
            else:
                output['intersection']['x']=pos['x']
            if entryVector['y']>0:
                a=entryVector['z']/entryVector['y']
                b=pos['z']-a*pos['y']
                output['intersection']['y']=(self.depth-b)/a
            else:
                output['intersection']['y']=pos['y']
        return output
    def grid(self,int):
        if abs(int['x']%(IMWIDTH/10)) or abs(int['y']%(IMWIDTH/10)):
            return [0,255,0,255]
        else:
            return [255,255,255,255]
    def cont(self,int):
        return [(abs(int['x']%(IMWIDTH/10))/(IMWIDTH/10))*255,(abs(int['y']%(IMWIDTH/10))/(IMWIDTH/10))*255,0,255]
def GRwarp(planets,pos,velocity):
    velo={'x':velocity['x'],'y':velocity['y'],'z':velocity['z'],'w':0}
    delta=0.1
    surface=[
        {'x':pos['x'],'y':pos['y'],'z':pos['z'],'w':getPotential(planets,{'x':pos['x'],'y':pos['y'],'z':pos['z']})},
        {'x':pos['x']+delta,'y':pos['y'],'z':pos['z'],'w':getPotential(planets,{'x':pos['x']+delta,'y':pos['y'],'z':pos['z']})},
        {'x':pos['x'],'y':pos['y']+delta,'z':pos['z'],'w':getPotential(planets,{'x':pos['x'],'y':pos['y']+delta,'z':pos['z']})},
        {'x':pos['x'],'y':pos['y'],'z':pos['z']+delta,'w':getPotential(planets,{'x':pos['x'],'y':pos['y'],'z':pos['z']+delta})}
    ]
    spacedef=[
        pndiff4D(surface[1],surface[0]),
        pndiff4D(surface[2],surface[0]),
        pndiff4D(surface[3],surface[0])
    ]
    normal=unit_vector4D(orthogProduct4D(spacedef[0],spacedef[1],spacedef[2]))
    perps=[
        orthogProduct4D(normal,velo,spacedef[0]),
        orthogProduct4D(normal,velo,spacedef[1])
    ]
    newvelocity=unit_vector4D(orthogProduct4D(normal,perps[0],perps[1]))
    if dot_product(velocity,newvelocity)<=0:
        newvelocity={'x':-newvelocity['x'],'y':-newvelocity['y'],'z':-newvelocity['z']}
    return {'x':newvelocity['x'],'y':newvelocity['y'],'z':newvelocity['z']}
def getPotential(planets,pos):
    potential=0
    for i in range(len(planets)):
        dist=pndiff(pos,planets[i].position)
        potential+=G*(planets[i].mass/math.sqrt((dist['x']**2)+(dist['y']**2)+(dist['z']**2)))
    return potential    
def pndiff(p1,p2):
    return {'x':p1['x']-p2['x'],'y':p1['y']-p2['y'],'z':p1['z']-p2['z']}
def pndiff4D(p1,p2):
    return {'x':p1['x']-p2['x'],'y':p1['y']-p2['y'],'z':p1['z']-p2['z'],'w':p1['w']-p2['w']}
def unit_vector(a):
    mag=math.sqrt(a['x']**2+a['y']**2+a['z']**2)
    a_hat={
        'x':a['x']/mag,
        'y':a['y']/mag,
        'z':a['z']/mag
    }
    return a_hat
def unit_vector4D(a):
    mag=math.sqrt(a['x']**2+a['y']**2+a['z']**2+a['w']**2)
    a_hat={
        'x':a['x']/mag,
        'y':a['y']/mag,
        'z':a['z']/mag,
        'w':a['w']/mag
    }
    return a_hat
def dot_product(v1,v2):
    return v1['x']*v2['x']+v1['y']*v2['y']+v1['z']*v2['z']
def cross_product(a,b):
    final={
        'x':a['y']*b['z']-a['z']*b['y'],
        'y':a['z']*b['x']-a['x']*b['z'],
        'z':a['x']*b['y']-a['y']*b['x']
    }
    return final
def orthogProduct4D(a,b,c):
    final={
        'x':(a['y']*(b['z']*c['w']-b['w']*c['z'])-a['z']*(b['y']*c['w']-b['w']*c['y'])-a['w']*(b['y']*c['z']-b['z']*c['y'])),
        'y':(a['x']*(b['z']*c['w']-b['w']*c['z'])-a['z']*(b['x']*c['w']-b['w']*c['x'])-a['w']*(b['x']*c['z']-b['z']*c['x'])),
        'z':(a['x']*(b['y']*c['w']-b['w']*c['y'])-a['y']*(b['x']*c['w']-b['w']*c['x'])-a['w']*(b['x']*c['y']-b['y']*c['x'])),
        'w':(a['x']*(b['y']*c['z']-b['z']*c['y'])-a['y']*(b['x']*c['z']-b['z']*c['x'])-a['z']*(b['x']*c['y']-b['y']*c['x']))
    }
    # if i have to do this for 5D im going to cry
    return final
def letters(arr):
    alpha='0123456789abcdefghijklmnopqrstuvwxyz'
    nstr=''
    for i in range(len(arr)):
        nstr=nstr+alpha[arr[i]]
    return nstr
def basebasher(dec,base,dignum):
    digits=[]
    x=True
    while x==True:
        digits.append(dec%base)
        dec=math.floor(dec/base)
        if dec==0:
            x=False
    while dignum>len(digits):
        digits.append(0)
    return digits[::-1]
def beam(pos,speed):
    count=0
    x=True
    while x==True:
        count+=1
        if math.sqrt(pos['x']**2+pos['y']**2+pos['z']**2)>RENDERCAP:
            return [255,0,0,255]
        for i in range(len(planets)):
            PID=planets[i].hit(pos,speed)
            if PID['intersect']:
                return planets[i].shade(PID['intersection'])
        BID=background.hit(pos,speed)
        if BID['intersect']:
            return background.cont(BID['intersection'])
        speed=GRwarp(planets,pos,speed)
        pos={
            'x':pos['x']+speed['x'],
            'y':pos['y']+speed['y'],
            'z':pos['z']+speed['z'],
        }
        if count>RAYCAP:
            return [0,0,255,255]
def rotate(vector,theta):
    return {'x':math.cos(theta)*vector['x']-math.sin(theta)*vector['y'],'y':math.sin(theta)*vector['x']+math.cos(theta)*vector['y']}
background=Background(60)
nim=[]
planets=[Planet(5,{'x':0,'y':0,'z':15},10,1)]

for i in range(IMWIDTH):
    nim.append([])
    print(str(i))
    for j in range(IMHEIGHT):
        nim[i].append(beam({'x':i-IMWIDTH/2,'y':j-IMHEIGHT/2,'z':0},{'x':0,'y':0,'z':1}))
        
imageio.imwrite('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/raymarching/ims/im'+str(round(time.time()))+'.png',nim)


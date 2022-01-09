import math
import json
jsonfile='C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/data.json'
jf=open(jsonfile,'r')
x=jf.read()
def cross_product(a,b):
    final={
        'x':a['y']*b['z']-a['z']*b['y'],
        'y':a['z']*b['x']-a['x']*b['z'],
        'z':a['x']*b['y']-a['y']*b['x']
    }
    return final
def unit_vector(a):
    a_mag=math.sqrt(math.pow(a['x'],2)+math.pow(a['y'],2)+math.pow(a['z'],2))
    a_hat={
        'x':a['x']/a_mag,
        'y':a['y']/a_mag,
        'z':a['z']/a_mag
    }
    return a_hat
def pndiff3D(p1,p2):
    dist={'x':p1['x']-p2['x'],'y':p1['y']-p2['y'],'z':p1['z']-p2['z']}
    return dist
databuffer=json.loads(x)
f=open('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/Model.stl','w')
name='test'
landscale=0.1
f.write('solid '+name+'\n')
for i in range(len(databuffer)-1):
    for j in range(len(databuffer[0])-1):
        trig1=[{
            'x':i,
            'y':j,
            'z':databuffer[i][j]*landscale
        },{
            'x':i,
            'y':j+1,
            'z':databuffer[i][j+1]*landscale
        },{
            'x':i+1,
            'y':j,
            'z':databuffer[i+1][j]*landscale
        }]
        trig2=[{
            'x':i+1,
            'y':j,
            'z':databuffer[i+1][j]*landscale
        },{
            'x':i,
            'y':j+1,
            'z':databuffer[i][j+1]*landscale
        },{
            'x':i+1,
            'y':j+1,
            'z':databuffer[i+1][j+1]*landscale
        }]
        t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
        t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
        t1planevector=unit_vector(cross_product(t1v1,t1v2))
        t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
        t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
        t2planevector=unit_vector(cross_product(t2v1,t2v2))
        f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
        f.write('  outer loop\n')
        f.write('   vertex '+str(float(i))+' '+str(float(j))+' '+str(float(databuffer[i][j])*landscale)+'\n')
        f.write('   vertex '+str(float(i))+' '+str(float(j+1))+' '+str(float(databuffer[i][j+1])*landscale)+'\n')
        f.write('   vertex '+str(float(i+1))+' '+str(float(j))+' '+str(float(databuffer[i+1][j])*landscale)+'\n')
        f.write('  endloop\n')
        f.write(' endfacet\n')
        f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
        f.write('  outer loop\n')
        f.write('   vertex '+str(float(i+1))+' '+str(float(j))+' '+str(float(databuffer[i+1][j])*landscale)+'\n')
        f.write('   vertex '+str(float(i))+' '+str(float(j+1))+' '+str(float(databuffer[i][j+1])*landscale)+'\n')
        f.write('   vertex '+str(float(i+1))+' '+str(float(j+1))+' '+str(float(databuffer[i+1][j+1])*landscale)+'\n')
        f.write('  endloop\n')
        f.write(' endfacet\n')
    




    trig1=[{
        'x':i,
        'y':0,
        'z':databuffer[i][0]*landscale
    },{
        'x':i,
        'y':0,
        'z':0
    },{
        'x':i+1,
        'y':0,
        'z':databuffer[i+1][0]*landscale
    }]
    trig2=[{
        'x':i+1,
        'y':0,
        'z':databuffer[i+1][0]*landscale
    },{
        'x':i,
        'y':0,
        'z':0
    },{
        'x':i+1,
        'y':0,
        'z':0
    }]
    t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
    t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
    t1planevector=unit_vector(cross_product(t1v1,t1v2))
    t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
    t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
    t2planevector=unit_vector(cross_product(t2v1,t2v2))
    f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig1[0]['x'])+' '+str(trig1[0]['y'])+' '+str(trig1[0]['z'])+'\n')
    f.write('   vertex '+str(trig1[1]['x'])+' '+str(trig1[1]['y'])+' '+str(trig1[1]['z'])+'\n')
    f.write('   vertex '+str(trig1[2]['x'])+' '+str(trig1[2]['y'])+' '+str(trig1[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')
    f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig2[0]['x'])+' '+str(trig2[0]['y'])+' '+str(trig2[0]['z'])+'\n')
    f.write('   vertex '+str(trig2[1]['x'])+' '+str(trig2[1]['y'])+' '+str(trig2[1]['z'])+'\n')
    f.write('   vertex '+str(trig2[2]['x'])+' '+str(trig2[2]['y'])+' '+str(trig2[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')
    


    trig1=[{
        'x':i,
        'y':len(databuffer[0])-1,
        'z':databuffer[i][len(databuffer[0])-1]*landscale
    },{
        'x':i,
        'y':len(databuffer[0])-1,
        'z':0
    },{
        'x':i+1,
        'y':len(databuffer[0])-1,
        'z':databuffer[i+1][len(databuffer[0])-1]*landscale
    }]
    trig2=[{
        'x':i+1,
        'y':len(databuffer[0])-1,
        'z':databuffer[i+1][len(databuffer[0])-1]*landscale
    },{
        'x':i,
        'y':len(databuffer[0])-1,
        'z':0
    },{
        'x':i+1,
        'y':len(databuffer[0])-1,
        'z':0
    }]
    t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
    t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
    t1planevector=unit_vector(cross_product(t1v1,t1v2))
    t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
    t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
    t2planevector=unit_vector(cross_product(t2v1,t2v2))
    f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig1[0]['x'])+' '+str(trig1[0]['y'])+' '+str(trig1[0]['z'])+'\n')
    f.write('   vertex '+str(trig1[1]['x'])+' '+str(trig1[1]['y'])+' '+str(trig1[1]['z'])+'\n')
    f.write('   vertex '+str(trig1[2]['x'])+' '+str(trig1[2]['y'])+' '+str(trig1[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')
    f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig2[0]['x'])+' '+str(trig2[0]['y'])+' '+str(trig2[0]['z'])+'\n')
    f.write('   vertex '+str(trig2[1]['x'])+' '+str(trig2[1]['y'])+' '+str(trig2[1]['z'])+'\n')
    f.write('   vertex '+str(trig2[2]['x'])+' '+str(trig2[2]['y'])+' '+str(trig2[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')


for i in range(len(databuffer[0])-1):
    trig1=[{
        'y':i,
        'x':len(databuffer)-1,
        'z':databuffer[len(databuffer)-1][i]*landscale
    },{
        'y':i,
        'x':len(databuffer)-1,
        'z':0
    },{
        'y':i+1,
        'x':len(databuffer)-1,
        'z':databuffer[len(databuffer)-1][i+1]*landscale
    }]
    trig2=[{
        'y':i+1,
        'x':len(databuffer)-1,
        'z':databuffer[len(databuffer)-1][i+1]*landscale
    },{
        'y':i,
        'x':len(databuffer)-1,
        'z':0
    },{
        'y':i+1,
        'x':len(databuffer)-1,
        'z':0
    }]
    t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
    t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
    t1planevector=unit_vector(cross_product(t1v1,t1v2))
    t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
    t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
    t2planevector=unit_vector(cross_product(t2v1,t2v2))
    f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig1[0]['x'])+' '+str(trig1[0]['y'])+' '+str(trig1[0]['z'])+'\n')
    f.write('   vertex '+str(trig1[1]['x'])+' '+str(trig1[1]['y'])+' '+str(trig1[1]['z'])+'\n')
    f.write('   vertex '+str(trig1[2]['x'])+' '+str(trig1[2]['y'])+' '+str(trig1[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')
    f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig2[0]['x'])+' '+str(trig2[0]['y'])+' '+str(trig2[0]['z'])+'\n')
    f.write('   vertex '+str(trig2[1]['x'])+' '+str(trig2[1]['y'])+' '+str(trig2[1]['z'])+'\n')
    f.write('   vertex '+str(trig2[2]['x'])+' '+str(trig2[2]['y'])+' '+str(trig2[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')



    trig1=[{
        'y':i,
        'x':0,
        'z':databuffer[0][i]*landscale
    },{
        'y':i,
        'x':0,
        'z':0
    },{
        'y':i+1,
        'x':0,
        'z':databuffer[0][i+1]*landscale
    }]
    trig2=[{
        'y':i+1,
        'x':0,
        'z':databuffer[0][i+1]*landscale
    },{
        'y':i,
        'x':0,
        'z':0
    },{
        'y':i+1,
        'x':0,
        'z':0
    }]
    t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
    t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
    t1planevector=unit_vector(cross_product(t1v1,t1v2))
    t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
    t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
    t2planevector=unit_vector(cross_product(t2v1,t2v2))
    f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig1[0]['x'])+' '+str(trig1[0]['y'])+' '+str(trig1[0]['z'])+'\n')
    f.write('   vertex '+str(trig1[1]['x'])+' '+str(trig1[1]['y'])+' '+str(trig1[1]['z'])+'\n')
    f.write('   vertex '+str(trig1[2]['x'])+' '+str(trig1[2]['y'])+' '+str(trig1[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')
    f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
    f.write('  outer loop\n')
    f.write('   vertex '+str(trig2[0]['x'])+' '+str(trig2[0]['y'])+' '+str(trig2[0]['z'])+'\n')
    f.write('   vertex '+str(trig2[1]['x'])+' '+str(trig2[1]['y'])+' '+str(trig2[1]['z'])+'\n')
    f.write('   vertex '+str(trig2[2]['x'])+' '+str(trig2[2]['y'])+' '+str(trig2[2]['z'])+'\n')
    f.write('  endloop\n')
    f.write(' endfacet\n')




trig1=[{
    'x':0,
    'y':0,
    'z':0
},{
    'x':0,
    'y':len(databuffer[0])-1,
    'z':0
},{
    'x':len(databuffer)-1,
    'y':0,
    'z':0
}]
trig2=[{
    'x':len(databuffer)-1,
    'y':0,
    'z':0
},{
    'x':0,
    'y':len(databuffer[0])-1,
    'z':0
},{
    'x':len(databuffer)-1,
    'y':len(databuffer[0])-1,
    'z':0
}]
t1v1=unit_vector(pndiff3D(trig1[1],trig1[0]))
t1v2=unit_vector(pndiff3D(trig1[2],trig1[0]))
t1planevector=unit_vector(cross_product(t1v1,t1v2))
t2v1=unit_vector(pndiff3D(trig2[1],trig2[0]))
t2v2=unit_vector(pndiff3D(trig2[2],trig2[0]))
t2planevector=unit_vector(cross_product(t2v1,t2v2))
f.write(' facet normal '+str(t1planevector['x'])+' '+str(t1planevector['y'])+' '+str(t1planevector['z'])+'\n')
f.write('  outer loop\n')
f.write('   vertex '+str(trig1[0]['x'])+' '+str(trig1[0]['y'])+' '+str(trig1[0]['z'])+'\n')
f.write('   vertex '+str(trig1[1]['x'])+' '+str(trig1[1]['y'])+' '+str(trig1[1]['z'])+'\n')
f.write('   vertex '+str(trig1[2]['x'])+' '+str(trig1[2]['y'])+' '+str(trig1[2]['z'])+'\n')
f.write('  endloop\n')
f.write(' endfacet\n')
f.write(' facet normal '+str(t2planevector['x'])+' '+str(t2planevector['y'])+' '+str(t2planevector['z'])+'\n')
f.write('  outer loop\n')
f.write('   vertex '+str(trig2[0]['x'])+' '+str(trig2[0]['y'])+' '+str(trig2[0]['z'])+'\n')
f.write('   vertex '+str(trig2[1]['x'])+' '+str(trig2[1]['y'])+' '+str(trig2[1]['z'])+'\n')
f.write('   vertex '+str(trig2[2]['x'])+' '+str(trig2[2]['y'])+' '+str(trig2[2]['z'])+'\n')
f.write('  endloop\n')
f.write(' endfacet\n')
f.write('endsolid '+name)
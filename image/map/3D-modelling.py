import json
databuffer=json.load('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/data.json')
f=open('C:\Users\sam05\OneDrive\Desktop\CODE\github-repositorys\sandbox\image\map\Model.stl','w')
name='test'
f.write('solid ',name,'\n')
for i in range(len(databuffer)-1):
    for j in range(len(databuffer[0])-1):
        f.write('facet normal 0 0 0\n')
        f.write('outer loop\n')
        f.write('vertex ',i,' ',j,' ',databuffer[i][j],'\n')
        f.write('vertex ',i,' ',j+1,' ',databuffer[i][j+1],'\n')
        f.write('vertex ',i+1,' ',j,' ',databuffer[i+1][j],'\n')
        f.write('endloop\n')
        f.write('endfacet\n')
f.write('endsolid ',name)
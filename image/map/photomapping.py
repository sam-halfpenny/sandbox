import imageio
def lightmeasure(rgb):
    brightness=int(rgb[0])+int(rgb[1])+int(rgb[2])
    # print(rgb,' ',brightness)
    return brightness
offset=int(input('input bottom offset (recommended if 3D printing)'))
image=input('input the path of the image you want to model (use / not \)')
im=imageio.imread(image)
prev=lightmeasure(im[0][0])
nim=[]
for i in range(len(im)):
    nim.append([])
    for j in range(len(im[i])):
        brightness=lightmeasure(im[i][j])
        nim[i].append(brightness+offset)
f=open('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/data.json','w')
f.write(str(nim))
f.close()
STLA=input('would you like to compile this data into STLA')
if STLA == 'y':
    exec(open('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/3D-modelling.py').read())

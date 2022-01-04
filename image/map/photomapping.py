import imageio
def lightmeasure(rgb):
    return rgb[0]+rgb[1]+rgb[2]
im=imageio.imread('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/eye.jpg')
prev=lightmeasure(im[0][0])
nim=[]
for i in range(len(im)):
    nim.append([])
    for j in range(len(im[i])):
        brightness=lightmeasure(im[i][j])
        nim[i].append(brightness)
f=open('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/map/data.json','w')
f.write(str(nim))
f.close()

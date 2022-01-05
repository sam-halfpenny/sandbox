import imageio
def lightmeasure(rgb):
    brightness=int(rgb[0])+int(rgb[1])+int(rgb[2])
    # print(rgb,' ',brightness)
    return brightness
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

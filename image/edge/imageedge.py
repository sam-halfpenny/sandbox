import imageio
def lightmeasure(rgb):
    return rgb[0]+rgb[1]+rgb[2]
im=imageio.imread('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/im.png')
prev=lightmeasure(im[0][0])
nim=im
for i in range(len(im)):
    for j in range(len(im[i])):
        brightness=lightmeasure(im[i][j])
        if brightness==prev:
            nim[i][j]=[0,0,0,255]
        else:
            nim[i][j]=[255,255,255,255]
        prev=brightness
imageio.imwrite('C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/image/edge/im.png',nim)
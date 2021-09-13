n=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
t=1
f=0
p=1
n[0]=1*2*3*4*5*6*7*8*9*10*11*12*13*14*15*16*17*18*19*20
##loop=True
##while loop==True:
##    loop2=True
##    p=1
##    while loop2==True:
##        if n[0]%n[p]==0:
##            print(n[0])
##            if p==20:
##                if n[0]==2432902008176640000:
##                    loop2=False
##                else:
##                    print(str(n[0])+'                        yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees')
##                    f=10
##                    loop2=False
##                    t=n[0]
##            p=p+1
##        else:
##            loop2=False
##    n[0]=n[0]-20
##    if f==10:
##        break

loop=True
while loop==True:
    loop2=True
    p=1
    while loop2==True:
        if (n[0]/t)%n[p]==0:
            print(n[0]/t)
            if p==20:
                if n[0]==2432902008176640000:
                    loop2=False
                else:
                    print(str(n[0]/t)+'                        yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees')
                    f=10
                    loop2=False
            p=p+1
        else:
            loop2=False
    t=t+1
        

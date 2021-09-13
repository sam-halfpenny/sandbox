outer_ring=True
while outer_ring==True:
    unit=['zero','one','two','three','four','five','six','seves','eight','nine']
    tens=['ten','twenty','thirty','fourty','fifty','sixty','seventy','eighty','ninety']
    teens=['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    mn=1
    d=0
    mx=int(input())
    roller=1
    combo=0
    while int(roller)<=mx:
        roller=str(roller)
        if len(roller)==1:
            combo += len(unit[int(roller)])
            d+=1
            if d==10:
                print ('sam you messed up')
                for i in range(100):
                    print(':(')
                    roller=100000000000000000000000000000000000000000000000000000000000000000000
        elif len(roller)==2:
            if 10<int(roller)<20:
                combo += len(teens[int(roller[1])-1])
            combo += len(tens[int(roller[0])-1])
            combo += len(unit[int(roller[1])])
        elif len(roller)==3:
            combo += len(unit[int(roller[0])-1])+7
            combo += len(tens[int(roller[1])-1])
            combo += len(unit[int(roller[2])])
            if roller[0]!=0:
                combo+=3
            elif roller[1]!=0:
                combo+=3
        elif len(roller)==4:
            combo += len(unit[int(roller[0])-1])+8
            combo += len(unit[int(roller[1])-1])+7
            combo += len(tens[int(roller[2])-1])
            combo += len(unit[int(roller[3])])
            if roller[0]!=0:
                combo+=3
            elif roller[1]!=0:
                combo+=3
        else:
            print('out of range')
        roller=int(roller)+1
    print(combo)
    stoppots=input('would you like to stop')
    if stoppots=='yes':
        outer_ring=False
for i in range(30):
    print('SWEET LIKE A LEMON!!!!!!!!!!!!!!!!!!!!!!!!')
    

       

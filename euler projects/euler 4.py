def odd():
    do=1
    repeat2=True
    while repeat2==True:
        if len(s)==o+do:
            repeat=False
            repeat2=False
            print(s)
            break
        elif s[o-do+1]==s[(o+do)]:
            if len(s)==o+do:
                repeat=False
                repeat2=False
                print(s)
                break
            do=do+1
        else:
            repeat2=False
def even():
    do=1
    repeat2=True
    while repeat2==True:
        if len(s)==a+do:
            repeat=False
            repeat2=False
            print(s)
            break
        elif s[a-do+1]==s[(a+do)]:
            if len(s)==a+do:
                repeat=False
                repeat2=False
                print(s)
                break
            do=do+1
        else:
            repeat2=False

        
num=[999,999,0]
repeat=True
while repeat==True:
    num[2]=num[1]*num[0]
    s=str(num[2])
    if len(s)%2==0:
        a=int(len(s)/2)-1
        even()
    elif len(s)%2==1:
        o=int((len(s)-0.5)/2)
        odd()
    num[0]=num[0]-1
    num[2]=num[1]*num[0]
    s=str(num[2])
    if len(s)%2==0:
        a=int(len(s)/2)-1
        even()
    elif len(s)%2==1:
        o=int((len(s)-0.5)/2)
        odd()
    num[1]=num[1]-1
    if num[1]==600:
        break
        
    

    
    
            


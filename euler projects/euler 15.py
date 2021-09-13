import random
outer_ring=True
while outer_ring==True:
    size=int(input())
    size=size*size
    if size%2==1:
        size=size-1
    answer=2
    istrue=True
    pre_answer=int(size/4)
    for i in range(pre_answer):
        answer=answer*2
    print(int(answer+answer/2))
    stoppots=input('would you like to stop')
    if stoppots=='yes':
        outer_ring=False
for i in range(30):
    print('SWEET LIKE A LEMON!!!!!!!!!!!!!!!!!!!!!!!!')
    


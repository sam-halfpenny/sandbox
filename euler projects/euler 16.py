outer_ring=True
while outer_ring==True:
    squared=1
    combo=0
    hmm=True
    roller=0
    number=int(input())
    squarer=int(input())
    for i in range(squarer):
        squared=squared*number
    squared=str(squared)
    while roller <len(squared):
        combo = (combo+int(squared[roller]))
        roller = roller + 1
    print(combo)
    stoppots=input('would you like to stop')
    if stoppots=='yes':
        outer_ring=False
for i in range(30):
    print('SWEET LIKE A LEMON!!!!!!!!!!!!!!!!!!!!!!!!')


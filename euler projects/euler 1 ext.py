y=int(input('what year is it'))
t=True
family = {
    "dad" : 1968,
    "mum" : 1969,
    "will": 1998,
    "emmie":2000,
    "sam" : 2006,
    "jj"  : 2008
    }

print(family["emmie"])

while True:
    person = input()
    if person == "stop":
        break
    print(y - family[person])

#while t==True:
#    person=input()
#    if person=='jj':
#        print('is or is going to be this year ' + str(y-2008))
#    elif person=='sam':
#        print('is or is going to be this year ' + str(y-2006))
#    elif person=='ems':
#        print('is or is going to be this year ' + str(y-2000))
#    elif person=='will':
#        print('is or is going to be this year ' + str(y-1998))
#    elif person=='mum':
#        print('is or is going to be this year ' + str(y-1969))
#    elif person=='dad':
#        print('is or is going to be this year ' + str(y-1968))
    

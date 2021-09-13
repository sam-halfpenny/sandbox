##my_list = [1, 2, 3, 4, 5]
##
##count = 0
##for bloop in my_list:
##    count += bloop
##
##my_list.append("tibble")
##print(my_list)
##print(count)
##print(my_list[1:3])
outer_ring=True
while outer_ring==True:
    quantity=int(input())
    triangles=[1]
    other=0
    num=3
    flu_bottom=3
    istrue=True
    divisible_loop=True
    divisible_num=1
    divisor=0
    while istrue==True:
        divisible_loop=True
        divisible_num=1
        divisor=0
        flaggot=0
        triangles.append(num)
        other += 1
        num+=flu_bottom
        if triangles[1]>=2*quantity:
            while divisible_loop ==True:
                if divisible_num>(triangles[1])/2:
                    divisible_loop=False
                if triangles[1]%divisible_num==0:
                    divisor += 1
                    if divisor>quantity:
                        print (triangles[1])
                        print('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees')
                        istrue=False
                        divisible_loop=False
                divisible_num += 1
        flu_bottom += 1
        del triangles[0]
        if divisor>quantity:
            istrue=False
    stoppots=input('would you like to stop')
    if stoppots=='yes':
        outer_ring=False
for i in range(30):
    print('SWEET LIKE A LEMON!!!!!!!!!!!!!!!!!!!!!!!!')
    
    
        
    

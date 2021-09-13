#consider the terms of the fibonacci sequence whose values are less than
#4 million, find the sum of the even-valued terms
#h=0
#a=0
#b=1
#f=True
#print(a)
#print(b)
#while f==True:
#    a=a+b
#    g=a
#    if g%2==0:
#        h=h+g
#    print(a)
#    b=b+a
#    print(b)
#    g=b
#    if g%2==0:
#        h=h+g
#    if g==3524578:
#        f=False
#print(h)

####

nums = [1, 1, 0]
sum = 0
while nums[2]<4000000:
    nums[0]=nums[0]+nums[1]
    nums[2]=nums[0]
    nums[1]=nums[0]+nums[1]
    nums[2]=nums[1]
    if nums[2]%2==0:
        sum=nums[2]+sum
print (sum)
        


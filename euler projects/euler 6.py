x=1
f=0
while x<=100:
    f=x*x+f
    x=x+1
x=1
p=0
while x<=100:
    p=p+x
    x=x+1
j=p*p-f
print(str(p*p)+'-'+str(f)+'='+str(j))
    

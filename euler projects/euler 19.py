w=input()
if w=='1': 
    def whichmounth(month):
        if month==1:
            monthdaycount=31
            print('jan')
            return monthdaycount
        elif month==2:
            if year%4!=0:
                monthdaycount=28
            else:
                monthdaycount=29
            return monthdaycount
            print('feb')
        elif month==3:
            monthdaycount=31
            print('mar')
            return monthdaycount
        elif month==4:
            monthdaycount=30
            print('apr')
            return monthdaycount
        elif month==5:
            monthdaycount=31
            print('may')
            return monthdaycount
        elif month==6:
            monthdaycount=30
            print('jun')
            return monthdaycount
        elif month==7:
            monthdaycount=31
            print('jul')
            return monthdaycount
        elif month==8:
            monthdaycount=31
            print('aug')
            return monthdaycount
        elif month==9:
            monthdaycount=30
            print('sep')
            return monthdaycount
        elif month==10:
            monthdaycount=31
            print('oct')
            return monthdaycount
        elif month==11:
            monthdaycount=30
            print('nov')
            return monthdaycount
        elif month==12:
            monthdaycount=31
            print('dec')
            return monthdaycount
        print ('f')
    year=0
    n=0
    bob=int(input())
    while year<bob:
        month=1
        day=1
        weekday=1
        monthdaycount=0
        if year%4!=0:
            reg=True
            while reg==True:
                whichmounth(month)
                print(day)
                if weekday==7:
                    if day==1:
                        n=n+1
                    weekday=1
                if day==monthdaycount:
                    month=month+1
                    print('up')
                    day=1
                    if month==12:
                        reg=False
                if month==12:
                    reg=False
                day=1+day
                weekday=1+weekday
        else:
            reg=True
            while reg==True:
                whichmounth(month)
                if weekday==7:
                    if day==1:
                        n=n+1
                    weekday=1
                if day==monthdaycount:
                    day=1
                    month+=1
                if month==12:
                    reg=False
                day+=1
                weekday+=1

            

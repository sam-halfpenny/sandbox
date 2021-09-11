#!/usr/bin/python3
import time
import RPi.GPIO as io
io.setwarnings(False)
io.setmode(io.BCM)
io.setup(27,io.OUT)
io.setup(17,io.OUT)
io.setup(18,io.IN)
io.setup(23,io.IN)
timedelay=0
scancodes={
    'a':'00011110',
    'b':'00110000',
    'c':'00101110',
    'd':'00100000',
    'e':'00010010',
    'f':'00100001',
    'g':'00100010',
    'h':'00100011',
    'i':'00010111',
    'j':'00100100',
    'k':'00100101',
    'l':'00100110',
    'm':'00110010',
    'n':'00110001',
    'o':'00010100',
    'p':'00010101',
    'q':'00010000',
    'r':'00010011',
    's':'00011111',
    't':'00010010',
    'u':'00010110',
    'v':'00101111',
    'w':'00010001',
    'x':'00101101',
    'y':'00010101',
    'z':'00101100'
}
def transmit(binary):
    for i in range(8):
        bindig=binary[i]
        print(bindig)
        if bindig=='0':
            io.output(27,1)
            io.output(17,0)
            time.sleep(timedelay)
        if bindig=='1':
            io.output(27,0)
            io.output(17,1)
            time.sleep(timedelay)
    io.output(27,0)
    io.output(17,0)
    time.sleep(timedelay*2)
def word(string):
    for i in range(len(string)):
        transmit(scancodes[string[i]])
def receive():
    string=[]
    x=True
    print('CHECK')
    while x==True:
        if io.input(18):
            string.append(1)
        elif io.input(23):
            string.append(0)
        else:
            x=False
    return string
c=True
while c==True:
    if io.input(18):
        print(receive())
        c=False
    elif io.input(23):
        print(receive())
        c=False
io.cleanup()


    
    


import argparse
import os
import sys
import time


try:
    import pubnub
except ModuleNotFoundError:
    print('PubNub library required. Installing in 3 seconds')
    time.sleep(3)
    os.system('pip install pubnub')

os.system('color 0A')
parser = argparse.ArgumentParser(description='List the content of a folder')

parser.add_argument('publish_key',
                       metavar='pub',
                       type=str,
                       help='pubnub publish key')
parser.add_argument('subscribe_key',
                       metavar='sub',
                       type=str,
                       help='pubnub subscribe key')
parser.add_argument('uid',
                       metavar='uid',
                       type=str,
                       help='pubnub uid')
parser.add_argument('keyset_name',
                       metavar='keyset_name',
                       type=str,
                       help='pubnub key set name')
args = parser.parse_args()


pub = args.publish_key
sub = args.subscribe_key
uid = args.uid
name = args.keyset_name

print("Verifying credentials...")
import pubnub_init

pubnub_init.init(pub,sub,uid,name)

while True:
    if pubnub_init.connected == True:
        #print(pubnub_init.msg)
        if pubnub_init.glob == True:
            command = input()
        else:
            command = input(">")

        
        msg = pubnub_init.msg

        
        pubnub_init.pb.publish().channel(name).message({"type":"command","command":command}).pn_async(pubnub_init.my_publish_callback)
        pubnub_init.msg = ""



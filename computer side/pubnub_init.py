from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory, PNOperationType
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import ctrlmodule
class ErrorWhileConnecting(Exception):
    pass

def my_init_callback(envelope, status):
    if not status.is_error():
        print('Verified!')
        global connected
        connected = True
    else:
        
        raise ErrorWhileConnecting("Unable to verify connection")

def my_publish_callback(envelope, status):
    if not status.is_error():
        pass
    else:
        raise ErrorWhileConnecting("Unable to send")
class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass

    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass
        elif status.category == PNStatusCategory.PNConnectedCategory:
            pass
        elif status.category == PNStatusCategory.PNReconnectedCategory:
            pass
        elif status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass
    def message(self, pubnub, message):
        global msg
        global glob
        global pnconfig
        msg = message
        if msg.message['type'] == "init" and msg.publisher != pnconfig.uuid:
            print("\nInitialized connection with "+msg.publisher+"\n>",end="")
        elif msg.message['type'] == "init" and msg.publisher == pnconfig.uuid:
            print("\nInitialized "+msg.publisher+"\n>",end="")
        elif msg.message['type'] == "command" and msg.publisher != pnconfig.uuid:
            
            command = msg.message['command']
            command_name = command.split(' ')[0]
            command_args = command.split(' ')[1:]
            k = ctrlmodule.exec(command_name,command_args)
            if k == True:
                pb.publish().channel(keyset_name).message({"type":"command_done"}).pn_async(my_publish_callback)
        elif msg.message['type'] == "command_done" and msg.publisher != pnconfig.uuid:
            print('\nCommand executed successfully\n>',end="")
        elif msg.message['type'] == "command_not_found" and msg.publisher != pnconfig.uuid:
            print('\nCommand Not Found\n>',end="")
        elif msg.message['type'] == "send_msg" and msg.publisher != pnconfig.uuid:
            ctrlmodule.recv_msg(msg.message['content'])
        elif msg.publisher != pnconfig.uuid:
            print("\n"+msg.publisher+" : "+str(msg.message)+"\n>",end="")
            
        
pnconfig = PNConfiguration()
pubnub = None
keyset_name = None
pb = None
msg = None
connected = False
glob = False
def init(pub,sub,uid,key):
    global pnconfig 
    global pubnub
    global keyset_name
    global pb
    pnconfig.subscribe_key = sub
    pnconfig.publish_key = pub
    pnconfig.uuid = uid
    keyset_name = key
    pb = PubNub(pnconfig)
    pb.add_listener(MySubscribeCallback())
    pb.subscribe().channels(key).execute()
    pb.publish().channel(keyset_name).message({"type":"init"}).pn_async(my_init_callback)
    
def send(data):
    global pb

    d = {}
    d['type'] = 'send_msg'
    d['content'] = data
    pb.publish().channel(keyset_name).message(d).pn_async(my_publish_callback)

def command_not_found():
    d = {}
    d['type'] = 'command_not_found'
    pb.publish().channel(keyset_name).message(d).pn_async(my_publish_callback)

def error(e):
    d = {}
    d['type'] = 'error'
    d['error_msg'] = str(e)
    pb.publish().channel(keyset_name).message(d).pn_async(my_publish_callback)

import pubnub_init
def writeconsole(msg):
    print('\n'+msg+'\n>',end="")
def exec(command_name,command_args):
    try:
        if command_name == 'foo':
            writeconsole('Command : foo')
            return True
        else:
            pubnub_init.command_not_found()
            return False
            
    except Exception as e:
        pubnub_init.error(str(e))
        
def recv_msg(content):
    if content == "hello":
        writeconsole('les go')

function exec(command_name,command_args) {
    if (command_name == "bar") {
        write_console('Command : bar')
        command_done();
        return true;
    } else {
        
        command_not_found();
        return false;
    }
}
function recv_msg(content) {
    if (content == true) {
        write_console('OMGOMGOMGOMG')
    }
}
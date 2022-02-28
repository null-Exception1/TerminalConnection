/*
 * Block Cursor v1.0.0
 *
 * The following code is to execute a command enter in console.
 *
 * Copyright © Shaurya Pratap Srivastava, All Rights Reserved.
 * 
 * 
 * -------In collaboration with-------
 * 
 * 
 * 
 * Terminal Connection v1.0.0
 *
 * The following code is process scripts via console made by Block Cursor code. Uses PubNub API, more at https://www.pubnub.com/
 *
 * Copyright © Shaurya Pratap Srivastava, All Rights Reserved.
 */
var connected = false;
function write_console(msg) {
    document.querySelector("#huh").innerHTML += msg+` <br />`;
}
function send(data) {
    d = {}
    d['type'] = 'send_msg'
    d['content'] = data
    var payload = {
        channel: key,
        message: d
    }
    pubnub.publish(payload, function (status, response) {
        if (connected == false) {
            if (status.statusCode == 200) {
                document.querySelector("#huh").innerHTML += `Verified! <br />`;
                connected = true;
            }
            else {
                document.querySelector("#huh").innerHTML += `Unable to verify credentials. <br />`;
            }
        } else {

        }
    })
}
function command_not_found() {
    d = {}
    d['type'] = 'command_not_found'
    var payload = {
        channel: key,
        message: d
    }
    pubnub.publish(payload, function (status, response) {
        if (connected == false) {
            if (status.statusCode == 200) {
                document.querySelector("#huh").innerHTML += `Verified! <br />`;
                connected = true;
            }
            else {
                document.querySelector("#huh").innerHTML += `Unable to verify credentials. <br />`;
            }
        } else {

        }
    })
}
function command_done() {
    d = {}
    d['type'] = 'command_done'
    var payload = {
        channel: key,
        message: d
    }
    pubnub.publish(payload, function (status, response) {
        if (connected == false) {
            if (status.statusCode == 200) {
                document.querySelector("#huh").innerHTML += `Verified! <br />`;
                connected = true;
            }
            else {
                document.querySelector("#huh").innerHTML += `Unable to verify credentials. <br />`;
            }
        } else {

        }
    })
}
function scriptprocessing() {
    code = document.querySelector("#input").innerText.replace('ㅤ', '');
    commands = ["connect", "help"]
    
    if (connected == true) {
        var payload = {
            channel: key,
            message: {
                type: "command",
                command: code
            }
        }
        pubnub.publish(payload, function (status, response) {
            if (connected == false) {
                if (status.statusCode == 200) {
                    document.querySelector("#huh").innerHTML += `Verified! <br />`;
                    connected = true;
                }
                else {
                    document.querySelector("#huh").innerHTML += `Unable to verify credentials. <br />`;
                }
            } else {

            }
        })
    }
    if (code.slice(0, 7) == "connect") {
        pub = code.split(' ')[1]
        sub = code.split(' ')[2]
        uid = code.split(' ')[3]
        key = code.split(' ')[4]
        if (pub == undefined || key == '') {
            document.querySelector("#huh").innerHTML += `Publish key is not defined <br />`;
        }
        else if (sub == undefined || key == '') {
            document.querySelector("#huh").innerHTML += `Subcribe key is not defined <br />`;
        }
        else if (uid == undefined || key == '') {
            document.querySelector("#huh").innerHTML += `UUID is not defined <br />`;
        }
        else if (key == undefined || key == '') {
            document.querySelector("#huh").innerHTML += `Keyset name is not defined <br />`;
        }
        else {
            document.querySelector("#huh").innerHTML += `Verifying credentials...<br />`;
            pubnub = new PubNub({
                publishKey: pub,
                subscribeKey: sub,
                uuid: uid
            })
            pubnub.addListener({
                status: function (statusEvent) {
                    if (statusEvent.category === "PNConnectedCategory") {
                        console.log('connected')
                    }
                },
                message: function (msg) {
                    if (msg.message['type'] == "init" && msg.publisher != uid) {
                        document.querySelector("#huh").innerHTML += `Initialized connection with ` + msg.publisher + ` <br />`;
                    }
                    else if (msg.message['type'] == "command_done" && msg.publisher != uid){
                        document.querySelector("#huh").innerHTML += `Command executed successfully <br />`;
                    }
                    else if (msg.message['type'] == "command" && msg.publisher != uid) {
                        command = msg.message['command'];
                        command_name = command.split(' ')[0];
                        command_args = command.split(' ').slice(1,command.split(' ').length)
                        exec(command_name, command_args)
                    }
                    else if (msg.message['type'] == "send_msg" && msg.publisher != uid) {
                        recv_msg(msg.message.content)
                    }
                    else if (msg.message['type'] == "command_not_found" && msg.publisher != uid) {
                        document.querySelector("#huh").innerHTML += `Command Not Found <br />`;
                    }
                    else if (msg.message['type'] == "error" && msg.publisher != uid) {
                        document.querySelector("#huh").innerHTML += `Error found : ` + msg.message['error_msg']+` <br />`;
                    }
                    else if (msg.publisher != uid){
                        document.querySelector("#huh").innerHTML += msg.publisher + ` : ` + JSON.stringify(msg.message) + ` <br />`;
                        console.log(msg.publisher + ` : ` + JSON.stringify(msg.message));
                    }
                },
                presence: function (presenceEvent) {
                }
            })
            pubnub.subscribe({
                channels: [key]
            });
            var payload = {
                channel: key,
                message: {
                    type:"init"
                }
            }
            pubnub.publish(payload, function (status, response) {
                if (connected == false) {
                    if (status.statusCode == 200) {
                        document.querySelector("#huh").innerHTML += `Verified! <br />`;
                        connected = true;
                    }
                    else {
                        document.querySelector("#huh").innerHTML += `Unable to verify credentials. <br />`;
                    }
                } else {

                }
            })
        }
    }
    if (code == "help" && connected == false) {
        document.querySelector("#huh").innerHTML += `connect publish_key subscribe_key uid keyset_name<br />`;
    }
    a = false
    for (i in commands) {
        if (commands[i] == code.split(' ')[0]) {
            a = true;
        }
    }


    document.querySelector("#input").innerHTML = `<button id="caret" for="input" contenteditable="false">ㅤ</button>`;

}
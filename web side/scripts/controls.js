/*
 * Block Cursor v1.0.0
 * 
 * The following code simulates block cursor functionality in javascript. Provided events it can process - 
 * o Backspace
 * o Delete
 * o Arrows (Left and Right)
 * o Backspace while containing a letter
 * o Delete while containing a letter
 * 
 * Copyright © Shaurya Pratap Srivastava, All Rights Reserved.
 */

// Key event dictionary
var keyevent = {}

// Key down event
window.addEventListener('keydown', function (e) {
    var input = document.getElementById('input');
    var caret = document.getElementById('caret');

    // Pressed left arrow
    if (keyevent[e.key] != true && e.key == "ArrowLeft") {

        // Replace button tags with ` and | to make things easier
        a = String(input.innerHTML);
        a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
        a = a.replace('</button>', "|");
        a = a.split('');

        // Move ` to the left 
        m = a.indexOf('`')
        a[m] = a[m - 1];
        a[m - 1] = "`";
        a = a.join('');

        // Move | to the left
        a = a.split('');
        m = a.indexOf('|')
        a[m] = a[m - 1];
        a[m - 1] = "|";
        a = a.join('');
        b = false;

        // Check if is inbounds
        for (i in a.split('')) {
            if (a.split('')[i] == '`') {
                b = true;
            }
        }

        // If isn't out of boundary, update HTML
        if (b) {

            // Replace ` and | with the button tags 
            a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
            a = a.replace('|', '</button>')

            // Update HTML
            input.innerHTML = a
        }
    }

    // Pressed right arrow
    if (keyevent[e.key] != true && e.key == "ArrowRight") {

        // Replace button tags with ` and | to make things easier
        a = String(input.innerHTML);
        a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
        a = a.replace('</button>', "|");
        a = a.split('');
        m = a.indexOf('`')

        // Check if we're already on the right edge; If not, proceed to move cursor
        if (a[m + 1] != "ㅤ") {

            // Move ` to the right
            a[m] = a[m + 1];
            a[m + 1] = "`";
            a = a.join('');

            // Move | to the right
            a = a.split('');
            m = a.indexOf('|')
            a[m] = a[m + 1];
            a[m + 1] = "|";
            a = a.join('');

            // Replace ` and | with the button tags
            a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
            a = a.replace('|', '</button>')

            // Update HTML
            input.innerHTML = a

        }
    }

    // Pressed backspace
    if (keyevent[e.key] != true && e.key == "Backspace") {

        // Check if cursor is on the right edge; If so, proceed with normal backspace function
        if (document.querySelector("#caret").innerText == "ㅤ") {
            a = String(input.innerHTML);
            a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
            a = a.replace('</button>', "|");
            a = a.split('');
            m = a.indexOf('`')
            a = a.join('');
            a = a.split('');
            m = a.indexOf('`')
            a.splice(m - 1, 1)
            a = a.join('');
            a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
            a = a.replace('|', '</button>')

            input.innerHTML = a;
        }

        // Check if the cursor is containing a letter; If so, proceed with a different kind of backspace function
        if (document.querySelector("#caret").innerText != "ㅤ") {
            a = String(input.innerHTML);
            a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
            a = a.replace('</button>', "|");
            a = a.split('');
            m = a.indexOf('`')
            a[m] = a[m - 1];
            a[m - 1] = "`";
            a = a.join('');

            a = a.split('');
            m = a.indexOf('|')
            a.splice(m - 1, 1);
            a = a.join('')

            b = false;
            for (i in a.split('')) {
                if (a.split('')[i] == '`') {
                    b = true;
                }
            }
            if (b) {
                a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
                a = a.replace('|', '</button>')

                input.innerHTML = a
            } else {
                a = String(input.innerHTML);
                a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
                a = a.replace('</button>', "|");
                a = a.split('');
                m = a.indexOf('`')
                a[m] = a[m + 1];
                a[m + 1] = "`";
                a.splice(m, 1);
                a = a.join('');

                a = a.split('');
                m = a.indexOf('|')


                a[m] = a[m + 1];
                a[m + 1] = "|";
                a = a.join('')

                a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
                a = a.replace('|', '</button>')

                input.innerHTML = a
            }
        }
    }

    // Pressed delete
    if (keyevent[e.key] != true && e.key == "Delete") {
        if (document.querySelector("#caret").innerText != "ㅤ") {
            a = String(input.innerHTML);
            a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
            a = a.replace('</button>', "|");
            a = a.split('');
            m = a.indexOf('`')
            a[m] = a[m + 1];
            a[m + 1] = "`";
            a.splice(m, 1);
            a = a.join('');

            a = a.split('');
            m = a.indexOf('|')


            a[m] = a[m + 1];
            a[m + 1] = "|";
            a = a.join('')

            a = a.replace('`', '<button id="caret" for="input" contenteditable="false">')
            a = a.replace('|', '</button>')

            input.innerHTML = a
        }
    }

    // Pressed enter
    if (keyevent[e.key] != true && e.key == "Enter") {

        // Proceed to move downward
        a = String(document.querySelector("#input").innerText);
        document.querySelector("#huh").innerHTML += ">" + a + "<br />";

        // Process command given
        scriptprocessing();

    }

    // Typing function (ignore special keys while typing)
    if (e.key != "Backspace" && e.key != "ArrowRight" && e.key != "ArrowLeft" && e.key != "Control" && e.key != "Shift" && e.key != "Alt" && e.key != "Delete" && e.key != "Control" && e.key != "Enter") {

        // Paste
        if (keyevent[e.key] != true && e.key == "v") {
            if (keyevent["Control"] == true) {
                navigator.clipboard.readText().then(e => {
                    for (i in String(e).split('')) {
                        a = String(input.innerHTML);
                        a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
                        a = a.replace('</button>', "|");

                        a = a.split('');
                        m = a.indexOf('`')
                        a.splice(m, 0, e[i])

                        a = a.join('')

                        a = a.replace('`', '<button id="caret" for="input" contenteditable="false">');
                        a = a.replace('|', '</button>');

                        input.innerHTML = a;
                    }
                })

            }

        }

        // If cursor is on the right edge; type the pressed key.
        else if (document.querySelector("#caret").innerText == "ㅤ") {
            a = String(input.innerHTML);
            a = a.replace('<button id="caret" for="input" contenteditable="false">', "`");
            a = a.replace('</button>', "|");

            a = a.split('');
            m = a.indexOf('`')
            a.splice(m, 0, e.key)

            a = a.join('')

            a = a.replace('`', '<button id="caret" for="input" contenteditable="false">');
            a = a.replace('|', '</button>');

            input.innerHTML = a;
        }
    }

    
    
    // Register following key has been pressed.
    keyevent[e.key] = true;
})

// Key up
window.addEventListener('keyup', function (e) {

    // Register that the following key has been let go.
    keyevent[e.key] = false;
})
# TerminalConnection
An open-source tool to send commands to your python program through a web terminal

# Setup

**NOTE: YOU CANNOT USE MY PUBNUB KEYS. I'VE ALREADY DELETED THEM.**
To use this tool you have to create a keyset using [PubNub](https://www.pubnub.com/)

To start, go to [PubNub Sign up](https://dashboard.pubnub.com/signup) and sign up for free.

Next, pick this option in order to let PubNub know we'll be using this for our terminal
![image](https://user-images.githubusercontent.com/82306174/155925975-c9e9a576-cb33-4bd1-91b9-f1efa52ff500.png)

Go to Apps
![image](https://user-images.githubusercontent.com/82306174/155926383-d0ddae57-006b-4c29-a50a-1923c36283d4.png)

Go to "My First App"
![image](https://user-images.githubusercontent.com/82306174/155926562-c6cf2ed3-9757-423a-ba0d-87b32c116812.png)

Click on "Create a new keyset"
![image](https://user-images.githubusercontent.com/82306174/155926616-47c3c0a5-2570-4414-a6b8-bc2b58cb6bfc.png)

Choose whatever name you'd like
![image](https://user-images.githubusercontent.com/82306174/155926688-143fe77b-f13b-441a-951c-681cd96d19a5.png)

Click on the keyset you made in the previous step
![image](https://user-images.githubusercontent.com/82306174/155926922-4554862b-156f-4082-9a11-a46355190696.png)

You will see a screen like this - 
![image](https://user-images.githubusercontent.com/82306174/155926972-eb98edcb-87af-46f9-935c-96754ac8c69e.png)

These keys are incredibly important. They will be used for initialization.

Next, download the repo and open index.html
![image](https://user-images.githubusercontent.com/82306174/155927242-aced6b91-6f16-42f6-ba03-af62dcdca5df.png)

You should see a web terminal - 
![image](https://user-images.githubusercontent.com/82306174/155927318-f4aa9103-51cf-4911-a6c4-756943f51405.png)

Next, you have to write this command - 
![image](https://user-images.githubusercontent.com/82306174/155927526-14bf5930-e763-48a4-902b-166fca01bb0c.png)

**NOTE: DO NOT COPY PASTE THE EXACT SAME THING WRITTEN, YOU HAVE TO REPLACE THE ARGUMENTS WITH THE ACTUAL KEYS**
In my case it would look like this - 
![image](https://user-images.githubusercontent.com/82306174/155927675-cb454e34-cb29-4c22-9315-a89ff07faee4.png)

Press enter, you should see this - 
![image](https://user-images.githubusercontent.com/82306174/155927738-0b78b6a9-8a94-470f-b5b1-feec6800ef0f.png)

Next we need to initialize the python terminal, open your command-line
In case you haven't downloaded this repository, please do so now. 

You need to do "cd <path_where_downloaded_repository_is>"
![image](https://user-images.githubusercontent.com/82306174/155928203-2a96ea29-01c2-43b9-97ba-6b71147fde9b.png)

After which, do "py main.py <publish_key> <subscribe_key> <uid> <keyset_name>"
In my case, i'll be typing - 

![image](https://user-images.githubusercontent.com/82306174/155928464-ea716011-7a15-45a3-8d34-952f240e9350.png)

Press enter

If you already have pubnub module installed it should look like this - 
![image](https://user-images.githubusercontent.com/82306174/155928818-2076e33d-e455-4863-b164-298403eb0ce3.png)

If you haven't it should look like this - 
![image](https://user-images.githubusercontent.com/82306174/155929294-10587ead-80aa-4bb7-a2fd-05e4d6196784.png)


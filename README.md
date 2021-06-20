## Instructions
There are two ways to access this website.

1. On localhost of your device
1.1. On your Google Chrome, install [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=th) extension since Google Chrome doesn't allow CORS when developing on localhost. So, we need to use this tool.
1.2. Click on the extension icon, then click `ON` to allow CORS
1.3. Clone this project
1.4. Go to the project directory by typing `cd nytimes-most-popular` in terminal
1.5. run the app by typing `yarn dev` then press `Enter` in the terminal

2. Access this site I hosted on Vercel
2.1. Here is the [Link to the website](https://nytimes-most-popular.vercel.app/)
2.2. I use the Static Site Generation technique, in which the page is generated at **build time**. It should not has trouble with CORS. If the problem is presented, I suggest you install the extension at segment 1.1.
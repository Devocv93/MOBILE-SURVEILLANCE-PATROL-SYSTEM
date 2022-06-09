# MOBILE APP - SURVEILLANCE PATROL SYSTEM 
The whole project is an challenge, separeted in back (Express), front (Vue js) and mobile (React Native Expo) application using Java Script skills.

A simple control web system wich allows administrators managment each inspection from security guard. 

## Description

![security guard](https://www.jwm-rfid.com/wp-content/uploads/2020/09/guard-patrol.png)

When you employ the guard tour system, you won’t need to use notebooks or keep track of an ever-growing paper trail for your company. Instead, security officials will scan Qr codes checkpoints and log reports with ease using a smartphone, each point might contain an incident and comments. Before that, the system administrator  will plan a patrol route that includes particular checkpoints where security personnel must stop. The real-time event data is automatically delivered to our web system and stored safely. Using a mobile device, each guard is in charge of their own work. 


## How to use it
    
* Check out the backend/front system (project setup).
* This mobile application is for security guards..
* Sign In as an security guard.

* Home screen:
    - Select the tour to check.
    - Click start button.
    - You need to scan the qr code (point to check) from the front System and select an incident.
    - Click in the right arrow button below, to continue the next point.
    - At the end you will finish pressing done button below.
    - An alert message will show you the operation status.
    - This checkpoint will save locally.

* Upload inspection screen:
    - You can find the list of all inspections done.
    - Press upload icon to upload to server.
    - Ready!, your selected  inspection was uploaded.
    - Check out in the web admin, it sould be there.

* Profile screen:
    - A simple screen, you can find your user account and log out.


* Don't forget change your own url path /constants/url 
* See screenshot folder

## Technologies
React Native (Expo), react native async storage, expo-barcode-scanner, redux toolkit (state managment),react navigation, react native paper, Axios

## Project setup
```
npm install
```

### Compiles for development
```
npm start
```

### Create APK for production Android only
More information see https://docs.expo.dev/build-reference/apk/
```
eas build -p android --profile preview
```

* Enjoy!

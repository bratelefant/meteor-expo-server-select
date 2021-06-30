# Simple Example for dynamically choosing a meteor backend server in an Expo app

This is a proof of concept example on how to connect an Expo app dynamically to different meteor servers. This app assumes that there is a Meteor server running the localmarket example (cf. [https://github.com/meteor/localmarket]).

Available server urls must be provided in `Servers.js` (eg. for local testing you may choose localhost and your local IP as examples).

I started this since I had issues with a similary approach in my own expo app; running in Expo Go works find but on device, when I send the built app to background and then get it back in active state, subscriptions are empty.
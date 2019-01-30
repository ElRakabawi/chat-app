# Vue/Scaledrone Chat Web App
A VueJS/Vuex built with scaledrone, to provide 1-to-1 chat with image support. 
<br/>
**Live deployed demo [here](https://elrakabawi.github.io/chatapp/).**


Reponsitivity test result: [Here](https://www.responsinator.com/?url=https%3A%2F%2Felrakabawi.github.io%2Fchatapp).

**- This guide is dissected into two sections:**
* The Rationale
* Project setup
* File structure 


### The Rationale
The project doesn't contain router as there's only one route with three views, the accounts system is built on Vuex for demonestration only and is exposed in the state. The selected design pattern is Single-file components (Vue) and Pub/Sub pattern (Websockets) for Scaledrone.
<br/>
There's four accounts hardcoded in the initial state which are:
| Name          | Password      |
| ------------- | ------------- |
| mohamed       | mohamed123    |
| ahmed         | ahmed123      |
| ted           | ted123        |
| alex          | alex123       |

There's no backend nor uploader script (API endpoint) for the images, it's handled completely in the front-end through encoding/decoding with base64.


## Project setup
```
yarn install //or npm install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```



### File and folder structure

```
chat-app
│
│─── README.md
│─── package.json
│               
└─── public
│   └─── index.html
│   
|─── src
|    │─── App.vue
|    │─── main.js  // main entry
│    │─── store.js // contains the state
│    │
|    └─── components                 
|           └─── Login.vue
|           └─── Signup.vue
|           └─── Chat.vue 
|
└─── node_modules   
```

Waving goes to Instadiet.


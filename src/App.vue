<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to Ewy!"/>
  <RandomQuestion />

  <p id="version"></p>

  <div id="notification" class="hidden">
    <p id="message"></p>
    <button id="close-button" onClick="closeNotification()">
      Close
    </button>
    <button id="restart-button" onClick="restartApp()" class="hidden">
      Restart
    </button>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
// import LottieAnimation from './components/Animation.vue';
import RandomQuestion from './components/RandomQuestion.vue';

const { ipcRenderer } = require('electron');
const version = document.getElementById('version');

import { reactive, onMounted, ref } from 'vue';
import db from './db';

export default {
  name: 'App',
  components: {
    HelloWorld,
    // LottieAnimation,
    RandomQuestion
  },
  computed: {
    // isCorrect() {
      // return state.correct;
    // }
  },
  setup() {

    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      version.innerText = 'Version ' + arg.version;
    });

    const notification = document.getElementById('notification');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      message.innerText = 'A new update is available. Downloading now...';
      notification.classList.remove('hidden');
    });
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
      restartButton.classList.remove('hidden');
      notification.classList.remove('hidden');
    });

    function closeNotification() {
      notification.classList.add('hidden');
    }
    function restartApp() {
      ipcRenderer.send('restart_app');
    }

    // const Check = () => {
    //   if (inputUsername.value != "" || inputUsername.value != null) {
    //     state.username = inputUsername.value;
    //     inputUsername.value = "";
    //   }
    // }

    // const SendAnswer = () => {
    //   const answerRef = db.database().ref("answer");
    //   console.log(inputAnswer.value);

    //   if (inputAnswer.value == "" || inputAnswer.value == null) {
    //     console.log('blank');
    //     return;
    //   }

    //   state.answer = inputAnswer.value

    //   const message = {
    //     answer: state.answer,
    //     content: inputAnswer.value
    //   }
    //   console.log(message);
    //   answerRef.push(message);
    //   inputAnswer.value = "";

    // }

    return {
      // state,
      // inputAnswer
      // SendAnswer
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

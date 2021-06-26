<template>
  <form @submit.prevent="CheckAnswer">
    <h1>{{ state.question }}</h1>
    <p>{{ state.isCorrect }}</p>
    <input 
      type="text"
      v-model="inputAnswer"
      placeholder="answer" 
      v-if="isAQuiz"/>
    
    <input 
      type="submit" 
      value="CheckAnswer" 
      />  
  </form>
  <LottieAnimation v-if="isCorrect"/>

</template>

<script>
    import { reactive, ref } from 'vue';
    import LottieAnimation from './Animation.vue';
    import db from './../db';

    const { ipcRenderer } = window.require('electron')
    // const { ipcRenderer } = require('electron').remote

    export default {
        name: 'RandomQuestion',
        components: {
            LottieAnimation
        },
        computed: {
            isAQuiz() {
                return true;
            },
            isCorrect() {
                return this.state.isCorrect;
            }
        },
        // methods: {
        //     isCorrect() {
        //         return this.state.isCorrect;
        //     }
        // },
        setup() {
            const inputAnswer = ref("");
            const state = reactive({ 
                question: "", 
                type: "",
                duration: "", 
                answer: "",
                isCorrect: false
            });
            const questionsRef = db.database().ref("Qs");
            var randomItem;
            var items = [];

            questionsRef.on('value', (snapshot) => {

                snapshot.forEach( (item) => {
                    items.push(item.val());                    
                });

                var response = [];
                items.forEach(function(data) {
                    response.push(data);
                    if(response.length  === items.length) {
                        randomItem = items[Math.floor(Math.random()*items.length)];
                        state.question = randomItem.q;
                        state.type = Object.prototype.hasOwnProperty.call(randomItem, "t") ? randomItem.t : false;
                        state.duration = Object.prototype.hasOwnProperty.call(randomItem, "t") ? randomItem.d : false;
                        state.answer = Object.prototype.hasOwnProperty.call(randomItem, "t") ? false : randomItem.a;
                    }
                });
            })

            const CheckAnswer = () => {
                console.log(inputAnswer.value);
                console.log('s', state);

                if (inputAnswer.value == "" || inputAnswer.value == null) {
                    //Answer is Blank
                    console.log('blank');
                    return;
                }

                if (inputAnswer.value == state.answer) {
                    console.log('woot!');
                    state.isCorrect = true;
                    ipcRenderer.send('foo');
                } else {
                    console.log('oops');
                    state.isCorrect = false;
                }
                return;
            }

            return {
                state,
                CheckAnswer,
                inputAnswer
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    p {
        color: red;
    }
</style>
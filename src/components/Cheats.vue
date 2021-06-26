<template>
  <div>
    <h1>{{ some_variable }}</h1>
    <p>Your HTML Body here</p>
  </div>
</template>

<script>
export default {
  name: 'Cheats',
  setup() {
    // Getting random Stuff
    // const i = questions[Math.floor(Math.random()*questions.length)];

    // Connecting to Firebase DB
    // const questionsRef = db.database().ref("Qs");
    // questionsRef.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });

    // Shorthand if then else
    // var variable = Object.prototype.hasOwnProperty.call(randomItem, "t") ? randomItem.t : false;

  },
  props: {
    some_variable: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>

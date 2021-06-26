<template>
    <lottie-animation
        path="test.json"
    />
    <!-- https://github.com/SuperbuffNL/lottie-vuejs
    https://lottiefiles.com/26287-fireworks
    https://www.npmjs.com/package/lottie-vuejs -->
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; 

export default {
  name: 'Animation',
  components: {
    LottieAnimation
  }
}
</script>
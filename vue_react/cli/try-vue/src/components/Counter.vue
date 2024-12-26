<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
<script setup>
import{
  ref,
}from"vue"

const count = ref(0)

const increment = () => {
  count.value++
}
</script>
<style>
.counter {
  text-align: center;
  margin-top:50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
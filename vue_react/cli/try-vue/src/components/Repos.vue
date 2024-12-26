<template>
   <ul>
     <li v-for="(repo,index) in repos" :key="index">{{repo.name}}</li>
    </ul>
</template>

<script setup>

  const repos = [
        {
            id:1,
            name:'lesson_hm'
        },
        {
            id:2,
            name:'algo-hello'
        },
        {
            id:3,
            name:'prompt'
        }
    ]

</script>

<style scoped>

</style>
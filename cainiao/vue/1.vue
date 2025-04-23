<script setup>
import { ref } from 'vue'
import { nextTick } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}



// 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API：
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
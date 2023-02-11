<script setup lang="ts">
// import { tweened } from "svelte/motion"
// import { cubicInOut } from "svelte/easing"

const { effects } = useSprachyApp()

const props = defineProps<{
  title: string
  expStart: number
  expGained: number
}>()

const state = useLocalReactive({
  renderExp: 0,

  get initialLevel() {
    return Math.floor(props.expStart / 1000)
  },

  get renderLevel() {
    return Math.floor(state.renderExp / 1000)
  },

  get fracProgress() {
    return (state.renderExp % 1000) / 1000
  }
})

// let renderExp = tweened(expStart, {
//   duration: expGained,
//   easing: cubicInOut,
// })

watchEffect(() => {
  if (state.renderLevel > state.initialLevel) {
    effects.confetti.spawnAt(endpointRef.value!)
  }
})

const endpointRef = ref<HTMLDivElement>()

onMounted(() => {
  testProgress()
})

async function testProgress() {
  // await renderExp.set(expStart, { duration: 0 })
  // await renderExp.set(expStart + expGained)
  // dispatch("animEnd")
}
</script>

<template>
  <tr class="item" :key="title">
    <td>
      <h6>{{ title }}</h6>
    </td>
    <td>
      <div class="d-flex align-items-center">
        <div class="expbar">
          <div class="expbar-fill" :style="{ 'width': `${state.fracProgress * 100}%` }" />
        </div>
        <div class="level ms-2" ref="endpointRef">
          Level {{ state.renderLevel }}
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.item {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

td:first-child {
  white-space: nowrap;
  text-align: right;
  padding-right: 0.5rem;
}

td:last-child {
  width: 100%;
}

h6 {
  margin: 0;
  margin-top: -2px;
  font-weight: normal;
  font-size: 1.1rem;
}

.expbar {
  position: relative;
  flex-grow: 1;
  height: 15px;
  background: #f5f5f5;
  border-radius: 5px;
  margin: 10px 0;
  display: flex;
}

.expbar-fill {
  position: absolute;
  height: 100%;
  background: #00bcd4;
  border-radius: 5px;
}

.level {
  height: 30px;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #00bcd4;
}
</style>

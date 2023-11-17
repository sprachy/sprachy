<script lang="ts" setup>

const learnable = toRefs(progressStore).currentLearnable
</script>

<template>
  <aside class="sidebar">
    <div class="overview" v-if="learnable">
      <div>{{ learnable.why }}</div>
      <LevelBar v-if="'pattern' in learnable" :key="learnable.pattern.id"
        :experience="learnable.pattern.progress.experience" />
      <!-- <small v-if="learnable.type === 'dialogue'" class="text-secondary">&lt;&lt; Press Enter to continue dialogue
        &gt;&gt;</small> -->
    </div>

    <LearnDevPanel v-if="dev" />
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  padding: 1rem;
  padding-top: 5rem;
  border-right: 1px solid #ccc;
  z-index: 1;
  background-color: white;
  width: 300px;

  display: flex;
  flex-direction: column;
}
</style>

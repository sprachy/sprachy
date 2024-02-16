<template>
  <NuxtLayout name="default" fixedHeader>
    <div class="toc-layout">
      <aside class="sidebar">
        <SidebarTOC />
        <LearnDevPanel v-if="dev" />
      </aside>
      <slot />
    </div>
  </NuxtLayout>
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

.toc-layout {
  padding-left: 300px;
}
</style>
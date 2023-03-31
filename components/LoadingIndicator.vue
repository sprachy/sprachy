<template>
  <div class="dots-bars-9"></div>
</template>

<style scoped>
.dots-bars-9 {
  width: 40px;
  height: 40px;
  --c: linear-gradient(currentColor 0 0);
  background:
    var(--c) 0 0,
    var(--c) 0 100%,
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 0,
    var(--c) 100% 100%;
  background-size: 8px 50%;
  background-repeat: no-repeat;
  animation: db9-0 2s infinite;
  position: relative;
  overflow: hidden;
}

.dots-bars-9:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  top: calc(50% - 4px);
  left: -8px;
  animation: inherit;
  animation-name: db9-1;
}

@keyframes db9-0 {
  16.67% {
    background-size: 8px 30%, 8px 30%, 8px 50%, 8px 50%, 8px 50%, 8px 50%
  }

  33.33% {
    background-size: 8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 50%, 8px 50%
  }

  50% {
    background-size: 8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 50%, 8px 50%
  }

  66.67% {
    background-size: 8px 50%, 8px 50%, 8px 30%, 8px 30%, 8px 50%, 8px 50%
  }

  83.33% {
    background-size: 8px 50%, 8px 50%, 8px 50%, 8px 50%, 8px 50%, 8px 50%
  }
}

@keyframes db9-1 {
  20% {
    left: 0px
  }

  40%,
  70% {
    left: calc(50% - 4px)
  }

  80%,
  85% {
    left: 8px;
    top: calc(50% - 4px)
  }

  100% {
    left: 8px;
    top: -8px
  }
}
</style>
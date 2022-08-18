<script lang="ts" setup>
</script>

<template>
  <main>
    <div class="lds-dual-ring"></div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

main {
  @include flex(center, center);
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  transform: scale(1.5);
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  //border: 6px solid #fff;
  border: 6px solid var(--color-accent);
  //border-color: #fff transparent #fff transparent;
  border-color: var(--color-accent) transparent var(--color-accent) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

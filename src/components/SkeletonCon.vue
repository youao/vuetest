<template>
  <div class="skeleton"></div>
</template>

<script>
export default {
  name: "SkeletonCon",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.skeleton {
  position: relative;
  width: 100%;
  height: 2rem;
  border: 0.8rem;
  overflow: hidden;
  background: #eee;
}
.skeleton::after {
  content: "";
  position: absolute;
  width: 10rem;
  height: 100%;
  top: 0;
  left: -10rem;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0)
  );
  opacity: 0;
  transform: skewX(-30deg);
  animation: SkeletonCon 2s linear infinite;
  -webkit-animation: SkeletonCon 2s linear infinite;
}
@keyframes SkeletonCon {
  30% {
    left: -10rem;
    opacity: 0;
  }
  50% {
    left: 50vw;
    opacity: 1;
  }
  70% {
    left: 100vw;
    opacity: 0;
  }
}
@-webkit-keyframes SkeletonCon {
  25% {
    left: -6rem;
    opacity: 0;
  }
  50% {
    left: 50%;
    opacity: 1;
  }
  75% {
    left: 100%;
    opacity: 0;
  }
}
</style>

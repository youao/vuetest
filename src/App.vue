<template>
  <div id="app" class="fmix-v">
    <div id="main" class="flex-con">
      <transition :name="transitionName">
        <keep-alive :include="include" :max="10">
          <router-view />
        </keep-alive>
      </transition>
    </div>
    <footer-nav v-show="footerShow" />
  </div>
</template>

<script>
import FooterNav from "@/components/FooterNav";

export default {
  name: "App",
  components: {
    FooterNav,
  },
  data() {
    return {
      footerShow: false,
      include: [],
      transitionName: "slide-left",
    };
  },
  watch: {
    $route(to, from) {
      const { footer, keepAlive, transitionName } = to.meta;
      if (["fade", "none"].indexOf(transitionName) == -1) {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
      } else {
        this.transitionName = transitionName;
      }

      this.footerShow = footer;

      if (keepAlive && !this.include.includes(to.name)) {
        this.include.push(to.name);
      }
    },
  },
  created() {
    this.$store.commit("setSafeArea");
  },
};
</script>

<style>
#app {
  height: 100vh;
  position: relative;
}
#main {
  position: relative;
  overflow-y: hidden;
}
.container {
  height: 100%;
  overflow-y: scroll;
}

.fade-enter-active,
.fade-leave-active,
.slide-left-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100vw);
}
</style>

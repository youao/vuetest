<template>
  <div id="app" class="fmix-v">
    <div id="main" class="flex-con">
      <keep-alive :include="include" :max="10">
        <router-view />
      </keep-alive>
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
    };
  },
  watch: {
    $route(to) {
      const { footer, keepAlive } = to.meta;

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
</style>

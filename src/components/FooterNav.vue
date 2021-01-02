<template>
  <div class="footer font-weak fmix-align-sa">
    <icon-item
      v-for="(item, index) in navs"
      :key="index"
      :icon="item.icon"
      :title="item.title"
      :cls="item.path == active ? 'font-theme' : ''"
      :style="{ 'padding-bottom': safeAreaBottom + 'px' }"
      @icon-item-tap="tapIcon(index)"
    />
  </div>
</template>

<script>
const navs = [
  {
    path: "/",
    title: "首页",
    icon: "&#xe925;",
  },
  {
    path: "/user",
    title: "个人中心",
    icon: "&#xe920;",
  },
];

import IconItem from "@/components/IconItem";

export default {
  name: "FooterNav",
  components: {
    IconItem,
  },
  data() {
    return {
      active: "",
      navs,
      safeAreaBottom: 0,
    };
  },
  watch: {
    $route(to, from) {
      this.active = to.path;
    },
  },
  created() {
    let sa = this.$store.state.safeArea;
    this.safeAreaBottom = sa.bottom;
  },
  methods: {
    tapIcon(e) {
      let url = this.navs[e].path;
      url && this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.footer {
  height: 5rem;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  background: #fff;
}
</style>

<template>
  <div>
    <div class="jt">
      <i class="iconfont">&#xe607;</i>
    </div>
    <div class="txt">
      <p>1. 点击右上角按钮 <i class="iconfont">&#xe8bf;</i></p>
      <p>2. 选择在浏览器中打开</p>
    </div>
  </div>
</template>

<script>
import { isWeixin } from "@/utils";
export default {
  name: "WeixinJump",
  data() {
    return {
      url: "",
      is_wx: isWeixin(),
    };
  },
  mounted() {
    this.url = this.$route.query.url || "/";
    !this.is_wx && (window.location.href = this.url);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.jt {
  text-align: right;
  font-size: 10rem;
  padding-right: 2rem;
}
.txt {
  margin-left: 10rem;
  font-size: 1.6rem;
  i.iconfont {
    font-size: 2.4rem;
  }
}
</style>

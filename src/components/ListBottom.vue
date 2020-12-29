<template>
  <div>
    <skeleton-goods v-show="!finished && !size" />
    <van-loading
      v-show="loading && size"
      :class="['fmix-center']"
      :style="{ height: '4rem' }"
      size="24"
      color="#42b983"
    />
    <van-empty v-show="finished && !size" />
    <p v-show="finished && size" class="underline font-gray">到底了哦~</p>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading, Empty } from "vant";
Vue.use(Loading);
Vue.use(Empty);

import SkeletonGoods from "@/components/skeleton/SkeletonGoods";

export default {
  name: "ListBottom",
  components: {
    SkeletonGoods,
  },
  props: {
    size: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.underline {
  padding: 0.1rem;
  text-align: center;
}
</style>

<template>
  <div class="view fmix-align-sb flex-linefeed">
    <div class="goods" v-for="n in size" :key="n">
      <skeleton-con class="skeleton-img" />
      <div class="info">
        <skeleton-con class="skeleton-row" />
        <skeleton-con class="skeleton-row half" />
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonCon from "@/components/SkeletonCon";
export default {
  name: "SkeletonGoods",
  components: {
    SkeletonCon,
  },
  props: {
    size: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.view {
  padding: 2vw;
}
.goods {
  width: 47vw;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2vw;
}
.skeleton-img {
  height: 47vw;
}
.info {
  padding: 1rem;
}
.skeleton-row {
  width: 80%;
  margin-bottom: 2vw;
}
.skeleton-row.half {
  width: 40%;
}
</style>

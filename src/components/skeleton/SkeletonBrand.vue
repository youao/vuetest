<template>
  <div>
    <div class="brand-box" v-for="n in size" :key="n">
      <div class="fmix-align" style="margin-bottom: 0.6rem">
        <skeleton-con class="skeleton-logo" />
        <div class="flex-con">
          <skeleton-con class="skeleton-row half" style="margin-bottom: 0.6rem" />
          <skeleton-con class="skeleton-row" />
        </div>
      </div>
      <div class="flex-wrap">
        <div class="flex-con" v-for="i in sizeG" :key="i">
          <skeleton-con class="skeleton-img" style="margin-bottom: 0.6rem" />
          <skeleton-con class="skeleton-row" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonCon from "@/components/SkeletonCon";
export default {
  name: "SkeletonBrand",
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
    return {
      sizeG: 3
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.brand-box {
  margin: 0.6rem;
  padding: 1rem;
  background: $white;
  border-radius: 1rem;
  overflow: hidden;
}
.skeleton-logo {
  width: 8rem;
  height: 4rem;
  margin-right: 1rem;
}
.info {
  padding: 1rem;
}
.skeleton-row {
  width: 80%;
  height: 1.6rem;
}
.skeleton-row.half {
  width: 40%;
}
.skeleton-img {
  width: 11rem;
  height: 11rem;
}
</style>

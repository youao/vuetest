<template>
  <hdk-con v-if="type == 'hdk'" :item="item" :colW="colW" />
</template>

<script>
import HdkCon from "@/components/goods/HdkCon.vue";
export default {
  name: "GoodsCon",
  components: {
    HdkCon,
  },
  props: {
    type: String,
    item: Object,
    colW: Number
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>

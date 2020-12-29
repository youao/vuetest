<template>
  <hdk-con v-if="type == 'hdk'" :item="item" />
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>

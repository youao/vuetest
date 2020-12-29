<template>
  <div class="container">
    <water-fall :list="list" :contpl="'hdk'" />
    <list-bottom :loading="loading" :finished="finished" :size="list.length" />
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);

import { getHdkList } from "@/api/hdk";
import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import { evScrollout } from "@/utils";

export default {
  name: "Home",
  components: {
    WaterFall,
    ListBottom
  },
  data() {
    return {
      list: [],
      params: {
        page: 1,
        pageSize: 10,
        cache: 900,
      },
      loading: false,
      finished: false
    };
  },
  mounted: function () {
    this.getList();
    evScrollout({
      element: ".container",
      callback: this.getList,
    });
  },
  methods: {
    getList() {
      if (this.loading || this.finished) return;
      this.loading = true;
      getHdkList(this.params).then((res) => {
        let data = res.data || [];
        this.list.push.apply(this.list, data);
        this.loading = false;
        this.finished = data.length < this.params.pageSize;
        this.params.page++;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  overflow-y: scroll;
}
</style>

<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <goods-water-fall-list :list="list" :col="col" />
    <van-loading
      v-show="loading && list.length"
      :class="['fmix-center']"
      :style="{ height: '4rem' }"
      size="24"
      color="#42b983"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);

import { getHdkList } from "@/api/hdk";
import GoodsWaterFallList from "@/components/GoodsWaterFallList";
import { evScrollout } from "@/utils";

export default {
  name: "Home",
  components: {
    GoodsWaterFallList,
  },
  data() {
    return {
      list: [],
      col: 2,
      params: {
        page: 1,
        pageSize: 10,
        tmall: 1,
        cache: 900,
      },
      loading: false,
      finished: false,
      msg: 'hello'
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
        console.log(JSON.stringify(res))
        this.msg = JSON.stringify(res)
        let data = res.data || [];
        this.list.push.apply(this.list, data);
        this.loading = false;
        this.finished = data.length < this.params.pageSize;
        this.params.page++;
      }).catch(err=>{
        console.log(err)
        console.log(JSON.stringify(err))
        this.msg = JSON.stringify(err)

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
h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
.icon-beian {
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
}
.navs {
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}
.nav-con {
  padding: 0.8rem;
  margin-right: 0.8rem;
  border-radius: 1rem;
  background: #fff;
  font-size: 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.nav-con:last-of-type {
  margin-right: 0;
}
.nav-con-img {
  width: 2rem;
  margin-right: 0.4rem;
}
</style>

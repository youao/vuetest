<template>
  <div class="container">
    <div class="search fmix-align">
      <router-link class="search-bar" to="/goods/search">
        <i class="iconfont" style="margin-right: 0.4rem; font-size: 1.2em"
          >&#xe8ee;</i
        >
        <span>搜搜/领券，购物更省钱</span>
      </router-link>
    </div>
    <van-tabs v-model="active" sticky animated swipeable @change="tabChange">
      <van-tab
        v-for="(item, index) in cateList"
        :key="index"
        :title="item.title"
      >
        <div v-if="active == 0">
          <div v-if="adnavs.length" class="navs flex-wrap">
            <div
              class="nav fmix-center-v"
              v-for="(item, index) in adnavs"
              :key="index"
              @click="$url(item.url)"
            >
              <img :src="item.img" alt="" />
              <p>{{ item.title }}</p>
            </div>
          </div>
          <van-swipe
            v-if="banners.length"
            :autoplay="5000"
            indicator-color="white"
            class="banner"
          >
            <van-swipe-item v-for="(item, index) in banners" :key="index">
              <img :src="item.img" @click="$url(item.url)" />
            </van-swipe-item>
          </van-swipe>
        </div>

        <water-fall :list="item.list" contpl="hdk" />
      </van-tab>
    </van-tabs>
    <list-bottom :loading="loading" :finished="finished" :size="list.length" />
  </div>
</template>

<script>
import { getHdkList } from "@/api/hdk";
import { getHome } from "@/api/site";

import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import { evScrollout } from "@/utils";
import { cateList } from "@/libs/cate";

export default {
  name: "Home",
  components: {
    WaterFall,
    ListBottom,
  },
  data() {
    return {
      active: 0,
      cateList: cateList(),
      banners: [],
      adnavs: [],
    };
  },
  computed: {
    activeItem: {
      get: function () {
        return this.cateList[this.active];
      },
      set: function (val) {
        this.$set(this.cateList, this.active, val);
      },
    },
    params() {
      let { cid, page, pageSize } = this.activeItem;
      return {
        method: "sales_list",
        cid,
        page,
        pageSize,
      };
    },
    list: {
      get: function () {
        return this.activeItem.list;
      },
      set: function (val) {
        this.activeItem.list = val;
      },
    },
    loading: {
      get: function () {
        return this.activeItem.loading;
      },
      set: function (val) {
        this.activeItem.loading = val;
      },
    },
    finished: {
      get: function () {
        return this.activeItem.finished;
      },
      set: function (val) {
        this.activeItem.finished = val;
      },
    },
  },
  mounted() {
    this.getHomeData();
    this.getList();
    evScrollout({
      element: ".container",
      callback: () => {
        this.getList();
      },
    });
  },
  methods: {
    getHomeData() {
      getHome().then((res) => {
        const { banner, nav } = res.data;
        this.banners = banner;
        this.adnavs = nav;
      });
    },
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
    tabChange() {
      let { page, finished } = this.activeItem;
      if (page == 1 && !finished) {
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  margin: 0.6rem;
  border-radius: 1rem;
}
.navs {
  padding: 1rem;
  background: #fff;
}
.nav {
  width: 20%;
  img {
    width: 3.6rem;
    height: 3.6rem;
  }
  p {
    color: #333;
    font-size: 1rem;
  }
}
.search {
  height: 4rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0 1rem;
  .search-bar {
    width: 100%;
    line-height: 3rem;
    text-align: center;
    background: #f5f5f5;
    border-radius: 0.8rem;
    color: #999;
  }
}
</style>

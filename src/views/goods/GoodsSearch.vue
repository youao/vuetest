<template>
  <div class="container">
    <van-sticky>
    <div class="search fmix-align">
      <div class="search-bar fmix-align">
        <i class="iconfont" style="margin: 0 0.4rem 0 1rem; font-size: 1.2em"
          >&#xe8ee;</i
        >
        <van-field
          class="flex-con"
          type="text"
          placeholder="搜搜/领券，购物更省钱"
          style="color: #333"
          v-model="params.keyword"
          clearable
        />
      </div>
    </div>
    </van-sticky>
    <div v-show="params.keyword">
      <water-fall :list="list" contpl="hdk" />
      <list-bottom
        :loading="loading"
        :finished="finished"
        :size="list.length"
      />
    </div>
    <div v-show="!params.keyword" class="logs">
      <div class="block">
        <div class="title">全网热搜</div>
        <div class="tips">
          <span
            v-for="(item, index) in logsHot"
            :key="index"
            @click="toSearch(item)"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHdkSearch, getHdkHotKey } from "@/api/hdk";
import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import { evScrollout } from "@/utils";
import { Field, Sticky } from 'vant';

export default {
  name: "GoodsSearch",
  components: {
    WaterFall,
    ListBottom,
  },
  data() {
    return {
      active: 0,
      list: [],
      params: {
        keyword: "",
        page: 1,
        pageSize: 10,
      },
      loading: false,
      finished: false,
      listShow: false,
      logsHot: [],
    };
  },
  mounted() {
    this.getHotKeys();
    this.toSearch();
    evScrollout({
      element: ".container",
      callback: () => {
        this.params.keyword && this.getList();
      },
    });
  },
  methods: {
    toSearch(k) {
      if (k) {
        this.params.keyword = k;
      }
      this.params.keyword && this.getList(1);
    },
    getHotKeys() {
      getHdkHotKey().then((res) => {
        this.logsHot = res.data.map((item) => {
          return item.keyword;
        });
      });
    },
    getList(reload = 0) {
      if (reload == 1) {
        this.list = [];
        this.loading = false;
        this.finished = false;
        this.params.page = 1;
      }
      if (this.loading || this.finished) return;
      this.loading = true;
      getHdkSearch(this.params).then((res) => {
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
.block {
  padding: 1rem;
  background: #fff;
  .title {
    font-size: 1.2rem;
    color: #999;
  }
  .tips span {
    padding: 0.4rem 1rem;
    margin-right: 0.6rem;
    margin-top: 0.6rem;
    background: #f5f5f5;
    border-radius: 0.6rem;
    color: #666;
  }
}
</style>

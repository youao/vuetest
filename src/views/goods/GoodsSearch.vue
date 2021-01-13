<template>
  <div class="container" ref="container">
    <van-sticky>
      <div class="search fmix-align">
        <div class="search-bar flex-con fmix-align">
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
        <span class="font-big" style="margin-left: 1rem" @click="toSearch()"
          >搜索</span
        >
      </div>
      <div v-show="params.keyword" class="fmix-align-sa sx-bar">
        <span
          v-for="(item, index) in sx_nav"
          :key="index"
          :class="item.order == params.order ? 'active' : ''"
          @click="tapSXOrder(item.order)"
          >{{ item.name }}</span
        >
        <span class="fmix-align">
          含券
          <van-switch
            v-model="params.is_coupon"
            active-color="#e83b47"
            style="margin-left: 0.4rem"
            @change="couponSwitch"
          />
        </span>
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
      <div class="block">
        <div class="title fmix-align-sb">
          <span>历史搜索</span>
          <span @click="clearLogs()">
            <i class="iconfont">&#xe674;</i>清除
          </span>
        </div>
        <div class="tips">
          <span v-for="(item, index) in logsHistory" :key="index">
            <span @click="toSearch(item)">{{ item }}</span>
            <i
              class="iconfont font-gray-tint font-small"
              style="margin-left: 0.4rem"
              @click="delLog(index)"
              >&#xe6cc;</i
            >
          </span>
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
import { Field, Sticky } from "vant";
import { SearchHistory } from "@/libs/search";

const sh = new SearchHistory();

export default {
  name: "GoodsSearch",
  components: {
    WaterFall,
    ListBottom,
  },
  data() {
    return {
      active: 0,
      sx_nav: [
        {
          name: "综合",
          order: 0,
        },
        {
          name: "销量",
          order: 2,
        },
        {
          name: "价格",
          order: 4,
        },
      ],
      list: [],
      params: {
        keyword: "",
        order: 0,
        page: 1,
        pageSize: 10,
        is_coupon: true,
      },
      loading: false,
      finished: false,
      listShow: false,
      logsHot: [],
      logsHistory: sh.get(),
    };
  },
  watch: {
    "params.keyword"(newVal) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.toSearch(newVal);
      }, 500);
    },
  },
  mounted() {
    this.getHotKeys();
    this.toSearch();
    evScrollout({
      element: this.$refs.container,
      callback: () => {
        this.params.keyword && this.getList();
      },
    });
  },
  methods: {
    toSearch(k) {
      if (k) {
        this.params.keyword = k;
        this.logsHistory = sh.add(k);
      }
      this.params.keyword && this.getList(1);
    },
    tapSXOrder(order) {
      this.params.order = order;
      this.toSearch();
    },
    couponSwitch(e) {
      this.toSearch();
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
    delLog(index) {
      this.logsHistory = sh.del(index);
    },
    clearLogs() {
      this.logsHistory = sh.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
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
.sx-bar {
  height: 3rem;
  background: #fff;
  border-bottom: 1px solid #ddd;
  span {
    color: #666;
  }
  span.active {
    color: #333;
    font-weight: bold;
  }
}
.block {
  padding: 1rem;
  background: #fff;
  .title {
    font-size: 1.2rem;
    color: #999;
  }
  .tips > span {
    padding: 0.4rem 1rem;
    margin-right: 0.6rem;
    margin-top: 0.6rem;
    background: #f5f5f5;
    border-radius: 0.6rem;
    color: #666;
  }
}
</style>

<template>
  <div class="container">
    <div class="search fmix-align">
      <router-link class="search-bar" to="/goods/search">
        <i class="iconfont" style="margin-right: 0.4rem; font-size: 1.2em">&#xe8ee;</i>
        <span>搜搜/领券，购物更省钱</span>
      </router-link>
    </div>
    <van-tabs v-model="active" sticky animated swipeable @change="tabChange">
      <van-tab
        v-for="(item, index) in cateList"
        :key="index"
        :title="item.title"
      >
        <div v-if="active == 0 && adnavs.length" class="navs flex-wrap">
          <router-link
            class="nav fmix-center-v"
            v-for="(item, index) in adnavs"
            :key="index"
            :to="item.path"
          >
            <img :src="item.img" alt="" />
            <p>{{ item.title }}</p>
          </router-link>
        </div>
        <water-fall :list="item.list" contpl="hdk" />
      </van-tab>
    </van-tabs>
    <list-bottom :loading="loading" :finished="finished" :size="list.length" />
  </div>
</template>

<script>
import { getHdkList } from "@/api/hdk";
import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import { evScrollout } from "@/utils";
import { cates } from "@/libs/cate";

let cateList = cates.map((item, index) => {
  return {
    title: item,
    cid: index,
    page: 1,
    pageSize: 10,
    list: [],
    loading: false,
    finished: false,
  };
});

export default {
  name: "Home",
  components: {
    WaterFall,
    ListBottom,
  },
  data() {
    return {
      active: 0,
      cateList,
      adnavs: [
        {
          img:
            "https://funimg.pddpic.com/brand/jinbao/miaosha.png?imageView2/2/w/1300/q/80/format/webp",
          title: "限时秒杀",
          path: "/hdk/channel/15",
        },
        {
          img:
            "https://funimg.pddpic.com/brand/jinbao/qingcang.png?imageView2/2/w/1300/q/80/format/webp",
          title: "品牌特惠",
          path: "/hdk/channel/14",
        },
        {
          img:
            "https://funimg.pddpic.com/brand/jinbao/baokuan.png?imageView2/2/w/1300/q/80/format/webp",
          title: "爆款好货",
          path: "/hdk/channel/2",
        },
        {
          img:
            "https://funimg.pddpic.com/brand/jinbao/temai.png?imageView2/2/w/1300/q/80/format/webp",
          title: "9块9特卖",
          path: "/hdk/channel/9",
        },
        {
          img:
            "https://funimg.pddpic.com/brand/jinbao/lingquan.png?imageView2/2/w/1300/q/80/format/webp",
          title: "大额神券",
          path: "/hdk/channel/17",
        },
      ],
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
    this.getList();
    evScrollout({
      element: ".container",
      callback: () => {
        this.getList();
      },
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

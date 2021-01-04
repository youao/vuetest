<template>
  <div class="container">
    <div id="hourlist" v-if="list_type == 'hour'">
      <div class="hours flex-wrap">
        <div
          v-for="(item, index) in hourNav"
          :key="index"
          class="hour flex-con fmix-center-v"
          :class="active == index ? 'active' : ''"
          @click="hourClick(index)"
        >
          <p class="title">{{ item.title }}:00</p>
          <p class="sub">{{ item.sub }}</p>
        </div>
      </div>
      <van-tabs v-model="active" animated swipeable @change="hourChange">
        <van-tab
          v-for="(item, index) in cateList"
          :title="item.title"
          :key="index"
        >
          <water-fall :list="item.list" contpl="hdk" />
        </van-tab>
      </van-tabs>
    </div>
    <van-tabs
      v-else-if="list_type != 'hour' && cateList.length > 1"
      v-model="active"
      sticky
      animated
      swipeable
      @change="cateChange"
    >
      <van-tab
        v-for="(item, index) in cateList"
        :key="index"
        :title="item.title"
      >
        <hdk-brand-list v-if="list_type == 'brand'" :list="item.list" />
        <water-fall v-else :list="item.list" contpl="hdk" />
      </van-tab>
    </van-tabs>
    <water-fall v-else :list="list" contpl="hdk" />
    <list-bottom :loading="loading" :finished="finished" :size="list.length" :type="list_type" />
  </div>
</template>

<script>
import { getHdkList } from "@/api/hdk";
import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import HdkBrandList from "@/components/goods/HdkBrandList";
import { getObjItemByKey, evScrollout } from "@/utils";
import { hdkChannels } from "@/libs/channel";

export default {
  name: "HdkChannel",
  components: {
    WaterFall,
    ListBottom,
    HdkBrandList,
  },
  data() {
    return {
      channel: {},
      active: 0,
      cateList: [],
      hourNav: [
        {
          hour: 6,
          title: 0,
          sub: "加载中",
        },
        {
          hour: 7,
          title: 10,
          sub: "加载中",
        },
        {
          hour: 8,
          title: 12,
          sub: "加载中",
        },
        {
          hour: 9,
          title: 15,
          sub: "加载中",
        },
        {
          hour: 10,
          title: 20,
          sub: "加载中",
        },
      ],
      list_type: "",
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
      let { method, type } = this.channel;
      let hour = 0;
      if (this.isHour) {
        hour = this.hourNav[this.active].hour;
      }
      return {
        method,
        type,
        cid,
        page,
        pageSize,
        hour,
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
  created() {
    let { id } = this.$route.params;
    let channel = getObjItemByKey(hdkChannels, "id", id);
    if (!channel) return;
    const { title, cate } = channel;
    document.title = title;

    if (id == 15) {
      this.list_type = "hour";
      this.active = this.getActiveHour();
      this.setHourSub();
      this.cateList = this.getHourList();
    } else if (id == 14) {
      this.list_type = "brand";
      this.cateList = this.getCateList(cate);
    } else {
      this.cateList = this.getCateList(cate);
    }

    this.$set(this, "channel", channel);
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
    cateChange() {
      let { page, finished } = this.activeItem;
      if (page == 1 && !finished) {
        this.getList();
      }
    },
    getCateList(cate) {
      return cate
        ? cate.map((item, index) => {
            return {
              title: item,
              cid: index,
              page: 1,
              pageSize: 10,
              list: [],
              loading: false,
              finished: false,
            };
          })
        : [
            {
              page: 1,
              pageSize: 10,
              list: [],
              loading: false,
              finished: false,
            },
          ];
    },
    hourClick(e) {
      this.active = e;
      this.hourChange();
    },
    hourChange() {
      let { page, finished } = this.activeItem;
      if (page == 1 && !finished) {
        this.getList();
      }
    },
    getHourList() {
      return this.hourNav.map((item) => {
        return {
          title: "" + item.title,
          page: 1,
          pageSize: 10,
          list: [],
          loading: false,
          finished: false,
        };
      });
    },
    getActiveHour() {
      const h = new Date().getHours();
      const hours = this.hourNav;
      const ln = hours.length;
      for (let i = 1; i < ln; i++) {
        if (h < hours[i].title && h >= hours[i - 1].title) {
          return i - 1;
        }
      }
      return ln - 1;
    },
    setHourSub() {
      this.hourNav = this.hourNav.map((item, index) => {
        let sub = "";
        if (index < this.active) {
          sub = "已开抢";
        } else if (index == this.active) {
          sub = "疯抢中";
        } else {
          sub = "即将开抢";
        }
        item.sub = sub;
        return item;
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
.hour {
  color: #999;
  padding-bottom: 0.2rem;
  .title {
    font-size: 1.4rem;
    line-height: 1.6;
    padding-top: 0.4rem;
  }
  .sub {
    font-size: 1rem;
    line-height: 1.2;
  }

  &.active {
    .title {
      color: #333;
      font-weight: bold;
    }
    .sub {
      background: #d20a0a;
      color: #fff;
      padding: 0 0.4rem;
      border-radius: 1rem;
    }
  }
}
</style>

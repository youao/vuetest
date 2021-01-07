<template>
  <div class="container">
    <div id="hourlist" v-if="list_type == 'hour'">
      <van-sticky>
        <div class="hours flex-wrap">
          <div
            v-for="(item, index) in hourNav"
            :key="index"
            class="hour flex-con fmix-center-v"
            :class="active == index ? 'active' : ''"
            @click="hourClick(index)"
          >
            <p class="title">{{ item.title }}</p>
            <p class="sub">{{ item.sub || "加载中" }}</p>
          </div>
        </div>
      </van-sticky>
      <van-tabs v-model="active" animated swipeable @change="cateChange">
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
    <list-bottom
      :loading="loading"
      :finished="finished"
      :size="list.length"
      :type="list_type"
    />
  </div>
</template>

<script>
import { getHdkList } from "@/api/hdk";
import WaterFall from "@/components/WaterFall";
import ListBottom from "@/components/ListBottom";
import HdkBrandList from "@/components/goods/HdkBrandList";
import { getObjItemByKey, evScrollout } from "@/utils";
import { hdkChannels } from "@/libs/channel";
import { cates_hour, cateList, HourData } from "@/libs/cate";

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
      hourNav: cates_hour,
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
      if (this.list_type == "hour") {
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
    let { title, cate } = channel;
    document.title = title;

    if (id == 15) {
      this.list_type = "hour";
      let hd = new HourData();
      this.active = hd.active;
      this.hourNav = hd.cates;
      cate = hd.cates;
    } else if (id == 14) {
      this.list_type = "brand";
    }
    this.cateList = cateList(cate || 1, this.list_type);

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
    hourClick(e) {
      this.active = e;
      this.cateChange();
    },
  },
};
</script>

<style lang="scss" scoped>
.hours {
  background: #f5f5f5;
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

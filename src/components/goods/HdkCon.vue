<template>
  <div class="goods" @click="toHdkDetail(item.itemid)">
    <div class="goods-img" :style="{ height: colW + 'px' }">
      <van-image fit="contain" width="100%" lazy-load :src="item.itempic+'_300x300.jpg'" />
      <i v-if="item.videoid > 0" class="iconfont v-play">&#xe614;</i>
    </div>
    <div class="goods-info">
      <div class="goods-row" v-if="item.is_brand > 0">
        <span class="brand-box">
          <span class="brand">品牌</span>
          {{ item.sellernick }}
        </span>
      </div>
      <div class="goods-title ellipsis-2">
        <span v-if="item.shoptype == 'B'" class="iconfont tmall">&#xe799;</span>
        {{ item.itemshorttitle }}
      </div>
      <div class="goods-row font-red fmix-align-base">
        券后￥<span class="goods-priceval">{{ item.itemendprice }}</span>
        <div class="goods-quan-box" v-if="item.couponmoney">
          <span class="goods-quan-dot"></span>
          <div class="goods-quan">
            <span>{{ item.couponmoney }}元券</span>
          </div>
          <span class="goods-quan-dot right"></span>
        </div>
      </div>
      <div class="goods-row">
        <i v-if="item.activity_type == '淘抢购'" class="iconfont tqg"
          >&#xe608;</i
        >
        <i v-else-if="item.activity_type == '聚划算'" class="iconfont jhs"
          >&#xe609;</i
        >
        <span class="sale">{{ item.itemsale }}人已付款</span>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/goods.scss";
import { getWanNum } from "@/utils";
import Vue from "vue";
import { Image as VanImage, Lazyload } from "vant";
Vue.use(VanImage);
Vue.use(Lazyload);

export default {
  name: "HdkCon",
  props: {
    item: Object,
    colW: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {};
  },
  created() {
    this.item.itemsale = getWanNum(this.item.itemsale);
  },
  mounted() {},
  methods: {
    toHdkDetail(id) {
      this.$router.push("/hdk/detail/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
.brand-box {
  padding-right: 0.4rem;
  background: #fdf1dc;
  color: #b1977c;
  border-radius: 0.2rem;
  overflow: hidden;
}
.brand {
  height: 1.4rem;
  padding: 0 0.4rem;
  border-radius: 0.2rem;
  background: #202020;
  color: #fff;
  font-size: 1rem;
  line-height: 1.4rem;
}
</style>

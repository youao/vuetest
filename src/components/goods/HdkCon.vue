<template>
  <router-link :to="'/hdk/detail/' + item.itemid" class="goods">
    <div class="goods-img">
      <img :src="item.itempic" alt="" />
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
  </router-link>
</template>

<script>
import "@/assets/css/goods.scss";
import { getWanNum } from "@/utils";
export default {
  name: "HdkCon",
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  created() {
    this.item.itemsale = getWanNum(this.item.itemsale);
  },
  methods: {},
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

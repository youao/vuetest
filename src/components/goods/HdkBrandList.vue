<template>
  <div>
    <div class="brand-box" v-for="(item, index) in list" :key="index">
      <div class="fmix-align">
        <van-image
          class="logo"
          fit="contain"
          lazy-load
          :src="item.brand_logo"
        />
        <div>
          <span class="title">{{ item.fq_brand_name }}</span>
          <p class="ellipsis font-small font-gray">{{ item.introduce }}</p>
        </div>
      </div>
      <div class="goods-group flex-wrap">
        <router-link
          :to="'/hdk/detail/' + it.itemid"
          class="goods-con flex-con"
          v-for="(it, i) in item.item"
          :key="i"
        >
          <van-image :height="conH" fit="contain" lazy-load :src="it.itempic" />
          <p class="font-mini ellipsis">{{ it.itemshorttitle }}</p>
          <p class="font-red">
            <small class="font-mini">券后 ￥</small>{{ it.itemendprice }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload } from "vant";
Vue.use(VanImage);
Vue.use(Lazyload);

export default {
  name: "HdkBrandList",
  props: {
    list: Array,
  },
  data() {
    return {
      conH: "auto",
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.brand-box {
  margin: 0.6rem;
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: $white;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  .logo {
    width: auto;
    height: 4rem;
    margin-right: 0.8rem;
  }
  .title {
    font-weight: bold;
  }
  .goods-group {
    margin-top: 1rem;
  }
  .goods-con {
    margin-right: 0.6rem;
    text-align: center;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>

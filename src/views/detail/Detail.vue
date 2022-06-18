<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
          <detail-swiper :top-images='topImages'></detail-swiper>
          <detail-base-info :goods='goods'></detail-base-info>
          <detail-shop-info :shop='shop'></detail-shop-info>
          <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
          <detail-param-info :param-info='paramInfo'></detail-param-info>
        </scroll>
    </div>
</template>

<script>
import {getDetail,Goods,Shop,GoodsParam} from 'network/detail';

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'
export default {
    name:'Detail',
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll
    },
    created(){

        DetailShopInfo        // 1.保存传入的商品iid
        this.iid= this.$route.params.iid
        // 2.根据iid请求详情页数据
        getDetail(this.iid).then((res)=>{
            console.log(res);
            const date =  res.result 
            // 1.获取顶部的轮播数据
            this.topImages = date.itemInfo.topImages;
            // 2.获取商品数据
            this.goods = new Goods(date.itemInfo,date.columns,date.shopInfo.services);
            // 3.获取商家的详细信息
            this.shop = new Shop(date.shopInfo);
            // 4.获取商品细节
            this.detailInfo = date.detailInfo;
            // 5.获取商品详细信息
            this.paramInfo = new GoodsParam(date.itemParams.info,date.itemParams.rule)
        })
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
        }
    }
}
</script>
<style scoped>
.detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
}
</style>
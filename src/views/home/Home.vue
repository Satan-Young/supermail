<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div  slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']"  
            @tabClick="tabClick" 
            ref="tabControl1"
            class="tab-control"
            v-show="isTabFixed"
            ></tab-control>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']"  
            @tabClick="tabClick" 
            ref="tabControl2"
            :class="{fixed:isTabFixed}"
            ></tab-control>
            <goods-list :goods="showGoods" class="goods-list"></goods-list>
        </scroll>
        <!-- native修饰符：当我们需要监听一个组件的原生事件时，必须给对应的事件加上native修饰符 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
    

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from "./childComps/FeatureView";
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';

import {getHomeMultidata,getHomeGoods} from 'network/home';
import { debounce } from 'common/utils'

export default {
    name:'Home',
    components:{
        NavBar,
        TabControl,
        GoodsList,

        HomeSwiper,
        RecommendView,
        FeatureView,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        // 1.请求多个数据
        this.getHomeMultidata()
        // 请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
       
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('itemImageLoad',()=>{
            refresh()
        });
    },
    activated(){
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,1)
    },
    deactivated(){
        this.saveY = this.$refs.scroll.scroll.y
    },
    methods:{
        /**
         * 事件监听相关方法
         */

        tabClick(index){
           switch (index) {
               case 0:
                   this.currentType='pop'
                   break;
               case 1:
                   this.currentType='new'
                   break;
               case 2:
                   this.currentType='sell'
                   break;
               default:
                   break;
           }
           this.$refs.tabControl1.currentIndex = index
           this.$refs.tabControl2.currentIndex = index
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500)
        },
        contentScroll(position){
            // 判断backTop是否显示
            position.y = -position.y
            this.isShowBackTop = position.y>1000?true:false;
            // 决定tabControl是否吸顶
            this.isTabFixed = position.y>this.tabOffsetTop?true:false;
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
              // 下拉加载更多
            this.$refs.scroll.finishPullUp()
        },
        swiperImageLoad(){
             this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        /**
         * 网络请求相关方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                // 箭头函数的this会往上找，找到created函数里的this，就是当前组件
                 this.banners=res.data.banner.list;
                 this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
                // 把数组加到数组中
                this.goods[type].list.push(...res.data.list);
                // 每次请求完，页面+1
                this.goods[type].page += 1;

                
            });
        }
    },
}
</script>
<style scoped>
#home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9; */
}

.goods-list{
    margin-bottom: 49px;
}
.content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    right: 0px;
    left: 0px;
}
.tab-control{
    position: relative;
    top: -1px;
    z-index: 9;
}
</style>
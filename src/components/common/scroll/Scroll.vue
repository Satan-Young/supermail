<template>
    <div class="wrapper" ref="wrapper">
       <div class="content">
            <slot></slot>
       </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            // observeDOM:true
        });

        // 2.监听滚动区域
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        });
        
        // 3.监听下拉加载更多
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp',()=>{
                // console.log('加载更多1');
                this.$emit('pullingUp')
            })
        }
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
           this.scroll && this.scroll.refresh()
        },
    },
}
</script>
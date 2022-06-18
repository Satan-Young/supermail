<template>
    <div v-if="Object.keys(goods).length!==0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="(index) in goods.services.length" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name:'DetailBaseInfo',
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.base-info{
    margin-top:15px ;
    padding: 5px;
    color: #999;
     border-bottom: 3px solid rgba(100,100,100,.1);
}
.info-title {
    color: #222
}
.info-price {
    margin-top: 10px;
}
.info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
}
.info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}
.info-price .discount { 
    font-size: 13px;
    padding: 3px 6px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    /* 通过position上移 */
    position: relative;
    top: -8px;
}
.info-other{
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-service{
   line-height: 60px;
    display: flex;
    font-size: 13px;
    justify-content: space-between;
    color: #333;
}
.info-service img{
    width: 13px;
}
</style>
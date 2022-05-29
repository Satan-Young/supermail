<template>
    <div class="tab-bar-items" @click="itemClick">
        <slot v-if="isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :class="{active:!isActive}"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
      path:String
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)
      }
    },
    methods:{
      itemClick(){
       this.$router.replace(this.path)
      }
    }
}
</script>

<style scoped>
  .tab-bar-items{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-items img{
      width: 24px;
      height: 24px;
      margin-bottom: 0;
      vertical-align: middle;
      margin-top: 3px;
  }
  .active{
    color: red;
  }
</style>
<template>
    <div class="course-info ovh">
      <ul class="">
        <li class="title l mr5 poi " v-for="i in list" @click="checktab(i)" :class="{active:keys===i.name}">{{i.name}}</li>
      </ul>
    </div>
</template>
<script >
  export default{
    props:{
     list:{type:Array,default:[],required:true},
     keys:{type:String,default:'',required:true}
    },
    methods:{
     checktab(value){
      this.keys===value.name || this.$emit('clicked',value)
     }
    },
    mounted(){
    } 
 }
</script>

<style lang="scss" scoped>
  .course-info{
     $themebgc:rgba(22, 59, 101, 1); 
     background:#fff;
     background-size:100%;
     background-position:0 100%;
     .title{
      border: 1px solid rgba(22, 59, 101, 0.8); 
      background-color:#fff;
      color:$themebgc;  
      border-top-left-radius:6px;
      border-top-right-radius:6px;
      line-height:40px;
      padding:0 25px;
      &:hover{
           background-color:rgba(22, 59, 101, 1);
           color:#fff;
        }
         &:active{
           background-color:rgba(22, 59, 101, 0.8);
         } 
     }
     .active{
      background-color:$themebgc;
      color:#fff;
     }
     ul{
     }
  } 
</style>
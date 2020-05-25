<template>
  <div id="like" :class="like?'active':''" @click="change">
<span class="img"></span><span>{{count}}</span>

</div>
</template>

<script>
export default {
data(){
  return{
props:{
count:{
type: Number,
required: false,
},

like:{
type:Boolean,
required:true,
default:false
}
  },

methods : {
change:function () {
this.$emit('click');
}
}

}
</script>

<style>
#like {
width: 100px;
height: 30px;
line-height: 30px;
display: flex;
align-items:center;
justify-content:center;
font-size: 15px;
margin: 30px auto;
color: #42bd56;
border: 1px solid #42bd56;
}

#like .img{
margin-right: 4px;
width: 20px;
height: 20px;
background:url(https://img3.doubanio.com/f/talion/c689ab2369da387f2cb0d4da4a22614d7f048bf9/pics/card/ic_heart_green.svg) no-repeat;
}

#like.active{
color: #333;
border: 1px solid #bfbfbf;
}

#like.active .img{
background-image: url(https://img3.doubanio.com/f/talion/0129352875382ff0544020161709c2ae9b00c737/pics/card/ic_heart_red.svg);
}
</style>
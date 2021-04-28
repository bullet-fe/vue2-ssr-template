<template>
  <div>
    Home
    <ul>
      <li v-for="item in infoList" :key="item.id">
        <!-- <img :key="item.author.avatar_url" alt=""> -->
        {{ item.author.loginname }}-
        {{ item.title }}
        <!-- <p v-html="item.content"></p> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
  },
  computed:{
    ...mapState(['infoList'])
  },
  data() {
    return {
      // infoList: [],
    };
  },
  methods: {
    ...mapActions(['getList'])
  },
  // ssr生命周期
  serverPrefetch() {
   return  this.getList()
  },
  created(){
  }
};
</script>

<style lang="less"></style>

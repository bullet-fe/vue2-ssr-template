<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>client exchange</h2>
    <div>
      <input type="text" v-model="msg" />
    </div>
    <button @click="onClick">Add</button>
    <router-link to="/">Home</router-link>
    <router-link to="About">About</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello vue2-ssr-template !",
    };
  },
  metaInfo: {
    title: "vue项目",
    titleTemplate: "%s | My vue ssr",
  },
  methods: {
    onClick() {
      console.log(this.msg);
    },
  },
};
</script>

<style lang="less">
#app {
  margin: 0;
  padding: 40px;
  h2 {
    background-color: antiquewhite;
  }
}
</style>

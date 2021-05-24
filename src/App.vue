<template>
  <div id="app">
    <h1 class="title is-1">{{ msg }}</h1>
    <h2 class="title is-2">client exchange</h2>
    <div>
      <input class="input is-primary" type="text" v-model="msg" />
    </div>
    <button class="button is-primary" @click="onClick">Add</button>
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
    link: [
      {
        href: "https://cdn.staticfile.org/bulma/0.0.10/css/bulma.min.css",
        rel: 'stylesheet'
      },
    ],
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

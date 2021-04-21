<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>client exchange</h2>
    <div>
      <input type="text" v-model="msg" />
    </div>
    <button @click="onClick">Add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hello vue2-ssr-template !",
    };
  },
  methods: {
    onClick() {
      console.log(this.msg);
    },
  },
};
</script>

<style></style>

<template>
  <div>
    About page
    此页面额外加载了lodash
  </div>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "About",
    script: [
      {
        src: "https://cdn.staticfile.org/lodash.js/0.1.0/lodash.min.js",
        async: true,
        defer: true,
      },
    ],
  },
};
</script>

<style lang="less"></style>

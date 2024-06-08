<script>
/*
 * @description : Follow your developments and activities with algorithms
 * @author : Gokhan Katar
 * @github : https://github.com/gokhankatar
 * @x : https://twitter.com/gokhan_crypto/
 * @instagram :  https://www.instagram.com/katargokhan96/
 */

import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<template>
  <v-app :theme="$store.state.theme">
    <Navbar />
    <v-main class="mx-4 my-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
html {
  scrollbar-width: thin;
  scrollbar-color: #0a6056 #f1f1f1;
  scroll-behavior: smooth;
}
</style>

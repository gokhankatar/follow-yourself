<script>
/*
 * @description : Follow your developments and activities with algorithms
 * @author : Gokhan Katar
 * @github : https://github.com/gokhankatar
 * @x : https://twitter.com/gokhan_crypto/
 * @instagram :  https://www.instagram.com/katargokhan96/
 */

import gsap from "gsap";

export default {
  name: "NavbarVue",
  data() {
    return {
      drawer: true,
      rail: true,
      isSmallScreen: false,
      windowWidth: window.innerWidth,
      isShowText: false,
      isHiddenBtn: false,
    };
  },

  methods: {
    handleMenu() {
      this.rail = !this.rail;
      this.drawer = true;

      if (this.isSmallScreen && !this.rail) {
        this.isHiddenBtn = true;
      } else {
        this.isHiddenBtn = false;
      }
    },
    changeTheme() {
      this.$store.dispatch("switchTheme", "theme changed");
    },
    goToSourceCodes() {
      window.open("https://github.com/gokhankatar/improve-yourself", "_blank");
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  watch: {
    rail(val) {
      if (!val && this.isSmallScreen) {
        this.isShowText = true;
        this.$store.dispatch("titleShowChange", this.isShowText);
      } else {
        this.isShowText = false;
        this.$store.dispatch("titleShowChange", this.isShowText);
      }
    },
    windowWidth(val) {
      if (val <= 500) {
        this.isSmallScreen = true;
        if (!this.rail) {
          this.isHiddenBtn = true;
          this.$store.dispatch("titleShowChange", this.isSmallScreen);
        } else if (this.rail) {
          this.isHiddenBtn = false;
        }
      } else {
        this.isSmallScreen = false;
        this.$store.dispatch("titleShowChange", this.isSmallScreen);
        this.isHiddenBtn = false;
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);

    // gsap animations
    gsap.from(".nav-drawer", {
      y: -999999,
      duration: 2.8,
      ease: 'elastic'
    });
    gsap.to(".nav-drawer",{
      y: 0,
      duration: 2.8,
      ease: 'elastic'
    });
    gsap.from(".app-bar",{
      x: 999999,
      duration: 3,
      ease: 'elastic'
    });
    gsap.to(".app-bar", {
      x: 0,
      duration: 3,
      ease: 'elastic'
    });
  },
};
</script>

<template>
  <v-navigation-drawer
    :rail="rail"
    permanent
    v-model="drawer"
    class="nav-drawer text-teal-darken-2"
  >
    <v-list>
      <v-list-item
        prepend-icon="fas fa-home"
        :title="$t('home')"
        value="home"
        router
        to="/"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("home") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-layer-group"
        :title="$t('dashboard')"
        value="dashboard"
        router
        to="/dashboard"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("dashboard") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-briefcase"
        :title="$t('my-projects')"
        value="projects"
        router
        to="/projects"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("projects") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-sack-dollar"
        :title="$t('my-investments')"
        value="investments"
        router
        to="/investments"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("investments") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-book"
        :title="$t('my-books')"
        value="books"
        router
        to="/books"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("books") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-tv"
        :title="$t('my-movies')"
        value="movies"
        router
        to="/movies"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("movies") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="fa-solid fa-gamepad"
        :title="$t('my-games')"
        value="games"
        router
        to="/games"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("games") }}
        </v-tooltip>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item
        :prepend-icon="
          $store.state.theme == 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
        "
        :title="$store.state.theme == 'dark' ? $t('dark-theme') : $t('light-theme')"
        @click.stop="changeTheme"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("change-theme") }}
        </v-tooltip>
      </v-list-item>
      <v-list-item
        @click="drawer = false"
        v-if="rail"
        prepend-icon="fa-solid fa-circle-chevron-left"
      >
        <v-tooltip activator="parent" location="end">
          {{ $t("hide-bar") }}
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar elevation="2" class="app-bar">
    <template v-slot:prepend>
      <v-app-bar-nav-icon color="teal-darken-2" @click="handleMenu" />
    </template>

    <v-app-bar-title class="d-none d-sm-flex text-uppercase text-teal-darken-2">
      <span class="font-weight-light">improve</span>
      <span class="font-weight-bold">yourself</span>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        :hidden="isHiddenBtn"
        @click="goToSourceCodes"
        variant="outlined"
        color="teal-darken-2"
      >
        <span class="d-none mx-2 d-md-flex">{{ $t("source-codes") }}</span>
        <v-icon icon="fa-solid fa-code" />
      </v-btn>
      <v-btn
        :hidden="isHiddenBtn"
        class="mx-2"
        id="menu-activator"
        variant="outlined"
        color="teal-darken-2"
      >
        <span class="d-none mx-2 d-md-flex">{{ $t("languages") }}</span>
        <v-icon icon="fa-solid fa-globe" />
      </v-btn>

      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item @click="$i18n.locale = 'tr'">
            <v-list-item-title class="cursor-pointer d-flex align-center justify-between">
              <img
                width="20"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png"
                alt="turkish"
              />
              <span>&nbsp; Tr-tr</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$i18n.locale = 'en'">
            <v-list-item-title class="cursor-pointer d-flex align-center justify-between">
              <img
                width="20"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png"
                alt="english"
              />
              <span>&nbsp; En-en</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$i18n.locale = 'ja'">
            <v-list-item-title class="cursor-pointer d-flex align-center justify-between">
              <img
                width="20"
                src="https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
                alt="english"
              />
              <span>&nbsp; JP-ja</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<style scoped></style>

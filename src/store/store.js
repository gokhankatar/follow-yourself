/*
 * @description : Follow your developments and activities with algorithms
 * @author : Gokhan Katar
 * @github : https://github.com/gokhankatar
 * @x : https://twitter.com/gokhan_crypto/
 * @instagram :  https://www.instagram.com/katargokhan96/
 */

import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import projectModule from "./projectModule";
import bookModule from "./bookModule";
import gameModule from "./gameModule";
import movieModule from "./movieModule";
import investmentModule from "./investmentModule";

const vueLocal = new VuexPersist({
  storage: window.localStorage,
});

const store = createStore({
  state() {
    return {
      theme: "light",
      isShowTitle: false,
    };
  },
  getters: {},

  mutations: {
    switchMode(state, payload) {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
      console.log(payload);
    },
    switchShowTitle(state, payload) {
      if (payload === true) {
        state.isShowTitle = true;
      } else if (payload === false) {
        state.isShowTitle = false;
      }
    },
  },

  actions: {
    switchTheme(state, payload) {
      state.commit("switchMode", payload);
    },
    titleShowChange(state, payload) {
      state.commit("switchShowTitle", payload);
    },
  },

  plugins: [vueLocal.plugin],

  modules: {
    projects: projectModule,
    books: bookModule,
    movies: movieModule,
    games: gameModule,
    investments: investmentModule,
  },
});

export default store;

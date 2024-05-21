import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import projectModule from "./projectModule";
import bookModule from "./bookModule";
import gameModule from "./gameModule";
import movieModule from "./movieModule";
import investmentModule from "./investmentModule";

const vueLocal = new VuexPersist({
  storage: window.storage,
});

const store = createStore({
  state() {
    return {
      theme: "light",
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
  },

  actions: {
    switchTheme(state, payload) {
      state.commit("switchMode", payload);
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

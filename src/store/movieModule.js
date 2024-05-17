const movieModule = {
  state() {
    return {
      moviesList: [],
    };
  },
  getters: {
    getWatchedMovies(state) {
      return state.moviesList.filter((movie) => movie.status === "watched").length;
    },
    favoriteMovieGenre(state) {
      let totalGenres = [];

      state.moviesList.map(movie => {
        if (movie.status === 'watched') {
          totalGenres.push(movie.genre)
        }
      });

      // find favorite genre
      const genresArray = totalGenres.toString().split(',');

      const mostFrequentGenre = genresArray.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        if (!acc.mostFrequent || acc[curr] > acc[acc.mostFrequent]) {
          acc.mostFrequent = curr;
        }
        return acc;
      }, {}).mostFrequent;
      
      return mostFrequentGenre;
    }
  },
  mutations: {
    pushMovie(state, payload) {
      state.moviesList.push(payload);
    },

    changeMovieStatus(state, payload) {
      if (state.moviesList[payload].status === "will watch") {
        state.moviesList[payload].status = "watched";
      } else {
        state.moviesList[payload].status = "will watch";
      }
    },

    changeMovieInfo(state, payload) {
      state.moviesList[payload.changedItemIndex].name = payload.changedItemName;
      state.moviesList[payload.changedItemIndex].genre =
        payload.changedItemGenre;
      state.moviesList[payload.changedItemIndex].status =
        payload.changedItemStatus;
    },

    deleteMovie(state, payload) {
      state.moviesList.splice(payload, 1);
    },
    selectAllMovie(state) {
      if (state.moviesList.every(item => item.isSelected)) {
        state.moviesList.forEach(item => item.isSelected = false);
      } else {
        state.moviesList.forEach(item => item.isSelected = false);
      }
    },
    multipleDeleteMovie(state) {
      state.moviesList.map(item => {
        if (item.isSelected) {
          state.moviesList = state.moviesList.filter(movie => movie !== item);
        }
      })
    },
    deleteAllMovie(state) {
      state.moviesList = [];
    },
    multipleWillWatchMovie(state) {
      state.moviesList.map(item => {
        if (item.isSelected) {
          item.status = 'will watch'
        }
      })
    },
    allWillWatchMovie(state) {
      state.moviesList.forEach(item => {
        item.status = 'will watch'
      });
    },
    multipleWatchedMovie(state) {
      state.moviesList.map(item => {
        if (item.isSelected) {
          item.status = 'watched'
        }
      })
    },
    allWatchedMovie(state) {
      state.moviesList.forEach(item => {
        item.status = 'watched'
      });
    },
  },
  actions: {
    addMovie(state, payload) {
      state.commit("pushMovie", payload);
    },
    switchMovieStatus(state, payload) {
      state.commit("changeMovieStatus", payload);
    },
    switchMovieInfo(state, payload) {
      state.commit("changeMovieInfo", payload);
    },
    removeMovie(state, payload) {
      state.commit("deleteMovie", payload);
    },
    selectAllMovies(state, payload) {
      state.commit('selectAllMovie', payload)
    },
    multipleRemoveMovie(state, payload) {
      state.commit("multipleDeleteMovie", payload);
    },
    removeAllMovie(state, payload) {
      state.commit("deleteAllMovie", payload);
    },
    setWillWatchMovie(state, payload) {
      state.commit("multipleWillWatchMovie", payload);
    },
    setAllWillWatchMovie(state, payload) {
      state.commit("allWillWatchMovie", payload);
    },
    setWatchedMovie(state, payload) {
      state.commit("multipleWatchedMovie", payload);
    },
    setAllWatchedMovie(state, payload) {
      state.commit("allWatchedMovie", payload);
    },
  },
};

export default movieModule;

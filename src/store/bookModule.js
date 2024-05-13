const bookModule = {
  state() {
    return {
      booksList: [],
    };
  },
  getters: {},
  mutations: {
    pushBook(state, payload) {
      state.booksList.push(payload);
    },
    changeBookStatus(state, payload) {
      if (state.booksList[payload].status === "will read") {
        state.booksList[payload].status = "readed";
      } else {
        state.booksList[payload].status = "will read";
      }
    },
    changeBookInfo(state, payload) {
      state.booksList[payload.changedItemIndex].name = payload.changedItemName;
      state.booksList[payload.changedItemIndex].author =
        payload.changedItemAuthor;
      state.booksList[payload.changedItemIndex].pages =
        payload.changedItemPages;
      state.booksList[payload.changedItemIndex].status =
        payload.changedItemStatus;
    },
    deleteBook(state, payload) {
      state.booksList.splice(payload, 1);
    },
    selectAllBook(state) {
      if (state.booksList.every(item => item.isSelected)) {
        state.booksList.forEach(item => item.isSelected = false);
      } else {
        state.booksList.forEach(item => item.isSelected = false);
      }
    },
    multipleDeleteBook(state) {
      state.booksList.map(item => {
        if (item.isSelected) {
          state.booksList = state.booksList.filter(book => book !== item);
        }
      })
    },
    deleteAllBook(state) {
      state.booksList = [];
    },
    multipleWillReadBook(state) {
      state.booksList.map(item => {
        if (item.isSelected) {
          item.status = 'will read'
        }
      })
    },
    allWillReadBook(state) {
      state.booksList.forEach(item => {
        item.status = 'will read'
      });
    },
    multipleReadedBook(state) {
      state.booksList.map(item => {
        if (item.isSelected) {
          item.status = 'readed'
        }
      })
    },
    allReadedBook(state) {
      state.booksList.forEach(item => {
        item.status = 'readed'
      });
    },
  },
  actions: {
    addBook(state, payload) {
      state.commit("pushBook", payload);
    },
    switchBookStatus(state, payload) {
      state.commit("changeBookStatus", payload);
    },
    switchBookInfo(state, payload) {
      state.commit("changeBookInfo", payload);
    },
    removeBook(state, payload) {
      state.commit("deleteBook", payload);
    },
    selectAllBooks(state, payload) {
      state.commit('selectAllBook', payload)
    },
    multipleRemoveBook(state, payload) {
      state.commit("multipleDeleteBook", payload);
    },
    removeAllBook(state, payload) {
      state.commit("deleteAllBook", payload);
    },
    setWillReadBook(state, payload) {
      state.commit("multipleWillReadBook", payload);
    },
    setAllWillReadBook(state, payload) {
      state.commit("allWillReadBook", payload);
    },
    setReadedBook(state, payload) {
      state.commit("multipleReadedBook", payload);
    },
    setAllReadedBook(state, payload) {
      state.commit("allReadedBook", payload);
    },
  },
};

export default bookModule;

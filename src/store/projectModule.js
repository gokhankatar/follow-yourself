const projectModule = {
  state() {
    return {
      projectsList: [],
    };
  },

  getters: {
    getFinishedProjects(state) {
      return state.projectsList.filter(
        (project) => project.status === "finished"
      ).length;
    },

    getOngoingProjects(state) {
      return state.projectsList.filter(
        (project) => project.status === "ongoing"
      ).length;
    },
  },

  mutations: {
    pushProject(state, payload) {
      state.projectsList.push(payload);
    },
    changeProjectStatus(state, payload) {
      if (state.projectsList[payload].status === "ongoing") {
        state.projectsList[payload].status = "finished";
      } else {
        state.projectsList[payload].status = "ongoing";
      }
    },
    changeProjectInfo(state, payload) {
      state.projectsList[payload.changedItemIndex].name =
        payload.changedItemName;
      state.projectsList[payload.changedItemIndex].status =
        payload.changedItemStatus;
    },
    deleteProject(state, payload) {
      state.projectsList.splice(payload, 1);
    },
    selectAllProject(state) {
      if (state.projectsList.every((item) => item.isSelected)) {
        state.projectsList.forEach((item) => (item.isSelected = false));
      } else {
        state.projectsList.forEach((item) => (item.isSelected = false));
      }
    },
    multipleDeleteProject(state) {
      state.projectsList.map((item) => {
        if (item.isSelected) {
          state.projectsList = state.projectsList.filter(
            (project) => project !== item
          );
        }
      });
    },
    deleteAllProject(state) {
      state.projectsList = [];
    },
    multipleOngoingProject(state) {
      state.projectsList.map((item) => {
        if (item.isSelected) {
          item.status = "ongoing";
        }
      });
    },
    allOngoingProject(state) {
      state.projectsList.forEach((item) => {
        item.status = "ongoing";
      });
    },
    multipleFinishedProject(state) {
      state.projectsList.map((item) => {
        if (item.isSelected) {
          item.status = "finished";
        }
      });
    },
    allFinishedProject(state) {
      state.projectsList.forEach((item) => {
        item.status = "finished";
      });
    },
  },

  actions: {
    addProject(state, payload) {
      state.commit("pushProject", payload);
    },
    switchProjectStatus(state, payload) {
      state.commit("changeProjectStatus", payload);
    },
    switchProjectInfo(state, payload) {
      state.commit("changeProjectInfo", payload);
    },
    removeProject(state, payload) {
      state.commit("deleteProject", payload);
    },
    selectAllProjects(state, payload) {
      state.commit("selectAllProject", payload);
    },
    multipleRemoveProject(state, payload) {
      state.commit("multipleDeleteProject", payload);
    },
    removeAllProject(state, payload) {
      state.commit("deleteAllProject", payload);
    },
    setOngoingProject(state, payload) {
      state.commit("multipleOngoingProject", payload);
    },
    setAllOngoingProject(state, payload) {
      state.commit("allOngoingProject", payload);
    },
    setFinishedProject(state, payload) {
      state.commit("multipleFinishedProject", payload);
    },
    setAllFinishedProject(state, payload) {
      state.commit("allFinishedProject", payload);
    },
  },
};

export default projectModule;

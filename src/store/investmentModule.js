const investmentModule = {
    state() {
        return {
            investmentsList: [],
        };
    },

    getters: {},

    mutations: {
        pushInvestment(state, payload) {
            state.investmentsList.push(payload);
        },

        changeInvestmentStatus(state, payload) {
            if (state.investmentsList[payload].status === "bought") {
                state.investmentsList[payload].status = "sold";
            } else {
                state.investmentsList[payload].status = "bought";
            }
        },
    
        changeInvestmentInfo(state, payload) {
            state.investmentsList[payload.changedItemIndex].name = payload.changedItemName;
            state.investmentsList[payload.changedItemIndex].genre = payload.changedItemGenre;
            state.investmentsList[payload.changedItemIndex].amount = payload.changedItemAmount;
            state.investmentsList[payload.changedItemIndex].cost = payload.changedItemCost;
            state.investmentsList[payload.changedItemIndex].status = payload.changedItemStatus;
            state.investmentsList[payload.changedItemIndex].currency = payload.changedItemCurrency;
        },

        deleteInvestment(state, payload) {
            state.investmentsList.splice(payload, 1);
        },

        selectAllInvestment(state) {
            if (state.investmentsList.every(item => item.isSelected)) {
                state.investmentsList.forEach(item => item.isSelected = false);
            } else {
                state.investmentsList.forEach(item => item.isSelected = false);
            }
        },

        multipleDeleteInvestment(state) {
            state.investmentsList.map(item => {
                if (item.isSelected) {
                    state.investmentsList = state.investmentsList.filter(investment => investment !== item);
                }
            })
        },

        deleteAllInvestment(state) {
            state.investmentsList = [];
        },

        multipleBoughtInvestment(state) {
            state.investmentsList.map(item => {
                if (item.isSelected) {
                    item.status = 'bought'
                }
            })
        },

        allBoughtInvestment(state) {
            state.investmentsList.forEach(item => {
                item.status = 'bought'
            });
        },

        multipleSoldInvestment(state) {
            state.investmentsList.map(item => {
                if (item.isSelected) {
                    item.status = 'sold'
                }
            })
        },

        allSoldInvestment(state) {
            state.investmentsList.forEach(item => {
                item.status = 'sold'
            });
        },
    },

    actions: {
        addInvestment(state, payload) {
            state.commit("pushInvestment", payload);
        },

        switchInvestmentStatus(state, payload) {
            state.commit("changeInvestmentStatus", payload);
        },

        switchInvestmentInfo(state, payload) {
            state.commit("changeInvestmentInfo", payload);
        },

        removeInvestment(state, payload) {
            state.commit("deleteInvestment", payload);
        },

        selectAllInvestments(state, payload) {
            state.commit('selectAllInvestment', payload)
        },

        multipleRemoveInvestment(state, payload) {
            state.commit("multipleDeleteInvestment", payload);
        },

        removeAllInvestment(state, payload) {
            state.commit("deleteAllInvestment", payload);
        },

        setBoughtInvestment(state, payload) {
            state.commit("multipleBoughtInvestment", payload);
        },

        setAllBoughtInvestment(state, payload) {
            state.commit("allBoughtInvestment", payload);
        },

        setSoldInvestment(state, payload) {
            state.commit("multipleSoldInvestment", payload);
        },
        
        setAllSoldInvestment(state, payload) {
            state.commit("allSoldInvestment", payload);
        },
    },
};

export default investmentModule;

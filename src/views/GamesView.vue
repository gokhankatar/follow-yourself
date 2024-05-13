<template>

    <h1 class="text-h5 text-deep-purple">My Games</h1>

    <!-- Form -->

    <v-dialog v-model="isAddingGame" transition="dialog-bottom-transition" max-width="400">

        <div class="form-container pa-5">

            <v-form ref="gameForm" @submit.prevent="createGame">

                <v-text-field v-model="gameName" :rules="nameRules" class="text-white" color="#673AB7" label="Game Name"
                    variant="outlined" required />

                <v-autocomplete v-model="gamePlatform" :rules="[v => !!v || 'Platform is required!']"
                    :items="['Playstation', 'Mobile', 'Xbox', 'Nintendo', 'PC']" class="text-white mt-2" color="#673AB7"
                    chips item-color="#673AB7" label="Platform" variant="outlined" required />

                <v-autocomplete v-model="playStatus" :rules="[v => !!v || 'State is required!']"
                    :items="['playing', 'played',]" class="text-white mt-2" color="#673AB7" chips item-color="#673AB7"
                    label="Play Status" variant="outlined" required />

                <v-btn v-if="!isEditGame" class="mt-3 pa-2" color="success" size="medium" variant="outlined"
                    type="submit" block>
                    Create</v-btn>

                <v-btn v-if="isEditGame" @click="editGame(selectedItem)" class="mt-3 pa-2" color="primary" size="medium"
                    variant="outlined" block>
                    Save</v-btn>

                <v-btn v-if="isEditGame" @click="deleteItem(itemIndex)" class="mt-3 pa-2" color="error" size="medium"
                    variant="outlined" block>
                    Delete</v-btn>

                <v-btn @click="isAddingGame = false" class="mt-3 pa-2" color="warning" size="medium" variant="outlined"
                    block>
                    Cancel</v-btn>

            </v-form>

        </div>

    </v-dialog>

    <!-- If list is empty -->

    <v-container v-if="$store.state.games.gamesList.length == 0" class="d-flex flex-column justify-center align-center">

        <h3 class="text-uppercase header-3">
            You haven't added a game yet. Add now and start tracking your progress!
        </h3>

        <v-btn @click="isAddingGame = true" class="mt-5" variant="outlined" color="#673AB7" size="x-large">
            Create first Game
        </v-btn>

    </v-container>

    <!-- Lists -->

    <v-container 
    v-if="$store.state.games.gamesList.length > 0" 
    class="my-5">

        <v-card class="px-2 py-1 text-caption text-grey">

            <v-row class="d-flex justify-space-between">

                <v-col class="d-flex justify-start align-center" lg="1">
                    <v-icon @click="isEditMode = true" class="cursor-pointer" icon="fa-solid fa-pen-to-square"
                        color="#673AB7" />

                    <v-tooltip activator="parent" location="left">
                        Edit
                    </v-tooltip>

                </v-col>

                <v-col class="d-flex justify-start align-center" lg="5">
                    <span>Name</span>
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <span>Platform</span>
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <span>Date</span>
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <span>Status</span>
                </v-col>

            </v-row>

        </v-card>

        <!-- Edit Mode Start -->

        <v-card v-if="isEditMode" class="my-4 px-2 py-3 text-body-2 text-primary">

            <v-row class="d-flex justify-space-between px-2">

                <v-col class="d-flex justify-start align-center" lg="4">

                    <v-btn @click="selectAll" class="mx-2" prepend-icon="fa-solid fa-circle-check" variant="outlined"
                        size="small" color="#673AB7">
                        Select all
                    </v-btn>

                </v-col>

                <v-col class="d-flex justify-end align-center" lg="8">

                    <v-btn @click="setPlaying" class="mx-2" prepend-icon="fa-solid fa-dumbbell" variant="outlined"
                        size="small" color="warning">
                        Set playing
                    </v-btn>

                    <v-btn @click="setPlayed" prepend-icon="fa-solid fa-check" variant="outlined" size="small"
                        color="success">
                        Set played
                    </v-btn>

                    <v-btn @click="multipleDelete" class="mx-2" prepend-icon="fa-solid fa-trash" variant="outlined"
                        size="small" color="red-darken-3">
                        Delete
                    </v-btn>

                    <v-btn @click="cancelEditMode" prepend-icon="fa-solid fa-xmark" variant="outlined" size="small"
                        color="error">
                        Cancel
                    </v-btn>

                </v-col>

            </v-row>

        </v-card>

        <!-- Edit Mode End -->

        <v-card v-for="(item, index) of $store.state.games.gamesList" :key="index"
            :class="isSelectAll || item.isSelected ? 'selectedCard' : ''" id="card-game"
            class="mt-5 py-5 px-3 text-body-1 text-deep-purple cursor-pointer">

            <v-row class="d-flex justify-space-between">

                <v-spacer v-if="!isEditMode" />

                <v-col 
                v-if="isEditMode" 
                @click="selectCard(item)" 
                class="d-flex justify-start align-center"
                lg="1">

                    <v-icon class="cursor-pointer"
                        :icon="isSelectAll || item.isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"
                        :color="isSelectAll || item.isSelected ? '#673AB7' : 'blue-grey-darken-3'" />

                </v-col>

                <v-col @click="handleGame(item, index)" class="d-flex justify-start align-center" lg="5">
                    <v-tooltip activator="parent" location="top">
                        Edit/Delete
                    </v-tooltip>

                    <span>{{ item.name }}</span>

                </v-col>

                <v-col @click="handleGame(item, index)" class="d-flex justify-start align-center" lg="2">

                    <v-tooltip activator="parent" location="top">
                        Edit/Delete
                    </v-tooltip>

                    <span>{{ item.platform }}</span>

                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <span>{{ formattedDate }}</span>
                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <v-chip @click="toggleItemStatus(index)" :class="item.status == 'played' ? 'played' : 'playing'"
                        :prepend-icon="item.status == 'played' ? 'fa-solid fa-check' : 'fa-solid fa-dumbbell'"
                        :color="item.status == 'played' ? 'success' : 'warning'" class="cursor-pointer" size="small"
                        variant="outlined">

                        <v-tooltip activator="parent" location="top">
                            Change Status
                        </v-tooltip>

                        {{ item.status }}

                    </v-chip>

                </v-col>

            </v-row>

        </v-card>

        <v-row>

            <v-col class="my-5 d-flex justify-center">

                <v-btn @click="addGame" class="add-btn" size="x-large" color="deep-purple" variant="outlined">
                    Add Game
                </v-btn>

            </v-col>

        </v-row>

    </v-container>

    <!-- Notifications -->

    <v-snackbar v-model="snackbarAdded" timeout="2000" color="green-darken-3">

        <p class="message text-center">You added a game!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarUpdated" timeout="2000" color="indigo-darken-3">

        <p class="message text-center">You updated a game!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarDeleted" timeout="2000" color="red-accent-3">

        <p class="message text-center">You deleted a game!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarAllDeleted" timeout="2000" color="red-darken-3">

        <p class="message text-center">You deleted all your games!</p>

    </v-snackbar>

</template>

<script>
export default {
    name: 'GamesView',
    data() {
        return {
            gameName: '',
            gamePlatform: null,
            playStatus: 'playing',
            intervalId: null,
            currentDate: new Date(),
            isAddingGame: false,
            isEditGame: false,
            selectedItem: {},
            itemIndex: '',
            snackbarAdded: false,
            snackbarUpdated: false,
            snackbarDeleted: false,
            snackbarAllDeleted:false,
            isEditMode: false,
            isSelectAll: false,
            nameRules: [
                v => !!v || 'Game name is required',
                v => (v && v.length > 2) || 'Game name must be longer than 2 characters',
            ]
        }
    },
    methods: {
        async createGame() {
            let { valid } = await this.$refs.gameForm.validate();
            if (valid) {
                this.$store.dispatch('addGame', {
                    name: this.gameName,
                    platform: this.gamePlatform,
                    status: this.playStatus,
                });

                this.$refs.gameForm.reset();
                this.isAddingGame = false;
                this.snackbarAdded = true;
            }
        },

        toggleItemStatus(index) {
            this.$store.dispatch('switchGameStatus', index);
        },

        addGame() {
            this.isAddingGame = true;
            this.isEditGame = false;
            this.gameName = '';
            this.gamePlatform = null;
            this.playStatus = 'playing';
        },

        handleGame(item, index) {
            this.isAddingGame = true;
            this.isEditGame = true;
            this.gameName = item.name;
            this.gamePlatform = item.platform;
            this.playStatus = item.status;
            this.selectedItem = {
                changedItemName: item.name,
                changedItemPlatform: item.platform,
                changedItemStatus: item.status,
                changedItemIndex: index,
            };

            // for delete
            this.itemIndex = index;
        },

        async editGame(item) {
            let { valid } = await this.$refs.gameForm.validate();
            if (valid) {
                this.selectedItem.changedItemName = this.gameName;
                this.selectedItem.changedItemPlatform = this.gamePlatform;
                this.selectedItem.changedItemStatus = this.playStatus;
                this.$store.dispatch('switchGameInfo', item);

                this.isAddingGame = false;
                this.isEditGame = false;
                this.snackbarUpdated = true;
            }
        },

        deleteItem(itemIndex) {
            this.$store.dispatch('removeGame', itemIndex);
            this.snackbarDeleted = true;
            this.isAddingGame = false;
            this.isEditGame = false;
        },
        cancelEditMode() {
            this.isEditMode = false;
            this.isSelectAll = false;
        },
        selectCard(item) {

            if (item.isSelected) {
                item.isSelected = false;
            } else {
                item.isSelected = true;
            }
        },

        selectAll() {
            this.isSelectAll = !this.isSelectAll;
            this.$store.dispatch('selectAllGames');
        },

        multipleDelete() {
            if (this.isSelectAll) {
                this.$store.dispatch('removeAllGame');
                this.snackbarAllDeleted = true;
            } else {
                this.$store.dispatch('multipleRemoveGame');
            }
        },

        setPlaying() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllPlayingGame');
            } else {
                this.$store.dispatch('setPlayingGame');
            }
        },
        setPlayed() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllPlayedGame');
            } else {
                this.$store.dispatch('setPlayedGame');
            }
        }
    },
    mounted() {
        this.intervalId = setInterval(() => {
            this.currentDate = new Date();
        }, 1000);
    },
    computed: {
        formattedDate() {
            const day = String(this.currentDate.getDate()).padStart(2, '0');
            const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
            const year = this.currentDate.getFullYear();
            return `${day}.${month}.${year}`;
        }
    }
}
</script>

<style scoped>
/* #673AB7 */

#card-game {
    transition: all .2s ease;
}

#card-game:hover {
    box-shadow: 0 0 2rem #673AB7;
}

span.playing:hover {
    box-shadow: 0 0 1rem #D87B06;
    border: none;
}

span.played:hover {
    box-shadow: 0 0 1rem #449547;
    border: none;
}

.form-container {
    border: none;
    box-shadow: 0 0 2rem #673AB7;
    background: #1E293B;
}

.message {
    letter-spacing: 3px;
    font-size: .9rem;
}

.selectedCard {
    border-left: 1px solid #673AB7;
}
</style>
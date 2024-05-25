<template>

    <h1 class="text-h5 text-deep-orange">{{ $t('my-movies') }}</h1>

    <!-- Form -->

    <v-dialog v-model="isAddingMovie" transition="dialog-bottom-transition" max-width="400">

        <div class="form-container pa-5">

            <v-form ref="movieForm" @submit.prevent="createMovie">

                <v-text-field v-model="movieName" :rules="nameRules" class="text-white" color="#FF5722"
                    label="Movie Name" variant="outlined" required />

                <v-autocomplete v-model="movieGenre" :rules="[v => !!v || 'State is required!']"
                    :items="['Action', 'Adventure', 'Horror', 'Sci-Fi', 'Romantic', 'Dram', 'Comedy', 'Thriller', 'Detective', 'Western', 'Animation', 'History']"
                    class="text-white mt-2" color="#FF5722" chips item-color="#FF5722" label="Genre" multiple
                    variant="outlined" required />

                <v-autocomplete v-model="movieStatus" :rules="[v => !!v || 'State is required!']"
                    :items="['will watch', 'watched',]" class="text-white mt-2" color="#FF5722" chips
                    item-color="#FF5722" label="Watching Status" variant="outlined" required />

                <v-btn v-if="!isEditMovie" class="mt-3 pa-2" color="success" size="medium" variant="outlined"
                    type="submit" block>
                    {{ $t('create') }}</v-btn>

                <v-btn v-if="isEditMovie" @click="editMovie(selectedItem)" class="mt-3 pa-2" color="primary"
                    size="medium" variant="outlined" block>
                    {{ $t('save') }}</v-btn>

                <v-btn v-if="isEditMovie" @click="deleteItem(itemIndex)" class="mt-3 pa-2" color="error" size="medium"
                    variant="outlined" block>
                    {{ $t('delete') }}</v-btn>

                <v-btn @click="isAddingMovie = false" class="mt-3 pa-2" color="warning" size="medium" variant="outlined"
                    block>
                    {{ $t('cancel') }}</v-btn>

            </v-form>

        </div>

    </v-dialog>

    <!-- If list is empty -->

    <v-container v-if="$store.state.movies.moviesList.length == 0"
        class="d-flex flex-column justify-center align-center">

        <h3 class="text-subtitle-1 text-uppercase font-weight-bold text-md-h4">
            {{ $t('empty-message-movie') }}
        </h3>

        <v-btn @click="isAddingMovie = true" class="mt-5 d-flex justiy-center align-center w-100 w-sm-auto" variant="outlined" color="#FF5722">
            {{ $t('create-first-movie') }}
        </v-btn>

    </v-container>

    <!-- Lists -->

    <v-container v-if="$store.state.movies.moviesList.length > 0" class="my-5">

        <v-card v-if="!isEditMode" class="px-2 py-1 text-caption text-grey">

            <v-row class="d-flex justify-space-between">

                <v-col class="d-flex justify-start align-center" lg="1">
                    <v-icon @click="isEditMode = true" class="cursor-pointer" icon="fa-solid fa-pen-to-square"
                        color="#FF5722" />

                    <v-tooltip activator="parent" location="left">
                        {{ $t('edit') }}
                    </v-tooltip>

                </v-col>


                <v-col class="d-none d-sm-flex justify-start align-center" lg="5">
                    <span>{{ $t('name-movie') }}</span>
                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center">
                    <span>{{ $t('movie-genre') }}</span>
                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center">
                    <span>{{ $t('date') }}</span>
                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center">
                    <span>{{ $t('status') }}</span>
                </v-col>

            </v-row>

        </v-card>

        <!-- Edit Mode Start -->

        <v-card v-if="isEditMode" class="my-4 px-2 py-3 text-body-2 text-primary">

            <v-row class="d-flex justify-space-between px-2 flex-column flex-md-row">

                <v-col class="d-flex justify-start align-center" lg="4">

                    <v-btn @click="selectAll" class="mx-0 mx-md-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-circle-check" variant="outlined" color="#FF5722">
                        {{ $t('select-all') }}
                    </v-btn>

                </v-col>

                <v-col class="d-flex justify-end align-center flex-column flex-md-row" lg="8">

                    <v-btn @click="setWillWatch" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-dumbbell" variant="outlined" color="warning">
                        {{ $t('set-will-watch') }}
                    </v-btn>

                    <v-btn @click="setWatched" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-check" variant="outlined" color="success">
                        {{ $t('set-watched') }}
                    </v-btn>

                    <v-btn @click="multipleDelete" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-trash" variant="outlined" color="red-darken-3">
                        {{ $t('delete') }}
                    </v-btn>

                    <v-btn @click="cancelEditMode" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-xmark" variant="outlined" color="error">
                        {{ $t('cancel') }}
                    </v-btn>

                </v-col>

            </v-row>

        </v-card>

        <!-- Edit Mode End -->

        <v-card v-for="(item, index) of $store.state.movies.moviesList" :key="index"
            :class="isSelectAll || item.isSelected ? 'selectedCard' : ''" id="card-movie"
            class="mt-5 py-5 px-3 text-body-1 text-deep-orange cursor-pointer">

            <v-row class="d-flex flex-column flex-sm-row justify-space-between">

                <v-spacer v-if="!isEditMode" />

                <v-col v-if="isEditMode" @click="selectCard(item)" class="d-flex justify-start align-center" lg="1">

                    <v-icon class="cursor-pointer"
                        :icon="isSelectAll || item.isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"
                        :color="isSelectAll || item.isSelected ? '#FF5722' : 'blue-grey-darken-3'" />

                </v-col>

                <v-col @click="handleMovie(item, index)" class="d-flex justify-start align-center" lg="5">

                    <v-tooltip activator="parent" location="top">
                        {{ $t('edit') }}/{{ $t('delete') }}
                    </v-tooltip>

                    <span>{{ item.name }}</span>

                </v-col>

                <v-col @click="handleMovie(item, index)" class="d-flex justify-start align-center" lg="2">

                    <v-tooltip activator="parent" location="top">
                        {{ $t('edit') }}/{{ $t('delete') }}
                    </v-tooltip>

                    <span>
                        <ul class="d-flex" v-for="g of item.genre" :key="g">
                            <li class="d-flex my-1">{{ g }}</li>
                        </ul>
                    </span>

                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <span>{{ formattedDate }}</span>
                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <v-chip @click="toggleItemStatus(index)" :class="item.status == 'watched' ? 'watched' : 'willWatch'"
                        :prepend-icon="item.status == 'watched' ? 'fa-solid fa-check' : 'fa-solid fa-dumbbell'"
                        :color="item.status == 'watched' ? 'success' : 'warning'" class="cursor-pointer" size="small"
                        variant="outlined">

                        <v-tooltip activator="parent" location="top">
                            {{ $t('change-status') }}
                        </v-tooltip>

                        {{ item.status }}

                    </v-chip>

                </v-col>

            </v-row>

        </v-card>

        <v-row>

            <v-col class="my-5 d-flex justify-center">

                <v-btn @click="addMovie" class="add-btn" size="x-large" color="deep-orange" variant="outlined">
                    {{ $t('add-movie') }}</v-btn>

            </v-col>

        </v-row>

    </v-container>

    <!-- Notifications -->

    <v-snackbar v-model="snackbarAdded" timeout="2000" color="green-darken-3">

        <p class="message text-center">{{ $t('added-notification-movie') }}</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarUpdated" timeout="2000" color="indigo-darken-3">

        <p class="message text-center">{{ $t('updated-notification-movie') }}</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarDeleted" timeout="2000" color="red-accent-3">

        <p class="message text-center">{{ $t('deleted-notification-movie') }}</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarAllDeleted" timeout="2000" color="red-darken-3">

        <p class="message text-center">{{ $t('all-deleted-notification-movie') }}</p>

    </v-snackbar>

</template>

<script>
import soundOfCreated from '../assets/sounds/addCard.mp3';
import soundOfWatched from '../assets/sounds/watched.mp3';
import soundOfDeleted from '../assets/sounds/trashed.mp3';

export default {
    name: 'MoviesView',
    data() {
        return {
            movieName: null,
            movieGenre: null,
            movieStatus: null,
            intervalId: null,
            currentDate: new Date(),
            isAddingMovie: false,
            isEditMovie: false,
            selectedItem: {},
            itemIndex: '',
            snackbarAdded: false,
            snackbarUpdated: false,
            snackbarDeleted: false,
            snackbarAllDeleted: false,
            isEditMode: false,
            isSelectAll: false,
            nameRules: [
                v => !!v || 'Movie name is required!',
                v => (v && v.length >= 2) || 'Movie name must be longer than 1'
            ]
        }
    },

    methods: {
        async createMovie() {
            let { valid } = await this.$refs.movieForm.validate();
            if (valid) {
                this.$store.dispatch('addMovie', {
                    name: this.movieName,
                    genre: this.movieGenre,
                    status: this.movieStatus,
                });
                this.$refs.movieForm.reset();
                this.isAddingMovie = false;
                this.snackbarAdded = true;

                // created sound effect
                let createdSound = new Audio(soundOfCreated);
                createdSound.play();
            }
        },

        toggleItemStatus(index) {
            this.$store.dispatch('switchMovieStatus', index);

            if (this.$store.state.movies.moviesList[index].status == 'watched') {
                let watchedSound = new Audio(soundOfWatched);
                watchedSound.play();
            }
        },

        addMovie() {
            this.isAddingMovie = true;
            this.isEditMovie = false;
            this.movieName = null;
            this.movieGenre = null;
            this.movieStatus = null;
        },

        handleMovie(item, index) {
            this.isAddingMovie = true;
            this.isEditMovie = true;
            this.movieName = item.name;
            this.movieGenre = item.genre;
            this.movieStatus = item.status;
            this.selectedItem = {
                changedItemName: item.name,
                changedItemGenre: item.genre,
                changedItemStatus: item.status,
                changedItemIndex: index,
            };

            // for delete
            this.itemIndex = index;
        },

        async editMovie(item) {
            let { valid } = await this.$refs.movieForm.validate();

            if (valid) {
                this.selectedItem.changedItemName = this.movieName;
                this.selectedItem.changedItemGenre = this.movieGenre;
                this.selectedItem.changedItemStatus = this.movieStatus;
                this.$store.dispatch('switchMovieInfo', item);

                this.isAddingMovie = false;
                this.isEditMovie = false;
                this.snackbarUpdated = true;
            }
        },

        deleteItem(itemIndex) {
            this.$store.dispatch('removeMovie', itemIndex);

            let deletedSound = new Audio(soundOfDeleted);
            deletedSound.play();

            this.snackbarDeleted = true;
            this.isAddingMovie = false;
            this.isEditMovie = false;
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
            this.$store.dispatch('selectAllMovies');
        },

        multipleDelete() {
            if (this.isSelectAll) {
                this.$store.dispatch('removeAllMovie');
                this.snackbarAllDeleted = true;
            } else {
                this.$store.dispatch('multipleRemoveMovie');
            }
        },

        setWillWatch() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllWillWatchMovie');
            } else {
                this.$store.dispatch('setWillWatchMovie');
            }
        },
        setWatched() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllWatchedMovie');
            } else {
                this.$store.dispatch('setWatchedMovie');
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
/* #FF5722 */

#card-movie {
    transition: all .2s ease;
}

#card-movie:hover {
    box-shadow: 0 0 2rem #FF5722;
}

span.willWatch:hover {
    box-shadow: 0 0 1rem #D87B06;
    border: none;
}

span.watched:hover {
    box-shadow: 0 0 1rem #449547;
    border: none;
}

.form-container {
    border: none;
    box-shadow: 0 0 2rem #FF5722;
    background: #1E293B;
}

.message {
    letter-spacing: 3px;
    font-size: .9rem;
}

.selectedCard {
    border-left: 1px solid #FF5722;
}

span ul {
    list-style: none;
}
</style>
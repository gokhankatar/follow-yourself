<template>

    <v-dialog v-model="isAddingCustomList" transition="dialog-bottom-transition" max-width="400">

        <div class="form-container pa-5">

            <v-form ref="customForm" @submit.prevent="createList">

                <v-text-field v-model="listName" :rules="nameRules" class="text-white" color="#00796B" label="List Name"
                    variant="outlined" required />

                <v-autocomplete v-model="icons" :rules="[v => !!v || 'State is required!']" :items="[]"
                    class="text-white mt-2" color="#00796B" chips item-color="#00796B" label="Icon" variant="outlined"
                    required />

                <v-autocomplete v-model="color" :rules="[v => !!v || 'State is required!']"
                    :items="[]" class="text-white mt-2" color="#00796B" chips
                    item-color="#00796B" label="Color" type="color" variant="outlined" required />

                <v-btn v-if="!isEditMovie" class="mt-3 pa-2" color="success" size="medium" variant="outlined"
                    type="submit" block>
                    Create</v-btn>

                <v-btn @click="isAddingCustomList = false" class="mt-3 pa-2" color="warning" size="medium" variant="outlined"
                    block>
                    Cancel</v-btn>

            </v-form>

        </div>

    </v-dialog>

    <v-navigation-drawer :rail="rail" permanent v-model="drawer" class="text-teal-darken-2">

        <v-list>
            <v-list-item prepend-icon="fas fa-home" title="Home" value="home" router to="/">

                <v-tooltip activator="parent" location="end">
                    Home
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-layer-group" title="Dashboard" value="dashboard" router
                to="/dashboard">

                <v-tooltip activator="parent" location="end">
                    Dashboard
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-briefcase" title="My Projects" value="projects" router
                to="/projects">

                <v-tooltip activator="parent" location="end">
                    Projects
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-sack-dollar" title="My Investments" value="investments" router
                to="/investments">

                <v-tooltip activator="parent" location="end">
                    Investments
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-book" title="My Books" value="books" router to="/books">

                <v-tooltip activator="parent" location="end">
                    Books
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-tv" title="My Movies" value="movies" router to="/movies">

                <v-tooltip activator="parent" location="end">
                    Movies
                </v-tooltip>

            </v-list-item>

            <v-list-item prepend-icon="fa-solid fa-gamepad" title="My Games" value="games" router to="/games">

                <v-tooltip activator="parent" location="end">
                    Games
                </v-tooltip>

            </v-list-item>

        </v-list>

        <v-list>

            <v-list-item v-if="!isCustomList" @click="isAddingCustomList = true" title="Add List" prepend-icon="fa-solid fa-plus">

                <v-tooltip activator="parent" location="end">
                    Add List
                </v-tooltip>

            </v-list-item>

            <v-list-item :prepend-icon="$store.state.theme == 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
                :title="$store.state.theme == 'dark' ? 'Dark Theme' : 'Light Theme'" @click.stop="changeTheme">

                <v-tooltip activator="parent" location="end">
                    Change Theme
                </v-tooltip>

            </v-list-item>

            <v-list-item @click="drawer = false" v-if="rail" prepend-icon="fa-solid fa-circle-chevron-left">

                <v-tooltip activator="parent" location="end">
                    Hide Bar
                </v-tooltip>

            </v-list-item>

        </v-list>

    </v-navigation-drawer>

    <v-app-bar elevation="2">

        <template v-slot:prepend>
            <v-app-bar-nav-icon color="teal-darken-2" @click="handleMenu" />
        </template>

        <v-app-bar-title class="d-none d-sm-flex text-uppercase text-teal-darken-2">
            <span class="font-weight-light">improve</span>
            <span class="font-weight-bold">yourself</span>
        </v-app-bar-title>

        <template v-slot:append>
            <v-btn variant="outlined" color="teal-darken-2" append-icon="fa-solid fa-arrow-right-from-bracket">
                Sign Out
            </v-btn>
        </template>

    </v-app-bar>

</template>
<script>
export default {
    name: 'NavbarVue',
    data() {
        return {
            drawer: true,
            rail: true,
            isCustomList: false,
            isAddingCustomList: false,
            listName:null,
            icons:[],
            color:null,
            colors:[],
        }
    },
    methods: {
        handleMenu() {
            this.rail = !this.rail;
            this.drawer = true;
        },

        changeTheme() {
            this.$store.dispatch('switchTheme', 'theme changed')
        },

        async createList() {
            let { valid } = await this.$refs.customForm.validate();
            if (valid) {
                this.$store.dispatch('addMovie', {

                });
                this.$refs.customForm.reset();
                this.snackbarAdded = true;
            }
        }
    }
}
</script>
<style scoped>
.form-container {
    box-shadow: 0 0 1.5rem #00796B;
    background: rgba(0, 0, 0, .9);
}
</style>
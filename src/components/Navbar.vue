<template>

<v-dialog
  v-model="isAddingCustomList"
  transition="dialog-bottom-transition"
  max-width="400">

<div class="form-container pa-5">

    <v-form ref="customForm" @submit.prevent="createList">

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
            Create</v-btn>

        <v-btn v-if="isEditMovie" @click="editMovie(selectedItem)" class="mt-3 pa-2" color="primary"
            size="medium" variant="outlined" block>
            Save</v-btn>

        <v-btn v-if="isEditMovie" @click="deleteItem(itemIndex)" class="mt-3 pa-2" color="error" size="medium"
            variant="outlined" block>
            Delete</v-btn>

        <v-btn @click="isAddingMovie = false" class="mt-3 pa-2" color="warning" size="medium" variant="outlined"
            block>
            Cancel</v-btn>

    </v-form>

</div>

</v-dialog>

    <v-navigation-drawer 
    :rail="rail" 
    permanent 
    v-model="drawer" 
    class="text-teal-darken-2">

        <v-list>
            <v-list-item 
            prepend-icon="fas fa-home" 
            title="Home" 
            value="home" 
            router to="/"> 
            
            <v-tooltip activator="parent" location="end">
                        Home
            </v-tooltip>

            </v-list-item>
            
            <v-list-item 
            prepend-icon="fa-solid fa-layer-group" 
            title="Dashboard" 
            value="dashboard" 
            router to="/dashboard">

            <v-tooltip activator="parent" location="end">
                        Dashboard
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            prepend-icon="fa-solid fa-briefcase" 
            title="My Projects" 
            value="projects" 
            router to="/projects">

            <v-tooltip activator="parent" location="end">
                        Projects
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            prepend-icon="fa-solid fa-sack-dollar" 
            title="My Investments" 
            value="investments" 
            router to="/investments">

            <v-tooltip activator="parent" location="end">
                        Investments
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            prepend-icon="fa-solid fa-book" 
            title="My Books" 
            value="books" 
            router to="/books">

            <v-tooltip activator="parent" location="end">
                        Books
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            prepend-icon="fa-solid fa-tv" 
            title="My Movies" 
            value="movies" 
            router to="/movies">

            <v-tooltip activator="parent" location="end">
                        Movies
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            prepend-icon="fa-solid fa-gamepad" 
            title="My Games" 
            value="games" 
            router to="/games">

            <v-tooltip activator="parent" location="end">
                        Games
            </v-tooltip>

            </v-list-item>
            
        </v-list>

        <v-list>

            <v-list-item 
        
            v-if="!isCustomList" 
            title="Add List"
            prepend-icon="fa-solid fa-plus">

            <v-tooltip activator="parent" location="end">
                        Add List
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            :prepend-icon="$store.state.theme == 'dark'?'fa-solid fa-moon':'fa-solid fa-sun'" 
            :title="$store.state.theme == 'dark' ? 'Dark Theme':'Light Theme'" 
            @click.stop="changeTheme"> 
            
            <v-tooltip activator="parent" location="end">
                        Change Theme
            </v-tooltip>

            </v-list-item>

            <v-list-item 
            @click="drawer=false" 
            v-if="rail" 
            prepend-icon="fa-solid fa-circle-chevron-left">

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
            <v-btn 
            variant="outlined" 
            color="teal-darken-2" 
            append-icon="fa-solid fa-arrow-right-from-bracket">
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
            isCustomList:false,
            isAddingCustomList:false,
        }
    },
    methods: {
        handleMenu() {
            this.rail = !this.rail;
            this.drawer = true;
        },

        changeTheme(){
            this.$store.dispatch('switchTheme','theme changed')
        },

        async createList(){
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
</style>
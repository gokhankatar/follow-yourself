<template>
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
            rail: true
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
    }
}
</script>
<style scoped>
</style>
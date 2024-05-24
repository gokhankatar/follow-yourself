<template>
    <v-navigation-drawer :rail="rail" permanent v-model="drawer" class="text-teal-darken-2">
        <v-list>
            <v-list-item prepend-icon="fas fa-home" :title="$t('home')" value="home" router to="/">
                <v-tooltip activator="parent" location="end">
                    {{ $t('home') }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-layer-group" :title="$t('dashboard')" value="dashboard" router
                to="/dashboard">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('dashboard')
                    }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-briefcase" :title="$t('my-projects')" value="projects" router
                to="/projects">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('projects')
                    }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-sack-dollar" :title="$t('my-investments')" value="investments" router
                to="/investments">
                <v-tooltip activator="parent" location="end">
                    {{ $t('investments') }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-book" :title="$t('my-books')" value="books" router to="/books">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('books')
                    }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-tv" :title="$t('my-movies')" value="movies" router to="/movies">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('movies')
                    }}
                </v-tooltip>
            </v-list-item>
            <v-list-item prepend-icon="fa-solid fa-gamepad" :title="$t('my-games')" value="games" router to="/games">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('games')
                    }}
                </v-tooltip>
            </v-list-item>
        </v-list>
        <v-list>
            <v-list-item :prepend-icon="$store.state.theme == 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
                :title="$store.state.theme == 'dark' ? $t('dark-theme') : $t('light-theme')" @click.stop="changeTheme">
                <v-tooltip activator="parent" location="end">
                    {{
                        $t('change-theme')
                    }}
                </v-tooltip>
            </v-list-item>
            <v-list-item @click="drawer = false" v-if="rail" prepend-icon="fa-solid fa-circle-chevron-left">
                <v-tooltip activator="parent" location="end">
                    {{ $t('hide-bar') }}
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
            <v-btn variant="outlined" color="teal-darken-2" append-icon="fa-solid fa-code">
                {{ $t('source-codes') }}
            </v-btn>
            <v-btn 
            class="mx-2" id="menu-activator" variant="outlined" color="teal-darken-2" append-icon="fa-solid fa-globe">
                Languages
            </v-btn>

            <v-menu activator="#menu-activator">
                <v-list>
                    <v-list-item @click="$i18n.locale='tr'">
                        <v-list-item-title class="cursor-pointer d-flex align-center justify-between">
                            <img width="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" alt="turkish">
                            <span>&nbsp; Tr-tr</span>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$i18n.locale='en'">
                        <v-list-item-title class="cursor-pointer d-flex align-center justify-between">
                            <img width="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" alt="english">
                            <span>&nbsp; En-en</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
        }
    },
    methods: {
        handleMenu() {
            this.rail = !this.rail;
            this.drawer = true;
        },
        changeTheme() {
            this.$store.dispatch('switchTheme', 'theme changed')
        }
    }
}
</script>
<style scoped></style>
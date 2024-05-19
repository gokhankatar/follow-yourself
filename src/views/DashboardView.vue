<template>
    <h1 class="text-h5">WELCOME TO YOUR DASHBOARD</h1>
    <v-container class="my-5">

        <!-- * Projects Start -->
        <v-row>
            <v-col>
                <v-card class="pa-5 d-flex flex-wrap justify-center align-center project-card">

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Finished</span>
                            <span>Total</span>
                            <span>Projects</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ finishedProject }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Ongoing</span>
                            <span>Total</span>
                            <span>Projects</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ ongoingProject }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet v-if="ongoingProject >= 2" @click="goToProjectManagement"
                        class="cursor-pointer pa-3 d-flex text-h3 text-white go-projects">
                        <div class="d-flex flex-column">
                            <span>Look at</span>
                            <span>project management</span>
                            <span>techniques</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <v-icon icon="fa-solid fa-arrow-right" />
                        </div>
                    </v-sheet>

                </v-card>
            </v-col>
        </v-row>
        <!-- ! Projects End -->

        <!-- * Books Start -->
        <v-row class="my-5">
            <v-col>
                <v-card class="pa-5 d-flex flex-wrap justify-center align-center book-card">

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Readed</span>
                            <span>Total</span>
                            <span>Books</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ readedBooks }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Readed</span>
                            <span>Total</span>
                            <span>Pages</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ readedTotalPages }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet v-if="readedBooks >= 1" @click="goToBook"
                        class="cursor-pointer pa-3 d-flex text-h3 text-white go-books">
                        <div class="d-flex flex-column">
                            <span>What</span>
                            <span>should I</span>
                            <span>read next?</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <v-icon icon="fa-solid fa-arrow-right" />
                        </div>
                    </v-sheet>

                </v-card>
            </v-col>
        </v-row>
        <!-- ! Books End -->

        <!-- * Games Start -->
        <v-row class="my-5">
            <v-col>
                <v-card class="pa-5 d-flex flex-wrap justify-center align-center game-card">

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Played</span>
                            <span>Total</span>
                            <span>Games</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ playedGames }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Your</span>
                            <span>Favorite</span>
                            <span>Platform</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h2 font-weight-bold">{{ mostPlayPlatform }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet v-if="playedGames >= 2" @click="goToGames"
                        class="cursor-pointer pa-3 d-flex text-h3 text-white go-games">
                        <div class="d-flex flex-column">
                            <span>See</span>
                            <span>all</span>
                            <span>{{ mostPlayPlatform }} games</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <v-icon icon="fa-solid fa-arrow-right" />
                        </div>
                    </v-sheet>

                </v-card>
            </v-col>
        </v-row>
        <!-- ! Games End -->

        <!-- * Movies Start -->
        <v-row class="my-5">
            <v-col>
                <v-card class="pa-5 d-flex flex-wrap justify-center align-center movie-card">

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Watched</span>
                            <span>Total</span>
                            <span>Movies</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ watchedMovies }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Your</span>
                            <span>Favorite</span>
                            <span>Genre</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h2 font-weight-bold">{{ favoriteGenre }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet v-if="watchedMovies >= 2" @click="goToMovies"
                        class="cursor-pointer pa-3 d-flex text-h3 text-white go-movies">
                        <div class="d-flex flex-column">
                            <span>See</span>
                            <span>the best</span>
                            <span>{{ favoriteGenre }} movies</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <v-icon icon="fa-solid fa-arrow-right" />
                        </div>
                    </v-sheet>

                </v-card>
            </v-col>
        </v-row>
        <!-- ! Movies End -->

        <!-- * Investments Start -->
        <v-row class="my-5">
            <v-col >
                <v-card class="pa-5 d-flex flex-wrap justify-center align-center investment-card">

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column">
                            <span>Your</span>
                            <span>Favorite</span>
                            <span>Investment</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h1 font-weight-bold">{{ maxGenre }}</strong>
                        </div>
                    </v-sheet>

                    <v-sheet class="cursor-pointer pa-3 d-flex text-h3 text-white">
                        <div class="d-flex flex-column justify-center">
                            <span>Total</span>
                            <span>Investment</span>
                            <span>Cost</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <strong class="text-h3 font-weight-bold">
                                <ul>
                                    <li v-for="item of costArray" :key="item">{{ item }}</li>
                                </ul>
                            </strong>
                        </div>
                    </v-sheet>

                    <v-sheet @click="goToInvestment"
                        class="cursor-pointer pa-3 d-flex text-h3 text-white go-investments">
                        <div class="d-flex flex-column">
                            <span>Let's</span>
                            <span>browse</span>
                            <span>{{ maxGenre }}</span>
                        </div>
                        <div class="d-flex justify-center align-center">
                            <v-icon icon="fa-solid fa-arrow-right" />
                        </div>
                    </v-sheet>

                </v-card>
            </v-col>

        </v-row>
        <!-- ! Investments End -->

    </v-container>
</template>

<script>
export default {
    name: 'DashboardView',
    data() {
        return {
            // Project
            finishedProject: null,
            ongoingProject: null,

            // Book
            readedBooks: null,
            readedTotalPages: null,

            // Game
            playedGames: null,
            mostPlayPlatform: null,

            // Movie
            watchedMovies: null,
            favoriteGenre: null,

            // investment
            maxGenre: null,
            costArray: [],
        }
    },
    methods: {

        /* Projects Start */
        getterProject() {
            this.finishedProject = this.$store.getters.getFinishedProjects;
            this.ongoingProject = this.$store.getters.getOngoingProjects;
        },
        /* Projects End */

        /* Books Start */
        getterBook() {
            this.readedBooks = this.$store.getters.getReadedBooks;
            this.readedTotalPages = this.$store.getters.getTotalReadedPages;
        },
        /* Books End */

        /* Games Start */
        getterGame() {
            this.playedGames = this.$store.getters.getPlayedGames;
            this.mostPlayPlatform = this.$store.getters.playPlatform;
        },
        /* Games End */

        /* Movies Start */
        getterMovie() {
            this.watchedMovies = this.$store.getters.getWatchedMovies;
            this.favoriteGenre = this.$store.getters.favoriteMovieGenre;
        },
        /* Movies End */

        /* Investment Start */
        getterInvestment() {
            this.maxGenre = this.$store.getters.getMaxGenre;
            this.costArray = this.$store.getters.totalCost;
        },
        /* Investment End */


        // algorithms 
        goToMovies() {
            let url = `https://www.imdb.com/search/title/?genres=${this.favoriteGenre}`;
            window.open(url, '_blank');
        },
        goToGames() {
            let genre;
            if (this.mostPlayPlatform === 'Nintendo') {
                genre = 'nintendo-switch';
            } else if (this.mostPlayPlatform === 'Playstation') {
                genre = 'ps5';
            } else if (this.mostPlayPlatform === 'Xbox') {
                genre = 'Xbox'
            } else if (this.mostPlayPlatform === 'PC') {
                genre = 'PC'
            } else if (this.mostPlayPlatform === 'Mobile') {
                genre = 'Mobile'
            }
            let url = `https://www.metacritic.com/browse/game/Xbox/all/all-time/new/?releaseYearMin=1958&releaseYearMax=2024&platform=${genre}&page=1`;
            window.open(url, '_blank');
        },
        goToProjectManagement() {
            let url = 'https://www.indeed.com/career-advice/career-development/project-management-techniques';
            window.open(url, '_blank')
        },
        goToBook() {
            let url = 'https://www.goodreads.com/list/show/2681.Time_Magazine_s_All_Time_100_Novels';
            window.open(url, '_blank');
        },
        goToInvestment() {
            let genre;
            if (this.maxGenre === 'Stocks') {
                genre = 'stocks-usa'
            } else if (this.maxGenre === 'Cryptocurrency') {
                genre = 'cryptocurrencies'
            } else if (this.maxGenre === 'Forex') {
                genre = 'currencies'
            } else if (this.maxGenre === 'Gold') {
                genre = 'etfs/funds-gold'
            } else if (this.maxGenre === 'Silver') {
                genre = 'etfs/funds-gold'
            } else {
                genre = ''
            }

            let url = `https://www.tradingview.com/markets/${genre}`;
            window.open(url, '_blank');

        }

    },
    mounted() {
        this.getterProject();
        this.getterBook();
        this.getterGame();
        this.getterMovie();
        this.getterInvestment();
    },
    watch: {
        /* Projects Start */
        finishedProject(val) {
            if (val > 10) {
                console.log('tebrikler 3 dan fazla bitirdiğiniz proje var devam edin!');
            }
        },
        ongoingProject(val) {
            if (val > 10) {
                console.log("10'dan fazla bitirmediğiniz proje bulunmaktadır. Vitesi arttırmalısınız!");
            }
        },
        /* Projects End */

        /* Books Start */
        readedBooks(val) {
            if (val > 10) {
                console.log("10'dan fazla kitap okudun !");
            }
        },
        readedTotalPages(val) {
            if (val > 1000) {
                console.log("Tebrikler 1000'den fazla sayfa okumuşsun!");
            }
        }
        /* Books End */
    }
}
</script>

<style scoped>
.project-card,
.book-card,
.game-card,
.movie-card,
.investment-card {
    z-index: 1;
    border-radius: 2.5rem;
    gap: 1rem;
}

.project-card {
    background: rgba(0, 0, 0, .5) url('https://cdn.pixabay.com/photo/2018/03/10/09/45/businessman-3213659_1280.jpg') no-repeat center center;
    box-shadow: 0 0 2rem #2196F3;
    background-size: cover;
    background-repeat: no-repeat;
}

.book-card {
    background: rgba(0, 0, 0, .5) url('https://cdn.pixabay.com/photo/2017/03/27/13/03/book-2178586_1280.jpg') no-repeat center center;
    box-shadow: 0 0 2rem #8BC34A;
    background-size: cover;
    background-repeat: no-repeat;
}

.game-card {
    background: rgba(0, 0, 0, .5) url('https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
    box-shadow: 0 0 2rem #673AB7;
    background-size: cover;
    background-repeat: no-repeat;
}

.movie-card {
    background: rgba(0, 0, 0, .5) url('https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center;
    box-shadow: 0 0 2rem #FF5722;
    background-size: cover;
    background-repeat: no-repeat;
}

.investment-card {
    background: rgba(0, 0, 0, .5) url('https://cdn.pixabay.com/photo/2020/08/09/14/25/business-5475664_1280.jpg') no-repeat center center;
    box-shadow: 0 0 2rem #00ACC1;
    background-size: cover;
    background-repeat: no-repeat;
}


.v-sheet {
    background: rgba(0, 0, 0, .4);
    gap: .9rem;
    border-radius: 1.5rem;
    transition: all .2s ease;
    z-index: 99;
}

.v-sheet:hover {
    scale: 1.1;
}

ul {
    list-style: none;
}

.go-projects {
    transition: all .2s ease;
}

.go-projects:hover {
    background-color: #2196F3;
    color: #fff;
}

.go-books {
    transition: all .2s ease;
}

.go-books:hover {
    background-color: #8BC34A;
    color: #fff;
}

.go-movies {
    transition: all .2s ease;
}

.go-movies:hover {
    background-color: #FF5722;
    color: #fff;
}

.go-games {
    transition: all .2s ease;
}

.go-games:hover {
    background-color: #673AB7;
    color: #fff;
}

.go-investments {
    transition: all .2s ease;
}

.go-investments:hover {
    background-color: #00ACC1;
    color: #fff;
}
</style>
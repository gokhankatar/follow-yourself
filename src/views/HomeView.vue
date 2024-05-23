<template>

    <v-carousel height="800" progress="teal-darken-2" hide-delimiters cycle>
        <v-carousel-item v-for="(slide, i) in slides" :key="i" class="slider-image" cover :src="slide.src">
        </v-carousel-item>
    </v-carousel>

    <v-container class="pa-5">

        <!-- * How to use start -->
        <v-row>
            <v-col>
                <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">How to use ?</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel v-for="item in useList" :key="item" :text="item.text"
                        :title="item.title"></v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <!-- ! How to use end -->

        <!-- * Why should use it start -->
        <v-row>
            <v-col>
                <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">Why should I use it ?</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-tabs v-model="tab" bg-color="teal-darken-2">
                        <v-tab value="practical">Practical</v-tab>
                        <v-tab value="open-source">Open Source</v-tab>
                        <v-tab value="accesibility">Accesibility</v-tab>
                        <v-tab value="freeNoMembership">Free! No Membership!</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="practical">
                                Since your data is stored locally in your browser, you can easily track your progress.
                                Publishers can easily track and manage the games they have played or will be playing by
                                entering data here. Instead of creating tables in tools such as Excel, investors can
                                easily track their investments with algorithms. Those who like to read books can store
                                and manage the books they have read or will read here as if they were a database. Those
                                who love watching movies and those who forget which movie you watched or are going to
                                watch can easily follow it here.
                            </v-tabs-window-item>

                            <v-tabs-window-item value="open-source">
                                This project is open source. So you can view my codes as you wish and criticize me. I
                                shared my codes with you. You can access it from the source codes button. Please
                                contribute to my codes, criticize and support me. I would be very grateful to you.
                            </v-tabs-window-item>

                            <v-tabs-window-item value="accesibility">
                                Since I did the project alone from start to finish, I am the person you can easily reach
                                whenever you want. My social media links are available in the contact section. At the
                                same time, this project is a project under "GK Software" that I created myself.
                            </v-tabs-window-item>
                            <v-tabs-window-item value="freeNoMembership">
                                You do not need to pay any fee or use the panel as long as you are a member. You can use
                                it unlimitedly as you wish.
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- ! Why should use it end -->

        <!-- * Technologies start -->
        <v-row>
            <v-col>
                <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">Technologies I Use</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="chips d-flex flex-wrap justify-center align-center">
                    <v-chip @click="goToVueJs" class="chip cursor-pointer" size="x-large"
                        variant="outlined">VueJs</v-chip>
                    <v-chip @click="goToVuetify" class="chip cursor-pointer" size="x-large"
                        variant="outlined">Vuetify</v-chip>
                    <v-chip @click="goToVueRouter" class="chip cursor-pointer" size="x-large" variant="outlined">Vue
                        Router</v-chip>
                    <v-chip @click="goToVuex" class="chip cursor-pointer" size="x-large"
                        variant="outlined">Vuex</v-chip>
                    <v-chip @click="goToAws" class="chip cursor-pointer" size="x-large" variant="outlined">Amazon
                        Web
                        Services</v-chip>
                    <v-chip @click="goToGsap" class="chip cursor-pointer" size="x-large"
                        variant="outlined">Gsap</v-chip>
                    <v-chip @click="goToFontAwesome" class="chip cursor-pointer" size="x-large" variant="outlined">Font
                        Awesome</v-chip>
                </div>
            </v-col>
        </v-row>
        <!-- ! Technologies end -->

        <v-footer class="d-flex flex-column mt-5 py-5">
            <div id="footer-container" class="d-flex flex-column flex-md-row w-100 justify-between align-center px-2 py-5">
                <strong>You can easily contact me via my social media accounts.</strong>

                <v-spacer></v-spacer>

                <ul class="socials d-flex flex-wrap justify-center align-center">
                    <a href="https://twitter.com/gokhan_crypto" target="_blank" aria-label="Twitter">
                        <i class="fa-brands fa-x-twitter" id="social-icon"></i>
                    </a>
                    <a href="https://discord.gg/QNh6y9vv" target="_blank" aria-label="Discord">
                        <i class="fa-brands fa-discord" id="social-icon"></i>
                    </a>
                    <a href="https://github.com/gokhankatar" target="_blank" aria-label="Github">
                        <i class="fa-brands fa-github" id="social-icon"></i>
                    </a>
                    <a href="https://www.instagram.com/katargokhan96/" target="_blank" aria-label="Instagram">
                        <i class="fa-brands fa-instagram" id="social-icon"></i>
                    </a>
                </ul>
            </div>

            <div class="px-4 py-2 bg-teal text-center w-100">
                {{ new Date().getFullYear() }} — <strong>GK Software</strong>
            </div>
        </v-footer>
    </v-container>
</template>
<script>
export default {
    name: 'HomeView',
    data() {
        return {
            slides: [
                { src: 'https://improveyourself-images.s3.eu-north-1.amazonaws.com/dashboard.png' },
                { src: 'https://improveyourself-images.s3.eu-north-1.amazonaws.com/books.png' },
                { src: 'https://improveyourself-images.s3.eu-north-1.amazonaws.com/create.png' },
                { src: 'https://improveyourself-images.s3.eu-north-1.amazonaws.com/proje.png' },
            ],
            useList: [
                { title: 'Projects', text: 'You can create a project by clicking the create project button. All you have to do is enter the name and status of your project.You can also edit your project information or delete your project by clicking on the project card you created. You can also make changes to your projects with the multiple selection method.' },
                { title: 'Books', text: 'You can create a book by clicking the cretae book button. All you have to do is specify the name, author, number of pages and status of the book you created. You can control by updating, deleting and multiple selection as in the project.' },
                { title: 'Investments', text: 'You can create an investment by clicking the create investment button. It is sufficient to specify the name of the product you invested in, its type (stock? cryptocurrency? etc.), your cost (how much money did you invest in?), the amount of the product you bought or sold, its currency and investment status. You can control by updating, deleting and multiple selection.' },
                { title: 'Movies', text: 'You can create a movie by clicking the cretae movie button. Just enter the movie name, genre(s), movie status. You can control by updating, deleting and multiple selection.' },
                { title: 'Games', text: 'You can create a game by clicking the cretae game button. All you have to do is enter the game name, the platform you are playing on or will play on, and the playing status. You can control by updating, deleting and multiple selection.' },
                { title: 'Dashboard', text: 'First of all, all the data you create, delete and update is stored locally in your browser and will not disappear anywhere unless you want it to. Therefore, you can conveniently track your data here. At the same time, there are algorithms in this software I wrote. You may receive suggestions and notifications based on your data.' }
            ],
            tab: null,
        }
    },
    methods: {
        goToVueJs() {
            window.open('https://vuejs.org', '_blank');
        },
        goToVuetify() {
            window.open('https://vuetifyjs.com/en/', '_blank');
        },
        goToVueRouter() {
            window.open('https://router.vuejs.org/', '_blank');
        },
        goToVuex() {
            window.open('https://vuex.vuejs.org/', '_blank');
        },
        goToAws() {
            window.open('https://aws.amazon.com/', '_blank');
        },
        goToGsap() {
            window.open('https://gsap.com/', '_blank');
        },
        goToFontAwesome() {
            window.open('https://fontawesome.com/', '_blank');
        }
    }
}
</script>
<style scoped>
.slider-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide-text {
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}

.chips {
    gap: 1rem;
}

.chip:hover {
    border-color: #00796B;
    background: #00796B;
    color: #fff;
}

#footer-container{
    gap: 1rem;
}
.socials{
    display: flex;
    gap: 2rem;
}
#social-icon{
    border: 1px solid #00796B;
    border-radius: 50%;
    color: #00796B;
    cursor: pointer;
    padding: 1rem;
    font-size: 1.5rem;
    transition: all .2s ease;
}
#social-icon:hover{
    background-color:#00796B;
    color: #fff;
}
</style>
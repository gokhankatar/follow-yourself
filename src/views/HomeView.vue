<template>
  <div class="d-flex justify-center align-center flex-column" v-if="$store.state.isShowTitle">
    <h2>H</h2>
    <h2>E</h2>
    <h2>L</h2>
    <h2>L</h2>
    <h2>O</h2>
  </div>

  <v-carousel v-if="!$store.state.isShowTitle" height="800" progress="teal-darken-2" hide-delimiters cycle>
    <v-carousel-item v-for="(slide, i) in slides" :key="i" class="slider-image" cover :src="slide.src">
    </v-carousel-item>
  </v-carousel>

  <v-container class="pa-5" v-if="!$store.state.isShowTitle">

    <!-- * How to use start -->
    <v-row>
      <v-col>
        <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">
          {{ $t("how-to-use") }}
        </h2>
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
        <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">
          {{ $t("why-should") }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs v-model="tab" bg-color="teal-darken-2">
            <v-tab value="practical">{{ $t("practical") }}</v-tab>
            <v-tab value="open-source">{{ $t("open-source") }}</v-tab>
            <v-tab value="accesibility">{{ $t("accesibility") }}</v-tab>
            <v-tab value="freeNoMembership">{{ $t("free") }}</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="practical">
                {{ $t("practical-info") }}
              </v-tabs-window-item>

              <v-tabs-window-item value="open-source">
                {{ $t("open-source-info") }}
              </v-tabs-window-item>

              <v-tabs-window-item value="accesibility">
                {{ $t("accesibility-info") }}
              </v-tabs-window-item>
              <v-tabs-window-item value="freeNoMembership">
                {{ $t("free-info") }}
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
        <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center py-5">
          {{ $t("technologies") }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="chips d-flex flex-wrap justify-center align-center">
          <v-chip @click="goToVueJs" class="chip cursor-pointer" size="x-large" variant="outlined">VueJs</v-chip>
          <v-chip @click="goToVuetify" class="chip cursor-pointer" size="x-large" variant="outlined">Vuetify</v-chip>
          <v-chip @click="goToVueRouter" class="chip cursor-pointer" size="x-large" variant="outlined">Vue
            Router</v-chip>
          <v-chip @click="goToVuex" class="chip cursor-pointer" size="x-large" variant="outlined">Vuex</v-chip>
          <v-chip @click="goToAws" class="chip cursor-pointer" size="x-large" variant="outlined">Amazon Web
            Services</v-chip>
          <v-chip @click="goToGsap" class="chip cursor-pointer" size="x-large" variant="outlined">Gsap</v-chip>
          <v-chip @click="goToFontAwesome" class="chip cursor-pointer" size="x-large" variant="outlined">Font
            Awesome</v-chip>
          <v-chip @click="goToI18n" class="chip cursor-pointer" size="x-large" variant="outlined">Vue i18n</v-chip>
        </div>
      </v-col>
    </v-row>
    <!-- ! Technologies end -->

    <v-footer class="d-flex flex-column mt-5 py-5">
      <div id="footer-container" class="d-flex flex-column flex-md-row w-100 justify-between align-center px-2 py-5">
        <strong>{{ $t("footer-msg") }}</strong>

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
  name: "HomeView",
  data() {
    return {
      slides: [
        {
          src: "https://improveyourself-images.s3.eu-north-1.amazonaws.com/dashboard.png",
        },
        { src: "https://improveyourself-images.s3.eu-north-1.amazonaws.com/books.png" },
        { src: "https://improveyourself-images.s3.eu-north-1.amazonaws.com/create.png" },
        { src: "https://improveyourself-images.s3.eu-north-1.amazonaws.com/proje.png" },
      ],
      useList: [
        { title: this.$t("projects"), text: this.$t("projects-info") },
        { title: this.$t("books"), text: this.$t("books-info") },
        { title: this.$t("investments"), text: this.$t("investments-info") },
        { title: this.$t("movies"), text: this.$t("movies-info") },
        { title: this.$t("games"), text: this.$t("games-info") },
        { title: this.$t("dashboard"), text: this.$t("dashboard-info") },
      ],
      tab: null,
    };
  },
  methods: {
    goToVueJs() {
      window.open("https://vuejs.org", "_blank");
    },
    goToVuetify() {
      window.open("https://vuetifyjs.com/en/", "_blank");
    },
    goToVueRouter() {
      window.open("https://router.vuejs.org/", "_blank");
    },
    goToVuex() {
      window.open("https://vuex.vuejs.org/", "_blank");
    },
    goToAws() {
      window.open("https://aws.amazon.com/", "_blank");
    },
    goToGsap() {
      window.open("https://gsap.com/", "_blank");
    },
    goToFontAwesome() {
      window.open("https://fontawesome.com/", "_blank");
    },
    goToI18n() {
      window.open("https://vue-i18n.intlify.dev/", "_blank");
    },
  },
};
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
  border-color: #00796b;
  background: #00796b;
  color: #fff;
}

#footer-container {
  gap: 1rem;
}

.socials {
  display: flex;
  gap: 2rem;
}

#social-icon {
  border: 1px solid #00796b;
  border-radius: 50%;
  color: #00796b;
  cursor: pointer;
  padding: 1rem;
  font-size: 1.5rem;
  transition: all 0.2s ease;
}

#social-icon:hover {
  background-color: #00796b;
  color: #fff;
}
</style>

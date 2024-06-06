<template>
  <h1 v-if="!$store.state.isShowTitle" class="text-h5 text-light-green">
    {{ $t("my-books") }}
  </h1>
  <div class="d-flex justify-center align-center flex-column" v-if="$store.state.isShowTitle">
    <h2>H</h2>
    <h2>E</h2>
    <h2>L</h2>
    <h2>L</h2>
    <h2>O</h2>
  </div>

  <!-- Form -->

  <v-dialog v-model="isAddingBook" transition="dialog-bottom-transition" max-width="400">
    <div class="form-container pa-5">
      <v-form ref="bookForm" @submit.prevent="createBook">
        <v-text-field v-model="bookName" :rules="nameRules" class="text-white" color="#8BC34A" label="Book Name"
          variant="outlined" required />

        <v-text-field v-model="bookAuthor" :rules="nameRules" class="text-white mt-2" color="#8BC34A" label="Author"
          variant="outlined" required />

        <v-text-field v-model="bookPages" :rules="pageRules" type="number" class="text-white mt-2" color="#8BC34A"
          label="Pages" variant="outlined" required />

        <v-autocomplete v-model="bookStatus" class="text-white mt-2" color="#8BC34A" chips item-color="#8BC34A"
          :rules="[(v) => !!v || 'state is required!']" label="Reading Status" :items="['will read', 'readed']"
          variant="outlined" required />

        <v-btn v-if="!isEditBook" class="mt-3 pa-2" color="success" size="medium" variant="outlined" type="submit"
          block>
          {{ $t("create") }}</v-btn>

        <v-btn v-if="isEditBook" @click="editBook(selectedItem)" class="mt-3 pa-2" color="primary" size="medium"
          variant="outlined" block>
          {{ $t("save") }}</v-btn>

        <v-btn v-if="isEditBook" @click="deleteItem(itemIndex)" class="mt-3 pa-2" color="error" size="medium"
          variant="outlined" block>
          {{ $t("delete") }}</v-btn>

        <v-btn @click="isAddingBook = false" class="mt-3 pa-2" color="warning" size="medium" variant="outlined" block>
          {{ $t("cancel") }}</v-btn>
      </v-form>
    </div>
  </v-dialog>

  <!-- If list is empty -->

  <v-container v-if="$store.state.books.booksList.length == 0 && !$store.state.isShowTitle"
    class="d-flex flex-column justify-center align-center">
    <h3 class="text-subtitle-1 text-uppercase font-weight-bold text-md-h4">
      {{ $t("empty-message-book") }}
    </h3>

    <v-btn @click="isAddingBook = true" class="mt-5 d-flex justiy-center align-center w-100 w-sm-auto"
      variant="outlined" color="#8BC34A">
      {{ $t("create-first-book") }}
    </v-btn>
  </v-container>

  <!-- Lists -->

  <v-container v-if="$store.state.books.booksList.length > 0 && !$store.state.isShowTitle" class="my-5">
    <v-card v-if="!isEditMode" class="px-2 py-1 text-caption text-grey">
      <v-row class="d-flex justify-space-between">
        <v-col class="d-flex justify-start align-center" lg="1">
          <v-icon @click="isEditMode = true" class="cursor-pointer" icon="fa-solid fa-pen-to-square" color="#8BC34A" />

          <v-tooltip activator="parent" location="left">
            {{ $t("edit") }}
          </v-tooltip>
        </v-col>

        <v-col class="d-none d-sm-flex justify-start align-center" lg="3">
          <span>{{ $t("name-book") }}</span>
        </v-col>

        <v-col class="d-none d-sm-flex justify-start align-center">
          <span>{{ $t("author") }}</span>
        </v-col>

        <v-col class="d-none d-sm-flex justify-start align-center">
          <span>{{ $t("pages") }}</span>
        </v-col>

        <v-col class="d-none d-sm-flex justify-start align-center">
          <span>{{ $t("date") }}</span>
        </v-col>

        <v-col class="d-none d-sm-flex justify-start align-center">
          <span>{{ $t("status") }}</span>
        </v-col>
      </v-row>
    </v-card>

    <!-- Edit Mode Start -->

    <v-card v-if="isEditMode" class="my-4 px-2 py-3 text-body-2 text-primary">
      <v-row class="d-flex justify-space-between px-2 flex-column flex-md-row">
        <v-col class="d-flex justify-start align-center" lg="4">
          <v-btn @click="selectAll" class="mx-0 mx-md-2 my-1 my-md-0 w-100 w-md-auto"
            prepend-icon="fa-solid fa-circle-check" variant="outlined" color="#8BC34A">
            {{ $t("select-all") }}
          </v-btn>
        </v-col>

        <v-col class="d-flex justify-end align-center flex-column flex-md-row" lg="8">
          <v-btn @click="setWillRead" class="mx-2 my-1 my-md-0 w-100 w-md-auto" prepend-icon="fa-solid fa-dumbbell"
            variant="outlined" color="warning">
            {{ $t("set-will-read") }}
          </v-btn>

          <v-btn @click="setReaded" class="mx-2 my-1 my-md-0 w-100 w-md-auto" prepend-icon="fa-solid fa-check"
            variant="outlined" color="success">
            {{ $t("set-readed") }}
          </v-btn>

          <v-btn @click="multipleDelete" class="mx-2 my-1 my-md-0 w-100 w-md-auto" prepend-icon="fa-solid fa-trash"
            variant="outlined" color="red-darken-3">
            {{ $t("delete") }}
          </v-btn>

          <v-btn @click="cancelEditMode" class="mx-2 my-1 my-md-0 w-100 w-md-auto" prepend-icon="fa-solid fa-xmark"
            variant="outlined" color="error">
            {{ $t("cancel") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Edit Mode End -->

    <v-card v-for="(item, index) of $store.state.books.booksList" :key="index"
      :class="isSelectAll || item.isSelected ? 'selectedCard' : ''" id="card-book"
      class="mt-5 py-5 px-3 text-body-1 text-light-green cursor-pointer">
      <v-row class="d-flex flex-column flex-sm-row justify-space-between">
        <v-spacer v-if="!isEditMode" />

        <v-col v-if="isEditMode" @click="selectCard(item)" class="d-flex justify-start align-center" lg="1">
          <v-icon class="cursor-pointer" :icon="isSelectAll || item.isSelected
    ? 'fa-solid fa-circle-check'
    : 'fa-regular fa-circle'
    " :color="isSelectAll || item.isSelected ? '#8BC34A' : 'blue-grey-darken-3'" />
        </v-col>

        <v-col @click="handleCard(item, index)" class="d-flex justify-start align-center" lg="3">
          <v-tooltip activator="parent" location="top">
            {{ $t("edit") }}/{{ $t("delete") }}
          </v-tooltip>

          <span>{{ item.name }}</span>
        </v-col>

        <v-col @click="handleCard(item, index)" class="d-flex justify-start align-center" lg="2">
          <v-tooltip activator="parent" location="top">
            {{ $t("edit") }}/{{ $t("delete") }}
          </v-tooltip>

          <span>{{ item.author }}</span>
        </v-col>

        <v-col @click="handleCard(item, index)" class="d-flex justify-start align-center" lg="2">
          <v-tooltip activator="parent" location="top">
            {{ $t("edit") }}/{{ $t("delete") }}
          </v-tooltip>

          <span>{{ item.pages }}</span>
        </v-col>

        <v-col class="d-flex justify-start align-center" lg="2">
          <span>{{ formattedDate }}</span>
        </v-col>

        <v-col class="d-flex justify-start align-center" lg="2">
          <v-chip @click="toggleItemStatus(index)" :class="item.status == 'will read' ? 'willRead' : 'readed'"
            :prepend-icon="item.status == 'will read' ? 'fa-solid fa-dumbbell' : 'fa-solid fa-check'
    " :color="item.status == 'will read' ? 'warning' : 'success'" variant="outlined" class="cursor-pointer"
            size="small">
            <v-tooltip activator="parent" location="top">
              {{ $t("change-status") }}
            </v-tooltip>

            {{ item.status }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col class="my-5 d-flex justify-center">
        <v-btn @click="addBook" class="add-btn" size="x-large" color="light-green" variant="outlined">
          {{ $t("add-book") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- Notifications -->

  <v-snackbar v-model="snackbarAdded" timeout="2000" color="green-darken-3">
    <p class="message text-center">{{ $t("added-notification-book") }}</p>
  </v-snackbar>

  <v-snackbar v-model="snackbarUpdated" timeout="2000" color="indigo-darken-3">
    <p class="message text-center">{{ $t("updated-notification-book") }}</p>
  </v-snackbar>

  <v-snackbar v-model="snackbarDeleted" timeout="2000" color="red-accent-3">
    <p class="message text-center">{{ $t("deleted-notification-book") }}</p>
  </v-snackbar>

  <v-snackbar v-model="snackbarAllDeleted" timeout="2000" color="red-darken-3">
    <p class="message text-center">{{ $t("all-deleted-notification-book") }}</p>
  </v-snackbar>
</template>

<script>
import soundOfCreated from "../assets/sounds/addCard.mp3";
import soundOfReaded from "../assets/sounds/readed.mp3";
import soundOfDeleted from "../assets/sounds/trashed.mp3";

export default {
  name: "BooksView",
  data() {
    return {
      bookName: null,
      bookAuthor: null,
      bookPages: null,
      bookStatus: null,
      intervalId: null,
      currentDate: new Date(),
      isAddingBook: false,
      isEditBook: false,
      selectedItem: {},
      itemIndex: "",
      snackbarAdded: false,
      snackbarUpdated: false,
      snackbarDeleted: false,
      snackbarAllDeleted: false,
      isEditMode: false,
      isSelectAll: false,
      nameRules: [
        (v) => !!v || "Book name is required",
        (v) => (v && v.length > 1) || "Book name must be longer than 1 characters",
      ],
      pageRules: [
        (v) => !!v || "Number of page is required!",
        (v) => (v > 25 && v < 2500) || "Number of pages must be between 25 and 2500",
      ],
    };
  },

  methods: {
    async createBook() {
      let { valid } = await this.$refs.bookForm.validate();

      if (valid) {
        this.$store.dispatch("addBook", {
          name: this.bookName,
          author: this.bookAuthor,
          pages: this.bookPages,
          status: this.bookStatus,
        });

        this.$refs.bookForm.reset();
        this.isAddingBook = false;
        this.snackbarAdded = true;

        // created sound effect
        let createdSound = new Audio(soundOfCreated);
        createdSound.play();
      }
    },

    toggleItemStatus(index) {
      this.$store.dispatch("switchBookStatus", index);

      if (this.$store.state.books.booksList[index].status == "readed") {
        let readedSound = new Audio(soundOfReaded);
        readedSound.play();
      }
    },

    addBook() {
      this.isAddingBook = true;
      this.isEditBook = false;
      this.bookName = null;
      this.bookAuthor = null;
      this.bookPages = null;
      this.bookStatus = null;
    },

    handleCard(item, index) {
      this.isAddingBook = true;
      this.isEditBook = true;
      this.bookName = item.name;
      this.bookAuthor = item.author;
      this.bookPages = item.pages;
      this.bookStatus = item.status;

      this.selectedItem = {
        changedItemName: item.name,
        changedItemAuthor: item.author,
        changedItemPages: item.pages,
        changedItemStatus: item.status,
        changedItemIndex: index,
      };

      // for delete
      this.itemIndex = index;
    },

    async editBook(item) {
      let { valid } = await this.$refs.bookForm.validate();
      if (valid) {
        this.selectedItem.changedItemName = this.bookName;
        this.selectedItem.changedItemAuthor = this.bookAuthor;
        this.selectedItem.changedItemPages = this.bookPages;
        this.selectedItem.changedItemStatus = this.bookStatus;
        this.$store.dispatch("switchBookInfo", item);

        this.isAddingBook = false;
        this.isEditBook = false;
        this.snackbarUpdated = true;
      }
    },
    deleteItem(itemIndex) {
      this.$store.dispatch("removeBook", itemIndex);

      let deletedSound = new Audio(soundOfDeleted);
      deletedSound.play();

      this.snackbarDeleted = true;
      this.isAddingBook = false;
      this.isEditBook = false;
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
      this.$store.dispatch("selectAllBooks");
    },

    multipleDelete() {
      if (this.isSelectAll) {
        this.$store.dispatch("removeAllBook");
        this.snackbarAllDeleted = true;
      } else {
        this.$store.dispatch("multipleRemoveBook");
      }
    },

    setWillRead() {
      if (this.isSelectAll) {
        this.$store.dispatch("setAllWillReadBook");
      } else {
        this.$store.dispatch("setWillReadBook");
      }
    },
    setReaded() {
      if (this.isSelectAll) {
        this.$store.dispatch("setAllReadedBook");
      } else {
        this.$store.dispatch("setReadedBook");
      }
    },
  },

  mounted() {
    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  },

  computed: {
    formattedDate() {
      const day = String(this.currentDate.getDate()).padStart(2, "0");
      const month = String(this.currentDate.getMonth() + 1).padStart(2, "0");
      const year = this.currentDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style scoped>
#card-book {
  transition: all 0.2s ease;
}

#card-book:hover {
  box-shadow: 0 0 2rem #8bc34a;
}

span.willRead:hover {
  box-shadow: 0 0 1rem #d87b06;
  border: none;
}

span.readed:hover {
  box-shadow: 0 0 1rem #449547;
  border: none;
}

.form-container {
  border: none;
  box-shadow: 0 0 2rem #8bc34a;
  background: #1e293b;
}

.message {
  letter-spacing: 3px;
  font-size: 0.9rem;
}

.selectedCard {
  border-left: 1px solid #8bc34a;
}
</style>

<template>

    <h1 class="text-h5 text-cyan-darken-1">My Investments</h1>

    <!-- Form -->

    <v-dialog v-model="isAddingInvestment" transition="dialog-bottom-transition" max-width="400">

        <div class="form-container pa-5">

            <v-form ref="investmentForm" @submit.prevent="createInvestment">

                <v-text-field v-model="investmentName" :rules="nameRules" class="text-white mt-2" color="#00ACC1"
                    label="Investment Name" variant="outlined" required />

                <v-autocomplete
                  v-model="investmentGenre"
                  :rules="[v => !!v || 'Genre is required!']"
                  :items="['Stocks','Gold','Silver','Cryptocurrency','Forex','Other']"
                  class="text-white mt-2"
                  color="#00ACC1"
                  chips
                  item-color="#00ACC1"
                  label="Investment Genre"
                  variant="outlined"
                  required />

                <v-autocomplete
                  v-model="investmentCurrency"
                  :rules="[v => !!v || 'Currency is required!']"
                  :items="currencies"
                  item-value="symbol"
                  item-title="name"
                  class="text-white mt-2"
                  color="#00ACC1"
                  chips
                  item-color="#00ACC1"
                  label="currency"
                  variant="outlined"
                  required />

                <v-text-field
                  v-model="investmentCost"
                  :rules="costRules"
                  type="number"
                  class="text-white mt-2"
                  color="#00ACC1"
                  label="Investment Cost"
                  variant="outlined"
                  required />

                <v-text-field
                  v-model="investmentAmount"
                  :rules="amountRules"
                  type="number"
                  class="text-white mt-2"
                  color="#00ACC1"
                  label="Investment Amount"
                  variant="outlined"
                  required />

                <v-autocomplete
                  v-model="investmentStatus"
                  :rules="[v => !!v || 'State is required!']"
                  :items="['bought', 'sold',]"
                  :item-title="value"
                  :item-value="code"
                  class="text-white mt-2"
                  color="#00ACC1"
                  chips
                  item-color="#00ACC1"
                  label="Trade Status"
                  variant="outlined"
                  required />

                <v-btn
                  v-if="!isEditInvestment"
                  class="pa-2"
                  color="success"
                  size="small"
                  variant="outlined"
                  type="submit"
                  block>
                  Create
                  </v-btn>
                  <v-btn
                  v-if="isEditInvestment"
                  @click="editInvestment(selectedItem)"
                  class="mt-2 pa-2"
                  color="primary"
                  size="small"
                  variant="outlined"
                  block>
                  Save
                  </v-btn>
                  <v-btn
                  v-if="isEditInvestment"
                  @click="deleteItem(itemIndex)"
                  class="mt-2 pa-2"
                  color="error"
                  size="small"
                  variant="outlined"
                  block>
                  Delete
                  </v-btn>
                  <v-btn
                  @click="isAddingInvestment = false"
                  class="mt-2 pa-2"
                  color="warning"
                  size="small"
                  variant="outlined"
                  block>
                  Cancel
                  </v-btn>

            </v-form>

        </div>

    </v-dialog>

    <!-- If list is empty -->

    <v-container v-if="$store.state.investments.investmentsList.length == 0"
        class="d-flex flex-column justify-center align-center">

        <h3 class="text-uppercase header-3">
            You haven't added a investment yet. Add now and start tracking your progress!
        </h3>

        <v-btn @click="isAddingInvestment = true" class="mt-5" variant="outlined" color="#00ACC1" size="x-large">
            Create first investment
        </v-btn>

    </v-container>

    <!-- Lists -->

    <v-container v-if="$store.state.investments.investmentsList.length > 0" class="my-5">

        <v-card v-if="!isEditMode" class="px-2 py-1 text-caption text-grey">

            <v-row class="d-flex justify-space-between">

                <v-col class="d-flex justify-start align-center" lg="1">
                    <v-icon @click="isEditMode = true" class="cursor-pointer" icon="fa-solid fa-pen-to-square"
                        color="#00ACC1" />

                    <v-tooltip activator="parent" location="left">
                        Edit
                    </v-tooltip>

                </v-col>


                <v-col class="d-flex justify-start align-center" lg="3">
                    <span>Name (Genre)</span>
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <span>Cost</span>
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <span>Amount</span>
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
                        size="small" color="#00ACC1">
                        Select all
                    </v-btn>

                </v-col>

                <v-col class="d-flex justify-end align-center" lg="8">

                    <v-btn
                      @click="setSold"
                      prepend-icon="fa-solid fa-hand-holding-hand"
                      variant="outlined"
                      size="small"
                      color="red-lighten-1">
                      Set sold
                    </v-btn>

                    <v-btn
                      @click="setBought"
                      class="mx-2"
                      prepend-icon="fa-solid fa-hand-holding-dollar"
                      variant="outlined"
                      size="small"
                      color="success">
                      Set
                      bought
                      </v-btn>

                    <v-btn
                      @click="multipleDelete"
                      class="mx-2"
                      prepend-icon="fa-solid fa-trash"
                      variant="outlined"
                      size="small"
                      color="red-darken-3">
                      Delete
                      </v-btn>

                    <v-btn
                      @click="cancelEditMode"
                      prepend-icon="fa-solid fa-xmark"
                      variant="outlined"
                      size="small"
                      color="error">
                      Cancel
                      </v-btn>

                </v-col>

            </v-row>

        </v-card>

        <!-- Edit Mode End -->

        <v-card
          v-for="(item, index) of $store.state.investments.investmentsList"
          :key="index"
          :class="isSelectAll || item.isSelected ? 'selectedCard' : ''"
          id="card-investment"
          class="mt-5 py-5 px-3 text-body-1 text-cyan-darken-1 cursor-pointer">

            <v-row class="d-flex justify-space-between">

                <v-spacer v-if="!isEditMode" />

                <v-col
                  v-if="isEditMode"
                  @click="selectCard(item)"
                  class="d-flex justify-start align-center"
                  lg="1">

                    <v-icon class="cursor-pointer"
                        :icon="isSelectAll || item.isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"
                        :color="isSelectAll || item.isSelected ? '#00ACC1' : 'blue-grey-darken-3'" />

                </v-col>

                <v-col @click="handleInvestment(item, index)" class="d-flex justify-start align-center" lg="3">

                    <v-tooltip activator="parent" location="top">
                        Edit/Delete
                    </v-tooltip>

                    <span>{{ item.name.toUpperCase() }} <strong>({{ item.genre }})</strong></span>

                </v-col>

                <v-col @click="handleInvestment(item, index)" class="d-flex justify-start align-center" lg="2">

                    <v-tooltip activator="parent" location="top">
                        Edit/Delete
                    </v-tooltip>

                    <span>
                        {{ item.cost }} <strong>{{ item.currency }}</strong>
                    </span>

                </v-col>

                <v-col @click="handleInvestment(item, index)" class="d-flex justify-start align-center" lg="2">

                    <v-tooltip activator="parent" location="top">
                        Edit/Delete
                    </v-tooltip>

                    <span>
                        {{ item.amount }}
                    </span>

                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <span>{{ formattedDate }}</span>
                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <v-chip @click="toggleItemStatus(index)" :class="item.status == 'sold' ? 'sold' : 'bought'"
                        :prepend-icon="item.status == 'sold' ? 'fa-solid fa-hand-holding-hand' : 'fa-solid fa-hand-holding-dollar'"
                        :color="item.status == 'sold' ? 'red-lighten-1' : 'success'" class="cursor-pointer" size="small"
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

                <v-btn @click="addInvestment" class="add-btn" size="x-large" color="cyan-darken-1" variant="outlined">
                    Add Investment
                </v-btn>

            </v-col>

        </v-row>

    </v-container>

    <!-- Notifications -->

    <v-snackbar v-model="snackbarAdded" timeout="2000" color="green-darken-3">

        <p class="message text-center">You added a investment!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarUpdated" timeout="2000" color="indigo-darken-3">

        <p class="message text-center">You updated a investment!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarDeleted" timeout="2000" color="red-accent-3">

        <p class="message text-center">You deleted a investment!</p>

    </v-snackbar>

    <v-snackbar v-model="snackbarAllDeleted" timeout="2000" color="red-darken-3">

        <p class="message text-center">You deleted all your investments!</p>

    </v-snackbar>

</template>

<script>
import soundOfCreated from '../assets/sounds/addCard.mp3';
import soundOfBought from '../assets/sounds/bought.mp3';
import soundOfDeleted from '../assets/sounds/trashed.mp3';

export default {
    name: 'InvestmentsView',
    data() {
        return {
            investmentName: null,
            investmentGenre: null,
            investmentCost: null,
            investmentAmount: null,
            investmentStatus: null,
            investmentCurrency:null,
            currencies:[
                {name:'USD $', symbol:'$'},
                {name:'EUR €', symbol:'€'},
                {name:'GBP £', symbol:'£'},
                {name:'JPY ¥', symbol:'¥'},
                {name:'TRY ₺', symbol:'₺'},
                {name:'BTC ₿', symbol:'₿'}
            ],
            intervalId: null,
            currentDate: new Date(),
            isAddingInvestment: false,
            isEditInvestment: false,
            selectedItem: {},
            itemIndex: '',
            snackbarAdded: false,
            snackbarUpdated: false,
            snackbarDeleted: false,
            snackbarAllDeleted: false,
            isEditMode: false,
            isSelectAll: false,
            nameRules: [
                v => !!v || 'Investment name is required!',
                v => (v && v.length >= 2) || 'Investment name must be longer than 1!'
            ],
            amountRules: [
                v => !!v || 'Amount is required!',
                v => (v > 0) || 'Amount must be longer than 0!'
            ],
            costRules: [
                v => !!v || 'Cost is required!',
                v => (v > 1) || 'Amount must be longer than 1!'
            ]
        }
    },

    methods: {
        async createInvestment() {
            let { valid } = await this.$refs.investmentForm.validate();
            if (valid) {
                this.$store.dispatch('addInvestment', {
                    name: this.investmentName,
                    genre: this.investmentGenre,
                    cost: this.investmentCost,
                    amount: this.investmentAmount,
                    status: this.investmentStatus,
                    currency:this.investmentCurrency,
                });
                this.$refs.investmentForm.reset();
                this.isAddingInvestment = false;
                this.snackbarAdded = true;

                 // created sound effect
                 let createdSound = new Audio(soundOfCreated);
                 createdSound.play();
            }
        },

        toggleItemStatus(index) {
            this.$store.dispatch('switchInvestmentStatus', index);
            
            if(this.$store.state.investments.investmentsList[index].status == 'bought'){
                let boughtSound = new Audio(soundOfBought);
                boughtSound.play();
            }
        },

        addInvestment() {
            this.isAddingInvestment = true;
            this.isEditInvestment = false;
            this.investmentName = '';
            this.investmentGenre = null;
            this.investmentCost = null;
            this.investmentAmount = null;
            this.investmentStatus = null;
            this.investmentCurrency = null;
        },

        handleInvestment(item, index) {
            this.isAddingInvestment = true;
            this.isEditInvestment = true;
            this.investmentName = item.name;
            this.investmentGenre = item.genre;
            this.investmentCost = item.cost;
            this.investmentAmount = item.amount;
            this.investmentStatus = item.status;
            this.investmentCurrency = item.currency;
            this.selectedItem = {
                changedItemName: item.name,
                changedItemGenre: item.genre,
                changedItemCost: item.cost,
                changedItemAmount: item.amount,
                changedItemCurrency: item.currency,
                changedItemStatus: item.status,
                changedItemIndex: index,
            };

            // for delete
            this.itemIndex = index;
        },

        async editInvestment(item) {
            let { valid } = await this.$refs.investmentForm.validate();

            if (valid) {
                this.selectedItem.changedItemName = this.investmentName;
                this.selectedItem.changedItemGenre = this.investmentGenre;
                this.selectedItem.changedItemCost = this.investmentCost;
                this.selectedItem.changedItemAmount = this.investmentAmount;
                this.selectedItem.changedItemCurrency = this.investmentCurrency;
                this.selectedItem.changedItemStatus = this.investmentStatus;
                this.$store.dispatch('switchInvestmentInfo', item);

                this.isAddingInvestment = false;
                this.isEditInvestment = false;
                this.snackbarUpdated = true;
            }
        },

        deleteItem(itemIndex) {
            this.$store.dispatch('removeInvestment', itemIndex);

            let deletedSound = new Audio(soundOfDeleted);
            deletedSound.play();

            this.snackbarDeleted = true;
            this.isAddingInvestment = false;
            this.isEditInvestment = false;
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
            this.$store.dispatch('selectAllInvestments');
        },

        multipleDelete() {
            if (this.isSelectAll) {
                this.$store.dispatch('removeAllInvestment');
                this.snackbarAllDeleted = true;
            } else {
                this.$store.dispatch('multipleRemoveInvestment');
            }
        },

        setBought() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllBoughtInvestment');
            } else {
                this.$store.dispatch('setBoughtInvestment');
            }
        },

        setSold() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllSoldInvestment');
            } else {
                this.$store.dispatch('setSoldInvestment');
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
/* #00ACC1 */

#card-investment {
    transition: all .2s ease;
}

#card-investment:hover {
    box-shadow: 0 0 2rem #00ACC1;
}

span.sold:hover {
    box-shadow: 0 0 1rem #EF5350  ;
    border: none;
}

span.bought:hover {
    box-shadow: 0 0 1rem #3C7C3F;
    border: none;
}

.form-container {
    border: none;
    box-shadow: 0 0 2rem #00ACC1;
    background: #1E293B;
}

.message {
    letter-spacing: 3px;
    font-size: .9rem;
}

.selectedCard {
    border-left: 1px solid #00ACC1;
}
</style>
<template>
    <h1 class="text-h5 text-primary">{{ $t('my-projects') }}</h1>
    <!-- * Form Start -->

    <v-dialog v-model="isAddingProject" transition="dialog-bottom-transition" max-width="400">

        <div class="form-container pa-5">

            <v-form ref="projectForm" @submit.prevent="createProject">

                <v-text-field v-model="projectName" :rules="titleRules" class="text-white" color="primary"
                    label="Project Title" variant="outlined" />

                <v-autocomplete v-model="projectStatus" class="mt-2 text-white"
                    :rules="[v => !!v || 'state is required!']" :items="['ongoing', 'finished',]" chips color="primary"
                    item-color="primary" label="Project Status" variant="outlined" required />

                <v-btn v-if="!isEditProject" class="mt-3 pa-2" color="success" size="medium" variant="outlined"
                    type="submit" block>{{ $t('create') }}</v-btn>

                <v-btn v-if="isEditProject" @click="editProject(selectedItem)" class="mt-3 pa-2" color="primary"
                    size="medium" variant="outlined" block>{{ $t('save') }}</v-btn>

                <v-btn v-if="isEditProject" @click="deleteItem(itemIndex)" class="mt-3 pa-2" color="error" size="medium"
                    variant="outlined" block>{{ $t('delete') }}</v-btn>

                <v-btn @click="isAddingProject = false" class="mt-3 pa-2" color="warning" size="medium"
                    variant="outlined" block>{{ $t('cancel') }}</v-btn>

            </v-form>

        </div>

    </v-dialog>

    <!-- ! Form End -->

    <!-- If list is empty -->

    <v-container v-if="$store.state.projects.projectsList.length == 0"
        class="d-flex flex-column justify-center align-center">

        <h3 class="text-subtitle-1 text-uppercase font-weight-bold text-md-h4">
            {{ $t('empty-message-project') }}
        </h3>

        <v-btn @click="isAddingProject = true" class="mt-5 d-flex justiy-center align-center w-100 w-sm-auto"
            variant="outlined" color="primary">
            {{ $t('create-first-project') }}
        </v-btn>

    </v-container>

    <!-- * Lists Start -->

    <v-container ref="container" v-if="$store.state.projects.projectsList.length > 0" class="my-5">

        <v-card v-if="!isEditMode" class="text-caption text-grey">

            <v-row class="px-2 py-1 d-flex justify-space-between">

                <v-col class="d-flex justify-start align-center" lg="1">
                    <v-icon @click="isEditMode = true" class="cursor-pointer" icon="fa-solid fa-pen-to-square"
                        color="primary" />

                    <v-tooltip activator="parent" location="left">
                        {{ $t('edit') }}
                    </v-tooltip>

                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center" lg="7">
                    <span>{{ $t('title') }}</span>
                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center" lg="2">
                    <span>{{ $t('date') }}</span>
                </v-col>

                <v-col class="d-none d-sm-flex justify-start align-center" lg="2">
                    <span>{{ $t('status') }}</span>
                </v-col>

            </v-row>

        </v-card>

        <!-- * Edit Mode Start -->

        <v-card v-if="isEditMode" class="my-4 px-2 py-3 text-body-2 text-primary">

            <v-row class="d-flex justify-space-between px-2 flex-column flex-md-row">

                <v-col class="d-flex justify-start align-center" lg="4">

                    <v-btn @click="selectAll" class="mx-0 mx-md-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-circle-check" variant="outlined" color="primary">
                        {{ $t('select-all') }}
                    </v-btn>

                </v-col>

                <v-col class="d-flex justify-end align-center flex-column flex-md-row" lg="8">

                    <v-btn @click="setOngoing" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-dumbbell" variant="outlined" color="warning">
                        {{ $t('set-ongoing') }}
                    </v-btn>
                    <v-btn class="mx-2 my-1 my-md-0 w-100 w-md-auto" @click="setFinisihed"
                        prepend-icon="fa-solid fa-check" variant="outlined" color="success">
                        {{ $t('set-finished') }}
                    </v-btn>
                    <v-btn @click="multipleDelete" class="mx-2 my-1 my-md-0 w-100 w-md-auto"
                        prepend-icon="fa-solid fa-trash" variant="outlined" color="red-darken-3">
                        {{ $t('delete') }}
                    </v-btn>
                    <v-btn class="mx-2 my-1 my-md-0 w-100 w-md-auto" @click="cancelEditMode"
                        prepend-icon="fa-solid fa-xmark" variant="outlined" color="error">
                        {{ $t('cancel') }}
                    </v-btn>
                </v-col>

            </v-row>

        </v-card>

        <!-- ! Edit Mode End -->

        <v-card v-for="(item, index) of $store.state.projects.projectsList" :key="index"
            :class="isSelectAll || item.isSelected ? 'selectedCard' : ''" id="card-project"
            class="mt-5 py-5 px-3 text-body-1 text-primary cursor-pointer">
            <v-row class="d-flex flex-column flex-sm-row justify-space-between">

                <v-spacer v-if="!isEditMode" />

                <v-col v-if="isEditMode" @click="selectCard(item)" class="d-flex justify-start align-center" lg="1">

                    <v-icon class="cursor-pointer"
                        :icon="isSelectAll || item.isSelected ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'"
                        :color="isSelectAll || item.isSelected ? 'primary' : 'blue-grey-darken-3'" />

                </v-col>

                <v-col @click="handleCard(item, index)" class="d-flex justify-start align-center" lg="7">

                    <v-tooltip activator="parent" location="top">
                        {{ $t('edit') }}/{{ $t('delete') }}
                    </v-tooltip>

                    <span>{{ item.name }}</span>

                </v-col>

                <v-col class="d-flex justify-start align-center" lg="2">
                    <span>{{ formattedDate }}</span>
                </v-col>

                <v-col id="project-status" class="d-flex justify-start align-center" lg="2">

                    <v-chip @click="toggleItemStatus(index)" :class="item.status == 'ongoing' ? 'ongoing' : 'success'"
                        :prepend-icon="item.status == 'ongoing' ? 'fa-solid fa-dumbbell' : 'fa-solid fa-check'"
                        :color="item.status == 'ongoing' ? 'warning' : 'success'" class="cursor-pointer" size="small"
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

                <v-btn @click="addProject" class="add-btn" size="x-large" color="primary" variant="outlined">
                    {{ $t('add-project') }}
                </v-btn>

            </v-col>

        </v-row>

    </v-container>

    <!-- ! Lists End -->

    <!-- Notifications -->

    <v-snackbar v-model="snackbarAdded" timeout="2000" color="green-darken-3">
        <p class="message text-center">{{
        $t('added-notification-project')
    }}</p>
    </v-snackbar>

    <v-snackbar v-model="snackbarUpdated" timeout="2000" color="indigo-darken-3">
        <p class="message text-center">{{
        $t('updated-notification-project')
    }}</p>
    </v-snackbar>

    <v-snackbar v-model="snackbarDeleted" timeout="2000" color="red-accent-3">
        <p class="message text-center">{{
        $t('deleted-notification-project')
    }}</p>
    </v-snackbar>

    <v-snackbar v-model="snackbarAllDeleted" timeout="2000" color="red-darken-3">
        <p class="message text-center">{{
        $t('all-deleted-notification-project')
            }}</p>
    </v-snackbar>

</template>

<script>
import soundOfCreated from '../assets/sounds/addCard.mp3';
import soundOfSuccess from '../assets/sounds/success.mp3';
import soundOfDeleted from '../assets/sounds/trashed.mp3';

export default {
    name: 'ProjectsView',
    data() {
        return {
            projectName: null,
            projectStatus: null,
            intervalId: null,
            currentDate: new Date(),
            isAddingProject: false,
            isEditProject: false,
            selectedItem: {},
            itemIndex: '',
            snackbarAdded: false,
            snackbarUpdated: false,
            snackbarDeleted: false,
            snackbarAllDeleted: false,
            isSmallScreen: false,
            windowWidth: window.innerWidth,
            isEditMode: false,
            isSelectAll: false,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length > 2) || 'Title must be longer than 2 characters',
            ]
        }
    },
    methods: {
        addProject() {
            this.isAddingProject = true;
            this.isEditProject = false;
            this.projectName = null;
            this.projectStatus = null;
        },

        async createProject() {
            let { valid } = await this.$refs.projectForm.validate();
            if (valid) {
                this.$store.dispatch('addProject', {
                    name: this.projectName,
                    status: this.projectStatus,
                })

                this.$refs.projectForm.reset();
                this.isAddingProject = false;
                this.snackbarAdded = true;

                // created sound effect
                let createdSound = new Audio(soundOfCreated);
                createdSound.play();
            }
        },

        toggleItemStatus(index) {
            this.$store.dispatch('switchProjectStatus', index);
            if (this.$store.state.projects.projectsList[index].status == 'finished') {
                let successSound = new Audio(soundOfSuccess);
                successSound.play();
            }
        },

        handleCard(item, index) {
            this.isAddingProject = true;
            this.isEditProject = true;
            this.projectName = item.name;
            this.projectStatus = item.status;
            this.selectedItem = {
                changedItemName: item.name,
                changedItemStatus: item.status,
                changedItemIndex: index,
            };

            // for delete
            this.itemIndex = index;
        },

        async editProject(item) {
            let { valid } = await this.$refs.projectForm.validate();
            if (valid) {

                this.selectedItem.changedItemName = this.projectName;
                this.selectedItem.changedItemStatus = this.projectStatus;
                this.$store.dispatch('switchProjectInfo', item);

                this.isAddingProject = false;
                this.isEditProject = false;
                this.snackbarUpdated = true;
            }
        },

        deleteItem(itemIndex) {
            this.$store.dispatch('removeProject', itemIndex);

            let deletedSound = new Audio(soundOfDeleted);
            deletedSound.play();

            this.snackbarDeleted = true;
            this.isAddingProject = false;
            this.isEditProject = false;
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
            this.$store.dispatch('selectAllProjects');
        },

        multipleDelete() {
            if (this.isSelectAll) {
                this.$store.dispatch('removeAllProject');
                this.snackbarAllDeleted = true;
            } else {
                this.$store.dispatch('multipleRemoveProject');
            }
        },

        setOngoing() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllOngoingProject');
            } else {
                this.$store.dispatch('setOngoingProject');
            }
        },

        setFinisihed() {
            if (this.isSelectAll) {
                this.$store.dispatch('setAllFinishedProject');
            } else {
                this.$store.dispatch('setFinishedProject');
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },
    computed: {
        formattedDate() {
            const day = String(this.currentDate.getDate()).padStart(2, '0');
            const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
            const year = this.currentDate.getFullYear();
            return `${day}.${month}.${year}`;
        }
    },
    mounted() {
        this.intervalId = setInterval(() => {
            this.currentDate = new Date();
        }, 1000);
        window.addEventListener('resize', this.handleResize);
    },
    watch: {
        windowWidth(val) {
            if (val <= 600) {
                this.isSmallScreen = true;
                console.log('SCREEN IS A SMALL ? ', this.isSmallScreen);
            } else {
                this.isSmallScreen = false;
                console.log('SCREEN IS A SMALL ? ', this.isSmallScreen);
            }
        },
    }
}
</script>

<style scoped>
#card-project {
    transition: all .2s ease;
}

#card-project:hover {
    box-shadow: 0 0 2rem #2196F3;
}

span.ongoing:hover {
    box-shadow: 0 0 1rem #D87B06;
    border: none;
}

span.success:hover {
    box-shadow: 0 0 1rem #449547;
    border: none;
}

.form-container {
    border: none;
    box-shadow: 0 0 2rem #2196F3;
    background: #1E293B;
}

.message {
    letter-spacing: 3px;
    font-size: .9rem;
}

.selectedCard {
    border-left: 1px solid #2196F3;
}
</style>
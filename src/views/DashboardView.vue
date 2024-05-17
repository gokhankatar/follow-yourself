<template>
    <h1 class="text-h5">WELCOME TO YOUR DASHBOARD</h1>
    <v-container class="my-5">
    <v-sheet>
        <span class="text-h3">{{ finishedProject }}</span> <br>
        <span class="text-h3">{{ ongoingProject }}</span> <br>

        <span class="text-h3">{{ readedBooks }}</span> <br>
        <span class="text-h3">{{ readedTotalPages }}</span>
        
    </v-sheet>
    </v-container>
</template>
<script>
export default {
    name: 'DashboardView',
    data(){
        return{
            finishedProject:null,
            ongoingProject:null,

            readedBooks:null,
            readedTotalPages:null,

        }
    },
    methods:{

        /* Projects Start */
       getterProject(){
        this.finishedProject = this.$store.getters.getFinishedProjects;
        this.ongoingProject = this.$store.getters.getOngoingProjects;
       } ,
       /* Projects End */

       /* Books Start */
       getterBook(){
        this.readedBooks = this.$store.getters.getReadedBooks;
        this.readedTotalPages = this.$store.getters.getTotalReadedPages;
       },
       /* Books End */


    },
    mounted(){
        this.getterProject();
        this.getterBook();
    },
    watch:{

        /* Projects Start */
        finishedProject(val){
            if(val > 10){
                console.log('tebrikler 3 dan fazla bitirdiğiniz proje var devam edin!');
            }
        },
        ongoingProject(val){
            if(val > 10){
                console.log("10'dan fazla bitirmediğiniz proje bulunmaktadır. Vitesi arttırmalısınız!");
            }
        },
        /* Projects End */

        /* Books Start */
        readedBooks(val){
            if(val > 10){
                console.log("10'dan fazla kitap okudun !");
            }
        },
        readedTotalPages(val){
            if(val > 1000){
                console.log("Tebrikler 1000'den fazla sayfa okumuşsun!");
            }
        }
        /* Books End */
    }
}
</script>
<style scoped></style>
import { createWebHistory, createRouter } from "vue-router";
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import BooksView from '../views/BooksView.vue';
import MoviesView from '../views/MoviesView.vue';
import GamesView from '../views/GamesView.vue';
import InvestmentsView from '../views/InvestmentsView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/dashboard', name: 'Dashboard', component: DashboardView },
    { path: '/projects', name: 'Projects', component: ProjectsView },
    { path: '/books', name: 'Books', component: BooksView },
    { path: '/movies', name: 'Movies', component: MoviesView },
    { path: '/games', name: 'Games', component: GamesView },
    { path: '/investments', name: 'Investments', component: InvestmentsView }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
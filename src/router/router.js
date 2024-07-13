/*
* @description : Follow your developments and activities with algorithms
* @author : Gokhan Katar
* @github : https://github.com/gokhankatar
* @x : https://twitter.com/gokhan_crypto/
* @instagram :  https://www.instagram.com/katargokhan96/
*/

import { createWebHistory, createRouter } from "vue-router";
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import BooksView from '../views/BooksView.vue';
import MoviesView from '../views/MoviesView.vue';
import GamesView from '../views/GamesView.vue';
import InvestmentsView from '../views/InvestmentsView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView, meta: { title: 'Home' } },
    { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
    { path: '/projects', name: 'Projects', component: ProjectsView, meta: { title: 'Projects' } },
    { path: '/books', name: 'Books', component: BooksView, meta: { title: 'Books' } },
    { path: '/movies', name: 'Movies', component: MoviesView, meta: { title: 'Movies' } },
    { path: '/games', name: 'Games', component: GamesView, meta: { title: 'Games' } },
    { path: '/investments', name: 'Investments', component: InvestmentsView, meta: { title: 'Investments' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `Follow Yourself | ${to.meta.title}`;
    next();
});

export default router;
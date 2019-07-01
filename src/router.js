import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

// import UsersIndex from './views/UsersIndex.vue';
import UsersShow from './views/UsersShow.vue';
import UsersEdit from './views/UsersEdit.vue';

import ClosetsShow from './views/ClosetsShow.vue';

import ClosetPatternsIndex from './views/ClosetPatternsIndex.vue';

import PatternsIndex from './views/PatternsIndex.vue';
import PatternsShow from './views/PatternsShow.vue';

import NotesIndex from './views/NotesIndex.vue';
import ImagesIndex from './views/ImagesIndex.vue';
import TagsIndex from './views/TagsIndex.vue';






Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/', name: 'index', component: Index },

    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },

    // { path: '/users/:id', name: 'users-index', component: UsersIndex },
    { path: '/users/:id', name: 'users-show', component: UsersShow },
    { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit },

    { path: '/closets/:id', name: 'closets-show', component: ClosetsShow },

    { path: '/closet-patterns', name: 'closet-patterns-index', component: ClosetPatternsIndex },

    { path: '/patterns', name: 'patterns-index', component: PatternsIndex },
    { path: '/patterns/:id', name: 'patterns-show', component: PatternsShow },

    { path: '/notes', name: 'notes-index', component: NotesIndex },
    { path: '/images', name: 'images-index', component: ImagesIndex },
    { path: '/tags', name: 'tags-index', component: TagsIndex },

  ]
})  
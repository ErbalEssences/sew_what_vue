import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

// import UsersIndex from './views/UsersIndex.vue';
import UsersShow from './views/UsersShow.vue';
import UsersEdit from './views/UsersEdit.vue';

// import ClosetsIndex from './views/ClosetsIndex.vue';

// import ClosetsNew from './views/ClosetsNew.vue';
// import ClosetsShow from './views/ClosetsShow.vue';
// import ClosetsEdit from './views/ClosetsEdit.vue';



Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/', name: 'home', component: Home },

    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },

    // { path: '/users/:id', name: 'users-index', component: UsersIndex },
    { path: '/users/:id', name: 'users-show', component: UsersShow },
    { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit }
  ]
})  
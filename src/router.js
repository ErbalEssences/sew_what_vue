import Vue from 'vue';
import Router from 'vue-router';

import UsersShow from './views/UsersShow.vue';

import Home from './views/Home.vue';

// import RecipesIndex from './views/RecipesIndex.vue';
// import RecipesNew from './views/RecipesNew.vue';
// import RecipesShow from './views/RecipesShow.vue';
// import RecipesEdit from './views/RecipesEdit.vue';

import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    { path: '/', name: 'home', component: Home },

    { path: '/users/:id', name: 'users-show', component: UsersShow },

    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }
  ]
})  
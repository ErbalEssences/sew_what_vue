<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark btn-my-color mb-5">
      <router-link class="navbar-brand" to="/">Sew What?</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/patterns/" >All Patterns</router-link>
      <router-link v-if="userId !== 0" class="navbar-brand" v-bind:to="'/users/' + userId " >User Page</router-link>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Login
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/signup">Signup</router-link>
              <router-link class="dropdown-item" to="/login">Login</router-link>
              <router-link class="dropdown-item" to="/logout">Logout</router-link>
            </div>
          </li>
        </ul>


    <!--     <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="titleFilter">
          <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<style>
.btn-my-color {
  /*background-color: yellow;*/
  background-color: #3B8F98;
}
</style>

<script>

var axios = require('axios');
export default {
    data: function() {
      return {
        titleFilter: "",
        userId: 0
      };
    },
  created: function() {
    this.userId = localStorage.getItem("userId");

  },
  // mixins: [Vue2Filters.mixin]

  }
</script>



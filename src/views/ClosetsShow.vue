<template>
  <div class="closet-show">
    <div class="container">



      <div class="col-sm-6">

          <h1>{{ closet.name}}</h1>

            <div class="form-group mx-sm-1 mb-3">
              <label for="inputname2" class="sr-only">Name</label>
              <input class="form-control" v-model="new_name" placeholder="New Closet Name">
            </div>
            <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="editCloset()">Confirm</button>

            <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="destroyCloset()">Delete Closet</button>
        </div>

        <div>
          Search by Name: <input v-model="nameFilter">
        </div>

        <div>
          <button class="btn btn-warning m-1" v-on:click="setSortAttribute('name')">
            {{ isAscending('name') }} 
            Sort by Name
          </button>
        </div>

        <div class="col-sm-4" v-for="pattern in orderBy(filterBy(closet.patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="closet.patterns.id">

          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="pattern.images.main_images[0].url" alt="Pattern Image">
            <!-- <img v-bind:src="pattern.images.main_images[0].file" class="img-fluid show-user-img"> -->
            
            <h2>{{pattern.name}}</h2>
            <h2>{{pattern.display_name}}</h2>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/patterns/' + pattern.id ">To Pattern</router-link>
              
              
              <div v-for="link in closet.closet_patterns">
                <div v-if="link.pattern_id === pattern.id">
                  <button class="btn btn-warning m-1" v-on:click="destroyClosetPattern(link.id)">Remove Pattern</button>
                </div>
              </div>
            </div>
          </div>

        </div>


    </div>
  </div>
</template>

<style>
</style>

<script>
import Vue2Filters from 'vue2-filters';
var axios = require('axios');

export default {
  data: function() {
    return {
      closet: [],
      new_name: "",
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1,
      userId: 0

    };
  },
  created: function() {
    this.userId = localStorage.getItem("userId");

    axios.get("/api/closets/" + this.$route.params.id ).then(response => {
      this.closet = response.data;
    });
  },
  methods: {
    destroyCloset: function(remove_id) {
      console.log("Removing Closet...");
      axios.delete("/api/closets/" + this.closet.id).then(remove_id => {
        this.$router.push("/api/users/" + userId);
      });
    },

    destroyClosetPattern: function(remove_id) {
      console.log("Removing Pattern From Closet...");
      axios.delete("/api/closet_patterns/" + remove_id).then(response => {
      this.closet = response.data;
      });
    },
    editCloset: function() {
                    console.log("Editing the Closet...");

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.patch("/api/closets/" + this.$route.params.id, params).then(response => {
                      this.closet = response.data;
                    });   
                },

      setSortAttribute: function(inputAttribute) {
          if (this.sortAttribute === inputAttribute) {
            this.sortAscending *= -1;
          } else {
            this.sortAscending = 1;
          }
          this.sortAttribute = inputAttribute;
        },

      isAscending: function(inputAttribute) {
          if (this.sortAttribute === inputAttribute) {
            return this.sortAscending === 1 ? "^" : "v";
          }
        },
  },
  mixins: [Vue2Filters.mixin]                
};
</script>
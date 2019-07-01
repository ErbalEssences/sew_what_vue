<template>
  <div class="pattern-index">

      <div>
        Search by Name: <input v-model="nameFilter">
      </div>
      <div>
        Search by Display Name: <input v-model="displayNameFilter">
      </div>

      <div>
        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('name')">
          {{ isAscending('name') }} 
          Sort by Name
        </button>

        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('price')">
          <span v-if="sortAttribute === 'price' && sortAscending === 1 ">^</span> 
          <span v-else-if="sortAttribute === 'price' && sortAscending === -1 ">v</span> 
          Sort by Price
        </button>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="public" value="true" id="defaultCheck1">
        <label class="form-check-label" for="defaultCheck1">
          Public
        </label>
      </div>







        <div class="col-sm-4" v-for="pattern in orderBy(filterBy(patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="pattern.id">


          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="pattern.images.main_images[0].url" alt="Pattern Image">
            <!-- <img v-bind:src="pattern.images.main_images[0].file" class="img-fluid show-user-img"> -->
      


            <h2>{{pattern.name}}</h2>
            <h2>Brand</h2>
            <h3>{{pattern.display_name}}</h3>
            <h3>{{pattern.price}}</h3>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/patterns/' + pattern.id ">To Pattern</router-link>
              <a class="btn btn-warning m-1" v-bind:href="pattern.url">Go to the Site</a>
            </div>


            <div v-if="userId !== 0" class="card-body">
              <div v-if="userId !== 0" class="dropdown">
                <button v-if="userId !== 0" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Closet
                </button>
                  <div v-if="userId !== 0" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div v-for="closet in user.closets">
                      <a v-on:click="addToCloset(closet.id, pattern.id)" class="dropdown-item" href="#">{{closet.name}}</a>
                    </div>
                  </div>

                  <h5 v-if="userId !== 0" >Make New Closet and Add</h5>
                    <form  v-if="userId !== 0"  class="form-inline">
                      <div  v-if="userId !== 0"  class="form-group mx-sm-1 mb-3">
                        <label  v-if="userId !== 0"  for="inputname2" class="sr-only">Name</label>
                        <input  v-if="userId !== 0"  class="form-control" v-model="new_name" placeholder="Closet Name">
                      </div>
                      <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeCloset(pattern.id)">Confirm Closet</button>

                    </form>
                  
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
      patterns: [],
      user: {},
      new_name: "",
      userId: 0,
      nameFilter: "",
      displayNameFilter: "",
      sortAttribute: "name",
      sortAscending: 1
    };
  },
  created: function() {

    this.userId = localStorage.getItem("userId");
    
    axios.get("/api/patterns" ).then(response => {
      this.patterns = response.data;
    });
    axios.get("/api/users/" + this.userId ).then(response => {
      this.user = response.data;
    });
  },
  methods: { 

        makeCloset: function(pattern) {
                    console.log("Creating the closet...");
                    console.log(pattern);

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.post("/api/closets", params)
                      .then(response => {
                        this.addToCloset(pattern, response.data.id);
                      })
                      .catch(error => {
                        this.errors = error.response.data.errors;
                      });
                  },

        addToCloset: function(closet, pattern) {
                    console.log("Adding to the Closet...");

                    var params = { 
                                    pattern_id: pattern,
                                    closet_id: closet
                                 };

                    axios.post("/api/closet_patterns", params).then(response => {
                      this.$router.push(this.user = response.data );
                    }).catch(error => {
                      this.errors = error.response.data.errors;
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
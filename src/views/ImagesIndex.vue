<template>
  <div class="images-show">
      <div>
        Search by Name: <input v-model="nameFilter">
      </div>

      <div>
        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('pattern_name')">
          {{ isAscending('pattern_name') }} 
          Sort by Name
        </button>
      </div>

        <div class="col-sm-4" v-for="image in orderBy(filterBy(images, nameFilter, 'pattern_name'), sortAttribute, sortAscending)" v-bind:key="image.id">

          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="image.url" alt="Pattern Image">
            
            <h2>{{image.pattern_name}}</h2>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/patterns/' + image.pattern_id ">To Pattern</router-link>
              <button type="submit" class="btn btn-warning m-1" v-on:click="destroyimage(image.id)">Delete Image</button>
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
      images: [],
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
    
    axios.get("/api/images" ).then(response => {
      this.images = response.data;
    });
  },
  methods: { 
            destroyimage: function(remove_id) {
                  console.log("deleting image");
                  axios.delete("/api/images/" + remove_id).then(response => {
                                  this.$router.push("/images/");
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
<template>
  <div class="closet-patterns-index">
    <div class="container">
      <h1>All User Patterns</h1>

        <div v-for="join in closet_patterns">
          <div class="card m-4" style="width: 18rem;">
            <img class="card-img-top" v-bind:src="join.images[0].url" alt="Closet Image">
            <!-- <img v-bind:src="pattern.images.main_images[0].file" class="img-fluid show-user-img"> -->
            
            <h2>{{join.pattern_display_name}}</h2>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/closets/' + join.pattern_id ">{{join.pattern_name}}</router-link>
              <router-link class="btn btn-warning m-1" v-bind:to=" '/closets/' + join.closet_id ">{{join.closet}} Closet</router-link>
              <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="destroyClosetPattern(join.id)">Remove From Closet</button>

            </div>
          </div>
        </div>


    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      closet_patterns: []
    };
  },
  created: function() {
    axios.get("/api/closet_patterns").then(response => {
      this.closet_patterns = response.data;
    });
  },
  methods: {
    destroyClosetPattern: function(remove_id) {
      console.log("Removing Pattern From Closet...");
      axios.delete("/api/closet_patterns/" + remove_id).then(response => {
                      this.closet_patterns = response.data;
      });
    },
    
  },
};
</script>
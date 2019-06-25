<template>
  <div class="recipes-show">
    <div class="container">
      <div class="row">

        <!-- <div class="card flex-row flex-wrap" style="width: 100%">
            <div class="card-header border-0">
                <img v-bind:src="user.avatar_url" class="img-fluid show-user-img" alt="User Image">
            </div>
            <div class="card-block px-2">
                <h4 class="card-title">{{user.username}}</h4>
                <p class="card-text">{{user.skill}}</p>
                <router-link class="btn btn-warning m-1" v-bind:to=" '/users/' + user.id + '/edit' ">Edit</router-link>
                <button class="btn btn-warning m-1" v-on:click="destroyuser()">Delete</button>
            </div>
            <div class="w-100"></div>
        </div> -->



        <div class="col-sm-6">

          <h1>{{ user.username }}</h1>
          <h3>Skill Level: {{ user.skill }}</h3>
          <router-link class="btn btn-warning m-1" v-bind:to=" '/users/' + user.id + '/edit' ">Edit</router-link>
          <button class="btn btn-warning m-1" v-on:click="destroyuser()">Delete</button>
        </div>
        <div class="col-sm-6">
          <img v-bind:src="user.avatar_url" class="img-fluid show-user-img">
        </div>



        <div v-for="closets in user">
          <div v-for="closet in closets">
            <div v-for="patterns in closet">
              <div v-for="pattern in patterns">
                <div v-for="images in pattern">
                  <div v-for="main_images in images">


                    <div class="card m-1" style="width: 18rem;">
                      
                      <img class="card-img-top" v-bind:src="main_images.first" alt="Closet Image">

                      <div class="card-body">
                        <h1>{{ main_images }} ...</h1>
                        <a href="#" class="btn btn-warning">{{closet.name}} Closet</a>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



<!--         <div v-for="closets in user">
          <div v-for="closet in closets">
            <div class="card m-1" style="width: 18rem;">

              <img class="card-img-top" v-bind:src="user.avatar_url" alt="Closet Image">

              <div class="card-body">
                <a href="#" class="btn btn-warning">{{closet.name}} Closet</a>
              </div>
            
            </div>
          </div>
        </div> -->


      </div>
    </div>

    


  </div>
</template>

<style>
img.show-user-img {
  width: 250px;
}

.btn-my-color {
  background-color: #3B8F98;
}
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      user: {
              "username": "",
              "email": "",
              "skill": "",
              "avatar_url": "",
              "closets": [
                          {
                            "name": "Dresses",
                            "user_id": 1,
                            "patterns": [
                                          {
                                            "name": "",
                                            "url": "",
                                            "price": "",
                                            "out_of_print": false,
                                            "display_name": "",
                                            "images": {
                                                        "line_art": {
                                                                      "pattern_id": 1,
                                                                      "user_id": null,
                                                                      "url": "",
                                                                      "line_art": true
                                                                    },
                                                        "main_images": [
                                                                          {
                                                                            "pattern_id": 1,
                                                                            "user_id": null,
                                                                            "url": "",
                                                                            "line_art": false
                                                                          }
                                                                        ],
                                                        "user_images": []
                                                      },
                                          "tags": [
                                                    {
                                                      "id": 1,
                                                      "name": ""
                                                    }
                                          ]
                                          }
                                          ],
              "notes": {
                          "private": [
                                      {
                                          "pattern_id": 1,
                                          "user_id": 1,
                                          "body": "",
                                          "public": false
                                      }
                                          ],
                          "public": [
                                      {
                                        "pattern_id": 1,
                                        "user_id": 1,
                                        "body": "",
                                        "public": true
                                      }
                                        ]
                          }
            },

  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    destroyUser: function() {
      axios.delete("/api/recipes/" + this.recipe.id).then(response => {
        this.$router.push("/");
      });
    }
  }
};
</script>
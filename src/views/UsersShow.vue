<template>
  <div class="users-show">
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
          <h4>Total Closets: {{ user.number_of_closets }}</h4>
          <h4>Total Patterns: {{ user.number_of_patterns }}</h4>
          <router-link class="btn btn-warning m-1" v-bind:to=" '/users/' + user.id + '/edit' ">Edit or Delete</router-link>
          
          <router-link class="btn btn-warning m-1" v-bind:to=" '/closet/' + user.id + '/edit' ">New Closet</router-link>

          <!-- <button class="btn btn-warning m-1" v-on:click="destroyuser()">Delete</button> -->
        </div>
        <div class="col-sm-6">
          <img v-bind:src="user.avatar_url" class="img-fluid show-user-img">
        </div>



        <div v-for="closet in user.closets">
          <div class="card m-4" style="width: 18rem;">
            <img class="card-img-top" v-bind:src="closet.patterns[0].images.main_images[0].url" alt="Closet Image">
            <div class="card-body">
              <a href="#" class="btn btn-warning">{{closet.name}} Closet</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
img.show-user-img {
  max-width: 450px;
  max-height: 300px;
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
               username: "",
               email: "",
               skill: "",
               avatar_url: "",
               closets: [
                          {
                             name: "",
                             user_id: 1,
                             patterns: [
                                          {
                                             name: "",
                                             url: "",
                                             price: "",
                                             out_of_print: false,
                                             display_name: "",
                                             images: {
                                                         line_art: {
                                                                       pattern_id: 1,
                                                                       user_id: null,
                                                                       url: "",
                                                                       line_art: true
                                                                    },
                                                         main_images: [
                                                                          {
                                                                             pattern_id: 1,
                                                                             user_id: null,
                                                                             url: "",
                                                                             line_art: false
                                                                          }
                                                                        ],
                                                         user_images: [],
                                                      },
                                             tags: [
                                                      {
                                                         id: 1,
                                                         name: ""
                                                      }
                                                    ]
                                          }
                                        ]
                          }
                         ],
               notes: {
                           private: [
                                        {
                                           pattern_id: 1,
                                           user_id: 1,
                                           body: "",
                                           public: false
                                        },
                                     ],
                           public: [
                                      {
                                         pattern_id: 1,
                                         user_id: 1,
                                         body: "",
                                         public: true
                                      },
                                    ]
                          },

            },
          };
    },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(response => {
      this.user = response.data;
    });
  },
  // methods: {
  //   destroyUser: function() {
  //     axios.delete("/api/users/" + this.user.id).then(response => {
  //       this.$router.push("/");
  //     });
  //   }
  // }
};
</script>
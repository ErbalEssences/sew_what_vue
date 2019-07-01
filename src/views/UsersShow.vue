<template>
  <div class="users-show">
    <div class="container">
      <div class="row">

        <div class="col-sm-6">
          <h1>{{ user.username }}</h1>
          <h3>Skill Level: {{ user.skill }}</h3>
          <h4>Total Closets: {{ user.number_of_closets }}</h4>
          <h4>Total Patterns: {{ user.number_of_patterns }}</h4>
          <div>
            <router-link class="btn btn-warning m-1" v-bind:to=" '/closet-patterns/' ">All User Patterns</router-link>
            <router-link class="btn btn-warning m-1" v-bind:to=" '/notes/' ">All User Notes</router-link>
            <router-link class="btn btn-warning m-1" v-bind:to=" '/images/' ">All User Images</router-link>
          </div>
          <router-link class="btn btn-warning m-1" v-bind:to=" '/users/' + user.id + '/edit' ">Edit or Delete</router-link>

          <h4>Make New Closet</h4>
          <form class="form-inline">
            <div class="form-group mx-sm-1 mb-3">
              <label for="inputname2" class="sr-only">Name</label>
              <input class="form-control" v-model="new_name" placeholder="Closet Name">
            </div>
            <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeCloset()">Confirm Closet</button>
          </form>
        </div>
        
        <div class="col-sm-6">
          <img class="card-img-top" v-bind:src="user.avatar_url" alt="User Image">
        </div>

        <div>
          Search by Name: <input v-model="nameFilter">
        </div>

        <div>
          <button class="btn btn-warning" v-on:click="setSortAttribute('name')">
            {{ isAscending('name') }} 
            Sort by Name
          </button>
        </div>


          <div class="col-sm-4" v-for="closet in orderBy(filterBy(user.closets, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="user.closets.id">

            <div class="card m-4" style="width: 18rem;">

              <img class="card-img-top" v-if="closet.patterns[0]" v-bind:src="closet.patterns[0].images.main_images[0].url" alt="Closet Image">
              <!-- <img class="card-img-top" v-if="closet.patterns[0]" v-bind:src="closet.patterns[0].images.main_images[0].file" alt="Closet Image"> -->
              <img class="card-img-top" v-else v-bind:src="closet_photo" alt="No Photo">
              <div class="card-body">
                <router-link class="btn btn-warning m-1" v-bind:to=" '/closets/' + closet.id ">{{closet.name}} Closet</router-link>

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
import Vue2Filters from 'vue2-filters';
var axios = require('axios');

export default {
  data: function() {
    return {
      closet_photo: "https://i.pinimg.com/236x/a3/27/9e/a3279e1539f7e72d36a614a4db096891--drawings-easy-easy-cartoon-drawings.jpg",
      // closet_photo: "public/no_closet_image.jpg",
      new_name: "",
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1,
      image: "",
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
  methods: {

        makeCloset: function() {
                    console.log("Creating the closet...");

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.post("/api/closets", params).then(response => {
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
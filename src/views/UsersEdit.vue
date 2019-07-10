<template>
  <div class="users-edit">


<section id="login-register">
    <div class="container">
        <div class="row">
            <!-- login form 1 -->
            <div class="col-sm-12">
                <div id="login-form">
                    <h3 class="log-title">EDIT USER</h3>
                      <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                      </ul>
                    <div class="form-group">
                        <form v-on:submit.prevent="submit()">
                          <div class="form-group">
                            Username: <input type="text"  class="form-control" v-model="username">
                          </div>

                          <div class="form-group">
                            Email: <input type="email" class="form-control" id="email" v-model="email" required>
                          </div>

                          <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle m-2 btn btn-md btn-primary btn-log btn-rounded" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{skill}}
                            </button>
                              <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                <div v-for="level in skillLevels">
                                  <span v-on:click="skill = level" class="dropdown-item" href="#">{{level}}</span>
                                </div>
                              </div>
                          </div>

                          <div class="form-group">

                            Profile Image: <input class="form-group btn-secondary dropdown-toggle m-2 btn btn-md btn-primary btn-log btn-rounded" type="file" v-on:change="setFile($event)" ref="fileInput">
                          </div>
                          
                      <div class="log-line">
                        <div class="pull-right">
                          <!-- <input type="submit" value="Update User"> -->
                          <button class="btn btn-md btn-primary-filled btn-log btn-rounded" v-on:click="submit()">Update User</button>
                          <button class="btn btn-md btn-primary-filled btn-log btn-rounded" v-on:click="destroyUser()">Delete User</button>
                          </div>
                        </div>

                        </form>
                    </div>


                </div>
            </div><!-- / col-sm-6 -->
            <!-- / login form 1 -->

            <!-- / register form 1 -->
        </div><!-- / row -->
        <!-- / form 1 -->
    </div><!-- / container -->
</section>


  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      errors: [],
      skillLevels: ["Beginner", "Intermediate", "Experienced"],
      username: "",
      email: "",
      skill: "",
      avatar_url: "",
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
      this.username = response.data.username;
      this.email = response.data.email;
      this.skill = response.data.skill;
    });
  },
  methods: {
    setFile: function(event) {
          if (event.target.files.length > 0 ) {
            this.image = event.target.files[0];
          }
        }, 
    submit: function() {
      console.log(this.username);
      console.log(this.email);
      var formData = new FormData();
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("skill", this.skill);
      formData.append("avatar", this.image);

      // var params = {
      //                username: this.user.username,
      //                email: this.user.email,
      //                skill: this.skill,
      //                avatar_url: this.user.avatar_url
      //               };


      axios.patch("/api/users/" + this.$route.params.id, formData).then(response => {
        this.$router.push("/users/" + this.$route.params.id);
      });
    },
    destroyUser: function() {
      console.log("Deleting user...");
      axios.delete("/api/users/" + this.user.id).then(response => {
        this.$router.push("/");
      });
    }
  }
};
</script>
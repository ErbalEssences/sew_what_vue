<template>
  <div class="users-edit">
    <h1>Edit user</h1>

    <ul>
      <li v-for="error in errors">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div>
        Username: <input v-model="user.username">
      </div>

      <div>
        Email: <input v-model="user.email">
      </div>
     <!--  <div>
        Profile Image: <input v-model="user.avatar_url">
      </div>
 -->
      <div>
        Profile Image: <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>



      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle m-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{user.skill}}
        </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div v-for="level in skillLevels">
              <a v-on:click="skill = level" class="dropdown-item" href="#">{{level}}</a>
            </div>
          </div>
      </div>
  

      <!-- <input type="submit" value="Update User"> -->
      <button class="btn btn-warning m-1" v-on:click="submit()">Update User</button>
      <button class="btn btn-warning m-1" v-on:click="destroyUser()">Delete User</button>

    </form>

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
      this.image = response.data.avatar;
      this.username = response.data.username;
      this.email = response.data.email;
      this.skill = response.data.skill;
      this.avatar_url = response.data.avatar_url;
    });
  },
  methods: {
    setFile: function(event) {
          if (event.target.files.length > 0 ) {
            this.image = event.target.files[0];
          }
        }, 
    submit: function() {
      var formData = new FormData();
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("skill", this.skill);
      formData.append("avatar_url", this.avatar_url);
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
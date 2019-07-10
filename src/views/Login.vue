<template>
  <div class="login">

        

<section id="login-register">
    <div class="container">
        <div class="row">
            <!-- login form 1 -->
                      <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                      </ul>
            <div class="col-sm-6">
                <div id="login-form">
                    <h3 class="log-title">LOG IN</h3>
                      <div class="form-group">
                        <label>Email:</label>
                        <input type="email" class="form-control" v-model="email">
                      </div>
                      <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" v-model="password">
                      </div>
                    <!-- log-line -->
                    <div class="log-line">
                        <!-- <div class="pull-left">
                            <div class="checkbox checkbox-primary space-bottom">
                                <label class="hide"><input type="checkbox"></label>
                                <input id="checkbox1" type="checkbox">
                                <label for="checkbox1"><span><strong>Remember Me</strong></span></label>
                            </div>
                        </div> -->
                        <div class="pull-right">
                          <button v-on:click="login()" type="submit" id="reg-submit" class="btn btn-md btn-primary-filled btn-log btn-rounded">Login</button>
                          <!-- <input type="login" class="btn btn-md btn-primary-filled btn-log btn-rounded" value="Log In"> -->




                            <!-- <a href="my-account.html" class="btn btn-md btn-primary-filled btn-log btn-rounded">Log In</a>
                            <div id="msgSubmit" class="h3 text-center hidden"></div>
                            <div class="clearfix"></div> -->
                        </div>
                    </div>
                    <!-- <a href="#x" class="forgot-password">Forgot your Password?</a> -->
                </div>
            </div><!-- / col-sm-6 -->

            <div class="col-sm-6">
                <div id="register-form">
                    <h3 class="log-title">REGISTER</h3>
                    <div class="form-group">
                      <label>Name:</label> 
                      <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                      <label>Email:</label>
                      <input type="email" class="form-control" v-model="newEmail">
                    </div>
                    <div class="form-group">
                      <label>Password:</label>
                      <input type="password" class="form-control" v-model="newPassword">
                    </div>
                    <div class="form-group">
                      <label>Password confirmation:</label>
                      <input type="password" class="form-control" v-model="passwordConfirmation">
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



                    <!-- log-line -->
                    <div class="log-line reg-form-1 no-margin">
                        <!-- <div class="pull-left">
                            <div class="checkbox checkbox-primary space-bottom">
                                <label class="hide"><input type="checkbox"></label>
                                <input id="checkbox2" type="checkbox">
                                <label for="checkbox2"><span><a href="#x">Terms & Conditions</a></span></label>
                            </div>
                        </div> -->
                        <div class="pull-right">
                            <!-- <input type="submit" class="btn btn-md btn-primary-filled btn-log btn-rounded" value="Submit"> -->
                            <!-- <input type="login" class="btn btn-md btn-primary-filled btn-log btn-rounded" value="Log In"> -->
                            <button v-on:click="submit()" type="submit" id="reg-submit" class="btn btn-md btn-primary-filled btn-log btn-rounded">Submit</button><!-- 
                            <div id="register-msgSubmit" class="h3 text-center hidden"></div>
                            <div class="clearfix"></div> -->
                        </div>
                    </div>
                </div>
            </div><!-- / col-sm-6 -->
            <!-- / register form 1 -->
        </div><!-- / row -->
        <!-- / form 1 -->
    </div><!-- / container -->
</section>



  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      newEmail: "",
      skill: "Skill Level",
      image: "",
      newPassword: "",
      password: "",
      passwordConfirmation: "",
      skillLevels: ["Beginner", "Intermediate", "Experienced"],
      errors: [],
      image: ""
    };
  },
  methods: {
    submit: function() {
      var formData = new FormData();
        formData.append("username", this.username);
        formData.append("email", this.newEmail);
        formData.append("skill", this.skill);
        formData.append("password", this.newPassword);
        formData.append("passwordConfirmation", this.passwordConfirmation);
        // formData.append("avatar_url", this.avatar_url);
        formData.append("avatar", this.image);
        formData.append("admin", false);

      this.email = this.newEmail  
      this.password = this.newPassword
      
      axios
        .post("/api/users", params)
        .then(response => {
          this.login();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },

    login: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          this.$parent.userId = response.data.user_id;

          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    setFile: function(event) {
          if (event.target.files.length > 0 ) {
            this.image = event.target.files[0];
          }
        }, 
  }
};
</script>
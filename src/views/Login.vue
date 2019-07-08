<template>
  <div class="login">



<section id="login-register">
    <div class="container">
        <div class="row">
            <!-- login form 1 -->
            <div class="col-sm-6">
                <div id="login-form">
                    <h3 class="log-title">LOG IN</h3>
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" placeholder="USERNAME" required data-error="*Please fill out this field">
                        <div class="help-block with-errors"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="password" placeholder="PASSWORD" required>
                        <div class="help-block with-errors"></div>
                    </div>
                    <!-- log-line -->
                    <div class="log-line">
                        <div class="pull-left">
                            <div class="checkbox checkbox-primary space-bottom">
                                <label class="hide"><input type="checkbox"></label>
                                <input id="checkbox1" type="checkbox">
                                <label for="checkbox1"><span><strong>Remember Me</strong></span></label>
                            </div>
                        </div>
                        <div class="pull-right">
                            <a href="my-account.html" class="btn btn-md btn-primary-filled btn-log btn-rounded">Log In</a>
                            <div id="msgSubmit" class="h3 text-center hidden"></div>
                            <div class="clearfix"></div>
                        </div>
                    </div><!-- / log-line -->
                    <a href="#x" class="forgot-password">Forgot your Password?</a>
                </div>
            </div><!-- / col-sm-6 -->
            <!-- / login form 1 -->

            <!-- register form 1 -->
            <div class="col-sm-6">
                <div id="register-form">
                    <h3 class="log-title">REGISTER</h3>
                    <div class="form-group">
                        <input type="text" class="form-control" id="register-email" placeholder="EMAIL" required data-error="*Please fill out this field">
                        <div class="help-block with-errors"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="register-username" placeholder="USERNAME" required>
                        <div class="help-block with-errors"></div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="register-password" placeholder="PASSWORD" required data-error="*Please fill out this field">
                        <div class="help-block with-errors"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="register-cpassword" placeholder="CONFIRM PASSWORD" required>
                        <div class="help-block with-errors"></div>
                    </div>
                    <!-- log-line -->
                    <div class="log-line reg-form-1 no-margin">
                        <div class="pull-left">
                            <div class="checkbox checkbox-primary space-bottom">
                                <label class="hide"><input type="checkbox"></label>
                                <input id="checkbox2" type="checkbox">
                                <label for="checkbox2"><span><a href="#x">Terms & Conditions</a></span></label>
                            </div>
                        </div>
                        <div class="pull-right">
                            <button type="submit" id="reg-submit" class="btn btn-md btn-primary-filled btn-log btn-rounded">Register</button>
                            <div id="register-msgSubmit" class="h3 text-center hidden"></div>
                            <div class="clearfix"></div>
                        </div>
                    </div><!-- / log-line -->
                </div>
            </div><!-- / col-sm-6 -->
            <!-- / register form 1 -->
        </div><!-- / row -->
        <!-- / form 1 -->
    </div><!-- / container -->
</section>







    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    this.$parent.userId = null;

    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.$router.push("/");
  }
};
</script>
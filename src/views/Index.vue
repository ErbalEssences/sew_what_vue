<template>
  <div class="home">
    <h1>{{ message }}</h1>
    {{patterns}}
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Sew What",
      patterns: []
    };
  },
  created: function() {
            var params = { 
                            top_50: true
                         };
            axios.get("/api/patterns/", params ).then(response => {
              this.patterns = response.data;
            });
  },

  methods: {}
};
</script>

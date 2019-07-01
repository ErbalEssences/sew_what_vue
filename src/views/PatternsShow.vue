<template>
  <div class="pattern-show">

      <div v-for="image in pattern.images.main_images[0]">
        <img v-bind:src="image.url" class="show-img" alt="">
        <!-- <img v-bind:src="image.file" class="img-fluid show-user-img"> -->
      </div>
      
      <h1>{{ pattern.name }}</h1>
      <h1>Brand</h1>
      <h1>{{ pattern.display_name }}</h1>

      <div v-if="userId !== 0" class="dropdown">
        <button v-if="userId !== 0" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Add to Closet
        </button>

          <div v-if="userId !== 0" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div v-for="closet in user.closets">
              <a v-on:click="addToCloset(pattern.id, closet.id)" class="dropdown-item" href="#">{{closet.name}}</a>
            </div>
          </div>
          <h4 v-if="userId !== 0" >Make New Closet and Add</h4>
          <form  v-if="userId !== 0"  class="form-inline">
            <div  v-if="userId !== 0"  class="form-group mx-sm-1 mb-3">
              <label  v-if="userId !== 0"  for="inputname2" class="sr-only">Name</label>
              <input  v-if="userId !== 0"  class="form-control" v-model="new_name" placeholder="Closet Name">
            </div>
            <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeCloset(pattern.id)">Confirm Closet</button>
          </form>
      </div>

      <h3>{{ pattern.price }}</h3>
      <h3>sewing rating</h3>
      <h3>{{ pattern.description }}</h3>
      <h3>Owned?</h3>


      <div v-for="tag in pattern.tags">
        <h5>{{ tag.name }}</h5>
      </div>
      

      <div v-if="pattern.out_of_print === true">
        <h3>Out of Print}</h3>
      </div>

      <div v-if="pattern.url">
        <a class="btn btn-warning m-1" v-bind:href="pattern.url">Go to the Site</a>
      </div>


      <div>
        <img v-bind:src="pattern.images.line_art.url" class="show-img" alt="">
      </div>

      <h3>Pattern Info</h3>

      <form  v-if="userId !== 0"  class="form-inline">


        <div v-if="userId !== 0" class="form-group">
          <textarea v-if="userId !== 0" class="form-control" id="exampleFormControlTextarea1" v-model="new_note" placeholder="New Note" rows="3"></textarea>
        </div>

        <div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="public" value="true" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Public
            </label>
          </div>

          <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeNote(pattern.id, userId)">Confirm Note</button>
        </div>
      </form>

      <h4  v-if="userId !== 0"  >Private Notes</h4>
      <div  v-if="userId !== 0" v-for="note in pattern.private_notes">
        <h5  v-if="userId !== 0" >{{note.username}}: {{note.body}}</h5>
      </div>
      <h4>Public Notes</h4>
      <div v-for="note in pattern.public_notes">
        <h5>{{note.username}}: {{note.body}}</h5>
      </div>

      <h4>User Images</h4>
      <div v-for="image in pattern.images.user_images">
        

        <div class="card m-2" style="width: 10rem;">

          <img class="card-img-top" v-bind:src="image.url" alt="Pattern Image">
          <!-- <img v-bind:src="image.file" class="img-fluid show-user-img"> -->

          <div class="card-body">
            <h5>{{image.username}}</h5>
            <h5>Skill:</h5>
            <h5>{{image.user_skill}}</h5>
            <h5>{{image.user_id}}</h5>
            <h5>{{userId}}</h5>
            <button v-if="userId === image.user_id" type="submit" class="btn btn-warning m-1" v-on:click="destroyimage(image.id)">Delete Image</button>
          </div>

        </div>

      </div>
  </div>
</template>

<style>

img.show-img {
  max-width: 400px;
}

</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      pattern: [],
      new_name: "",
      new_note: "",
      user: {},
      public: false,
      userId: 0
    };
  },
  created: function() {
    this.userId = localStorage.getItem("userId");

    axios.get("/api/patterns/" + this.$route.params.id ).then(response => {
      this.pattern = response.data;
    });
    axios.get("/api/users/"  + this.userId ).then(response => {
      this.user = response.data;
    });
  },
  methods: {  
                makeNote: function(pattern, userId) {
                    console.log("Creating the note...");

                    var params = { 
                                    body: this.new_note,
                                    pattern_id: pattern,
                                    user_id: userId,
                                    public: this.public
                                 };

                    axios.post("/api/notes", params)
                        this.addToCloset(pattern, response.data.id)
                          .catch(error => {
                            this.errors = error.response.data.errors;
                          });
                  },

              makeCloset: function(pattern) {
                    console.log("Creating the closet...");
                    console.log(pattern);

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.post("/api/closets", params)
                      .then(response => {
                        this.addToCloset(pattern, response.data.id);
                      })
                      .catch(error => {
                        this.errors = error.response.data.errors;
                      });
                  },

              addToCloset: function(pattern, closet) {
                    console.log("Creating the join...");

                    var params = { 
                                    pattern_id: pattern,
                                    closet_id: closet
                                 };

                    axios.post("/api/closet_patterns", params).catch(error => {
                      this.errors = error.response.data.errors;
                    });
                  } 
  },
};
</script>
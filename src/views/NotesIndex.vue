<template>
  <div class="notes-show">
        <div v-for="note in notes">
          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="note.image" alt="Pattern Image">
            <h2>{{note.pattern_name}}</h2>


        


        <form  v-if="userId !== 0"  class="form-inline">

          <div v-if="userId !== 0" class="form-group">
            <textarea v-if="userId !== 0" class="form-control" id="exampleFormControlTextarea1" v-model="note.body" placeholder="New Note" rows="3"></textarea>
          </div>

          <div>

            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="note.public" value="note.public" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Public
              </label>
            </div>

            <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeNote(pattern.id, userId)">Confirm Note Changes</button>
          </div>
      </form>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/patterns/' + note.pattern_id ">To Pattern</router-link>
              <!-- <button type="submit" class="btn btn-warning m-1" v-on:click="editNote(note.id)">Edit Note</button> -->
              <button type="submit" class="btn btn-warning m-1" v-on:click="destroyNote(note.id)">Delete Note</button>
            </div>

          </div>
        </div>

  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      notes: [],
      new_note: "",
      public: false,
      userId: 0
    };
  },
  created: function() {

    this.userId = localStorage.getItem("userId");
    
    axios.get("/api/notes" ).then(response => {
      this.notes = response.data;
      this.public = response.data.public;
    });

  },
  methods: { 
            destroyNote: function(remove_id) {
                  console.log("deleting note");
                  axios.delete("/api/notes/" + remove_id).then(response => {
                                  this.$router.push("/notes/");
                  });
                },


  },
};
</script>
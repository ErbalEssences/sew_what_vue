<template>
  <div class="notes-show">






<div id="shopping-cart">
    <div class="container">
        <!-- shopping cart table -->
        <table class="shopping-cart">
            <thead>
                <tr>
                    <th class="image">&nbsp;</th>
                    <th>Pattern</th>
                    <th>Note</th>
                    <th>Public</th>
                    <th>Make Changes</th>
                    <th>Delete Note</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="note in notes" class="cart-item">
                    <td class="image"><a href="#"><img v-bind:src="note.image" alt=""></a></td>
                    <td><a v-bind:href=" '/patterns/' + note.pattern_id">{{note.pattern_name}}</a></td>
                    <td><textarea v-if="userId !== 0" class="form-control" id="exampleFormControlTextarea1" v-model="note.body" placeholder="New Note" rows="3"></textarea></td>
                    <td><div class="form-check">
                          <input class="form-check-input" type="checkbox" v-model="note.public" value="note.public" id="defaultCheck1">
                          <label class="form-check-label" for="defaultCheck1">
                            Public
                          </label>
                        </div></td>
                    <td class="add"><a href="#x" v-on:click="editNote(note.id, note.body, note.public)" class="btn btn-success-filled √-add">√</a></td>
                    <td class="remove"><a href="#x" v-on:click="destroyNote(note.id)" class="btn btn-danger-filled x-remove">×</a></td>
                </tr>
            </tbody>
        </table>
        <!-- / shopping cart table -->

    </div><!-- / container -->
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
            editNote: function(edit_id, n_body, n_public) {
                  console.log("editing note");
                  var params = { 
                                    body: n_body,
                                    public: n_public
                                 };
                  axios.patch("/api/notes/" + edit_id, params).then(response => {
                                  this.$router.push("/notes/");
                  });
                },
            destroyNote: function(remove_id) {
                  console.log("deleting note");
                  axios.delete("/api/notes/" + remove_id).then(response => {
                                  this.$router.push("/notes/");
                  });
                },


  },
};
</script>
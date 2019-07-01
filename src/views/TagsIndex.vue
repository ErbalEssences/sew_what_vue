<template>
  <div class="tags-show">
      <h4>Make New Tag</h4>
      <form class="form-inline">
        <div class="form-group m-1">
          <label for="inputname2" class="sr-only">Name</label>
          <input class="form-control" v-model="new_name" placeholder="Tag Name">
        </div>

          <div class="dropdown">
            <button class="btn btn-warning dropdown-toggle m-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{tag_new}}
            </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div v-for="category in tagCategories">
                  <a v-on:click="tag_new = category" class="dropdown-item" href="#">{{category}}</a>
                </div>
              </div>
          </div>


        <button type="submit" class="btn btn-warning m-1" v-on:click="makeTag()">Confirm Tag</button>
      </form>



      <div>
        Search by Name: <input v-model="nameFilter">
      </div>

      <div>
        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('name')">
          {{ isAscending('name') }} 
          Sort by Name
        </button>
      </div>

        <div class="col-sm-4" v-for="tag in orderBy(filterBy(tags, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="tag.id">

          <!-- <div class="card m-4" style="width: 18rem;"> -->

            <div class="card-body">
            <h2>{{tag.name}}</h2>
              <div class="form-group mx-sm-1 mb-3">
                <label for="inputname2" class="sr-only">Name</label>
                <input class="form-control" v-model="tag.name" placeholder="New Tag Name">
              </div>

              <!-- <div class="form-group mx-sm-1 mb-3">
                <label for="inputcategory2" class="sr-only">Category</label>
                <input class="form-control" v-model="new_category" placeholder="New Tag Category">
              </div> -->
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{tag.category}}
                </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div v-for="category in tagCategories">
                      <a v-on:click="tag.category = category" class="dropdown-item" href="#">{{category}}</a>
                    </div>
                  </div>
              </div>

              <button type="submit" class="btn btn-warning m-1" v-on:click="editTag(tag.id, tag.name, tag.category)">Confirm</button>

              <button type="submit" class="btn btn-warning m-1" v-on:click="destroytag(tag.id)">Delete tag</button>
            </div>

          </div>
        </div>

  </div>
</template>

<style>
</style>

<script>
import Vue2Filters from 'vue2-filters';
var axios = require('axios');

export default {
  data: function() {
    return {
      tags: [],
      userId: 0,
      new_name: "",
      nameFilter: "",
      tag_new: "",
      displayNameFilter: "",
      tagCategories: ["Brand", "Main", "Subcategory", "Designer", "Collections", "Details", "Difficulty"],
      sortAttribute: "name",
      sortAscending: 1
    };
  },
  created: function() {

    this.userId = localStorage.getItem("userId");
    
    axios.get("/api/tags").then(response => {
      this.tags = response.data;
    });
  },
  methods: { 
            destroytag: function(remove_id) {
                  console.log("deleting tag");
                  axios.delete("/api/tags/" + remove_id).then(response => {
                                  this.$router.push("/tags/");
                  });
                },
            editTag: function(edit_id, name, category) {
                    console.log("Editing the Tag...");
                    console.log(category);

                    var params = { 
                                    name: name,
                                    category: category
                                 };

                    axios.patch("/api/tags/" + edit_id, params).then(response => {
                      this.tag = response.data;
                    });   
                },
            makeTag: function() {
                    console.log("Creating the tag...");

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.post("/api/tags", params).then(response => {
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
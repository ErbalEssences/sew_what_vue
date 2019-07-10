<template>
  <div class="closet-show">
    <div class="container">


    <div id="header-banner">
        <div class="banner-content single-page text-center">
            <div class="banner-border">
                <div class="banner-info">
                    <h1>{{ closet.name}}</h1>
                </div><!-- / banner-info -->
            </div><!-- / banner-border -->
        </div><!-- / banner-content -->
    </div>



<!-- shop right-sidebar -->
      <section id="shop" class="space-top-30">
          <div class="container">
              <div class="row">

                  <div class="col-sm-8 col-md-9 content-area">
                      
                      <ul class="row shop list-unstyled" id="grid">

<!-- {{closet.closet_patterns[0]}} -->
                          <!-- <div v-for="join in closet.closet_patterns" v-bind:key="closet.id"> -->
                          <div v-for="join in orderBy(filterBy(closet.closet_patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="closet.id">
                    
                          <!-- product -->
                            <li class="col-xs-6 product m-product">
                                <div class="img-bg-color primary">
                                    <h5 class="product-price">{{join.pattern_name}}</h5>
                                    <a v-bind:href="'/patterns/' + join.pattern_id" class="product-link"></a>
                                    <!-- / product-link -->
                                    <img  v-if="join.images[0]" v-bind:src="join.images[0].url" alt="">
                                    <img  v-else v-bind:src="pattern_photo" alt="No Photo">

                                    <!-- / product-image -->

                                    <!-- product-hover-tools -->
                                    <div class="product-hover-tools">
                                        <a v-bind:href="'/patterns/' + join.pattern_id" class="view-btn" data-toggle="tooltip" title="View Product">
                                            <i class="lnr lnr-eye"></i>
                                        </a>
                                        <a href="shopping-cart.html" v-on:click="destroyClosetPattern()" class="cart-btn" data-toggle="tooltip" title="Add to Cart">
                                            <i class="lnr lnr-trash"></i>
                                        </a>
                                    </div><!-- / product-hover-tools -->

                                    <!-- product-details -->
                                    <div class="product-details">
                                      <h5 class="product-title">{{join.pattern_name}}</h5>
                                      <p class="product-category">{{join.pattern_display_name}}</p>

                                    </div>
                                </div><!-- / img-bg-color -->
                            </li>
                          </div>
                            <!-- / product -->

                          <!-- sizer -->
                          <li class="col-xs-6 shuffle_sizer"></li>
                          <!-- / sizer -->

                      </ul> <!-- / products -->


                  </div><!-- / content-area -->

                  <div class="col-sm-4 col-md-3 sidebar-area">

                      <!-- filter-by-price widget -->
          
                      <!-- / widget -->

                      <!-- price-filter widget -->
                      <div class="price-filter widget">
                          <h5 class="widget-title">Name Filter</h5>

                          <div>
                            Search by Name <input v-model="nameFilter">
                          </div>
                            <div>

                              <button class="btn btn-primary mx-sm-1 mb-3" v-on:click="setSortAttribute('name')">
                                <i v-bind:class="isAscending('name')"></i>
                                Sort by Name
                              </button>
                            </div>                   
                      </div>

                      <div class="price-filter widget">
                          <h5 class="widget-title">Make New Closet</h5>
                          <form class="form-inline">
                            <div class="form-group mx-sm-1 mb-3">
                              <label for="inputname2" class="sr-only">Name</label>
                              <input class="form-control" v-model="new_name" placeholder="Closet Name">
                            </div>
                            <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeCloset()">Confirm Closet</button>

                          </form>
                        </div>

                  </div><!-- / sidebar-area -->

            </div>

          </div>
      </section>
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
      closet: {closet_patterns: {images: []}},
      new_name: "",
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1,
      userId: 0

    };
  },
  created: function() {
    this.userId = localStorage.getItem("userId");

    axios.get("/api/closets/" + this.$route.params.id ).then(response => {
      this.closet = response.data;
    });
  },
  methods: {
    destroyCloset: function(remove_id) {
      console.log("Removing Closet...");
      console.log(this.userId);
      axios.delete("/api/closets/" + this.closet.id).then(remove_id => {
        this.$router.push("/users/" + this.userId);
      });
    },

    destroyClosetPattern: function(remove_id) {
      console.log("Removing Pattern From Closet...");
      axios.delete("/api/closet_patterns/" + remove_id).then(response => {
      this.closet = response.data;
      });
    },
    editCloset: function() {
                    console.log("Editing the Closet...");

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.patch("/api/closets/" + this.$route.params.id, params).then(response => {
                      this.closet = response.data;
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
            return this.sortAscending === 1 ? "lnr lnr-arrow-up-circle" : "lnr lnr-arrow-down-circle";
          }
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
            return this.sortAscending === 1 ? "lnr lnr-arrow-up-circle" : "lnr lnr-arrow-down-circle";
          }
        },
  },
  mixins: [Vue2Filters.mixin]             
};
</script>
<template>
  <div class="closet-patterns-index">
    <div class="container">


    <div id="header-banner">
        <div class="banner-content single-page text-center">
            <div class="banner-border">
                <div class="banner-info">
                    <h1>All User Patterns</h1>
                </div><!-- / banner-info -->
            </div><!-- / banner-border -->
        </div><!-- / banner-content -->
    </div>
    <!-- / header-banner -->
<!-- / header -->

<!-- content -->

<!-- shop right-sidebar -->
<section id="shop" class="space-top-30">
    <div class="container">

        <div class="row">
    

            <div class="col-sm-8 col-md-9 content-area">
                <ul class="row shop list-unstyled" id="grid">

                    <div v-for="join in closet_patterns">

                    <!-- product -->
                      <li class="col-xs-6 product m-product">
                          <div class="img-bg-color primary">
                              <h5 class="product-price">{{join.closet}}</h5>
                              <a v-bind:href="'/patterns/' + join.pattern_id" class="product-link"></a>
                              <!-- / product-link -->
                              <img  v-if="join.images[0].url" v-bind:src="join.images[0].url" alt="">
                              <img  v-else v-bind:src="closet_photo" alt="No Photo">


                              <div class="product-hover-tools">
                                  <a v-bind:href="'/patterns/' + join.pattern_id" class="view-btn" data-toggle="tooltip" title="View Product">
                                      <i class="lnr lnr-eye"></i>
                                  </a>
                                  <a v-on:click="destroyClosetPattern(join.id)" class="cart-btn" data-toggle="tooltip" title="Remove From Closet">
                                      <i class="lnr lnr-trash"></i>
                                  </a>
                              </div><!-- / product-hover-tools -->
                              <!-- product-details -->
                              <div class="product-details">
                                  <h5 class="product-title">{{join.pattern_name}}</h5>
                                  <p class="product-category">{{join.pattern_display_name}}</p>
                                  <!-- <p class="product-category">{{pattern.tags.brand}}</p> -->
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




        </div><!-- / row -->
    </div><!-- / container -->
</section>





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
      closet_patterns: [],
      sortBy: "sort_name=asc",
      new_name: "",
      userId: 0,
      nameFilter: null,
      tagSubFilter: null,
      tagNameFilter: null,
      displayNameFilter: null,
      out_of_print: null,
      tagList: [],
      pageNumber: 1,
      offsetNumber: 0,

      priceLow: null,
      priceHigh: null,
      tags: {
              "brand": [],
              "designer": [],
              "collections": [],
              "details": [],
              "difficulty": []
            }
    };
  },
  created: function() {
    this.userId = localStorage.getItem("userId");

    axios.get("/api/closet_patterns").then(response => {
      this.closet_patterns = response.data;
    });
    axios.get("/api/tags/by_category").then(response => {
      this.$router.push(
      this.tags = response.data);
    });
  },
  methods: {
    
    destroyClosetPattern: function(remove_id) {
      console.log("Removing Pattern From Closet...");
      console.log(remove_id);
      axios.delete("/api/closet_patterns/" + remove_id).then(response => {
                      this.closet_patterns = response.data;
      });
    },
    sendNumber: function(input_number) {  
                    this.pageNumber = input_number
                    this.offsetNumber = ((input_number - 1) * 30);
                    console.log(input_number);

                    this.reloadPatterns();
                  },
    
    
  },
};
</script>
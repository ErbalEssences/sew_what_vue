<template>
  <div class="pattern-index">

      <div>
        Search by Name: <input v-model="nameFilter">
      </div>
      <div>
        Search by Display Name: <input v-model="displayNameFilter">
      </div>

      <div>
        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('name')">
          {{ isAscending('name') }} 
          Sort by Name
        </button>

        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('price')">
          <span v-if="sortAttribute === 'price' && sortAscending === 1 ">^</span> 
          <span v-else-if="sortAttribute === 'price' && sortAscending === -1 ">v</span> 
          Sort by Price
        </button>
      </div>
      




        <div class="col-sm-4" v-for="pattern in orderBy(filterBy(patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="pattern.id">


          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="pattern.images.main_images[0].url" alt="Pattern Image">
            <!-- <img v-bind:src="pattern.images.main_images[0].file" class="img-fluid show-user-img"> -->
      


            <h2>{{pattern.name}}</h2>
            <h2>Brand</h2>
            <h3>{{pattern.display_name}}</h3>
            <h3>{{pattern.price}}</h3>

            <div class="card-body">
              <router-link class="btn btn-warning m-1" v-bind:to=" '/patterns/' + pattern.id ">To Pattern</router-link>
              <a class="btn btn-warning m-1" v-bind:href="pattern.url">Go to the Site</a>
            </div>


            <div v-if="userId !== 0" class="card-body">
              <div v-if="userId !== 0" class="dropdown">
                <button v-if="userId !== 0" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Closet
                </button>
                  <div v-if="userId !== 0" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div v-for="closet in user.closets">
                      <a v-on:click="addToCloset(closet.id, pattern.id)" class="dropdown-item" href="#">{{closet.name}}</a>
                    </div>
                  </div>

                  <h5 v-if="userId !== 0" >Make New Closet and Add</h5>
                    <form  v-if="userId !== 0"  class="form-inline">
                      <div  v-if="userId !== 0"  class="form-group mx-sm-1 mb-3">
                        <label  v-if="userId !== 0"  for="inputname2" class="sr-only">Name</label>
                        <input  v-if="userId !== 0"  class="form-control" v-model="new_name" placeholder="Closet Name">
                      </div>
                      <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeCloset(pattern.id)">Confirm Closet</button>

                    </form>
                  
              </div>
            </div>

          </div>

        </div>

<!--   </div>
</template> -->
<!-- 


      <div>
        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('name', 1)">
          {{ isAscending('name') }} 
          Sort by Name
        </button>

        <button class="btn btn-warning m-1" v-on:click="setSortAttribute('price')">
          <span v-if="sortAttribute === 'price' && sortAscending === 1 ">^</span> 
          <span v-else-if="sortAttribute === 'price' && sortAscending === -1 ">v</span> 
          Sort by Price
        </button>
      </div>
    

 -->
<!-- shop right-sidebar -->
<section id="shop" class="space-top-30">
    <div class="container">
        <div class="row">

            <div class="col-sm-8 col-md-9 content-area">
                <p class="shop-results space-left">Showing <strong>1-8</strong> of <strong>36</strong> items. 
                    <span class="pull-right space-right">
                        <select class="selectpicker">
                            <optgroup label="Sort By:">
                                <option >Default</option>
                                <option >Reverse</option>
                                <option >Price Low to High</option>
                                <option >Price High to Low</option>
<!--                                 <option>Popularity</option>
                                <option>Newness</option>
                                <option>Rating</option> -->
                            </optgroup>
                        </select>
                    </span>
                </p>
                <ul class="row shop list-unstyled" id="grid">


                    <!-- <div v-for="pattern in orderBy(filterBy(patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="pattern.id"> -->
                    <div v-for="pattern in patterns">

                    <!-- product -->
                      <li class="col-xs-6 product m-product" data-groups='["bedroom"]'>
                          <div class="img-bg-color primary">
                              <h5 class="product-price">${{pattern.price}}</h5>
                              <a v-bind:href="'/patterns/' + pattern.id" class="product-link"></a>
                              <!-- / product-link -->
                              <img v-bind:src="pattern.images.main_images[0].url" alt="">
                              <!-- / product-image -->
<!-- v-bind:to=" '/patterns/' + pattern.id"
v-bind:href="'/patterns/' + pattern.id"  -->
                              <!-- product-hover-tools -->
                              <div class="product-hover-tools">
                                  <a v-bind:href="'/patterns/' + pattern.id" class="view-btn" data-toggle="tooltip" title="View Product">
                                      <i class="lnr lnr-eye"></i>
                                  </a>
                                  <a href="shopping-cart.html" class="cart-btn" data-toggle="tooltip" title="Add to Cart">
                                      <i class="lnr lnr-cart"></i>
                                  </a>
                              </div><!-- / product-hover-tools -->

                              <!-- product-details -->
                              <div class="product-details">
                                  <h5 class="product-title">{{pattern.name}}</h5>
                                  <p class="product-category">{{pattern.display_name}}</p>
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

                <div class="text-center more-button space-top-30">
                    <a href="#x" class="btn btn-default-filled"><i class="lnr lnr-sync"></i><span>LOAD MORE</span></a>
                </div>

            </div><!-- / content-area -->

            <div class="col-sm-4 col-md-3 sidebar-area">

                <!-- filter-by-price widget -->
                <div class="widget">
                    <h5 class="widget-title">FILTER BY PRICE</h5>

                    <div id="range-slider" class="noUi-target noUi-rtl noUi-horizontal">
                    </div><!-- / range-slider -->

                    <div class="range-filter">
                        <div class="column filter-button">
                            <button type="submit" class="btn btn-xs btn-default-filled btn-rounded">FILTER</button>
                        </div><!-- / filter-button -->
                        <div class=" column range-values">
                            <p>$<span class="value" id="range-slider-value-min"></span> - $<span class="value" id="range-slider-value-max"></span></p>
                        </div>     <!-- / range-values -->
                    </div><!-- / range-filter -->
                    <!-- / filter-by-price widget -->
                </div>
                <!-- / widget -->

                <!-- price-filter widget -->
                <div class="price-filter widget">
                    <h5 class="widget-title">Name Filter</h5>

                    <div>
                      Search by Name: <input v-model="nameFilter">
                    </div>
                    <div>
                      Search by Display Name: <input v-model="displayNameFilter">
                    </div>

                    <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="refreshCreated()">Confirm Search</button>





                </div>

                <div class="price-filter widget">
                    <h5 class="widget-title">Brand Filter</h5>

                    <p class="filter-item">
                      <input class="form-check-input" type="checkbox" v-on:click="tag_list << 'Mccalls'" value="true" id="defaultCheck1">
                      <label class="form-check-label" for="defaultCheck1">
                        Mccalls
                      </label>
                    </p>

                    <p class="filter-item">
                      <input class="form-check-input" type="checkbox" v-on:click="tag_list << 'Butterick'" value="true" id="defaultCheck1">
                      <label class="form-check-label" for="defaultCheck1">
                        Butterick
                      </label>
                    </p>

                    <p class="filter-item">
                      <input class="form-check-input" type="checkbox" v-on:click="tag_list << 'Vogue'" value="true" id="defaultCheck1">
                      <label class="form-check-label" for="defaultCheck1">
                        Vogue
                      </label>
                    </p>
                </div>

                <div class="price-filter widget">
                    <h5 class="widget-title">Main Filter</h5>

                    <p class="filter-item">
                      <input class="form-check-input" type="checkbox" v-model="tag_list" value="true" id="defaultCheck1">
                      <label class="form-check-label" for="defaultCheck1">
                        Public
                      </label>
                    </p>

                </div>
                <!-- / price-filter widget -->

                <!-- color-filter widget -->
          <!--       <div class="color-filter widget">
                    <h5 class="widget-title">COLOR FILTER</h5>

                    <p class="color filter-item">
                        <a href="#"><span class="color-red"></span> Red</a>
                    </p><

                    <p class="color filter-item">
                        <a href="#"><span class="color-green"></span> Green</a>
                    </p><

                    <p class="color filter-item">
                        <a href="#"><span class="color-blue"></span> Blue</a>
                    </p><

                    <p class="color filter-item">
                        <a href="#"><span class="color-black"></span> Black</a>
                    </p><

                    <p class="color filter-item">
                        <a href="#"><span class="color-white"></span> White</a>
                    </p><

                </div> -->
                <!-- / color-filter widget -->

                <!-- categries widget -->
                <div class="categories-sidebar-widget widget no-border">
                    <h5 class="widget-title">CATEGORIES</h5>

                    <p class="product-category">
                        <a href="#">Fashion</a>
                        <span class="pull-right">(16)</span>
                    </p><!-- / category -->

                    <p class="product-category">
                        <a href="#">Furniture</a>
                        <span class="pull-right">(9)</span>
                    </p><!-- / category -->

                    <p class="product-category">
                        <a href="#">Tech</a>
                        <span class="pull-right">(11)</span>
                    </p><!-- / category -->

                </div>
                <!-- / categories-sidebar-widget -->

                <!-- tags-sidebar-widget -->
                <div class="tags-sidebar-widget widget">
                    <div class="widget-title">
                        <h5 class="widget-title">PRODUCT TAGS</h5>
                    </div>
                    <p>
                        <a href="#" class="btn btn-xs btn-primary-filled">Fashion</a>
                        <a href="#" class="btn btn-xs btn-primary-filled">Furniture</a>
                        <a href="#" class="btn btn-xs btn-primary-filled">Tech</a>
                        <a href="#" class="btn btn-xs btn-primary-filled">Webshop</a>
                        <a href="#" class="btn btn-xs btn-primary-filled">Online Store</a>
                    </p>
                </div>
                <!-- / tags-sidebar-widget -->

            </div><!-- / sidebar-area -->

        </div><!-- / row -->
    </div><!-- / container -->
</section>
<!-- / shop right sidebar -->
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
      patterns: [],
      user: {},
      new_name: "",
      userId: 0,
      nameFilter: null,
      displayNameFilter: null,
      out_of_print: null,
      sortAttribute: "name",
      tag_list: [],
      sortAscending: 1
    };
  },
  created: function() {
                    this.userId = localStorage.getItem("userId");

                    axios.get("/api/patterns" ).then(response => {
                      this.patterns = response.data;
                    });
                    axios.get("/api/users/" + this.userId ).then(response => {
                      this.user = response.data;
                    });
  },
  methods: { 
      refreshCreated: function() {

                    console.log("Creating search...");

                    axios.get("/api/patterns", {
                                params:{
                                    name_search: this.nameFilter,
                                    display_name_search: this.displayNameFilter,
                                    tag_name_search: this.tag_list,
                                    out_of_print_search: this.out_of_print
                                                }
                                      })
                    .then(response => {
                      this.patterns = response.data;
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

        addToCloset: function(closet, pattern) {
                    console.log("Adding to the Closet...");

                    var params = { 
                                    pattern_id: pattern,
                                    closet_id: closet
                                 };

                    axios.post("/api/closet_patterns", params).then(response => {
                      this.$router.push(this.user = response.data );
                    }).catch(error => {
                      this.errors = error.response.data.errors;
                    });
                  },

        // setSortAttribute: function(inputAttribute) {
        //   if (this.sortAttribute === inputAttribute) {
        //     this.sortAscending *= -1;
        //   } else {
        //     this.sortAscending = 1;
        //   }
        //   this.sortAttribute = inputAttribute;
        // },

        setSortAttribute: function(inputAttribute, sortNumber) {
          this.sortAscending = sortNumber;
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
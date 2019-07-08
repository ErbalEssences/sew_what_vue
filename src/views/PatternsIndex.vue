<template>
  <div class="pattern-index">
<!-- 
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
 -->

       <!--  <div class="col-sm-4" v-for="pattern in orderBy(filterBy(patterns, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="pattern.id">


          <div class="card m-4" style="width: 18rem;">

            <img class="card-img-top" v-bind:src="pattern.images.main_images[0].url" alt="Pattern Image"> -->
            <!-- <img v-bind:src="pattern.images.main_images[0].file" class="img-fluid show-user-img"> -->
      

<!-- 
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

        </div> -->

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
      <ul class="pagination">
        <template v-for="number in patterns[0].numbers">
          <li v-if="number == '...' && number != pageNumber" class="disabled"><a>{{number}}</a></li>
          <li v-if="number == pageNumber" class="active"><a>{{number}}</a></li>
          <li v-if="number != '...' && number != pageNumber" v-on:click="sendNumber(number)"><a>{{number}}</a></li>
        </template>
      </ul>
        <div class="row">
    

            <div class="col-sm-8 col-md-9 content-area">
                <p class="shop-results space-left">Showing <strong>{{(offsetNumber + 1)}}-{{(offsetNumber + 30)}}</strong> of <strong>{{patterns[0].count}}</strong> items. 
                    <span class="pull-right space-right">
                        <select v-on:change="reloadPatterns()" class="selectpicker" v-model="sortBy">
                            <optgroup label="Sort By:">

                                <option value="sort_name=asc" >Default</option>
                                <option value="sort_name=desc" >Reverse</option>
                                <option value="sort_price=asc" >Price Low to High</option>
                                <option value="sort_price=desc" >Price High to Low</option>

<!--                            <option>Popularity</option>
                                <option>Newness</option>
                                <option>Rating</option> -->
                            </optgroup>
                        </select>
                    </span>
                </p>
                <ul class="row shop list-unstyled" id="grid">

                    <div v-for="pattern in patterns">

                    <!-- product -->
                      <li class="col-xs-6 product m-product" data-groups='["bedroom"]'>
                          <div class="img-bg-color primary">
                              <h5 v-if="pattern.price" class="product-price">{{pattern.price}}</h5>
                              <h5 v-else class="product-price">Out of Print</h5>
                              <a v-bind:href="'/patterns/' + pattern.id" class="product-link"></a>
                              <!-- / product-link -->
                              <img  v-if="pattern.images.main_images[0]" v-bind:src="pattern.images.main_images[0].url" alt="">
                              <img  v-else v-bind:src="closet_photo" alt="No Photo">

                              <!-- / product-image -->

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


<!--  class="active" -->
<!-- class="disabled" -->
                <ul class="pagination">
                  <template v-for="number in patterns[0].numbers">
                    <li v-if="number == '...' && number != pageNumber" class="disabled"><a>{{number}}</a></li>
                    <li v-if="number == pageNumber" class="active"><a>{{number}}</a></li>
                    <li v-if="number != '...' && number != pageNumber" v-on:click="sendNumber(number)"><a>{{number}}</a></li>
                  </template>
                </ul>

<!--                 <div class="text-center more-button space-top-30">
                    <a href="#x" class="btn btn-default-filled"><i class="lnr lnr-sync"></i><span>LOAD MORE</span></a>
                </div> -->

            </div><!-- / content-area -->



            <div class="col-sm-4 col-md-3 sidebar-area">

                  <div class="widget">
                    <h5 class="widget-title">FILTER BY PRICE</h5>
                  <div id="range-slider" class="noUi-target noUi-rtl noUi-horizontal">
                  </div><!-- / range-slider -->

                  <div class="range-filter">
                      <div class="column filter-button">
                      </div><!-- / filter-button -->
                  <div class=" column range-values">
                      <p>$<span class="value" id="range-slider-value-min"></span> - $<span class="value" id="range-slider-value-max"></span></p>
                  </div><!-- / range-values -->
              </div><!-- / range-filter -->
              <!-- / filter-by-price widget -->
          </div>

<!-- <template>
  <v-card flat color="transparent">
    <v-subheader>Min and max default slider</v-subheader>

    <v-card-text>
      <v-layout row>
        <v-flex class="pr-3">
          <v-slider
            v-model="slider"
            :max="max"
            :min="min"
          ></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="slider"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-subheader>Min and max range slider</v-subheader>

    <v-card-text>
      <v-layout row>
        <v-flex
          shrink
          style="width: 60px"
        >
          <v-text-field
            v-model="range[0]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
        <v-flex class="px-3">
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
          ></v-range-slider>
        </v-flex>
        <v-flex
          shrink
          style="width: 60px"
        >
          <v-text-field
            v-model="range[1]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template> -->




                <!-- price-filter widget -->
                <div class="price-filter widget">
                    <h5 class="widget-title">Name Filter</h5>

                    <div>
                      Search by Name <input v-model="nameFilter">
                    </div>
                    <div>
                      Search by Display Name <input v-model="displayNameFilter">
                    </div>

                    <button type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="reloadPatterns()">Confirm Search</button>

                </div>

                <div class="price-filter widget">
                  <h5 class="widget-title">Out of Print Filter</h5>
                    <input v-on:change="reloadPatterns()" type="radio" id="null" value="null" v-model="out_of_print">
                    <label for="two">Show All</label>
                    <br>
                    <input v-on:change="reloadPatterns()" type="radio" id="true" value="false" v-model="out_of_print">
                    <label for="two">Only Show In Print</label>
                    <br>
                    <input v-on:change="reloadPatterns()" type="radio" id="false" value="true" v-model="out_of_print">
                    <label for="one">Only Show Out of Print</label>
                    <br>
                </div>

                  <h5 class="widget-title">Brand Filter</h5>
                  <div v-for="tag in tags.brands">
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>

                <div class="price-filter widget">
                  <h5 class="widget-title">Main Filter</h5>
                  <div v-for="tag in tags.main">
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                </div>

                <div class="price-filter widget">
                  <h5 class="widget-title">Subcategory Filter</h5>
                    <div>
                      Search by Subcategory <input v-model="tagSubFilter">
                    </div>
                  <div v-for="tag in filterBy(tags.subcategory, tagSubFilter, 'name')">
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                </div>

<!--                 <div class="price-filter widget">
                    <h5 class="widget-title">Designers Filter</h5>
                    <div v-for="tag in tags.designers">
                      <p class="filter-item">
                        <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                        <label>{{tag.name}}</label>
                      </p>
                    </div>
                </div>                

                <div class="price-filter widget">
                    <h5 class="widget-title">Collections Filter</h5>
                    <div v-for="tag in tags.collections">
                      <p class="filter-item">
                        <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                        <label>{{tag.name}}</label>
                      </p>
                    </div>
                </div> -->

                <div class="price-filter widget">
                  <h5 class="widget-title">Difficulty Filter</h5>
                  <div v-for="tag in tags.difficulty">
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                </div>

                <div class="price-filter widget">
                  <h5 class="widget-title">Details Filter</h5>
                    <div>
                      Search by Details <input v-model="tagNameFilter">
                    </div>
                  <div v-for="tag in filterBy(tags.details, tagNameFilter, 'name')">
                  <!-- <div v-for="tag in tags.details"> -->
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                  <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="reloadPatterns()">Confirm Search</button>
                </div>

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
      closet_photo: "/images/no_closet_image.jpg",
      patterns: [
        {
          images: {
            main_images: [
              {
                url: ""
              }
            ]
          }
        }
      ],
      user: {},
      // firstValue: 1,
      // lastValue: 30,
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

                    axios.get("/api/patterns").then(response => {
                      this.patterns = response.data;
                    });
                    axios.get("/api/users/" + this.userId ).then(response => {
                      this.$router.push(
                      this.user = response.data);
                    });
                    axios.get("/api/tags/by_category").then(response => {
                      this.$router.push(
                      this.tags = response.data);
                    });
  },
  methods: { 
      reloadPatterns: function() {

                    console.log("Creating search...");
                    console.log(this.tagList);
                    if (this.priceLow === 0) {
                      var priceLow = null;
                      var priceHigh = null;
                    }
                    else {
                      var priceLow = this.priceLow;
                      var priceHigh = this.priceHigh;                     
                    }
                    axios.get("/api/patterns?" + this.sortBy, {
                                params:{
                                    name: this.nameFilter,
                                    display_name: this.displayNameFilter,
                                    tags: this.tagList,
                                    out_of_print: this.out_of_print,
                                    price_low: priceLow,
                                    price_high: priceHigh,
                                    offset: this.offsetNumber,
                                    page: this.pageNumber
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

        sendNumber: function(input_number) {  
                    this.pageNumber = input_number
                    this.offsetNumber = ((input_number - 1) * 30);
                    console.log(input_number);

                    this.reloadPatterns();
                  },


// this.closet.push.(response.data)
        // setSortAttribute: function(inputAttribute) {
        //   if (this.sortAttribute === inputAttribute) {
        //     this.sortAscending *= -1;
        //   } else {
        //     this.sortAscending = 1;
        //   }
        //   this.sortAttribute = inputAttribute;
        // },

        // setSort: function() {
        //   axios.get("/api/patterns?" + this.sortBy ).then(response => {
        //     this.patterns = response.data;
        //   });
        // },

  },
  mounted: function() {
    var limitSlider = document.getElementById('range-slider');

    noUiSlider.create(limitSlider, {
        start: [ 0, 50 ],
        limit: 50,
        behaviour: 'tap-drag',
        connect: true,
        range: {
            'min': 0,
            'max': 50
        }
    });

    var limitFieldMin = document.getElementById('range-slider-value-min');
    var limitFieldMax = document.getElementById('range-slider-value-max');

    limitSlider.noUiSlider.on('update', function( values, handle ){
        (handle ? limitFieldMax : limitFieldMin).innerHTML = values[handle];
    });


  },
  mixins: [Vue2Filters.mixin]
};
</script>
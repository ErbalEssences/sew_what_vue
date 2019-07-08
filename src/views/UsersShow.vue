<template>
  <div class="users-show">

<section id="my-account">
    <div class="container">
        <div class="row">

            <div class="col-sm-2 account-sidebar">
                <img src="images/account-img.jpg" alt="">
                <p><router-link class="btn btn-sm btn-primary btn-rounded m-1" v-bind:to=" '/closet-patterns/' ">All User Patterns</router-link></p>
                <p><router-link class="btn btn-sm btn-primary btn-rounded m-1" v-bind:to=" '/notes/' ">All User Notes</router-link></p>
                <p><router-link class="btn btn-sm btn-primary btn-rounded m-1" v-bind:to=" '/images/' ">All User Images</router-link></p>
            </div> <!-- / account-sidebar -->

            <div class="col-sm-10 account-info">
                <div id="personal-info" class="account-info-content">
                    <h4>PERSONAL INFO <span class="pull-right"><a v-bind:href=" '/users/' + user.id + '/edit' " class="btn btn-sm btn-primary btn-rounded no-margin"><i class="lnr lnr-pencil"></i><span>Edit or Delete</span></a></span></h4>
                    <div class="row">

                        <div class="col-xs-6 col-sm-4 col-md-2">
                            <img v-bind:src="user.avatar" alt="">
                        </div>

                        <div class="col-xs-6 col-sm-8 col-md-10">
                            <p>Username: <span>{{user.username}}</span></p>
                            <p>Email: <span>{{user.email}}</span></p>
                            <p>Skill Level: <span>{{ user.skill }}</span></p>
                            <p>Total Closets: <span>{{ user.number_of_closets }}</span></p>
                            <p>Total Patterns: <span>{{ user.number_of_patterns }}</span></p>
                        </div>
                            
                    </div><!-- / row -->
                </div><!-- / personal-info -->

            </div> <!-- / account-info -->

        </div><!-- / row -->
    </div><!-- / container -->
</section>
<!-- / my-account -->









<!-- ___________________________________________________________________________________________________ -->
<!-- ___________________________________________________________________________________________________ -->
<!-- ___________________________________________________________________________________________________ -->
<!-- shop right-sidebar -->
<section id="shop" class="space-top-30">
    <div class="container">
        <div class="row">

            <div class="col-sm-8 col-md-9 content-area">
                
                <ul class="row shop list-unstyled" id="grid">

                    <div v-for="closet in orderBy(filterBy(user.closets, nameFilter, 'name'), sortAttribute, sortAscending)" v-bind:key="user.closets.id">
                    

                    <!-- product -->
                      <li class="col-xs-6 product m-product" data-groups='["bedroom"]'>
                          <div class="img-bg-color primary">
                              <h5 class="product-price">{{closet.name}}</h5>
                              <a v-bind:href="'/closets/' + closet.id" class="product-link"></a>
                              <!-- / product-link -->
                              <img  v-if="closet.patterns[0]" v-bind:src="closet.patterns[0].images.main_images[0].url" alt="">
                              <img  v-else v-bind:src="closet_photo" alt="No Photo">

                              <!-- / product-image -->

                              <!-- product-hover-tools -->
                              <div class="product-hover-tools">
                                  <a v-bind:href="'/closets/' + closet.id" class="view-btn" data-toggle="tooltip" title="View Product">
                                      <i class="lnr lnr-eye"></i>
                                  </a>
                                  <a href="shopping-cart.html" class="cart-btn" data-toggle="tooltip" title="Add to Cart">
                                      <i class="lnr lnr-cart"></i>
                                  </a>
                              </div><!-- / product-hover-tools -->

                              <!-- product-details -->
                              <div class="product-details">
                                <h5 class="product-title">{{closet.name}}</h5>
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

               
                  <!-- <h5 class="widget-title">Brand Filter</h5>
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
                </div> -->

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

                <!-- <div class="price-filter widget">
                  <h5 class="widget-title">Difficulty Filter</h5>
                  <div v-for="tag in tags.difficulty">
                    <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                </div>

                <div class="price-filter widget">
                  <h5 class="widget-title">Out of Print Filter</h5>
                    <input type="radio" id="true" value="true" v-model="out_of_print">
                    <label for="one">Only Show In Print</label>
                    <br>
                    <input type="radio" id="false" value="false" v-model="out_of_print">
                    <label for="two">Only Show out of Print</label>
                    <br>
                    <input type="radio" id="null" value="null" v-model="out_of_print">
                    <label for="two">Show All</label>
                    <br>
                </div> -->


                <!-- <div class="price-filter widget">
                  <h5 class="widget-title">Details Filter</h5>
                    <div>
                      Search by Details <input v-model="tagNameFilter">
                    </div>
                  <div v-for="tag in filterBy(tags.details, tagNameFilter, 'name')"> -->
                  <!-- <div v-for="tag in tags.details"> -->
                    <!-- <p class="filter-item">
                      <input type="checkbox" v-bind:value="tag.name" v-model="tagList">
                      <label>{{tag.name}}</label>
                    </p>
                  </div>
                  <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="refreshCreated()">Confirm Search</button>
                </div> -->

            </div><!-- / sidebar-area -->

        </div><!-- / row -->
    </div><!-- / container -->
</section>
<!-- / shop right sidebar -->











  </div>
</template>

<style>
img.show-user-img {
  max-width: 450px;
  max-height: 300px;
}

.btn-my-color {
  background-color: #3B8F98;
}
</style>

<script>
import Vue2Filters from 'vue2-filters';
var axios = require('axios');

export default {
  data: function() {
    return {
      closet_photo: "/images/no_closet_image.jpg",
      new_name: "",
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1,
      image: "",
      user: {
               username: "",
               email: "",
               skill: "",
               avatar_url: "",
               closets: [
                          {
                             name: "",
                             user_id: 1,
                             patterns: [
                                          {
                                             name: "",
                                             url: "",
                                             price: "",
                                             out_of_print: false,
                                             display_name: "",
                                             images: {
                                                         line_art: {
                                                                       pattern_id: 1,
                                                                       user_id: null,
                                                                       url: "",
                                                                       line_art: true
                                                                    },
                                                         main_images: [
                                                                          {
                                                                             pattern_id: 1,
                                                                             user_id: null,
                                                                             url: "",
                                                                             line_art: false
                                                                          }
                                                                        ],
                                                         user_images: [],
                                                      },
                                             tags: [
                                                      {
                                                         id: 1,
                                                         name: ""
                                                      }
                                                    ]
                                          }
                                        ]
                          }
                         ],
               notes: {
                           private: [
                                        {
                                           pattern_id: 1,
                                           user_id: 1,
                                           body: "",
                                           public: false
                                        },
                                     ],
                           public: [
                                      {
                                         pattern_id: 1,
                                         user_id: 1,
                                         body: "",
                                         public: true
                                      },
                                    ]
                          },

            },
          };
    },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id ).then(response => {
      this.user = response.data;
    });
  },
  methods: {

        makeCloset: function() {
                    console.log("Creating the closet...");

                    var params = { 
                                    name: this.new_name
                                 };

                    axios.post("/api/closets", params).then(response => {
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
            // 'glyphicon glyphicon-download'
            // 'glyphicon glyphicon-upload'
            // <i class="lnr lnr-arrow-up-circle">


            // return this.sortAscending === 1 ? "/public/images/up_arrow.png" : "/public/images/down_arrow.png";
            // return this.sortAscending === 1 ? 'glyphicon glyphicon-download' : 'glyphicon glyphicon-upload';
            return this.sortAscending === 1 ? "lnr lnr-arrow-up-circle" : "lnr lnr-arrow-down-circle";
          }
        },
  },
  mixins: [Vue2Filters.mixin]

};
</script>
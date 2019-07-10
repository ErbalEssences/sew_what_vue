<template>
  <div class="home">




<!-- collections -->
<section id="collections">
    <div class="container">
        <h2 class="hide">COLLECTIONS</h2>
        <div class="row">
            <div class="col-sm-6 collection">
                <a href="/patterns">
                    <img src="images/collection1.jpg" alt="">
                </a>
            </div>
            <!-- / collection -->
            <div class="col-sm-6 collections">
                <div class="row">
                    <div class="col-sm-12 collection">
                      <!-- "'/api/patterns?' + tag=[costumes]" -->
                        <a href="/patterns">
                            <img src="images/collection2.jpg" alt="">
                        </a>
                    </div><!-- / collection -->
                    <div class="col-sm-6 collection">
                        <a href="/patterns">
                            <img src="images/collection3.jpg" alt="">
                        </a>
                    </div><!-- / collection -->
                    <div class="col-sm-6 collection">
                        <a href="/patterns">
                            <img src="images/collection4.jpg" alt="">
                        </a>
                    </div><!-- / collection -->
                </div><!-- / row -->
            </div>
            <!-- / collections -->
        </div><!-- / row -->
    </div><!-- / container -->
</section>
<!-- / collections -->

<!-- shop section -->
<section id="shop">
    <div class="container">
        <div class="page-header no-margin-top text-center">
            <h3>RECENTLY ADDED</h3>
        </div><!--/ page-header -->
        <ul class="row shop list-unstyled" id="grid">
            <!-- product -->
            <li v-for="pattern in patterns" class="col-xs-6 col-md-4 product m-product">
                <div class="img-bg-color primary">
                    <h5 class="product-price">{{pattern.price}}</h5>
                    <a href="single-product.html" class="product-link"></a>
                    <!-- / product-link -->
                    <img v-bind:src="pattern.images.main_images[0].url" alt="">
                    <!-- / product-image -->

                    <!-- product-hover-tools -->
                    <div class="product-hover-tools">
                        <a v-bind:href="'/patterns/' + pattern.id" class="view-btn" data-toggle="tooltip" title="View Product">
                            <i class="lnr lnr-eye"></i>
                        </a>

                      <span v-if="userId !== 0" class="dropdown">
                          <a v-if="userId !== 0" class="cart-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i class="lnr lnr-envelope"></i>
                          </a>
                            <div v-if="userId !== 0" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <div v-for="closet in user.closets">
                                <a v-on:click="addToCloset(closet.id, pattern.id)" class="dropdown-item" href="#">{{closet.name}}</a>
                              </div>
                            </div>
                            
                        </span>


                    </div><!-- / product-hover-tools -->

                    <!-- product-details -->
                    <div class="product-details">
                        <h5 class="product-title">{{pattern.name}}</h5>
                        <p class="product-category">{{pattern.display_name}}</p>
                    </div><!-- / product-details -->
                </div><!-- / img-bg-color -->
            </li>
            <!-- / product -->
            <!-- sizer -->
            <li class="col-xs-6 col-md-4 shuffle_sizer"></li>
            <!-- / sizer -->

        </ul> <!-- / products -->
    </div><!-- / container -->

</section>
<!-- / shop section -->











  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {

  data: function() {
    return {
      message: "Sew What",
      patterns: [],
      userId: null,
      user: []
    };
  },
  created: function() {
            this.userId = localStorage.getItem("userId"); 
            axios.get("/api/patterns/", {
                                params:{
                                    top_9: true
                                                }
                                      }).then(response => {
              this.patterns = response.data;
              axios.get("/api/users/" + this.userId ).then(response => {
                      this.$router.push(
                      this.user = response.data);
                    });
            });
  },

  methods: {}
};
</script>

<template>
  <div class="pattern-show">


<!-- 
      <form  v-if="userId !== 0"  class="form-inline">
        <div v-if="userId !== 0" class="form-group">
          <textarea v-if="userId !== 0" class="form-control" id="exampleFormControlTextarea1" v-model="new_note" placeholder="New Note" rows="3"></textarea>
        </div>
        <div>
          <button  v-if="userId !== 0" type="submit" class="btn btn-primary mx-sm-1 mb-3" v-on:click="makeNote(pattern.id, userId)">Confirm Note</button>
        </div>
      </form> -->


<!--       <h4  v-if="userId !== 0"  >Private Notes</h4>
      <div  v-if="userId !== 0" v-for="note in pattern.private_notes">
        <h5  v-if="userId !== 0" >{{note.username}}: {{note.body}}</h5>
      </div>
      <h4>Public Notes</h4>
      <div v-for="note in pattern.public_notes">
        <h5>{{note.username}}: {{note.body}}</h5>
      </div> -->
<!-- 

      <h4>User Images</h4>

      <div v-for="image in pattern.images.user_images">
         -->

<!--         <div class="card m-2" style="width: 10rem;">

          <img class="card-img-top" v-bind:src="image.url" alt="Pattern Image">
          <img v-bind:src="image.file" class="img-fluid show-user-img">

          <div class="card-body">
            <h5>{{image.username}}</h5>
            <h5>Skill:</h5>
            <h5>{{image.user_skill}}</h5>
            <h5>{{image.user_id}}</h5>
            <h5>{{userId}}</h5>
            <button v-if="userId === image.user_id" type="submit" class="btn btn-warning m-1" v-on:click="destroyimage(image.id)">Delete Image</button>
          </div>

        </div>

      </div> -->


<!-- ////////////////////////////////////////////////////////////////////////////// -->

<!-- shop single-product -->
<section id="shop">
    <div class="container space-top-30">
        <div class="row">

            <!-- product content area -->
            <div class="col-sm-6 col-md-7 product-content-area">
                <div class="product-content-area">

                    <div id="product-slider" class="carousel slide" data-ride="carousel">
                        <!-- wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                          <!-- <div v-for="image in pattern.images.main_images"> -->
                          <!-- <div v-for="(image, index) in pattern.images.main_images"> -->

                            <!-- <div v-bind:class="{'item active':(image.url === pattern.images.main_images[1].url)}"> -->
                            <div v-for="(image, index) in pattern.images.main_images" class="item" v-bind:class="{active: index === 0}" >
                              <img  v-bind:src="image.url" alt="">
                            </div>
                          <!-- </div> -->
                        </div>
                        <!-- / wrapper for slides -->

                        <!-- controls -->
                        <a class="left carousel-control" href="#product-slider" role="button" data-slide="prev">
                            <span class="lnr lnr-chevron-left" aria-hidden="true"></span>
                        </a>
                        <a class="right carousel-control" href="#product-slider" role="button" data-slide="next">
                            <span class="lnr lnr-chevron-right" aria-hidden="true"></span>
                        </a>
                        <!-- / controls -->
                    </div><!-- / product-slider -->

                    <ul class="nav nav-tabs" role="tablist">
                        <li class="active"><a href="#info" role="tab" data-toggle="tab" aria-expanded="false">PRODUCT INFO</a></li>
                        <li class=""><a href="#line" role="tab" data-toggle="tab" aria-expanded="false">LINE ART</a></li>
                        <li class=""><a href="#notes" role="tab" data-toggle="tab" aria-expanded="false">NOTES</a></li>
                        <li class=""><a href="#image" role="tab" data-toggle="tab" aria-expanded="true">USER IMAGES</a></li>
                        <li class=""><a href="#user" role="tab" data-toggle="tab" aria-expanded="true">USER OPTIONS</a></li>

                        <!-- <li class=""><a href="#user" role="tab" data-toggle="tab" aria-expanded="false">USER IMAGES</a></li> -->

                    </ul>



                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane animated fadeIn  active" id="info">
                          <div class="row">
                              <div class="col-sm-6">
                                  <table>
                                      <tbody>
                                          <tr>
                                              <th>Sizes:</th>
                                              <td>Small, Medium, Large</td>
                                          </tr>
                                          <tr>
                                              <th>Colors:</th>
                                              <td>Beige, Black, Blue</td>
                                          </tr>
                                          <tr>
                                              <th>Fabric:</th>
                                              <td>100% Cotton</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>

                              <div class="col-sm-6">
                                  <table>
                                      <tbody>
                                          <tr>
                                              <th>Weight:</th>
                                              <td>0.5 Kg</td>
                                          </tr>
                                          <tr>
                                              <th>Made In:</th>
                                              <td>USA</td>
                                          </tr>
                                          <tr>
                                              <th>More Info:</th>
                                              <td>Lorem ipsum.</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div><!-- / row -->
                      </div>

                    <!-- / nav-tabs -->
                        <div role="tabpanel" class="tab-pane animated fadeIn" id="user">
                          <div v-if="userId !== 0">
                            <!-- CLEAN UP -->
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

                          </div>
                          <div v-else>Please sign in to use these features.</div>
                        </div>
                        <div role="tabpanel" class="tab-pane animated fadeIn" id="image">
                          <img v-if="pattern.images.user" v-bind:src="pattern.images.user[0]" class="show-img" alt=""> 
                          <!-- must change later!!!!!! -->
                          <div  v-else>No Current User Added Images</div>
                        </div>
                        <!-- / info-tab -->
                        <div role="tabpanel" class="tab-pane animated fadeIn" id="line">
                            <img v-bind:src="pattern.images.line_art.url" class="show-img" alt="">
                        </div>




                        <div role="tabpanel" class="tab-pane animated fadeIn" id="notes">
                            <div class="reviews">

                                <div class="review-author pull-left">
                                  <img src="images/author2.jpg" alt="">
                                </div>
                                <div class="review-content">
                                    <h4 class="review-title no-margin">Very good product!</h4>
                                    <div class="review-stars">
                                        <span class="product-rating">
                                            <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>
                                        </span>
                                    </div>
                                    <p>Morbi sodales ornare ex, at consectetur ipsum faucibus at. Ut facilisis orci metus, vitae hendrerit leo vulputate sit amet.</p>
                                    <cite> - Jane Doe</cite>
                                </div>

                              <div v-for="note in pattern.private_notes">

                                <div class="review-author pull-left">
                                  <img v-bind:src="note.user.avatar_url" alt="">
                                </div>
                                <div class="review-content">
                                    <h4 class="review-title no-margin">Amazing product!</h4>
                                    <div class="review-stars">
                                        <span class="product-rating">
                                            <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                                        </span>
                                    </div><!-- / review-stars -->
                                    <p>{{note.body}}</p>
                                    <cite> - {{note.username}}</cite>
                                    <cite> - {{note.username.skill}}</cite>
                                    <!-- <cite> - {{note.username}}</cite> -->
                                </div><!-- / review-content -->


                                <div class="space-25">&nbsp;</div>
                              </div>



                                <!-- add review -->
                                <div v-if="userId !== 0" id="add-review" class="space-top-30">
                                    <h4   class="">MAKE NEW NOTE</h4>
                                    <div class="row">
                                        <!-- <div class="col-sm-4 review-form">
                                            <input type="text" class="form-control" placeholder="*NAME" required>
                                        </div> -->
                                        <!--  <div class="col-sm-4 review-form">
                                            <input type="email" class="form-control" placeholder="*EMAIL" required>
                                        </div> -->
                                        <div class="col-sm-4 review-form">
                                            <select class="form-control">
                                                <option>5 STARS</option>
                                                <option>4 STARS</option>
                                                <option>3 STARS</option>
                                                <option>2 STARS</option>
                                                <option>1 STAR</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4 review-form">
                                            <p><input class="form-check-input" type="checkbox" v-model="private" value="true" id="defaultCheck1"> Private Note</p>
                                        </div>

                                        <div class="col-sm-12 review-form">
                                          <textarea  v-model="new_note" rows="7" class="form-control" placeholder="*NOTE" required></textarea>
                                          <button  v-if="userId !== 0" type="submit" class="btn btn-submit btn-primary-filled btn-rounded" v-on:click="makeNote(pattern.id, userId)">Confirm Note</button>
                                        </div>
                                    </div><!-- / row -->
                                </div>
                                <div v-else> Please Sign In to Leave a Note</div>
                                <!-- / add review -->
                            </div><!-- / reviews -->
                        </div>
                        <!-- / reviews-tab -->
                    </div>
                    <!-- / tab-content -->
                </div><!-- / product-content-area -->

            </div>
            <!-- / product-content-area -->

            <!-- product sidebar area -->
            <div class="col-sm-6 col-md-5 product-sidebar">
                <div class="product-sidebar-details">
                    <h4>{{ pattern.name }}</h4>
                    <h5>{{ pattern.display_name }}</h5>
                    <h5>{{ pattern.brand[0].name }}</h5>
                    <p>{{ pattern.description }}</p>
                    <div class="product-info">
                        <div class="info">
                            <p><i class="lnr lnr-tag"></i><span>Price: {{pattern.price}}</span></p>
                        </div>
<!-- v-for="tag in pattern.main" -->

                        <div class="info">
                            <p><i class="lnr lnr-heart"></i><span>Categories: {{pattern.tags}}, </span></p>
                        </div>


                        <div class="info">
                          <p><i class="lnr lnr-file-empty"></i><span>Out of Print: {{pattern.out_of_print}}</span></p>
                        </div>
                        <div class="info">
                            <p><i class="lnr lnr-menu"></i><span>Sewing Rating: {{pattern.difficulty[0].name}}</span></p>
                        </div>
                        <div class="info">
                            <p><i class="lnr lnr-star"></i><span>Reviews: <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-half-o"></i></span></p>
                        </div>
                        <div class="info">

                            <p><i class="lnr lnr-home"></i><span>Owned: <input class="form-check-input" type="checkbox" v-model="owned" value="true" id="defaultCheck1"> </span></p>
                        </div>
                        <div v-if="pattern.url">
                          <a class="btn btn-warning m-1" v-bind:href="pattern.url">Purchase/Official Site</a>
                        </div>
                    </div><!-- / product-info -->

                    <div class="buy-product">
                  
               
                </div><!-- product-details -->

            </div><!-- / col-sm-4 col-md-3 -->
            <!-- / product sidebar area -->

        </div><!-- / row -->

      </div>
    </div><!-- / container -->
</section>
<!-- / shop single-product -->


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
      pattern: {
                  images: {  
                    main_images: [ 
                                    {
                                      url: "/images/no_closet_image.jpg"
                                    }
                                  ] 
                          } 
                },
      private: false,
      owned: false,
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

<template>
  <div id="app">

    <!-- header -->
    <header>

        <!-- nav -->
        <nav class="navbar navbar-default nav-sec navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/"><img src="/images/logo.png" alt="Sew What?"></a>
                </div><!-- / navbar-header -->
                <div class="secondary-nav">
                    <router-link  v-bind:to="'/users/' + userId" class="my-account space-right"><i class="fa fa-user"></i></router-link>
                    <a href="shopping-cart.html" class="shopping-cart"><i class="fa fa-shopping-cart"></i> <span class="cart-badge">0</span></a>
                </div>
                <div class="navbar-collapse collapse text-center">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/"><span>HOME</span></a></li>
                        <li><a href="about.html"><span>ABOUT</span></a></li>

                        <li><a href="/patterns/"><span>PATTERNS</span></a></li>
                        </li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span>LOGIN</span> <span class="dropdown-icon"></span></a>
                        <ul class="dropdown-menu animated zoomIn fast">
                            <li><a href="/signup"><span>SIGNUP</span></a></li>
                            <li><a href="/login"><span>LOGIN</span></a></li>
                            <li><a href="/logout"><span>LOGOUT</span></a></li>
                        </ul>
                        </li>
                        <li><router-link v-bind:to="'/users/' + userId" ><span>USER</span></router-link></li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span>SHOP</span> <span class="dropdown-icon"></span></a>
                        <ul class="dropdown-menu animated zoomIn fast">
                        <li><a href="shop.html"><span>BUTTERICK</span></a></li>
                        <li><a href="shop-right.html"><span>MCCALLS</span></a></li>
                        <li><a href="shop-left.html"><span>VOGUE</span></a></li>
                    </ul>
                    </li>
                        <!-- <li><a href="contact.html"><span>USER PAGE</span></a></li> -->
                    </ul>
                </div><!--/ nav-collapse -->
            </div><!-- / container -->
        </nav>
        <!-- / nav -->

        <!-- header-banner -->
        <div id="header-banner" class="demo-1">
            <div class="banner-content text-center">
                <div class="banner-border">
                    <div class="banner-info">
                        <h1>Sew What?</h1>
                        <p>Patterns</p>
                    </div><!-- / banner-info -->
                </div><!-- / banner-border -->
            </div><!-- / banner-content -->   
        </div>
        <!-- / header-banner -->
    </header>
    <!-- / header -->

    <router-view/>

    <!-- footer -->
    <footer class="light-footer">
        <div class="widget-area">
            <div class="container">
                <div class="row">

                    <div class="col-md-4 widget">
                        <div class="about-widget">
                            <div class="widget-title-image">
                                <img src="images/logo2.png" alt="">
                            </div>
                            <p>Sew What? is made so that usesmay be able to search and save patterns into digital closets in one place. We do not claim to own any of the patterns and encurage you to go to a verified dealer or offical website to purchase any of the patterns. Please support the offical brands.</p>
                        </div><!-- / about-widget -->
                    </div><!-- / widget -->
                    <!-- / first widget -->

                    <div class="col-md-2 widget">
                        <div class="widget-title">
                            <h4>BRANDS</h4>
                        </div>
                        <div class="link-widget">
                            <div class="info">
                                <a href="#x">Mccalls</a>
                            </div>
                            <div class="info">
                                <a href="#x">Butterick</a>
                            </div>
                            <div class="info">
                                <a href="#x">Vogue</a>
                            </div>
                        </div>
                    </div><!-- / widget -->
                    <!-- / second widget -->

                    <div class="col-md-2 widget">
                        <div class="widget-title">
                            <h4>SUPPORT</h4>
                        </div>
                        <div class="link-widget">
                            <div class="info">
                                <a href="#x">Terms & Conditions</a>
                            </div>
                            <div class="info">
                                <a href="#x">Shipping & Return</a>
                            </div>
                            <div class="info">
                                <a href="faq.html">F.A.Q</a>
                            </div>
                            <div class="info">
                                <a href="contact.html">Contact</a>
                            </div>
                        </div>
                    </div><!-- / widget -->
                    <!-- / third widget -->

                    <div class="col-md-4 widget">
                        <div class="widget-title">
                            <h4>CONTACT</h4>
                        </div>
                        <div class="contact-widget">
                            <div class="info">
                                <p><i class="lnr lnr-map-marker"></i><span>Miami, S Miami Ave, SW 20th, Store No.1</span></p>
                            </div>
                            <div class="info">
                                <a href="tel:+0123456789"><i class="lnr lnr-phone-handset"></i><span>+0123 456 789</span></a>
                            </div>
                            <div class="info">
                                <a href="mailto:hello@yoursite.com"><i class="lnr lnr-envelope"></i><span>office@yoursite.com</span></a>
                            </div>
                            <div class="info">
                                <i class="lnr lnr-thumbs-up"></i>
                                <span class="social text-left">
                                    <a class="no-margin" href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-google-plus"></i></a>
                                    <a href="#"><i class="fa fa-linkedin"></i></a>
                                    <a href="#"><i class="fa fa-pinterest"></i></a>
                                </span>
                            </div>
                        </div><!-- / contact-widget -->
                    </div><!-- / widget -->
                    <!-- / fourth widget -->

                </div><!-- / row -->
            </div><!-- / container -->
        </div><!-- / widget-area -->
    <!--     <div class="footer-info">
            <div class="container">
                    <div class="pull-left copyright">
                        <p><strong>© MS - MINIMAL SHOP THEME</strong></p>
                    </div>
                    <span class="pull-right">
                        <img src="images/visa.png" alt="">
                        <img src="images/mastercard.png" alt="">
                        <img src="images/discover.png" alt="">
                        <img src="images/paypal.png" alt="">
                    </span>
            </div>
        </div> -->
    </footer>
    <!-- / footer -->

  </div>
</template>

<style>
</style>

<script>

var axios = require('axios');
export default {
    data: function() {
      return {
        titleFilter: "",
        userId: 0
      };
    },
  created: function() {
    this.userId = localStorage.getItem("userId");

  },
  // mixins: [Vue2Filters.mixin]

  }
</script>



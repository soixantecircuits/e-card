<?php
function sanitize($var,$toInt=false){
  $var = stripslashes(strip_tags(trim($var)));
  return ($toInt) ? (int)$var : $var;
}

if (!empty ($_GET))
{
  if (isset($_GET['lang']) != '') { $_GET['lang'] = sanitize($_GET['lang']); }
  if (isset($_GET['message']) != '') { $_GET['message'] = sanitize($_GET['message']); }
}else if (!empty ($_POST)){
  echo '<!--POST-->';
}else{
  echo '<!--no no-->';
}

?>

<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/b/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title></title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile viewport optimized: h5bp.com/viewport -->
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

  <link rel="stylesheet" href="css/style.css">

  <link rel="stylesheet" href="css/inuit.css">
  <!-- Plugins -->
  <link rel="stylesheet" href="css/igloos.css">
  <link rel="stylesheet" href="css/application.css">  
  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

  <!-- All JavaScript at the bottom, except this Modernizr build incl. Respond.js
       Respond is a polyfill for min/max-width media queries. Modernizr enables HTML5 elements & feature detects; 
       for optimal performance, create your own custom Modernizr build: www.modernizr.com/download/ -->
  <script src="js/libs/modernizr-2.0.6.min.js"></script>
  <script>
  var avoidFlash = false;
  <?php if($_GET['lang']==""){$_GET['lang']="en";}?>
    var lang = "<?php echo $_GET['lang']; ?>";
    var user_msg = <?php if(isset($_GET['message'])!= ''){ echo $_GET['message'];}?>;
  </script>
</head>

<body>
  <div id="video">
      <h2></h2>
      <p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p>
  </div>
  <div id="nuage"></div>
  <div id="nuage1"></div>
  <div id="message_user"></div>
  <div id="main" role="main">
    <div id="message_input_box">
      <div id="logo"></div>
      <form id="new_message">
        <fieldset class="grid-12" id="array">
        <label id="lang_lb" for="language">Language:</label>
          <select id="language" name="language">   
            <option <?php if ($_GET['lang']=="en") echo "selected "; ?>value="en">English</option> 
            <option <?php if ($_GET['lang']=="fr") echo "selected "; ?>value="fr">Français</option>
            <option <?php if ($_GET['lang']=="es") echo "selected "; ?>value="es">español</option>
            <option <?php if ($_GET['lang']=="de") echo "selected "; ?>value="de">German</option>     
            <option <?php if ($_GET['lang']=="pl") echo "selected "; ?>value="pl">polnisch</option>         
          </select>
          <label id="name_lb" for="name">Your name:</label>
          <input name="name" type="text" id="name" required placeholder="Enter your full name">
      
          <label id="email_lb" for="email">Receiver email address:</label>
          <input name="email" type="email" id="email" required placeholder="Enter your email address">
      
          <label id="message_lb" for="message">Your message:</label>
          <textarea name="message" id="message" placeholder="What's on your mind?"></textarea>
          <p class="text-center">
            <input id="send_message" type="submit" value="Send message">
          </p>
          <input name="lang" type="text" id="lang" style="display:none" value ="<?php echo $_GET['lang'];?>">
        </fieldset>
      </form>
    </div>
    <div id="scorediv">
      <p id="remerciement">
      Blabla
      </p>
    </div>

  </div>
  
  <div id="back"></div>
  <div id="feedback">
  Loading...</div>

  <footer>

  </footer>
  

  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.0.min.js"><\/script>')</script>

  <!-- scripts concatenated and minified via build script -->
  <script defer src="js/mylibs/i18n.js"></script>
  <script defer src="js/libs/cufon-yui.js"></script>
  <script defer src="js/libs/swfobject.js"></script>
  <script defer src="js/mylibs/calibri.font.js"></script>
  <script defer src="js/mylibs/jquery.center.debug.js"></script>
  <script defer src="js/plugins.js"></script>
  <script defer src="js/libs/poll.min.js"></script>
  <script defer src="js/libs/h5f.min.js"></script>
  <script defer src="js/plugins/jquery.tinypubsub.min.js"></script>
  <script defer src="js/plugins/jquery.easing.1.3.js"></script>
  <script defer src="js/plugins/jquery.timers.js"></script>
  <script defer src="js/application.js"></script>
  <!-- end scripts -->


  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview'],['_trackPageLoadTime']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>

  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7 ]>
    <script defer src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script defer>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->

</body>
</html>

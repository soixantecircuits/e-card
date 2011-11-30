/* Author:Soixante circuits
2011
*/
var cat = {
    sens: 1
};

var myflash = function() {
        var flashvars = {};
        var params = {
            bgcolor: "#000000",
            allowFullScreen: "true",
            scale: "noscale",
            allowScriptAccess: "always",
            swLiveConnect: "true",
            wmode: 'transparent'
        };
        var attributes = {};
        swfobject.embedSWF("preview.swf", "video", "100%", "100%", "10.0.0", "expressInstall.swf", flashvars, params, attributes);
    };

if (!Modernizr.input.placeholder) {
    $(function() {
        H5F.setup($("#new_message"));
    });
}



var animNuage = function(){
    $('#nuage').everyTime(10, function() {
        $('#nuage').animate({
            right: "-216px",
            top: "30px",
            easing:"easeInOutCirc"
        }, 5000).animate({
            right: "-266px",
            top: "10px",
            easing:"easeInOutCirc"
        }, 4000).animate({
            right: "-256px",
            top: "40px",
            easing:"easeInOutCirc"
        }, 6000).animate({
            right: "-226px",
            top: "20px",
            easing:"easeInOutCirc"
        }, 4000);
    });

    $('#nuage0').everyTime(10, function() {
        $('#nuage0').animate({
            right: "-216px",
            top: "130px",
            easing:"easeInOutCirc"
        }, 5000).animate({
            right: "-266px",
            top: "140px",
            easing:"easeInOutCirc"
        }, 4000).animate({
            right: "-256px",
            top: "120px",
            easing:"easeInOutCirc"
        }, 6000).animate({
            right: "-226px",
            top: "140px",
            easing:"easeInOutCirc"
        }, 4000);
    });

    $('#nuage1').everyTime(10, function() {
        $('#nuage1').animate({
            left: "50px",
            top: "320px",
            easing:"easeInOutCirc"
        }, 5000).animate({
            left: "40px",
            top: "290px",
            easing:"easeInOutCirc"
        }, 4000).animate({
            left: "60px",
            top: "300px",
            easing:"easeInOutCirc"
        }, 6000).animate({
            left: "50px",
            top: "295px",
            easing:"easeInOutCirc"
        }, 4000);
    });

    $('#nuage2').everyTime(10, function() {
        $('#nuage2').animate({
            right: "-216px",
            top: "30px",
            easing:"easeInOutCirc"
        }, 5000).animate({
            right: "-266px",
            top: "10px",
            easing:"easeInOutCirc"
        }, 4000).animate({
            right: "-256px",
            top: "40px",
            easing:"easeInOutCirc"
        }, 6000).animate({
            right: "-226px",
            top: "20px",
            easing:"easeInOutCirc"
        }, 4000);
    });
}


$(function() {

    myflash();
    Cufon.replace('form');
    //$('#message_input_box').center();
    $.subscribe("show_form", function(e, a, b, c) {
        console.log(a + b + c);
        animNuage();
        $("#message_input_box").fadeIn();
        $("#nuage, #nuage0").fadeIn();
    });

    Poll.start({
        name: "show_form",
        interval: 52000,
        action: function() {
            $.publish("show_form", ["a", "b", "c"]);
            return false;
        }
    });
});
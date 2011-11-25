/* Author:Soixante circuits
2011
*/
var cat = {
    'loop': {}
};

if (!Modernizr.input.placeholder) {
    $(function() {
        H5F.setup($("#new_message"));
    });
}


$(function() {

    Cufon.replace('form');
    //$('#message_input_box').center();
    $.subscribe("show_form", function(e, a, b, c) {
        console.log(a + b + c);
        $("#message_input_box").fadeIn();
    });

    $.subscribe("nuage_finished", function(e, a, b, c) {
        console.log("nuage");
        cat.loop.reset();
        cat.loop.play();
    });

    Poll.start({
        name: "show_form",
        interval: 1000,
        action: function() {
            $.publish("show_form", ["a", "b", "c"]);
            return false;
        }
    });

    cat.loop = jQuery.runloop();

    // Note: only use 5% intervals (10% for <500ms durations)!
    cat.loop.addKey('0%', function() {
        $("#nuage").animate({
            left: '+=50',
        }, 1000, function() {
            // Animation complete.
        });
    });
    cat.loop.addKey('50%', function() {
        $("#nuage").animate({
            left: '-=50',
        }, 1000, function() {
            // Animation complete.
        });
    });
    cat.loop.addKey('100%', function() {
        $("#nuage").animate({
            left: '+=50',
        }, 1000, function() {
            // Animation complete.
        });
    });


    // Start playing the runloop, in this case with a duration of 10s.
    // If the duration is omitted and no runloop was playing, it'll default to 500ms.
    cat.loop.play(3000, function() {
        $.publish("nuage_finished", ["a", "b", "c"]);
    });


    var flashvars = {};
    var params = {
        bgcolor: "#000000",
        allowFullScreen: "true",
        scale: "noscale",
        allowScriptAccess: "always",
        swLiveConnect: "true",
        wmode:'transparent'
    };
    var attributes = {};
    swfobject.embedSWF("preview.swf", "video", "100%", "100%", "10.0.0", "expressInstall.swf", flashvars, params, attributes);

});
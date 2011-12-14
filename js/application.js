/* Author:Soixante circuits
2011
*/

/*Some param*/
var cat = {
    sens: 1,
    isSubmitable: true
};

/*we load the scrip with lang variable setup from the send.php file or index.php file*/
var translation = translation_list[lang];

function limitText(limitField, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    }
}

/*check if the email is correct*/

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

/*cross browser parsing _ might not be really usefull, but used in the data parsing*/

function parseJSON(json) {
    try {
        if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)) {
            var j = eval('(' + json + ')');
            return j;
        }
    } catch (e) {}
    throw new SyntaxError("parseJSON");
}


/*function to add the flash to the page*/
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


/*function to animate the cloud*/
var animNuage = function() {
        $('#nuage').everyTime(10, function() {
            $('#nuage').animate({
                right: "-216px",
                top: "30px",
                easing: "easeInOutCirc"
            }, 5000).animate({
                right: "-266px",
                top: "10px",
                easing: "easeInOutCirc"
            }, 4000).animate({
                right: "-256px",
                top: "40px",
                easing: "easeInOutCirc"
            }, 6000).animate({
                right: "-226px",
                top: "20px",
                easing: "easeInOutCirc"
            }, 4000);
        });

        $('#nuage0').everyTime(10, function() {
            $('#nuage0').animate({
                right: "-216px",
                top: "130px",
                easing: "easeInOutCirc"
            }, 5000).animate({
                right: "-266px",
                top: "140px",
                easing: "easeInOutCirc"
            }, 4000).animate({
                right: "-256px",
                top: "120px",
                easing: "easeInOutCirc"
            }, 6000).animate({
                right: "-226px",
                top: "140px",
                easing: "easeInOutCirc"
            }, 4000);
        });

        $('#nuage1').everyTime(10, function() {
            $('#nuage1').animate({
                left: "50px",
                top: "320px",
                easing: "easeInOutCirc"
            }, 5000).animate({
                left: "40px",
                top: "290px",
                easing: "easeInOutCirc"
            }, 4000).animate({
                left: "60px",
                top: "300px",
                easing: "easeInOutCirc"
            }, 6000).animate({
                left: "50px",
                top: "295px",
                easing: "easeInOutCirc"
            }, 4000);
        });

        $('#nuage2').everyTime(10, function() {
            $('#nuage2').animate({
                right: "-216px",
                top: "30px",
                easing: "easeInOutCirc"
            }, 5000).animate({
                right: "-266px",
                top: "10px",
                easing: "easeInOutCirc"
            }, 4000).animate({
                right: "-256px",
                top: "40px",
                easing: "easeInOutCirc"
            }, 6000).animate({
                right: "-226px",
                top: "20px",
                easing: "easeInOutCirc"
            }, 4000);
        });
    };

var refresh_i18n = function() {
        //$("#name").attr("placeholder", translation.your_name_fld);
        $("#name_lb").html(translation.your_name);

        //$("#email").attr("placeholder", translation.receiver_fld);
        $("#email_lb").html(translation.receiver);

        //$("#message").attr("placeholder", translation.your_message_fld);
        $("#message_lb").html(translation.your_message);

        $("#lang_lb").html(translation.lang_lb);

        $("#send_message").val(translation.send_msg);

        if (!Modernizr.input.placeholder) {
            $(function() {
                H5F.setup($("#new_message"));
            });
        }
        Cufon.refresh();
};

$(function() { /* delay before we show the forms, if we use the send.php      */
    /* file then avoid flash is set to true and delay keep on 1000 */
    var delay = 1000;

    $("#message").keydown(function() {
        limitText(this,300);
    });

    if (!Modernizr.input.placeholder) {
        $(function() {
            H5F.setup($("#new_message"));
        });
    }

    $('#video').hide();
    if (!avoidFlash) {

        /*should check with the background.xml files which handle video in order to correct fadein out */
        /*with video*/
        $("#message_user").html(user_msg).fadeIn("slow").delay(3000).fadeOut(400);
        myflash();
        if (swfobject.getFlashPlayerVersion === null) {
            $('#video h2').html('Sorry, you need flash to play this e-card, go download it there :');
        }
        $('#video').show();
        delay = 54000;
    } else {
        $("#video").hide().remove();
    }

    $('#language').change(function() {
        translation = translation_list[$("#language").val()];
        $("#lang").val($("#language").val());
        refresh_i18n();
    });

    /*allow for font replacement*/
    Cufon.replace('form, #scorediv');

    /*allow to subscribe some event*/
    $.subscribe("show_form", function(e, a, b, c) {
        //console.log(a + b + c);
        animNuage();

        refresh_i18n();

        /*you can not fadeOut the object as it's only flash in the body*/
        $("#video").remove();
        $("#message_input_box").fadeIn();
        $("#nuage, #nuage1").fadeIn();
    });

    /*use poll to simplify delay management*/

    Poll.start({
        name: "show_form",
        interval: delay,
        action: function() { /*dummy object just to show that we can use object in event*/
            $.publish("show_form", ["a", "b", "c"]);
            return false;
        }
    });

    /* observ the submit event and call the post in AJAX request */
    /* also verify the content of the forms                      */

    $('#new_message').submit(function() {

        $("#feedback").html(translation.submit).fadeIn("slow").delay(2000).fadeOut(400);

        if (cat.isSubmitable) {
            isSubmitable = false;

            $('#submit_button').focus();
            var form = $(this).serializeArray();
            var valide = true;
            var validate = {
                message: $('#message').attr('title'),
                name: $('#name').attr('title'),
                email: $('#email').attr('title')
            };

            console.log(form[0]);
            var msg = translation.error;

            if (form[1].value == validate.name) {
                valide = false;
                msg = translation.name;
            } else if (form[3].value == validate.message) {
                valide = false;
                msg = translation.message;
            } else if (form[2].value == validate.email) {
                valide = false;
                msg = translation.email;
            } else if (!isValidEmailAddress(form[2].value)) {
                valide = false;
                msg = translation.email;
            }


            if (valide) {

                $('#email').val($('#email').val().toLowerCase());
                form = $(this).serializeArray();

                $.ajax({
                    type: "POST",
                    url: "mail/register.php",
                    data: form,
                    success: function(msg) {
                        $("#feedback").html(translation.send).fadeIn("slow").delay(2000).fadeOut(400);

                        var data = parseJSON(msg);

                        $("#scorediv").html(translation.thankyou).fadeIn("slow");
                        Cufon.refresh();
                        $('#message_input_box').fadeOut('slow');

                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        $("#feedback").html(msg).fadeIn("slow").delay(2000).fadeOut(400);
                    }

                });

            } else {
                $("#feedback").html(msg).fadeIn("slow").delay(2000).fadeOut(400);

                cat.isSubmitable = true;
            }
        }
        return false;
    });

});
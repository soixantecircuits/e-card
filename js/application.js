/* Author:Soixante circuits
2011
*/
var cat = {
    sens: 1,
    isSubmitable: true
};

var translation_list = {
    en: {
        error: "Oops",
        message: "Your message is not filled",
        submit: "Processing...",
        name: "Your name is not filled",
        email: "Please, check your email",
        send: "Send",
        thankyou: "Thank you !"
    },
    fr: {
        error: "Oops",
        message: "Vous n'avez pas mis de message",
        submit: "Envoi en cours...",
        name: "Votre nom n'est pas rempli",
        email: "Veuillez vérifier votre email",
        send: "Envoyé",
        thankyou: "Merci !"
    },
    de: {
        error: "Oops",
        message: "Ihre Nachricht wird nicht gefüllt",
        submit: "Verarbeitung...",
        name: "Ihr Name ist nicht gefüllt",
        email: "Bitte überprüfen Sie Ihre E-Mail",
        send: "Gesandte",
        thankyou: "Danke !"
    },
    pl: {
        error: "Oops",
        message: "Wiadomość nie jest wypełniona",
        submit: "przetwarzanie...",
        name: "Twoje nazwisko nie jest wypełniona",
        email: "Proszę sprawdzić pocztę",
        send: "poseł",
        thankyou: "Dziękujemy!"
    },
    es: {
        error: "Oops",
        message: "Su mensaje no se llena",
        submit: "tratamiento...",
        name: "Su nombre no se llena",
        email: "Por favor, consultar su correo electrónico",
        send: "enviado",
        thankyou: "¡Gracias!"
    }
};

var translation = translation_list[lang];


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function changePicture(number) {
    $("#formule h1").after('<img id="pict" src="http://dior.local/register/sac_lady_dior_' + number + '.jpg?=foo" width="200" height="300"/>');
    $("#image").attr('Value', number).attr('title', number);
}

function parseJSON(json) {
    try {
        if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)) {
            var j = eval('(' + json + ')');
            return j;
        }
    } catch (e) {}
    throw new SyntaxError("parseJSON");
}

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


$(function() {
    var delay = 1000;

    if (!avoidFlash) {
        myflash();
        delay = 54000;
    }else{
        $("#video").hide().remove();
    }

    Cufon.replace('form, #scorediv');

    //$('#message_input_box').center();
    $.subscribe("show_form", function(e, a, b, c) {
        console.log(a + b + c);
        animNuage();
        $("#video").fadeOut("fast").remove();
        $("#message_input_box").fadeIn();
        $("#nuage, #nuage1").fadeIn();
    });

    Poll.start({
        name: "show_form",
        interval: delay,
        action: function() {
            $.publish("show_form", ["a", "b", "c"]);
            return false;
        }
    });


    $('#new_message').submit(function() {
        
        $("#feedback").html(translation.submit).fadeIn("slow");
        
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

            if (form[0].value == validate.name) {
                valide = false;
                msg = translation.name;
            } else if (form[2].value == validate.message) {
                valide = false;
                msg = translation.message;
            } else if (form[1].value == validate.email) {
                valide = false;
                msg = translation.email;
            } else if (!isValidEmailAddress(form[1].value)) {
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
                        Cufon.refresh()
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
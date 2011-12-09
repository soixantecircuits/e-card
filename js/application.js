/* Author:Soixante circuits
2011
*/

/*Some param*/
var cat = {
    sens: 1,
    isSubmitable: true
};


/*Translation object*/
/*The current language is passed by the php and the _GET variable*/
var translation_list = {
    en: {
        error: "Oops",
        message: "Your message is not filled",
        submit: "Processing...",
        name: "Your name is not filled",
        email: "Please, check your email",
        send: "Send",
        thankyou: "Thank you !",
        your_name: "Your name:",
        your_name_fld: "Enter your full name ",
        receiver: "Receiver email address:",
        receiver_fld: "Enter his email address",
        your_message: "Your message",
        your_message_fld: "What's on your mind?",
        send_msg: "Send message",
        lang_lb: "Language:"
    },
    fr: {
        error: "Oops",
        message: "Vous n'avez pas mis de message",
        submit: "Envoi en cours...",
        name: "Votre nom n'est pas rempli",
        email: "Veuillez vérifier votre email",
        send: "Envoyé",
        thankyou: "Merci !",
        your_name: "Votre nom :",
        your_name_fld: "Votre nom complet ",
        receiver: "L'adresse du destinataire :",
        receiver_fld: "Inscrivez l'adresse email du destinataire",
        your_message: "Votre message",
        your_message_fld: "Qu'avez-vous en tête ?",
        send_msg: "Envoyer le message",
        lang_lb: "Language:"
    },
    de: {
        error: "Oops",
        message: "Ihre Nachricht wird nicht gefüllt",
        submit: "Verarbeitung...",
        name: "Ihr Name ist nicht gefüllt",
        email: "Bitte überprüfen Sie Ihre E-Mail",
        send: "Gesandte",
        thankyou: "Danke !",
        your_name: "Ihr Name",
        your_name_fld: "Ihr Name",
        receiver: "Die Adresse des Empfängers ein:",
        receiver_fld: "Geben Sie die E-Mail-Adresse",
        your_message: "Ihre Nachricht",
        your_message_fld: "Was willst du im Sinn?",
        send_msg: "Nachricht senden",
        lang_lb: "Sprache :"
    },
    pl: {
        error: "Oops",
        message: "Wiadomość nie jest wypełniona",
        submit: "przetwarzanie...",
        name: "Twoje nazwisko nie jest wypełniona",
        email: "Proszę sprawdzić pocztę",
        send: "poseł",
        thankyou: "Dziękujemy!",
        your_name: "Twoje imię",
        your_name_fld: "Twoje imię",
        receiver: "odbiorcy",
        receiver_fld: "Wpisz adres e-mail",
        your_message: "Twoja wiadomość",
        your_message_fld: "Co masz na myśli?",
        send_msg: "Wyślij wiadomość",
        lang_lb: "język:"
    },
    es: {
        error: "Oops",
        message: "Su mensaje no se llena",
        submit: "tratamiento...",
        name: "Su nombre no se llena",
        email: "Por favor, consultar su correo electrónico",
        send: "enviado",
        thankyou: "¡Gracias!",
        your_name: "Tu nombre",
        your_name_fld: "Tu nombre",
        receiver: "La dirección del destinatario:",
        receiver_fld: "Escriba la dirección de correo electrónico del destinatario",
        your_message: "Tu mensaje",
        your_message_fld: "¿Qué tienes en mente?",
        send_msg: "Enviar mensaje",
        lang_lb: "lengua:"
    }
};

/*we load the scrip with lang variable setup from the send.php file or index.php file*/
var translation = translation_list[lang];


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

if (!Modernizr.input.placeholder) {
    $(function() {
        H5F.setup($("#new_message"));
    });
}

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


$(function() { /* delay before we show the forms, if we use the send.php      */
    /* file then avoid flash is set to true and delay keep on 1000 */
    var delay = 1000;
     $(".jqtransform").jqTransform();
    $('#video').hide();
    if (!avoidFlash) {
        myflash();
        delay = 54000;
    } else {
        $("#video").hide().remove();
    }

    /*allow for font replacement*/
    Cufon.replace('form, #scorediv');

    /*allow to subscribe some event*/
    $.subscribe("show_form", function(e, a, b, c) {
        //console.log(a + b + c);
        animNuage();
        $("#name").attr("placeholder", translation.your_name_fld);
        $("#name_lb").html(translation.your_name);

        $("#email").attr("placeholder", translation.receiver_fld);
        $("#email_lb").html(translation.receiver);

        $("#message").attr("placeholder", translation.your_message_fld);
        $("#message_lb").html(translation.your_message);

        $("#lang_lb").html(translation.lang_lb);

        $("#send_message").val(translation.send_msg);

        if (!Modernizr.input.placeholder) {
            $(function() {
                H5F.setup($("#new_message"));
            });
        }
        Cufon.refresh();

        /*you can not fadeOut the object as it's only flash in the body*/
        $("#video").remove();
        $("#message_input_box").fadeIn();
        $("#nuage, #nuage1").fadeIn();
    });

    /*use poll to simplify delay management*/

    Poll.start({
        name: "show_form",
        interval: delay,
        action: function() {
            /*dummy object just to show that we can use object in event*/
            $.publish("show_form", ["a", "b", "c"]);
            return false;
        }
    });

    /* observ the submit event and call the post in AJAX request */
    /* also verify the content of the forms                      */

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
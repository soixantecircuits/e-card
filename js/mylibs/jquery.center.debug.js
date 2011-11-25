jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    var id = this.attr("id");

    $(window).resize(function() {
        $("#" + id).css("top", (($(window).height() - $("#" + id).outerHeight()) / 2) + $(window).scrollTop() + "px");
        $("#" + id).css("left", (($(window).width() - $("#" + id).outerWidth()) / 2) + $(window).scrollLeft() + "px");
    });
    return this;
};
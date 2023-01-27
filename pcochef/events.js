(function($, window, document) {
var v = Date.now();
    $("head").append(
        "<link rel='stylesheet' href='https://ramonaprice.github.io/pcochef/events.min.css?v="+v+"' />"
    );
    $("head").append(
        '<script type="text/javascript" src="https://pcochef-static.s3.amazonaws.com/plusapi/js/css-events.js"></script>'
    );
    $("head").append(
        '<script src="https://pcochef-static.s3.amazonaws.com/plusapi/js/htmx.min.js" defer="defer"></script>'
    );
})($, window, document);
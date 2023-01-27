(function($, window, document) {
var app = {
    observer: null,
    init: function() {
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

        var elem = document.querySelector("[hx-openurl]");
        if(elem) this.change_links(elem);

        $("body").on("htmx:load", function(){
            console.log("HTMX:load");
            console.log(this);
            console.log(elem);
        });

        $("body").on("htmx:afterSwap", function(){
            console.log("HTMX:load");
            console.log(this);
            console.log(elem);
        });

        $("*").on("htmx:load", function(){
            console.log("ALL HTMX:load");
            console.log(this);
            console.log(elem);
        });

        $("*").on("htmx:afterSwap", function(){
            console.log("ALL HTMX:swap");
            console.log(this);
            console.log(elem);
        });
    },
    change_links: function(elem) {
        this.observer = new MutationObserver(this.on_html_change);
        this.observer.observe(elem, {
            childList: true, // observe direct children
            subtree: true, // and lower descendants too
        });
    },
    on_html_change: function(mutation) {
        console.log(mutation); 
    },
}

    
app.init();
    
})($, window, document);
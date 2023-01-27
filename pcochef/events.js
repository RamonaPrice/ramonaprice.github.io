(function($, window, document) {
window.custom_events_app = {
    observer: null,
    init: function() {
        var v = Date.now();
        $("head").append(
            "<link rel='stylesheet' href='https://ramonaprice.github.io/pcochef/events.min.css?v="+v+"' />"
        );

        this.add_extension();

        document.body.addEventListener('htmx:configRequest', function (evt) {
        
            console.log(window.location.pathname)
            console.log(evt.detail.path)
            evt.detail.path = evt.detail.path + custom_events_app.get_url_vars()
        });
    },
    get_url_vars: function() {
        var vars = {};
        var qstring = "";
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        for (const [key, value] of Object.entries(vars)) {
          qstring += "&" + key + "=" + value;
        }
        console.log(qstring)
        return qstring;
    },
    add_extension: function() {
        window.htmx.defineExtension('openurl', {
            handleSwap : function(swapStyle, target, fragment, settleInfo) {
        
            if(swapStyle == "innerHTML") {
                $(fragment).find("a").each(function() {
                    var url_base = $(target).attr("hx-openurl");
                    if(!url_base) console.log("No 'hx-openurl' attribute set.");
                    var query = this.href.substring(this.href.indexOf("?"));
                    this.href = url_base +query;
                });
                $(target).html(fragment);
            }
            else {
                console.warn("Extension hx-openurl currently does not support an hx-swap"
                + " of '"+swapStyle+"'\nLinks not changed.");
            }
            return [target];
            }
        })        
    },
}

    
window.custom_events_app.init();
})($, window, document);
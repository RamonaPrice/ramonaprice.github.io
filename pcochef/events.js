/*************************************
 * events.js
 * Organization: NLCC
 * Notes: This addes the PCOChef CSS Event Embed (https://pcochef.com/plus/embeds/css-events/)
 * Embed this script, and https://pcochef-static.s3.amazonaws.com/plusapi/js/htmx.min.js
 * Add and addapt the following HTML:
 * <div 
 *    hx-get="https://pcochef.com/plusapi/o8lxG8Q/hxevents/?style=ts&amp;tags=[TAGS]&amp;filter=this_month" 
 *    hx-trigger="load" 
 *    hx-params="*" 
 *    hx-swap="innerHTML" 
 *    hx-ext="openurl" 
 *    hx-openurl="/campus-events/yorkson-events" >
 *    <img class="htmx-indicator" src="https://htmx.org/img/bars.svg" alt="Result loading..." width="150" />
 * </div>
 * 
 * Attributes:
 *    hx-get: The PCO Chef API access point. Add the queries: tags=word+word, filter=this_month
 *            Multiple tags can be combined with AND by using tags=tag1,tag2
 *    hx-trigger, hx-params, hx-swap: Leave as is
 *    hx-ext: Set this to "openurl" if you need to rewrite the base URL to go to the main events page
 *    hx-openurl: Set this to the URL you want all the links to be re-written to. Also strips tags.
 *                For example, if you set this to "/events" then this will occur:
 *                "/lifetogether?event_id=32923985&tags=life+together" > "/events?event_id=32923985"
 *    hx-keeptags: Add this if you don't want hx-openurl to strip the &tags=... from the URL
 */

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
                    if(!$(target).attr("hx-keeptags")) {
                        // Removes &tags=... on new URL
                        // To prevent this, add the attribute hx-keeptags
                        const tags_query = /tags=([^&]*)/g;
                        query = query.replace(tags_query, ""); 
                    }
                    this.href = url_base + query;
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
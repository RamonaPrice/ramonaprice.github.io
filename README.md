# ramonaprice.github.io
Hosted Files

*Organization: NLCC*
This addes the PCOChef CSS Event Embed (https://pcochef.com/plus/embeds/css-events/)
Embed events.js, and https://pcochef-static.s3.amazonaws.com/plusapi/js/htmx.min.js
Add and addapt the following HTML:

```html
<div 
   hx-get="https://pcochef.com/plusapi/o8lxG8Q/hxevents/?style=ts&amp;tags=[TAGS]&amp;filter=this_month" 
   hx-trigger="load" 
   hx-params="*" 
   hx-swap="innerHTML" 
   hx-ext="openurl" 
   hx-openurl="/campus-events/yorkson-events" 
   hx-append="#block-3300" >
   <img class="htmx-indicator" src="https://htmx.org/img/bars.svg" alt="Result loading..." width="150" />
</div>
```

**Attributes:**
   hx-get: The PCO Chef API access point. Add the queries: tags=word+word, filter=this_month
           Multiple tags can be combined with AND by using tags=tag1,tag2
           You currently cannot combine tags as OR, and you cannot exclude tags.
   hx-trigger, hx-params, hx-swap: Leave as is
   hx-ext: Set this to "openurl" if you need to rewrite the base URL to go to the main events page
   hx-openurl: Set this to the URL you want all the links to be re-written to. Also strips tags.
               For example, if you set this to "/events" then this will occur:
               "/lifetogether?event_id=32923985&tags=life+together" > "/events?event_id=32923985"
   hx-keeptags: Add this if you don't want hx-openurl to strip the &tags=... from the URL
   hx-append: Add a hash to the end of the URL to scroll to a specific element. i.e. #block-3300
 
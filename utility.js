
// utility.js

/************************
add some size and icon declarations to standard jquery-ui buttons
************************/
function buttonmaker() {
    var $this = $(this);
    var icon = $this.attr('icon');
    var rcon = $this.attr('rcon');
    var mute = $this.attr('mute');
    var size = $this.attr('size');
    var opts = {icons:{}};
    if (icon) opts.icons.primary = icon;
    if (rcon) opts.icons.secondary = rcon;
    if (mute) opts.text = false;
    $this.button(opts);
    if (size && size=='baby') $this.css({'font-size':'0.75em'});
    if (size && size=='huge') $this.css({'font-size':'1.50em'});
}

/************************
prepare a 'timespinner' widget extension to 'spinner'
as per http://jqueryui.com/spinner/#time
************************/
$.widget( "ui.timespinner", $.ui.spinner, {
    options: { /*secs*/step: 60 * 1000, /*hours*/page: 60 },
    _parse: function( value ) {
        if ( typeof value !== "string" ) return value;
        if ( Number( value ) == value ) return Number( value );
        return +Globalize.parseDate( value );
    },
    _format: function(value) {return Globalize.format(new Date(value), "t")}
});

/************************
a rounding function that works the same for strings and nums
************************/
Number.prototype.round = function(places) { return +(this.toFixed(places)) }
String.prototype.round = function(places) { return +(parseFloat(this).toFixed(places)) }

/************************
general formatters
************************/
function pad0(v) {if (v>=10) return v; return '0'+v}
function dfmt(epoch) {
    var d = new Date(1000 * epoch);
    var datestr = $.datepicker.formatDate('dd-M-yy', d);
    var timestr = pad0(d.getUTCHours()) + ':' + pad0(d.getUTCMinutes()) + ':' + pad0(d.getUTCSeconds());
    return timestr + ' ' + datestr
}

String.prototype.initCap = function(){
    return this.replace(/(?:^|\s)[a-z]/g,function(m){return m.toUpperCase()})
}

/************************
get url search-string options
************************/
function urlOpts() {
    var hash = {};
    var parts = window.location.search.slice(1).split('&');
    $.each(parts, function(i,part) {
        var pair = part.split('=').map(decodeURIComponent);
        hash[pair[0]] = pair[1]
    });
    return hash;
}

/***************************
Globalize helpers
   We need to upgrade from Globalize 0.9 to Globalize 1.0.  Till then:
   http://freeda.dbnet.com.au/pub/globalize/0.1.1/examples/browser/
************************/
function niceDayUTC(epochStr) {
    var epoch = parseInt(epochStr) + g.timezone_offset;
    return Globalize.format(new Date(epoch*1000), "dd-MMM-yyyy", 'en-GB');
}
function niceTimeUTC(epochStr) {
    var epoch = parseInt(epochStr) + g.timezone_offset;
    return Globalize.format(new Date(epoch*1000), "HH:mm:ss", 'en-GB');
}
function niceDate(epochStr) {
    var d = new Date(parseInt(epochStr)*1000);
    return Globalize.format(d, "dd-MMM-yyyy HH:mm:ss", 'en-GB');
}


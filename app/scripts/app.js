// markdown
// formatté
var divSrc = document.getElementById("idDivSrc");
marked(divSrc.innerHTML, {}, function (err, content) {
    if (err) throw err;
    divSrc.innerHTML = content;
});

// Utilisation de marked combiné à highlight
var divToMarkdown = document.getElementById("idDivToMarkdown");
marked(divToMarkdown.innerHTML, {
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
}, function (err, content) {
    if (err) throw err;
    divToMarkdown.innerHTML = content;
});

document.getElementById("scrollTop").onclick = function () {
    scrollTo(document,"top",1000);
};

// scroll top function without jQuery
function scrollTo(doc, direction, duration) {
    var element, to;
    if (direction == "top") {
        if (doc.documentElement && (doc.documentElement.clientWidth || doc.documentElement.clientHeight) && !doc.body.scrollTop)
            element = doc.documentElement;
        else
            element = doc.body;
        to = 0;
    } else {
        if (doc.documentElement && !doc.documentElement.scrollTop && !doc.body.scrollTop) {
            doc.documentElement.scrollTop = 1;
            if (doc.documentElement.scrollTop == 1) {
                element = doc.documentElement;
            } else {
                element = doc.body;
            }
        } else {
            element = doc.body;
        }
        to = element.scrollHeight;
    }
    return _scrollTo(element, to, duration);

    function _scrollTo (element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = (difference / duration) * 10;
        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            _scrollTo(element, to, duration - 10);
        }, 10);
    }
}

// facebook
(function ScopeLike(d, s, id) {
    var
        js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// twitter
!function ScopeTwitterFollowButton(d, s, id) {
    var
        js,
        fjs = d.getElementsByTagName(s)[0];

    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    }
}(document, "script", "twitter-wjs");

// google plus
window.___gcfg = {lang: 'fr'};
(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();
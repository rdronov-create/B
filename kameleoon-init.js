(function () {
    var kameleoonLoadingTimeout = 1000;

    window.kameleoonQueue = window.kameleoonQueue || [];
    window.kameleoonStartLoadTime = new Date().getTime();

    if (!document.getElementById("kameleoonLoadingStyleSheet") && !window.kameleoonDisplayPageTimeOut) {
        // Используем currentScript, если доступен (более надёжно)
        var currentScript = document.currentScript;
        var refScript = currentScript || document.getElementsByTagName("script")[0];
        if (!refScript) return;

        var css = "* { visibility: hidden !important; background-image: none !important; }";
        var style = document.createElement("style");
        style.id = "kameleoonLoadingStyleSheet";
        style.type = "text/css";

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        // Вставляем стиль перед референсным скриптом (обычно — перед этим же <script>)
        var parent = refScript.parentNode;
        if (parent) {
            parent.insertBefore(style, refScript);
        } else {
            // fallback: в head
            (document.head || document.documentElement).appendChild(style);
        }

        window.kameleoonDisplayPage = function (fromEngine) {
            if (!fromEngine) {
                window.kameleoonTimeout = true;
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };

        window.kameleoonDisplayPageTimeOut = setTimeout(window.kameleoonDisplayPage, kameleoonLoadingTimeout);
    }
})();

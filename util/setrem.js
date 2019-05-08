(function (win, doc) {
    var docEl = doc.documentElement;
   
    function setRemUnit () {
        var docWidth = docEl.clientWidth;
        var rem = docWidth / 10;
        docEl.style.fontSize = rem + "px";
    }
   
    win.addEventListener("resize", function () {
        setRemUnit();
    }, false);
    win.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    }, false);
   
    setRemUnit();
   
    if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
        var testEl = doc.createElement("div");
        var fakeBody = doc.createElement("body");
        testEl.style.border = "0.5px solid transparent";
        fakeBody.appendChild(testEl);
        docEl.appendChild(fakeBody);
        if (testEl.offsetHeight === 1) {
            docEl.classList.add("hairlines");
        }
        docEl.removeChild(fakeBody);
    }
}) (window, document);
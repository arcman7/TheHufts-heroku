$(document).on("ready",function(){
  $('.test-link').on("click", function(e){
    e.preventDefault();
    console.log("clicked")
    $('.profit-row').hide());
  })
});

var cm = CodeMirror(document.getElementById('cmContainer'), {
          mode: "javascript",
          theme: "default",
          lineNumbers: true,
          readOnly: true
});

var docJS = CodeMirror.Doc(new Array(10).join(new Array(20).join('JS') + '\n'));
var docCPlus = CodeMirror.Doc(new Array(10).join(new Array(3).join('c++ ') + '\n'));
var docRuby = CodeMirror.Doc(new Array(10).join(new Array(3).join('ruby ') + '\n'));
var docPython = CodeMirror.Doc(new Array(10).join(new Array(3).join('python ') + '\n'));
cm.swapDoc(docJS);

function swapJS() {
    cm.swapDoc(docJS);
};

function swapCPlus() {
    cm.swapDoc(docCPlus);
};
function swapRuby() {
    cm.swapDoc(docRuby);
};
function swapPython() {
    cm.swapDoc(docPython);
};

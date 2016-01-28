
$(document).ready(function(){
  /* activate sidebar */
  $('#sidebar').affix({
    offset: {
      top: 235
    }
  });

  /* activate scrollspy menu */
  var $body   = $(document.body);

  $body.scrollspy({
    target: '#leftCol',
    offset: 100
  });

  /* smooth scrolling sections */
  $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 50
          }, 1000);
          return false;
        }
      }
  });
});

var cm = CodeMirror(document.getElementById('cmContainer'),
        {
            mode: "javascript",
            theme: "default",
            lineNumbers: true,
            readOnly: false
        });

var docJS = CodeMirror.Doc(new Array(10).join(new Array(20).join('JS') + '\n'));
var docCPlus = CodeMirror.Doc(new Array(10).join(new Array(3).join('c++ ') + '\n'));
var docRuby = CodeMirror.Doc(new Array(10).join(new Array(3).join('ruby ') + '\n'));
var docPython = CodeMirror.Doc(new Array(10).join(new Array(3).join('python ') + '\n'));
cm.swapDoc(docJS);
// cm.setOption('mode','javascript');

function swapJS() {
  cm.swapDoc(docJS);
  cm.setOption('mode','javascript');
  console.log("mode set to js")
};

function swapCPlus() {
  cm.swapDoc(docCPlus);
  cm.setOption('mode','clike');
  console.log("mode set to c++")

};
function swapRuby() {
  cm.swapDoc(docRuby);
  cm.setOption('mode','ruby');
  console.log("mode set to ruby")

};
function swapPython() {
  cm.swapDoc(docPython);
  cm.setOption('mode','python');
  console.log("mode set to python")

};

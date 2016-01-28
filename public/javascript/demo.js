
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

var cm = CodeMirror(document.getElementById('cmContainer'), {
                    'lineNumbers': true
});

var docJS = CodeMirror.Doc(new Array(50).join(new Array(20).join('abc ') + '\n'));
var docCPlus = CodeMirror.Doc(new Array(10).join(new Array(3).join('def ') + '\n'));
var docRuby = CodeMirror.Doc(new Array(10).join(new Array(3).join('def ') + '\n'));
var docPython = CodeMirror.Doc(new Array(10).join(new Array(3).join('def ') + '\n'));
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

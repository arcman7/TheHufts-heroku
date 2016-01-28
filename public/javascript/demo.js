
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

  cm.swapDoc(doc1);

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

// var e_one = CodeMirror.fromTextArea(document.getElementById("demo"));
// var e_two = CodeMirror.fromTextArea(document.getElementById("demo2"));

//   function onChange(){
//       // if $(this).val() == '1'{
//        e_two.value = e_one.getValue();
//      // }
//   };

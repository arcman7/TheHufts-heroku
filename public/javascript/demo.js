
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
var buffers_top = CodeMirror.fromTextArea(document.getElementById("demo"), {
      lineNumbers: true,
      matchBrackets: true,
      styleActiveLine: true,
      theme:"neo"
    });

  var buffers_bot = CodeMirror.fromTextArea(document.getElementById("demo2"), {
      lineNumbers: true,
      matchBrackets: true,
      styleActiveLine: true,
      theme:"neo"
    });
});

// var e_one = CodeMirror.fromTextArea(document.getElementById("demo"));
// var e_two = CodeMirror.fromTextArea(document.getElementById("demo2"));

//   function onChange(){
//       // if $(this).val() == '1'{
//        e_two.value = e_one.getValue();
//      // }
//   };

$(document).ready(function($){
  var clock = $("#clock");
  var data  = clock.data("date-time");

  if( data != "" )
  {
    clock.countdown(data)
    .on('update.countdown', function(event) {
      var format = '%H:%M:%S';
      if(event.offset.totalDays > 0) {
        format = '%-D:' + format;
      }
      /*if(event.offset.weeks > 0) {
d      }*/
      $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function(event) {
      $(this).html('This offer has expired!')
        .parent().addClass('disabled');
    
    });
  }
  // envio del formulario por ajax  
  $.validate();
  // popover
  $("#pet1, #pet2").click(function(){

    var _tis = $(this);
    var _name = _tis.attr("id")
    
    if( _name == "pet1" )
    {
       _tis.popover("show");
       $("#pet2").popover("hide");
    }else{
      _tis.popover("show");
      $("#pet1").popover("hide");
    }

  });

  //$('[data-toggle="popover"]').popover();
  
});
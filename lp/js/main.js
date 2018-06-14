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
        format = '%-w week%!w ' + format;
      }*/
      $(this).html(event.strftime(format));
    })
    .on('finish.countdown', function(event) {
      $(this).html('This offer has expired!')
        .parent().addClass('disabled');
    
    });
  }
});
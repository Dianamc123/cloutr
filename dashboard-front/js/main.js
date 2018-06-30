$(document).ready(function(){

    $("#pet").popover({
        html : true,
        content : "<b>Need some help?</b>"
    });


    $('#pet').popover('show')

    // calendar 
    $("#calendar").fullCalendar({
        height: 'parent',
        contentHeight: "auto",
         header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        showNonCurrentDates :false,
        viewRender :function(view, element){
            var mes = view.start.format("MMMM");
            var year = view.start.format("Y");
            var $title = $("#calendar .fc-toolbar .fc-center");
            
            $title.html("<h2><span clas='mes'>"+mes+"</span><br> <span class='year'>"+year+"</span>" );
            console.log(view, element)
        }
    });
});
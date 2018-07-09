$(document).ready(function(){

    // pet dialo
    $("#pet, #pet2 , #pet3").popover({
        html : true,
        content : "<b>Need some help?</b>"
    });

    // barsearch float
    $("#btn-search-float").click(function(e){
        e.preventDefault();

        $("#barsearch-float").toggle();
    });

    //  collapse oters list
    $("[data-toggle=collapse]").click(function(){

        var _tis = $(this);
        var $collpase = $("[data-toggle=collapse]").not(_tis);
        
        $collpase.each(function(){
            var taret = $(this).data("target");
            $(taret).collapse("hide");
        })
    });


    //  pet tole navbar
    $('#pet').mouseenter(function(){ 
      var _tis = $(this);
      //var bottom =  parseInt( _tis.css("bottom") );
       _tis.css("bottom","-1rem");
       _tis.popover("show");
     
    
    }).mouseleave(function(){
        var _tis = $(this);

        _tis.popover("hide");
        _tis.css("bottom","-3rem");
    });



    // 
    $(".date").datepicker();
    // calendar 
    $("#calendar").fullCalendar({
        events:  [
            /*{
               "title":"Long Event",
               "start":"2018-07-07",
               "end":"2018-07-10"
            },
            {
               "id":999,
               "title":"Repeating Event",
               "start":"2018-07-09T16:00:00+00:00"
            },
            {
               "id":999,
               "title":"Repeating Event",
               "start":"2018-07-16T16:00:00+00:00"
            },
            {
               "title":"Conference",
               "start":"2018-07-07",
               "end":"2018-07-09"
            },
            {
               "title":"Meeting",
               "start":"2018-07-08T10:30:00+00:00",
               "end":"2018-07-08T12:30:00+00:00"
            },
            {
               "title":"Lunch",
               "start":"2018-07-08T12:00:00+00:00"
            },
            {
               "title":"Birthday Party",
               "start":"2018-07-09T07:00:00+00:00"
            },
            {
               "title":"Click for Google",
               "start":"2018-07-28"
            },
            {
               "title":"Meeting",
               "start":"2018-07-08T14:30:00+00:00"
            },
            {
               "title":"Happy Hour",
               "start":"2018-07-08T17:30:00+00:00"
            },
            {
               "title":"Dinner",
               "start":"2018-07-08T20:00:00+00:00"
            }*/
         ],
        height: 'parent',
        contentHeight: "auto",
         header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        eventLimit: 1,
        eventLimitText: function(number){
            return number
        },
        showNonCurrentDates :false,
        viewRender :function(view, element){
            var mes = view.start.format("MMMM");
            var year = view.start.format("Y");
            var $title = $("#calendar .fc-toolbar .fc-center");
            /// reasin title calendar
            $title.html("<h2><span clas='mes'>"+mes+"</span><br> <span class='year'>"+year+"</span>" );
        }
    });

    // movil tab
    $("#tabs li").click(function(){

        var _tis = $(this);
        var _taret = $(_tis.data("target") );
        var $tabs = _tis.closest("ul");

        $tabs.find("li").not(_tis).each(function(){
            var taret = $(this).data("target");
            $(this).removeClass("active");
            $(taret).fadeOut();
        });

        _tis.addClass("active");
        _taret.fadeIn();
    
    });


    // popoover movil
    $("#navbarNav, #navbar3").on("show.bs.collapse",function(){
        $(this).find(".pet").popover("show");
    }).on("hide.bs.collapse",function(){
        $(this).find(".pet").popover("hide");
    });

    // active select bootstrap picker
    if( $.fn.ddslick )
        $('select.selectpicker').ddslick({
            background: "#FCFCFC",
            embedCSS: false,
            width: '100%'
        });


});
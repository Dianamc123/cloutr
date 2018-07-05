$(document).ready(function(){

    // pet dialo
    $("#pet, #pet2").popover({
        html : true,
        content : "<b>Need some help?</b>"
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
    $("#navbarNav").on("show.bs.collapse",function(){
        $(this).find(".pet").popover("show");
    }).on("hide.bs.collapse",function(){
        $(this).find(".pet").popover("hide");
    });


});
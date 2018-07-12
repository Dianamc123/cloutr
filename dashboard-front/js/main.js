// vars
var $events = [
{
    "title":"Long Event",
    "start":"2018-07-23T16:41:00+00:00",
 },
 {
    "id":999,
    "title":"Repeating Event",
    "start":"2018-07-23T16:30:00+00:00"
 },
 {
    "id":999,
    "title":"Repeating Event 2",
    "start":"2018-07-21T16:20:00+00:00"
 },
 {
    "title":"Conference",
    "start":"2018-07-21T13:10:00+00:00",
 },
 {
    "title":"Meeting",
    "start":"2018-07-23T10:30:00+00:00",
 },
 {
    "title":"Lunch",
    "start":"2018-07-24T12:00:00+00:00"
 },
 {
    "title":"Birthday Party",
    "start":"2018-07-24T07:00:00+00:00"
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
 }
];
var StoreEvents = {}


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
        events: $events,
        height: 'parent',
        contentHeight: "auto",
         header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        showNonCurrentDates :false,
        eventAfterRender: function(event, element){
            var $out = false;
            var day = event.start.format("DDD");
            var index =  event.start.format("Hmm");
            var td = element.closest(".fc-event-container");

            // if not exist in storeEvents return a do red
            if( !StoreEvents.hasOwnProperty( day ) ){
                // set the day 
                StoreEvents[ day ] = {};
                td.html( "<span class='dot-red'></span>");
                $out = true;
            }
                
            //check the index
            if( !StoreEvents[ day ].hasOwnProperty( index ) ){
                StoreEvents[day][index] = {};
            }

            // store the event in memory 
            StoreEvents[day][index] = event;
            
            if( !$out )
                element.replaceWith("<td></td>");
        },
        viewRender :function(view, element){
            var mes = view.start.format("MMMM");
            var year = view.start.format("Y");
            var $title = $("#calendar .fc-toolbar .fc-center");
            /// reasin title calendar
            $title.html("<h2><span clas='mes'>"+mes+"</span><br> <span class='year'>"+year+"</span>" );
        },
        dayClick: function( date, jsEvent, view ){

            var day = date.format("DDD");
            var $m = $("#CalendarModal");
            var $date = date.format("DD MMMM YYYY");
            var $modalbody = $m.find(".modal-body");
            var $modaltitle = $m.find(".modal-title");

            $modalbody.empty();


            //-- verify the events in the day
            if( StoreEvents.hasOwnProperty( day ) )
            {
                var $list = StoreEvents[day];

                $.each($list,function(index,event){
                    $modalbody.append("<p>"+event.start.format("HH:mm")+" : "+event.title+"</p>")
                });
               
            }else{
                $modalbody.append("<p>No events today</p>");
            }

             //-- search the title
             $modaltitle.text( $date );

             //-show modal
             $m.modal("show");
            
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
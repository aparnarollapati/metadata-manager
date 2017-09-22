/**
 * LUNA - Responsive Admin Theme
 *
 */

$(document).ready(function () {
	
	//  Set up the data tables used for content
	$('table.display').DataTable({
        "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "lengthMenu": [ [6, 25, 50, -1], [6, 25, 50, "All"] ],
        "iDisplayLength": 6,
        responsive: true
    });

    // Handle minimalize left menu
    $('.left-nav-toggle a').on('click', function(event){
        event.preventDefault();
        $("body").toggleClass("nav-toggle");
    });

    // Hide all open sub nav menu list
    $('.nav-second').on('show.bs.collapse', function () {
        $('.nav-second.in').collapse('hide');
    });

    // Handle panel toggle
    $('.panel-toggle').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        var icon = $(event.target).closest('i');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });

    // Handle panel close
    $('.panel-close').on('click', function(event){
        event.preventDefault();
        var hpanel = $(event.target).closest('div.panel');
        hpanel.remove();
    });
    
});

/* fix mousewheel 1 - stops spinning the numbers up and down with mousewheel, but it also stops the page scrolling while the cursor is over the input, which is unexpectected behavior */

$('.input-fix-mousewheel1').on('focus', function (e) {
  $(this).on('mousewheel.disableScroll', function (e) {
    e.preventDefault();
  })
}).on('blur', function (e) {
  $(this).off('mousewheel.disableScroll')
});


/* fix mousewheel 2 - in addition to the above, this passes on the mousewheel delta to scroll the page as the user expected */

$('.input-fix-mousewheel2').on('focus', function (e) {
  $(this).on('mousewheel.disableScroll', function (e) {
    e.preventDefault();
    var scrollTo = (e.originalEvent.wheelDelta*-1) + $(document.documentElement).scrollTop();
    $(document.documentElement).scrollTop(scrollTo);
  })
}).on('blur', function (e) {
  $(this).off('mousewheel.disableScroll')
});

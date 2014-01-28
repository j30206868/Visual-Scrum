// JavaScript Document

$(document).ready(function() {
	// Function for get cell with
	function getDateFromCell(td, calInstance){
		var cellPos = {
			row: td.parents('tbody').children().index(td.parent()),
			col: td.parent().children().index(td)
		};
		//console.log("時間: "+calInstance.fullCalendar('getView').cellDate(cellPos));
		return calInstance.fullCalendar('getView').cellDate(cellPos);
	}
	
	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#cal_external-events div.cal_external-event').each(function() {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});		
	$('ol#sortable-events').sortable({
		helper: 'clone',        
		placeholder: 'placeholder',
		start: function(ev, ui) {		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			var eventObject = {
				id:    				$.trim($(ui.item).attr('id')),  // use the element's id as the event id
				title: 				$.trim($(ui.item).text()), 		// use the element's text as the event title
				start: 				new Date("2013-02-18T18:00:00"),//"2013-02-18T18:00:00", //day,
				end: 				new Date("2013-02-18T18:00:00"),//"2013-02-18T18:00:00",//day,
				allDay: true 
				};
		
			// store the Event Object in the DOM element so we can get to it later
			$(ui.item).data('eventObject', eventObject);
			$(ui.item).data('dropped', false);
	
			return  true;      
		},
		stop: function(ev, ui) {
			// Restore place of Event Object if dropped
			if ( $(ui.draggable).data('dropped') == true ) {
				$('ol#sortable-events').nestedSortable('cancel'); 
				$(ui.draggable).data('dropped') = false ;
				}
			}			
		}).disableSelection();
	
	
	/* initialize the calendar
	-----------------------------------------------------------------*/
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
			},
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		//dropAccept: '#cal_external-events div.cal_external-event',
		drop: function(date, allDay) { // this function is called when something is dropped
		
			//console.log("$(this).data('eventObject') = "+$(this).data('eventObject'));
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
		}
	}).find('td').each(function() {
		$(this).droppable({
			// greedy: false,
			//accept: "ol#sortable-events li.sortable-event",
			// activeClass: "active",
			tolerance: 'pointer',
			hoverClass: "fc-cell-overlay",
			drop: function( event, ui ) {

				if ( $(ui.draggable).data('dropped') == false ) {
					// Get the event and init with the date
					var eventObject = $(ui.draggable).data('eventObject');
					
					console.log(eventObject);
			
					var ddrop 		= getDateFromCell( $(this), $('#calendar') );
					eventObject.start = ddrop ;
					eventObject.end = ddrop ;
	
					// Delete the event if already dropped
					$('#calendar').fullCalendar( "removeEvents", eventObject.id );
	
					// render the event on the calendar
					// the last `true` argument determines if the event "sticks" 
					//$('#calendar').fullCalendar('renderEvent', eventObject, true);
					$('#calendar').fullCalendar('addEventSource', {
						events: [
							eventObject
						],
						className: 	'calendarTasks',//$(ui.item).attr('class'),
						editable: true,
						allDay: true 
					});
	
					// Dropped flag is true state now
					$(ui.draggable).data('dropped') == true
					
				}
	
				return true;                      
			}
		})
	});
	
	$("#calendarContainer").css('display', 'none');
});

//schedule 區域初始化
$('#schedule').ready(function() {
	var mouseEvent;
	document.body.addEventListener('mousemove', function(evt){
		mouseEvent = evt;
	}, false);
	
	//Backlog
	$('#schedule').droppable({
		over: function(evt, ui){

			//show calendar
			$('#calendarContainer').css('display', 'block');
			$('#calendar').fullCalendar( 'render' );
		},
		tolerance: "pointer"
	});
	
	$('#schedule').on('click', function(){
		if( $('#calendarContainer').css('display') == 'none' ){
			$('#calendarContainer').css('display', 'block');
		}else{
			$('#calendarContainer').css('display', 'none');
		}
	});
	
	// Calendar
	$('#calendarContainer').on('click', function(){
		$(this).css('display', 'none');
	});
	
	$('#wrap').on('click', function(evt){
		evt.stopPropagation();
	});
});
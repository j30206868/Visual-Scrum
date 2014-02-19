// JavaScript Document
var subTaskIdCount = 1;
function initTasks(){
	var taskCounter = 0;
	$('#taskGenerator').draggable({
		revert: "invalid",
		helper: "clone",
		cursor: 'move'
	});
	
	$('#tasksArea').droppable({
		accept: '.tasks, #taskGenerator',
		drop: function(evt, ui){
			
			
			//taskGenerator才會產生新的task 其他都只是在drag
			if( ui.helper.attr('identify') == 'taskGenerator' ){
				taskCounter++;
				
				var taskHelper = document.createElement('li');
				taskHelper.setAttribute('class', 'tasks ui-widget-content ui-corner-tr');
				taskHelper.setAttribute('identify', 'taskGenerator');
				
				$('<h5 class="ui-widget-header taskTitle" style="">任務'+taskCounter+'</h5><div class="taskEditWrapper"><i class="addSubTaskBtn fa fa-plus"></i><i class="editTask fa fa-cogs"></i></div><ul class="subTaskSortable"></ul>').appendTo(taskHelper);
				
				var newTaskId = "task_"+taskCounter;
				var newTask = taskHelper;
				
				//$(newTask).removeClass('ui-draggable ui-draggable-dragging');
				$(newTask).attr('id', newTaskId);
				$(newTask).removeAttr('identify');
				$(newTask).css('position', 'absolute');
				$(newTask).css('left', ui.helper.css('left') );
				$(newTask).css('top', ui.helper.css('top') );
				
				var evtObject = {
					title: '任務' // use the element's text as the event title
				};
				
				// store the Event Object in the DOM element so we can get to it later
				$(newTask).data('eventObject', evtObject);
				
				$(newTask).draggable({
					revert: "invalid",
					refreshPositions: true,
					appendTo: "body",
					zIndex: 9999,
					revertDuration: 100,
					/*stop: function(event, ui){
						//將position改回absolute 要轉換位址
						if( $(this).css('position') == 'relative'){
							ui.helper.css('position', 'abosolute');
							//$(this).css('position', 'abosolute');
							//$(this).css('left', parseInt( ui.helper.css('left').substr(0, ui.helper.css('left').length-2) )  );
							//$(this).css('top', parseInt( ui.helper.css('top').substr(0, ui.helper.css('top').length-2) ) );
							console.log('change');
						}
						$(this).css('position', 'abosolute');
					},*/
				});
			
				$(newTask).appendTo(this);
				
				//
				$(newTask).on('click', function(evt){
					evt.stopPropagation();
				});
				
				//註冊 新增子任務的按鈕event
				$('#'+newTaskId+' > .taskEditWrapper > .addSubTaskBtn').on('click', function(){
					
					var sortableContainer = $(this).parent().parent().children('.subTaskSortable');
					
					console.log(sortableContainer);
					
					//$('<li class="ui-widget-header subTasks" id=\"st_"'+subTaskIdCount+'\"">子任務'+subTaskIdCount+'<i class="editTask fa fa-cog"></li>').appendTo( sortableContainer );
					
					//創建子任務element
					var newSTID = 'st_'+subTaskIdCount;
					jQuery('<li/>', {
						id: newSTID,
						class: 'ui-widget-header subTasks',
						title: '子任務'
					}).appendTo( sortableContainer );
					
					jQuery('<font/>',{
						class: 'subTaskFont',
						text: '子任務'+subTaskIdCount
					}).appendTo('#'+newSTID);
					
					jQuery('<i>',{
						class: 'editTask fa fa-cog',
						style: 'float:right;'
					}).appendTo('#'+newSTID);
					
					
					//註冊 子任務編輯功能
					$('#'+newSTID+' > .editTask').on('click',function(){
						var _container = $(this).parent();
						
						console.log(this);
						
						var edX = $(this).offset().left - 33;
						var edY = $(this).offset().top - 100;
						
						var editContainer = initEditDialog( edX, edY, _container.children('.subTaskFont').text(), "subtask", 
						function( _value ){
							_container.children('.subTaskFont').text( _value );
						},
						function(){
							//_container.remove();
							//_container.sortable('disable');						
						} );
					});
					
					subTaskIdCount++;
				});	
				
				//註冊 任務編輯功能
				$('#'+newTaskId+' > .taskEditWrapper > .editTask').on('click', function(){
					
					var _container = $(this).parent().parent();
					
					var edX = $(this).offset().left - 40;
					var edY = $(this).offset().top - 105;
					
					var editContainer = initEditDialog( edX, edY, _container.children('.ui-widget-header').text(), "task", 
					function( _value ){
						_container.children('.ui-widget-header').text( _value );
					},
					function(){
						//_container.remove();
						_container.draggable('disable');						
					} );
					
				});
				
				$('.subTaskSortable').sortable({
					connectWith: ".subTaskSortable",
					cursor: 'move',
					dropOnEmpty:true,
					refreshPositions: true,
					placeholder: "sortablePlaceHolder",
					zIndex: 10000,
					//tolerance: 'pointer',
					start: function(ev, ui) {		
						// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
						var eventObject = {
							id:    				$.trim($(ui.item).attr('id')),  // use the element's id as the event id
							title: 				$.trim($(ui.item).text()), 		// use the element's text as the event title
							start: 				new Date("2013-02-18T18:00:00"),//"2013-02-18T18:00:00", //day,
							end: 				new Date("2013-02-18T18:00:00"),//"2013-02-18T18:00:00",//day,
							backgroundColor: 	$(ui.item).css('background-color'),
							borderColor: 		$(ui.item).css('background-color'),
							textColor: 			$(ui.item).css('color'),
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
						
						//防止 在排序calendar時 意外的把subtask拖到別的地方去
						if( $('#calendarContainer').css('display') == 'block' ){
							$(this).sortable( "cancel" );
						}
					}

					
				}).disableSelection();
			}
		}	
	}).on('click', function(){
		// Task Area 連點會把任務排序
		
		//先照順序一一改成relative
		for(var i=1 ; i<=taskCounter ; i++){
			$('#task_'+i).css('position','relative');
			$('#task_'+i).css('left','');
			$('#task_'+i).css('top','');
		}	
	});

}
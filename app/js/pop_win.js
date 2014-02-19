$(document).ready(function() {
	$('a.login-window').click(function() {
		
		// Getting the variable's value from a link 
		var loginBox = $(this).attr('href');

		//Fade in the Popup and add close button
		$(loginBox).fadeIn(300);
		
		//Set the center alignment padding + border
		var popMargTop = ($(loginBox).height() + 24) / 2; 
		var popMargLeft = ($(loginBox).width() + 24) / 2; 
		
		$(loginBox).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		// Add the mask to body
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		
		return false;
	});
	
	// When clicking on the button close or the mask layer the popup closed
	/*$('a.close, #mask').live('click', function() { 
	  $('#mask , .pop_win').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
	});*/
	//$("#pop_win_wrapper").css("display", "none");
	$("#pop_win_wrapper").on('click', function(){
		$("#pop_win_wrapper").css("display", "none");
		console.log('asdf');	
	});
	
	$("#pop_win").on('click', function(evt){
		evt.stopPropagation();
	});
	
	//指派任務時間 表單處理
	
	$("#subtask_startdate_picker").datetimepicker({
		stepMinute:30,
		minuteGrid:30
	});
	$("#subtask_enddate_picker").datetimepicker({
		stepMinute:30,
		minuteGrid:30
	});
});
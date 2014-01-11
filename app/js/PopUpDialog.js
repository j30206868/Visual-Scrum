// JavaScript Document

//使用方法
/*

var editContainer = initEditDialog( edX, edY, _text.getText(), 
function( _value ){
	_text.setText( _value );
	_layer.draw();
},
function(){
	_group.remove();
	_layer.draw();				
} );

*/

//epic使用
function initEditDialog(_x, _y, _text, textChangeEvent, markOverEvent){
	var isInsideDynEditor = 0;

	
	//新增editor container
	var editContainer = document.createElement("div");
	editContainer.setAttribute("id", "dyn_editContainer");
	
	//新增 editor div (背景)
	var editDiv = document.createElement("div");
	editDiv.setAttribute("id", "dyn_editdiv");
	
	//新增 text area
	var editTextArea = document.createElement("TextArea");
	//新增 text area 的背景img
	var editorMsgImg = document.createElement('IMG');
	editorMsgImg.setAttribute("src", "img/editor.png");
	var emiId=document.createAttribute("id");
	emiId.value="dyn_textareaimg";
	editorMsgImg.setAttributeNode(emiId);
	
	//將epic的內容 讀入text area 讓使用者編輯
	var taContent = document.createTextNode( _text );
	editTextArea.appendChild( taContent );
	
	//設定 text area 的class
	var taClass=document.createAttribute("class");
	taClass.value="dyn_textarea";
	editTextArea.setAttributeNode(taClass);
	
	//設定 text area的id
	var taId=document.createAttribute("id");
	taId.value="dyn_textarea";
	editTextArea.setAttributeNode(taId);
	
	//設定標示已過期icon 跟 文字
	var editDetailContainer = document.createElement('div');
	editDetailContainer.setAttribute('id', 'editDetailContainer');
	
	var editDetailIcon = document.createElement('i');
	editDetailIcon.setAttribute('class', 'fa fa-caret-right');
	
	editDetailContainer.appendChild( document.createTextNode('編輯功能') );
	editDetailContainer.appendChild( editDetailIcon );
	
	/*	要加入以後 才能夠註冊事件	*/
	editDiv.appendChild(editTextArea);
	editDiv.appendChild(editDetailContainer);
	
	$(editDetailContainer).on('click',function(){		

		//取得x y座標
		var sX = parseInt(_x) + parseInt( $(this).css('width').substr(0, $(this).css('width').length-2) ) - 11;
		var sY = parseInt(_y) + parseInt( $(editContainer).css('height').substr(0, $(editContainer).css('height').length-2) ) - 7;
		//創下拉選單
		if( $('#dyn_SelctContainer')[0] == undefined ){
			initEditPopUpSelection( sX, sY, markOverEvent );
			editDetailIcon.setAttribute('class', 'fa fa-caret-down');
		}else{
			document.body.removeChild( document.getElementById('dyn_SelctContainer') );
			editDetailIcon.setAttribute('class', 'fa fa-caret-right');
		}
	});
	
	//設定 div 的位置
	var edStyle = document.createAttribute("style");
	var edX = _x;
	var edY = _y;
	edStyle.value = "position:absolute; left:"+edX+"px; top:"+edY+"px;";
	//emiStyle.value += "width:"+(_text.getWidth()+30)+"px;";
	
	editContainer.setAttributeNode(edStyle);
	
	// 若 input 則更新epic的內容
	editTextArea.addEventListener('input', function(){
		
		textChangeEvent(this.value);
		
	}, false);
	
	//測定是否離開 dyn_div 範圍
	editDiv.addEventListener('mouseleave', function(){
		isInsideDynEditor = 0;
	}, false);
	editDiv.addEventListener('mouseenter', function(){
		isInsideDynEditor = 1;
	}, false);
	
	//若離開又點擊滑鼠的話 刪除dyn_div
	var dyn_delevent = function(){
		if(!isInsideDynEditor){
			document.body.removeChild( document.getElementById('dyn_editContainer') );
			
			if( $('#dyn_SelctContainer')[0] != undefined ){
				document.body.removeChild( document.getElementById('dyn_SelctContainer') );
			}

			document.body.removeEventListener('mousedown', dyn_delevent, false);
		}		
	}
	document.body.addEventListener('mousedown', dyn_delevent, false);
	
	
	//把 dyn_div 加入頁面
	//editDiv.appendChild(editorMsgImg);
	editContainer.appendChild(editDiv);
	document.body.appendChild(editContainer);
	
	//觸發focus 使其可以順利偵測blur
	document.getElementById("dyn_textarea").focus();
	
	return editContainer;
}

function initEditPopUpSelection(_x, _y, markOverEvent){
	
	var editSelctContainer = document.createElement('div');
	editSelctContainer.setAttribute('id', 'dyn_SelctContainer');
	editSelctContainer.setAttribute('style', 'position:absolute; left:'+_x+'px; top:'+_y+'px;');
	
	var _ui = document.createElement('ui');
	
	var _option1 = document.createElement('li');
	_option1.setAttribute('class', 'fa fa-lock');
	_option1.innerHTML = ' 標示為已過期';
	
	_option1.addEventListener('mousedown', function(evt){	
	
		//阻止user滑鼠還沒放開時就刪除dialog	
		evt.stopPropagation();
	
	}, false);
	
	_option1.addEventListener('click', function(evt){	
		markOverEvent();
		
		//觸發點擊事件 使整個dialog跟著消失
		//可能會有ie不支援問題 ie 沒有 dispatchEvent
		var mousedownEvt = document.createEvent('Event');
		mousedownEvt.initEvent("mousedown", true, true);
		document.body.dispatchEvent( mousedownEvt );
	}, false);
	
	var _option2 = document.createElement('li');
	_option2.setAttribute('class', 'fa fa-user');	
	_option2.innerHTML = ' 分派任務';
	
	_ui.appendChild( _option1 );
	_ui.appendChild( _option2 );
	editSelctContainer.appendChild( _ui );
	
	document.body.appendChild( editSelctContainer );
	
}
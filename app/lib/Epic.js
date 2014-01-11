// JavaScript Document

//工作群組區(epic頁面)初始化

var epicAreaParentId;
function epicAreaInit( parentId ){
	epicAreaParentId = parentId;
	
	//加入epic area 所有的dom element
	var epicAreaWrapper = document.createElement( 'div' );
	epicAreaWrapper.setAttribute('id', 'epicAreaWrapper');
	
	$( epicAreaWrapper ).append('<i id="new_epic" class="myCustomBtn fa fa-pencil-square-o"> 新增工作群組</i>');
	$( epicAreaWrapper ).append('<div id="epicBoard"></div>');
	
	$( '#'+epicAreaParentId ).append(epicAreaWrapper);
	
	// Stage初始化
	$( "#new_epic" ).ready(function(e) {
		//新增 stage
		var epicBoard = new Kinetic.Stage({
			container: 'epicBoard',
			width:1100,
			height:580
		});
		
		var LayerAll = new Kinetic.Layer({
			id: 'LayerAll'
		});
		
		epicBoard.add(LayerAll);
		
		//加入 new_epic按鈕的功能
		document.getElementById('new_epic').addEventListener('click',function(){
			
			//呼叫創造 new project 的方法
			var newProject = newEpic(LayerAll, 'My Name is Jerry\'s Father ');
		
		},false);
		
		document.getElementById('new_epic').click();
	});
}

function epicAreaDestroy(){
	//移除epic area的wrapper
	$( '#'+epicAreaParentId ).remove('#epicAreaWrapper');
}

function epicAreaHide(){
	$('#epicAreaWrapper').css('display', 'none');
}

//新增 EPIC Funtion
var epicID = 0;

function newEpic(_layer, _epicName){
	//控制參數
	var isMoved = 0;
	var isEdited = 0;
	
	//群組
	var _group = new Kinetic.Group({
		x: 100,
		y: 100,
    	draggable: true,
		id:"epicGroup_"+epicID,
		name:"epicGroup",
		dragBoundFunc: function(pos) {
			
			//在_group的內容建立時 需手動改變_group的長寬 才能準確限定邊界
			var borderX = _layer.getStage().getWidth() - this.getWidth();
			var borderY = _layer.getStage().getHeight() - this.getHeight();
			
			if( pos.x < 1 ){
				pos.x = 1;
			}else if( pos.x >= borderX ){
				pos.x = borderX;
			}
			if( pos.y < 1 ){
				pos.y = 1;
			}else if( pos.y >= borderY ){
				pos.y = borderY;
			}
			
			return {
			  x: pos.x,
			  y: pos.y
			};
		}
    });
	
	epicID++;
	var _epic = new Kinetic.Circle({
		x: 70,
		y: 70,
		radius: 70,
		stroke: 'black',
		strokeWidth: 1,
		draggable:false,
		fillLinearGradientStartPoint: [10, 10],
        fillLinearGradientEndPoint: [120, 120],
        fillLinearGradientColorStops: [0, '#eee', 1, '#bbb'],
		name:"epic"
	});
	//限定_group的 長度 用於drag邊界限定
	_group.setHeight( _epic.getY() + _epic.getRadius() );
	
	//文字內容
	var _text = new Kinetic.Text({
        x: 5,
        y: 40,
        text: _epicName,
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 135,
        padding: 0,
        align: 'center',
		name:"text"
      });
	
	//編輯圖示
	var editorImg = new Image();
	editorImg.src = 'img/editIcon.png';
	editorImg.onload = function() {
		
		// _editor 是要編輯epic名稱時所需點擊的物件 
		// editorImg 是_editor裡面的圖
		var _editor = new Kinetic.Image({
			x: _text.getWidth() + 5,
			y: _text.getHeight()*2,
			image: editorImg,
			width: 20,
			height: 20,
			draggable:false
		});
		
		//設定_group的寬度 以限定drag邊界
		_group.setWidth( _editor.getX() + _editor.getWidth() );
		
		//阻止enter事件向上傳
		_editor.on('mouseenter', function(evt){
			evt.cancelBubble = true;	
		});

		//當使用者點擊編輯圖示 編輯小dialog要彈出
		_editor.on('click', function(){
			isEdited = 1;
			
			var edX = this.getStage().attrs.container.offsetLeft + _group.getX() + this.getX() - 25;
			var edY = this.getStage().attrs.container.offsetTop + _group.getY() + this.getY() - 45;
			
			var editContainer = initEditDialog( edX, edY, _text.getText(), 
			function( _value ){
				_text.setText( _value );
				_layer.draw();
			},
			function(){
				_group.remove();
				_layer.draw();				
			} );
			
			// 若 input 則更新epic的內容
			/*$('#dyn_textarea')[0].addEventListener('input', function(){
				
				_text.setText( this.value );
				_layer.draw();
				
			}, false);*/
			/*
			var evt = document.createEvent('Event');
			evt.initEvent("focus", true, true);
			document.getElementById("dyn_textarea").dispatchEvent( evt );
			此方法可以觸發 focus 但不是真正的focus 必須直接呼叫該element的method focus()
			*/
			
			//$( "#dyn_textarea" ).trigger( "focus" );

		});
		
		_editor.on('mousemove', function(){
			document.body.style.cursor = 'pointer';
		});
		
		_editor.on('mouseleave', function(){
			document.body.style.cursor = '';
		});
		
		_group.add(_editor);
		_group.draw();
	};
	
	//加入 new epic 的事件
	_group.on('dragstart', function() {
    	isMoved = 1;
		this.moveToTop();
    });
	
	_group.on('click', function(){
		
		//若沒拖曳epic或編輯epic內容 表示使用者是要點擊進入epic
		if(!isMoved &&
		   !isEdited
		){
			//
			//			Click Epic
			//

			$('#innerTitleText').text(this.get('.text')[0].getText());
			window.location.href = "#/tasks";
		}	
		
		isMoved = 0;
		isEdited = 0;
	});
	
	_group.add(_epic);
	_group.add(_text);
	
	_layer.add(_group);
	
	_layer.draw();

	return _group;
}
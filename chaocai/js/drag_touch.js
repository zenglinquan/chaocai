//改编过的，带有回调函数的drag.js文件
(function($){
//		var isDragged=true;
//	$.extend({
//		isDraggedFun:function(){
//			isDragged=false;
//			console.log(isDragged);
//		}
//	});
	$.fn.dragging=function(data){   
		var $this = $(this);
		var xPage;
		var yPage;
		var X;//
		var Y;//
		var xRand = 0;//
		var yRand = 0;//
		var father = $this.parent();
		var defaults = {
			move : 'both',
			randomPosition : false ,
			hander:1,
			callback:null,
		}
		var opt = $.extend({},defaults,data);
		var movePosition = opt.move;
		var random = opt.randomPosition;
		
		var hander = opt.hander;
		
		if(hander == 1){
			hander = $this; 
		}else{
			hander = $this.find(opt.hander);
			console.log(hander);
		}
			
		//---初始化
		father.css({"position":"absolute"});
		$this.css({"position":"absolute"});
		hander.css({"cursor":"move"});
		$this.find('*').not('img').on('touchstart',function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		var faWidth = father.width();
		var faHeight = father.height();
		var thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'))+parseInt($this.css('border-left-width'))+parseInt($this.css('border-right-width'));
		var thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'))+parseInt($this.css('border-top-width'))+parseInt($this.css('border-bottom-width'));
		
		var mDown = false;//
		
		var positionX;
		var positionY;
		var moveX ;
		var moveY ;
		
		if(random){
			$thisRandom();
		}
		function $thisRandom(){ //随机函数
			$this.each(function(index){
				var randY = parseInt(Math.random()*(faHeight-thisHeight));///
				var randX = parseInt(Math.random()*(faWidth-thisWidth));///
				if(movePosition.toLowerCase() == 'x'){
					$(this).css({
						left:randX
					});
				}else if(movePosition.toLowerCase() == 'y'){
					$(this).css({
						top:randY
					});
				}else if(movePosition.toLowerCase() == 'both'){
					$(this).css({
						top:randY,
						left:randX
					});
				}else if(movePosition.toLowerCase() == 'no'){
					return;
				}
				
			});	
		}
		
		hander.on('touchstart',function(e){
			e.preventDefault();
			father.children().css({"zIndex":"0"});
			$this.css({"zIndex":"1"});
			mDown = true;
//			isDragged=true;
			X = e.originalEvent.touches[0].pageX;
			Y = e.originalEvent.touches[0].pageY;
			positionX = $this.position().left;
			positionY = $this.position().top;
			return false;
		});
			
		$(document).on('touchend',function(e){
			mDown = false;
		});
		
		$(document).on('touchmove',function(e){
				e.stopPropagation();
				e.preventDefault();
				faWidth = father.width();
				faHeight = father.height();
				thisWidth = $this.width()+parseInt($this.css('padding-left'))+parseInt($this.css('padding-right'))+parseInt($this.css('border-left-width'))+parseInt($this.css('border-right-width'));
				thisHeight = $this.height()+parseInt($this.css('padding-top'))+parseInt($this.css('padding-bottom'))+parseInt($this.css('border-top-width'))+parseInt($this.css('border-bottom-width'));
				xPage = e.originalEvent.touches[0].pageX;//--
				moveX = positionX+xPage-X;				
				yPage = e.originalEvent.touches[0].pageY;//--
				moveY = positionY+yPage-Y;
				function thisNoMove(){
					return;
				}
				
				function thisXMove(){ //x轴移动
					if(mDown == true){
						$this.css({"left":moveX});
					}else{
						return;
					}
					if(moveX < 0){
						$this.css({"left":"0"});
					}
					if(moveX > (faWidth-thisWidth)){
						$this.css({"left":faWidth-thisWidth});
					}
					return moveX;
				}
				
				function thisYMove(){ //y轴移动
					if(mDown == true){
						$this.css({"top":moveY});
					}else{
						return;
					}
					if(moveY < 0){
						$this.css({"top":"0"});
					}
					if(moveY > (faHeight-thisHeight)){
						$this.css({"top":faHeight-thisHeight});
					}
					return moveY;
				}
	
				function thisAllMove(){ //全部移动
				if(mDown == true){
					$this.css({"left":moveX,"top":moveY});
//					$.isDraggedFun();
				}else{
					return;
				}
				//如果有回调
	            if(opt.callback)
	            {
	                //执行回调函数即可
	                opt.callback.call(opt.callback);
	            }
//				if(moveX < 0){
//					$this.css({"left":"0"});
//				}
//				if(moveX > (faWidth-thisWidth)){
//					$this.css({"left":faWidth-thisWidth});
//				}
//
//				if(moveY < 0){
//					$this.css({"top":"0"});
//				}
//				if(moveY > (faHeight-thisHeight)){
//					$this.css({"top":faHeight-thisHeight});
//				}
			}
//			isDragged=false;
			if(movePosition.toLowerCase() == "x"){
				thisXMove();
			}else if(movePosition.toLowerCase() == "y"){
				thisYMove();
			}else if(movePosition.toLowerCase() == 'both'){
				thisAllMove();
			}else if(movePosition.toLowerCase() == 'no'){
				thisNoMove();
			}
		});
    }
})(jQuery);
				

$(function(){
	var width = document.documentElement.clientWidth;
  	var height = document.documentElement.clientHeight;
	if (width < height) {
	    console.log(width + " " + height);
	    const contentDOM = document.getElementById('game_detail_wrapper_id');
	    var detailFrameDOM=document.getElementById('detail_frame');
	    var gameFrameDOM=document.getElementById('game_frame');
	    contentDOM.style.width = height + 'px';
	    contentDOM.style.height = width + 'px';
	    contentDOM.style.top = (height - width) / 2 + 'px';
	    contentDOM.style.left = 0 - (height - width) / 2 + 'px';
	    detailFrameDOM.style.width=height+'px';
	    detailFrameDOM.style.height = width + 'px';
	    gameFrameDOM.style.width=height+'px';
	    gameFrameDOM.style.height = width + 'px';
	    contentDOM.style.transform = 'rotate(90deg)';
	}
	   	const evt = "onorientationchange" in window ? "orientationchange" : "resize";
	  	window.addEventListener(evt, function () {
	    const width = document.documentElement.clientWidth;
	    const height = document.documentElement.clientHeight;
	    const contentDOM = document.getElementById('game_detail_wrapper_id');
//  alert('width: ' + width + ' height: ' + height)
    if (width > height) {
    	// 横屏
      	contentDOM.style.width = width + 'px';
      	contentDOM.style.height = height + 'px';
       	detailFrameDOM.style.width=width+'px';
	    detailFrameDOM.style.height = height+ 'px';
	    gameFrameDOM.style.width=width+'px';
	    gameFrameDOM.style.height = height+ 'px';
      	contentDOM.style.top = '0px';
	    contentDOM.style.left = '0px';
	    contentDOM.style.transform = 'none';
    }
    else { 
    	// 竖屏，这里微信应该由bug，我切换为竖屏的时候，width:375, height: 323, 导致不能旋转角度。 在safari、chrome上是正确的。
//    alert('change to portrait')
      	contentDOM.style.width = height + 'px';
      	contentDOM.style.height = width + 'px';
      	detailFrameDOM.style.width=height+'px';
	    detailFrameDOM.style.height = width + 'px';
	    gameFrameDOM.style.width=height+'px';
	    gameFrameDOM.style.height = width + 'px';
      	contentDOM.style.top = (height - width) / 2 + 'px';
      	contentDOM.style.left = 0 - (height - width) / 2 + 'px';
      	contentDOM.style.transform = 'rotate(90deg)';
    }

  }, false);
	var timer = null;
	var tip_timer=null;
	var soundplay=true;
	$('#start_play').click(function(){
		$('.start_content').remove();
		$('.play_box').remove();
		$('.middle_bg').show();
		$('.content_bg').append('<audio id="sound_bg" loop="true" src="sound/Streaming sound 490.mp3"></audio>');
		$('#sound_bg')[0].play();
		soundplay=false;
	});
	function soundPlay(ele1,ele2){
		ele1.click(function(){
			if(!soundplay){
				ele1.attr('src','img/sound_off.png');
				ele2.attr('src','img/sound_off.png');
				$('#sound_bg')[0].pause();
				soundplay=true;
			}else{
				ele1.attr('src','img/sound_on.png');
				ele2.attr('src','img/sound_on.png');
				$('#sound_bg')[0].play();
				soundplay=false;
			}
		});
		ele2.click(function(){
			if(!soundplay){
				ele2.attr('src','img/sound_off.png');
				$('#sound_bg')[0].pause();
				soundplay=true;
			}else{
				ele2.attr('src','img/sound_on.png');
				$('#sound_bg')[0].play();
				soundplay=false;
			}
		});
	}
	soundPlay($('#sound_middle'),$('#sound_content'))
	var play_num=0;
	var level_li=$('.level_cai').find('li');
	level_li.each(function(index){
		var $this=$(this);
		$this.click(function(){
			if($this.hasClass('level_active')){
				
			}
			else{
				level_li.each(function(index){
					level_li.eq(index).removeClass('level_active');
				})
				$this.addClass('level_active');
				play_num=index;
			}
			console.log(play_num);
		});
	});
	$('#middle_play').click(function(){
		$('.middle_bg').remove();
		$('.content_bg').show();
		tap_tip($('.eggt'),'tip_egg',"鸡蛋",false);
		tap_tip($('#wan_cong'),'tip_cong',"碎葱",false);
		tap_tip($('.oil'),'tip_oil',"油",false);
		tap_tip($('.wan'),'tip_doufu',"豆腐",false);
	});
	function tap_tip(ele,add_class,text,left){
		ele.on('click',function(){
			if(left){
				$('.tip img').attr('src','img/tip_left.png');
			}else{
				$('.tip img').attr('src','img/tip_right.png');
			}
			$('.oil_tip').text(text);
			$('.tip').addClass(add_class).css('opacity','1');
			tip_timer=setTimeout(function(){
				$('.tip').removeClass(add_class).css('opacity','0');
			},1000);
		});
	}
	var html_finger='<img src="img/finger.png" alt="" class="finger"/>';
	var html_suidf1='<img src="img/yigensuidf.png" alt="" id="suidf_1" />';
	var html_suidf2='<img src="img/yigensuidf.png" alt="" id="suidf_2" />'; 
	var html_suic1='<img src="img/yigensuicong.png" alt="" id="suicong_1" />';
	var html_suic2='<img src="img/yigensuicong.png" alt="" id="suicong_2" />';
	$('.cong').on('touchstart',function(e) {
		e.preventDefault();
		return false;
	});
	$('.cong').on('touchend',function(e) {
		e.preventDefault();
		$('#dao_1').hide();
	});
	$('#doufupi').on('touchstart',function()  {
		$('#finger').css('z-index','3').removeClass('finger').addClass('finger_1');
		$('#doufupi').stop().animate({
	    		'left':'260px',
	    		'top':'20px',
	    		'z-index':'2'
	    },function(){
	    	$('#finger').css('z-index','3').removeClass('finger_1').addClass('finger_2');
	    });
	});
	$('#doufupi').on('touchend',function() {
		$('#dao').fadeIn();
		console.log("不可拖动");
		var doufu_top=$('#doufupi').position().top;
		var doufu_left=$('#doufupi').position().left;
		var doufu_score=score(doufu_top,doufu_left);
		$('.score b').text(doufu_score);
	});
	$('#dao').on('touchstart',function() {
		unbindSME($('#doufupi'));
    	$('#finger').css('z-index','3').removeClass('finger_2').addClass('finger_1');
		$('#dao').css({'transform':'rotate(45deg)','z-index':'3'});
	});
	$('#dao').on('touchend',function() {
		$('#dao').stop().animate({
			'margin-top':'-40px',
			'margin-left':'79px'
		},function(){
			$('#finger').hide();
			$(this).attr('data-dao','clickked');
			console.log('clickked');
			autoDoufuPlay();
		});
	});
	function autoDoufuPlay(){
		timer=setTimeout(function(){
			$('#dao').hide();
			$('#doufupi').attr('src','img/dfp_2.png');
			$('.content_bg').append('<audio id="sound_qie" loop="false" src="sound/Streaming sound 251.mp3"></audio>');
			$('.qiedf').attr('src','img/douf.gif').show();
			$('#sound_qie')[0].play();
	    },1000);
		timer=setTimeout(function(){
//		    $('#sound_qie')[0].pause();
			$('#doufupi').attr('src','img/dfp_1.png').css('height','40px');
			$('.main_middle').append(html_suidf1);
			$('#suidf_1').show();
			$('.qiedf').attr('src','img/douff.gif').css({
				'top':'86px',
				'left':'140px',
				'z-index':'3'
			});
//			$('#sound_qie')[0].play();
		},4000);
		timer=setTimeout(function(){
//			$('#sound_qie')[0].pause();
			$('#doufupi').remove();
			$('.main_middle').append(html_suidf2);
			$('#suidf_2').css('top','134px').show();
			$('.qiedf').attr('src','img/doufff.gif').css({
				'top':'46px',
				'left':'140px',
				'z-index':'3'
			});
//			$('#sound_qie')[0].play();
		},7000);
		timer=setTimeout(function(){
			console.log('pause');
			$('#dao').unbind('touchstart');
			$('.qiedf').attr('src','img/yigensuidf.png').css({'height':'36px','top':'90px'});
			$('#dao').removeAttr('style').show().removeClass('dao').addClass('dao_rotate');
			$('#sound_qie')[0].pause();
			$('#finger').css('z-index','3').removeClass('finger_1').addClass('finger_3').show();
			changedft();
		},10000);
		timer=setTimeout(function(){
			console.log('清除计时器测试');
			clearTimeout(timer);
		},11500);
		function changedft(){
			var doufu_mask='<div class="middle_doufu"></div>';
			$('.content_wrap').append(doufu_mask);
			$('.middle_doufu').on('click',function(){
				$('.qiedf').fadeOut();
				$('#suidf_1').fadeOut();
				$('#suidf_2').attr('src','img/yituodfp.png');
				$('#suidf_2').css('top','80px');
				$('#finger').css('z-index','3').removeClass('finger_3').addClass('finger_4');
				$('.middle_doufu').remove();
			});
//			$('#suidf_2').dragging({
//				move: 'both',
//				callback: function()  {
//				}
//			});
			$('#suidf_2').on('touchstart',function(){
				console.log("suidf_touchstart");
			});
			$('#suidf_2').on('touchend',function(){
				$('#suidf_2').fadeOut();
				$('.wan').attr('src','img/wan_dfp.png');
				$('#finger').css('z-index','3').removeClass('finger_4').addClass('finger_5');
				$('#dao').remove();
			});
			playCong();
		}
	}
	function playCong(){
		$('.cong').on('touchstart',function(){
		$('#finger').css('z-index','3').removeClass('finger_5').addClass('finger_1');
		$('.cong').stop().animate({
			'margin-left':'224px',
			'margin-bottom':'40px',
			'z-index':'2'
		},function(){
			$('#finger').css('z-index','3').removeClass('finger_1').addClass('finger_2');
		});
	});
		$('.cong').on('touchend',function() {
		$('#dao_1').show();
		var cong_top=$('.cong').position().top;
		var cong_left=$('.cong').position().left;
		var cong_score=score(cong_top,cong_left);
		var temp_score=$('.score b').text();
		var game_score=Math.floor(temp_score*cong_score/100);
		$('.score b').text(game_score);
	});
		$('#dao_1').on('touchstart',function() {
			unbindSME($('.cong'));
	    	$('#finger').css('z-index','3').removeClass('finger_2').addClass('finger_1');
			$('#dao_1').css({'transform':'rotate(45deg)','z-index':'3'});
		});
		$('#dao_1').on('touchend',function() {
			$('#dao_1').stop().animate({
				'margin-top':'-40px',
				'margin-left':'79px'
			},function(){
				$('#finger').hide();
				$(this).attr('data-dao','clickked');
				console.log('clickked');
				autoCongPlay();
			});
		});
	}
	
	function autoCongPlay(){
		timer=setTimeout(function(){
			$('#dao_1').hide();
			$('.cong').attr('src','img/lgencong.png');
			$('.content_bg').append('<audio id="sound_qiecong" loop="false" src="sound/Sound 1.mp3"></audio>');
			$('.qie').attr('src','img/qiecong.gif').show();
			$('#sound_qiecong')[0].play();
	    },1000);
		timer=setTimeout(function(){
//		    $('#sound_qiecong')[0].pause();
			$('.cong').attr('src','img/yigencong.png').css('height','40px');
			$('.main_middle').append(html_suic1);
			$('#suicong_1').show();
			$('.qie').attr('src','img/qiecongg.gif').css({
				'top':'94px',
				'left':'140px',
				'z-index':'3'
			});
//			$('#sound_qiecong')[0].play();
		},4000);
		timer=setTimeout(function(){
//			$('#sound_qiecong')[0].pause();
			$('.cong').remove();
			$('.main_middle').append(html_suic2);
			$('#suicong_2').css('top','134px').show();
			$('.qie').attr('src','img/qieconggg.gif').css({
				'top':'60px',
				'left':'140px',
				'z-index':'3'
			});
//			$('#sound_qiecong')[0].play();
		},7000);
		timer=setTimeout(function(){
			$('#dao_1').unbind('touchstart');
			$('.qie').attr('src','img/yigensuicong.png').css({'height':'36px','top':'90px'});
			$('#dao_1').removeAttr('style').show().removeClass('dao').addClass('dao_rotate');
			$('#sound_qiecong')[0].pause();
			$('#finger').css('z-index','3').removeClass('finger_1').addClass('finger_3').show();
			changeCT();
		},10000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log('清除计时器测试');
		},11500);
		function changeCT(){
			var doufu_mask='<div class="middle_doufu"></div>';
			$('.content_wrap').append(doufu_mask);
			$('.middle_doufu').on('click',function(){
				$('.qie').fadeOut();
				$('#suicong_1').fadeOut();
				$('#suicong_2').attr('src','img/congsi.png').css(
				{
					'width':'140px',
					'height':'140px',
					'top':'74px'
				});
				$('#finger').css('z-index','3').removeClass('finger_3').addClass('finger_6');
				$('.middle_doufu').remove();
			});
//			$('#suicong_2').dragging({
//				move: 'both',
//				callback: function()  {
//				}
//			});
			$('#suicong_2').on('touchstart',function(){
				console.log("suicong_touchstart");
			});
			$('#suicong_2').on('touchend',function(){
				$('#suicong_2').fadeOut();
				$('#wan_cong').attr('src','img/wan_cong.png');
				$('#finger').fadeOut();
				$('#dao_1').fadeOut();
				backPlay();
			});
		}
	}
	 
	function backPlay(){
//		盆子撤出
		timer=setTimeout(function(){
			$('.main_left').css({'overflow':'hidden'});
			$('#penzi').stop().animate({
				'margin-left':'-300px'
			});	
		},1000);
//		刀板子撤出
		timer=setTimeout(function(){
			$('.main_middle').css({'overflow':'hidden'});
			$('.panel').stop().animate({
				'margin-left':'-600px'
			},function(){
				$('.oil').stop().animate({'left':'45%','top':'-20%'});
				$('.panel').attr('src','img/guo_off.png').animate({
					'margin-left':'-419px',
					'top':'40px',
					'width':'176px'
				});
			});
		},1500);
//		煤气灶,平底锅出现
		timer=setTimeout(function(){
			$('.oil').stop().animate({'left':'76%','top':'45%'});
			tap_tip($('.oil'),'tip_oil_1',"油",false);
			$('.main_middle').css({'overflow':''});
			$('.panel').stop().animate({
				'margin-left':'0px',
				'top':'40px',
				'width':'176px'
			},function(){
				$('.main_left').css({'overflow':''});
				$('#finger').css('z-index','3').removeClass('finger_6').addClass('finger_kai').show();
				$('#penzi').attr('src','img/pdg.png').stop().animate({
					'margin-left':'60px'
				},btnOnPlay);
			});
		},2000);
		timer=setTimeout(function(){
			clearTimeout(timer);
		},2500);
	}
	function btnOnPlay(){
		var btn_on_html='<div class="btn_on" id="btn"></div>';
		$('.main_middle').append(btn_on_html);
		$('#btn').on('click',function(){
			$('.panel').attr('src','img/guo_on.png');
			$('.main_left').css({
//				'overflow':'',
				'z-index':'3',
				'bottom':'30px'
			});
			guoPlay();
		});
	}
//	锅上煤气灶
	function guoPlay(){
		timer=setTimeout(function(){
			$('#penzi').stop().animate({
				'margin-left':'240px'
			},function(){
				$('#shaozi').show().stop().animate({'left':'17%'});
				$('#loushao').show().stop().animate({'left':'19%'});
				$('#salt').show().stop().animate({'left':'20%'});
				$('#jiangyou').show().stop().animate({'left': '55%'});
				daoOil();
			});
		},1000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},1500);
		tap_tip($('#salt'),'tip_salt',"盐巴",true);
		tap_tip($('#jiangyou'),'tip_jiang',"酱油",true); 
		tap_tip($('#shaozi'),'tip_shaozi',"勺子",true);
		tap_tip($('#loushao'),'tip_loushao',"漏勺",true);
	}
//	  倒油入锅
	function daoOil(){
		$('#finger').css('z-index','3').removeClass('finger_kai').addClass('finger_oil').show();  
//		$('.oil').dragging({
//			move: 'both',
//			callback: function()  {
//				$('.oil').css('z-index','4');
//				$('#finger').css('z-index','3').removeClass('finger_oil').addClass('finger_guo');
//			}
//		});
		$('.oil').on('touchstart',function(){
			$('.oil').css('z-index','4');
			$('#finger').css('z-index','3').removeClass('finger_oil').addClass('finger_guo');
		});
		$('.oil').on('touchend',function(){
			$('.oil').stop().animate({
				'z-index':'4',
				'left':'47%',
				'top':'3%'
			},function(){
				$('.oil').css({'transform':'rotateZ(-25deg)'});
			});
			$('#oil_drop').css({'z-index':'4','display':'inline'}).addClass('drop_oil');
			$('.oil').attr('src','img/oil.gif');
			$('#finger').hide();
			oilDao();
		});
	}
	function oilDao(){
		timer=setTimeout(function(){
			$('.oil').stop().animate({
				'left':'76%',
				'top':'45%'
			},function(){
				$('#oil_drop').hide();
				$('.oil').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_egg').show();
				daoEgg();
			});
		},1000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},2000);
	}
	
//	鸡蛋入锅
	function daoEgg(){
//		$('.eggt').dragging({
//			move: 'both',
//			callback: function()  {
//				unbindSME($('.oil'));
//				$('.eggt').css('z-index','4');
//				$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_guo');
//			}
//		});
		$('.eggt').on('touchstart',function(){
			unbindSME($('.oil'));
			$('.eggt').css('z-index','4');
			$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_guo');
		});
		$('.eggt').on('touchend',function(){
			$('.eggt').stop().animate({
			    'left': '-150%',
			    'z-index': '4'			
			},function(){
				$('.eggt').css('transform','rotateZ(-22deg)');
			});
			$('#oil_drop').css('z-index','4').show().addClass('drop_egg');
			$('.eggt').attr('src','img/oil.gif');
			$('#finger').hide();
			eggDao();
		});
	}

	function eggDao(){
		timer=setTimeout(function(){
			$('#guo_egg').css('z-index','3').fadeIn();
			$('.eggt').stop().animate({
				'left':'0px',
		    	'top': '-196px'
			},function(){
				$('#oil_drop').hide();
				$('.eggt').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				var time_html='<div class="set_time"><span class="time_img"></span></div>';
				$('.main_middle').append(time_html);
				$('.set_time').fadeIn();
			});
		},1000);
		timer=setTimeout(function(){
			$('.set_time').fadeOut();
			$('#guo_egg').attr('src','img/eggshule.png');
			$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_loushao').show();
//			$('#loushao').dragging({
//				move: 'both',
//				callback: function() {
//					$('#loushao').css({
//						'transform':'rotateZ(-50deg)',
//						'z-index':'3'
//					});
//					unbindSME($('.eggt'));
//					$('#finger').css('z-index','3').removeClass('finger_loushao').addClass('finger_guo');
//				}
//			});
			$('#loushao').on('touchend',function(){
				$('#loushao').css({
						'transform':'rotateZ(-50deg)',
						'z-index':'3'
				});
				unbindSME($('.eggt'));
				$('#finger').css('z-index','3').removeClass('finger_loushao').addClass('finger_guo');
			});
			$('#loushao').on('touchend',function(){
				$('#loushao').stop().animate({
					'left': '20%',
					'top':'11%'
				},function(){
					$('#loushao').hide();
					$('#guo_egg').attr('src','img/eggshuliao_shao.png').css({
						'left': '10px',
    					'top': '-33px',
    					'width': '190px',
    					'z-index':'4'
					});
//					$('#guo_egg').css('z-index','4').dragging({
//						move: 'both',
//						callback: function()  {
//							$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_egg');
//						}
//					});
					$('#guo_egg').on('touchstart',function(){
						$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_egg');
					});
					$('#guo_egg').on('touchend',function(){
						$('#guo_egg').fadeOut();
						$('.eggt').attr('src','img/egg_shu.png');
						$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_oil');
						daoWater();
					});
				});
			});
//			$('#guo_egg').dragging({
//				move: 'both',
//				callback: function()  {
//					$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_egg');
//				}
//			});
//			$('#guo_egg').on('touchend',function(){
//				$('#guo_egg').fadeOut();
//				$('.eggt').attr('src','img/egg_shu.png');
//				$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_oil');
//				daoWater();
//			});
		},7000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},7500);
	}
//	水煮豆腐之煮水	
	function daoWater(){
		unbindSME($('#loushao'));
		bindSME($('.oil'));
		tap_tip($('.oil'),'tip_oil',"水",false);
//		$('.oil').dragging({
//			move: 'both',
//			callback: function()  {
//				unbindSME($('#guo_egg'));
//				$('.oil').css('z-index','4');
//				$('#finger').css('z-index','3').removeClass('finger_oil').addClass('finger_guo');
//			}
//		});
		$('.oil').on('touchstart',function(){
			unbindSME($('#guo_egg'));
			$('.oil').css('z-index','4');
			$('#finger').css('z-index','3').removeClass('finger_oil').addClass('finger_guo');
		});
		$('.oil').on('touchend',function(){
			$('.oil').stop().animate({
				'z-index':'4',
				'left':'47%',
				'top':'3%'
			},function(){
				$('.oil').css({'transform':'rotateZ(-25deg)'});
			});
			$('#oil_drop').css({'z-index':'4','display':'inline'}).addClass('drop_oil');
			$('.oil').attr('src','img/oil.gif');
			$('#finger').hide();
			waterDao();
		});
	}

	function waterDao(){
		timer=setTimeout(function(){
			$('#guo_egg').attr('src','').fadeIn();
			$('.oil').stop().animate({
				'left':'76%',
				'top':'45%'
			},function(){
				$('#oil_drop').hide();
				$('.oil').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				$('#finger').hide();
			});
			var time_html='<div class="set_time"><span class="time_img"></span></div>';
			$('.main_middle').append(time_html);
			$('.set_time').fadeIn();
		},1000);
		timer=setTimeout(function(){
			$('.set_time').fadeOut();
			$('#guo_egg').attr('src','');
			$('#finger').css('z-index','4').removeClass('finger_guo').addClass('finger_doufu').show();
			daoDoufu();
		},7000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},7500);
	}

//	水煮豆腐之倒入豆腐
	function daoDoufu(){
//		$('.wan').dragging({
//			move: 'both',
//			callback: function()  {
//				unbindSME($('.oil'));
//				$('.wan').css('z-index','4');
//				$('#finger').css('z-index','3').removeClass('finger_doufu').addClass('finger_guo');
//			}
//		});
		$('.wan').on('touchstart',function(){
			unbindSME($('.oil'));
			$('.wan').css('z-index','4');
			$('#finger').css('z-index','3').removeClass('finger_doufu').addClass('finger_guo');
		});
		$('.wan').on('touchend',function(){
			$('.wan').stop().animate({
				'bottom':'86px',
				'left':'-184px',
				'z-index':'4'
			},function(){
				$('.wan').css('transform','rotateZ(-25deg)');
			});
			$('#oil_drop').css({'z-index':'4','display':'inline'}).addClass('drop_oil');
			$('.wan').attr('src','img/oil.gif');
			$('#finger').hide();
			doufuDao();
		});
	}
	function doufuDao(){
		timer=setTimeout(function(){
 			$('#guo_egg').removeAttr('style').attr('src','img/doufupi.png').fadeIn();
			$('.wan').stop().animate({
				'left':'0',
				'top':'-98px'
			},function(){
				$('#oil_drop').hide();
				$('.wan').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				$('#finger').hide();
			});
			var time_html='<div class="set_time"><span class="time_img"></span></div>';
			$('.main_middle').append(time_html);
			$('.set_time').fadeIn();
		},1000);
		timer=setTimeout(function(){
			$('.set_time').fadeOut();
			$('#guo_egg').removeAttr('style').attr('src','img/doufupi.png').fadeIn();
			$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_egg').show();
			dao_Egg();
		},7000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},7500);
	}
//	把鸡蛋也倒入锅里
	function dao_Egg(){
		bindSME($('.eggt'));
//		$('.eggt').css('z-index','4').dragging({
//			move: 'both',
//			callback: function()  {
//				$('.wan').css('z-index','4');
//				unbindSME($('.wan'));
//				$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_guo');
//			}
//		});
		$('.eggt').css('z-index','4').on('touchstart',function(){
			$('.wan').css('z-index','4');
			unbindSME($('.wan'));
			$('#finger').css('z-index','3').removeClass('finger_egg').addClass('finger_guo');
		});
		$('.eggt').on('touchend',function(){
			$('.eggt').stop().animate({
				'left': '-187px',
    			'bottom': '106px',
    			'z-index': '4'
			},function(){
				$('.eggt').css('transform','rotateZ(-25deg)');
			});
			$('#oil_drop').css({'z-index':'4','display':'inline'}).addClass('drop_oil');
			$('.eggt').attr('src','img/oil.gif');
			$('#finger').hide();
			egg_Dao();
		});
	}
	function egg_Dao(){
		timer=setTimeout(function(){
			$('#guo_egg').removeAttr('style').attr('src','img/egg_doufu.png').fadeIn();
			$('.eggt').stop().animate({
				'left':'0px',
				'bottom':'116px',
				'top':'-196px'
			},function(){
				$('#oil_drop').hide();
				$('.eggt').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_salt');
			});
			var time_html='<div class="set_time"><span class="time_img"></span></div>';
			$('.main_middle').append(time_html);
			$('.set_time').fadeIn();
		},1000);
		timer=setTimeout(function(){
			$('.set_time').fadeOut();
			$('#guo_egg').removeAttr('style').attr('src','img/egg_doufu.png').fadeIn();
			$('#finger').css('z-index','3').attr('class','finger_salt').show();
			daoSalt();
		},7000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},7500);
	}

//	把盐倒入锅里
	function daoSalt(){
//		$('.salt').dragging({
//			move: 'both',
//			callback: function()  {
//				unbindSME($('.eggt'));
//				$('.salt').css('z-index','4');
//				$('#finger').css('z-index','3').removeClass('finger_salt').addClass('finger_guo');
//			}
//		});
		$('.salt').on('touchstart',function(){
			unbindSME($('.eggt'));
			$('.salt').css('z-index','4');
			$('#finger').css('z-index','3').removeClass('finger_salt').addClass('finger_guo');
		});
		$('.salt').on('touchend',function(){
			$('.salt').addClass('salt_dao');
			$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_jiang');
			daoJiangyou();
		});
	}
//	酱油入锅
	function daoJiangyou(){
//		$('.jiangyou').dragging({
//			move: 'both',
//			callback: function()  {
//				$('.jiangyou').css('z-index','4');
//				unbindSME($('.salt'));
//				$('#finger').css('z-index','3').removeClass('finger_jiang').addClass('finger_guo');
//			}
//		});
		$('.jiangyou').on('touchstart',function(){
			$('.jiangyou').css('z-index','4');
			unbindSME($('.salt'));
			$('#finger').css('z-index','3').removeClass('finger_jiang').addClass('finger_guo');
		});
		$('.jiangyou').on('touchend',function(){
			$('.jiangyou').animate({
				'left': '230px',
				'top': '-26px',
				'z-index':'4'
			},function(){
				$('.jiangyou').css('transform','rotateZ(70deg)');
			});
			$('#oil_drop').css({'z-index':'4','display':'inline','left':'19px'}).addClass('drop_oil');
			$('.jiangyou').addClass('jiangyou_dao');
			$('#finger').hide();
			jiangyouDao();
		});
	}
	function jiangyouDao(){
		timer=setTimeout(function(){
			$('.jiangyou').stop().animate({
				'left': '140px',
				'top': '0px'
			},function(){
				$('#oil_drop').hide();
				$('.jiangyou').css('transform','rotateZ(0deg)').attr('src','img/jiangyou.png');
				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_cong').show();
				daoCong();
			});
		},1000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},2000);
	}
	
//	葱入锅
	function daoCong(){
//		$('#wan_cong').dragging({
//			move: 'both',
//			callback: function()  {
//				$('#wan_cong').css('z-index','4');
//				unbindSME($('.jiangyou'));
//				$('#guo_egg').removeAttr('style').attr('src','img/egg_doufu.png').show();
//				$('#finger').css('z-index','3').removeClass('finger_cong').addClass('finger_guo');
//			}
//		});
		$('#wan_cong').on('touchstart',function(){
			$('#wan_cong').css('z-index','4');
			unbindSME($('.jiangyou'));
			$('#guo_egg').removeAttr('style').attr('src','img/egg_doufu.png').show();
			$('#finger').css('z-index','3').removeClass('finger_cong').addClass('finger_guo');
		});
		$('#wan_cong').on('touchend',function(){
			$('#wan_cong').animate({
				'left': '134px',
    			'top': '6px',
    			'z-index': '4'    			
			},function(){
				$('#wan_cong').css('transform','rotateZ(-22deg)');
			});
			$('#oil_drop').removeAttr('style').css({'z-index':'4','display':'inline'}).addClass('drop_oil');
			$('#wan_cong').attr('src','img/oil.gif');
			$('#finger').hide();
			congDao();
		});
	}
	function congDao(){
		$('#guo_egg').removeAttr('style').attr('src','img/jsdfpt.png').fadeIn();
		timer=setTimeout(function(){
			$('#wan_cong').stop().animate({
				'left':'70%',
    			'top': '0px',
    			'z-index': '3'
			},function(){
				$('#oil_drop').hide();
				$('#wan_cong').css('transform','rotateZ(0deg)').attr('src','img/oil_empty.png');
				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_shaozi').show();
				shaoziPlay();
			});
		},1000);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},1500);
	}
//	用勺子搅拌
	function shaoziPlay(){
//		$('#shaozi').dragging({
//			move: 'both',
//			callback: function()  {
//				$('#shaozi').css({'transform':'rotateZ(-60deg)','z-index':'4'});
//				unbindSME($('#wan_cong'));
//				$('#finger').css('z-index','3').removeClass('finger_shaozi').addClass('finger_guo');
//			}
//		});
		$('#shaozi').on('touchstart',function(){
			$('#shaozi').css({'transform':'rotateZ(-60deg)','z-index':'4'});
			unbindSME($('#wan_cong'));
			$('#finger').css('z-index','3').removeClass('finger_shaozi').addClass('finger_guo');
		});
		$('#shaozi').on('touchend',function(){
			$('#finger').fadeOut();
			playShaozi();
		});
	}
	function playShaozi(){
		timer=setTimeout(function(){
			$('#shaozi').addClass('shaozi_jiaoban');
			var time_html='<div class="set_time"><span class="time_img"></span></div>';
			$('.main_middle').append(time_html);
		},1000);
		timer=setTimeout(function(){
			$('.set_time').fadeIn();
		},3500);
		timer=setTimeout(function(){
			$('.set_time').fadeOut();
			back_play();
		},9500);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log("清除计时器");
		},10000);
	}
// 	撤出所有碗碟
	function back_play(){
		clearTimeout(tip_timer);
		timer=setTimeout(function(){
			$('#salt').animate({
				'left':'-37%'
			},300).hide();
		},1000);
		timer=setTimeout(function(){
			$('#jiangyou').animate({
				'left':'-37%'
			},300).hide();
		},1500);
		timer=setTimeout(function(){
			$('.eggt').animate({
				'left':'160px'
			},300).hide();
		},2000);
		timer=setTimeout(function(){
			$('.wan').animate({
				'left':'160px'
			},300).hide();
		},2500);
		timer=setTimeout(function(){
			$('#wan_cong').animate({
				'left':'130%'
			}).hide();
		},3000);
		timer=setTimeout(function(){
			$('.oil').animate({
				'left':'170%'
			},300).hide();
		},3500);
		timer=setTimeout(function(){
			$('#shaozi').animate({
				'left':'-150%'
			},300).hide();		
		},4000);
		timer=setTimeout(function(){
			$('#wan_cong').show().animate({
				'width':'130px',
				'height':'100px',
				'left':'90%',
				'top':'60px'
			},300,function(){
				loushaoPlay();
			});
		},4500);
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log('清除计时器');
		},5000);
	}
//	汤勺捞起
	function loushaoPlay(){
		$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_shao').show();
		$('#loushao').css('transform','rotateZ(-37deg)').show();
		bindSME($('#loushao'));
//		$('#loushao').dragging({
//			move:'both',
//			callback:function(){
//				console.log("点击漏勺");
//				$('#loushao').css({
//					'transform':'rotateZ(-50deg)',
//					'z-index':'3'
//				});
//				$('#finger').css('z-index','3').removeClass('finger_shao').addClass('finger_guo');
//			}
//		});
		$('#loushao').on('touchstart',function(){
			console.log("点击漏勺");
			$('#loushao').css({
				'transform':'rotateZ(-50deg)',
				'z-index':'3'
			});
			$('#finger').css('z-index','3').removeClass('finger_shao').addClass('finger_guo');
		});
		$('#loushao').on('touchend',function(){
			$('#loushao').css('transform','rotateZ(-40deg)').stop().animate({
				'left':'100%',
				'top':'18%',
				'z-index':'3'
			},function(){
				$('#loushao').remove();
				$('#guo_egg').attr('src','img/eggshuliao_shao.png').css({
					'left': '10px',
					'top': '-33px',
					'width': '190px',
					'z-index':'4'
				});
				daoWan();
			});
		});
	}
//	倒入碗
	function  daoWan(){
		bindSME($('#guo_egg'));
//		$('#guo_egg').dragging({
//			move: 'both',
//			callback: function()  {
//				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_wan');
//				$('#guo_egg_fb').css('z-index','4').show();
//			}
//		});
		$('#guo_egg').on('touchstart',function(){
			$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_wan');
			$('#guo_egg_fb').css('z-index','4').show();
		});
		$('#guo_egg').on('touchend',function(){
			$('#guo_egg').animate({
				'left':'238px',
				'top':'-10px'
			},function(){
				$('#guo_egg').css({'transform': 'rotateZ(-15deg)'});
				$('#guo_egg').hide();
				$('#loushao_end').show();
				$('#wan_cong').attr('src','img/df_egg_cong.png');
				$('#finger').css('z-index','3').removeClass('finger_wan').addClass('finger_guo');
			});
			loushao();
		});
		function loushao(){
			timer=setTimeout(function(){
				$('#loushao_end').animate({
					'left': '20%',
				    'top': '8%',
					'z-index':'4'
				},function(){
					$('#loushao_end').css('transform','rotateZ(-50deg)');
					$('#guo_egg_fb').attr('src','img/eggshuliao_shao.png').css({
						'left': '10px',
						'top': '-33px',
						'width': '190px',
						'z-index':'4'
					});
					daoWan2();
				});  
			},1000);
			timer=setTimeout(function(){
				clearTimeout(timer);
				console.log('清除计时器');
			},2000);
		}
		function daoWan2(){
//			$('#guo_egg_fb').dragging({
//				move: 'both',
//				callback: function()  {
//					unbindSME($('#guo_egg'));
//					$('#guo_egg_fb_2').css('z-index','4').show();
//					$('#loushao_end').hide();
//					$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_wan');
//				}
//			});
			$('#guo_egg_fb').on('touchstart',function(){
				unbindSME($('#guo_egg'));
				$('#guo_egg_fb_2').css('z-index','4').show();
				$('#loushao_end').hide();
				$('#finger').css('z-index','3').removeClass('finger_guo').addClass('finger_wan');
			});
			$('#guo_egg_fb').on('touchend',function(){
				$('#guo_egg_fb').animate({
					'left':'238px',
					'top':'-10px',
					'transform': 'rotateZ(-15deg)'
				},function(){
					$('#guo_egg_fb').hide();
					$('#loushao_end').removeAttr('style').show();
					$('#wan_cong').attr('src','img/df_egg_cong.png');
					$('#finger').css('z-index','3').hide();
				});
				loushao2();
			});
		}
		function loushao2(){
			timer=setTimeout(function(){
				$('#loushao_end').animate({
					'left': '20%',
				    'top': '8%',
				    'transform': 'rotateZ(-15deg)',
					'z-index':'4'
				},function(){
					gameover();
				});  
			},1000);
			timer=setTimeout(function(){
				clearTimeout(timer);
				console.log('清除计时器');
			},2000);
		}
//	做菜结束
	function gameover(){
		timer=setTimeout(function(){
			$('#loushao_end').fadeOut();
			$('#guo_egg_fb_2').fadeOut();
			$('.main_left').css('overflow','hidden');
			$('#penzi').animate({
				'margin-left':'-150px'
			}).fadeOut();
			$('.panel').animate({
				'margin-left':'-400px'
			}).fadeOut();
			$('#wan_cong').css('top','-110px');
		},1000);
		timer=setTimeout(function(){
			$('.score').show().animate({'top':'56%'});
		},2000);	
		timer=setTimeout(function(){
			clearTimeout(timer);
			console.log('清楚计时器');
		},2500);
	}

	}
});
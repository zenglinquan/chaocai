function unbindME(ele){
	ele.unbind('touchmove').unbind('touchend');
}
function unbindSME(ele){
	ele.unbind('touchstart').unbind('touchmove').unbind('touchend');
}
function bindSME(ele){
	ele.bind('touchstart').bind('touchmove').bind('touchend');
}
function bindME(ele){
	ele.bind('touchstart').bind('touchend');
}
function score(img_top,img_left){
//	img_left:[260-270]-img_top:[8-40]
//	img_left:[270-280]-img_top:[8-20]
	var score=0;
	if(img_left>260&&img_left<270){
		if(img_top>8&&img_top<30){
			score=100;
		}
		if(img_top>30&&img_top<40){
			score=90;
		}
	}else{
		if(img_left>270&&img_left<280){
			if(img_top>8&&img_top<20){
				score=80;
			}else{
				score=70;
			}
		}else{
			if(img_top>8&&img_top<20){
				score=60;
			}else{
				score=50;
			}
		}
	}
	return score;
}


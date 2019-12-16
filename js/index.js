$(function(){
	var liNum = 5*5*5;
	(function(){
		var nowX , lastX , minusX = 0, nowY , lastY , minusY = 0;
		var roY = 0 , roX = 0 , tZ = -2000;
		var timer1 , timer2;
		$(document).mousedown(function(ev){
			ev = ev || window.event;
			lastX = ev.clientX;
			lastY = ev.clientY;
			clearInterval( timer1 );
			$(this).on('mousemove',function(ev){
				ev = ev || window.event;
				nowX = ev.clientX;
				nowY = ev.clientY;
				minusX = nowX - lastX;
				minusY = nowY - lastY;
				roY += minusX*0.2;
				roX -= minusY*0.2;
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
				lastX = nowX;
				lastY = nowY;
			});
			return false;
		}).mouseup(function(){
			$(this).off('mousemove');
			timer1 = setInterval(function(){
				minusX *= 0.95;
				minusY *= 0.95;
				if ( Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5 )
				clearInterval( timer1 );
				roY += minusX*0.2;
				roX -= minusY*0.2;
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
			} , 13);
		}).mousewheel(function(e,d){
			clearInterval( timer2 );
			tZ += d*80;
			tZ = Math.min(0,tZ);
			tZ = Math.max(-8000,tZ);
			$('#main').css({
				'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
			});

			timer2 = setInterval(function(){
				d *= 0.85;
				if ( Math.abs(d) < 0.01 )
				{
					clearInterval( timer2 );
				}
				tZ += d*80;
				tZ = Math.min(0,tZ);
				tZ = Math.max(-8000,tZ);
				$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				});
			} , 13);
		});
	})()

	init();
	
	function init(){
		for ( var i=0 ; i<liNum ; i++ )
		{
			// 这里放你要放的内容哦
			var $li = $('<li><p class="title">♥</p><p class="author">SJD</p><p class="time">Our Story in here</p></li>');
			var x = (Math.random()-0.5)*5000;
			var y = (Math.random()-0.5)*5000;
			var z = (Math.random()-0.5)*5000;
			$li.css({
				'transform' : 'translate3d('+x+'px,'+y+'px,'+z+'px)'
			});
			$('#main').append($li);
		}
		setTimeout(function(){
			Grid();
			$('#styleBtn').css({
				transform : 'scale(1)',
				opacity : 1
			});
		},300);

		$('#styleBtn li').on('click',function(){
			var index = $(this).index();
			switch ( index )
			{
				// 平面排版
				case 0:
					Table();
					break;
				// 圆球
				case 1:
					Sphere();
					break;
				// 螺旋
				case 2:
					Helix();
					break;
				// 网格
				case 3:
					Grid();
					break;
			}
		});

	}

	// 网格函数
	function Grid(){
		var tX = 400 , tY = 400 , tZ = 800;
		var firstX = - 2*tX;
		var firstY = - 2*tY;
		var firstZ = - 2*tZ;
		$('#main li').each(function(i){
			var iX = (i % 25) % 5;
			var iY = parseInt((i % 25) / 5);
			var iZ = parseInt(i / 25);
			$(this).css({
				'transform' : 'translate3d('+ ( firstX + iX*tX ) +'px,'+ ( firstY + iY*tY ) +'px,'+ (firstZ + iZ*tZ) +'px)'
			});
		});
	}

	// 螺旋函数
	function Helix(){
		var roY = 10 , tY = 10;
		var mIndex = Math.floor($('#main li').length / 2);
		var firsttY = -tY*mIndex;
		$('#main li').each(function(i){
			$(this).css({
				'transform' : 'rotateY('+ 10*i +'deg) translateY('+ (firsttY+tY*i) +'px) translateZ(1000px)'
			});
		})
	}

	// 球体函数
	function Sphere(){
		var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];
		var roX = 180/arr.length;
		var fisrtRoX = 90;
		$('#main li').each(function(j){
			var sum = 0;
			var index , num;
			for ( var i=0;i<arr.length;i++ )
			{
				sum += arr[i];
				if ( sum >= j+1 )
				{
					index = i;
					num = arr[i] - (sum-j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = index%2?fisrtRoX+index*roX:fisrtRoX-index*roX;
			var y = num*roY;
			var z = 0;
			if ( x > 90 && x < 270 )
			{
				z = 180;
			}
			$(this).css({
				transform : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});
	}

	// 平面排版函数
	function Table(){
		var tX = 160 , tY = 200;
		var firstX = -9*tX + 60;
		var firstY = -4*tY;
		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];
		$('#main li').each(function(i){
			var x , y;
			if ( i < 18 )
			{
				x = arr[i].x;
				y = arr[i].y;
			}else
			{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)'
			});
		});
	}
	
	(function(){
		var $mainLi = $('#main li');
		var $show = $('#show');
		$mainLi.click(function(ev){
			ev = ev || window.event;
			$show.fadeIn(1000).css({
				'transform' : 'rotateY(0deg)scale(1)'
			});
			ev.stopPropagation();
		});
		$(document).click(function(){
			$show.fadeOut(1000,function(){
				$(this).css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				});
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			});
		});

	})();

});

// 点击弹心
!function(e, t, a) {
	function r() {
		for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
		requestAnimationFrame(r)
	}
	function n() {
		var t = "function" == typeof e.onclick && e.onclick;
		e.onclick = function(e) {
			t && t(),
				o(e)
		}
	}
	function o(e) {
		var a = t.createElement("div");
		a.className = "heart",
			s.push({
				el: a,
				x: e.clientX - 5,
				y: e.clientY - 5,
				scale: 1,
				alpha: 1,
				color: c()
			}),
			t.body.appendChild(a)
	}
	function i(e) {
		var a = t.createElement("style");
		a.type = "text/css";
		try {
			a.appendChild(t.createTextNode(e))
		} catch(t) {
			a.styleSheet.cssText = e
		}
		t.getElementsByTagName("head")[0].appendChild(a)
	}
	function c() {
		return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
	}
	var s = [];
	e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
		function(e) {
			setTimeout(e, 1e3 / 60)
		},
		i(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),
		n(),
		r()
} (window, document);
//引入方式<script type="text/javascript" src="lmy.js"></script>
//存成外部文件的好处：1.代码的再利用度好；2.因存放在单一位置而容易维护;3.文件的组织度较佳。
//封装typeof
	function type(target) {
		var temp = {
			"[object Array]" : "array",
			"[object Object]" : "object",
			"[object Number]" : "number - object",
			"[object Boolean]" : "boolean - object",
			"[object String]" : "string - object"
		}
		if(target == null)
			return "null";
		var strr = typeof(target);
		if(strr == "object"){
			var str = Object.prototype.toString.call(target);
			return temp[str];
		}else {
			return strr;
		}
	}
//数组去重
	Array.prototype.unique = function () {
		var obj = {};
		var res = [];
		var length = this.length;
		for(var i = 0; i < length; i ++){
			if(!obj[this[i]]){
				res.push(this[i]);
				obj[this[i]] = this[i];
			}
		}
		return res;
	}
//深度克隆（....）
	function judge(em) {
		var array = [];
			for(var i = 0; i < em.length; i ++){
				if(em[i] instanceof Array){
					array.push(judge(em[i]));
				}
				else 
					array.push(em[i]);
			}
			return array;
		}
	function clone(object) {
		var target = {};
			for(var i in object){
				if(object[i] instanceof Array){
					target[i] = judge(object[i]);
				}
				else if(object[i] instanceof Object){
					target[i] = clone(object[i]);
				}
				else 
					target[i] = object[i];
			}
		return target;
	}
//深度克隆（渡一课堂）
	function deepClone(target, option){
		if(option != null){
			for(var prop in option){
				var src = target[prop];
				var copy = option[prop];
				if(copy !=null && typeof copy == 'object'){
					if(Object.prototype.toString.call(copy) == '[object Array]'){
						src = [];
					}
					else 
						src = {};
					target[prop] = deepClone(src, copy);
				}
				else 
					target[prop] = option[prop];
			}
		}
		return target;
	}
//把target插入到after之后
	function insertAfter(target,after){
		var before = after.nextSibling;
		if(before == null){
			this.appendChild(target);
		}else {
			this.insertBefore(target,before);
		}
	}
//把target插入到after之后
	function myInsertAfter(a,b){
		var x = b.parentNode;
		x.insertBefore(a,b);
		var y = document.createElement('div');
		x.insertBefore(y,a);
		x.replaceChild(b,y);
	}
//把a里面的所有结构逆序		
	function reverElement(a){
		var x = a.children;
		for(var i = x.length-1; i >= 0; i --){
			a.appendChild(x[i]);
		}
	}
//获取滚动条的距离
	function getScrolloffset(){
		if(window.pageXOffset){
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			}
		}else {
			return {
				x : document.body.scrollLeft + document.documentElement.scrollLeft,
				y : document.body.scrollTop + document.documentElement.scrollTop
			}
		}
	}
//获取可视区窗口的尺寸
	function getViewportOffset() {
		if(window.innerWidth){
			return {
				w : window.innerWidth,
				h : window.innerHeight
			}
		}else {
			if(document.compatMode === "BackCompat") {
				return {
					w : document.body.clientWidth,
					h : document.body.clientHeight
				}
			}else {
				return {
					w : document.documentElement.clientWidth,
					h : document.documentElement.clientHeight
				}
			}
		}
	}
//求元素相对于文档的坐标
	function getElementPosition(ele){
		if(ele.offsetParent.nodeName == 'BODY'){
			return {
				l: ele.offsetLeft,
				t: ele.offsetTop
			}
		}else {
			return {
				l: ele.offsetLeft + getElementPosition(ele.offsetParent).l,
				t: ele.offsetTop + getElementPosition(ele.offsetParent).t
			}
		}
	}
//获取elem元素的prop属性
	function getStyle(elem, prop) {
		if(window.getComputedStyle) {
			return window.getComputedStyle(elem,null)[prop];
		}else {
			return elem.currentStyle[prop];
		}
	}
//封装兼容性的addEvent(elem,type,handle)
	function addEvent (elem, type, handle){
		if(elem.addEventListener){
			elem.addEventListener(type, handle, flase);
		}else if(elem.attachEvent){
			elem.attachEvent('on' + type, function() {
				handle.call(elem);
			})
		}else {
			elem['on' + type] = handle; 
		}
	}
//封装取消冒泡的函数 stopBubble(event)
	function stopBubble(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
	}
//封装阻止默认事件
	function cancleHandler(event) {
		if(event.preventDefault){
			event.preventDefault();
		}else {
			e.returnValue = false;
		}
	}
//封装事件处理程序
	function catchEvent(evnetObj, event, eventHandler) {
		if(eventObj.addEventListenre) {
			eventObj.addEventListener(event, eventHandler, false);
		}else if(eventObj.attachEvent){
			event = "on" + event;
			eventObj.attachEvent(event, eventHandler);
		}
	}
//封装取消事件处理程序
	function cancelEvent(event) {
		if(event.preventDefault) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.returnValue = false;
			event.cancelBubble = true;
		}
	}
//cookie的读写和删除
//判断客户端是否使用cookie:if(navigator.cookieEnabled);
 	function writeCookie(name, value, days){
 		var expires = "";//有效日期
 		if (days) {
 			var date = new Date();
 			date.setTime(date.getTime() + (days * 24 * 60 * 1000));
 			expires = "; expires=" + date.toGMTString();
 		}
 		document.cookie = name + "=" + value + expires + "; path=/";
  	}

  	function readCookie(name) {
  		var searchName = name + "=";
  		var cookies = document.cookie.split(';')//cookie列表使用分号隔开各个cookie
		for(var i = 0; i < cookies.length; i ++){
			var c = cookies[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1,c.length);//substring() 方法用于提取字符串中介于两个指定下标之间的字符。
			if (c.IndexOf(searchName) == 0)
				return c.substring(searchName.length, c.length);
		} 
		return null; 		
  	}
  	function eraseCookie(name){
  		writeCookie(name, "", -1);
  	}
//创建XHR对象
	function createXHR(){
		if(typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined"){
			if(typeof arguments.callee.activeXString != "string"){
				var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
					i, len;
				for(i=0,len=versions.length; i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch (ex){

					}
				} 
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else {
			throw new Error("No XHR object available.");
		}
	}
//渡一运动：
//封装运动函数，缓冲运动先快后慢
	function startMove(obj, target, attr){
		clearInterval(obj.timer);
		var iSpeed, iCur;
		obj.timer = setInterval(function (){
			if(attr == "opacity"){
				iCur = parseFloat( getStyle(obj,attr) ) * 100;
			}else {
				iCur = parseInt( getStyle(obj, attr) );
			}
			iSpeed = (target - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur === target){
				clearInterval(obj.timer);
			}else {
				if(attr == 'opacity'){
					obj.style.opacity = (iCur + iSpeed) / 100;
				}else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}, 30);
	}
//多物体多值链式运动框架,json中保存多个目标值，callback可以写成starListMove(obj1, json1)
	function startListMove(obj, json, callback){
		clearInterval(obj.timer);
		var iSpeed, iCur;
		obj.timer = setInterval(function (){
			var bstop = true;
			for(var attr in json){
				if(attr == 'opacity'){
					iCur = parseFloat( getStyle(obj, attr) ) * 100;
				}else {
					iCur = parseInt( getStyle(obj, attr) );
				}
				iSpeed = (json[attr] - iCur) / 7;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(attr == 'opacity'){
					obj.style.opacity = (iCur + iSpeed) / 100;
				}else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				if(iCur != json[attr]){
					bstop = false;
				}
			}
			if(bstop == true){
				clearInterval(obj.timer);
				typeof callback == 'function' ? callback() : ''; 
			}
		}, 30);
	}
//弹性运动，终点在300px;
	function flexMove(obj){
		clearInterval(obj.timer);
		var iSpeed = 50, a, u =0.9;
		obj.timer = setInterval(function (){
			a = (300 - obj.offsetLeft) / 4;
			iSpeed = iSpeed + a;
			iSpeed = iSpeed * u;
			if(Math.abs(iSpeed) < 1 && Math.abs(300 - obj.offsetLeft) < 1){
				clearInterval(obj.timer);
			}else {
				obj.style.left = obj.offsetLeft + iSpeed + 'px';
			}
		},30);
	}
//抛物运动，在边界遇到边界就反弹的运动
		function borderMove(obj){
		clearInterval(obj.timer);
		var iSpeedX = 6,iSpeedY = 8;
		obj.timer = setInterval(function (){
			var newLeft = obj.offsetLeft + iSpeedX;
			var newTop = obj.offsetTop + iSpeedY;
			if(newTop >= document.documentElement.clientHeight - obj.offsetHeight){
				iSpeedY *= -1;
				newTop = document.documentElement.clientHeight - obj.offsetHeight;
			}
			if(newTop <= 0){
				iSpeedY *= -1;
				newTop = 0;
			}
			if(newLeft >= document.documentElement.clientWidth - obj.offsetWidth){
				iSpeedX *= -1;
				newLeft = document.documentElement.clientWidth - obj.offsetWidth;
			}
			if(newLeft <= 0){
				iSpeedX *= -1;
				newLeft = 0;
			}
			obj.style.left = newLeft + 'px';
			obj.style.top = newTop + 'px';
		},10);
	}
//随机拖拽，抛物运动，模拟重力场
	function gravityMove(obj, iSpeedX, iSpeedY){
			clearInterval(obj.timer);
			var g = 6;
			obj.timer = setInterval(function (){
				iSpeedY　+= g;
				var newLeft = obj.offsetLeft + iSpeedX;
				var newTop = obj.offsetTop + iSpeedY;
				if(newTop >= document.documentElement.clientHeight - obj.offsetHeight){
					iSpeedY *= -1;
					iSpeedX *= 0.8;
					iSpeedY *= 0.8;
					newTop = document.documentElement.clientHeight - obj.offsetHeight;
				}
				if(newTop <= 0){
					iSpeedY *= -1;
					iSpeedX *= 0.8;
					iSpeedY *= 0.8;
					newTop = 0;
				}
				if(newLeft >= document.documentElement.clientWidth - obj.offsetWidth){
					iSpeedX *= -1;
					iSpeedX *= 0.8;
					iSpeedY *= 0.8;
					newLeft = document.documentElement.clientWidth - obj.offsetWidth;
				}
				if(newLeft <= 0){
					iSpeedX *= -1;
					iSpeedX *= 0.8;
					iSpeedY *= 0.8;
					newLeft = 0;
				}
				if(Math.abs(iSpeedX) < 1){
					iSpeedX = 0;
				}
				if(Math.abs(iSpeedY) < 1){
					iSpeedY = 0;
				}
				if(iSpeedX == 0 && iSpeedY == 0 && newTop == document.documentElement.clientHeight - obj.offsetHeight){
					clearInterval(obj.timer);
				}
				obj.style.left = newLeft + 'px';
				obj.style.top = newTop + 'px';
			},30);
		}
//在div的原型上封装轮播图函数，使用时先设置div的宽高在把轮播的图片数组作为参数传入
	HTMLDivElement.prototype.createTurnPage = function (array) {
			var arr = array;
			var size = "width:" + getStyle(this, 'width') + ";height:" + getStyle(this, 'height') +";";
			var str = '<ul style="position: absolute;top: 0;left: 0;"'+ size +'>';
			var str1 = '<span style="display: inline-block;width: 8px;height: 8px;margin-right: 5px;border-radius: 50%;background-color: #ccc;cursor: pointer;" class="active">';
			for(var i = 0; i < arr.length; i ++){
				str += '<li style="float: left;' + size + '"><img style="width: 100%;height: 100%;" src=';
				str += arr[i];
				str += ' alt=""></li>';
				if(i != 0){
					str1 += '<span style="display: inline-block;width: 8px;height: 8px;margin-right: 5px;border-radius: 50%;background-color: #ccc;cursor: pointer;">';
				}
				str1 += '</span>';
			}
			str += '<li style="float: left;' + size + '"><img style="width: 100%;height: 100%;" src=';
			str += arr[0];
			str += ' alt=""></li>';
			str += '</ul><div style="position: absolute;top: 50%;margin-top: -15px;width: 30px;height: 30px;color: #fff;font-size: 20px;font-weight: bold;text-align: center;line-height: 30px;border-radius: 50%;transition: all .3s ease-in;background-color: #000;opacity: 0.2;left: 10px;" class="btn left">&lt;</div><div style="position: absolute;top: 50%;margin-top: -15px;width: 30px;height: 30px;color: #fff;font-size: 20px;font-weight: bold;text-align: center;line-height: 30px;border-radius: 50%;transition: all .3s ease-in;background-color: #000;opacity: 0.2;right: 10px;" class="btn right">&gt;</div><div style="position: absolute;width: 100%;text-align: center;bottom:10px;" class="circle">';
			str += str1;
			str += '</div>';
			this.innerHTML = str;
			this.style.position = 'relative';
			this.style.overflow = 'hidden';
			var move = this.getElementsByTagName('ul')[0];
			var btn = this.getElementsByClassName('btn');
			var moveWidth = move.children[0].offsetWidth;
			var ospan = this.getElementsByClassName('circle')[0].getElementsByTagName('span');
			var num = move.children.length - 1;
			move.style.width = (num + 1)* moveWidth + 'px';
			console.log(num);
			var left = this.getElementsByClassName('left')[0];
			var right = this.getElementsByClassName('right')[0];
			ospan[0].style.backgroundColor = "#c20c0c";
			this.onmouseenter = function (){
				btn[0].style.fontSize='25px';
				btn[0].style.opacity='0.6';
				btn[0].style.cursor='pointer';
				btn[1].style.fontSize='25px';
				btn[1].style.opacity='0.6';
				btn[1].style.cursor='pointer';
			}
			left.onclick = function (){
				autoMove('right->left');
			}
			right.onclick = function () {
				autoMove('left->right');
			}
			var lock = true;
			var index = 0;
			function autoMove (direction){
				if(lock){
					lock = false;
					clearTimeout(timer);
					if(!direction || direction == 'left->right'){
						index ++;
						if(index == num)
						index = 0;
						changeIndex(index);
						startListMove(move, {left:move.offsetLeft-moveWidth}, function (){
							 if(move.offsetLeft == - num * moveWidth){
							 	move.style.left = '0px';
							 	index = 0;
							 }
							 timer = setTimeout(autoMove, 1500);
							 lock = true;
						});
					}
					else if(direction == 'right->left'){
						if(move.offsetLeft == 0){
							move.style.left = - num * moveWidth + 'px';
							index = num;
						}
						index --;
						changeIndex(index);
						startListMove(move, {left: move.offsetLeft + moveWidth},function (){
							 timer = setTimeout(autoMove, 1500);
							 lock = true; 
						});
					}
				}
			}
			timer = setTimeout(autoMove, 1500);
			function changeIndex (index){
				for (var i = 0; i < ospan.length; i ++){
					ospan[i].className = '';
					ospan[i].style.backgroundColor = "#ccc";
				}
				// ospan[index].className = 'active';
				ospan[index].style.backgroundColor = '#c20c0c';
			}
			for (var i = 0; i < ospan.length; i ++){
					(function (myindex) {
						ospan[myindex].onclick = function () {
							lock = false;
							clearTimeout(timer);
							index = myindex;
							changeIndex(index);
							startListMove(move, {left : - index * moveWidth}, function (){
								lock = true;
								timer = setTimeout(autoMove, 1500);
							})
						}
				})(i);	
			}
	}
//封装数组的各种方法，不会改变原数组
	Array.prototype.myForEach = function (func){
		for(var i = 0; i < this.length; i ++){
			func(this[i], i);
		}
	}
	Array.prototype.myFilter = function (func){
		var arr = [];
		for(var i = 0; i < this.length; i ++){
			if(func(this[i], i)){
				arr.push(this[i]);
			}
		}
		return arr;
	}
	Array.prototype.myMap = function (func){
		var arr = [];
		for(var i = 0; i < this.length; i ++){
			if(this[i] && typeof this[i] == 'object') {
				var newObj = {};
				deepClone(newObj, this[i]);
				arr.push(func(newObj, i));
			}else {
				arr.push(func(this[i], i));
			}
		}
		return arr;
	}
	Array.prototype.myReduce = function (func, init){
		var previous = init,k=0;
		if(init == undefined){
			previous = this[0];
			k = 1;
		}
		for(k; k < this.length; k++){
			previous += func(previous, this[k], k);
		}
		return previous;
	}

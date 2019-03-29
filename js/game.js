var letterBIndex;
var tempColor;
$(document)
			.bind( "contextmenu",function(e){  return false;  })	// 禁止右键
			.bind( "selectstart",function(e){  return false;  })	// 禁止选择
			.keydown(function(){
				var k = window.event.keyCode;
				if (k == 116) {           //屏蔽 F5 刷新键
					window.event.keyCode    = 0;
					window.event.returnValue= false;
				}  else if (event.keyCode==46)  { 
					tempColor = $("#gamePanel .lettersPanel").find(".letter:eq("+letterBIndex+")").css("color");
					$("#gamePanel .lettersPanel").find(".letter:eq("+letterBIndex+")").css("color","red");
					event.returnValue=false;
				} else if ((event.keyCode==116)||(event.ctrlKey && event.keyCode==82))  { 
					event.keyCode=0;
					event.returnValue=false;
				} else if (event.keyCode==17)  { 
					event.keyCode=0;
					event.returnValue=false;
				} 
			})
			.keyup(function(){
				$("#gamePanel .lettersPanel").find(".letter:eq("+letterBIndex+")").css("color",tempColor);
				event.returnValue=false;
			})
			.dblclick( function () { event.returnValue=false; })
			.ready(function() {
				var level = 1;	// 难度级别
				var gameLettersArray = ["X","K","Z","2","I","1","I","i","N","M","0","O","O","o","0","o","O","Q","E","F","R","P","T","Y","U","V","P","B","D","O","Z","z","C","O","8","B"]; // 字符数组
				var gameSkinArray = ["black"/*黑*/,"white"/*白*/,"#7FDBFF"/*天空蓝*/,"#D3EBB4"/*嫩绿*/]; // 换肤数组
				var gameFontSizeArray = [24,20,18]; 		// 字号数组
				var gameLevelScoreArray = [1,2,3]; 			// 难度与计分数组
				
				var letter ;	// 显示字符
				var letterB ;	// 答案字符
				
				// 载入游戏面板，开始游戏
				startGame();
				startGame();
				function startGame(){
					// 重置参数
					var random = Math.round(Math.random()*100);
					if (random%2 == 0){	// 偶数
						letter = gameLettersArray[random%gameLettersArray.length];
						letterB = gameLettersArray[random%gameLettersArray.length+1];
						color = gameSkinArray[random%gameSkinArray.length];
						colorB = gameSkinArray[random%gameSkinArray.length+1];
					} else {
						letter = gameLettersArray[random%gameLettersArray.length];
						letterB = gameLettersArray[random%gameLettersArray.length-1];
						color = gameSkinArray[random%gameSkinArray.length];
						colorB = gameSkinArray[random%gameSkinArray.length-1];
					}
					$("#level p").html(level);
					$("#gamePanel .lettersPanel").addClass("level"+level);
					var fontSize = gameFontSizeArray[level-1];	// 定义字号
					// 换肤
					$("body #mask").css("background-color",colorB);
					$("body").css("color",color).css("background-color",colorB);
					$("body #gamePanel .lettersPanel").css("border-color",color);
					$("body #gamePanel .scorePanel").css("border-color",color);
					$("body #gamePanel .scorePanel h1").css("color",color);
					$("body #gamePanel .scorePanel .button").mouseover(function(){
						$(this).css("background-color",color).css("color",colorB);
					});
					$("body #gamePanel .scorePanel .button").mouseout(function(){
						$(this).css("background-color",colorB).css("color",color);
					});
					
					var widthPerLetter = $("#gamePanel .lettersPanel .letter").width();	// 字符宽度
					//alert(widthPerLetter);
					var width = parseInt($("#gamePanel .lettersPanel").css("width"));		// 面板宽度
					var height = parseInt($("#gamePanel .lettersPanel").css("height"));	// 面板高度
					var wordsPerLine = width/widthPerLetter;	// 水平方向字数
					var rowNum = height/fontSize;	// 垂直方向行数
					if(level==1){	// 差值微调
						//wordsPerLine -=2;
					} else if(level == 2){
						//wordsPerLine -=1;
					} else if(level == 3){
						wordsPerLine +=2;
						rowNum -=1;
					}
					//alert(width+"/"+fontSize+"="+wordsPerLine+"\n"+height+"/"+fontSize+"="+rowNum);
					var stringPerLine = "";	// 每行的字符串
					for(var i=0; i<wordsPerLine; i++){
						stringPerLine += '<div class="letter">'+letter+'</div>';
					}
					// 显示全部字
					$("#gamePanel .lettersPanel").empty();
					for(var i=0; i<rowNum; i++){
						$("#gamePanel .lettersPanel").append(stringPerLine+"<br/>");
					}
					//$("#gamePanel .lettersPanel .letter").css("font-size", fontSize+"px").css("font-size", fontSize+"px"); // 设置游戏字号

					// 随机改变字符
					var letterNum = $("#gamePanel .lettersPanel .letter").size();	// 字符总数
					letterBIndex = Math.round(Math.random()*letterNum);
					//alert(letterNum+"__"+letterBIndex);
					// 判断答案
					$("#gamePanel .lettersPanel").find(".letter:eq("+letterBIndex+")").html(letterB);
					$(".letter").click(function(){
						if ($(this).text() == letterB){
							alert("Yes, u r right, continue to play~ ：）");
							$("#mask").fadeIn("slow",function(){
								$(this).fadeOut("slow");	
								$("#count p").html( parseInt($("#count p").html()) + 1);
								$("#score p").html( parseInt($("#score p").html()) + gameLevelScoreArray[level-1]);
								if( parseInt($("#score p").html()) >10 ){
									level = 2;
								} else if( parseInt($("#score p").html()) >30 ){
									level = 3;
								}
								startGame();
							});
						} else {
							alert("Sorry, u r wrong, try again~ ：）");
						}
					});
				}
			});
			
			// 计时器
			var time = 0;	// 逝去的时间（秒）
			setInterval("startTimer()",1000)
			function startTimer(){
				var hour = parseInt(time/3600);		// 小时
				var minute = parseInt(time/60%60);	// 分钟
				var second = parseInt(time%60);		// 秒
				var timeStr = addZero(hour)+":"+addZero(minute)+":"+addZero(second);
				$("#timer p").html(timeStr);
				time++;
			}
			// 补零操作
			function addZero(n){
				if(n<10){
					return "0"+n;
				} else {
					return ""+n;
				}
			}
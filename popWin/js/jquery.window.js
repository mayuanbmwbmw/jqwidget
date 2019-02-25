// JavaScript Document
(function($){
	$.extend({ 
			 popWin:function(options){
				 function Win(options){
					window.curWin=this;
					this.init=function(){
					if(document.getElementById("windows"))return;
					//页面可视区域高度
					//var winHeight = document.documentElement.clientHeight;
					//var aa = document.body.clientHeight;
					var winHeight = document.documentElement.scrollHeight;
					//页面滚动过去的高度。
					//var dd = document.documentElement.scrollTop;
					$("body").append("<div id='windows' style='width:100%;height:"+winHeight+"px;position:fixed;z-index:100;top:0px;left:0px'><div class='winbg' style='width:100%;height:100%;position:absolute;z-index:0;'></div><div id='winContainer' style='position:absolute;z-index:1;'></div></div>");
					this.container=document.getElementById("winContainer");		
			
			
					//this.resizable=(options.resizable!=null)?options.resizable:true;
					this.draggable=(options.draggable!=null)?options.draggable:true;
			
					this.url=options.url;
					this.html=options.html;
					this.el=options.el;
					this.ajaxhtml=options.ajaxhtml;
			
					this.title=(options.title!=null)?options.title:"窗口";
					
					if(this.el != null && this.el != undefined){
						this.elParent = $("#"+this.el).parent();
						this.cloneEl = $("#"+this.el).clone(true);
					}
			
					//位置尺寸
					var w=options.width||600;
					var h=options.height||400;
			
					this.minWidth=options.minWidth||300;
					this.minHeight=options.minHeight||200;
					
					//设置窗体
					var css=(options.noborder)?"noborderwin":"dialogwin";
					this.WIN=window.curWin.creatElement(this.container,"div","","win "+css);
					if(!this.container.maxIndex)this.container.maxIndex=-1;
					this.WIN.style.zIndex=this.container.maxIndex;
			
					this.win=window.curWin.creatElement(this.WIN,"div","","");this.win.style.cssText="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:1;";
			
					//边框
					this.n=window.curWin.creatElement(this.win,"div","","n");	this.n.innerHTML=this.title;
					//this.ne=creatElement(this.win,"div","","ne");
					this.e=window.curWin.creatElement(this.win,"div","","e");
					this.s_w_border=window.curWin.creatElement(this.win,"div","","s_w_border");
					this.s_b_border=window.curWin.creatElement(this.win,"div","","s_b_border");
					this.s=window.curWin.creatElement(this.win,"div","","s");
					this.c=window.curWin.creatElement(this.win,"div","","c");
					
					var l=options.left||Math.floor(Math.random()*($("body").width()-w));
					var t=options.top||Math.floor(Math.random()*($("body").height()-h));
					options.center=(options.center!=null)?options.center:false;
					if(options.center){
								var avalibleWidth = document.documentElement.clientWidth;
								var avalibleHeight = document.documentElement.clientHeight;
								l=(avalibleWidth-w-this.e.offsetWidth)/2;
								t=(avalibleHeight-h-(this.n.offsetHeight+this.s.offsetHeight+this.s_b_border.offsetHeight+this.s_w_border.offsetHeight))/2;
						}
			
					if(l<0)l=0;
					if(t<0)t=0;
					
					this.WIN.style.top=t+"px"
					this.WIN.style.left=l+"px";
					this.WIN.style.width=(w+this.e.offsetWidth)+"px";
					this.WIN.style.height=(h+this.n.offsetHeight+this.s.offsetHeight+this.s_b_border.offsetHeight+this.s_w_border.offsetHeight)+"px";
			
				
					//内容
					this.content=this.c;
					if(this.url){this.c.style.overflow="hidden";this.c.innerHTML='<iframe scrolling="yes" frameborder="0" width="100%" height="100%" allowtransparency="true" ></iframe>';this.content=this.c.firstChild;this.content.contentWindow.location.href=this.url;this.content.contentWindow.fromWin=this.fromWin;this.content.contentWindow.frameWin=this;};
					if(this.el){this.c.insertBefore(document.getElementById(this.el),null);$("#"+this.el,this.c).css("display","");}
					if(this.html){this.c.innerHTML=this.html;};		
					if(this.ajaxhtml){$(this.content).load(this.ajaxhtml);}
					this.content.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:100%;border:none";
					//蒙板
					this.mask=window.curWin.creatElement(this.win,"div","","mask");this.mask.style.cssText="position:absolute;left:0px;top:0px;width:100%;height:100%;background:#000;filter:alpha(opacity=0);opacity:0.01;";
					$(this.mask).hide();
					this.WIN.mask=this.mask;
					//按钮
					this.close=window.curWin.creatElement(this.win,"div","","close");
					this.collapse=window.curWin.creatElement(this.win,"div","","collapse");
					//缩放角
					//this.resizer=creatElement(this.win,"div","","resizer");
					//if(!this.resizable)this.resizer.style.display="none";
			
					//点击按钮、标题条、蒙板、缩放角激活窗口
					this.close.obj=this.collapse.obj=this.WIN.obj=this.n.obj=this.content.obj=this;
					
					this.close.onclick=function(){this.obj.closeWin();};
					
					//this.min.onclick=function(){this.obj.minWin();};
					//this.collapse.onclick=function(){this.obj.collapseWin();};
			
					this.resize();
					$(window).resize(function(){
						var winHeight = document.documentElement.scrollHeight;
						!!document.getElementById("windows") ? document.getElementById("windows").style.height = window.curWin.px(winHeight) : "";
					})
					this.WIN.style.display="none";
					//允许拖拽缩放
					if(this.draggable)$(this.WIN).draggable({handle:this.n,iframeFix:true,zero:true,
						stop:function(){
							var objTop = this.offsetTop;
							var objH = this.offsetHeight;
							var objW = this.offsetWidth;
							var objL = this.offsetLeft;
							var bodyW = document.documentElement.offsetWidth;
							var bodyH = document.documentElement.clientHeight;
							if(objTop < 0){
								this.style.top = "0px";
							}
							if(objH <= bodyH){
								if(this.offsetTop > (bodyH-objH)){
									this.style.top = bodyH-objH+"px";
								}
							}else{
								this.style.top = "0px";
							}
							
							if(objL < 0 ){
								this.style.left = "0px";
							}
							
							if(objL > (bodyW-objW)){
								this.style.left = bodyW-objW+"px";
							}
								 
						}
					});
					//if(this.resizable){$(this.WIN).resizable({minHeight: this.minHeight,  minWidth: this.minWidth,  start:function(){$(this.mask).show();} ,stop:function(){$(this.mask).hide();this.obj.resize();}, helper:"ui-dummy" });}			
					$(this.WIN).fadeIn("fast");
				}
				
			
				this.resize=function(w,h){
					if(w) this.WIN.style.width=window.curWin.px(w+this.e.offsetWidth);
					if(h) this.WIN.style.height=window.curWin.px(h+this.n.offsetHeight+this.s.offsetHeight+this.s_b_border.offsetHeigh+this.s_w_border.offsetHeight);
					w=this.WIN.offsetWidth;
					h=this.WIN.offsetHeight;
					if(this.n.offsetHeight==h||this.e.offsetWidth==w||this.s.offsetHeight==h||this.s_b_border.offsetHeight==h||this.s_w_border.offsetHeight==h)return false;
				
					this.n.style.left=0;
					this.n.style.width=window.curWin.px(w-this.e.offsetWidth);
					//this.ne.style.left=px(this.n.offsetWidth);
					
					this.c.style.left=0;
					this.c.style.top=window.curWin.px(this.n.offsetHeight);
					this.c.style.width=window.curWin.px(w-this.e.offsetWidth);
					this.c.style.height=window.curWin.px(h-this.n.offsetHeight-this.s.offsetHeight-this.s_b_border.offsetHeight-this.s_w_border.offsetHeight);			
					this.e.style.top=window.curWin.px(6);
					this.e.style.left=window.curWin.px(this.c.offsetWidth);
					this.e.style.height=window.curWin.px(h-6);
					
					this.s.style.left=window.curWin.px(6);
					this.s.style.top=window.curWin.px(this.n.offsetHeight+this.c.offsetHeight+this.s_b_border.offsetHeight+this.s_w_border.offsetHeight);
					this.s.style.width=window.curWin.px(w-this.e.offsetWidth-6);
					
					this.s_w_border.style.left=window.curWin.px(0);
					this.s_w_border.style.top=window.curWin.px(this.n.offsetHeight+this.c.offsetHeight);
					this.s_w_border.style.width=window.curWin.px(w-this.e.offsetWidth);
					
					this.s_b_border.style.left=window.curWin.px(0);
					this.s_b_border.style.top=window.curWin.px(this.n.offsetHeight+this.c.offsetHeight+this.s_w_border.offsetHeight);
					this.s_b_border.style.width=window.curWin.px(w-this.e.offsetWidth);
					
					this.mask.style.top=window.curWin.px(this.n.offsetHeight);
					this.mask.style.height=window.curWin.px(h-this.n.offsetHeight);
					//this.resizer.style.top=px(h-this.resizer.offsetHeight);
					//this.resizer.style.left=px(w-this.resizer.offsetWidth);
			
					//兼容AIR
					//try{this.content.contentWindow.Layout.resizeAll();}catch(e){};
					return true;
				}
			
				this.closeWin=function(){
					if(this.el != null && this.el != undefined){
						$(this.cloneEl).appendTo(this.elParent);
					}
					$(this.WIN).fadeOut("fast",function(){
						$(this.WIN).remove();
						$("#windows").remove();
						window.curWin=null;
						window[this]=null;  
												
					});
				}
			
				this.setTitle=function(t){
					this.n.innerHTML=t;
					this.title=t;
				}
				
				this.px = function(num){
					if(num<0)num=0;
					return num.toString()+"px";
				}
				
				this.creatElement = function(p,n,Id,c){
					var ne=document.createElement(n);
					p.appendChild(ne);
					if(Id!="")ne.id=Id;
					if(c!="")ne.className=c;
					return ne;
				}

				this.options=options;
				this.init();

			}
			return new Win(options);
				
				
		}
			 
			 })
})(jQuery)
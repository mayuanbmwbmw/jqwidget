
(function( $, undefined ) {

    $.widget( "ui.timeline", {
        options : {
            timeline:"timeline",
            details:"details",
            outTime:500
        },
        _create : function() {

        	var self = this,
                timeline = $("."+self.options.timeline+":visible");

            timeline.find("li").each(function(){
                $(this).append("<span class='timeicon1'></span>");
            });

        },
        _init:function(){
            var self = this,
                details = $("."+self.options.details+":visible"),
                timeline = $("."+self.options.timeline+":visible"),
                detail = details.children("div"),
                arr = [],
                parentHeight = details.height(),
                parentPositionHeight = details.position().top;

            self.destroy();
            timeline.scrollTop(0);
            timeline.height(timeline.parent().height());
            $("li:eq(0)",timeline).addClass("focus").attr("data-click",true).siblings().removeClass("focus");


            detail.each(function(){
                arr.push($(this).position().top-parentPositionHeight);
            });

            $("li",timeline).on("click",function(){
                var top = details.scrollTop(),
                    $this = $(this),
                    intervalfunc = function(){
                        var compare = arr[$this.index()];
                        $(".details").animate({scrollTop: compare-10}, self.options.outTime);
                    };
                //$this.addClass("focus").attr("data-click",true).siblings().removeClass("focus");
                intervalfunc();
                //var ss=setInterval(intervalfunc,self.options.interval);
            });

            details.scroll(function(event){
                if( $("li[data-click=true]",timeline).length>0 ){
                    $("li[data-click=true]",timeline).removeAttr("data-click");
                    return false;
                }
                var scrollheight=$(this).scrollTop();
                if(scrollheight< (arr[1]-arr[0])/2 ){
                    $("li:eq(0)",timeline).addClass("focus").siblings().removeClass("focus");
                    return false;
                }else if(self._isbottom()){
                    $("li:eq("+(arr.length-1)+")",timeline).addClass("focus").siblings().removeClass("focus");
                    return false;
                }
                $.each(arr,function(i,info){
                    if( info-scrollheight <parentHeight/2 && info-scrollheight>0){
                        $("li:eq("+i+")",timeline).addClass("focus").siblings().removeClass("focus");
                        return false;
                    }
                });
            });


            timeline.find("li").eq(0).click();
        },
        widget: function(){
        	
        },
        destroy : function() {
        	this._destroy();
        },
        _destroy : function() {
        	$("li",this.timeline).off("click");
        },
        _isbottom:function(){
            var domHeight=0;
            $("."+this.options.details+":visible").children().each(function(){
                domHeight+=$(this).outerHeight();
            })
            return $("."+this.options.details).scrollTop()==domHeight-$("."+this.options.details).height();
        }
    } );
})( jQuery );

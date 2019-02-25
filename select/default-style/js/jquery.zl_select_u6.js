/**
 * 此插件在iframe内向外弹出层的时候如果使用了niceScroll插件，将无法使用，滚动插件某些功能
 * 并且滚轴插件也无法正常使用
 */
(function ($) {
    var zl_selectFun=(function(){
        function zl_select(elem,options){
            this.elem=elem;
            this.settings=$.extend(true, {},$.fn.zl_select.defults,options||{});
            this.init();
        }
        zl_select.prototype={
            //初始化方法
            init:function(){
                var self=this;
                self.containerW=self.settings.w||self.elem.width();
                self.containerH=self.settings.h||self.elem.height();
                self.createContainer();
                self.createDrop();
                self.event();
                !!self.settings.completeCallback&&self.settings.completeCallback(self);
            },
            //生成select
            createContainer:function(){
                var self=this;
                self.elem.addClass("zl_select_ele");
                self.randomStr=self._randomString(6);
                self.elem.attr("data-id",self.randomStr);
                self.container = $("<a class='select-container' onclick='return false;' href='#' tabindex='-1' />");
                self.content = $("<span class='content'></span>");
                self.icon = $("<span class='icon'></span>");
                self.icon.appendTo(self.container);
                self.content.appendTo(self.container);
                if(self.elem.prop("disabled")){
                    self.container.addClass("disabled");
                }
                if(self.elem.val()!=""){
                    self.container.addClass("has-val");
                }
                alert(self.elem.wrap("<div class='zl_select' style='display:inline-block;'></div>").attr("class"));
                self.selectPanel =self.elem.wrap("<div class='zl_select' style='display:inline-block;'></div>").closest(".zl_select");
                self.selectDropPanel=self.settings.selectDropPanel||self.selectPanel;
                self.container.appendTo(self.selectPanel);
                self.containerPadding=parseInt(self.container.css("paddingLeft"),10)+parseInt(self.container.css("paddingRight"),10);
                self.container.width(self.containerW-self.containerPadding)
                    .height(self.containerH)
                    .css("line-height", (self.containerH) + "px");
                self.iconw = self.icon.outerWidth();
                self.content.css("marginRight",self.iconw);
                self.elem.hide();
            },
            createDrop:function(){
                var self=this;
                self.drop = $("<div class='select-drop' />");
                self.items = $("<ul class='items' />");
                self.items.appendTo(self.drop);
                self.items_maxW=self.settings.items_w||self.container.innerWidth();
                self.items_minW=self.container.innerWidth();
                self.drop.appendTo(self.selectDropPanel)
                    .css({
                        "minWidth":self.items_minW,
                        "width":self.items_maxW
                    });
                    //alert(self.settings.items_h);
                self.settings.items_h&&drop.css("maxHeight",self.settings.items_h);
                self.drop.attr("data-for",self.randomStr);
                !!$.fn.niceScroll&&self.drop.niceScroll(self.settings.scrollStyle);
                self._init_item()
            },
            _init_item:function(){
                var self=this;
                var opts, sv;
                self.items.empty();
                opts = self.elem.find("option");
                sv = self.elem.val();
                //分解select元素项，构建select组件结构。
                opts.each(function (index, data) {
                    var ele = $("<li />");
                    ele.appendTo(self.items);
                    var txt = $(data).text();
                    var val = $(data).attr("value");
                    ele.text(txt);
                    ele.attr("v", val);
                    if (sv == val) {
                        //设置默认当前值
                        self.content.text(txt);
                        ele.addClass("down");
                    }
                })
            },
            reloadData:function(){
                var self=this;
                self._init_item();
            },
            changeState:function(){
                var self=this;
                self.elem.prop("disabled")?self.container.addClass("disabled"):self.container.removeClass("disabled");
            },
            hideDrop:function(){
                var self=this;
                self.drop.hide();
                !!$.fn.mousewheel&&$(document).unmousewheel();
                $(document).add($(top.document)).off("mousedown.zl_select");
                self.clearState();
            },
            clearState:function(){
                var self=this;
                self.drop.removeClass("positionBottom positionTop");
                self.container.removeClass("positionBottom positionTop active");
            },
            destroy:function(){
                var self=this;
                self.elem.removeData("data-select").show();
                self.selectPanel.before(self.elem);//将select元素放置到页面初始化位置。
                self.selectPanel.remove();
                self.drop.remove();
            },
            //添加事件
            event:function(){
                var self=this;
                self.drop
                    .on("click", "li",function () {
                        var v = $(this).attr("v");
                        self.elem.val(v).trigger("change");
                        self.content.text($(this).text());
                        $("li", self.items).removeClass("down");
                        $(this).addClass("down");
                        self.hideDrop();
                    })
                    .on("mouseover","li",function(){
                        $(this).addClass("over");
                    })
                    .on("mouseout","li",function(){
                        $(this).removeClass("over");
                    })

                self.elem.on( "change", function () {
                    var sv = self.elem.val();
                    $("li", self.items).each(function (i, ele) {
                        var v = $(ele).attr("v");
                        if (sv == v) {
                            self.content.text($(ele).text());
                            $("li", self.items).removeClass("down");
                            $(ele).addClass("down");
                            return false;
                        }
                    })
                    if(sv!=""){
                        self.container.addClass("has-val");
                    }else{
                        self.container.removeClass("has-val");
                    }
                })

                //select组件内容框绑定事件。
                self.container.on("click", function (e) {
                    //e.stopPropagation();
                    if($(this).hasClass("disabled")){
                        !!self.settings.disabledClickCallback&&self.settings.disabledClickCallback.call(self);
                        return false;
                    }
                    if (self.drop.is(":hidden")) {
                        self.drop.show()
                            .position({
                                my: "left top",
                                at: "left bottom",
                                of: $(this),
                                using:self._positionUsing
                            })
                        self.container.addClass("active");
                        //鼠标在下拉选项区域中滚动时，不隐藏下拉框，在其它位置滚动时，隐藏下拉框。
                        !!$.fn.mousewheel&&$(document).mousewheel(function(e){
                            var e=e||window.event;
                            var tag=e.srcElement||e.target;
                            if($(tag).closest(".select-drop").length==0){
                                self.hideDrop();
                            }
                        });
                        $(document).add($(top.document)).on("mousedown.zl_select", function (e) {
                            var e=e||window.event;
                            var tag=e.srcElement||e.target;
                            //点击事件触发元素是select组件内容框时，不隐藏select组件下拉项。
                            if (isNotClickContainer()) {
                                self.hideDrop();
                            }
                            //$(document).add($(top.document)).off("mousedown.zl_select");
                            //判断是否没有点中下拉控件
                            function isNotClickContainer(){
                                var container=$(tag).closest(".select-container");
                                var drop=$(tag).closest(".select-drop");
                                var nicescroll=$(tag).closest(".nicescroll-rails");
                                var isNotClickContainer=container.length == 0||container[0]!=self.container[0];
                                var isNotClickDrop=drop.length == 0||drop[0]!=self.drop[0];
                                var isNotClickScroll=!$.fn.niceScroll?true:(function(){
                                    return nicescroll.length == 0||
                                    nicescroll.closest(".nicescroll-rails").prev(".select-drop").length == 0||
                                    nicescroll.closest(".nicescroll-rails").prev(".select-drop")[0]!=self.drop[0]
                                })()
                                return isNotClickContainer&&isNotClickDrop&&isNotClickScroll
                            }
                        })
                    } else {
                        self.hideDrop();
                    }
                })
            },
            _positionUsing:function(position, feedback){
                $(this).css( position );
                //当下拉菜单项时，将转换输入框的圆角方式。
                if(feedback.vertical=="bottom"){
                    feedback.target.element.add(feedback.element.element).addClass("positionBottom");
                }else if(feedback.vertical=="top"){
                    feedback.target.element.add(feedback.element.element).addClass("positionTop");
                }
            },
            _randomString:function(len){
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                var maxPos = $chars.length;
                var str = '';
                for (i = 0; i < len; i++) {
                    str += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return str;
            },
            _mousewheelHandle:function(e){
            }
        }
        return zl_select;
    })()
    $.fn.zl_select=function(options){
        return $(this).each(function(index, el) {
            var elem=$(this),
                zl_select=elem.data("data-select");
            if(!zl_select){
                zl_select=new zl_selectFun(elem,options);
                elem.data("data-select",zl_select);
            }
            if(typeof options=="string"){
                return zl_select[options]();
            }
        });
    }
    $.fn.zl_select.defults={
        w: 200,
        h: 26,
        items_w: null,
        items_h: null,
        selectDropPanel:null,
        disabledClickCallback: $.noop(),
        completeCallback:$.noop(),
        scrollStyle:{
            autohidemode:false
        }
    }
})(jQuery);
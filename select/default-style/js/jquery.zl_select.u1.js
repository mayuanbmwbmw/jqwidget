﻿// JavaScript Document
(function ($) {
    $.fn.zl_select = function (options) {
        var defaults = {
            w: 200,
            h: 26,
            items_w: null,
            items_h: null
        };
        setOptions(options);
        var opts = [];
        var objArray = $(this);
        objArray.each(function (index, ele) {
            var obj = $(this);
            var drop, items, container;
            //避免重复应用组件样式
            if ($(".select-container", obj).length != 0) {
                return true;
            }
            container = $("<a class='select-container' onclick='return false;' href='#' tabindex='-1' />");
            var content = $("<span />");
            var icon = $("<div />");
            content.appendTo(container);
            icon.appendTo(container);
            container.appendTo(obj);
            obj.width(getOptions().w);
            container.height(getOptions().h);
            container.css("line-height", getOptions().h + "px");
            var iconw = icon.outerWidth();
            //内容区宽度
            //10是container的内边距和边框宽度之和。
            content.width(getOptions().w - iconw - 10);

            var drop = $("<div class='select-drop' />");
            var items = $("<ul class='items' />");
            items.appendTo(drop);
            drop.appendTo($(this))
                .width(!!getOptions().items_w ? getOptions().items_w : container.innerWidth());
            if (getOptions().items_h) {
                drop.height(getOptions().items_h)
            }
            var selectEle = $(">select", obj);
            _init_item({
                obj: obj,
                selectEle: selectEle,
                container: container,
                items: items,
                drop: drop
            })

            //当select元素触发change时，select组件自动变更值。
            $(obj).delegate(selectEle, "change", function (e) {
                var cv = $(selectEle).val();
                $("li", items).each(function (i, ele) {
                    var v = $(ele).attr("v");
                    if (cv == v) {
                        $(">span", container).text($(ele).text());
                        $("li", items).removeClass("down");
                        $(ele).addClass("down");
                        return false;
                    }
                })
            })

            //select组件内容框绑定事件。
            container.on("click", function (e) {
                e.stopPropagation();
                if (drop.is(":hidden")) {
                    $(".select-drop").hide();
                    drop.show()
                        .position({
                            my: "left top-1",//减1，为了避免下边框双重重叠，所以向上移动1像素。
                            at: "left bottom",
                            of: $(this)
                        });
                    //内容区宽度
                    //content.width(getOptions().w - 10 - iconw);
                    //触发body,隐藏select组件下拉项。
                    $("body").on("click", function (e) {
                        var evt = e.target;
                        //点击事件触发元素是select组件内容框时，不隐藏select组件下拉项。
                        if ($(evt).closest("a.select-container").length == 0) {
                            drop.hide();
                            $(document).undelegate("body", "click");
                        }
                    })
                } else {
                    drop.hide();
                }
            })
        })
        //当select下拉选项集合有改变时，组件下拉需要重新获取新的集合。
        objArray.reloadData = function (obj) {
            var eleObjs = !!obj ? obj : objArray;
            $.each(eleObjs, function (index, ele) {
                var that = $(this),
                    items = that.find(".items"),
                    container = that.find(".select-container"),
                    selectEle = that.find("select"),
                    drop = that.find(".select-drop");
                _init_item({
                    obj: that,
                    selectEle: selectEle,
                    container: container,
                    items: items,
                    drop: drop
                })
            })
        }

        function _item_click(o, selectEle, container, txt, items, drop) {
            o.bind("click", function () {
                var v = o.attr("v");
                selectEle.val(v);
                $(">span", container).text(txt);
                $("li", items).removeClass("down");
                o.addClass("down");
                drop.hide();
                //触发select的change事件
                selectEle.trigger("change");
            })

        }

        function _item_hover(o) {
            o.hover(function () {
                    $(this).addClass("over");
                },
                function () {
                    $(this).removeClass("over");
                })
        }

        function _init_item(o) {
            var prams = $.extend({
                obj: null,
                selectEle: null,
                container: null,
                items: null,
                drop: null
            }, o)
            var selectEle, opts, copt, cv;
            prams.items.empty();
            selectEle = $(">select", prams.obj);
            opts = selectEle.find("option");
            //初始化时，select元素的当前值。
            copt = selectEle.find("option:selected");
            cv = copt.attr("value");
            //分解select元素项，构建select组件结构。
            opts.each(function (i, d) {
                var o = $("<li />");
                o.appendTo(prams.items);
                var txt = $(d).text();
                var val = $(d).attr("value");
                o.text(txt);
                o.attr("v", val);

                if (cv == val) {
                    //设置默认当前值
                    $(">span", prams.container).text(txt);
                    $("li", prams.items).removeClass("down");
                    o.addClass("down");
                }

                //select组件item项绑定事件。
                _item_click(o, prams.selectEle, prams.container, txt, prams.items, prams.drop);
                _item_hover(o);
            })
        }

        //合并参数
        function setOptions(options) {
            defaults = $.extend(defaults, options);
            return defaults;
        }

        //得到参数集合
        function getOptions() {
            return defaults;
        }

        return objArray;
    };
})(jQuery);
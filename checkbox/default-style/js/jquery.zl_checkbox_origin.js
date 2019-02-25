// JavaScript Document
(function ($) {
    var defaults = {
        afterEvent: $.noop()    //$(this).find(":checkbox"):�����Ӧ��checkbox���� this�������Ӧ��ѡ������������
    };
    $.fn.zl_checkbox = function (options) {
        setOptions(options);
        var opts = getOptions();
        var checkbox_array = $(this);
        checkbox_array.each(function (index, ele) {
            var eleObj,
                eleObj = $(ele);
            eleObj.bind("hover", function () {
            });
            eleObj.unbind("click", methods.obj_click(eleObj)).bind("click", function () {
                methods.obj_click(eleObj);
                !!opts.afterEvent&&opts.afterEvent.call(this,$(this).find(":checkbox"),this);
            })
            //��checkbox�����ʽ�ָ�Ĭ��
            checkbox_array
                .removeClass("zl_ck_down")
                .addClass("zl_ck_normal");
            //����checkbox button��ѡ��״̬������checkbox�����ѡ����ʽ��
            $(":checkbox:checked", checkbox_array)
                .parent("div.zl_ck")
                .removeClass("zl_ck_normal")
                .addClass("zl_ck_down");

        })
        return checkbox_array;
    };
    var methods = {
        obj_click: function (eleObj) {
            if (eleObj.hasClass("zl_ck_normal")) {
                eleObj.removeClass("zl_ck_normal");
                eleObj.addClass("zl_ck_down");
            } else if (eleObj.hasClass("zl_ck_down")) {
                eleObj.removeClass("zl_ck_down");
                eleObj.addClass("zl_ck_normal");
            }
        }

    }
    //�ϲ�����
    function setOptions(options) {
        defaults = $.extend({
            afterEvent: $.noop()
        }, options);
        return defaults;
    }

    //�õ���������
    function getOptions() {
        return defaults;
    }
})(jQuery);
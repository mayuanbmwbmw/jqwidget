// JavaScript Document
(function ($) {
    $.fn.zl_checkbox = function (options) {
        var defaults = {
            afterEvent: $.noop()    //$(this).find(":checkbox"):�����Ӧ��checkbox���� this�������Ӧ��ѡ������������
        };
        setOptions(options);
        var opts = getOptions();
        var checkbox_array = $(this);
        checkbox_array.each(function (index, ele) {
            var eleObj = $(ele),
                eleId=$(ele).attr("id"),//checkbox��ID
                forEle=eleObj.siblings("[for="+eleId+"]").addClass("chb_label"),
                //��checkbox�ϵ�class��style��ֲ������ΧԪ����
                wrapEle=$("<span class='zl_ck zl_ck_normal'></span>")
                    .addClass(eleObj.attr("class"))
                    .attr("style",eleObj.attr("style"));
            //Ϊ�ռ�ȥ��class��style���ԣ����������span��ǩ
            eleObj
                .removeAttr("class style")
                .add(forEle)
                .wrapAll(wrapEle);
            //����checkbox button��ѡ��״̬������checkbox�����ѡ����ʽ��
            if($(eleObj).is(":checked")){
                $(eleObj).closest(".zl_ck")
                    .removeClass("zl_ck_normal")
                    .addClass("zl_ck_down");
            }
            eleObj.unbind("click", obj_click(eleObj)).bind("click", function () {
                obj_click(eleObj);
                !!opts.afterEvent&&opts.afterEvent.call(this,$(this),$(this).closest(".zl_ck"));
            })

        })
        //��click�¼�
        function obj_click(eleObj) {
            var chbPanel=eleObj.closest(".zl_ck");
            if (eleObj.is(":checked")) {
                chbPanel.removeClass("zl_ck_normal");
                chbPanel.addClass("zl_ck_down");
            } else{
                chbPanel.removeClass("zl_ck_down");
                chbPanel.addClass("zl_ck_normal");
            }
        }
        //�ϲ�����
        function setOptions(options) {
            defaults = $.extend(defaults, options);
            return defaults;
        }

        //�õ���������
        function getOptions() {
            return defaults;
        }
        return checkbox_array;
    };
})(jQuery);
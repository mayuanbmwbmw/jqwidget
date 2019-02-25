/*!
 * zl_checkbox
 * ������ jquery.js
 */
(function ($) {
    var zl_checkbox=function(element, option){
        this.element=element;
        this.option=option;
    }
    zl_checkbox.prototype.setState=function(ele){
        var $elePanel=$(ele).closest(".zl_ck");
        $elePanel.removeClass("zl_checkbox_normal zl_checkbox_checked zl_checkbox_normal_disabled zl_checkbox_checked_disabled")
        if($(ele).is(":checked")&&$(ele).is(":disabled")){
            $elePanel.addClass("zl_checkbox_checked_disabled");
        }else if($(ele).is(":checked")&&!$(ele).is(":disabled")){
            $elePanel.addClass("zl_checkbox_checked");
        }else if(!$(ele).is(":checked")&&$(ele).is(":disabled")){
            $elePanel.addClass("zl_checkbox_normal_disabled");
        }else{
            $elePanel.addClass("zl_checkbox_normal");
        }
    }
    zl_checkbox.prototype.init=function(ele){
        var eleObj = $(ele),
            eleId=$(ele).attr("id"),//checkbox��ID
            forEle=eleObj.siblings("label[for="+eleId+"]").addClass("chb_label"),
            //��checkbox�ϵ�class��style��ֲ������ΧԪ����
            wrapEle=$("<span class='zl_ck zl_checkbox_normal'></span>")
                .addClass(eleObj.attr("class"))
                .attr("style",eleObj.attr("style"));
        //Ϊ�ռ�ȥ��class��style���ԣ����������span��ǩ
        eleObj
            .removeAttr("class style")
            .add(forEle)
            .wrapAll(wrapEle);
        //����checkbox button��ѡ��״̬������checkbox�����ѡ����ʽ��
        zl_checkbox.prototype.setState(eleObj);
        eleObj.bind("click", function () {
            zl_checkbox.prototype.setState(eleObj);
            //!!opts.afterEvent&&opts.afterEvent.call(this,$(this),$(this).closest(".zl_ck"));
        })
        //�����¼�
        eleObj.bind("changeState.zl_checkbox", function (e) {
            zl_checkbox.prototype.setState(this)
        })
    }
    $.fn.zl_checkbox = function (options) {
        var checkbox_array = $(this);
        checkbox_array.each(function (index, ele) {
            var temp_checkbox=new zl_checkbox(ele);
            temp_checkbox.init(ele);
            temp_checkbox.setState(ele);
            //�����¼�
            /*var changeDisabled = jQuery.Event( "changeDisabled.zl_checkbox",{
                ele:ele
            });
            //���¼��󶨵�Ԫ������
            $(ele).data("data-eventChangeDisabled",changeDisabled);
            temp_checkbox=null;*/
        })
        return checkbox_array;
    };
})(jQuery);

var weather = function () {
    var route = "weatherImg";
    this.getWeather = function (city) {
        $("#cityid")[0].innerHTML = city;
        var url = encodeURI("http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=" + city + "&dfc=1");
        fetch_js(url, show);
    }

    function fetch_js(url, dispose) {
        var Snode = document.createElement("script");
        Snode.setAttribute("type", "text/javascript");
        Snode[Snode.onreadystatechange === null ? "onreadystatechange" : "onload"] = function () {
            /*if (this.onreadystatechange) {
             if (this.readyState != "loaded") {
             return false;
             }
             };*/
            if (dispose) {
                dispose()
            }; //完成js加载后，这里调用显示查询结果显示在页面上
            this[this.onreadystatechange ? "onreadystatechange" : "onload"] = null;
        }
        Snode.setAttribute("charset", "gb2312"); //注意乱码问题
        Snode.setAttribute("src", url);
        document.getElementsByTagName("head")[0].appendChild(Snode);
    }

    function dis_img(weather) {//显示不同天气对应的图片
        //var route = "/Content/weatherImg"; //文件夹路径项目设置 var route = "@Url.Content("~/Content/weatherImg")";
        var style_img = route + "/hr_13.png";
        if (weather.indexOf("多云") !== -1 || weather.indexOf("晴") !== -1) {//多云转晴，以下类同 indexOf:包含字串
            style_img = route + "/hr_1.png";
        }
        else if (weather.indexOf("多云") !== -1 && weather.indexOf("阴") !== -1) {
            style_img = route + "/hr_2.png";
        }
        else if (weather.indexOf("阴") !== -1 && weather.indexOf("雨") !== -1) {
            style_img = route + "/hr_3.png";
        }
        else if (weather.indexOf("晴") !== -1 && weather.indexOf("雨") !== -1) {
            style_img = route + "/hr_12.png";
        }
        else if (weather.indexOf("晴") !== -1 && weather.indexOf("雾") !== -1) {
            style_img = route + "/hr_12.png";
        }
        else if (weather.indexOf("晴") !== -1) { style_img = route + "/hr_13.png"; }
        else if (weather.indexOf("多云") !== -1) { style_img = route + "/hr_2.png"; }
        else if (weather.indexOf("阵雨") !== -1) { style_img = route + "/hr_3.png"; }
        else if (weather.indexOf("小雨") !== -1) { style_img = route + "/hr_3.png"; }
        else if (weather.indexOf("中雨") !== -1) { style_img = route + "/hr_4.png"; }
        else if (weather.indexOf("大雨") !== -1) { style_img = route + "/hr_5.png"; }
        else if (weather.indexOf("暴雨") !== -1) { style_img = route + "/hr_5.png"; }
        else if (weather.indexOf("冰雹") !== -1) { style_img = route + "/hr_6.png"; }
        else if (weather.indexOf("雷阵雨") !== -1) { style_img = route + "/hr_7.png"; }
        else if (weather.indexOf("小雪") !== -1) { style_img = route + "/hr_8.png"; }
        else if (weather.indexOf("中雪") !== -1) { style_img = route + "/hr_9.png"; }
        else if (weather.indexOf("大雪") !== -1) { style_img = route + "/hr_10.png"; }
        else if (weather.indexOf("暴雪") !== -1) { style_img = route + "/hr_10.png"; }
        else if (weather.indexOf("扬沙") !== -1) { style_img = route + "/hr_11.png"; }
        else if (weather.indexOf("沙尘") !== -1) { style_img = route + "/hr_11.png"; }
        else if (weather.indexOf("雾") !== -1) { style_img = route + "/hr_12.png"; }
        else { style_img = route + "/hr_2.png"; }

        return style_img;
    }

    function show() {
        for (i in SWther.w) {
            var tianqi = SWther.w[i][0].s1;
            var tianqiImg = dis_img(tianqi);
            //alert(s1);
            var t1 = SWther.w[i][0].t1;
            var t2 = SWther.w[i][0].t2;
            var fl = SWther.w[i][0].d1;
            var fs = SWther.w[i][0].p1;
            var st1 = " 最高气温：" + t1 + "&deg;";
            var st2 = " 最低气温：" + t2 + "&deg; ";
            var s = fl + " " + fs + "级";
            $("#cityTQ")[0].innerHTML = tianqi;
            $('#cityTQIMG')[0].innerHTML = "<img class='weather_img' src='" + tianqiImg + "' title='" + tianqi + "' alt='" + tianqi + "' />";
            $("#cityTQInfo2")[0].innerHTML = st1;
            $("#cityTQInfo1")[0].innerHTML = st2;
            $("#cityTQInfo")[0].innerHTML = s;
        }
    }
}
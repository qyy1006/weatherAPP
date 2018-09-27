
//页面加载完成时
$(function(){


    //1.城市切换
    $(".main-Img-p1").click(function(){
        $(".historyPage").css({"left":0});
        $(".one").css({"display":"none"});
    });
    $(".historyPage p i").click(function(){
        $(".historyPage").css({"left":"7.5rem"});
        $(".one").css({"display":"block"});
    });
    //获取城市信息
    let city;
    let flag=false;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function (obj) {
            city=obj.data;
            // console.log(city);
            // updatacity(city);
        }
    });
    // function updatacity(city){
    //     for(let i in city){
    //         for(let j in city[i]){
    //
    //         }
    //     }
    // }

    //热门城市点击切换天气

    $(".hot-city ul li span").click(function () {
        $(".main-day ul li").css({"display":"none"});
        $(".comprehensive-bottom>ul li").css({"display":"none"});
        $(".comprehensive-top>ul li").css({"display":"none"});
        let city1=$(this).html();
        // console.log(city1);
        aj(city1);

        $(".historyPage").css({"left":"7.5rem"});
        $(".one").css({"display":"block"});
        let str01=`<li>
                    <span>${city1}</span>
                </li>`;
        $(".history ul").prepend(str01);
        $(".new ul li span").html(city1);
    });

    //热门景点点击切换天气

    $(".hot-scenicSpot ul li span").click(function () {
        $(".main-day ul li").css({"display":"none"});
        $(".comprehensive-bottom>ul li").css({"display":"none"});
        $(".comprehensive-top>ul li").css({"display":"none"});
        let city1=$(this).html();
        // console.log(city1);
        aj(city1);

        $(".historyPage").css({"left":"7.5rem"});
        $(".one").css({"display":"block"});
        let str01=`<li>
                    <span>${city1}</span>
                </li>`;
        $(".history ul").prepend(str01);
        $(".new ul li span").html(city1);
    });

    //2.获取当前城市的天气信息
    let tianqi;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=忻州",
        dataType:"jsonp",
        success:function (obj) {
            tianqi=obj.data;
            // console.log(tianqi);
            updata(tianqi);
        }
    });

    //3.搜索

    let city2;
    $(".history-t2 input").focus(function () {
        $(".history-t2 p").html("搜索");

    });

    $(".history-t2 p").click(function () {

        city2=$(".history-t2 input").val();

        for(let i in city){
            for(let j in city[i]){
                if(j==city2){
                    flag=true;
                    // break;
                }
            }
        }
        // console.log(flag);
        if(flag==true){
            flag=false;
            $(".main-day ul li").css({"display":"none"});
            $(".comprehensive-bottom>ul li").css({"display":"none"});
            $(".comprehensive-top>ul li").css({"display":"none"});

            aj(city2);

            $(".historyPage").css({"left":"7.5rem"});
            $(".one").css({"display":"block"});
            $(".history-t2 p").html("取消");
            // $(".history-t2 input").val("");
            let str01=`<li>
                    <span>${city2}</span>
                </li>`;
            $(".history ul").prepend(str01);
            $(".new ul li span").html(city2);
        }else if(flag==false){
            alert("输入有误");
        }

    });

    //4.点击图标，删除记录
    $(".history i").click(function () {
        $(".history ul li").css({"display":"none"});
    });

    //5.历史记录本地存储


    //封装1
    function aj(city){
        $.ajax({
            type:"get",
            url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+city+"",
            dataType:"jsonp",
            success:function (obj) {
                tianqi=obj.data;
                // console.log(tianqi);
                updata(tianqi);
            }
        });
    }

    //封装2
    function updata(tianqi){
        //获取当前的城市
        $(".main-Img-p1>span").html(tianqi.city);
        //获取当前城市的抬起状况
        $(".main-Img-p02").html(tianqi.weather.quality_level);
        //获取当前的温度
        $(".main-Img>span").html(tianqi.weather.current_temperature+"°");
        //获取当前的天气状况
        $(".main-Img-p2").html(tianqi.weather.current_condition);
        //获取当前 的风向
        $(".feng").html(tianqi.weather.wind_direction);
        //获取当前的风力
        $(".feng1").html(tianqi.weather.wind_level+"级");
        //今天的温度
        $(".today-wh").html(tianqi.weather.dat_high_temperature);
        $(".today-wl").html(tianqi.weather.dat_low_temperature);
        //明天的温度
        $(".tomorrow-wh").html(tianqi.weather.tomorrow_high_temperature);
        $(".tomorrow-wl").html(tianqi.weather.tomorrow_low_temperature);

        //未来24小时天气
        let hweather=tianqi.weather.hourly_forecast;
        hweather.forEach(function (v) {
            let str=`<li>
                    <p>${v.hour}:00</p>
                    <img src="./img/${v.weather_icon_id}.png" alt="">
                    <p>${v.temperature}°</p>
                </li>`;
            $(".main-day>ul").append(str);
        });

        //近期天气状况（6天）
        let hweather1=tianqi.weather.forecast_list;
        // console.log(hweather1);
        // hweather1.forEach(function (v) {
        //     if(hweather1.length<6){
        //         let str1=`<li>
        //                 <p>昨天</p>
        //                 <p>9/25</p>
        //                 <span>多云</span>
        //                 <img src="./img/2.png" alt="">
        //             </li>`;
        //         $(".comprehensive-top>ul").append(str1);
        //     }
        // });
        for(let i=0;i<6;i++){
            let str1=`<li>
                         <p>${hweather1[i].date.slice(5,10)}</p>
                         <span>${hweather1[i].condition}</span>
                         <img src="./img/${hweather1[i].weather_icon_id}.png" alt="">
                     </li>`;
            $(".comprehensive-top>ul").append(str1);
            let str2=`<li>
                        <img src="./img/${hweather1[i].weather_icon_id}.png" alt="">
                        <span>${hweather1[i].condition}</span>
                        <p>${hweather1[i].wind_direction}</p>
                        <p>${hweather1[i].wind_level}级</p>
                    </li>`;
            $(".comprehensive-bottom>ul").append(str2);
        }

    }


});



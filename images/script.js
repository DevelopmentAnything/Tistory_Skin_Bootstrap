/*

© Simulz. 2006-2024.
License: MIT License

! 라이선스 변경 금지, 수정, 복제, 배포 자유 !

*/
(function ($) {

    function common() {
        /**** 카테고리 ****/
        // New
        $('img[alt="N"]').each(function () {
            $(this).replaceWith('<span class="category-new badge badge-danger rounded-pill">N</span>');
        });
        $('.ttList-title a img').each(function () {
            $(this).replaceWith('<span class="article-new badge badge-danger">N</span>');
        });
        //$("ul.tt_category").addClass("list-group list-group-light");
        //$("ul.tt_category > li ").addClass("list-group-item d-flex align-items-center");

        // Count
        $("aside .c_cnt").each(function () {
            var str = $(this).text();
            str = str.replace("(", "");
            str = str.replace(")", "");
            $(this).text(str);
            if (str == "") {
                $(this).hide();
            }
            $(this).addClass('badge badge-danger rounded-pill');
        });
        /**** 본문 ****/
        // Tags
        $("#section-article .tags a").addClass("btn btn-outline-info btn-rounded btn-sm").attr("data-mdb-ripple-color","dark").attr("role","button");
        $("#section-article .tags").html(function(i,h){
            return h.replace(/, /g,'');
        });

        // $('aside .c_cnt').each(function () {
        //     var e = $(this).text();
        //     $(this).replaceWith('<span class="category-count position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger">'+ e + '</span>');
        // });

        // 방문자 그래프 (플러그인)
        $("#chartdiv").parent("div.module_plugin").wrap("<section class='count-graph'></section>").parent().prepend("<h3>방문자 그래프</h3>");
        
        // 불필요한 코드 정리
        $("*[data-ad-client*='ca-pub-9527582522912841']").remove();
        $("*[src*='ca-pub-9527582522912841']").remove();
        $("*[data-ad-unit*='DAN-nRFiQiN4avFYIKbk']").remove();
        $("*[src*='t1.daumcdn.net/kas/static/ba.min.js']").remove();
        $(".kakao_ad_area").remove();

        // PrognRoll
        $(".prognroll-bar").addClass("progress progress-bar-striped progress-bar-animated ");
        //$(".content").prognroll({ custom: true });

        // 헤더 숨김
        let lastScrollTop = 0;
        const delta = 100;
        $(window).scroll(function(){
            const st = $(this).scrollTop();
            if(Math.abs(lastScrollTop - st) <= delta) return;
            if((st > lastScrollTop) && (lastScrollTop > 0)) {
                $('#header').addClass('header-up');
            }else {
                $('#header').removeClass('header-up');
            };
            lastScrollTop = st;
        });

        // 로딩 중 시작
        $(window).on('load', function () {
            $("#loading").hide();
        });

        // 광고를 본문 내로 이동. 우선 실행.
        //things = $(".contents_style > p");
        //2023-11-07 disabled, 11-08 enabled
        //$(things[Math.floor(Math.random()*things.length)]).before($("#ad-inarticle"));
        //$("#ad-inarticle").show();

        // 목차 삽입
        const table = '<div id="toc"><p>목차</p><ul></ul></div>';
        if ($(".entry-content #toc").length == 0) {
            if ($(".contents_style h2").length >= 1 || $(".contents_style h3").length >= 1 || $(".contents_style h4").length >= 1) {
                $('.entry-content').prepend(table + "<br/>"); // before, after, prepend, append
                $(".isset-toc").show();
            }
        }
        // 목차 정의
        $("#toc > ul").toc({
            content: "article .contents_style",
            headings: "h2,h3,h4",
            top: -90,
            isBlink: true,
            blinkColor: '#21B9DE',
            scrollSpeed: 500
        })
        // 제목 클릭 시 목차로 이동
        $(".contents_style h2, .contents_style h3, .contents_style h4").click(function () {
            $('html, body').animate({
                scrollTop: $("#toc").offset().top -100
            }, 100);
        }).css('cursor', 'pointer');

        // 문단 공백 제거 클래스 제거
        $(".entry-content div").removeClass("tt_article_useless_p_margin");

        // 주석 제거
        $('*').contents().each(function () {
            if (this.nodeType === Node.COMMENT_NODE) {
                $(this).remove();
            }
        });

        // TOP 버튼
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#float-sideTool').fadeIn();
            } else {
                $('#float-sideTool').fadeOut();
            }
        });

        // 알츠하이머
        copyWithSource = function (event) {
            return;
        }
        copyWithSource2 = function (event) {
            event.clipboardData.setData('text/plain', '');
            event.clipboardData.setData('text/html', '');
            event.preventDefault();
        }
        document.removeEventListener('copy', copyWithSource);
        document.addEventListener('copy', copyWithSource2);

        $(".contents_style").find("p, table, ul, ol, img").addClass("user-select-none");

        /*
        // 모바일 슬라이드 버튼
        $(".btn-submenu-toggle").click(function () {
            $(".menu").stop().slideToggle(400, function () {
                if ($(".menu").css('display') == 'none') {
                    $("#topEmpty").css('height', 0);
                } else {
                    $("#topEmpty").css('height', ($("#topEmpty").height() + $(".menu").eq(0).height()));
                }
            });
        });
        */

        if (window.T && window.T.config.USER.name) {
            $("#menu-admin").find(".login").removeClass('d-inline').addClass('d-none');
            $("#menu-admin").find(".logout").removeClass('d-none').addClass('d-inline');
        } else {
            $("#menu-admin").find(".login").removeClass('d-none').addClass('d-inline');
            $("#menu-admin").find(".logout").removeClass('d-inline').addClass('d-none');
        }

        $("#menu-admin").on("click", ".login", function () {
            document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
        });
        $("#menu-admin").on("click", ".logout", function () {
            document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
        });

        // Image Lazy
        // $('.imageblock img, .imagegridblock img').Lazy({
        //     attribute: "srcset",
        //     //retinaAttribute: "data-density",
        //     //removeAttribute: true,
        //     scrollDirection: 'vertical',
        //     thresold : 0,
        //     effect: 'fadeIn',
        //     effectTime: 100,
        //     delay: 500,
        //     placeholder : 'https://tistory2.daumcdn.net/tistory/6727682/skin/images/loading.gif',
        //     visibleOnly: true,
        //     onError: function(element) {
        //         console.log('로딩 오류: ' + element.data('src'));
        //     }
        // });
        $('.imageblock img, .imagegridblock img').lazyload();

    }

    function commentControl() {
        $(document).on("click", ".comments .comment-list ul li .author-meta .control button", function () {
            // siblings. 그것을 제외한 나머지 형제 요소
            if ($(this).siblings(".link").is(":hidden")) {
                $(".comments .link").removeAttr("style");
                $(this).siblings(".link").show();
            } else {
                $(this).siblings(".link").hide();
            }
        });

        $(document).on("keyup", function (e) {
            if (e.keyCode == '27') {
                $(".comment-list ul li .author-meta .control .link").removeAttr("style");
            }
        });
    }

    // Debug
    function devToolgetGeoIPJsonp() {
        $.ajax({
            url: 'https://simulz.kr/dev/geoip/api.php?service=geoip&format=jsonp&callback=?',
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "devToolprocAlert"
        });
    }

    // Event-Debug
    !function () {
        function detectDevTool(allow) {
            if (isNaN(+allow)) allow = 100;
            var start = +new Date();
            debugger;
            var end = +new Date();
            if (isNaN(start) || isNaN(end) || end - start > allow) {
                devToolgetGeoIPJsonp();
            }
        }
        if (window.attachEvent) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                detectDevTool();
                window.attachEvent('onresize', detectDevTool);
                window.attachEvent('onmousemove', detectDevTool);
                window.attachEvent('onfocus', detectDevTool);
                window.attachEvent('onblur', detectDevTool);
            } else {
                setTimeout(argument.callee, 0);
            }
        } else {
            window.addEventListener('load', detectDevTool);
            window.addEventListener('resize', detectDevTool);
            window.addEventListener('mousemove', detectDevTool);
            window.addEventListener('focus', detectDevTool);
            window.addEventListener('blur', detectDevTool);
        }
    }();

    // Execute
    common();
    //commentControl();

})(jQuery);

function devToolprocAlert(data) {
    alert(
        '개발자도구 감지!'
        + '\n당신의 IP와 위치 정보입니다.'
        + '\nIP: ' + data.ip
        + '\nISP: ' + data.isp
        + '\n국가: ' + data.country_name
        + '\n도: ' + data.region_name
        + '\n시: ' + data.city
        + '\n좌표: ' + data.latitude + ', ' + data.longitude
        + '\n접속시각: ' + data.timestamp
        + '\n위 정보는 사실과 다를 수 있으며, 증거 자료로 활용될 수 있습니다.'
        + '\n동의하지 않을 경우, 즉시 접속을 종료하고 재접속을 금지하시기 바랍니다.'
    );
    window.location.href = "/";
}
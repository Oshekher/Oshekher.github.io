/* ----

# KStart
# By: Dreamer-Paul
# Last Update: 2020.6.6

一个简洁不失细节的起始页

本代码为奇趣保罗原创，并遵守 MIT 开源协议。欢迎访问我的博客：https://paugram.com

---- */

var obj = {
    main: {
        select: ks.select(".search-select"),
        search: ks.select(".search-selector"),
        input: ks.select(".input-box input"),
        submit: ks.select(".input-box .btn"),
    }
}

var data = {
    ver: "1.0.0",
    timer: "",
    window: 0,
    search_method: [
        {
            "name": "Bing",
            "icon": "bing",
            "url": "https://bing.com/search?q=%s"
        },
        {
            "name": "Google",
            "icon": "google",
            "url": "https://www.google.com/search?q=%s"
        },
        {
            "name": "DuckDuckGo",
            "icon": "duckduckgo",
            "url": "https://duckduckgo.com/?q=%s"
        }
    ],
    user: {
        search: 0,
        background: 0,
        sites: [],
        custom: []
    }
}


var methods = {
    get: function (webData) {
        var readData = JSON.parse(localStorage.getItem("paul-navi")) || webData;

        for(var item in readData){
            data.user[item] = readData[item];
        }
    },
    set: function () {
        if(data.sites){
            var sites = [];
            for(var site of data.sites){
                if(site.selected) sites.push(site.value);
            }
        }

    getUser: function () {
        var name = location.search.split("u=");

        return name ? name[1] : false;
    },
    changeSearch: function (key) {
        obj.main.search.classList.remove("active");
        data.user.search = key;
        if(data.search_method[key].icon) obj.main.select.innerHTML = `<i class="iconfont icon-${data.search_method[key].icon}"></i>`;
    },
    createItem: function (item) {
        var content = item.icon ? '<i class="' + item.icon + '"></i>' : item.name.substr(0, 1);

        return ks.create("a", {
            html: `<a class="item" href="${item.url}" target="_blank">
            <figure class="navi-icon" style="background: #${item.color || Math.random().toString(16).substr(-6)}">
                ${content}
            </figure>
            <p class="navi-title">${item.name}</p>
        </a>`
        });
    },
  
    setSetting: function () {
        var set = data.user;

        for(item in set){
            if(!obj.settings[item]) return;

            let type, i = item;

            switch(obj.settings[item].type){
                case "text": type = "value"; break;
                case "checkbox": type = "checked"; break;
                case "select-one": type = "value"; break;
                case "select-multiple": type = "options"; break;
            }

// 搜索
obj.main.select.onclick = function () {
    obj.main.search.classList.toggle("active");
}
obj.main.submit.onclick = (e) => {
    e.preventDefault();
    window.open(data.search_method[data.user.search].url.replace("%s", obj.main.input.value));
}

// 初始化
fetch("site.json").then(res => res.json()).then((res) => {
    data.sites = res;
}).then(() => {
    var url = "https://dreamer-paul.github.io/KStart-Sites/" + (methods.getUser() ? methods.getUser() : "default") + ".json";

    fetch(url).then(res => res.json()).then(json => {
        // 读取在线、本地或默认数据
        methods.get(json);

        // 用户自定义站点
        if(json.custom){
            json.custom.forEach((item) => {
                obj.main.sites.appendChild(methods.createItem(item));
            });
        }

        // 如果
        if(data.user.sites.length){
            data.user.sites.forEach((item) => {
                obj.main.sites.appendChild(methods.createItem(data.sites[item]));
            });
        }
        else{
            console.error("这个一般不会触发吧？");
        }
    }).then(() => {
        methods.changeSearch(data.user.search);

        if(data.user.background){
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = data.back_method[data.user.background].url;
            
            img.onload = function (ev) {
                obj.main.bg.style.background = "url(" + img.src + ") " + data.back_method[data.user.background].set;
                obj.main.bg.classList.add("active");

                var one = document.createElement("canvas");

                var context = one.getContext("2d");
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1, 1);

                var imgData = context.getImageData(0, 0, 1, 1).data;

                if(imgData[0] <= 180 || imgData[1] <= 180 | imgData[2] <= 180){
                    document.body.classList.add("dark");
                }
            }
        }

        methods.setSetting();
    })
});

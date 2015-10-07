(function(){
    
    var html = '';
    var items = util.$("list_item");
    var list_count = 0;
    console.log('this is length:'+localStorage.length);
    console.log('this is count:'+localStorage.count);
    var key_name=[];
    
    for(key in localStorage){
        if(localStorage.hasOwnProperty(key) && key!=="length" && key!=="count"){
            key_name.push(key);
            var obj = util.readData(key);
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+1;
            var date = now.getDate();
            var save_date = date+ '/' +month+'/'+year;
            var key2 = key.replace(/\d*/g, "");
            var colorClass = key2 == 'income'? "earn" : "cost" ;
            var symbol =  key2 == 'income'? '+':'-';
            html += '<div class="list_wrap"><div id="date_wrap'+list_count+'" class="date_wrap"><div class="date">'+save_date+'</div></div><div id="list_con'+list_count+'" class="list_con"><div class="list_img"><span class="icon-'+key2+'"></span></div>'
                 + '<div class="list_num '+ colorClass +'">' + symbol + obj.money + '</div>'
                 + '<div class="list_msg">'+ obj.msg +'</div>'
                 +'<div id="list_next'+list_count+'" class="list_next"><span class="icon-next"></span></div></div>'
                 +'<span id="list_edit'+list_count+'" class="list_change icon-edit"></span><span id="list_delete'+list_count+'" class="list_change icon-delete"></span></div>';
            list_count++;
        }
    }
    items.innerHTML = html;
    
    if(items.innerHTML==''){
        clearAll();
    }
    //清除localStorage数据，复原起始状态
    function clearAll(){
        localStorage.clear();
        html = '';
        html += '<div class="notext"><p>目前还木有账单呢！快来记一笔吧！</p><div><a href="add.html" class="btn-add">记一笔</a></div></div>'
        items.innerHTML = html;
    }
    
    var list_con=[],
        list_delete=[],
        list_edit=[];
    for(var m=0;m<list_count;m++){
        list_con[m] = util.$("list_con"+m);
        list_delete[m] = util.$("list_delete"+m);
        list_edit[m] = util.$("list_edit"+m);
        
<<<<<<< HEAD
        //滑动效果
=======
        //滑动
>>>>>>> 5597694164eb32decc9f5033e42cfeca54b5bf64
        (function(m){
            //向左滑动
            $("#list_con"+m).swipeLeft(function(){
                this.className = 'list_con translate_in';
                list_edit[m].className += ' change_in';
                list_delete[m].className += ' change_in';
                //按下其他地方，滑动效果复原
                /*
                util.addEvent(document,'touchstart',function(){
                    //list_con[m].className = list_con[m].className.replace(' translate_in','');
                    //list_con[m].style.overflow ='hidden';
                    list_con[m].className = 'list_con';
                    list_edit[m].className = 'list_change icon-edit';
                    list_delete[m].className = 'list_change icon-delete';
                });
                */
            });
            //向右滑动
            $("#list_con"+m).swipeRight(function(){
                list_con[m].className = 'list_con';
                list_edit[m].className = 'list_change icon-edit';
                list_delete[m].className = 'list_change icon-delete';
            });
        })(m);
        //按下“向左按钮”实现滑动效果
        (function(m){
            $("#list_next"+m).tap(function(){
                if(this.parentNode.className.indexOf('translate_in')!=-1){
                    list_con[m].className = 'list_con';
                    list_edit[m].className = 'list_change icon-edit';
                    list_delete[m].className = 'list_change icon-delete';
                }else{
                    this.parentNode.className = 'list_con translate_in';
                    list_edit[m].className += ' change_in';
                    list_delete[m].className += ' change_in';
                }
            });
        })(m);
        
        //监听按下删除事件，绑定删除该条记录函数
        (function(m){
            //util.addEvent(list_delete[m],'touchstart',function(event){
            $('#list_delete'+m).tap(function(){
                event=util.getEvent(event);
                util.preventEvent(event);
                util.stopEvent(event);
                var target = util.getTarget(event);
                //获取list_wrap节点
                target=target.parentNode;
                var keyname = key_name[m];
                localStorage.removeItem(keyname);
                console.log(target);
                target.innerHTML="";
                items.removeChild(target);
                if(items.innerHTML==''){
                    clearAll();
                }
            });
        })(m);
        
        //监听按下编辑事件，绑定编辑该条记录的函数
        (function(m){
            $('#list_edit'+m).tap(function(){
            //util.addEvent(list_edit[m],'touchstart',function(event){
                event=util.getEvent(event);
                util.preventEvent(event);
                var keyname = key_name[m];
                url = 'edit.html?keyname='+keyname;
                window.location.href=url;
            });
        })(m);
    
    }
    
    //顶部状态栏
    var header_menu = util.$('header_menu');
    var menu = util.$('header').getElementsByTagName('ul')[0];
    var menu_items = menu.getElementsByTagName('li');
    $('#header_menu').tap(function(){
        if(this.className.indexOf('icon-menudown')!=-1){
            this.className = 'icon-menuup';
            menu.className += ' menu-down';
            //延时处理CSS3过渡特性，解决与display:block的问题
            setTimeout(function(){
                 menu.className += ' menu-transition';
            },50);
        }else {
            menu.className = 'menu menu-down menu-up';
            //延时处理CSS3过渡特性，解决与display:block的问题
            setTimeout(function(){
                header_menu.className = 'icon-menudown';
                menu.className = 'menu';
            },500);
        }
    });
    
})();

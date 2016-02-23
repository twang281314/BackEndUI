var ErpHome = function() {	
	var $htlTemplate = null;
	var mySystemAuthorityList = null;//个人系统清单
	var authCodeCustom = "AUTH_CUSTOM_PROVIDER_CUSTOM_MANAGE";
	var authCodeProvider = "AUTH_CUSTOM_PROVIDER_PROVIDER_MANAGE";
	var contextPath = $("meta[name=contextPath]").attr("content");
	
	var loadCustomGroup = function(){		
		if(mySystemAuthorityList&&mySystemAuthorityList.contains(authCodeCustom)){
			var name = $("#searchMyCustomProvider").parent().prev().val();
			$.get(encodeURI($.getContextPath()+"/admin/group/findCustomByGroup.do?name=" + name), function(result
){
				$("#normal-tabs-ls-custom  div.erp-accordion").html(result);	
				determineAuth();
			});	
		}else {
			$("#cus_prov_tabs li:eq(0)").hide();
			$("#cus_prov_tabs li:eq(1)").click().addClass("col-xs-10 ui-tabs-active");
			
			$("#cus_prov_tabs li .ui-tabs-anchor").addClass("text-left pad10L" );
			$("#cus_operate_1").show();
			$("#normal-tabs-ls-provider").show();
			$("#normal-tabs-ls-custom").hide();
			
		}
	}	
	var loadProviderGroup = function(){		
		if(mySystemAuthorityList&&mySystemAuthorityList.contains(authCodeProvider)){
			var name = $("#searchMyCustomProvider").parent().prev().val();
			$.get(encodeURI($.getContextPath()+"/admin/group/findProviderByGroup.do?name="+ name), function(result
){
				$("#normal-tabs-ls-provider div.erp-accordion").html(result);	
				determineAuth();
			});	
		}else {
			
			$("#cus_prov_tabs li:eq(1)").hide();
			$("#cus_prov_tabs li:eq(0)").addClass("col-xs-10");
			$("#cus_prov_tabs li .ui-tabs-anchor").addClass("text-left pad10L" );
		}
	}	
	var groupDisplay=function(){
		//都不含有供应商和客户的权限时，隐藏客户和供应商区域，同事区域高度增加
		if(mySystemAuthorityList&&mySystemAuthorityList.contains(authCodeCustom)==false&&mySystemAuthorityList
.contains(authCodeProvider)==false){
			$("#home_left_custom_provider_list").hide();
			$("#company_staff_list").css("height","800px");
			$("#company_staff_list").find(".slimScrollDiv").css("height","700px");
			$("#company_staff_list").find(".erpScrollDiv").css("height","700px");
		}
	}
		
	
	//对ng-view添加样式
	var viewItem = "erp-view-item";
	var $customProviderTab = null;
	var initTab = function() {		
		$customProviderTab = $("#cus_prov_tabs").tabs({
			activate: function( event, ui ) {				
				var curIndex = ui.newTab.index();
				$("#cus_prov_tabs div[id^=cus_operate_]").hide();
				$("#cus_operate_"+curIndex).show();
			}
		});
		//分组的单击	
		$('#normal-tabs-ls-custom div.erp-accordion').on("click","h3", function() {
			var con = $(this).next();
			if (con.is(":hidden")) {
				//关闭其它打开节点
				$(this).siblings().each(function(index,item){
					if($(item).next().is(":visible")==true){
						$(item).trigger("click");
					}
				});
				$(con).show();
				$(this).find(".left-icondown").addClass("icon-caret-down").removeClass("icon-caret-right");		
				$("img:not([src])", con).each(function(index,item){
					if(!$(item).attr("src")){
						$(item).attr("src",$(item).attr("img-src"));
					}
				});
			}else{
				$(con).removeClass("show").hide();
				$(this).find(".left-icondown").addClass("icon-caret-right").removeClass("icon-caret-down");
			}
		});
		$('#normal-tabs-ls-provider div.erp-accordion').on("click","h3", function() {	
			var con = $(this).next();	
			if (con.is(":hidden")) {
				//关闭其它打开节点
				$(this).siblings().each(function(index,item){
					if($(item).next().is(":visible")==true){
						$(item).trigger("click");
					}
				});
				$(con).show();
				$(this).find(".left-icondown").addClass("icon-caret-down").removeClass("icon-caret-right");	
				$("img:not([src])", con).each(function(index,item){
					if(!$(item).attr("src")){
						$(item).attr("src",$(item).attr("img-src"));
					}
				});
			}else{
				$(con).removeClass("show").hide();
				$(this).find(".left-icondown").addClass("icon-caret-right").removeClass("icon-caret-down");
			}
		});
				
		//tab标题的点击
		$(".header-nav-center").on("click",".header-navlist .tab-item a",function(){		
			var href = $(this).attr("html-path");
			
			if($("[load-status='loading']").length>0){
				 return;
			 }
			var $self = $(this);
			openInitHitDialog(href);
			//打开链接
			var oldPage = $("div."+viewItem+"[html-path='"+href+"']");
			if(oldPage.length>0){		
				selectMenuNavItem(href);
				$("div."+viewItem+"[html-path]").removeClass("show").addClass("hide");
				$("div[ng-view]").removeClass("show").addClass("hide");
				$("div."+viewItem+"[html-path='"+href+"']").removeClass("hide").addClass("show");
				var pageInfo = $.erp.pageRegister(href);						
				if(pageInfo && pageInfo.refresh == true && pageInfo.mngObj){
					pageInfo.mngObj.reload();
					$.erp.pageRefresh(href,false);
				}else{
					adjustDataTable();
				}			
				$.erp.enClickQueue(href);
				return;
			}
			
			//检查session会话
			$.ajax({
				url : $.getContextPath() + "/os/heartbeat.do",
				dataType:"json",
				async:false,
				success:function(data){
					var isAlive = data.isAlive;
					if(isAlive==false) return;
															
					//如果点击的是客户管理或供应商管理，则切换			
					if(href.indexOf("/custom/")>=0){
						switchCpTab(0);
					}
					if(href.indexOf("/provider/")>=0){
						switchCpTab(1);
					}
										
					$("div[ng-view]").removeClass("show").addClass("hide");	
					
					$.erp.enClickQueue(href);
					selectMenuNavItem(href);
					//打开链接
					createPanel(href);	
					//显示提示
					showProviderHits(href);
					showCustomHits(href);	
					
				}
			});						
		});
		
		//tab标题的关闭
		$(".header-nav-center").on("click",".header-navlist .tab-item i.icon-remove",function(){
			 var htmlPath = $(this).parent().find("a").attr("html-path");
			 closeTab(htmlPath);
		});
		
		//tab页面的关闭,全局
		$("body").on("click",".tab-view-curent-close",function(){
			var $curView = $(this).closest("div.erp-view-item");
			var htmlPath = $curView.attr("html-path");
			closeTab(htmlPath);
		});
						
		//tab标题的刷新
		$(".header-nav-center").on("click",".header-navlist .tab-item i.icon-refresh",function(){
			 var id = $(this).parent().find("a").attr("menuid");   
			 if($("[load-status='loading']").length>0){
				 return;
			 }
			 var $self = $(this);
			//检查session会话
			$.ajax({
				url : $.getContextPath() + "/os/heartbeat.do",
				dataType : "json",
				async:false,
				success:function(data){
					var isAlive = data.isAlive;
					if(isAlive==false) return;
					
					 $("div[ng-view]").parent().find("div[menuid='"+id+"']").remove();
				     $("div[ng-view]").removeClass("show").addClass("hide");
				     		    
				     $(".header-nav-center div.tab-item[menuid]").removeClass("nav-title-check").addClass("nav-title"
);
				     $self.parent().parent().removeClass("nav-title").addClass("nav-title-check");
				     var href = $self.parent().find("a").attr("html-path");
				     				    
					 createPanel(href,id);
					 openInitHitDialog(href);
				}
			});
		});
		
		$(".header-nav-center .tab-item-home").click(function(){
			$("div[ng-view]").parent().find("div[menuid]").removeClass("show").addClass("hide");
		    $("div[ng-view]").removeClass("hide").addClass("show");
		    
		    $(".header-nav-center div.tab-item[menuid]").removeClass("nav-title-check").addClass("nav-title"
);
			$(this).closest(".tab-item").removeClass("nav-title").addClass("nav-title-check");
		});
	}
	
	var closeTab = function(htmlPath){
		var $nav = $("#header_menu_nav_btnBars .header-navlist-fls div.tab-item[html-path='"+htmlPath+"']"
);
		
		if($nav.length==0){
			return;
		}
		$.erp.pageRemove(htmlPath);
		var $view = $("div.erp-view-item[html-path='"+htmlPath+"']");
		
		var $preView = null, $preNav = null;
		if($nav.hasClass("nav-title-check")){
			var prevNavPath = $.erp.deClickQueue();//上次点击
			while(prevNavPath&&prevNavPath==htmlPath){
				prevNavPath = $.erp.deClickQueue();//上次点击
			}
			if(!prevNavPath){
				$preNav = $nav.prev();
			} else {
				$preNav = $("#header_menu_nav_btnBars .header-navlist-fls div.tab-item[html-path='"+prevNavPath+"'
]");
			}
			
			var ppath = $preNav.attr("html-path");
			if(ppath&&ppath.length>0){					
				$("a",$preNav).trigger("click");
			}else{
				 $(".header-nav-center div.tab-item[menuid]").removeClass("nav-title-check").addClass("nav-title"
);
		    	 $(".header-nav-center div.tab-item[menuid='home']").removeClass("nav-title").addClass("nav-title-check"
);	
		    	 $("#page-content .index-rightscroll").removeClass("hide").addClass("show");
			}
		}	
	
		$nav.remove();
		$view.remove();
		
		erpnavifLR();//Nav左右箭头判断
	}
	
	var switchCpTab = function(index){
		$customProviderTab.tabs( "option", "active", index );
	}
	var createPanel = function(url,menuid,height){	
		menuid = url.split("?")[0];
		var $view = $("<div class='"+viewItem+" show' menuid='"+menuid+"' html-path='"+url+"'></div>");
		$.ajax({
			url:$.getContextPath()+url+"?v="+$("#version").val(),
			dataType:"text",
			async:false,
			//cache:true,
			success:function(data){
				var $data = $(data);
				$data.find('.selectpicker').selectpicker()
				$view.html($data);
				$view.find("div[ng-cloak]").removeAttr("ng-cloak");
				
				$("div."+viewItem).removeClass("show").addClass("hide");	
				$("div[ng-view]").parent().append($view);			
			  
			},
			error:function(){					
				closeTab(url);
			}
		});		
	}
	
	var addMenuItem2Nav = function(id,tname,href){		
		id = href.split("?")[0];
		clearMenuItemSelected();		
		 var music ="<div class='nav-title-check show1 tab-item' menuid='"+id+"' html-path='"+href+"'>" 
        	+"<span><a menuid='"+id+"' href='javascript:void(0);' html-path='"+href+"'>"+tname+"</a><i class
='glyph-icon icon-refresh font-size-12 mrg5L'></i><i class='glyph-icon icon-remove mrg5L'></i></span
>" 
         	+"</div>";
          $('#header_menu_nav_btnBars .header-navlist-fls').append(music);  
        erpnavifLR();//Nav左右箭头判断
	}
	
	var selectMenuNavItem = function(htmlPath){
		clearMenuItemSelected();		
		$("#header_menu_nav_list .header-navlist div.tab-item[html-path='"+htmlPath+"']").removeClass("nav-title"
).addClass("nav-title-check");		
	}
	
	var clearMenuItemSelected = function(){
		$("#header_menu_nav_list .header-navlist div.tab-item.nav-title-check").removeClass("nav-title-check"
).addClass("nav-title");
	}
				
	//对话框
	var $dialog = null;	
	var openDialog = function(config){
		var href = config.url;
    	var mtitle = config.title;
    	var mwidth = config.width;
    	var mheight = config.height;
    	var buttons = config.buttons;
    	if(!config.buttons){
    		buttons = [];
    	}
    	if(!mwidth){
    		mwidth = 800;
    	}
    	if(!mheight){
    		mheight = 600;
    	}
    	var $dialogObj = null;
    	$.ajax({
    		url:href,
    		cache:false,
    		async:false,
    		success:function(html){
	    		var $fhtml = $("<div title='"+mtitle+"' html-path='"+href+"'>"+html+"</div>");
	    		$fhtml.find("div[ng-cloak]").removeAttr("ng-cloak");
	            $dialogObj = $fhtml.dialog({
	                resizable: true,
	                width: mwidth,
	                height: mheight,
	                modal: true,
	                show: "fadeIn",
	                close : function(){
	                	$(this).remove(); 
	                },
	                buttons: buttons
	            });               
	            $('.ui-widget-overlay').addClass('bg-black opacity-30'); 
	        }
    	});
    	return $dialogObj;
	}
	
	//对话框
	var $dialog = null;	
	var openLocalDialog = function($container,config){
    	var mtitle = config.title;
    	var mwidth = config.width;
    	var mheight = config.height;
    	var buttons = config.buttons;
    	if(!config.buttons){
    		buttons = [];
    	}
    	if(!mwidth){
    		mwidth = 800;
    	}
    	if(!mheight){
    		mheight = 600;
    	}
    	var $dialogObj = null;
    	
    	var $fhtml = $("<div title='"+mtitle+"' ></div>");
    	$fhtml.html($container);
		$fhtml.find("div[ng-cloak]").removeAttr("ng-cloak");
        $dialogObj = $fhtml.dialog({
            resizable: true,
            width: mwidth,
            height: mheight,
            modal: true,
            show: "fadeIn",
            close : function(){
            	$(this).remove(); 
            },
            buttons: buttons
        });               
        $('.ui-widget-overlay').addClass('bg-black opacity-30'); 
    	
    	return $dialogObj;
	}
	
	var destroyDialog = function(q){
		if($dialog){
			$dialog.dialog('close');
		}
	}
	
	var closeDialog = function(q){
		if($dialog){
			$dialog.dialog('close');
		}
	}
	
	var getDialog = function(){
		return $dialog;
	}
	
	var countUnRead = function(){
		$.getJSON(contextPath + "/admin/message/countUnRead.do", function(json) {
			var count = parseInt(json);
			if(count==0){
				$(".msg-unread-count").hide();
			}else{
				$(".msg-unread-count").show();
				$(".msg-unread-count").text(json);
			}
		});
	}
		            
    var initPage = function(){
    	$('#company_staff_list').on("click",".erp-accordion h3", function() {
    		var con = $(this).next();
			if (con.is(":hidden")) {
				$(this).siblings("div").slideUp();
				$(this).siblings("h3").find(".left-icondown").addClass("icon-caret-right").removeClass("icon-caret-down"
);
				$(con).slideDown();
				$(this).find(".left-icondown").addClass("icon-caret-down").removeClass("icon-caret-right");
				var loaded = $(con).attr("loaded");
				if(!loaded){
					
				}
			}else{
				con.slideUp();
				$(this).find(".left-icondown").addClass("icon-caret-right").removeClass("icon-caret-down");
			}
		});
    	
    
		//菜单面板的打开OR关闭
    	var myerpDiv = $(".menu-list");
		$(".click-chu").click(function (event) {
			myerpDiv.fadeIn();
			$("body").on("click", function () {
				$(myerpDiv).fadeOut();
			});
			event.stopPropagation();
		});
		$(myerpDiv).on("click","i.icon-thumb-tack",function (event) {
			event.stopPropagation();
		});
        
		//改进版展开Or关闭,可复用
		var $myerpdropdown = $(".dropdownjdq");
		$(".click-dropdown").click(function (event) {
			$(this).next().fadeIn();
			$("body").on("click", function () {
				$myerpdropdown.fadeOut();
			});
			event.stopPropagation();
		});
		$myerpdropdown.on("click","div.tp3",function (event) {
			event.stopPropagation();
		});
		
		//初始化向导开关效果
		$(".peg-right .tp3").click(function(){
			var $cond = $(this).next("div");
			if ($cond.is(":hidden")) {
				$cond.slideDown("slow");
				$(this).find("i.header-rtpeg-click").addClass("icon-chevron-down").removeClass("icon-chevron-up"
);
			}else{
				$cond.slideUp("slow");
				$(this).find("i.header-rtpeg-click").addClass("icon-chevron-up").removeClass("icon-chevron-down"
);
			};
		});
		
        //加载已固定
        $.getJSON($.getContextPath()+"/admin/profile/findProfileMenu.do",function(json){
        	$.each(json,function(index,item){
        		var $menui = $("#header-menu-list span.menu-item i[menuid="+item.menuId+"]");
        		$menui.attr("fixed","fixed");
        		$menui.removeClass("hide").addClass("show");
        		
        		var id = $menui.prev("a").attr("menuid");
    			var name = $menui.prev("a").text();
    			var href = $menui.prev("a").attr("html-path");	
    			
    			addMenuItem2Nav(id,name,href);    			    			
        	});  
        	erpnavifLR();
        	$(".header-nav-center div.tab-item").removeClass("nav-title-check").addClass("nav-title");

        	$(".header-nav-center div.tab-item[menuid='home']").removeClass("nav-title").addClass("nav-title-check"
);	
	    	$("#page-content .index-rightscroll").removeClass("hide").addClass("show");
        });
		//菜单项固定
		$("#header-menu-list span.menu-item i").on("click",function(){
			
			var id = $(this).prev("a").attr("menuid");
			var fixed = $(this).attr("fixed");
			var name = $(this).prev("a").text();
			var href = $(this).prev("a").attr("html-path");	
			var $fi = $(this);
			if(fixed!=undefined&&fixed!=null&&fixed!=""){
				$.post($.getContextPath()+"/admin/profile/deleteProfileMenu.do",$.param({menuIds:[id]},true),function
(json){
					if(json.type=='success'){
						$fi.removeAttr("fixed");
						$fi.removeClass("show").addClass("hide");
					}				
				},"json");
				return;
			}
			
			var flag=exitMenuId(id,href);
			if(!flag)
				addMenuItem2Nav(id,name,href);
			$(this).removeClass("hide").addClass("show");
			//保存
			var menu = {};
			menu.menuId = id;
			$(".header-navlist .tab-item").each(function(index,item){
				var tmid = $(item).attr("menuid");
				if(tmid==id){
					menu.orderNum = index;
				}
			});
			
			$.post($.getContextPath()+"/admin/profile/saveProfileMenu.do",menu,function(json){				
				if(json.type=='success'){					
					$fi.attr("fixed","fixed");
				}				
			},"json");
			
		});
						
		//菜单项单击
		$("body").on("click","a.menu-item-link",function(event){
			if($("[load-status='loading']").length>0){
				 return;
			 }
			if($(this).hasClass("no-stop-propagate")){
				
			}else{
				event.stopPropagation();
			}
			
			$(".menu-list").hide();	
						
			var $self = $(this);
			//检查session会话
			$.ajax({
				url : $.getContextPath() + "/os/heartbeat.do",
				dataType:"json",
				async:false,
				success:function(data){
					var isAlive = data.isAlive;
					if(isAlive==false) return;
					
					var id = $self.attr("menuid");	
					var href = $self.attr("html-path");
					var name = $self.attr("tab-title");
					if(!name){
						name = $self.text();
					}
					
					$.erp.enClickQueue(href);
					
					createAppTab(href,id,name,true);										
				}
			});
		});
				       
        //全局的对话框操作
        $("body").on("click","a.menu-item-modal",function(){
        	if($dialog){
        		return ;
        	}
        	var href = $.getContextPath()+$(this).attr("html-path");
        	var mid = $(this).attr("modal-id");
        	var mtitle = $(this).attr("modal-title");
        	var mwidth = $(this).attr("modal-width");
        	var mheight = $(this).attr("modal-height");
        	if(!mwidth){
        		mwidth = 800;
        	}
        	if(!mheight){
        		mheight = 600;
        	}
        	var hasConfirm = true;
        	if($(this).hasClass("no-btn-confirm")){
        		hasConfirm = false;
        	}
        	
        	var hasCancel = true;
        	if($(this).hasClass("no-btn-cancel")){
        		hasCancel = false;
        	}
        	var $clickObj = $(this);
        	var $self = $(this);
			//检查session会话
			$.ajax({
				url : $.getContextPath() + "/os/heartbeat.do",
				dataType:"json",
				async:false,
				success:function(data){
					var isAlive = data.isAlive;
					if(isAlive==false) return;
					
					$.get(href, function(html){
		        		var $fhtml = $("<div id='"+mid+"' title='"+mtitle+"' html-path='"+href+"'>"+html+"</div>"
);
		        		$fhtml.find("div[ng-cloak]").removeAttr("ng-cloak");
		        		// 显示的文字
		        		var confirmTxt = "确定";
		        		if($fhtml.find("[confirm-text]").length>0){
		        			confirmTxt = $fhtml.find("[confirm-text]").attr("confirm-text");
		        		}
		        		if($clickObj.attr("confirm-text")){
		        			confirmTxt = $clickObj.attr("confirm-text");
		        		}
		        		var cancelTxt = "取消";
		        		if($fhtml.find("[cancel-text]").length>0){
		        			cancelTxt = $fhtml.find("[cancel-text]").attr("cancel-text");
		        		}        		
		        		if($clickObj.attr("cancel-text")){
		        			cancelTxt = $clickObj.attr("cancel-text");
		        		}
		        		// 隐藏原先的按钮
		        		$(":submit",$fhtml).hide();
		        		$(".submit",$fhtml).hide();
		        		$(".cancel",$fhtml).hide();
		        		$(".menu-item-modal-close",$fhtml).hide();
		        		//
		        		var buttons = [];
		        		if(hasConfirm){
		        			buttons.push({
		                    	text:confirmTxt,
		                    	"click":function(){
		                    		if($("form",$dialog).length==1){
		                    			$("form",$dialog).submit();
		                    		}else if($("form",$dialog).length==0){
		                    			$(".submit",$dialog).trigger("click");
		                    		}
		                    	}
		                    });
		        		}
		        		if(hasCancel){
		        			buttons.push({
			                	text:cancelTxt,
			                	"class":"mrg5L",
			                	"style":"background:#fff;border-color:#dfe8f1;color:#000",
			                	click:function(){
			                		if($(".cancel",$dialog).length==1){
			                			$(".cancel",$dialog).trigger("click");
			                		}else{
			                			$dialog.dialog("close");
			                		}                    		
			                	}
			                });
		        		}
		        		
		                $dialog = $fhtml.dialog({
		                    resizable: true,
		                    width: mwidth,
		                    height: mheight,
		                    modal: true,
		                    show: "fadeIn",
		                    close : function(){
		                    	$dialog = null;
		                    	$(this).remove(); 
		                    },
		                    buttons: buttons
		                });               
		                $('.ui-widget-overlay').addClass('bg-black opacity-30');
		            });
				}
			});
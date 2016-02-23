(function(window) {
	function business (){};	
	//根据关键字自动加载供应商
	  business.providerAutoComplete=function($form,callback){
		$("input[name=providerName]",$form).autocomplete({
            source: function(query, process) {
            	var name = $("input[name=providerName]",$form).val();
                $.ajax({
                    url: encodeURI($.getContextPath()+"/admin/provider/findProviderList.do?start=0&limit=50"),
                    type:"post",
                    data:{name:name},
                    dataType: "json",
                    success: function( data ) {
                    	if(data.length==0)
                    	{
                    		//后续处理
                    		callback("0");
                    	}
                    	process($.map(data, function(item) { 
                            return {
                                id:item.id,
                                name:item.name,
                                label:item.name,
                                value:item.name
                            }
                        }));          	
               
                    }
                });
            },
            minLength: 1,
            select: function( event, ui ) {
                $("input[name=providerId]",$form).val(ui.item.id);
                if(ui.item.id){
                	callback(ui.item.id);
        		}
            }
        });
	}
	//开单页面第二个table高度
	business.getSecondTableHeight=function($viewPanel){	
		var h1=$("#page-content-wrapper").height()		
		var h2=$(".page-header",$viewPanel).height();
		
		var h4=$(".borderLessTop",$viewPanel).height();
		var h5=$(".borderLessBottom",$viewPanel).height();
		
		var contentHeight = $("#page-content-body-wrapper").height();
		var pgHeight = 0;
		$(".page-header:visible", $viewPanel).each(function(index,item){
			pgHeight += $(item).outerHeight();
		});		
		var pbtnHeight = 0;		
		$(".page-buttons:visible", $viewPanel).each(function(index,item){
			pbtnHeight += $(item).outerHeight();
		});
		//10 距顶高度  10 内部留白 2边框 44表底部 32表头  40 (=20+20)内边距
		
		var fh = contentHeight-pgHeight-pbtnHeight-10-10-2-44-32-40;

		return fh;
	}
	//订单明细页table的高度
	business.getDetailPageHeight=function($viewPanel){
		var bodyheight=$("body").css("min-height").replace("px");
		var h1=$("#page-content-body-wrapper").height();
	    var h2=$(".borderAll",$viewPanel).height();
		var fh =h1-54-54-10-h2-40;
		return fh;
	}
	  
	business.closeForm=function($form){
		$form.find("button.cancle").click(function(){
	   		$.close($form.closest("[html-path]").attr("html-path"));
	   		
		});
	 }	
	//初始化税率信息
	business.setInvoiceType=function($form){
		var options = "";
		$.each(erpconfig.InvoiceType,function(i,n) {
			options+='<option value="'+n.code+'" rate="'+n.taxRate+'">'+n.title+'</option>';
		});
		$("[name=invoiceType]",$form).append(options);
		$("select[name=invoiceType]",$form).selectpicker('refresh');
	}
	//判断当前登录人是否拥有订单的审批权限
	//参数说明：权限id，订单类型，当前订单状态
	business.haveAuditor=function(approveId,orderType,status,callback)
	{
		var isHave=false;			
		var isHaveAuthority=ErpHome.isHasAuthority(approveId);
		
		if(!isHaveAuthority)
		{
		 callback(false);	
	     return false;
		}				
		var roleId=$("#login_employee_info").attr("roleId");		
		//获取当前公司的审批流程
		 $.ajax({
             url: $.getContextPath()+"/os/company/findByCompany.do",
             type:"get",
             dataType: "json",
             success: function(data) {            
		            switch (orderType) {
						case "purchase":
							if(status=="editable"&&roleId.indexOf(data.purchaseDirector)!=-1)//下一个总监审批
								isHave=true;
							if(status=="pendingApproval"&&roleId.indexOf(data.purchaseFinance)!=-1)//下一个财务审批
								isHave=true;
							break;
						case "sales":
							if(status=="editable"&&roleId.indexOf(data.salesDirector) != -1)//下一个总监审批
								isHave=true;
							if(status=="pendingApproval"&&roleId.indexOf(data.salesFinance)!=-1)//下一个财务审批
								isHave=true;							
							break;
						case "purchaseReturn":		
							if(status=="editable"&&roleId.indexOf(data.purchaseReturnDirector)!=-1)//下一个总监审批
								isHave=true;						
							if(status=="pendingApproval"&&roleId.indexOf(data.purchaseReturnFinance)!=-1)//下一个财务审批
								isHave=true;
							break;
						case "salesReturn":
							if(status=="editable"&&roleId.indexOf(data.salesReturnDirector)!=-1)//下一个总监审批
								isHave=true;
							if(status=="pendingApproval"&&roleId.indexOf(data.salesReturnFinance)!=-1)//下一个财务审批
								isHave=true;
							break;
						default:					
							break;
		            	}		            
		            
		            if(isHave)
			         {
			         	$.confirm2("操作提示","下一个审批人是您，是否直接审核通过?", function(){callback(true);},function(){callback(false)});
			         }else{
			        	 callback(false);
			        	 }
			        	 
		           }
         });
		
	};
	business.calTaxRate=function($form){
		$form.find("[name=invoiceType]").change(function(){
	   		var rate = $(this).children("option:selected").attr("rate");
	   		$form.find("[name=taxRate]").val(rate);
	   	});  
	};	
	business.calDiscountRate=function($form){
		var discountRate=$form.find("input[name=discountRate]").val();
   		if(!isNaN(discountRate)){
   			var totalAmount=parseFloat($form.find("[name=originAmount]").text());//总金额 
   			$form.find("input[name=discountMoney]").val(parseFloat(totalAmount*discountRate/100).toFixed(2));
   			if(discountRate==""){
	   			$form.find("input[name=discountMoney]").val("");
	   		}
   		}  
	};
	
	business.calDiscountMoney=function($form){
		var discountMoney=$form.find("input[name=discountMoney]").val();
   		if(!isNaN(discountMoney)){
   			var totalAmount=parseFloat($form.find("[name=originAmount]").text());//总金额 
   			$form.find("input[name=discountRate]").val(parseFloat(discountMoney/totalAmount*100).toFixed(2));
   			if(discountMoney==""){
	   			$form.find("input[name=discountRate]").val("");
	   		}
   		} 
	};
	
	
	
	/**
	 * 
	 * 财务信息区域组件
	 * 
	 * originAmount 商品合计金额
	 * tax 税额
	 * invoiceTitle 发票类型
	 * taxRate 税率
	 * discountMoney 折扣
	 * freight 运费
	 * orderAmount 整单应收
	 * paymentPeriodName 结算方式
	 * 
	 * method takeIn 应收, pay 应付
	 * **/
	business.createFinanceDetail = function($container,data,hideDiscountMoney,method) {
		
		$.get($.getContextPath()+"/production/admin-angular/pages/common/financeDetail.hbs", function(body){
			var _this = $(body).clone();
			
			//originAmount,tax,invoiceTitle,taxRate,discountMoney,freight,paymentPeriodName
			
			$("[name=originAmount]",_this).text(format_thousands(data.originAmount));
			$("[name=tax]",_this).text(format_thousands(data.tax));
			$("[name=invoiceType]",_this).text(data.invoiceTitle);
			$("[name=taxRate]",_this).text(data.taxRate);
			$("[name=discountMoney]",_this).text(format_thousands(data.discountMoney));
			$("[name=freight]",_this).text(format_thousands(data.freight));
			$("[name=paymentPeriodName]",_this).text(data.paymentPeriodName);
			$("[name=orderAmount]",_this).text(format_thousands(data.orderAmount));
			
			$container.append(_this);
			if(hideDiscountMoney) {
				$container.find(".discountMoneyArea").hide();
			}
			if(method == "pay") {
				$container.find(".financeMethod").text("整单应付");
			}
			if(!data.id||data.isTax)
	   		{
	   			$("input[name=isTax]",$container).trigger("click");
	   		    $.uniform.update($container.find('input[name=isTax]'));
	   		}
		});
		
	}
	
	/**
	 * 表格下面合计赋值
	 * 
	 * **/
	business.fillSummation = function($viewPanel,goodsAmount,totalCount,originAmount) {
		if(goodsAmount != null && goodsAmount !== "")
			$(".goodsAmount",$viewPanel).text(goodsAmount.formatThousands());
		
		if(totalCount != null && totalCount !== "") {
			$(".totalCount",$viewPanel).text(totalCount.formatThousands());
			$("[name=totalCount]",$viewPanel).text(totalCount.formatThousands());
		}
		
		if(originAmount != null && originAmount !== "")
			$(".originAmount",$viewPanel).text(originAmount.toFixed(2).formatThousands());
	}
	business.getPrintUrl=function(billType,id){
		switch (billType) {
		case "purchase":
		case "sales":
			url=$.getContextPath()+"/admin/export/order.do?billType="+billType;
			if(id!=null)
				url += "&orderId="+id;			
			break;
		case "stockIn":
			url=$.getContextPath()+"/admin/export/stockIn.do?billType="+billType;
			if(id!=null)
				url += "&stockInId="+id;		
			break;
		case "stockIn":
			url=$.getContextPath()+"/admin/export/stockOut.do?billType="+billType;
			if(id!=null)
				url += "&stockOutId="+id;		
			break;	
		}		
		return url;
	}
	// 令牌	
	var token_csrf = $("meta[name='_csrf']").attr("content");
	var header_csrf = $("meta[name='_csrf_header']").attr("content");
	var parameter_csrf = $("meta[name='_csrf_parameter']").attr("content");
	
	//导出
	business.exportToExcel=function($viewPanel,printUrl){
		if(!printUrl) return;
	
			$.get($.getContextPath()+"/production/admin-angular/pages/system/print.hbs?_r="+Math.random(),function(html){				
					var $html = $("<div class='hide' class='exportExcel' title='单据导出' html-path='"+$.getContextPath()+"/production/admin-angular/pages/system/login.hbs'>" +
							       '<form method="get"  printSize="210_297_xls"><input name="printSetId" value="" type="hidden" />'+
	                               '<button class="print-template-btn erp-paper-size-9-v-xls float-left hide"></button>'+		
                                   '</form></div>');//一定要包个div，否则报错
					$("form",$html).attr("action",printUrl.split("?")[0]);
					$("form",$html).append("<input name='"+parameter_csrf+"' type='hidden' value='"+token_csrf+"' />");
					var args = $.erp.getUrlParms(printUrl);
					for(var arg in args){
						if($.isArray(args[arg])){
							for(var i=0; i<args[arg].length; i++){
								$("form",$html).append("<input name='"+arg+"' type='hidden' value='"+args[arg][i]+"' />");
							}
						}else{
							$("form",$html).append("<input name='"+arg+"' type='hidden' value='"+args[arg]+"' />");
						}
					}
					var billType = args.billType;			
					var url = encodeURI($.getContextPath()+'/admin/export/findPrintSetBySize.do');
					$.ajax({
						type : "post",      
						url : url,
						dataType : "json",			
						data : {billType:billType,printSize:"210_297_xls"},
						async:false,
						success : function(data){
							
							$("input[name=printSetId]", $html).val(data.id);							
					        $viewPanel.append($html);
							$(".print-template-btn",$html).trigger("click");
						}
					});
					
				});		
			
		};
	
	/**
	 * 设置打印选择
	 */
	business.setPrintALL=function($form)
	{
		$("input[name=printAll]",$form).uniform();
		$("input[name=printAll]",$form).parent().append('<i class="glyph-icon icon-check"></i>');
		$("input[name=printAll]",$form).click(function(){
			$form.find("thead").find("input[name=checkboxall]").trigger("click");			
		});
	}
	/**
	 * 加载供应商数据
	 */
	business.getProviderItems=function($form,callback)
	{		
		$.ajax({
            url: $.getContextPath()+"/admin/group/findProviderItemByGroup.do",
            type:"get",
            dataType: "json",
            success: function(json) {            
           	 var list="";
           	 $.each(json,function(index,item){
           		list+="<optgroup label="+item.name+">"
           		$.each(item.erpProviders,function(n,m){
           			list+=" <option value="+m.id+" companyId="+m.providerCompanyId+" isInCloudService="+m.isInCloudService+">"+m.name+"</option>";            			
           		});
           		list+="</optgroup>";
           	 });       
           	 $("#privoderItem",$form).append(list);           	
           	 $("#privoderItem",$form).chosen({ 
    	        no_results_text : "未查询到供应商:", 
    	        width:"100%"    	           
    	      }); 	
           	  $(".chosen-single div",$form).html('<i class="glyph-icon icon-caret-down"></i>');
           	  $(".chosen-single span",$form).html('请选择供应商');
           	  
           	$("#privoderItem",$form).change(function(){           	
           		var sel=$("#privoderItem option[value='"+$(this).val()+"']");  
           		$form.find("input[name=providerId]").val($(this).val());
    			$form.find("input[name=providerCompanyId]").val($(sel).attr("companyId"));
    			$form.find("input[name=providerName]").val($("#privoderItem option:selected",$form).text());
    			$form.find("input[name=isInCloudService]").val($(sel).attr("isInCloudService"));
    			callback();
           	 });
			 }
		 });
	}
	/**
	 * 根据左侧供应商的点击设置选择值
	 */
	business.setProviderId=function($form)
	{	
		$("#privoderItem",$form).val($form.find("input[name=providerId]").val());
	 	$("#privoderItem",$form).trigger("chosen:updated");
	}
	
	/**
	 * 加载客户数据
	 */
	business.getProviderItems=function($form,callback)
	{		
		$.ajax({
            url: $.getContextPath()+"/admin/group/findProviderItemByGroup.do",
            type:"get",
            dataType: "json",
            success: function(json) {            
           	 var list="";
           	 $.each(json,function(index,item){
           		list+="<optgroup label="+item.name+">"
           		$.each(item.erpProviders,function(n,m){
           			list+=" <option value="+m.id+" companyId="+m.providerCompanyId+" isInCloudService="+m.isInCloudService+">"+m.name+"</option>";            			
           		});
           		list+="</optgroup>";
           	 });       
           	 $("#privoderItem",$form).append(list);           	
           	 $("#privoderItem",$form).chosen({ 
    	        no_results_text : "未查询到供应商:", 
    	        width:"100%"    	           
    	      }); 	
           	  $(".chosen-single div",$form).html('<i class="glyph-icon icon-caret-down"></i>');
           	  $(".chosen-single span",$form).html('请选择供应商');
           	  
           	$("#privoderItem",$form).change(function(){           	
           		var sel=$("#privoderItem option[value='"+$(this).val()+"']");  
           		$form.find("input[name=providerId]").val($(this).val());
    			$form.find("input[name=providerCompanyId]").val($(sel).attr("companyId"));
    			$form.find("input[name=providerName]").val($("#privoderItem option:selected",$form).text());
    			$form.find("input[name=isInCloudService]").val($(sel).attr("isInCloudService"));
    			callback();
           	 });
			 }
		 });
	}
	/**
	 * 根据左侧供应商的点击设置选择值
	 */
	business.setProviderId=function($form)
	{	
		$("#privoderItem",$form).val($form.find("input[name=providerId]").val());
	 	$("#privoderItem",$form).trigger("chosen:updated");
	}
	
	business.setIndustryTags=function($select,tagType){
		$.ajax({
            url: $.getContextPath()+"/admin/bidRequest/findIndustryTags.do?tagType="+tagType,
            type:"get",
            dataType: "json",
            success: function(json) {
            	var list="";
            	$.each(json,function(index,item){
            		list+="<button class='btn ra-100 btn-default mrg15L mrg7T' type='button'>"+item.label+"</button>";
            	});
            	$select.append(list);
            	$select.find("button").click(function(){
            		if($(this).hasClass("btn-info"))
            		{
            			$(this).removeClass("btn-info").addClass("btn-default");
            			return false;
            		}else {
            		if(business.getIndustryTags($select).split(",").length>=8)
            			return false;
            		else {					
            		//当前class 是btn-default 时，变为蓝色
            		if($(this).hasClass("btn-default"))            		
            			$(this).removeClass("btn-default").addClass("btn-info");
            		else {
            			$(this).removeClass("btn-info").addClass("btn-default");
					}
            		}
            		
					}
            	});            	
            }
            });
	}
	business.getIndustryTags=function($select){
		var tags=new Array();		
		$.each($select.find(".btn-info"),function(){
			tags.push($(this).html());
		})
		return tags.toString();
	}
	business.showLog=function(billId,billType){
		var tags=new Array();		
		$.each($select.find(".btn-info"),function(){
			tags.push($(this).html());
		})
		return tags.toString();
	}
	/**
	 * 订单页面的应收应付金额
	 */
	business.calculateTotalMoney=function($form){	
		    //计算税额		
		var rateAmount=0;
		var totalMoney=parseFloat($form.find("[name=originAmount]").text().thousandToFloat());//总金额 
	
		var taxRate=$form.find("input[name=taxRate]").val();//税率
		if($form.find('input[name=isTax]').prop("checked")|| $("select[name=invoiceType]",$form).val()=="VAT")//含税价，税额=商品金额-(商品金额/(1+税率))
		{
			rateAmount=totalMoney-(totalMoney/(1+taxRate*0.01));
			
		}else//不含税，税额=商品金额*(1+税率)
		{
			rateAmount=totalMoney*(taxRate*0.01);
		 }
		$form.find("input[name=taxRateAmount]").val(rateAmount.toFixed(2));
		if(!($form.find("input[name=isTax]").prop("checked")))//订单金额含税额
		{
			totalMoney+=parseFloat($form.find("input[name=taxRateAmount]").val());
		}
	
		totalMoney-=parseFloat($form.find("input[name=discountMoney]").val());
		if($form.find("[name=freightPayType]:checked").val()=="purchase")//买方付
			totalMoney+=parseFloat($form.find("input[name=freight]").val());
	
		$form.find(".orderAmount").html(format_thousands(totalMoney));
	}
	//开单界面是否含税的切换
	business.changeInvoiceEvent=function($form){
		
	    $form.on("click","input[name=isTax]",function(){		
			$form.find(".calculateOrderAmount option").removeAttr("selected");			
			if($(this).prop("checked"))
			{
			   $form.find(".hasRate").text("(不含税额)");	
			   $form.find(".calculateOrderAmount option[rate=17]").attr("selected",true);	 
			   $form.find(".addrate").hide();
			   $form.find("input[name=taxRateAmount]").attr("disabled","disabled");
			   $("select[name=invoiceType]",$form).selectpicker('val', 'VAT');
			}else
			{
				 $form.find(".hasRate").text("(含税额)");
				 $("select[name=invoiceType]",$form).selectpicker('val', 'NONE');
				 $form.find(".calculateOrderAmount option[rate=0]").attr("selected",true);	
				 $form.find(".addrate").show();
				 $form.find("input[name=taxRateAmount]").removeAttr("disabled");
				 $form.find("input[name=taxRateAmount]").val(0);
			}		
		   $form.find("[name=invoiceType]").trigger("change");
					
		});
		
		//开票形式选择
		$form.on("change","[name=invoiceType]",function(){
	   		var rate = $(this).children("option:selected").attr("rate");
	   		$form.find("[name=taxRate]").val(rate);
	   		business.calculateTotalMoney($form);
	   	});  
		//税率输入	
		$form.on("change",'input[name=taxRate]',function(){
			$("select[name=invoiceType]",$form).selectpicker('val', 'PLAIN');
			business.calculateTotalMoney($form);
			
		});
		//税额输入
		$form.on("change",'input[name=taxRateAmount]',function(){
			$('.selectpicker',$form).selectpicker('val', 'PLAIN');
			//计算税率
			 var originAmount=parseFloat($form.find("[name=originAmount]").text().thousandToFloat());		
			 if(!$form.find('input[name=isTax]').prop("checked")&&$(this).val()!="NONE")
		    {
		      //根据商品金额 及输入的税额，自动计算税率
		    	 var rate=parseFloat($(this).val())/originAmount;
		    	 $form.find('input[name=taxRate]').val((rate*100).toFixed(2));
		    	 
		    }
		       var discountMoney=$form.find("[name=discountMoney]").val();
		       var totalAmount=0;
		   		if(!isNaN(discountMoney)){
		   			totalAmount=originAmount+parseFloat($(this).val())-parseFloat(discountMoney);
				}
		   		$form.find("[name=orderAmount]").text(totalAmount);
		   		$form.find(".orderAmount").text(totalAmount.toFixed(2).formatThousands());
		   		
		   		business.calculateTotalMoney($form);
		});
		$form.on("change", 'input.calculateOrderAmount',function(){			
			var totalAmount = parseFloat($form.find("[name=originAmount]").text().thousandToFloat());//总金额 			 
			if($(this).attr("name")=="discountMoney")
			{
				 var money=$(this).val(); 			
				var rate = (money/totalAmount*100);
				$("[name=discountRate]",$form).val(rate?rate.toFixed(2):0);
			}
			business.calculateTotalMoney($form);
		});		
	}
	
	
	ErpBusiness=business;	
	
})("ErpBusiness");
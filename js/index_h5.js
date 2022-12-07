'use strict';
window.onload = function() {
	//测试数据
	Global_VAR.sTest = SysUtils.getUrlParams("sTest");
	if(Global_VAR.sTest != undefined) {
		Global_VAR.getMright = "http://127.0.0.1/door/base/private/web/getMright"; // 获取H5二级菜单的地址   http://127.0.0.1/door/base/private/web/getMright  
		Global_VAR.getDictList = "http://127.0.0.1/door/base/public/web/getDictList?sFiledEName=sMenuTypeCode"; // 获取H5菜单的地址
	}
 Global_FN.render();
}
//全局变量
var Global_VAR = {
	getMright: SysUtils.getHttpRoot() + "/base/private/web/getMright", // 获取H5二级菜单的地址 
	getDictList: SysUtils.getHttpRoot() + "/base/public/web/getDictList?sFiledEName=sMenuTypeCode", // 获取H5菜单的地址
	menuList: [], 	   // 菜单数组
}
var Global_FN = {
	render () {
		layui.use(['form'], function() {
			let form = layui.form;
			let $ = layui.jquery;
			
			// Global_FN.isShowLoading(false);
      Global_FN.getDictList();
			// Global_FN.getMright();
			
		});
	},
	// 获取菜单
	getDictList () {
		layui.use(['jquery'], function() {
			let $ = layui.jquery;
			
			$.ajax({
				url: Global_VAR.getDictList,
				type: "post",
				data: {},
				success: function(res) {
					if(res.code == 1) {
						// console.log(res);
			
						// Global_FN.isShowLoading(false);
			
						// var res = {"code":1,"data":{"sMenuTypeCode":[{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"采集","sCode":"1","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"在校","sCode":"2","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"离校·返校","sCode":"3","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"报到","sCode":"4","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"其他","sCode":"5","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"测试","sCode":"6","iSelected":0}]}};
						var list = res.data.sMenuTypeCode;
						
						$.each(list, (index, item) => {
							let obj = {};
							obj.title = item.sName;
							obj.sCode = item.sCode;
							obj.items = [];
							Global_VAR.menuList.push(obj);
						})
						
						Global_FN.getMright();
					} else {
						// Global_FN.isShowTopTips(res.msg, false);
						Global_FN.isShowDialog(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");	
						// Global_VAR.isUploadClick = true;
					}
				},
				error: function (res) {
					Global_FN.isShowDialog(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");	
					// Global_FN.isShowTopTips("亲，网络异常~", false);
					// Global_VAR.isUploadClick = true;
				}
			})
			

		});	
	},
	// 获取菜单二级
	getMright () {
		layui.use(['jquery'], function() {
			let $ = layui.jquery;
			
			$.ajax({
				url: Global_VAR.getMright,
				type: "post",
				data: {},
				success: function(res) {
					if(res.code == 1) {
						// console.log(res);
			
						// var res = {"code":1,"data":[{"id":"e041c39864b947a1a14d778244ed7075","sMenuName":"健康填报","sMenuCode":"856151","sMenuTypeName":"在校","sMenuTypeCode":"2","sMenuUrl":"/health/h5/health.html","sMenuIcon":"856151","iSort":6},{"id":"6f46588e32c447e78da0a49a4ed86841","sMenuName":"发热登记","sMenuCode":"874776","sMenuTypeName":"在校","sMenuTypeCode":"2","sMenuUrl":"/health/h5/fever.html","sMenuIcon":"874776","iSort":9},{"id":"ccb89f6747aa4143ba18a60b5bab44ea","sMenuName":"开学报到","sMenuCode":"572323","sMenuTypeName":"报到","sMenuTypeCode":"4","sMenuUrl":"/register/h5/register.html","sMenuIcon":"572323","iSort":7},{"id":"e9f1e99b9c8f4c1b8f77f1c9b7862da6","sMenuName":"接站申请","sMenuCode":"770056","sMenuTypeName":"报到","sMenuTypeCode":"4","sMenuUrl":"/site/h5/apply.html","sMenuIcon":"770056","iSort":8},{"id":"9c965f528c7347c897c906e378caa1d4","sMenuName":"离校登记","sMenuCode":"98100","sMenuTypeName":"离校·返校","sMenuTypeCode":"3","sMenuUrl":"/leave/h5/leave.html","sMenuIcon":"98100","iSort":5},{"id":"9050701ee1b4478d9a141ba09c4f6a25","sMenuName":"特征照采集","sMenuCode":"900113","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/feature/h5/feature.html","sMenuIcon":"900113","iSort":1},{"id":"b83fbd271ef04210bd818bc4b7afa2cc","sMenuName":"特征照管理","sMenuCode":"588373","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/feature/h5/featuremgr.html","sMenuIcon":"588373","iSort":2},{"id":"55e12938dc9b4d059bd546176c4d2e72","sMenuName":"证件照上传","sMenuCode":"294779","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/idphoto/h5/idphoto.html","sMenuIcon":"294779","iSort":3},{"id":"3f71f6c46271482c99f2c9af7e04eaee","sMenuName":"证件照审核","sMenuCode":"801933","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/idphoto/h5/idphotomgr.html","sMenuIcon":"801933","iSort":4}]};
						var list = res.data;
						
						for (let i=0; i < Global_VAR.menuList.length; i++) {
							for (let j=0; j < list.length; j++) {
								if (list[j].sMenuTypeCode == Global_VAR.menuList[i].sCode) {
									let obj = {};
									obj.name = list[j].sMenuName || "";
									obj.url = list[j].sMenuUrl || "" ; 
									obj.icon = "img/"+ list[j].sMenuCode +".png" || "";
									obj.code = list[j].sMenuCode || "";
									Global_VAR.menuList[i].items.push(obj);
								}
							}
						}
						// console.log(Global_VAR.menuList);
						Global_FN.initMenuList();
			
					} else {
						// Global_FN.isShowTopTips(res.msg, false);
						Global_FN.isShowDialog(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");	
						// Global_VAR.isUploadClick = true;
					}
				},
				error: function (res) {
					Global_FN.isShowDialog(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");	
				}
			})
			

		});
	},
	// 初始化菜单
	initMenuList () {
		layui.use(['jquery'], function() {
			let $ = layui.jquery;
			
			// console.log(Global_VAR.menuList);
			// console.log(Global_VAR.menuList.length);
			
			if (Global_VAR.menuList.length != 0) {
				let str = "";
				$(".main").empty();
				$.each(Global_VAR.menuList, (index, item) => {
					// console.log(item);
					if (item.items.length != 0) {
						str += '<div class="main_box">' + 
											
								'<div class="main_title"><img src="img/title_left.png">'+ item.title +'<img src="img/title_right.png"></div>' + 
								'<div class="main_section">' 
								
								$.each(item.items, (index2, item2) => {
									// console.log(item2);
									str +='<div class="item" url="'+ item2.url +'" onclick="Global_FN.jumpUrl()">' +
										      '<img class="item_icon" src="'+ item2.icon +'" alt="">' +
											    '<div class="text">'+ item2.name +'</div>' +
										    '</div>' 
								});

							str += '</div>' +
						  '</div>'
					}
				});
				
				// str += '<div class="main_box"><div class="main_title"><img src="img/title_left.png">其它<img src="img/title_right.png"></div><div class="main_section"><div class="item" onclick="Global_FN.jumpMyPass()"><img class="item_icon" src="img/home_mrtb_icon.png" alt=""><div class="text">旧版Mypass</div></div></div></div>';
				
				// console.log(str);
				$(".main").append(str);
				setTimeout(function() {
					Global_FN.isShowLoading(false);
				}, 500);
			}
		});
	},
	// 跳转url
	jumpUrl () {
		layui.use(['jquery'], function() {
			let $ = layui.jquery;
			
			let sUrl = $(event.currentTarget).attr("url");
			sUrl ? window.location.href = SysUtils.getHttpRoot() + sUrl : "";
		});	
	},
	// 跳转至 个人信息
	jumpInfo () {
		window.location.href = "../personalInfo/personalInfo.html";
	},
	// 跳到旧版mypass
	jumpMyPass () {
		window.location.href = "https://mypass.scut.edu.cn/hsmobile/index.html";
	},
	// 关闭弹窗
	closeDialog () {
		layui.use(["jquery"], function() {
			let $ = layui.jquery;
			
			$("#weuiDialogError").hide();
			window.history.back();
		});	
	},
	// 显示弹窗
	isShowDialog (text) {
		layui.use(["jquery"], function() {
			let $ = layui.jquery;
			
			$("#dialogText").text(text);
			$("#weuiDialogError").show();
		});	
	},
	// 显示or隐藏 loading
	isShowLoading (status) {
		layui.use([], function() {
			let $ = layui.jquery;
			status ? ($(".loading_mask").show(), $(".loading_tip").show()) : ($(".loading_mask").hide(), $(".loading_tip").hide());
		});	
		
	}
}	
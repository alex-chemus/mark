"use strict";(self["webpackChunkmark"]=self["webpackChunkmark"]||[]).push([[963],{214:function(e,l,o){o.d(l,{lI:function(){return be},FI:function(){return F},Qn:function(){return oe},$B:function(){return ll},gt:function(){return Fe}});var t=o(252),a=o(577),r=o(262),s=o(201),n=o(907),i=o(963),u=o(562);const c=e=>((0,t.dD)("data-v-48982e64"),e=e(),(0,t.Cn)(),e),d=u+"#tabler-chevron-down",p=u+"#tabler-list",g={key:0,class:"popup-wrapper"},v=c((()=>(0,t._)("use",{href:d},null,-1))),f=[v],_=c((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:p})],-1))),h=[_],m={class:"popup"},D=["onClick"];var k=(0,t.aZ)({__name:"CloudPopup",setup(e){const l=(0,t.f3)("key"),{state:o}=(0,n.oR)(l),u=(0,s.yj)(),c=(0,s.tv)(),d=(0,r.iH)(!1),p=async()=>{o.groups&&!u.params.groupID&&c.push({path:`/cloud/groups/${o.groups[0].groupID}`})};(0,t.bv)(p),(0,t.YP)((()=>o.userInfo),p),(0,t.YP)((()=>u.path),(()=>{"/cloud/groups"===u.path&&p()}));const v=(0,r.iH)(+u.params.groupID);(0,t.YP)((()=>u.params.groupID),(()=>v.value=+u.params.groupID));const _=(0,t.Fl)((()=>o.groups?o.groups.find((e=>e.groupID===v.value))?.groupName:"")),k=e=>{c.push({path:`/cloud/groups/${e}`}),d.value=!1};return(e,l)=>(0,r.SU)(o).groups?((0,t.wg)(),(0,t.iD)("div",g,[(0,t._)("button",{class:"popup-button desktop",onClick:l[0]||(l[0]=e=>d.value=!d.value)},[(0,t._)("span",null,(0,a.zw)((0,r.SU)(_)),1),((0,t.wg)(),(0,t.iD)("svg",{width:"22",height:"22",viewBox:"0 0 22 22",class:(0,a.C_)(d.value?"opened":"")},f,2))]),(0,t._)("button",{class:"popup-button mobile",onClick:l[1]||(l[1]=e=>d.value=!d.value)},h),(0,t.Wm)(i.uT,{name:"popup-animation"},{default:(0,t.w5)((()=>[(0,t.wy)((0,t._)("ul",m,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,r.SU)(o).groups,(e=>((0,t.wg)(),(0,t.iD)("li",{key:e.groupID,class:(0,a.C_)(e.groupID===v.value?"selected":"")},[(0,t._)("button",{onClick:l=>k(e.groupID)},(0,a.zw)(e.groupName),9,D)],2)))),128))],512),[[i.F8,d.value]])])),_:1}),(0,t.Wm)(i.uT,{name:"backdrop-animation"},{default:(0,t.w5)((()=>[(0,t.wy)((0,t._)("div",{class:"backdrop",onClick:l[2]||(l[2]=e=>d.value=!d.value)},null,512),[[i.F8,d.value]])])),_:1})])):(0,t.kq)("",!0)}}),w=o(744);const b=(0,w.Z)(k,[["__scopeId","data-v-48982e64"]]);var I=b;const y={class:"cloud-nav"},C={class:"links-list"},x={key:0};var S=(0,t.aZ)({__name:"CloudNav",setup(e){const l=(0,t.f3)("key"),{getters:o,state:i}=(0,n.oR)(l),u=(0,s.tv)(),c=(0,s.yj)(),d=(0,r.iH)(null);(0,t.bv)((()=>{c.path.startsWith("/cloud/groups")?d.value="/cloud/groups":d.value="/cloud/private"}));const p=()=>{o.roles.includes("teacher")||o.roles.includes("administrator_of_institution")||!i.userInfo?.additionalData.inGroups.length||"/cloud/groups"!==d.value||"/cloud/groups"!==c.path||u.push({path:`/cloud/groups/${i.userInfo.additionalData.inGroups[0]}`})};(0,t.bv)(p),(0,t.YP)([()=>i.userInfo,()=>c.path],p);const g=(0,t.Fl)((()=>o.roles.includes("teacher")||o.roles.includes("administrator_of_institution"))),v=e=>e===d.value?"selected":"";return(e,l)=>((0,t.wg)(),(0,t.iD)("nav",y,[(0,t._)("ul",C,[(0,t._)("li",{class:(0,a.C_)(["nav-link",v("/cloud/private")])},[(0,t._)("button",{onClick:l[0]||(l[0]=e=>(0,r.SU)(u).push({path:"/cloud/private"}))},"Мое облако")],2),(0,t._)("li",{class:(0,a.C_)(["nav-link",v("/cloud/groups")])},[(0,t._)("button",{onClick:l[1]||(l[1]=e=>(0,r.SU)(u).push({path:"/cloud/groups"}))},"Облако группы")],2)]),"/cloud/groups"===d.value&&(0,r.SU)(g)?((0,t.wg)(),(0,t.iD)("div",x,[(0,t.Wm)(I)])):(0,t.kq)("",!0)]))}});const U=(0,w.Z)(S,[["__scopeId","data-v-1a61a66b"]]);var F=U,N=o(235);const Z=e=>((0,t.dD)("data-v-3cb11f9b"),e=e(),(0,t.Cn)(),e),E=u+"#tabler-corner-up-left",z={key:0,class:"directory-path"},H=["title"],P=Z((()=>(0,t._)("span",null,"/",-1))),Y=Z((()=>(0,t._)("span",null,"...",-1))),$=[P,Y],B=Z((()=>(0,t._)("span",null,"/",-1))),q=["title"],T={class:"directory"},W=Z((()=>(0,t._)("span",null,"/",-1))),M=["title"],R=Z((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:E})],-1))),j=[R],A={key:1,class:"directory-path"},G={key:0},K=["onClick","title"],V=Z((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:E})],-1))),Q=[V],J={key:2,class:"directory-path-mobile"},L={key:0,class:"directory --no-gap"},O=Z((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:E})],-1))),X=[O];var ee=(0,t.aZ)({__name:"DirectoryPath",props:{groupID:null,folderID:null},setup(e){const l=e,o=(0,s.tv)(),i=(0,t.f3)("key"),{dispatch:u,getters:c}=(0,n.oR)(i),d=(0,r.iH)(null),p=async()=>{if(!l.folderID)return void(d.value=[{folderID:0,folderName:"Корневой каталог"}]);const{response:e,error:o}=await(0,N.ib)({path:"markMethods/groupCloud.getFolderPath",data:{groupID:l.groupID,folderID:l.folderID}});o?(console.log(o),u("setError",o)):d.value=e};(0,t.bv)(p),(0,t.YP)((()=>l.folderID),p);const g=e=>{null!==e&&o.push({path:`/cloud/groups/${l.groupID}/${e}`})},v=()=>{if(!d.value)return;const{folderID:e}=d.value[d.value.length-2];o.push({path:`/cloud/groups/${l.groupID}/${e}`})},f=(0,t.Fl)((()=>!!c.roles&&(c.roles.includes("teacher")||c.roles.includes("administrator_of_institution"))));return(e,l)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[d.value&&d.value.length>3?((0,t.wg)(),(0,t.iD)("section",z,[(0,t._)("div",{class:(0,a.C_)(["directory",(0,r.SU)(f)?"hide":""])},[(0,t._)("button",{onClick:l[0]||(l[0]=e=>g(d.value[0].folderID)),title:d.value[0].folderName},(0,a.zw)(d.value[0].folderName),9,H)],2),(0,t._)("div",{class:(0,a.C_)(["directory",(0,r.SU)(f)?"hide":""])},$,2),(0,t._)("div",{class:(0,a.C_)(["directory",(0,r.SU)(f)?"hide":""])},[B,(0,t._)("button",{onClick:l[1]||(l[1]=e=>g(d.value[d.value.length-2].folderID)),title:d.value[d.value.length-2].folderName},(0,a.zw)(d.value[d.value.length-2].folderName),9,q)],2),(0,t._)("div",T,[W,(0,t._)("button",{onClick:l[2]||(l[2]=e=>g(d.value[d.value.length-1].folderID)),title:d.value[d.value.length-2].folderName},(0,a.zw)(d.value[d.value.length-1].folderName),9,M)]),(0,t._)("button",{class:"button-up",onClick:v},j)])):d.value?((0,t.wg)(),(0,t.iD)("section",A,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(d.value,((e,l)=>((0,t.wg)(),(0,t.iD)("div",{key:l,class:(0,a.C_)(["directory",(0,r.SU)(f)&&l!==d.value.length-1?"hide":""])},[0!==l?((0,t.wg)(),(0,t.iD)("span",G,"/")):(0,t.kq)("",!0),(0,t._)("button",{onClick:l=>g(e.folderID),title:e.folderName},(0,a.zw)(e.folderName),9,K)],2)))),128)),(0,t._)("button",{class:(0,a.C_)(["button-up",d.value.length<2?"disabled":""]),onClick:v},Q,2)])):(0,t.kq)("",!0),d.value?((0,t.wg)(),(0,t.iD)("section",J,[(0,r.SU)(f)?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",L,[(0,t._)("span",null,(0,a.zw)(d.value[d.value.length-1].folderName),1)])),(0,t._)("button",{class:(0,a.C_)(["button-up",d.value.length<2?"disabled":""]),onClick:v},X,2)])):(0,t.kq)("",!0)],64))}});const le=(0,w.Z)(ee,[["__scopeId","data-v-3cb11f9b"]]);var oe=le;const te=e=>((0,t.dD)("data-v-c24b7660"),e=e(),(0,t.Cn)(),e),ae={for:"name"},re=te((()=>(0,t._)("span",null,"Название папки",-1))),se={class:"button-wrapper"};var ne=(0,t.aZ)({__name:"CreateFolder",props:{opened:{type:Boolean},groupID:null},emits:["toggle","created"],setup(e,{emit:l}){const o=e,a=(0,t.f3)("key"),{dispatch:u}=(0,n.oR)(a),c=(0,s.yj)(),d=(0,r.iH)(null),p=()=>{""===c.params.folderID?d.value=null:d.value=c.params.folderID};(0,t.bv)(p),(0,t.YP)((()=>c.params.folderID),p);const g=(0,r.iH)(""),v=async()=>{const e=d?.value?{groupID:o.groupID,newFolderName:g.value,folderID:d.value}:{groupID:o.groupID,newFolderName:g.value},{error:t}=await(0,N.ib)({path:"markMethods/groupCloud.createFolder",data:e});t?(console.log(t),u("setError",t)):(l("created"),l("toggle"))};return(o,a)=>((0,t.wg)(),(0,t.iD)(t.HY,null,[e.opened?((0,t.wg)(),(0,t.iD)("form",{key:0,class:"modal",onSubmit:a[2]||(a[2]=(0,i.iM)((()=>{}),["prevent"]))},[(0,t._)("label",ae,[re,(0,t.wy)((0,t._)("input",{type:"text",id:"name","onUpdate:modelValue":a[0]||(a[0]=e=>g.value=e)},null,512),[[i.nr,g.value]])]),(0,t._)("div",se,[(0,t._)("button",{class:"button-hollow",onClick:a[1]||(a[1]=e=>l("toggle"))},"Отмена"),(0,t._)("button",{class:"button-fill",onClick:v},"Создать")])],32)):(0,t.kq)("",!0),e.opened?((0,t.wg)(),(0,t.iD)("div",{key:1,class:"backdrop",onClick:a[3]||(a[3]=e=>l("toggle"))})):(0,t.kq)("",!0)],64))}});const ie=(0,w.Z)(ne,[["__scopeId","data-v-c24b7660"]]);var ue=ie;const ce=e=>((0,t.dD)("data-v-01ebe90e"),e=e(),(0,t.Cn)(),e),de=u+"#tabler-file-plus",pe=u+"#tabler-folder-plus",ge={class:"cloud-controls"},ve=ce((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:de})],-1))),fe=ce((()=>(0,t._)("span",null,"Добавить файл",-1))),_e=[ve,fe],he=ce((()=>(0,t._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,t._)("use",{href:pe})],-1))),me=ce((()=>(0,t._)("span",null,"Добавить папку",-1))),De=[he,me];var ke=(0,t.aZ)({__name:"CloudControls",props:{groupID:null,folderID:null},emits:["created"],setup(e,{emit:l}){const o=e,a=(0,t.f3)("key"),{dispatch:s}=(0,n.oR)(a),u=(0,r.iH)(null),c=async e=>{const l={filesIDs:e,groupID:o.groupID};o.folderID&&o.folderID&&(l.folderID=o.folderID);const{error:t}=await(0,N.ib)({path:"markMethods/groupCloud.addFiles",data:l});return t?(console.log(t),s("setError",t),t):null},d=async e=>{const l=new FormData;l.append("files",e);const{error:o,response:t}=await(0,N.ib)({path:"methods/cloud.uploadFiles",formData:l,url:"https://cloud.findcreek.com"});if(o)return console.log(o),s("setError",o),o;{const e=await c(t[0].fileID);return e}},p=async()=>{if(u.value&&u.value.files?.length){const{files:e}=u.value;for(let l of e){const e=await d(l);if(null!==e){await s("setError",e);break}}l("created")}},g=()=>{u.value&&u.value.click()},v=(0,r.iH)(!1);return(o,a)=>((0,t.wg)(),(0,t.iD)("section",ge,[(0,t._)("form",{onSubmit:a[0]||(a[0]=(0,i.iM)((()=>{}),["prevent"]))},[(0,t._)("input",{type:"file",ref_key:"input",ref:u,multiple:"",onChange:p},null,544),(0,t._)("button",{class:"button",onClick:g},_e)],32),(0,t._)("button",{class:"button",onClick:a[1]||(a[1]=e=>v.value=!v.value)},De),(0,t.Wm)(ue,{opened:v.value,groupID:e.groupID,onToggle:a[2]||(a[2]=e=>v.value=!v.value),onCreated:a[3]||(a[3]=e=>l("created"))},null,8,["opened","groupID"])]))}});const we=(0,w.Z)(ke,[["__scopeId","data-v-01ebe90e"]]);var be=we,Ie=o.p+"img/folder2.53c48cfb.svg";const ye=["title"],Ce=["alt"],xe={class:"name"};var Se=(0,t.aZ)({__name:"Folder",props:{folder:null,groupID:null},setup(e){const{push:l}=(0,s.tv)();return(o,s)=>((0,t.wg)(),(0,t.iD)("button",{onClick:s[0]||(s[0]=o=>(0,r.SU)(l)({path:`/cloud/groups/${e.groupID}/${e.folder.folderID}`})),class:"folder",title:e.folder.folderName},[(0,t._)("img",{src:Ie,alt:e.folder.folderName},null,8,Ce),(0,t._)("p",xe,(0,a.zw)(e.folder.folderName),1)],8,ye))}});const Ue=(0,w.Z)(Se,[["__scopeId","data-v-9ca33cdc"]]);var Fe=Ue,Ne=o.p+"img/image.f9af3c2c.svg",Ze=o.p+"img/video.28e34ee8.svg",Ee=o.p+"img/audio.1fc0d63f.svg",ze=o.p+"img/pdf.37d19571.svg",He=o.p+"img/doc.13873dc6.svg",Pe=o.p+"img/excel.a0e41c87.svg",Ye=o.p+"img/presentation.94c47deb.svg",$e=o.p+"img/archive.1df2fcc0.svg",Be=o.p+"img/other.5fd78c2f.svg";const qe={key:0,src:Ne,alt:"Image"},Te={key:1,src:Ze,alt:"Video"},We={key:2,src:Ee,alt:"Audio"},Me={key:3,src:ze,alt:"PDF"},Re={key:4,src:He,alt:"Document"},je={key:5,src:Pe,alt:"Table"},Ae={key:6,src:Ye,alt:"Presentation"},Ge={key:7,src:$e,alt:"Archive"},Ke={key:8,src:Be,alt:"Unknown"};var Ve=(0,t.aZ)({__name:"FileImg",props:{file:null},setup(e){const l=e,o=(0,t.Fl)((()=>"image"===l.file.fileType?"image":"video"===l.file.fileType?"video":"audio"===l.file.fileType?"audio":"pdf"===l.file.fileExtension?"pdf":"doc"===l.file.fileExtension||"docx"===l.file.fileExtension?"doc":"xls"===l.file.fileExtension||"xlsx"===l.file.fileExtension?"excel":"ppt"===l.file.fileExtension||"pptx"===l.file.fileExtension?"presentation":["zip","rar","7z","tar"].includes(l.file.fileExtension)?"archive":"other"));return(e,l)=>"image"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",qe)):"video"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",Te)):"audio"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",We)):"pdf"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",Me)):"doc"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",Re)):"excel"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",je)):"presentation"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",Ae)):"archive"===(0,r.SU)(o)?((0,t.wg)(),(0,t.iD)("img",Ge)):((0,t.wg)(),(0,t.iD)("img",Ke))}});const Qe=(0,w.Z)(Ve,[["__scopeId","data-v-3926430e"]]);var Je=Qe;const Le=["href","title"],Oe={class:"name"};var Xe=(0,t.aZ)({__name:"File",props:{file:null},setup(e){return(l,o)=>((0,t.wg)(),(0,t.iD)("a",{href:e.file.urlToFile,target:"_blank",class:"file",title:e.file.fileName},[(0,t.Wm)(Je,{file:e.file},null,8,["file"]),(0,t._)("p",Oe,(0,a.zw)(e.file.fileName)+"."+(0,a.zw)(e.file.fileExtension),1)],8,Le))}});const el=(0,w.Z)(Xe,[["__scopeId","data-v-5e14ea9f"]]);var ll=el}}]);
//# sourceMappingURL=963.77b86de3.js.map
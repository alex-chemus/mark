"use strict";(self["webpackChunkmark"]=self["webpackChunkmark"]||[]).push([[55],{55:function(e,t,a){a.r(t),a.d(t,{default:function(){return x}});var s=a(252),r=a(262),n=a(577),u=a(562),o=a(907),l=a(201),i=a(235),c=a(53),p=a(933);const v=({route:e})=>{const t=(0,r.iH)(null),a=async()=>{const{response:a,error:s}=await(0,i.ib)({path:"markMethods/attendance.getAttendanceReportsInfo",data:{reportsIDs:e.params.reportID}}),{setTime:r}=(0,c.rE)();s?(console.log(s),p.h.dispatch("setError",s)):t.value=r(a[0])};return{report:t,fetchReport:a}};var d=v;const h=e=>((0,s.dD)("data-v-e51c24e6"),e=e(),(0,s.Cn)(),e),m=u+"#tabler-arrow-left",g=u+"#tabler-device-floppy",k={key:0,class:"nav"},f={class:"title-group"},_=h((()=>(0,s._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,s._)("use",{href:m})],-1))),b=[_],w={class:"heading"},D=h((()=>(0,s._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,s._)("use",{href:g})],-1))),I=h((()=>(0,s._)("span",null,"Сохранить",-1))),y=[D,I],S={key:1,class:"main"},P=h((()=>(0,s._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,s._)("use",{href:g})],-1))),U=h((()=>(0,s._)("span",null,"Сохранить",-1))),H=[P,U];var C=(0,s.aZ)({__name:"EditReport",setup(e){const t=(0,s.f3)("key"),{dispatch:a,getters:u,state:p}=(0,o.oR)(t),v=(0,l.yj)(),h=(0,l.tv)(),{report:m,fetchReport:g}=d({route:v});(0,s.bv)(g),(0,s.YP)((()=>v.params.reportID),g);const _=(0,r.iH)(null);(0,s.YP)([m,()=>p.groups],(()=>{m.value&&(_.value=u.getGroups(m.value.groupID))}));const D=(0,r.iH)(null);(0,s.YP)(m,(()=>{m.value&&(D.value=m.value.students.map((e=>({userID:e.userID,firstName:e.firstName,lastName:e.lastName,patronymic:e.patronymic,isPresent:e.isPresent,status:e.status}))))}));const I=e=>{D.value&&(D.value=D.value.map((t=>t.userID===e?{...t,isPresent:!t.isPresent}:t)))},P=e=>{if(_.value&&"string"!==typeof e)return _.value.headStudentID===e?"Староста":_.value.deputyHeadStudentID===e?"Зам. старосты":void 0},U=(0,r.iH)(""),C=(0,r.iH)(0),N=async()=>{if(!D.value)return;const e=D.value.filter((e=>e.isPresent)).map((e=>e.userID)),t=D.value.filter((e=>!e.isPresent)).map((e=>e.userID)),{error:s}=await(0,i.ib)({path:"markMethods/attendance.editAttendanceReport",data:{reportID:v.params.reportID,presentStudents:e,missingStudents:t}});s?(console.log(s),a("setError",s)):(U.value="Отчет изменен!",C.value+=1)};return(0,s.wF)((()=>document.title="Редактировать отчет")),(e,t)=>((0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)((0,r.SU)(i.bZ),{text:U.value,observer:C.value},null,8,["text","observer"]),(0,r.SU)(m)?((0,s.wg)(),(0,s.iD)("nav",k,[(0,s._)("div",f,[(0,r.SU)(h).options.history.state.back?((0,s.wg)(),(0,s.iD)("button",{key:0,class:"back-button",onClick:t[0]||(t[0]=e=>(0,r.SU)(h).go(-1))},b)):(0,s.kq)("",!0),(0,s._)("h1",w,[(0,s._)("span",null,(0,n.zw)((0,r.SU)(m).date),1),(0,s._)("span",null,(0,n.zw)((0,r.SU)(m).groupName),1),(0,s._)("span",null,(0,n.zw)((0,r.SU)(m).institutionData.shortName),1)])]),(0,s._)("button",{class:"save-button --desktop",onClick:N},y)])):(0,s.kq)("",!0),D.value?((0,s.wg)(),(0,s.iD)("main",S,[(0,s._)("div",{class:"mobile-controls"},[(0,s._)("button",{class:"save-button",onClick:N},H)]),(0,s.Wm)((0,r.SU)(c.LW),{"users-data":D.value,"check-status":P,onEdit:I},null,8,["users-data"])])):(0,s.kq)("",!0)],64))}}),N=a(744);const R=(0,N.Z)(C,[["__scopeId","data-v-e51c24e6"]]);var x=R}}]);
//# sourceMappingURL=55.3abbd019.js.map
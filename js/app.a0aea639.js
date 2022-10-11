(function(){"use strict";var t={776:function(t,e,a){var n=a(963),o=a(201),r=a(252),s=a(262),i=a(907),l=a(235),u=a(577),c=a(562);const d=(0,r.Uk)("Группы"),p=(0,r.Uk)("Посещаемость"),h=(0,r.Uk)("Облако"),f=(0,r.Uk)("Учреждение");var v=(0,r.aZ)({__name:"PrimaryNav",setup(t){const e=(0,r.f3)("key"),{getters:a}=(0,i.oR)(e),n=(0,o.yj)(),l=(...t)=>t.includes("/")?"/"===n.path||n.path.startsWith("/groupID")?"selected":"":t.some((t=>n.path.startsWith(t)))?"selected":"",c=(0,r.Fl)((()=>a.roles?.includes("administrator_of_institution"))),v=(0,r.Fl)((()=>a.roles?.includes("teacher")));return(t,e)=>{const a=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("nav",null,[(0,r._)("ul",null,[(0,r._)("li",{class:(0,u.C_)(l("/","/groupID"))},[(0,r.Wm)(a,{to:"/"},{default:(0,r.w5)((()=>[d])),_:1})],2),(0,s.SU)(v)?((0,r.wg)(),(0,r.iD)("li",{key:0,class:(0,u.C_)(l("/attendance/user"))},[(0,r.Wm)(a,{to:"/attendance/user"},{default:(0,r.w5)((()=>[p])),_:1})],2)):(0,r.kq)("",!0),(0,r._)("li",{class:(0,u.C_)(l("/cloud"))},[(0,r.Wm)(a,{to:"/cloud"},{default:(0,r.w5)((()=>[h])),_:1})],2),(0,s.SU)(c)?((0,r.wg)(),(0,r.iD)("li",{key:1,class:(0,u.C_)(l("/institution"))},[(0,r.Wm)(a,{to:"/institution"},{default:(0,r.w5)((()=>[f])),_:1})],2)):(0,r.kq)("",!0)])])}}}),m=a(744);const g=(0,m.Z)(v,[["__scopeId","data-v-3551f28f"]]);var _=g;const k=(0,r.uE)('<svg xmlns="http://www.w3.org/2000/svg" class="icon desktop" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" data-v-10246aa8><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-10246aa8></path><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" data-v-10246aa8></path><path d="M6.343 17.657l-1.414 1.414" data-v-10246aa8></path><path d="M6.343 6.343l-1.414 -1.414" data-v-10246aa8></path><path d="M17.657 6.343l1.414 -1.414" data-v-10246aa8></path><path d="M17.657 17.657l1.414 1.414" data-v-10246aa8></path><path d="M4 12h-2" data-v-10246aa8></path><path d="M12 4v-2" data-v-10246aa8></path><path d="M20 12h2" data-v-10246aa8></path><path d="M12 20v2" data-v-10246aa8></path></svg><svg xmlns="http://www.w3.org/2000/svg" class="icon mobile" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" data-v-10246aa8><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-10246aa8></path><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" data-v-10246aa8></path><path d="M6.343 17.657l-1.414 1.414" data-v-10246aa8></path><path d="M6.343 6.343l-1.414 -1.414" data-v-10246aa8></path><path d="M17.657 6.343l1.414 -1.414" data-v-10246aa8></path><path d="M17.657 17.657l1.414 1.414" data-v-10246aa8></path><path d="M4 12h-2" data-v-10246aa8></path><path d="M12 4v-2" data-v-10246aa8></path><path d="M20 12h2" data-v-10246aa8></path><path d="M12 20v2" data-v-10246aa8></path></svg>',2),w=[k],b=(0,r.uE)('<svg xmlns="http://www.w3.org/2000/svg" class="icon desktop" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" data-v-10246aa8><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-10246aa8></path><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" data-v-10246aa8></path></svg><svg xmlns="http://www.w3.org/2000/svg" class="icon mobile" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" data-v-10246aa8><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-10246aa8></path><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" data-v-10246aa8></path></svg>',2),y=[b];var I=(0,r.aZ)({__name:"ThemeSwitcher",setup(t){const e=(0,s.iH)(),a=document.querySelector(":root");(0,r.bv)((()=>{e.value=a.getAttribute("data-theme")}));const n=()=>{"dark"===e.value?(a.setAttribute("data-theme","light"),e.value="light",localStorage.setItem("theme","light")):"light"===e.value&&(a.setAttribute("data-theme","dark"),e.value="dark",localStorage.setItem("theme","dark"))};return(t,a)=>"dark"===e.value?((0,r.wg)(),(0,r.iD)("button",{key:0,class:"btn",onClick:n},w)):((0,r.wg)(),(0,r.iD)("button",{key:1,class:"btn",onClick:n},y))}});const D=(0,m.Z)(I,[["__scopeId","data-v-10246aa8"]]);var C=D;const x=t=>((0,r.dD)("data-v-6e404d92"),t=t(),(0,r.Cn)(),t),S=c+"#tabler-settings",M=c+"#tabler-logout",Z={class:"popup"},j=x((()=>(0,r._)("ul",{class:"list"},[(0,r._)("li",null,[(0,r._)("a",{href:"https://id.findcreek.com?from=mark",target:"_blank"},[(0,r._)("svg",{width:"22",height:"22",viewBox:"0 0 22 22"},[(0,r._)("use",{href:S})]),(0,r._)("span",null,"Настройки")])])],-1))),U=x((()=>(0,r._)("svg",{width:"22",height:"22",viewBox:"0 0 22 22"},[(0,r._)("use",{href:M})],-1))),N=x((()=>(0,r._)("span",null,"Выйти из аккаунта",-1))),T=[U,N];var E=(0,r.aZ)({__name:"Popup",props:{opened:{type:Boolean}},emits:["toggle"],setup(t,{emit:e}){const a=(0,r.f3)("key"),{state:o}=(0,i.oR)(a),s=()=>{localStorage.removeItem("token"),location.href=o.redirectUrl};return(a,o)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.wy)((0,r._)("section",Z,[j,(0,r._)("button",{class:"logout-btn",onClick:s},T)],512),[[n.F8,t.opened]]),(0,r.wy)((0,r._)("div",{class:"backdrop",onClick:o[0]||(o[0]=t=>e("toggle"))},null,512),[[n.F8,t.opened]])],64))}});const O=(0,m.Z)(E,[["__scopeId","data-v-6e404d92"]]);var W=O;const A=t=>((0,r.dD)("data-v-070b540e"),t=t(),(0,r.Cn)(),t),B=c+"#tabler-settings",H=c+"#tabler-logout",P={key:0,class:"mobile-popup"},q={class:"img-wrapper"},z=["src"],$={class:"name"},F=A((()=>(0,r._)("div",{class:"separator"},null,-1))),L=A((()=>(0,r._)("a",{href:"https://id.findcreek.com?from=mark",target:"_blank"},[(0,r._)("svg",{width:"19",height:"19",viewBox:"0 0 19 19"},[(0,r._)("use",{href:B})]),(0,r._)("span",null,"Настройки")],-1))),G=[L],Y=A((()=>(0,r._)("svg",{width:"19",height:"19",viewBox:"0 0 19 19"},[(0,r._)("use",{href:H})],-1))),R=A((()=>(0,r._)("span",null,"Выйти из аккаунта",-1))),K=[Y,R];var X=(0,r.aZ)({__name:"MobilePopup",props:{opened:{type:Boolean},accountInfo:null},emits:["toggle"],setup(t,{emit:e}){const a=(0,r.f3)("key"),{state:s}=(0,i.oR)(a),l=()=>{localStorage.removeItem("token"),location.href=s.redirectUrl},c=(0,o.yj)(),d=(...t)=>t.includes(c.path)?"selected":"";return(a,o)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(n.uT,{name:"mobile-popup"},{default:(0,r.w5)((()=>[t.opened?((0,r.wg)(),(0,r.iD)("section",P,[(0,r._)("div",q,[(0,r._)("img",{src:t.accountInfo.avatar,alt:"Avatar",class:"img"},null,8,z)]),(0,r._)("h6",$,(0,u.zw)(`${t.accountInfo.firstName} ${t.accountInfo.lastName} ${t.accountInfo.patronymic}`),1),F,(0,r._)("ul",null,[(0,r._)("li",{class:(0,u.C_)(d("/settings"))},G,2)]),(0,r._)("button",{class:"logout-btn",onClick:l},K)])):(0,r.kq)("",!0)])),_:1}),(0,r.Wm)(n.uT,{name:"mobile-backdrop"},{default:(0,r.w5)((()=>[t.opened?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"backdrop",onClick:o[0]||(o[0]=t=>e("toggle"))})):(0,r.kq)("",!0)])),_:1})],64))}});const J=(0,m.Z)(X,[["__scopeId","data-v-070b540e"]]);var Q=J;const V=t=>((0,r.dD)("data-v-43641036"),t=t(),(0,r.Cn)(),t),tt=c+"#tabler-chevron-down",et=c+"#tabler-menu-2",at={class:"container"},nt=V((()=>(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 735.77 178"},[(0,r._)("g",{id:"Слой_2","data-name":"Слой 2",stroke:"none"},[(0,r._)("circle",{class:"cls-1",fill:"#269dc6",cx:"75.74",cy:"75.74",r:"75.74"}),(0,r._)("rect",{class:"cls-2",fill:"#085485",y:"102.25",width:"75.74",height:"75.74"}),(0,r._)("rect",{class:"cls-3",fill:"#188bc7",width:"75.74",height:"75.74"}),(0,r._)("rect",{class:"cls-4",fill:"#3cbbed",x:"75.74",width:"75.74",height:"75.74"}),(0,r._)("rect",{class:"cls-5",fill:"#056ca4",y:"75.74",width:"75.74",height:"75.74"}),(0,r._)("path",{fill:"currentColor",d:"M204.69,155.49v-119h22.78l50.66,84H266.06l49.81-84h22.61l.34,119H313l-.17-79.39h4.76l-39.78,66.81H265.38L224.75,76.1h5.78v79.39Z"}),(0,r._)("path",{fill:"currentColor",d:"M351.4,155.49l53-119h27.2l53.21,119H456L412.43,50.43h10.88L379.62,155.49ZM377.92,130l7.31-20.91h61.2L453.91,130Z"}),(0,r._)("path",{fill:"currentColor",d:"M497.26,155.49v-119h51.51q16,0,27.54,5.18a40.43,40.43,0,0,1,17.85,14.88q6.29,9.69,6.29,23.12,0,13.26-6.29,22.86a40,40,0,0,1-17.85,14.71q-11.56,5.1-27.54,5.1H512.56l12.24-12.07v45.22Zm27.54-42.16-12.24-12.92h34.68q12.75,0,19-5.53t6.29-15.21q0-9.86-6.29-15.3t-19-5.44H512.56L524.8,45.84Zm48.11,42.16-29.75-43.18h29.41l30.09,43.18Z"}),(0,r._)("path",{fill:"currentColor",d:"M622.21,155.49v-119h27.37v119Zm24.65-27.2L645.33,96.5l56.95-60h30.6L681.54,91.74l-15.3,16.32Zm56.78,27.2-42.33-51.85,18-19.55,56.44,71.4Z"})])],-1))),ot={class:"primary-nav desktop"},rt={class:"controls desktop"},st=["src"],it={key:1,class:"img"},lt=V((()=>(0,r._)("use",{"xlink:href":tt},null,-1))),ut=[lt],ct={class:"controls mobile"},dt=V((()=>(0,r._)("svg",{height:"24",width:"24",viewBox:"0 0 24 24"},[(0,r._)("use",{href:et})],-1))),pt=[dt];var ht=(0,r.aZ)({__name:"Header",setup(t){const e=(0,r.f3)("key"),{dispatch:a,state:n}=(0,i.oR)(e),o=(0,s.iH)(!1),c=(0,r.Fl)((()=>o.value?"opened":"")),d=(0,s.iH)(null),p=(0,s.iH)(null),h=async()=>{const{response:t,error:e}=await(0,l.ib)({path:"methods/account.getInfo"});e?(console.log(e),a("setError",e)):(d.value=t.additionalData.avatarData.avatarCompressed,p.value={avatar:t.additionalData.avatarData.avatarCompressed,firstName:t.firstName,lastName:t.lastName,patronymic:t.patronymic})};return(0,r.YP)((()=>n.token),h),(0,r.bv)(h),(t,e)=>{const a=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("header",null,[(0,r._)("div",at,[(0,r.Wm)(a,{to:"/",class:"logo"},{default:(0,r.w5)((()=>[nt])),_:1}),(0,r._)("div",ot,[(0,r.Wm)(_)]),(0,r._)("div",rt,[(0,r.Wm)(C),(0,r._)("button",{class:"popup-btn",onClick:e[0]||(e[0]=t=>o.value=!o.value)},[d.value?((0,r.wg)(),(0,r.iD)("img",{key:0,src:d.value,alt:"Avatar",class:"img"},null,8,st)):((0,r.wg)(),(0,r.iD)("div",it)),((0,r.wg)(),(0,r.iD)("svg",{height:"24",width:"24",viewBox:"0 0 24 24",class:(0,u.C_)((0,s.SU)(c))},ut,2))]),(0,r.Wm)(W,{opened:o.value,onToggle:e[1]||(e[1]=t=>o.value=!o.value)},null,8,["opened"])]),(0,r._)("div",ct,[(0,r.Wm)(C),(0,r._)("button",{class:"popup-btn",onClick:e[2]||(e[2]=t=>o.value=!o.value)},pt),p.value?((0,r.wg)(),(0,r.j4)(Q,{key:0,opened:o.value,"account-info":p.value,onToggle:e[3]||(e[3]=t=>o.value=!o.value)},null,8,["opened","account-info"])):(0,r.kq)("",!0)])])])}}});const ft=(0,m.Z)(ht,[["__scopeId","data-v-43641036"]]);var vt=ft;const mt=t=>((0,r.dD)("data-v-e0da0920"),t=t(),(0,r.Cn)(),t),gt=c+"#tabler-users",_t=c+"#tabler-list-check",kt=c+"#tabler-cloud",wt=c+"#tabler-school",bt={class:"mobile-nav"},yt={class:"nav-list"},It={class:"list-item"},Dt=mt((()=>(0,r._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,r._)("use",{href:gt})],-1))),Ct={key:0,class:"list-item"},xt=mt((()=>(0,r._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,r._)("use",{href:_t})],-1))),St={class:"list-item"},Mt=mt((()=>(0,r._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,r._)("use",{href:kt})],-1))),Zt={key:1,class:"list-item"},jt=mt((()=>(0,r._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,r._)("use",{href:wt})],-1))),Ut=mt((()=>(0,r._)("div",{class:"div"},null,-1)));var Nt=(0,r.aZ)({__name:"MobileNav",setup(t){const e=(0,r.f3)("key"),{getters:a}=(0,i.oR)(e),n=(0,o.yj)(),l=(...t)=>t.includes("/")?"/"===n.path||n.path.startsWith("/groupID")?"selected":"":t.some((t=>n.path.startsWith(t)))?"selected":"";return(t,e)=>{const n=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("nav",bt,[(0,r._)("ul",yt,[(0,r._)("li",It,[(0,r.Wm)(n,{to:"/",class:(0,u.C_)(l("/","/groupID"))},{default:(0,r.w5)((()=>[Dt])),_:1},8,["class"])]),(0,s.SU)(a).roles?.includes("teacher")?((0,r.wg)(),(0,r.iD)("li",Ct,[(0,r.Wm)(n,{to:"/attendance/user",class:(0,u.C_)(l("/attendance/user"))},{default:(0,r.w5)((()=>[xt])),_:1},8,["class"])])):(0,r.kq)("",!0),(0,r._)("li",St,[(0,r.Wm)(n,{to:"/cloud",class:(0,u.C_)(l("/cloud"))},{default:(0,r.w5)((()=>[Mt])),_:1},8,["class"])]),(0,s.SU)(a).roles?.includes("administrator_of_institution")?((0,r.wg)(),(0,r.iD)("li",Zt,[(0,r.Wm)(n,{to:"/institution",class:(0,u.C_)(l("/institution"))},{default:(0,r.w5)((()=>[jt])),_:1},8,["class"])])):(0,r.kq)("",!0)])]),Ut],64)}}});const Tt=(0,m.Z)(Nt,[["__scopeId","data-v-e0da0920"]]);var Et=Tt;const Ot={key:0};var Wt=(0,r.aZ)({__name:"App",setup(t){const e=(0,r.f3)("key"),{dispatch:a,state:n,commit:u,getters:c}=(0,i.oR)(e),d=(0,o.yj)();(0,r.bv)((async()=>{if(!location.pathname.startsWith("/auth"))if(localStorage.getItem("token")){const t=localStorage.getItem("token");u("setToken",t)}else if(location.href.startsWith("https://mark.findcreek.com/invitation")&&d.params.id){encodeURI(`https://mark.findcreek.com/auth${d.params.id}`)}})),(0,r.YP)((()=>n.token),(async()=>{n.token&&(await a("fetchUserInfo"),await a("fetchInstituion"),a("useGroups"))}));const p=(0,r.Fl)((()=>!!n.token||location.pathname.startsWith("/auth"))),h=()=>{!c.roles||c.roles.includes("teacher")||c.roles.includes("administrator_of_institution")||console.log("⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡀⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠄⠄⠄⠁⠄⠁⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⣀⣀⣤⣤⣴⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣦⣤⣤⣄⣀⡀⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⣴⣿⣿⡿⣿⢿⣟⣿⣻⣟⡿⣟⣿⣟⡿⣟⣿⣻⣟⣿⣻⢿⣻⡿⣿⢿⣷⣆⠄⠄⠄\n⠄⠄⠄⢘⣿⢯⣷⡿⡿⡿⢿⢿⣷⣯⡿⣽⣞⣷⣻⢯⣷⣻⣾⡿⡿⢿⢿⢿⢯⣟⣞⡮⡀⠄⠄\n⠄⠄⠄⢸⢞⠟⠃⣉⢉⠉⠉⠓⠫⢿⣿⣷⢷⣻⣞⣿⣾⡟⠽⠚⠊⠉⠉⠉⠙⠻⣞⢵⠂⠄⠄\n⠄⠄⠄⢜⢯⣺⢿⣻⣿⣿⣷⣔⡄⠄⠈⠛⣿⣿⡾⠋⠁⠄⠄⣄⣶⣾⣿⡿⣿⡳⡌⡗⡅⠄⠄\n⠄⠄⠄⢽⢱⢳⢹⡪⡞⠮⠯⢯⡻⡬⡐⢨⢿⣿⣿⢀⠐⡥⣻⡻⠯⡳⢳⢹⢜⢜⢜⢎⠆⠄⠄\n⠄⠄⠠⣻⢌⠘⠌⡂⠈⠁⠉⠁⠘⠑⢧⣕⣿⣿⣿⢤⡪⠚⠂⠈⠁⠁⠁⠂⡑⠡⡈⢮⠅⠄⠄\n⠄⠄⠠⣳⣿⣿⣽⣭⣶⣶⣶⣶⣶⣺⣟⣾⣻⣿⣯⢯⢿⣳⣶⣶⣶⣖⣶⣮⣭⣷⣽⣗⠍⠄⠄\n⠄⠄⢀⢻⡿⡿⣟⣿⣻⣽⣟⣿⢯⣟⣞⡷⣿⣿⣯⢿⢽⢯⣿⣻⣟⣿⣻⣟⣿⣻⢿⣿⢀⠄⠄\n⠄⠄⠄⡑⡏⠯⡯⡳⡯⣗⢯⢟⡽⣗⣯⣟⣿⣿⣾⣫⢿⣽⠾⡽⣺⢳⡫⡞⡗⡝⢕⠕⠄⠄⠄\n⠄⠄⠄⢂⡎⠅⡃⢇⠇⠇⣃⣧⡺⡻⡳⡫⣿⡿⣟⠞⠽⠯⢧⣅⣃⠣⠱⡑⡑⠨⢐⢌⠂⠄⠄\n⠄⠄⠄⠐⠼⣦⢀⠄⣶⣿⢿⣿⣧⣄⡌⠂⠢⠩⠂⠑⣁⣅⣾⢿⣟⣷⠦⠄⠄⡤⡇⡪⠄⠄⠄\n⠄⠄⠄⠄⠨⢻⣧⡅⡈⠛⠿⠿⠿⠛⠁⠄⢀⡀⠄⠄⠘⠻⠿⠿⠯⠓⠁⢠⣱⡿⢑⠄⠄⠄⠄\n⠄⠄⠄⠄⠈⢌⢿⣷⡐⠤⣀⣀⣂⣀⢀⢀⡓⠝⡂⡀⢀⢀⢀⣀⣀⠤⢊⣼⡟⡡⡁⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠈⢢⠚⣿⣄⠈⠉⠛⠛⠟⠿⠿⠟⠿⠻⠻⠛⠛⠉⠄⣠⠾⢑⠰⠈⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠑⢌⠿⣦⡡⣱⣸⣸⣆⠄⠄⠄⣰⣕⢔⢔⠡⣼⠞⡡⠁⠁⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠑⢝⢷⣕⡷⣿⡿⠄⠄⠠⣿⣯⣯⡳⡽⡋⠌⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢮⣿⣽⣯⠄⠄⢨⣿⣿⡷⡫⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠙⠝⠂⠄⢘⠋⠃⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄\n⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄")};(0,r.YP)((()=>c.roles),h);const f=(0,s.iH)("");return(0,r.YP)((()=>n.errorsCount),(()=>f.value=n.error.error_msg)),(t,e)=>{const a=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(vt),(0,r.Wm)((0,s.SU)(l.bZ),{text:f.value,observer:(0,s.SU)(n).errorsCount},null,8,["text","observer"]),(0,s.SU)(p)?((0,r.wg)(),(0,r.iD)("div",Ot,[(0,r.Wm)(a)])):((0,r.wg)(),(0,r.j4)((0,s.SU)(l.aN),{key:1})),(0,r.Wm)(Et)],64)}}});const At=Wt;var Bt=At,Ht=a(933);const Pt=()=>a.e(40).then(a.bind(a,40)),qt=()=>a.e(261).then(a.bind(a,261)),zt=()=>Promise.all([a.e(963),a.e(804)]).then(a.bind(a,804)),$t=()=>Promise.all([a.e(963),a.e(60)]).then(a.bind(a,60)),Ft=()=>a.e(955).then(a.bind(a,955)),Lt=()=>a.e(336).then(a.bind(a,336)),Gt=()=>a.e(4).then(a.bind(a,4)),Yt=()=>a.e(328).then(a.bind(a,328)),Rt=()=>a.e(459).then(a.bind(a,459)),Kt=()=>Promise.all([a.e(53),a.e(383)]).then(a.bind(a,383)),Xt=()=>Promise.all([a.e(53),a.e(756)]).then(a.bind(a,756)),Jt=()=>Promise.all([a.e(53),a.e(707)]).then(a.bind(a,707)),Qt=()=>Promise.all([a.e(53),a.e(55)]).then(a.bind(a,55)),Vt=[{path:"/",component:Pt},{path:"/groupID/:groupID",component:Pt},{path:"/cloud",component:qt},{path:"/cloud/groups/:groupID/:folderID",component:zt},{path:"/cloud/groups/:groupID",component:zt},{path:"/cloud/groups",component:zt},{path:"/cloud/private",component:$t},{path:"/announcements",component:Gt},{path:"/institution",component:Ft},{path:"/invitation/:id",component:Yt},{path:"/profile",component:Gt},{path:"/friends",component:Gt},{path:"/support",component:Gt},{path:"/settings",component:Gt},{path:"/works",component:Gt},{path:"/auth",component:Rt},{path:"/auth/:id",component:Rt},{path:"/new-report/:groupID",component:Kt},{path:"/new-report",component:Kt},{path:"/attendance/group/:groupID",component:Xt},{path:"/attendance/group",component:Xt},{path:"/attendance/user/:userID",component:Xt},{path:"/attendance/user",component:Xt},{path:"/report/:reportID",component:Jt},{path:"/edit-report/:reportID",component:Qt},{path:"/:pathMatch(.*)*",component:Lt}];var te=Vt;const ee=t=>localStorage.getItem("theme")?localStorage.getItem("theme")===t:window.matchMedia(`(prefers-color-scheme: ${t})`).matches,ae=document.querySelector(":root");ee("light")?ae.setAttribute("data-theme","light"):ee("dark")&&ae.setAttribute("data-theme","dark");const ne=Symbol(),oe=(0,o.p7)({routes:te,history:(0,o.PO)()});(0,n.ri)(Bt).provide("key",ne).use(oe).use(Ht.h,ne).mount("#app")},235:function(t,e,a){a.d(e,{bZ:function(){return $},Ct:function(){return f},XZ:function(){return x},aN:function(){return X},H_:function(){return lt},n5:function(){return O},to:function(){return H},ib:function(){return r},TL:function(){return l}});var n=a(933);const o=async({path:t,data:e,formData:a,url:o})=>{if("undefined"===typeof o&&(o="https://api.findcreek.com"),a){if(!n.h.state.token)return null;a.append("token",`${n.h.state.token}`);try{const e=await fetch(`${o}/${t}/`,{method:"POST",body:a}),n=await e.json();return n}catch(r){return{error:{error_code:"6",error_msg:"Ошибка загрузки данных"}}}}else{const a=new FormData;if(!n.h.state.token)return null;if(a.append("token",`${n.h.state.token}`),e)for(let[t,n]of Object.entries(e))a.append(t,n);try{const e=await fetch(`${o}/${t}/`,{method:"POST",body:a}),n=await e.json();return n}catch(r){return{error:{error_code:"6",error_msg:"Ошибка загрузки данных"}}}}};var r=o,s=a(262);const i=()=>{const t=(0,s.iH)(null),e=async({userIds:e,excludeIds:a})=>{const{response:o,error:s}=await r({path:"methods/users.getInfo",data:{userIds:e}});return s?(n.h.dispatch("setError",s),console.log(s),null):(t.value=o.map((t=>({uid:+t.id,fullName:`${t.lastName} ${t.firstName} ${t.patronymic}`,avatar:t.additionalData.avatarData.avatarCompressed}))).filter((t=>!a||!a.includes(t.uid))),t.value)};return{users:t,fetchUsers:e}};var l=i,u=a(252),c=a(577),d=(0,u.aZ)({__name:"Badge",props:{text:null},setup(t){return(e,a)=>((0,u.wg)(),(0,u.iD)("p",null,[(0,u._)("span",null,(0,c.zw)(t.text),1)]))}}),p=a(744);const h=(0,p.Z)(d,[["__scopeId","data-v-7e500cd8"]]);var f=h,v=a(963),m=a(562);const g=t=>((0,u.dD)("data-v-bf6a17a6"),t=t(),(0,u.Cn)(),t),_=m+"#tabler-check",k={class:"field"},w={width:"22",height:"22",viewBox:"0 0 22 22"},b=g((()=>(0,u._)("use",{href:_},null,-1))),y=[b],I={key:0};var D=(0,u.aZ)({__name:"Checkbox",props:{title:null,state:{type:Boolean}},emits:["toggle"],setup(t,{emit:e}){return(a,n)=>((0,u.wg)(),(0,u.iD)("button",{class:"checkbox",onClick:n[0]||(n[0]=t=>e("toggle"))},[(0,u._)("div",k,[(0,u.wy)(((0,u.wg)(),(0,u.iD)("svg",w,y,512)),[[v.F8,t.state]])]),t.title?((0,u.wg)(),(0,u.iD)("p",I,(0,c.zw)(t.title),1)):(0,u.kq)("",!0)]))}});const C=(0,p.Z)(D,[["__scopeId","data-v-bf6a17a6"]]);var x=C;const S={class:"group-user"},M=["src"],Z={class:"wrapper"},j={class:"name"},U={class:"desktop-badge"},N={key:0,class:"mobile-badge"};var T=(0,u.aZ)({__name:"User",props:{avatar:null,fullName:null,uid:null,badgeText:null,hideOnShrink:{type:Boolean}},setup(t){return(e,a)=>((0,u.wg)(),(0,u.iD)("section",null,[(0,u._)("div",S,[""===t.avatar?((0,u.wg)(),(0,u.iD)("div",{key:0,class:(0,c.C_)(["avatar",t.hideOnShrink?"hide":""])},null,2)):((0,u.wg)(),(0,u.iD)("img",{key:1,src:t.avatar,alt:"Avatar",class:(0,c.C_)(["avatar",t.hideOnShrink?"hide":""])},null,10,M)),(0,u._)("div",Z,[(0,u._)("p",j,(0,c.zw)(t.fullName),1),(0,u._)("div",U,[t.badgeText?((0,u.wg)(),(0,u.j4)((0,s.SU)(f),{key:0,text:t.badgeText},null,8,["text"])):(0,u.kq)("",!0)]),t.badgeText?((0,u.wg)(),(0,u.iD)("div",N,(0,c.zw)(t.badgeText),1)):(0,u.kq)("",!0)])])]))}});const E=(0,p.Z)(T,[["__scopeId","data-v-46873a50"]]);var O=E;const W={key:0,class:"users-list"};var A=(0,u.aZ)({__name:"UsersList",props:{users:null,checkStatus:null},setup(t){const e=t,{users:a,fetchUsers:n}=l();(0,u.bv)((()=>{e.users&&0!==e.users.length&&(Array.isArray(e.users)?n({userIds:e.users.join(", ")}):n({userIds:Object.values(e.users).join(", ")}))})),(0,u.YP)((()=>e.users),(()=>{e.users&&(0===e.users.length?a.value=[]:Array.isArray(e.users)?n({userIds:e.users.join(", ")}):n({userIds:Object.values(e.users).join(", ")}))}));const o=(0,u.Fl)((()=>{if(null===a.value)return null;function t(t,e){return t.fullName<e.fullName?-1:t.fullName>e.fullName?1:0}return[...a.value].sort(t)}));return(e,n)=>(0,s.SU)(a)&&(0,s.SU)(a).length>0?((0,u.wg)(),(0,u.iD)("ul",W,[((0,u.wg)(!0),(0,u.iD)(u.HY,null,(0,u.Ko)((0,s.SU)(o),(e=>((0,u.wg)(),(0,u.iD)("li",{key:e.uid,class:"user"},[(0,u.Wm)(O,{avatar:e.avatar,"full-name":e.fullName,uid:e.uid,"badge-text":t.checkStatus?t.checkStatus(e.uid):void 0},null,8,["avatar","full-name","uid","badge-text"])])))),128))])):(0,u.kq)("",!0)}});const B=(0,p.Z)(A,[["__scopeId","data-v-4e16d091"]]);var H=B;const P=["title"];var q=(0,u.aZ)({__name:"Alert",props:{text:null,observer:null},setup(t){const e=t,a=(0,s.iH)(!0),n=()=>{a.value=!0},o=()=>{a.value=!1,setTimeout(n,4e3)};return(0,u.ic)(o),(0,u.YP)((()=>e.text),o),(e,o)=>((0,u.wg)(),(0,u.j4)(v.uT,{name:"alert-animation"},{default:(0,u.w5)((()=>[(0,u.wy)((0,u._)("button",{class:"alert",onClick:n,title:t.text},[(0,u._)("span",null,(0,c.zw)(t.text),1)],8,P),[[v.F8,!a.value]])])),_:1}))}});const z=(0,p.Z)(q,[["__scopeId","data-v-51c92259"]]);var $=z;const F=t=>((0,u.dD)("data-v-525ef34e"),t=t(),(0,u.Cn)(),t),L=F((()=>(0,u._)("div",{class:"lds-dual-ring"},null,-1))),G=[L];function Y(t,e){return(0,u.wg)(),(0,u.iD)("main",null,G)}const R={},K=(0,p.Z)(R,[["render",Y],["__scopeId","data-v-525ef34e"]]);var X=K,J=a(907);const Q=t=>((0,u.dD)("data-v-2588af38"),t=t(),(0,u.Cn)(),t),V=m+"#tabler-trash",tt=["src"],et={class:"name"},at=Q((()=>(0,u._)("svg",{width:"24",height:"24",viewBox:"0 0 24 24"},[(0,u._)("use",{href:V})],-1))),nt=[at],ot={key:1,class:"modal"},rt={class:"button-wrapper"};var st=(0,u.aZ)({__name:"Robot",props:{fullName:null,robotID:null,withOptions:{type:Boolean}},emits:["delete"],setup(t,{emit:e}){const a=(0,u.f3)("key"),{state:n}=(0,J.oR)(a),o=(0,s.iH)(!1);return(a,r)=>((0,u.wg)(),(0,u.iD)("div",{class:(0,c.C_)(["robot",t.withOptions?"with-options":""])},[(0,u._)("img",{src:(0,s.SU)(n).defaultAvatar,alt:"Avatar",class:"avatar"},null,8,tt),(0,u._)("p",et,(0,c.zw)(t.fullName),1),t.withOptions?((0,u.wg)(),(0,u.iD)("button",{key:0,class:"button",onClick:r[0]||(r[0]=t=>o.value=!o.value)},nt)):(0,u.kq)("",!0),o.value?((0,u.wg)(),(0,u.iD)("div",ot,[(0,u._)("h6",null,"Удалить робота "+(0,c.zw)(t.fullName)+"?",1),(0,u._)("div",rt,[(0,u._)("button",{class:"button-fill",onClick:r[1]||(r[1]=t=>o.value=!1)},"Отмена"),(0,u._)("button",{class:"button-hollow",onClick:r[2]||(r[2]=a=>e("delete",t.robotID))},"Удалить")])])):(0,u.kq)("",!0),o.value?((0,u.wg)(),(0,u.iD)("div",{key:2,class:"backdrop",onClick:r[3]||(r[3]=t=>o.value=!1)})):(0,u.kq)("",!0)],2))}});const it=(0,p.Z)(st,[["__scopeId","data-v-2588af38"]]);var lt=it},933:function(t,e,a){a.d(e,{h:function(){return r}});var n=a(235),o=a(907);const r=(0,o.MT)({state:{userInfo:null,token:null,institution:null,error:{error_code:0,error_msg:""},redirectUrl:`https://id.findcreek.com/auth/?redirectTo=${encodeURIComponent("https://mark.findcreek.com/auth")}`,errorsCount:0,redirectDomain:"https://id.findcreek.com/auth/?redirectTo=",defaultAvatar:"https://findcreek.com/assets/img/unknown-user.png",groups:[]},mutations:{setUserInfo(t,e){t.userInfo=e},setToken(t,e){t.token=e},setInstitution(t,e){t.institution=e},setError(t,e){t.error=e},incrementError(t){t.errorsCount+=1},setGroupInfo(t,e){const a=[...e];t.groups.forEach((t=>{a.find((e=>e.groupID===t.groupID))||a.push(t)})),t.groups=a}},getters:{roles(t){return t.userInfo?t.userInfo.additionalData.roles:null},IID(t){return t.userInfo?t.userInfo.institutionData.institutionID:null},getGroups(t){return e=>null===e?null:"number"===typeof e?t.groups.find((t=>t.groupID===e))??null:t.groups.filter((t=>e.includes(t.groupID)))??null}},actions:{async fetchInstituion({commit:t,getters:e,state:a}){if(!e.IID)return;const{response:o,error:r}=await(0,n.ib)({path:"markMethods/institution.getInfo",data:{institutionID:e.IID}});r?(t("setError",r),t("incrementError"),console.log(r)):t("setInstitution",o)},async fetchUserInfo({commit:t,state:e}){const{response:a,error:o}=await(0,n.ib)({path:"markMethods/account.getInfo"});o?(t("setError",o),t("incrementError"),console.log(o)):t("setUserInfo",{id:a.findcreekID,additionalData:a.additionalData,institutionData:a.institutionData,portfolio:a.portfolio})},useGroups({state:t,getters:e,dispatch:a}){const n=e.roles.includes("administrator_of_institution");if(n&&t.institution)return void a("fetchGroupsInfo",t.institution.groups);const o=e.roles.includes("teacher");if(o&&t.userInfo){const e=[...t.userInfo.additionalData.inGroups,...t.userInfo.additionalData.ownGroups];a("fetchGroupsInfo",e)}else t.userInfo?.additionalData.inGroups.length&&a("fetchGroupsInfo",t.userInfo.additionalData.inGroups[0])},async fetchGroupsInfo({commit:t},e){const{response:a,error:o}=await(0,n.ib)({path:"markMethods/group.getInfo",data:{groupsIDs:e}});o?(t("setError",o),t("incrementError"),console.log(o)):t("setGroupInfo",a)},setError({commit:t},e){t("incrementError"),t("setError",e)}}})},562:function(t,e,a){t.exports=a.p+"img/tabler-sprite.cc91f0a0.svg"}},e={};function a(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,n,o,r){if(!n){var s=1/0;for(c=0;c<t.length;c++){n=t[c][0],o=t[c][1],r=t[c][2];for(var i=!0,l=0;l<n.length;l++)(!1&r||s>=r)&&Object.keys(a.O).every((function(t){return a.O[t](n[l])}))?n.splice(l--,1):(i=!1,r<s&&(s=r));if(i){t.splice(c--,1);var u=o();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[n,o,r]}}(),function(){a.d=function(t,e){for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){a.f={},a.e=function(t){return Promise.all(Object.keys(a.f).reduce((function(e,n){return a.f[n](t,e),e}),[]))}}(),function(){a.u=function(t){return"js/"+t+"."+{4:"f1d8b1e2",40:"8bbf0bed",53:"370b6acc",55:"f1677138",60:"d3439449",261:"4b857241",328:"8d78aad7",336:"33235a8d",383:"62fe9ff3",459:"f9893f26",707:"dca38ed3",756:"613de335",804:"da815f0f",955:"c1f0aa7f",963:"6a1eecfa"}[t]+".js"}}(),function(){a.miniCssF=function(t){return"css/"+t+"."+{4:"e2d0b2c6",40:"e93da2bb",53:"84c7a1e5",55:"4f96ead7",60:"272a6f30",328:"4ba5e386",336:"f5e125b3",383:"19fe6fe3",707:"8c922df1",756:"568295a6",804:"75e7984f",955:"b6d9a7ec",963:"d44e91ee"}[t]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="mark:";a.l=function(n,o,r,s){if(t[n])t[n].push(o);else{var i,l;if(void 0!==r)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==e+r){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",e+r),i.src=n),t[n]=[o];var p=function(e,a){i.onerror=i.onload=null,clearTimeout(h);var o=t[n];if(delete t[n],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(t){return t(a)})),e)return e(a)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var t=function(t,e,a,n){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var r=function(r){if(o.onerror=o.onload=null,"load"===r.type)a();else{var s=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.href||e,l=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,o.parentNode.removeChild(o),n(l)}};return o.onerror=o.onload=r,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===t||r===e))return o}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){o=s[n],r=o.getAttribute("data-href");if(r===t||r===e)return o}},n=function(n){return new Promise((function(o,r){var s=a.miniCssF(n),i=a.p+s;if(e(s,i))return o();t(n,i,o,r)}))},o={143:0};a.f.miniCss=function(t,e){var a={4:1,40:1,53:1,55:1,60:1,328:1,336:1,383:1,707:1,756:1,804:1,955:1,963:1};o[t]?e.push(o[t]):0!==o[t]&&a[t]&&e.push(o[t]=n(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={143:0};a.f.j=function(e,n){var o=a.o(t,e)?t[e]:void 0;if(0!==o)if(o)n.push(o[2]);else{var r=new Promise((function(a,n){o=t[e]=[a,n]}));n.push(o[2]=r);var s=a.p+a.u(e),i=new Error,l=function(n){if(a.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var r=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,o[1](i)}};a.l(s,l,"chunk-"+e,e)}},a.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,r,s=n[0],i=n[1],l=n[2],u=0;if(s.some((function(e){return 0!==t[e]}))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(l)var c=l(a)}for(e&&e(n);u<s.length;u++)r=s[u],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(c)},n=self["webpackChunkmark"]=self["webpackChunkmark"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(776)}));n=a.O(n)})();
//# sourceMappingURL=app.a0aea639.js.map
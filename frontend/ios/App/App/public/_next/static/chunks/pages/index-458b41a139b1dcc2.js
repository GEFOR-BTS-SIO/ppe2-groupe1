(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(2603)}])},2603:function(e,s,t){"use strict";t.r(s);var n=t(5893),r=t(7294),i=t(1163),a=t(7536),o=t(6154);let u=()=>{let[e,s]=(0,r.useState)(""),[t,u]=(0,r.useState)(!1),[d,c]=(0,r.useState)(""),{register:l,handleSubmit:h,formState:{errors:p}}=(0,a.cI)(),x=(0,i.useRouter)(),j=async e=>{try{let s=await o.Z.post("http://localhost:8000/api/login_check",{username:e.username,password:e.password});localStorage.setItem("token",s.data.token),u(!0),c(s.data.token),x.push("/test2")}catch(e){s(e.message)}},w=()=>{u(!1),x.push("/login")};return(0,n.jsxs)("div",{children:[!t&&(0,n.jsxs)("form",{onSubmit:h(j),children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Username:"}),(0,n.jsx)("input",{type:"text",...l("username",{required:!0})}),p.username&&(0,n.jsx)("span",{children:"Username is required"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Password:"}),(0,n.jsx)("input",{type:"password",...l("password",{required:!0})}),p.password&&(0,n.jsx)("span",{children:"Password is required"})]}),(0,n.jsx)("div",{children:(0,n.jsx)("button",{type:"submit",children:"Login"})}),e&&(0,n.jsx)("div",{children:e})]}),t&&(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:"You are logged in!"}),(0,n.jsx)("button",{onClick:w,children:"Logout"})]})]})};s.default=u},1163:function(e,s,t){e.exports=t(6885)}},function(e){e.O(0,[356,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);
"use strict";(self.webpackChunkanonymous=self.webpackChunkanonymous||[]).push([[737],{2737:(q,g,e)=>{e.r(g),e.d(g,{SignupModule:()=>j});var d=e(8583),s=e(3679),m=e(8295),c=e(9983),S=e(2522),f=e(6627),h=e(1095),T=e(7441),y=e(3220),A=e(2458),Z=e(3738),v=e(4470),p=e(2305),O=e(1312),t=e(7716),b=e(3902),x=e(2290);function C(n,r){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Username is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function U(n,r){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function M(n,r){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Minimum length of password is 3 "),t.qZA())}class I{isErrorState(r,i){return!!(r&&r.invalid&&(r.dirty||r.touched||i&&i.submitted))}}const J=[{path:"",component:(()=>{class n{constructor(i,o,a){this.authService=i,this.toastr=o,this.router=a,this.hide=!0,this.form=new s.cw({email:new s.NI(null,[s.kI.required]),password:new s.NI(null,[s.kI.required,s.kI.minLength(5)])}),this.spinnerButtonOptions=Object.assign(Object.assign({},O.Fx),{text:"Submit"}),this.matcher=new I}ngOnInit(){}onSubmit(){this.form.invalid?console.log("form is invalid"):(this.spinnerButtonOptions=Object.assign(Object.assign({},this.spinnerButtonOptions),{active:!0}),console.log(this.form.value),this.authService.signup(`${this.form.value.email}@example.com`,this.form.value.password).subscribe(a=>{console.log(a);let u=a.email.split("@")[0];console.log(u),this.spinnerButtonOptions=Object.assign(Object.assign({},this.spinnerButtonOptions),{active:!1}),this.toastr.success("Signup successfull"),this.router.navigateByUrl("/profile")},a=>{this.spinnerButtonOptions=Object.assign(Object.assign({},this.spinnerButtonOptions),{active:!1}),console.log(a);let l="Error signin up";"EMAIL_EXISTS"===a.error.error.message&&(l="This username already exists"),this.toastr.error(l)}))}}return n.\u0275fac=function(i){return new(i||n)(t.Y36(b.$),t.Y36(x._W),t.Y36(p.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-signup"]],decls:29,vars:10,consts:[[1,"wrapper"],[1,"card"],[1,"card-body"],[1,"example-form",3,"formGroup","ngSubmit"],[1,"text-muted",2,"text-align","center"],[1,"example-full-width"],["type","text","matInput","","formControlName","email","placeholder","pat@example.com",3,"errorStateMatcher"],[4,"ngIf"],[2,"display","block"],["appearance","standard",1,"example-full-width"],["matInput","","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],[1,"row"],[1,"col-6"],[3,"options"]],template:function(i,o){if(1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"mat-card"),t.TgZ(3,"div"),t.TgZ(4,"div",2),t.TgZ(5,"form",3),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(6,"h1"),t._uU(7,"Signup"),t.qZA(),t.TgZ(8,"p",4),t._uU(9," Register your account "),t.qZA(),t.TgZ(10,"mat-form-field",5),t.TgZ(11,"mat-label"),t._uU(12,"Username"),t.qZA(),t._UZ(13,"input",6),t.YNc(14,C,4,0,"mat-error",7),t.qZA(),t._UZ(15,"div",8),t.TgZ(16,"mat-form-field",9),t.TgZ(17,"mat-label"),t._uU(18,"Enter your password"),t.qZA(),t._UZ(19,"input",10),t.TgZ(20,"button",11),t.NdJ("click",function(){return o.hide=!o.hide}),t.TgZ(21,"mat-icon"),t._uU(22),t.qZA(),t.qZA(),t.YNc(23,U,4,0,"mat-error",7),t.YNc(24,M,2,0,"mat-error",7),t.qZA(),t._UZ(25,"div",8),t.TgZ(26,"div",12),t.TgZ(27,"div",13),t._UZ(28,"mat-spinner-button",14),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&i){let a,u,l;t.xp6(5),t.Q6J("formGroup",o.form),t.xp6(8),t.Q6J("errorStateMatcher",o.matcher),t.xp6(1),t.Q6J("ngIf",null==(a=o.form.get("email"))?null:a.hasError("required")),t.xp6(5),t.Q6J("type",o.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",o.hide),t.xp6(2),t.Oqu(o.hide?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",null==(u=o.form.get("password"))?null:u.hasError("required")),t.xp6(1),t.Q6J("ngIf",(null==(l=o.form.get("password"))?null:l.hasError("minlength"))&&!(null!=(l=o.form.get("password"))&&l.hasError("required"))),t.xp6(4),t.Q6J("options",o.spinnerButtonOptions)}},directives:[Z.a8,s._Y,s.JL,s.sg,m.KE,m.hX,c.Nt,s.Fj,s.JJ,s.u,d.O5,h.lW,m.R9,f.Hw,v.cT,m.TO],styles:[".card[_ngcontent-%COMP%]{padding:5rem;display:flex;justify-content:center;align-items:center}mat-card[_ngcontent-%COMP%]{padding:4rem}h1[_ngcontent-%COMP%]{display:block;font-size:2em;margin-block-start:.67em;margin-block-end:.67em;margin-inline-start:0px;margin-inline-end:0px;text-align:center}h3[_ngcontent-%COMP%]{text-align:center;font-size:1.5em}@media screen and (max-width: 768px){.card[_ngcontent-%COMP%]{padding:0;height:80vh}}"]}),n})()}];let B=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.Bz.forChild(J)],p.Bz]}),n})(),j=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[d.ez,B,s.UX,S.g0,A.XK,Z.QW,f.Ps,h.ot,T.LD,y.FA,m.lN,c.c,v.mk]]}),n})()}}]);
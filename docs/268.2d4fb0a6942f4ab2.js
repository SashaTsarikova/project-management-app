"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[268],{9268:(R,g,i)=>{i.r(g),i.d(g,{UserModule:()=>w});var v=i(5272),p=i(1083),c=i(3900),f=i(9300),o=i(3075),h=i(5446),t=i(5e3),x=i(427),C=i(236),O=i(7906),U=i(7232),Z=i(6518),u=i(7322),b=i(7531),T=i(9808),M=i(7423),A=i(5245);function y(e,s){if(1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Oqu(r.getErrorMessage())}}function E(e,s){if(1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Oqu(r.getErrorMessage())}}function S(e,s){if(1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Oqu(r.getErrorMessage())}}function _(e,s){if(1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Oqu(r.getErrorMessage())}}const P=[{path:"",component:(()=>{class e{constructor(r,n,a,d,l,m,I){this.userService=r,this.fb=n,this.err=a,this.dialogService=d,this.router=l,this.translate=m,this.auth=I,this.hide=!0,this.submitType={edit:"edit",delete:"delete"}}ngOnInit(){this.updateUserForm=this.fb.group({login:["",o.kI.required],name:["",o.kI.required],password:["",o.kI.required],repeatpass:["",o.kI.required]}),this.userService.currentUserId().pipe((0,c.w)(r=>this.userService.getUserById(r))).subscribe(r=>{this.currentUser=r,this.updateUserForm.controls.login.setValue(this.currentUser.login),this.updateUserForm.controls.name.setValue(this.currentUser.name)})}getErrorMessage(){return this.translate.instant("USER.REQUIRED")}onLogOut(){this.dialogService.open(h.S,{data:`${this.translate.instant("USER.DELETE-DATA")}`}).afterClosed().pipe((0,f.h)(n=>n),(0,c.w)(()=>this.userService.deleteUserById(this.currentUser.id))).subscribe(()=>this.auth.logout())}onSubmit(r){var n,a;if(this.updateUserForm.value){if((null===(n=this.updateUserForm.get("password"))||void 0===n?void 0:n.value)!==(null===(a=this.updateUserForm.get("repeatpass"))||void 0===a?void 0:a.value))return void this.err.errorHandler(this.translate.instant("USER.NOT-MATCH"));delete this.updateUserForm.value.repeatpass,r===this.submitType.edit&&this.dialogService.open(h.S,{data:`${this.translate.instant("USER.UPDATE-DATA")}`}).afterClosed().pipe((0,f.h)(l=>l),(0,c.w)(()=>this.userService.updateUserById(this.currentUser.id,this.updateUserForm.value))).subscribe(l=>{this.userService.updateUser(l.login),this.router.navigate(["/boards"])}),r===this.submitType.delete&&this.onLogOut()}}}return e.\u0275fac=function(r){return new(r||e)(t.Y36(x.K),t.Y36(o.qu),t.Y36(C.q),t.Y36(O.x),t.Y36(p.F0),t.Y36(U.sK),t.Y36(Z.e))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-user"]],decls:47,vars:36,consts:[[1,"main-container","colored-bg"],[1,"edit-container","edit-form"],[1,"edit_greeting"],[1,"user-form",3,"formGroup"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],[1,"email-container"],["matInput","","type","text","placeholder","login","formControlName","login","required",""],[1,"password-container"],["matInput","","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["matInput","","formControlName","repeatpass",3,"type"],[1,"edit_buttons"],["name","button_delete","mat-raised-button","","color","accent",1,"edit_button",3,"disabled","click"],["name","button_upgrade","mat-raised-button","","color","primary",1,"edit_button",3,"disabled","click"]],template:function(r,n){if(1&r&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"p"),t._uU(4),t.ALo(5,"translate"),t.qZA()(),t.TgZ(6,"form",3)(7,"mat-form-field",4)(8,"mat-label"),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"input",5),t.YNc(12,y,2,1,"mat-error",6),t.qZA(),t.TgZ(13,"div",7)(14,"mat-form-field",4)(15,"mat-label"),t._uU(16),t.ALo(17,"translate"),t.qZA(),t._UZ(18,"input",8),t.YNc(19,E,2,1,"mat-error",6),t.qZA()(),t.TgZ(20,"div",9)(21,"mat-form-field",4)(22,"mat-label"),t._uU(23),t.ALo(24,"translate"),t.qZA(),t._UZ(25,"input",10),t.TgZ(26,"button",11),t.NdJ("click",function(){return n.hide=!n.hide}),t.TgZ(27,"mat-icon"),t._uU(28),t.qZA()(),t.YNc(29,S,2,1,"mat-error",6),t.qZA()(),t.TgZ(30,"div",9)(31,"mat-form-field",4)(32,"mat-label"),t._uU(33),t.ALo(34,"translate"),t.qZA(),t._UZ(35,"input",12),t.TgZ(36,"button",11),t.NdJ("click",function(){return n.hide=!n.hide}),t.TgZ(37,"mat-icon"),t._uU(38),t.qZA()(),t.YNc(39,_,2,1,"mat-error",6),t.qZA()(),t.TgZ(40,"div",13)(41,"button",14),t.NdJ("click",function(){return n.onSubmit(n.submitType.delete)}),t._uU(42),t.ALo(43,"translate"),t.qZA(),t.TgZ(44,"button",15),t.NdJ("click",function(){return n.onSubmit(n.submitType.edit)}),t._uU(45),t.ALo(46,"translate"),t.qZA()()()()()),2&r){let a,d,l,m;t.xp6(4),t.Oqu(t.lcZ(5,22,"USER.TITLE")),t.xp6(2),t.Q6J("formGroup",n.updateUserForm),t.xp6(3),t.Oqu(t.lcZ(10,24,"USER.NAME")),t.xp6(3),t.Q6J("ngIf",null==(a=n.updateUserForm.get("name"))?null:a.hasError("required")),t.xp6(4),t.Oqu(t.lcZ(17,26,"USER.LOGIN")),t.xp6(3),t.Q6J("ngIf",null==(d=n.updateUserForm.get("login"))?null:d.hasError("required")),t.xp6(4),t.Oqu(t.lcZ(24,28,"USER.PASSWORD")),t.xp6(2),t.Q6J("type",n.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",n.hide),t.xp6(2),t.Oqu(n.hide?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",null==(l=n.updateUserForm.get("password"))?null:l.hasError("required")),t.xp6(4),t.Oqu(t.lcZ(34,30,"USER.REPASS")),t.xp6(2),t.Q6J("type",n.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",n.hide),t.xp6(2),t.Oqu(n.hide?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",null==(m=n.updateUserForm.get("repeatpass"))?null:m.hasError("required")),t.xp6(2),t.Q6J("disabled",n.updateUserForm.invalid),t.xp6(1),t.Oqu(t.lcZ(43,32,"USER.DELETE")),t.xp6(2),t.Q6J("disabled",n.updateUserForm.invalid),t.xp6(1),t.Oqu(t.lcZ(46,34,"USER.BUTTON"))}},directives:[o._Y,o.JL,o.sg,u.KE,u.hX,b.Nt,o.Fj,o.JJ,o.u,T.O5,u.TO,o.Q7,M.lW,u.R9,A.Hw],pipes:[U.X$],styles:[".main-container[_ngcontent-%COMP%]{min-height:79vh;display:flex;align-items:center;justify-content:center}.main-container[_ngcontent-%COMP%]   .edit-form[_ngcontent-%COMP%]{color:#ebf6e9;font-size:1.1rem;line-height:1.15rem;width:30%;min-width:330px;max-width:500px;min-height:25vw;display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:space-between;background:#47c383;border-top-right-radius:3%;padding:2%}.main-container[_ngcontent-%COMP%]   .edit_greeting[_ngcontent-%COMP%]{text-transform:uppercase;font-style:normal;font-weight:700;font-size:26px;line-height:28px;text-align:center;letter-spacing:.2rem}.main-container[_ngcontent-%COMP%]   .edit_greeting[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child:first-letter{text-transform:uppercase}.main-container[_ngcontent-%COMP%]   .edit-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}.main-container[_ngcontent-%COMP%]   .edit_buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;gap:20px}.main-container[_ngcontent-%COMP%]   .edit_button[_ngcontent-%COMP%]{width:100%;height:auto;border-radius:30px;padding:5px 0}.main-container[_ngcontent-%COMP%]   .edit_sign-up-link[_ngcontent-%COMP%]{padding-top:10px}@media (max-width: 1024px) and (orientation: landscape){.main-container[_ngcontent-%COMP%]   .edit-form[_ngcontent-%COMP%]{margin:5vmax 0;width:45%}}@media (max-width: 1024px) and (orientation: portrait){.main-container[_ngcontent-%COMP%]   .edit-form[_ngcontent-%COMP%]{width:60%;padding:5%}}"]}),e})()}];let q=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[p.Bz.forChild(P)],p.Bz]}),e})(),w=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[q,v.m]]}),e})()}}]);
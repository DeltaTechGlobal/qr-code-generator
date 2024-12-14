(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5920:function(e,a,t){Promise.resolve().then(t.bind(t,5329))},5329:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return ef}});var s=t(7437),r=t(2265),l=t(1657);let n=r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("div",{ref:a,className:(0,l.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...r})});n.displayName="Card",r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("div",{ref:a,className:(0,l.cn)("flex flex-col space-y-1.5 p-6",t),...r})}).displayName="CardHeader",r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("h3",{ref:a,className:(0,l.cn)("text-2xl font-semibold leading-none tracking-tight",t),...r})}).displayName="CardTitle",r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("p",{ref:a,className:(0,l.cn)("text-sm text-muted-foreground",t),...r})}).displayName="CardDescription";let o=r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("div",{ref:a,className:(0,l.cn)("p-6 pt-0",t),...r})});o.displayName="CardContent",r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("div",{ref:a,className:(0,l.cn)("flex items-center p-6 pt-0",t),...r})}).displayName="CardFooter";var i=t(6337),c=t(3523),d=t(2442);let m=i.fC;i.ZA;let h=i.B4,p=r.forwardRef((e,a)=>{let{className:t,children:r,...n}=e;return(0,s.jsxs)(i.xz,{ref:a,className:(0,l.cn)("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),...n,children:[r,(0,s.jsx)(i.JO,{asChild:!0,children:(0,s.jsx)(c.Z,{className:"h-4 w-4 opacity-50"})})]})});p.displayName=i.xz.displayName;let u=r.forwardRef((e,a)=>{let{className:t,children:r,position:n="popper",...o}=e;return(0,s.jsx)(i.h_,{children:(0,s.jsx)(i.VY,{ref:a,className:(0,l.cn)("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2","popper"===n&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:n,...o,children:(0,s.jsx)(i.l_,{className:(0,l.cn)("p-1","popper"===n&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:r})})})});u.displayName=i.VY.displayName,r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)(i.__,{ref:a,className:(0,l.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold",t),...r})}).displayName=i.__.displayName;let x=r.forwardRef((e,a)=>{let{className:t,children:r,...n}=e;return(0,s.jsxs)(i.ck,{ref:a,className:(0,l.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...n,children:[(0,s.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,s.jsx)(i.wU,{children:(0,s.jsx)(d.Z,{className:"h-4 w-4"})})}),(0,s.jsx)(i.eT,{children:r})]})});x.displayName=i.ck.displayName,r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)(i.Z0,{ref:a,className:(0,l.cn)("-mx-1 my-1 h-px bg-muted",t),...r})}).displayName=i.Z0.displayName;var f=t(1738),g=t(261),j=t(9764),v=t(268),y=t(8956),b=t(1271),N=t(2741),w=t(1295),C=t(6142),k=t(6637);let F=[{value:"VCARD",label:"vCard Contact",icon:f.Z},{value:"WIFI",label:"WiFi Network",icon:g.Z},{value:"SOCIAL",label:"Social Profile",icon:j.Z},{value:"APP_STORE",label:"App Store Link",icon:v.Z},{value:"URL",label:"Website URL",icon:y.Z},{value:"SMS",label:"SMS Message",icon:b.Z},{value:"PHONE",label:"Phone Number",icon:N.Z},{value:"EMAIL",label:"Email Address",icon:w.Z},{value:"GEO",label:"Location",icon:C.Z},{value:"TEXT",label:"Plain Text",icon:k.Z}];function R(e){let{selectedType:a,onTypeChange:t}=e;return(0,s.jsxs)("div",{className:"w-full space-y-2",children:[(0,s.jsx)("label",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:"QR Code Type"}),(0,s.jsxs)(m,{value:a,onValueChange:t,children:[(0,s.jsx)(p,{className:"w-full",children:(0,s.jsx)(h,{placeholder:"Select type"})}),(0,s.jsx)(u,{children:F.map(e=>{let{value:a,label:t,icon:r}=e;return(0,s.jsx)(x,{value:a,className:"flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)(r,{className:"h-4 w-4 text-gray-500 dark:text-gray-400"}),(0,s.jsx)("span",{children:t})]})},a)})})]})]})}let E=r.forwardRef((e,a)=>{let{className:t,type:r,...n}=e;return(0,s.jsx)("input",{type:r,className:(0,l.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:a,...n})});E.displayName="Input";var L=t(7256),S=t(6061);let I=(0,S.j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),A=r.forwardRef((e,a)=>{let{className:t,variant:r,size:n,asChild:o=!1,...i}=e,c=o?L.g7:"button";return(0,s.jsx)(c,{className:(0,l.cn)(I({variant:r,size:n,className:t})),ref:a,...i})});A.displayName="Button";let P=r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)("textarea",{className:(0,l.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:a,...r})});P.displayName="Textarea";var T=t(6743);let U=(0,S.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Z=r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)(T.f,{ref:a,className:(0,l.cn)(U(),t),...r})});Z.displayName=T.f.displayName;var z=t(9917),D=t(6712),O=t(2845),W=t(6062);let _=r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)(W.fC,{ref:a,className:(0,l.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",t),...r,children:(0,s.jsx)(W.z$,{className:(0,l.cn)("flex items-center justify-center text-current"),children:(0,s.jsx)(d.Z,{className:"h-4 w-4"})})})});_.displayName=W.fC.displayName;let V=[{value:"apple",label:"Apple App Store",icon:z.Z},{value:"google",label:"Google Play Store",icon:v.Z},{value:"amazon",label:"Amazon Appstore",icon:D.Z},{value:"chrome",label:"Chrome Web Store",icon:O.Z}],G=[{value:"nopass",label:"None"},{value:"WPA",label:"WPA/WPA2"},{value:"WEP",label:"WEP"}];function H(e){let{type:a,onGenerate:t}=e,[l,n]=(0,r.useState)({wifiHidden:!1,wifiEncryption:"WPA"});return(0,r.useEffect)(()=>{n({wifiHidden:!1,wifiEncryption:"WPA"})},[a]),(0,s.jsxs)("form",{onSubmit:e=>{e.preventDefault();let s="";switch(a){case"APP_STORE":switch(l.store){case"apple":s="https://apps.apple.com/app/".concat(l.appId);break;case"google":s="https://play.google.com/store/apps/details?id=".concat(l.appId);break;case"amazon":s="https://www.amazon.com/dp/".concat(l.appId);break;case"chrome":s="https://chrome.google.com/webstore/detail/".concat(l.appId)}break;case"SMS":s="SMSTO:".concat(l.phone,":").concat(l.message);break;case"VCARD":s="BEGIN:VCARD\nVERSION:3.0\nN:".concat(l.lastName,";").concat(l.firstName,";;;\nFN:").concat(l.firstName," ").concat(l.lastName,"\nORG:").concat(l.company,"\nTITLE:").concat(l.jobTitle,"\nTEL;TYPE=CELL:").concat(l.mobile,"\nTEL;TYPE=WORK:").concat(l.phone,"\nTEL;TYPE=FAX:").concat(l.fax,"\nEMAIL:").concat(l.email,"\nURL:").concat(l.website,"\nADR:;;").concat(l.street,";").concat(l.city,";;;").concat(l.country,"\nEND:VCARD");break;case"WIFI":let r=l.wifiEncryption;s="WIFI:T:".concat(r,";S:").concat(l.ssid,";P:").concat(l.password||"",";H:").concat(l.wifiHidden?"true":"false",";");break;case"SOCIAL":s=l.social;break;case"URL":s=l.url;break;case"PHONE":s="tel:".concat(l.phone);break;case"EMAIL":s="mailto:".concat(l.email);break;case"GEO":s="geo:".concat(l.latitude,",").concat(l.longitude);break;default:s=l.text||""}t(s)},className:"space-y-4",children:[(()=>{switch(a){case"APP_STORE":return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"store",children:"App Store"}),(0,s.jsxs)(m,{value:l.store,onValueChange:e=>n(a=>({...a,store:e})),children:[(0,s.jsx)(p,{id:"store",className:"w-full",children:(0,s.jsx)(h,{placeholder:"Select app store"})}),(0,s.jsx)(u,{children:V.map(e=>{let{value:a,label:t,icon:r}=e;return(0,s.jsx)(x,{value:a,className:"flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",children:(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)(r,{className:"h-4 w-4 text-gray-500 dark:text-gray-400"}),(0,s.jsx)("span",{children:t})]})},a)})})]})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"appId",children:"apple"===l.store?"App ID or Bundle ID":"google"===l.store?"Package Name":"amazon"===l.store?"ASIN":"chrome"===l.store?"Extension ID":"App ID"}),(0,s.jsx)(E,{id:"appId",placeholder:"apple"===l.store?"id123456789 or com.example.app":"google"===l.store?"com.example.app":"amazon"===l.store?"B01234567":"chrome"===l.store?"extension-id":"Enter app ID",value:l.appId||"",onChange:e=>n(a=>({...a,appId:e.target.value})),className:"w-full"})]})]});case"SMS":return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"phone",children:"Phone Number"}),(0,s.jsx)(E,{id:"phone",type:"tel",placeholder:"+1234567890",value:l.phone||"",onChange:e=>n(a=>({...a,phone:e.target.value})),className:"w-full"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"message",children:"Message"}),(0,s.jsx)(P,{id:"message",placeholder:"Enter your message here",value:l.message||"",onChange:e=>n(a=>({...a,message:e.target.value})),className:"w-full min-h-[100px]"})]})]});case"VCARD":return(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-700 dark:text-gray-300",children:"Personal Information"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"firstName",children:"First Name"}),(0,s.jsx)(E,{id:"firstName",placeholder:"John",value:l.firstName||"",onChange:e=>n(a=>({...a,firstName:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"lastName",children:"Last Name"}),(0,s.jsx)(E,{id:"lastName",placeholder:"Doe",value:l.lastName||"",onChange:e=>n(a=>({...a,lastName:e.target.value}))})]})]})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-700 dark:text-gray-300",children:"Professional Information"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"company",children:"Company"}),(0,s.jsx)(E,{id:"company",placeholder:"Company Name",value:l.company||"",onChange:e=>n(a=>({...a,company:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"jobTitle",children:"Job Title"}),(0,s.jsx)(E,{id:"jobTitle",placeholder:"Software Engineer",value:l.jobTitle||"",onChange:e=>n(a=>({...a,jobTitle:e.target.value}))})]})]})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-700 dark:text-gray-300",children:"Contact Information"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"mobile",children:"Mobile"}),(0,s.jsx)(E,{id:"mobile",type:"tel",placeholder:"+1234567890",value:l.mobile||"",onChange:e=>n(a=>({...a,mobile:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"phone",children:"Work Phone"}),(0,s.jsx)(E,{id:"phone",type:"tel",placeholder:"+1234567890",value:l.phone||"",onChange:e=>n(a=>({...a,phone:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"fax",children:"Fax"}),(0,s.jsx)(E,{id:"fax",type:"tel",placeholder:"+1234567890",value:l.fax||"",onChange:e=>n(a=>({...a,fax:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"email",children:"Email"}),(0,s.jsx)(E,{id:"email",type:"email",placeholder:"john@example.com",value:l.email||"",onChange:e=>n(a=>({...a,email:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"website",children:"Website"}),(0,s.jsx)(E,{id:"website",type:"url",placeholder:"https://example.com",value:l.website||"",onChange:e=>n(a=>({...a,website:e.target.value}))})]})]})]}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("h3",{className:"font-medium text-sm text-gray-700 dark:text-gray-300",children:"Address"}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"street",children:"Street Address"}),(0,s.jsx)(P,{id:"street",placeholder:"Enter your complete address",value:l.street||"",onChange:e=>n(a=>({...a,street:e.target.value})),className:"w-full min-h-[80px]"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"city",children:"City"}),(0,s.jsx)(E,{id:"city",placeholder:"City",value:l.city||"",onChange:e=>n(a=>({...a,city:e.target.value}))})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"country",children:"Country"}),(0,s.jsx)(E,{id:"country",placeholder:"Country",value:l.country||"",onChange:e=>n(a=>({...a,country:e.target.value}))})]})]})]})]})]});case"WIFI":return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"ssid",children:"Network Name (SSID)"}),(0,s.jsx)(E,{id:"ssid",placeholder:"Enter network name",value:l.ssid||"",onChange:e=>n(a=>({...a,ssid:e.target.value})),className:"w-full"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)(_,{id:"hidden",checked:l.wifiHidden,onCheckedChange:e=>n(a=>({...a,wifiHidden:!0===e}))}),(0,s.jsx)(Z,{htmlFor:"hidden",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Hidden Network"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"encryption",children:"Encryption"}),(0,s.jsxs)(m,{value:l.wifiEncryption,onValueChange:e=>n(a=>({...a,wifiEncryption:e})),children:[(0,s.jsx)(p,{id:"encryption",className:"w-full",children:(0,s.jsx)(h,{placeholder:"Select encryption type"})}),(0,s.jsx)(u,{children:G.map(e=>{let{value:a,label:t}=e;return(0,s.jsx)(x,{value:a,children:t},a)})})]})]}),"nopass"!==l.wifiEncryption&&(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"password",children:"Password"}),(0,s.jsx)(E,{id:"password",type:"password",placeholder:"Enter network password",value:l.password||"",onChange:e=>n(a=>({...a,password:e.target.value})),className:"w-full"})]})]});case"SOCIAL":return(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"social",children:"Profile Link"}),(0,s.jsx)(E,{id:"social",type:"url",placeholder:"Enter social media profile URL",value:l.social||"",onChange:e=>n(a=>({...a,social:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: https://twitter.com/username or https://linkedin.com/in/username"})]})});case"URL":return(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"url",children:"Website"}),(0,s.jsx)(E,{id:"url",type:"url",placeholder:"Enter your website",value:l.url||"",onChange:e=>n(a=>({...a,url:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: https://www.example.com"})]})});case"PHONE":return(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"phone",children:"Phone Number"}),(0,s.jsx)(E,{id:"phone",type:"tel",placeholder:"Enter phone number",value:l.phone||"",onChange:e=>n(a=>({...a,phone:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: +1234567890 or (123) 456-7890"})]})});case"EMAIL":return(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"email",children:"Email Address"}),(0,s.jsx)(E,{id:"email",type:"email",placeholder:"Enter your email address",value:l.email||"",onChange:e=>n(a=>({...a,email:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: john.doe@example.com"})]})});case"GEO":return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"latitude",children:"Latitude"}),(0,s.jsx)(E,{id:"latitude",type:"number",step:"any",placeholder:"Enter latitude",value:l.latitude||"",onChange:e=>n(a=>({...a,latitude:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: 51.5074"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"longitude",children:"Longitude"}),(0,s.jsx)(E,{id:"longitude",type:"number",step:"any",placeholder:"Enter longitude",value:l.longitude||"",onChange:e=>n(a=>({...a,longitude:e.target.value})),className:"w-full"}),(0,s.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Example: -0.1278"})]})]});default:return(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(Z,{htmlFor:"text",children:"Text"}),(0,s.jsx)(E,{id:"text",placeholder:"Enter text",value:l.text||"",onChange:e=>n(a=>({...a,text:e.target.value})),className:"w-full"})]})}})(),(0,s.jsx)(A,{type:"submit",className:"w-full",children:"Generate QR Code"})]})}var M=t(7323),B=t(2692),Q=t.n(B),Y=t(5817),q=t(8883),J=t(7158);let X=q.fC,K=q.xz;q.ZA,q.Uv,q.Tr,q.Ee,r.forwardRef((e,a)=>{let{className:t,inset:r,children:n,...o}=e;return(0,s.jsxs)(q.fF,{ref:a,className:(0,l.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",r&&"pl-8",t),...o,children:[n,(0,s.jsx)(J.Z,{className:"ml-auto h-4 w-4"})]})}).displayName=q.fF.displayName,r.forwardRef((e,a)=>{let{className:t,...r}=e;return(0,s.jsx)(q.tu,{ref:a,className:(0,l.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...r})}).displayName=q.tu.displayName;let $=r.forwardRef((e,a)=>{let{className:t,sideOffset:r=4,...n}=e;return(0,s.jsx)(q.Uv,{children:(0,s.jsx)(q.VY,{ref:a,sideOffset:r,className:(0,l.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...n})})});$.displayName=q.VY.displayName;let ee=r.forwardRef((e,a)=>{let{className:t,inset:r,...n}=e;return(0,s.jsx)(q.ck,{ref:a,className:(0,l.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",r&&"pl-8",t),...n})});ee.displayName=q.ck.displayName;var ea=t(9172);let et=[{name:"WhatsApp",icon:ea.xpo,color:"#25D366"},{name:"Twitter",icon:ea.fWC,color:"#1DA1F2"},{name:"Facebook",icon:ea.Am9,color:"#1877F2"},{name:"LinkedIn",icon:ea.ltd,color:"#0A66C2"},{name:"Telegram",icon:ea.Ww5,color:"#0088cc"},{name:"Email",icon:ea.SRX,color:"#333333"}];function es(e){let{disabled:a,qrCodeUrl:t,title:r="",description:l="",className:n=""}=e,o=async e=>{try{if(navigator.share)try{await navigator.share({title:r,text:l,url:t});return}catch(e){console.error("Native share failed:",e)}switch(e.name){case"WhatsApp":window.open("whatsapp://send?text=".concat(encodeURIComponent("".concat(r,"\n").concat(t))),"_blank");break;case"Twitter":window.open("https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(r),"&url=").concat(encodeURIComponent(t)),"_blank");break;case"Facebook":window.open("https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(t)),"_blank");break;case"LinkedIn":window.open("https://www.linkedin.com/sharing/share-offsite/?url=".concat(encodeURIComponent(t)),"_blank");break;case"Telegram":window.open("https://t.me/share/url?url=".concat(encodeURIComponent(t),"&text=").concat(encodeURIComponent(r)),"_blank");break;case"Email":window.location.href="mailto:?subject=".concat(encodeURIComponent(r),"&body=").concat(encodeURIComponent("".concat(l,"\n").concat(t)))}}catch(e){console.error("Error sharing:",e)}};return(0,s.jsxs)(X,{children:[(0,s.jsx)(K,{asChild:!0,children:(0,s.jsxs)(A,{variant:"outline",className:"flex items-center justify-center ".concat(n),disabled:a,children:[(0,s.jsx)(j.Z,{className:"mr-2 h-4 w-4"}),"Share"]})}),(0,s.jsx)($,{align:"end",className:"w-[200px]",children:et.map(e=>{let a=e.icon;return(0,s.jsxs)(ee,{onClick:()=>o(e),className:"flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",children:[(0,s.jsx)(a,{className:"w-4 h-4",style:{color:e.color}}),(0,s.jsx)("span",{children:e.name})]},e.name)})})]})}function er(e){let{value:a,color:t,bgColor:l,frame:n,frameLabel:o,frameLabelPosition:i,logo:c}=e,[d,m]=(0,r.useState)(null),h=(0,r.useRef)(null),p=async()=>{if(!h.current)return null;try{let e=await Q()(h.current,{backgroundColor:"#FFFFFF",scale:2,logging:!1,useCORS:!0,allowTaint:!0,width:h.current.offsetWidth,height:h.current.offsetHeight+80,y:"top"===i?-40:0});return new Promise(a=>{e.toBlob(e=>{e&&a(e)},"image/png")})}catch(e){return console.error("Error generating QR code image:",e),null}},u=async()=>{let e=await p();if(!e)return;m(e);let a=URL.createObjectURL(e),t=document.createElement("a");t.download="qr-code.png",t.href=a,t.click(),URL.revokeObjectURL(a)};return(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[(0,s.jsx)("div",{className:"relative ".concat("top"===i?"mt-12":""),children:(0,s.jsxs)("div",{ref:h,id:"qr-container",className:"relative bg-white",style:{padding:"1rem",..."none"!==n&&{border:"4px solid ".concat(t),borderRadius:"rounded"===n?"0.5rem":"0"}},children:["none"!==n&&o&&"top"===i&&(0,s.jsx)("div",{className:"absolute -top-10 left-0 right-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded",style:{height:"40px"},children:o}),(0,s.jsx)("div",{className:"relative w-64 h-64",children:(0,s.jsx)(M.ZP,{value:a||"https://example.com",size:256,level:"H",fgColor:t,bgColor:l,imageSettings:c?{src:c,width:24,height:24,excavate:!0}:void 0})}),"none"!==n&&o&&"bottom"===i&&(0,s.jsx)("div",{className:"absolute -bottom-10 left-0 right-0 flex items-center justify-center text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded",style:{height:"40px"},children:o})]})}),(0,s.jsxs)("div",{className:"w-full max-w-md flex gap-2 justify-center ".concat("bottom"===i?"mt-16":"mt-4"),children:[(0,s.jsxs)(A,{onClick:u,disabled:!a,className:"flex-1 flex items-center justify-center",children:[(0,s.jsx)(Y.Z,{className:"mr-2 h-4 w-4"}),"Download PNG"]}),(0,s.jsx)(es,{disabled:!a,qrCodeUrl:d?URL.createObjectURL(d):"",title:"Check out this QR Code",description:"Generated with QR Code Generator",className:"flex-1"})]})]})}function el(e){let{color:a,bgColor:t,frame:r,frameLabel:l,frameLabelPosition:n,onColorChange:o,onBgColorChange:i,onFrameChange:c,onFrameLabelChange:d,onFrameLabelPositionChange:f,onLogoChange:g}=e;return(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold mb-2 dark:text-white",children:"Customize Your QR Code"}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(Z,{htmlFor:"color",className:"dark:text-gray-300",children:"Foreground Color"}),(0,s.jsx)(E,{type:"color",id:"color",value:a,onChange:e=>o(e.target.value),className:"h-10"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(Z,{htmlFor:"bgColor",className:"dark:text-gray-300",children:"Background Color"}),(0,s.jsx)(E,{type:"color",id:"bgColor",value:t,onChange:e=>i(e.target.value),className:"h-10"})]})]}),(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)(Z,{htmlFor:"frame",className:"dark:text-gray-300",children:"Frame Style"}),(0,s.jsxs)(m,{value:r,onValueChange:c,children:[(0,s.jsx)(p,{id:"frame",children:(0,s.jsx)(h,{placeholder:"Choose a frame"})}),(0,s.jsxs)(u,{children:[(0,s.jsx)(x,{value:"none",children:"No Frame"}),(0,s.jsx)(x,{value:"square",children:"Square Frame"}),(0,s.jsx)(x,{value:"rounded",children:"Rounded Frame"})]})]})]}),(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)(Z,{htmlFor:"frameLabel",className:"dark:text-gray-300",children:"Frame Label"}),(0,s.jsx)(E,{type:"text",id:"frameLabel",value:l,onChange:e=>d(e.target.value),placeholder:"Enter frame label"})]}),(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)(Z,{htmlFor:"frameLabelPosition",className:"dark:text-gray-300",children:"Frame Label Position"}),(0,s.jsxs)(m,{value:n,onValueChange:f,children:[(0,s.jsx)(p,{id:"frameLabelPosition",children:(0,s.jsx)(h,{placeholder:"Choose label position"})}),(0,s.jsxs)(u,{children:[(0,s.jsx)(x,{value:"top",children:"Top"}),(0,s.jsx)(x,{value:"bottom",children:"Bottom"})]})]})]}),(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsx)(Z,{htmlFor:"logo",className:"dark:text-gray-300",children:"Upload Logo"}),(0,s.jsx)(E,{type:"file",id:"logo",onChange:e=>{var a;let t=null===(a=e.target.files)||void 0===a?void 0:a[0];if(t){let e=new FileReader;e.onloadend=()=>{g(e.result)},e.readAsDataURL(t)}},accept:"image/*"})]})]})}var en=t(4135),eo=t(3088),ei=t(6435);function ec(){let{setTheme:e}=(0,ei.F)();return(0,s.jsxs)(X,{children:[(0,s.jsx)(K,{asChild:!0,children:(0,s.jsxs)(A,{variant:"outline",size:"icon",children:[(0,s.jsx)(en.Z,{className:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),(0,s.jsx)(eo.Z,{className:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}),(0,s.jsx)("span",{className:"sr-only",children:"Toggle theme"})]})}),(0,s.jsxs)($,{align:"end",children:[(0,s.jsx)(ee,{onClick:()=>e("light"),children:"Light"}),(0,s.jsx)(ee,{onClick:()=>e("dark"),children:"Dark"}),(0,s.jsx)(ee,{onClick:()=>e("system"),children:"System"})]})]})}var ed=t(1396),em=t.n(ed);function eh(){return(0,s.jsx)("footer",{className:"w-full py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700",children:(0,s.jsx)("div",{className:"container mx-auto px-4",children:(0,s.jsxs)("div",{className:"flex items-center justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400",children:[(0,s.jsxs)("span",{children:["\xa9 ",new Date().getFullYear()]}),(0,s.jsx)("span",{children:"Developed by"}),(0,s.jsx)(em(),{href:"https://deltatechglobal.co.uk/",target:"_blank",rel:"noopener noreferrer",className:"font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300",children:"Delta Tech Global Limited"}),(0,s.jsx)("span",{children:"•"}),(0,s.jsx)("span",{children:"All Rights Reserved"})]})})})}var ep=t(6691),eu=t.n(ep);function ex(){return(0,s.jsx)("div",{className:"relative w-20 h-20",children:(0,s.jsx)(eu(),{src:"".concat("/qr-code-generator","/qr-logo.png"),alt:"QR Code Eagle Logo",width:80,height:80,priority:!0,className:"object-contain"})})}function ef(){let[e,a]=(0,r.useState)("URL"),[t,l]=(0,r.useState)(""),[i,c]=(0,r.useState)("#000000"),[d,m]=(0,r.useState)("#FFFFFF"),[h,p]=(0,r.useState)("rounded"),[u,x]=(0,r.useState)("Scan Me"),[f,g]=(0,r.useState)("bottom"),[j,v]=(0,r.useState)("");return(0,s.jsxs)("div",{className:"min-h-screen flex flex-col",children:[(0,s.jsxs)("div",{className:"flex-grow bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4",children:[(0,s.jsxs)("div",{className:"w-full max-w-4xl flex items-center justify-between mb-4",children:[(0,s.jsx)(ex,{}),(0,s.jsx)(ec,{})]}),(0,s.jsx)(n,{className:"w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden",children:(0,s.jsxs)(o,{className:"p-6",children:[(0,s.jsxs)("div",{className:"text-center mb-8",children:[(0,s.jsx)("h1",{className:"text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400",children:"QR Code Generator"}),(0,s.jsx)("p",{className:"mt-2 text-sm text-gray-600 dark:text-gray-400",children:"Generate custom QR codes for any purpose"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(R,{selectedType:e,onTypeChange:a}),(0,s.jsx)(H,{type:e,onGenerate:e=>{l(e)}})]}),(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsx)(er,{value:t,color:i,bgColor:d,frame:h,frameLabel:u,frameLabelPosition:f,logo:j}),(0,s.jsx)(el,{color:i,bgColor:d,frame:h,frameLabel:u,frameLabelPosition:f,onColorChange:c,onBgColorChange:m,onFrameChange:p,onFrameLabelChange:x,onFrameLabelPositionChange:g,onLogoChange:v})]})]})]})})]}),(0,s.jsx)(eh,{})]})}},1657:function(e,a,t){"use strict";t.d(a,{cn:function(){return l}});var s=t(7042),r=t(4769);function l(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];return(0,r.m6)((0,s.W)(a))}}},function(e){e.O(0,[699,337,880,783,971,938,744],function(){return e(e.s=5920)}),_N_E=e.O()}]);
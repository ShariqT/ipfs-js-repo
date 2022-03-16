(()=>{var t={84621:(t,s,e)=>{"use strict";var a=e(20144),i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("IpfsNode")],1)},n=[],r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:"Not Connected"==this.status,expression:"this.status == 'Not Connected'"}],staticClass:"mt-3"},[e("button",{staticClass:"button is-large is-fullwidth is-link",on:{click:function(s){return t.start()}}},[t._v("Connect To DTwitter")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:"Ready"==this.status,expression:"this.status == 'Ready'"}]},[e("div",{staticClass:"message is-info"},[e("div",{staticClass:"message-body"},[t._v(" Your node is "),e("strong",[t._v(t._s(this.identity))]),t._v(". This will double as your username. ")])]),e("div",{staticClass:"block"},t._l(t.messageLog,(function(t,s){return e("tweet",{key:s,attrs:{nodeName:t.from,tweet:t.data}})})),1),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.messages,expression:"messages"}],staticClass:"textarea",attrs:{placeholder:"Tweet your message over decentralized networks!"},domProps:{value:t.messages},on:{input:function(s){s.target.composing||(t.messages=s.target.value)}}}),e("button",{staticClass:"button is-fullwidth is-success",on:{click:function(s){return t.sendMessage()}}},[t._v("Send")])]),e("modal",{ref:"LoadingModal"},[e("div",{staticClass:"box"},[e("p",[t._v("Connecting...")]),e("progress",{staticClass:"progress is-large is-info",attrs:{max:"100"}},[t._v("60%")])])])],1)},o=[],l=e(68101),c=e.n(l);let d={identity:null,status:"Connecting...",node:null};async function u(t={}){try{const s=await c().create(t);d.node=s;const{id:e}=await s.id();return d.identity=e,d.status="Ready",d}catch(s){return d.status="Error connecting to IPFS "+s.toString(),d}}var h=e(70040),p=e.n(h),g=e(29846),v=e.n(g),m=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"modal",class:{"is-active":t.is_active}},[e("div",{staticClass:"modal-background"}),e("div",{staticClass:"modal-content"},[t._t("default")],2),e("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(s){return t.closeModal()}}})])},f=[],b=e(25108);const w={name:"Modal",data:function(){return{is_active:!1}},methods:{closeModal:function(){this.is_active=!1},openModal:function(){b.log("opening modal"),this.is_active=!0,b.log(this.is_active)}}},y=w;var _=e(90862),C=(0,_.Z)(y,m,f,!1,null,null,null);const S=C.exports;var x=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"box"},[e("article",{staticClass:"media"},[t._m(0),e("div",{staticClass:"media-content"},[e("div",{staticClass:"content"},[e("p",[e("small",[t._v("@"+t._s(t.nodeName))]),e("br"),t._v(" "+t._s(t.tweet)+" ")])]),t._m(1)])])])},M=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"media-left"},[e("figure",{staticClass:"image is-64x64"},[e("img",{attrs:{src:"https://via.placeholder.com/150/810b14",alt:"Image"}})])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("nav",{staticClass:"level is-mobile"},[e("div",{staticClass:"level-left"},[e("a",{staticClass:"level-item",attrs:{"aria-label":"reply"}},[e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fas fa-reply",attrs:{"aria-hidden":"true"}})])]),e("a",{staticClass:"level-item",attrs:{"aria-label":"retweet"}},[e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fas fa-retweet",attrs:{"aria-hidden":"true"}})])]),e("a",{staticClass:"level-item",attrs:{"aria-label":"like"}},[e("span",{staticClass:"icon is-small"},[e("i",{staticClass:"fas fa-heart",attrs:{"aria-hidden":"true"}})])])])])}];const T={name:"Tweet",props:{nodeName:String,tweet:String}},k=T;var N=(0,_.Z)(k,x,M,!1,null,null,null);const P=N.exports;var j=e(25108);const O=v().prototype[Symbol.toStringTag],E={name:"IpfsNode",components:{modal:S,tweet:P},data:function(){return{identity:null,status:"Not Connected",node:null,readPeerStatus:"",subscribedHashtag:"com.lob.www:dtwitter-poc",messages:"",messageLog:[],messageListener:null}},methods:{start:function(){const t=this;this.$refs.LoadingModal.openModal();const s={repo:"ipfs-twitter-"+Math.random(),EXPERIMENTAL:{pubsub:!0},config:{Addresses:{Swarm:["/dns4/pure-sierra-28952.herokuapp.com/tcp/443/wss/p2p-webrtc-star"]},Bootstrap:["/dns4/projects.enshapa-engineering.com/tcp/443/wss/p2p/12D3KooWCbYZPBcNLav3vu6iYr8yR3wLDr4j196seP73Xr88WKBy"]},libp2p:{config:{transport:{[O]:{filter:p().all}}}}};u(s).then((function(s){j.log(s),t.status=s.status,t.identity=s.identity,t.node=s.node,t.subscribeToHashtag(),t.$refs.LoadingModal.closeModal()}))},showPeers:async function(){j.log("showing peers");try{let t=null;this.readPeerStatus="Loading",t=""==this.subscribedHashtag?await this.node.swarm.peers():await this.node.pubsub.peers(this.subscribedHashtag),j.log(t),this.readPeerStatus="Success"}catch(t){this.readPeerStatus="Error: "+t.toString()}},subscribeToHashtag:async function(){j.log(this.subscribedHashtag);try{await this.node.pubsub.subscribe(this.subscribedHashtag,this.handleMessage)}catch(t){j.log(t),this.subscribedHashtag="Failed to join "+this.subscribedHashtag}},handleMessage:async function(t){j.log(t);let s=t.data.toString();j.log(s),this.messageLog.unshift({from:t.from.toString(),data:s})},sendMessage:async function(){j.log("sendig...");try{await this.node.pubsub.publish(this.subscribedHashtag,this.messages)}catch(t){j.error(t)}}}},L=E;var H=(0,_.Z)(L,r,o,!1,null,null,null);const $=H.exports,Z={name:"App",components:{IpfsNode:$}},I=Z;var R=(0,_.Z)(I,i,n,!1,null,null,null);const A=R.exports;a.Z.config.productionTip=!1,new a.Z({render:t=>t(A)}).$mount("#app")},43094:()=>{},69159:()=>{},35883:()=>{},89214:()=>{},5696:()=>{},85568:()=>{},42246:()=>{},47005:()=>{},26937:()=>{},26784:()=>{},88795:()=>{},89408:()=>{},87017:()=>{},74056:()=>{},57600:()=>{},21724:()=>{},39370:()=>{},62678:()=>{},25819:()=>{},52361:()=>{},94616:()=>{}},s={};function e(a){var i=s[a];if(void 0!==i)return i.exports;var n=s[a]={id:a,loaded:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}e.m=t,(()=>{var t=[];e.O=(s,a,i,n)=>{if(!a){var r=1/0;for(d=0;d<t.length;d++){for(var[a,i,n]=t[d],o=!0,l=0;l<a.length;l++)(!1&n||r>=n)&&Object.keys(e.O).every((t=>e.O[t](a[l])))?a.splice(l--,1):(o=!1,n<r&&(r=n));if(o){t.splice(d--,1);var c=i();void 0!==c&&(s=c)}}return s}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[a,i,n]}})(),(()=>{e.n=t=>{var s=t&&t.__esModule?()=>t["default"]:()=>t;return e.d(s,{a:s}),s}})(),(()=>{e.d=(t,s)=>{for(var a in s)e.o(s,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:s[a]})}})(),(()=>{e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()})(),(()=>{e.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s)})(),(()=>{e.r=t=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}})(),(()=>{e.nmd=t=>(t.paths=[],t.children||(t.children=[]),t)})(),(()=>{var t={143:0};e.O.j=s=>0===t[s];var s=(s,a)=>{var i,n,[r,o,l]=a,c=0;if(r.some((s=>0!==t[s]))){for(i in o)e.o(o,i)&&(e.m[i]=o[i]);if(l)var d=l(e)}for(s&&s(a);c<r.length;c++)n=r[c],e.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return e.O(d)},a=globalThis["webpackChunkipfs_js_repo"]=globalThis["webpackChunkipfs_js_repo"]||[];a.forEach(s.bind(null,0)),a.push=s.bind(null,a.push.bind(a))})();var a=e.O(void 0,[998],(()=>e(84621)));a=e.O(a)})();
//# sourceMappingURL=app.e155dcec.js.map
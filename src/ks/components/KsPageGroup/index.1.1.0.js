!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="./dist/",e(0)}(function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(typeof t[e]){case"function":break;case"object":t[e]=function(e){var i=e.slice(1),n=t[e[0]];return function(t,e,s){n.apply(this,[t,e,s].concat(i))}}(t[e]);break;default:t[e]=t[t[e]]}return t}([function(t,e,i){t.exports=i(9)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{total:{type:Number,default:0},length:{type:Number,default:7},current:{type:Number,default:1},size:{type:Number,default:10},onChange:Function}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e.default={VERSION:"1.1.0",mixins:[r.default],data:function(){return{pages:[]}},methods:{init:function(){this.totalLength=this.getTotalLength(this.total,this.size),this.pages=this.buildPages(this.current,this.length,this.totalLength)},getTotalLength:function(t,e){var i=t%e;return(t-i)/e+(i&&1)},createPurePages:function(t,e,i){var n,s,r=[];e>i?(e=i,s=i,n=i-1):(n=e-1,s=t+n/2,t<=n/2&&(s=e),s>i&&(s=i));for(var o=n;o>=0;o--)r.push(s-o);return r},addFold:function(t,e){var i;return e=e||[],e=[].concat(e),i=e.length-1,e[0]>1&&(e[0]=1,e[1]="···"),e[i]<t&&(e[i]=t,e[i-1]="···"),e},buildPages:function(t,e,i){var n;return n=this.createPurePages(t,e,i),n=this.addFold(i,n)},emitClick:function(t){var e=t.target.innerHTML.trim();switch(!0){case"&lt;"===e:--this.current,this.current<1&&(this.current=1);break;case"&gt;"===e:++this.current,this.current=Math.min(this.current,this.totalLength);break;case"···"===e:break;case!isNaN(e):this.current=+e}this.$emit("change",this.current)},warn:function(){this.total&&this.length%2==0&&(this.length=this.length-1,console.error("分页中的参数 pages 或 length 请传入奇数 , 自动转为："+this.length))}},watch:{current:function(t){this.pages=this.buildPages(t,this.length,this.totalLength)},size:function(){this.current=1},"total + size + length":function(){this.init()}},created:function(){this.warn(),this.init()}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s),o=i(8),a=n(o);e.default={VERSION:"1.1.0",components:{page:a.default},mixins:[r.default],props:{sizes:{type:Array,default:function(){return[10,20,100]}}},data:function(){return{}},methods:{init:function(){var t=this.size;~this.sizes.indexOf(t)||(t=this.sizes[0]),this.size=t},currentChange:function(t){this.$emit("change",this.size,this.current)}},created:function(){this.init()},watch:{size:function(t,e){this.current=1,this.$emit("change",this.size,this.current)}}}},function(t,e){},4,function(t,e){t.exports=' <ul v-show=total class=KsPage cid=KsPage @click=emitClick($event)> <li :class="{\'disabled\':current == 1}">&lt;</li> <li v-for="i in pages" track-by=$index :class="{\'active\':current == i}" v-text=i></li> <li :class="{\'disabled\':current == pages[pages.length-1]}">&gt;</li> </ul> '},function(t,e){t.exports=' <div class=KsPageGroup cid=KsPageGroup> <div class=KsPageGroup-statistical>共<span>{{total}}</span>条</div> <div class=ks-col> 每页 <select class=input v-on:change.stop v-model=size> <option v-for="i in sizes" v-bind:value=i>{{i}}</option> </select> 条 </div> <page class=ks-col-auto v-bind:current.sync=current v-bind:length=length v-bind:total=total v-bind:size=size v-on:change=currentChange></page> </div> '},function(t,e,i){var n,s;i(4),n=i(2),s=i(6),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},function(t,e,i){var n,s;i(5),n=i(3),s=i(7),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)}]))});
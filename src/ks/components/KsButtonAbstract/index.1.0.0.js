!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var r in o)("object"==typeof exports?exports:t)[r]=o[r]}}(this,function(){return function(t){function e(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return t[r].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="./dist/",e(0)}([function(t,e,o){t.exports=o(6)},function(t,e,o){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e}function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(3),i=n(s),a=o(2),l=r(a);e.default={VERSION:"1.0.0",mixins:[i.default],data:function(){return{}},props:{width:{type:String,require:!0},height:{type:String,require:!0},fontSize:{type:String,default:"14px"},truth:{type:Boolean,default:!0},colorNormal:{type:String,require:!0},colorHover:{type:String,require:!0},colorActive:{type:String,require:!0}},init:function(){this.$options.template=this.$options.template.replace("#normalStyle{}",l.normal).replace("#ghostStyle{}",l.ghost)},computed:{style:function(){return"min-width: "+this.width+"; height: "+this.height+";\n   font-size: "+this.fontSize+"; line-height: "+(!this.truth&&this.height)}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.normal="\n  /* 默认状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract {\n    color: white;\n    background: {{ colorNormal }};\n  }\n  /* hover 状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:hover {\n    background: {{ colorHover }};\n  }\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:hover {\n    background: {{ colorNormal }};\n  }\n  /* active 状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:active {\n    background: {{ colorActive }};\n  }\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:active {\n    background: {{ colorNormal }};\n  }\n",e.ghost="\n  /* 默认状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract {\n    color: {{ colorNormal }};\n    background: white;\n    border: 1px solid {{ colorNormal }};\n  }\n  /* hover 状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:hover {\n    color: {{ colorHover }};\n    border: 1px solid {{ colorHover }};\n  }\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:hover {\n    color: {{ colorNormal }};\n    border: 1px solid {{ colorNormal }};\n  }\n  /* active 状态 */\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract:active {\n    color: {{ colorActive }};\n    border: 1px solid {{ colorActive }};\n  }\n  .KsBtnAbstract--UID-{{ _uid }} .KsBtnAbstract[disabled]:active {\n    color: {{ colorNormal }};\n    border: 1px solid {{ colorNormal }};\n  }\n"},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{mode:{type:String,default:"normal"},form:{type:String,default:""},disabled:{type:Boolean,default:!1},autoFocus:{type:Boolean,default:!1},name:{type:String,default:"KSButton"},nativeType:{type:String,default:"button"}}}},function(t,e){},function(t,e){t.exports=" <span :class=\"'KsBtnAbstract--UID-' + _uid\"> <template v-if=\"mode === 'normal'\"> <style>#normalStyle{}</style> </template> <template v-if=\"mode === 'ghost'\"> <style>#ghostStyle{}</style> </template> <button :type=nativeType :autofocus=autoFocus :name=name v-if=truth :disabled=disabled :form=form :style=style class=KsBtnAbstract :class=\"{'KsBtnAbstract--disabled': disabled}\" :id=\"'KsBtnAbstract--UID-' + _uid\"> <slot></slot> </button> <a :disabled=disabled :style=style v-if=!truth class=KsBtnAbstract :class=\"{'KsBtnAbstract--disabled': disabled}\" :id=\"'KsBtnAbstract--UID-' + _uid\"> <slot></slot> </a> </span> "},function(t,e,o){var r,n;o(4),r=o(1),n=o(5),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports.default),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])});
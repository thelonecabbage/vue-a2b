!function(a,b){typeof exports==='object'&&typeof module!=='undefined'?module.exports=b():typeof define==='function'&&define.amd?define(b):(a.vueSplitter=b())}(this,(function(){'use strict';function c(a,b){return b?c(b,a%b):a}function d(a){return a.reduce(function(a,b){return c(a,b)})}function e(a){var b=[],c=[];typeof a==='undefined'||typeof a==='string'?console.error('VueAB: variations must be Array || Object'):Array.isArray(a)?a.forEach(function(a){if(a.data&&a.data.slot){var d=a.data.attrs?a.data.attrs.chance:NaN,e=parseInt(d)||1;b.push(a.data.slot);c.push(e)}}):a!==null&&typeof a==='object'&&Object.keys(a).forEach(function(d){b.push(d);c.push(parseInt(a[d])||1)});var e=c.length?d(c):1;return b.reduce(function(a,b,d){var f=Math.round(c[d]/e);for(var g=0;g<f;g++)a.push(b);return a},[])}function f(a){var b=Math.floor(Math.random()*a.length);return a[b]}function g(a){var b=e(a);return f(b)}function j(a){return a*24*3600*1000}function l(a){var b=document.cookie.split(';'),c=a.length;for(var d in b){var e=b[d].trim();if(e.substr(0,c)===a){var f=decodeURIComponent(e.slice(c+1));return JSON.parse(f)}}}function m(a,b,c){var d=new Date();d.setTime(d.getTime()+j(c));var e="expires="+(d.toUTCString())+";path=/";b=encodeURIComponent(JSON.stringify(b));document.cookie=a+"="+b+";"+e}function n(a,b){var c=new Date();c.setTime(c.getTime()+j(b));var d=JSON.parse(localStorage.getItem(a));return d&&d.expires>c.getTime()?d:null}function o(a,b,c){b.expiry=new Date().getTime()+j(c);localStorage.setItem(a,JSON.stringify(b))}var p={_store:null,name:'split-test',method:'cookie',expiry:30,_load:function a(){this.method==='cookie'?(this._store=l(this.name)||{}):this.method==='localStorage'?(this._store=n(this.name,this.expiry)||{}):(console.warn("VueA2B WARNING: No or invalid storage method. Data will not persist."),this._store={});return this._store},_save:function a(){this.method==='cookie'?m(this.name,this._store,this.expiry):this.method==='localStorage'&&o(this.name,this._store,this.expiry)},get entry () {return this._store||this._load()},set entry (a){var b=a.name,c=a.winner;this._store[b]=c;this._save()}},q=function(a,b){var c=p.entry[a]||g(b);p.entry={name:a,winner:c};return c},r={abtest:q,randomCandidate:g,install:function c(a,b){b===void 0&&(b={});if(b.storage){var d=b.storage;d.name&&(p.name=d.name);d.method&&(p.method=d.method);d.expiry&&(p.expiry=parseInt(expiry))}a.component(b.component||'split-test',{functional:!0,props:{always:String,name:String},render:function c(a,b){var d=b.props.name||b.parent.$options.name;if(!d){throw 'VueA2B Error: The test name is mandatory!'}var e=b.slots(),f=b.props.always||p.entry[d]||g(b.children);p.entry={name:d,winner:f};return e[f]}});a.mixin({beforeCreate:function a(){this.$abtest=q}})}};return r}))
//# sourceMappingURL=index.js.map

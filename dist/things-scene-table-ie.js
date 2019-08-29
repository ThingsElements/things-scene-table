!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=scene},function(t,e,n){t.exports=n(2)},function(t,e,n){"use strict";n.r(e);var o=n(0),r={all:["top","left","bottom","right"],out:["top","left","bottom","right"],left:["left"],right:["right"],top:["top"],bottom:["bottom"],leftright:["left","right"],topbottom:["top","bottom"]},s={strokeStyle:"",lineDash:"solid",lineWidth:0},i={strokeStyle:"#999",lineDash:"solid",lineWidth:1};function u(t,e){return o.Model.compile({type:t,strokeStyle:"blue",left:0,top:0,width:1,height:1,textWrap:!0,border:l(i,"all")},e)}function c(t,e){var n=JSON.parse(JSON.stringify(t));return delete n.text,o.Model.compile(n,e)}function l(t,e){return(r[e]||[]).reduce(function(e,n){return e[n]=t,e},{})}function a(t,e,n){t&&t.set("border",Object.assign({},t.get("border")||{},l(e,n)))}function h(t,e,n,o){return 0==o||!(o%e)||-1==n.indexOf(o-1)}function f(t,e,n,o){return o==t-1||o%e==e-1||-1==n.indexOf(o+1)}function p(t,e,n,o){return o<e||-1==n.indexOf(o-e)}function m(t,e,n,o){return o>t-e-1||-1==n.indexOf(o+e)}function d(t,e){return e-t}function g(t,e){return e+t}function v(t,e){return e%t?e-1:-1}function w(t,e){return(e+1)%t?e+1:-1}function y(t,e){for(var n=[],o=0;o<e;o++)n.push(1);return n}var b={ondragmove:function(t,e,n){var o=n.textBounds,r=o.left,s=o.width,i=n.widths_sum,u=n.widths.slice(),c=r+u.slice(0,e+1).reduce(function(t,e){return t+e},0)/i*s,l=(n.transcoordP2S(t.x,t.y).x-c)/s*i,a=i/s*10;l=l<0?-Math.min(u[e]-a,-l):Math.min(u[e+1]-a,l),u[e]=Math.round(100*(u[e]+l))/100,u[e+1]=Math.round(100*(u[e+1]-l))/100,n.set("widths",u)}},C={ondragmove:function(t,e,n){var o=n.textBounds,r=o.top,s=o.height,i=n.heights_sum,u=n.heights.slice();e-=n.columns-1;var c=r+u.slice(0,e+1).reduce(function(t,e){return t+e},0)/i*s,l=(n.transcoordP2S(t.x,t.y).y-c)/s*i,a=i/s*10;l=l<0?-Math.min(u[e]-a,-l):Math.min(u[e+1]-a,l),u[e]=Math.round(100*(u[e]+l))/100,u[e+1]=Math.round(100*(u[e+1]-l))/100,n.set("heights",u)}};function k(t){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function O(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function x(t,e){return!e||"object"!==k(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function _(t){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var R={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"rows",name:"rows",property:"rows"},{type:"number",label:"columns",name:"columns",property:"columns"},{type:"select",label:"data-spread-to",name:"spreadTo",property:{options:["text","data"]}}],"value-property":"data"},S=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),x(this,_(e).apply(this,arguments))}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(e,o["Container"]),n=e,(r=[{key:"created",value:function(){var t=this.rows*this.columns,e=this.size()-t;if(0!=e){if(e>0){var n=this._components.slice(e);this.remove(n)}else{for(var o=[],r=0;r<-e;r++)o.push(u("table-cell",this.app));this.add(o)}var s=this.get("widths"),i=this.get("heights");(!s||s.length<this.columns)&&this.set("widths",this.widths),(!i||i.length<this.rows)&&this.set("heights",this.heights)}}},{key:"containable",value:function(t){return"table-cell"==t.get("type")}},{key:"buildCells",value:function(t,e,n,o){var r=this;if(t<n){var s=this._components.slice(o*t),i=[];if(s.forEach(function(t){(!0===t.merged||t.rowspan>1||t.colspan>1)&&i.push(t)}),i.length>0){var c=[],l=[];i.forEach(function(t){var e,n,s;for(e=r.components.indexOf(t)%o,s=(n=Math.floor(r.components.indexOf(t)/o))*o+e+1;s;){--s;var i=r.components[s];if(i.rowspan>1||i.colspan>1){var u=r.components.indexOf(i)%o,a=r.components.indexOf(i)%o+i.colspan,h=Math.floor(r.components.indexOf(i)/o),f=Math.floor(r.components.indexOf(i)/o)+i.rowspan;e>=u&&e<a&&n>=h&&n<f&&-1==l.indexOf(s)&&(l.push(s),c.push(i))}}}),c.forEach(function(e){e.rowspan-=n-t})}this.remove(s)}var a=Math.min(t,n);if(e>o)for(var h=0;h<a;h++)for(var f=o;f<e;f++)this.insertComponentAt(u("table-cell",this.app),h*e+f);else if(e<o){for(var p=[],m=0;m<a;m++)for(var d=e;d<o;d++)p.push(this.components[m*o+d]);var g=[];if(p.forEach(function(t){(!0===t.merged||t.rowspan>1||t.colspan>1)&&g.push(t)}),g.length>0){var v=[],w=[];g.forEach(function(t){var e,n,s;for(e=r.components.indexOf(t)%o,s=(n=Math.floor(r.components.indexOf(t)/o))*o+e+1;s;){--s;var i=r.components[s];if(i.rowspan>1||i.colspan>1){var u=r.components.indexOf(i)%o,c=r.components.indexOf(i)%o+i.colspan,l=Math.floor(r.components.indexOf(i)/o),a=Math.floor(r.components.indexOf(i)/o)+i.rowspan;e>=u&&e<c&&n>=l&&n<a&&-1==w.indexOf(s)&&(w.push(s),v.push(i))}}}),v.forEach(function(t){t.colspan-=o-e})}this.remove(p)}if(t>n){for(var y=[],b=n;b<t;b++)for(var C=0;C<e;C++)y.push(u("table-cell",this.app));this.add(y)}this.set({widths:this.widths,heights:this.heights})}},{key:"setCellsStyle",value:function(t,e,n){var o=this,r=this.components,i=r.length,u=this.get("columns"),c=[];t.forEach(function(t){if(c.push(t),t.colspan||t.rowspan)for(var e=o.getRowColumn(t).column,n=o.getRowColumn(t).row,r=n;r<n+t.rowspan;r++)for(var s=e;s<e+t.colspan;s++)r==n&&s==e||c.push(o.components[r*o.columns+s])});var l=c.map(function(t){return r.indexOf(t)});l.forEach(function(t){var o=r[t];switch(n){case"all":a(o,e,n),h(0,u,l,t)&&a(r[v(u,t)],e,"right"),f(i,u,l,t)&&a(r[w(u,t)],e,"left"),p(0,u,l,t)&&a(r[d(u,t)],e,"bottom"),m(i,u,l,t)&&a(r[g(u,t)],e,"top");break;case"in":h(0,u,l,t)||a(o,e,"left"),f(i,u,l,t)||a(o,e,"right"),p(0,u,l,t)||a(o,e,"top"),m(i,u,l,t)||a(o,e,"bottom");break;case"out":h(0,u,l,t)&&(a(o,e,"left"),a(r[v(u,t)],e,"right")),f(i,u,l,t)&&(a(o,e,"right"),a(r[w(u,t)],e,"left")),p(0,u,l,t)&&(a(o,e,"top"),a(r[d(u,t)],e,"bottom")),m(i,u,l,t)&&(a(o,e,"bottom"),a(r[g(u,t)],e,"top"));break;case"left":h(0,u,l,t)&&(a(o,e,"left"),a(r[v(u,t)],e,"right"));break;case"right":f(i,u,l,t)&&(a(o,e,"right"),a(r[w(u,t)],e,"left"));break;case"center":h(0,u,l,t)||a(o,e,"left"),f(i,u,l,t)||a(o,e,"right");break;case"middle":p(0,u,l,t)||a(o,e,"top"),m(i,u,l,t)||a(o,e,"bottom");break;case"top":p(0,u,l,t)&&(a(o,e,"top"),a(r[d(u,t)],e,"bottom"));break;case"bottom":m(i,u,l,t)&&(a(o,e,"bottom"),a(r[g(u,t)],e,"top"));break;case"clear":a(o,s,"all"),h(0,u,l,t)&&a(r[v(u,t)],s,"right"),f(i,u,l,t)&&a(r[w(u,t)],s,"left"),p(0,u,l,t)&&a(r[d(u,t)],s,"bottom"),m(i,u,l,t)&&a(r[g(u,t)],s,"top")}})}},{key:"setCellsData",value:function(){var t=this.data;if(t){t=this.toObjectArrayValue(t)||[];var e=this.components,n=this.state.spreadTo,o=void 0===n?"text":n;e.forEach(function(e){var n=e.model.dataKey,r=e.model.dataIndex;n&&r>=0&&(e[o]=(t[r]||{})[n])})}}},{key:"getRowColumn",value:function(t){var e=this.components.indexOf(t);return{column:e%this.columns,row:Math.floor(e/this.columns)}}},{key:"getCellsByRow",value:function(t){return this.components.slice(t*this.columns,(t+1)*this.columns)}},{key:"getCellsByColumn",value:function(t){for(var e=[],n=0;n<this.rows;n++)e.push(this.components[this.columns*n+t]);return e}},{key:"findMergedCellByX",value:function(t){for(var e,n=[],o=0;o<this.columns;o++)(!0===(e=this.components[t*this.columns+o]).merged||e.rowspan>1||e.colspan>1)&&n.push(e);return n}},{key:"findMergedCellByY",value:function(t){for(var e,n=[],o=0;o<this.rows;o++)(!0===(e=this.components[o*this.columns+t]).merged||e.rowspan>1||e.colspan>1)&&n.push(e);return n}},{key:"mergeCells",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.length-1!=n[n.length-1]-n[0])return!1;var o=[];if(t.forEach(function(t){var n=e.getRowColumn(t).column;-1==o.indexOf(n)&&o.push(n)}),o.length-1!=o[o.length-1]-o[0])return!1;var r=n.length,s=o.length,i=t.length;if(i!==r*s||i<2)return!1;t.sort(function(t,n){return e.getRowColumn(t).row*e.columns+e.getRowColumn(t).column-(e.getRowColumn(n).row*e.columns+e.getRowColumn(n).column)});var u=t[0];u.set({colspan:s,rowspan:r});for(var c=1;c<i;c++)t[c].merged=!0;this.root.selected=[u]}},{key:"splitCells",value:function(t){this.getRowColumn(t[0]);for(var e=t[0],n=this.components.indexOf(t[0]),o=this.components.length,r=this.components[o-1],s=o/(this.getRowColumn(r).row+1),i=0;i<e.rowspan;i++)for(var u=void 0,c=n;c<n+e.colspan;c++)u=s*i+c,this.components[u].merged=!1;e.colspan=1,e.rowspan=1}},{key:"deleteRows",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse();var o=this.heights.slice();n.forEach(function(t){var n=e.findMergedCellByX(t);if(0===n.length)e.remove(e.getCellsByRow(t));else{var o=[],r=[];n.forEach(function(t){var n,s,i;for(n=e.getRowColumn(t).column,i=(s=e.getRowColumn(t).row)*e.columns+n+1;i;){--i;var u=e.components[i];if(u.rowspan>1||u.colspan>1){var c=e.getRowColumn(u).column,l=e.getRowColumn(u).column+u.colspan,a=e.getRowColumn(u).row,h=e.getRowColumn(u).row+u.rowspan;n>=c&&n<l&&s>=a&&s<h&&-1==r.indexOf(i)&&(r.push(i),o.push(u))}}}),r.forEach(function(n){var o=Math.floor(n/e.columns);t===o&&o!==e.rows-1&&e.components[n].rowspan>1?(e.components[n+e.columns].rowspan=e.components[n].rowspan-1,e.components[n+e.columns].colspan=e.components[n].colspan,e.components[n+e.columns].merged=!1,e.components[n+e.columns].set("text",e.components[n].get("text"))):e.components[n].rowspan-=1}),e.remove(e.getCellsByRow(t))}}),o.splice(n,1),this.model.rows-=n.length,this.set("heights",o)}},{key:"deleteColumns",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.forEach(function(t){var n=e.widths.slice(),o=e.findMergedCellByY(t);if(0===o.length)e.remove(e.getCellsByColumn(t));else{var r=[],s=[];o.forEach(function(t){var n,o,i;for(n=e.getRowColumn(t).column,i=(o=e.getRowColumn(t).row)*e.columns+n+1;i;){--i;var u=e.components[i];if(u.rowspan>1||u.colspan>1){var c=e.getRowColumn(u).column,l=e.getRowColumn(u).column+u.colspan,a=e.getRowColumn(u).row,h=e.getRowColumn(u).row+u.rowspan;n>=c&&n<l&&o>=a&&o<h&&-1==s.indexOf(i)&&(s.push(i),r.push(u))}}}),s.forEach(function(n){var o=n%e.columns;t===o&&o!==e.columns-1&&e.components[n].colspan>1?(e.components[n+1].rowspan=e.components[n].rowspan,e.components[n+1].colspan=e.components[n].colspan-1,e.components[n+1].merged=!1,e.components[n+1].set("text",e.components[n].get("text"))):e.components[n].colspan-=1}),e.remove(e.getCellsByColumn(t))}n.splice(t,1),e.model.columns-=1,e.set("widths",n)})}},{key:"insertCellsAbove",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByX(t);if(0===i.length){for(var l=0;l<e.columns;l++)s.push(c(e.components[t*e.columns+l].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)});var a=e.heights.slice();a.splice.apply(a,[o,0].concat(r)),e.set("heights",a),e.model.rows+=n.length,e.clearCache()}else{if(n.length>1)return!1;var h=[],f=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,u=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,l=e.getRowColumn(s).row+s.rowspan;n>=i&&n<u&&o>=c&&o<l&&-1==f.indexOf(r)&&(f.push(r),h.push(s))}}}),f.forEach(function(i){if(f.length>=2)return!1;var l=Math.floor(i/e.columns),a={rowspan:e.components[i].rowspan,colspan:e.components[i].colspan,text:e.components[i].get("text"),merged:e.components[i].merged};if(l===t){for(var h=0;h<e.columns;h++)s.push(u("table-cell",e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[i+e.columns].rowspan=a.rowspan,e.components[i+e.columns].colspan=a.colspan,e.components[i+e.columns].set("text",a.text),e.components[i+e.columns].merged=a.merged}else{for(var p=0;p<e.columns;p++)s.push(c(e.components[t*e.columns+p].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[i].rowspan+=1}var m=e.heights.slice();m.splice.apply(m,[o,0].concat(r)),e.set("heights",m),e.model.rows+=n.length,e.clearCache()})}})}},{key:"insertCellsBelow",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){var n=e.findMergedCellByX(t);if(0===n.length){for(var i=0;i<e.columns;i++)s.push(c(e.components[t*e.columns+i].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)});var l=e.heights.slice();l.splice.apply(l,[o,0].concat(r)),e.set("heights",l),e.model.rows+=1,e.clearCache()}else{var a=[],h=[];n.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,u=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,l=e.getRowColumn(s).row+s.rowspan;n>=i&&n<u&&o>=c&&o<l&&-1==h.indexOf(r)&&(h.push(r),a.push(s))}}}),h.forEach(function(n){if(h.length>=2)return!1;var i=Math.floor(n/e.columns),l=e.components[n].rowspan;e.components[n].colspan,e.components[n].get("text"),e.components[n].merged;if(i+l-1===t){for(var a=0;a<e.columns;a++)s.push(u("table-cell",e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)})}else if(i===t){for(var f=0;f<e.columns;f++)s.push(c(e.components[t*e.columns+f].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[n].rowspan+=1,e.components[n+e.columns].rowspan=1,e.components[n+e.columns].colspan=1,e.components[n+e.columns].merged=!0,e.components[n+e.columns].set("text","")}else{for(var p=0;p<e.columns;p++)s.push(c(e.components[t*e.columns+p].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[n].rowspan+=1}var m=e.heights.slice();m.splice.apply(m,[o,0].concat(r)),e.set("heights",m),e.model.rows+=1,e.clearCache()})}})}},{key:"insertCellsLeft",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByY(t);if(0===i.length){for(var l=0;l<e.rows;l++)s.push(c(e.components[t+e.columns*l].model,e.app));r.push(e.widths[t]);var a=e.columns,h=e.rows;s.reverse().forEach(function(t){0==h&&(h=e.rows,a++),h--,e.insertComponentAt(t,o+h*a)});var f=e.widths.slice();e.model.columns+=n.length,f.splice.apply(f,[o,0].concat(r)),e.set("widths",f)}else{var p=[],m=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,u=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,l=e.getRowColumn(s).row+s.rowspan;n>=i&&n<u&&o>=c&&o<l&&-1==m.indexOf(r)&&(m.push(r),p.push(s))}}}),m.forEach(function(i){if(m.length>=2)return!1;var l=i%e.columns;e.components[i].rowspan,e.components[i].colspan,e.components[i].get("text"),e.components[i].merged;if(l===t){for(var a=0;a<e.rows;a++)s.push(u("table-cell",e.app));r.push(e.widths[t]);var h=e.columns,f=e.rows;s.reverse().forEach(function(t){0==f&&(f=e.rows,h++),f--,e.insertComponentAt(t,o+f*h)})}else{e.components[i].colspan+=1;for(var p=0;p<e.rows;p++)s.push(c(e.components[t+e.columns*p].model,e.app));r.push(e.widths[t]);var d=e.columns,g=e.rows;s.reverse().forEach(function(t){0==g&&(g=e.rows,d++),g--,e.insertComponentAt(t,o+g*d)})}var v=e.widths.slice();e.model.columns+=n.length,v.splice.apply(v,[o,0].concat(r)),e.set("widths",v)})}})}},{key:"insertCellsRight",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByY(t);if(0===i.length){for(var l=0;l<e.rows;l++)s.push(c(e.components[t+e.columns*l].model,e.app));r.push(e.widths[t]);var a=e.columns,h=e.rows;s.reverse().forEach(function(t){0==h&&(h=e.rows,a++),h--,e.insertComponentAt(t,o+h*a)});var f=e.widths.slice();e.model.columns+=n.length,f.splice.apply(f,[o,0].concat(r)),e.set("widths",f)}else{var p=[],m=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,u=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,l=e.getRowColumn(s).row+s.rowspan;n>=i&&n<u&&o>=c&&o<l&&-1==m.indexOf(r)&&(m.push(r),p.push(s))}}}),m.forEach(function(i){if(m.length>=2)return!1;var l=Math.floor(i/e.columns),a=i%e.columns,h=(e.components[i].rowspan,e.components[i].colspan);e.components[i].get("text"),e.components[i].merged;if(a+h-1===t){for(var f=0;f<e.rows;f++)s.push(u("table-cell",e.app));r.push(e.widths[t]);var p=e.columns,d=e.rows;s.reverse().forEach(function(t){0==d&&(d=e.rows,p++),d--,e.insertComponentAt(t,o+d*p)})}else if(a===t){e.components[i].colspan+=1;for(var g=0;g<e.rows;g++)s.push(c(e.components[t+e.columns*g].model,e.app));r.push(e.widths[t]);var v=e.columns,w=e.rows;s.reverse().forEach(function(t){0==w&&(w=e.rows,v++),w--,e.insertComponentAt(t,o+w*v)}),e.components[i+l+1].rowspan=1,e.components[i+l+1].colspan=1,e.components[i+l+1].merged=!0,e.components[i+l+1].set("text","")}else{e.components[i].colspan+=1;for(var y=0;y<e.rows;y++)s.push(c(e.components[t+e.columns*y].model,e.app));r.push(e.widths[t]);var b=e.columns,C=e.rows;s.reverse().forEach(function(t){0==C&&(C=e.rows,b++),C--,e.insertComponentAt(t,o+C*b)})}var k=e.widths.slice();e.model.columns+=n.length,k.splice.apply(k,[o,0].concat(r)),e.set("widths",k)})}})}},{key:"distributeHorizontal",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.column)&&n.push(o.column)});var o=n.reduce(function(t,n){return t+e.widths[n]},0),r=Math.round(o/n.length*100)/100,s=this.widths.slice();n.forEach(function(t){s[t]=r}),this.set("widths",s)}},{key:"distributeVertical",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.row)&&n.push(o.row)});var o=n.reduce(function(t,n){return t+e.heights[n]},0),r=Math.round(o/n.length*100)/100,s=this.heights.slice();n.forEach(function(t){s[t]=r}),this.set("heights",s)}},{key:"toObjectArrayValue",value:function(t){if(!t||0===t.length)return null;if(!t[0].hasOwnProperty("__field1"))return t;var e={},n=[];for(var o in t[0])e[o]=t[0][o];for(var r=1;r<t.length;r++){var s={},i=t[r];for(var u in e){var c=e[u],l=i[u];s[c]=l}n.push(s)}return n}},{key:"onchange",value:function(t,e){if("rows"in t||"columns"in t){var n=this.rows,o=this.columns;this.buildCells(n,o,"rows"in e?e.rows:n,"columns"in e?e.columns:o)}"data"in t&&this.setCellsData()}},{key:"oncellchanged",value:function(t,e){("dataKey"in t||"dataIndex"in t)&&this.setCellsData()}},{key:"focusible",get:function(){return!1}},{key:"widths",get:function(){var t=this.get("widths");return t?t.length<this.columns?t.concat(y(0,this.columns-t.length)):t.length>this.columns?t.slice(0,this.columns):t:y(0,this.columns)}},{key:"heights",get:function(){var t=this.get("heights");return t?t.length<this.rows?t.concat(y(0,this.rows-t.length)):t.length>this.rows?t.slice(0,this.rows):t:y(0,this.rows)}},{key:"layout",get:function(){return o.Layout.get("table")}},{key:"rows",get:function(){return Number(this.get("rows"))}},{key:"columns",get:function(){return Number(this.get("columns"))}},{key:"lefts",get:function(){var t=this;return this.components.filter(function(e,n){return!(n%t.columns)})}},{key:"centers",get:function(){var t=this;return this.components.filter(function(e,n){return n%t.columns&&(n+1)%t.columns})}},{key:"rights",get:function(){var t=this;return this.components.filter(function(e,n){return!((n+1)%t.columns)})}},{key:"tops",get:function(){return this.components.slice(0,this.columns)}},{key:"middles",get:function(){return this.components.slice(this.columns,this.columns*(this.rows-1))}},{key:"bottoms",get:function(){return this.components.slice(this.columns*(this.rows-1))}},{key:"widths_sum",get:function(){var t=this,e=this.widths;return e?e.filter(function(e,n){return n<t.columns}).reduce(function(t,e){return t+e},0):this.columns}},{key:"heights_sum",get:function(){var t=this,e=this.heights;return e?e.filter(function(e,n){return n<t.rows}).reduce(function(t,e){return t+e},0):this.rows}},{key:"nature",get:function(){return R}},{key:"controls",get:function(){var t=this.widths,e=this.heights,n=this.textBounds,o=n.width/this.widths_sum,r=n.height/this.heights_sum,s=n.left,i=n.top,u=[];return t.slice(0,this.columns-1).forEach(function(t){s+=t*o,u.push({x:s,y:n.top,handler:b})}),e.slice(0,this.rows-1).forEach(function(t){i+=t*r,u.push({x:n.left,y:i,handler:C})}),u}},{key:"eventMap",get:function(){return{"(self)":{"(descendant)":{change:this.oncellchanged}}}}}])&&O(n.prototype,r),i&&O(n,i),e}();function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function P(t,e){return!e||"object"!==M(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}["rows","columns","widths","heights","widths_sum","heights_sum","controls"].forEach(function(t){return o.Component.memoize(S.prototype,t,!1)}),o.Component.register("table",S);var B={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"editor-table",label:"",name:"",property:{merge:!0,split:!0}},{type:"string",label:"data-key",name:"dataKey",property:"dataKey"},{type:"number",label:"data-index",name:"dataIndex",property:"dataIndex"}]};var D=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),P(this,T(e).apply(this,arguments))}var n,r,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&A(t,e)}(e,Object(o["RectPath"])(o["Component"])),n=e,(r=[{key:"_drawBorder",value:function(t,e,n,r,s,i){i&&i.strokeStyle&&i.lineWidth&&i.lineDash&&(t.beginPath(),t.moveTo(e,n),t.lineTo(r,s),o.Component.drawStroke(t,i))}},{key:"_draw",value:function(t){var e=this.model,n=e.left,o=e.top,r=e.width,s=e.height,i=this.model.border||{};t.beginPath(),t.lineWidth=0,t.rect(n,o,r,s),this.drawFill(t);var u=this.parent,c=u.components.indexOf(this),l=u.columns||1,a=u.rows||1;this._drawBorder(t,n,o,n+r,o,i.top),this._drawBorder(t,n,o+s,n,o,i.left),function(t,e,n,o){return(t+1)%n==0||o[t+1]&&o[t+1].hidden}(c,0,l,u.components)&&this._drawBorder(t,n+r,o,n+r,o+s,i.right),function(t,e,n,o){return t>=(e-1)*n||o[t+n]&&o[t+n].hidden}(c,a,l,u.components)&&this._drawBorder(t,n+r,o+s,n,o+s,i.bottom)}},{key:"nature",get:function(){return B}},{key:"merged",set:function(t){this.set("merged",!!t),t&&this.set("text","")},get:function(){return this.get("merged")}},{key:"rowspan",set:function(t){this.set("rowspan",t)},get:function(){return this.get("rowspan")}},{key:"colspan",set:function(t){this.set("colspan",t)},get:function(){return this.get("colspan")}}])&&j(n.prototype,r),s&&j(n,s),e}();function Y(t){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function F(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function z(t,e){return!e||"object"!==Y(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function L(t){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function W(t,e){return(W=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}o.Component.register("table-cell",D);var N={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"editor-table",label:"",name:"",property:{merge:!1,split:!1}}]},V=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),z(this,L(e).apply(this,arguments))}var n,r,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&W(t,e)}(e,Object(o["RectPath"])(o["Component"])),n=e,(r=[{key:"_drawBorder",value:function(t,e,n,r,s,i){i&&i.strokeStyle&&i.lineWidth&&i.lineDash&&(t.beginPath(),t.moveTo(e,n),t.lineTo(r,s),o.Component.drawStroke(t,i))}},{key:"_draw",value:function(t){var e=this.bounds,n=e.left,o=e.top,r=e.width,s=e.height,i=this.model.border||{};t.beginPath(),t.lineWidth=0,t.rect(n,o,r,s),this.drawFill(t);var u=this.parent,c=u.components.indexOf(this),l=u.columns||1;this._drawBorder(t,n,o,n+r,o,i.top),this._drawBorder(t,n,o+s,n,o,i.left),(c+1)%l==0&&this._drawBorder(t,n+r,o,n+r,o+s,i.right),this._drawBorder(t,n+r,o+s,n,o+s,i.bottom)}},{key:"nature",get:function(){return N}}])&&F(n.prototype,r),s&&F(n,s),e}();o.Component.register("data-cell",V);var X={reflow:function(t){var e=t.get("layoutConfig"),n=e&&e.columns||t.get("columns"),o=e&&e.rows||t.get("rows"),r=e&&e.widths||t.get("widths"),s=e&&e.heights||t.get("heights"),i=t.state.offset,u=void 0===i?{x:0,y:0}:i,c=r?r.filter(function(t,e){return e<n}).reduce(function(t,e){return t+e},0):n,l=s?s.filter(function(t,e){return e<o}).reduce(function(t,e){return t+e},0):o,a=t.textBounds,h=t.get("paddingLeft")||0,f=t.get("paddingTop")||0,p=a.width/c,m=a.height/l,d=u.x,g=u.y;t.components.forEach(function(t,e){var o=r?r[e%n]:1,i=s?s[0]:1,u=h+d,c=f+g,l=p*o,a=m*i;t.bounds={left:u,top:c,width:l,height:a},t.set("rotation",0),e%n==n-1?(d=0,g+=i*m):d+=o*p})},capturables:function(t){return t.components},drawables:function(t){return t.components},isStuck:function(t){return!0},keyNavigate:function(t,e,n){var o=t.get("layoutConfig"),r=o&&o.columns||t.get("columns"),s=o&&o.rows||t.get("rows"),i=t.getRowColumn(e),u=i.row,c=i.column;switch(n.code){case"ArrowUp":if(u>0)return t.getAt((u-1)*r+c);break;case"ArrowDown":if(u<s-1)return t.getAt((u+1)*r+c);break;case"ArrowRight":if(c<r-1)return t.getAt(u*r+c+1);break;case"ArrowLeft":if(c>0)return t.getAt(u*r+c-1);break;default:return e}},joinType:!0};o.Layout.register("data-list",X);function I(t){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function K(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){H(t,e,n[e])})}return t}function H(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function J(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function U(t,e){return!e||"object"!==I(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function q(t,e,n){return(q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=G(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function G(t){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Q(t,e){return(Q=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var Z={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"columns",name:"columns",property:"columns"}],"value-property":"data"},$=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),U(this,G(e).apply(this,arguments))}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Q(t,e)}(e,o["Container"]),n=e,(r=[{key:"postrender",value:function(t){t.clip(),q(G(e.prototype),"postrender",this).call(this,t),this.app.isViewMode&&this.renderScrollbar(t)}},{key:"renderScrollbar",value:function(t){var e=this.bounds,n=e.left,o=e.top,r=e.width,s=e.height,i=this.state,u=i.offset,c=void 0===u?{x:0,y:0}:u,l=i.data,a=(l&&l.length||0)*(this.heights[0]/this.heights_sum)*s;if(!(a<=s)){var h=-c.y/a*s,f=(-c.y+s)/a*s;t.strokeStyle="gray",t.lineWidth=10,t.globalAlpha=.3,t.beginPath(),t.moveTo(n+r-10,o+h),t.lineTo(n+r-10,o+f),t.stroke()}}},{key:"created",value:function(){this.set("rows",2);var t=1*this.columns,e=this.size()-t;if(0!=e){if(e>0){var n=this._components.slice(e);this.remove(n)}else{for(var o=[],r=0;r<-e;r++)o.push(u("data-cell",this.app));this.add(o)}var s=this.get("widths"),i=this.get("heights");(!s||s.length<this.columns)&&this.set("widths",this.widths),(!i||i.length<1)&&this.set("heights",this.heights)}}},{key:"_onwheel",value:function(t){t.stopPropagation();var e=this.bounds.height,n=this.state.offset,o=void 0===n?{x:0,y:0}:n,r=this.heights[0]/this.heights.reduce(function(t,e){return t+e})*e,s=this.data&&this.data.length?Math.min(-r*this.data.length+e,0):0;if(0!=t.deltaY||0!=t.deltaX){var i=t.deltaX+o.x,u=-t.deltaY+o.y;this.setState({offset:{x:Math.max(Math.min(0,i),0),y:Math.max(Math.min(0,u),s)}})}}},{key:"_ontouchstart",value:function(t){this.__START_OFFSET=this.state.offset||{x:0,y:0},this.__START_Y=t.offsetY}},{key:"_ontouchmove",value:function(t){if(this.__START_OFFSET){var e=this.bounds.height,n=this.heights[0]/this.heights.reduce(function(t,e){return t+e})*e,o=this.data&&this.data.length?Math.min(-n*this.data.length+e,0):0,r=this.__START_OFFSET.y+(t.offsetY-this.__START_Y)/this.rootModel.state.scale.y;r=Math.max(Math.min(0,r),o);var s=this.state.offset||{x:0,y:0};0===s.x&&s.y===r||(this.setState("offset",{x:0,y:r}),t.stopPropagation())}}},{key:"_ontouchend",value:function(t){delete this.__START_OFFSET,delete this.__START_Y}},{key:"containable",value:function(t){return"data-cell"==t.get("type")}},{key:"onchange",value:function(t,e){if("data"in t&&this.setCellsData(),"columns"in t){var n=this.columns;this.buildCells(n,Number(e.columns))}}},{key:"setCellsData",value:function(){var t=this;if(this.app.isViewMode){this.setState({offset:{x:0,y:0}});var e=this.data||[];e instanceof Array||(e=[e]),this.remove(this.components.slice(this.columns));var n=this.getCellsByRow(0);if(n.forEach(function(t){t.data=""}),e.length>1){for(var r=[],s=1;s<e.length;s++)r=r.concat(n.map(function(e){return o.Model.compile(K({},e.model,{id:"",data:""}),t.app)}));this.add(r)}e.forEach(function(e,n){var o=K({_idx:n},e);t.getCellsByRow(n).forEach(function(t){t.data=o})})}}},{key:"setCellsStyle",value:function(t,e,n){var o=this.components,r=o.length,i=this.get("columns"),u=t.map(function(t){return o.indexOf(t)});u.forEach(function(t){var c=o[t];switch(n){case"all":a(c,e,n),h(0,i,u,t)&&a(o[v(i,t)],e,"right"),f(r,i,u,t)&&a(o[w(i,t)],e,"left"),p(0,i,u,t)&&a(o[d(i,t)],e,"bottom"),m(r,i,u,t)&&a(o[g(i,t)],e,"top");break;case"in":h(0,i,u,t)||a(c,e,"left"),f(r,i,u,t)||a(c,e,"right"),p(0,i,u,t)||a(c,e,"top"),m(r,i,u,t)||a(c,e,"bottom");break;case"out":h(0,i,u,t)&&(a(c,e,"left"),a(o[v(i,t)],e,"right")),f(r,i,u,t)&&(a(c,e,"right"),a(o[w(i,t)],e,"left")),p(0,i,u,t)&&(a(c,e,"top"),a(o[d(i,t)],e,"bottom")),m(r,i,u,t)&&(a(c,e,"bottom"),a(o[g(i,t)],e,"top"));break;case"left":h(0,i,u,t)&&(a(c,e,"left"),a(o[v(i,t)],e,"right"));break;case"right":f(r,i,u,t)&&(a(c,e,"right"),a(o[w(i,t)],e,"left"));break;case"center":h(0,i,u,t)||a(c,e,"left"),f(r,i,u,t)||a(c,e,"right");break;case"middle":p(0,i,u,t)||a(c,e,"top"),m(r,i,u,t)||a(c,e,"bottom");break;case"top":p(0,i,u,t)&&(a(c,e,"top"),a(o[d(i,t)],e,"bottom"));break;case"bottom":m(r,i,u,t)&&(a(c,e,"bottom"),a(o[g(i,t)],e,"top"));break;case"clear":a(c,s,"all"),h(0,i,u,t)&&a(o[v(i,t)],s,"right"),f(r,i,u,t)&&a(o[w(i,t)],s,"left"),p(0,i,u,t)&&a(o[d(i,t)],s,"bottom"),m(r,i,u,t)&&a(o[g(i,t)],s,"top")}})}},{key:"buildCells",value:function(t,e){if(t>e)for(var n=0;n<1;n++)for(var o=e;o<t;o++)this.insertComponentAt(u("data-cell",this.app),n*t+o);else if(t<e){for(var r=[],s=0;s<1;s++)for(var i=t;i<e;i++)r.push(this.components[s*e+i]);this.remove(r)}this.set({widths:this.widths,heights:this.heights}),this.setCellsData()}},{key:"getRowColumn",value:function(t){var e=this.components.indexOf(t);return{column:e%this.columns,row:Math.floor(e/this.columns)}}},{key:"getCellsByRow",value:function(t){return this.components.slice(t*this.columns,(t+1)*this.columns)}},{key:"getCellsByColumn",value:function(t){for(var e=[],n=0;n<this.rows;n++)e.push(this.components[this.columns*n+t]);return e}},{key:"mergeCells",value:function(t){}},{key:"splitCells",value:function(t){}},{key:"deleteRows",value:function(t){}},{key:"deleteColumns",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.forEach(function(t){var n=e.widths.slice();e.remove(e.getCellsByColumn(t)),n.splice(t,1),e.model.columns-=1,e.set("widths",n)})}},{key:"insertCellsAbove",value:function(t){}},{key:"insertCellsBelow",value:function(t){}},{key:"insertCellsLeft",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){for(var i=0;i<e.rows;i++)s.push(c(e.components[t+e.columns*i].model,e.app));r.push(e.widths[t]);var u=e.columns,l=e.rows;s.reverse().forEach(function(t){0==l&&(l=e.rows,u++),l--,e.insertComponentAt(t,o+l*u)});var a=e.widths.slice();e.model.columns+=n.length,a.splice.apply(a,[o,0].concat(r)),e.set("widths",a)})}},{key:"insertCellsRight",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){for(var i=0;i<e.rows;i++)s.push(c(e.components[t+e.columns*i].model,e.app));r.push(e.widths[t]);var u=e.columns,l=e.rows;s.reverse().forEach(function(t){0==l&&(l=e.rows,u++),l--,e.insertComponentAt(t,o+l*u)});var a=e.widths.slice();e.model.columns+=n.length,a.splice.apply(a,[o,0].concat(r)),e.set("widths",a)})}},{key:"distributeHorizontal",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.column)&&n.push(o.column)});var o=n.reduce(function(t,n){return t+e.widths[n]},0),r=Math.round(o/n.length*100)/100,s=this.widths.slice();n.forEach(function(t){s[t]=r}),this.set("widths",s)}},{key:"distributeVertical",value:function(t){}},{key:"layout",get:function(){return o.Layout.get("data-list")}},{key:"focusible",get:function(){return!1}},{key:"widths_sum",get:function(){var t=this,e=this.widths;return e?e.filter(function(e,n){return n<t.columns}).reduce(function(t,e){return t+e},0):this.columns}},{key:"heights_sum",get:function(){var t=this,e=this.heights;return e?e.filter(function(e,n){return n<t.rows}).reduce(function(t,e){return t+e},0):this.rows}},{key:"widths",get:function(){var t=this.get("widths");return t?t.length<this.columns?t.concat(y(0,this.columns-t.length)):t.length>this.columns?t.slice(0,this.columns):t:y(0,this.columns)}},{key:"heights",get:function(){var t=this.get("heights");return t?t.length<2?t.concat(y(0,2-t.length)):t.length>2?t.slice(0,2):t:y(0,2)}},{key:"columns",get:function(){return Number(this.get("columns"))}},{key:"rows",get:function(){return 2}},{key:"nature",get:function(){return Z}},{key:"controls",get:function(){var t=this.widths,e=this.heights,n=this.textBounds,o=n.width/this.widths_sum,r=n.height/this.heights_sum,s=n.left,i=n.top,u=[];return t.slice(0,this.columns-1).forEach(function(t){s+=t*o,u.push({x:s,y:n.top,handler:b})}),e.slice(0,this.rows-1).forEach(function(t){i+=t*r,u.push({x:n.left,y:i,handler:C})}),u}},{key:"eventMap",get:function(){return{"(self)":{"(all)":{wheel:this._onwheel,touchstart:this._ontouchstart,touchmove:this._ontouchmove,touchend:this._ontouchend}}}}}])&&J(n.prototype,r),i&&J(n,i),e}();o.Component.register("data-list",$),n.d(e,"Table",function(){return S}),n.d(e,"TableCell",function(){return D}),n.d(e,"DataList",function(){return $})}]);
//# sourceMappingURL=things-scene-table-ie.js.map
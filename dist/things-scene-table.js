!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@hatiolab/things-scene")):"function"==typeof define&&define.amd?define(["exports","@hatiolab/things-scene"],e):e((t=t||self)["things-scene-table"]={},t.scene)}(this,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){s(t,e,n[e])})}return t}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t,e,n){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=c(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}var f={all:["top","left","bottom","right"],out:["top","left","bottom","right"],left:["left"],right:["right"],top:["top"],bottom:["bottom"],leftright:["left","right"],topbottom:["top","bottom"]},m={strokeStyle:"",lineDash:"solid",lineWidth:0},p={strokeStyle:"#999",lineDash:"solid",lineWidth:1};function g(t,n){return e.Model.compile({type:t,strokeStyle:"blue",left:0,top:0,width:1,height:1,textWrap:!0,border:w(p,"all")},n)}function d(t,n){var o=JSON.parse(JSON.stringify(t));return delete o.text,e.Model.compile(o,n)}function w(t,e){return(f[e]||[]).reduce(function(e,n){return e[n]=t,e},{})}function v(t,e,n){t&&t.set("border",Object.assign({},t.get("border")||{},w(e,n)))}function y(t,e,n,o){return 0==o||!(o%e)||-1==n.indexOf(o-1)}function b(t,e,n,o){return o==t-1||o%e==e-1||-1==n.indexOf(o+1)}function C(t,e,n,o){return o<e||-1==n.indexOf(o-e)}function k(t,e,n,o){return o>t-e-1||-1==n.indexOf(o+e)}function x(t,e){return e-t}function R(t,e){return e+t}function E(t,e){return e%t?e-1:-1}function O(t,e){return(e+1)%t?e+1:-1}function _(t,e){for(var n=[],o=0;o<e;o++)n.push(1);return n}var M={ondragmove:function(t,e,n){var o=n.textBounds,r=o.left,s=o.width,i=n.widths_sum,l=n.widths.slice(),c=r+l.slice(0,e+1).reduce(function(t,e){return t+e},0)/i*s,u=(n.transcoordP2S(t.x,t.y).x-c)/s*i,a=i/s*10;u=u<0?-Math.min(l[e]-a,-u):Math.min(l[e+1]-a,u),l[e]=Math.round(100*(l[e]+u))/100,l[e+1]=Math.round(100*(l[e+1]-u))/100,n.set("widths",l)}},A={ondragmove:function(t,e,n){var o=n.textBounds,r=o.top,s=o.height,i=n.heights_sum,l=n.heights.slice();e-=n.columns-1;var c=r+l.slice(0,e+1).reduce(function(t,e){return t+e},0)/i*s,u=(n.transcoordP2S(t.x,t.y).y-c)/s*i,a=i/s*10;u=u<0?-Math.min(l[e]-a,-u):Math.min(l[e+1]-a,u),l[e]=Math.round(100*(l[e]+u))/100,l[e+1]=Math.round(100*(l[e+1]-u))/100,n.set("heights",l)}},B={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"rows",name:"rows",property:"rows"},{type:"number",label:"columns",name:"columns",property:"columns"},{type:"select",label:"data-spread-to",name:"spreadTo",property:{options:["text","data"]}}],"value-property":"data"},S=function(t){function o(){return n(this,o),a(this,c(o).apply(this,arguments))}return l(o,e.Container),r(o,[{key:"created",value:function(){var t=this.rows*this.columns,e=this.size()-t;if(0!=e){if(e>0){var n=this._components.slice(e);this.remove(n)}else{for(var o=[],r=0;r<-e;r++)o.push(g("table-cell",this.app));this.add(o)}var s=this.get("widths"),i=this.get("heights");(!s||s.length<this.columns)&&this.set("widths",this.widths),(!i||i.length<this.rows)&&this.set("heights",this.heights)}}},{key:"containable",value:function(t){return"table-cell"==t.get("type")}},{key:"buildCells",value:function(t,e,n,o){var r=this;if(t<n){var s=this._components.slice(o*t),i=[];if(s.forEach(function(t){(!0===t.merged||t.rowspan>1||t.colspan>1)&&i.push(t)}),i.length>0){var l=[],c=[];i.forEach(function(t){var e,n,s;for(e=r.components.indexOf(t)%o,s=(n=Math.floor(r.components.indexOf(t)/o))*o+e+1;s;){--s;var i=r.components[s];if(i.rowspan>1||i.colspan>1){var u=r.components.indexOf(i)%o,a=r.components.indexOf(i)%o+i.colspan,h=Math.floor(r.components.indexOf(i)/o),f=Math.floor(r.components.indexOf(i)/o)+i.rowspan;e>=u&&e<a&&n>=h&&n<f&&-1==c.indexOf(s)&&(c.push(s),l.push(i))}}}),l.forEach(function(e){e.rowspan-=n-t})}this.remove(s)}var u=Math.min(t,n);if(e>o)for(var a=0;a<u;a++)for(var h=o;h<e;h++)this.insertComponentAt(g("table-cell",this.app),a*e+h);else if(e<o){for(var f=[],m=0;m<u;m++)for(var p=e;p<o;p++)f.push(this.components[m*o+p]);var d=[];if(f.forEach(function(t){(!0===t.merged||t.rowspan>1||t.colspan>1)&&d.push(t)}),d.length>0){var w=[],v=[];d.forEach(function(t){var e,n,s;for(e=r.components.indexOf(t)%o,s=(n=Math.floor(r.components.indexOf(t)/o))*o+e+1;s;){--s;var i=r.components[s];if(i.rowspan>1||i.colspan>1){var l=r.components.indexOf(i)%o,c=r.components.indexOf(i)%o+i.colspan,u=Math.floor(r.components.indexOf(i)/o),a=Math.floor(r.components.indexOf(i)/o)+i.rowspan;e>=l&&e<c&&n>=u&&n<a&&-1==v.indexOf(s)&&(v.push(s),w.push(i))}}}),w.forEach(function(t){t.colspan-=o-e})}this.remove(f)}if(t>n){for(var y=[],b=n;b<t;b++)for(var C=0;C<e;C++)y.push(g("table-cell",this.app));this.add(y)}this.set({widths:this.widths,heights:this.heights})}},{key:"setCellsStyle",value:function(t,e,n){var o=this,r=this.components,s=r.length,i=this.get("columns"),l=[];t.forEach(function(t){if(l.push(t),t.colspan||t.rowspan)for(var e=o.getRowColumn(t).column,n=o.getRowColumn(t).row,r=n;r<n+t.rowspan;r++)for(var s=e;s<e+t.colspan;s++)r==n&&s==e||l.push(o.components[r*o.columns+s])});var c=l.map(function(t){return r.indexOf(t)});c.forEach(function(t){var o=r[t];switch(n){case"all":v(o,e,n),y(0,i,c,t)&&v(r[E(i,t)],e,"right"),b(s,i,c,t)&&v(r[O(i,t)],e,"left"),C(0,i,c,t)&&v(r[x(i,t)],e,"bottom"),k(s,i,c,t)&&v(r[R(i,t)],e,"top");break;case"in":y(0,i,c,t)||v(o,e,"left"),b(s,i,c,t)||v(o,e,"right"),C(0,i,c,t)||v(o,e,"top"),k(s,i,c,t)||v(o,e,"bottom");break;case"out":y(0,i,c,t)&&(v(o,e,"left"),v(r[E(i,t)],e,"right")),b(s,i,c,t)&&(v(o,e,"right"),v(r[O(i,t)],e,"left")),C(0,i,c,t)&&(v(o,e,"top"),v(r[x(i,t)],e,"bottom")),k(s,i,c,t)&&(v(o,e,"bottom"),v(r[R(i,t)],e,"top"));break;case"left":y(0,i,c,t)&&(v(o,e,"left"),v(r[E(i,t)],e,"right"));break;case"right":b(s,i,c,t)&&(v(o,e,"right"),v(r[O(i,t)],e,"left"));break;case"center":y(0,i,c,t)||v(o,e,"left"),b(s,i,c,t)||v(o,e,"right");break;case"middle":C(0,i,c,t)||v(o,e,"top"),k(s,i,c,t)||v(o,e,"bottom");break;case"top":C(0,i,c,t)&&(v(o,e,"top"),v(r[x(i,t)],e,"bottom"));break;case"bottom":k(s,i,c,t)&&(v(o,e,"bottom"),v(r[R(i,t)],e,"top"));break;case"clear":v(o,m,"all"),y(0,i,c,t)&&v(r[E(i,t)],m,"right"),b(s,i,c,t)&&v(r[O(i,t)],m,"left"),C(0,i,c,t)&&v(r[x(i,t)],m,"bottom"),k(s,i,c,t)&&v(r[R(i,t)],m,"top")}})}},{key:"setCellsData",value:function(){var t=this.data;if(t){t=this.toObjectArrayValue(t)||[];var e=this.components,n=this.state.spreadTo,o=void 0===n?"text":n;e.forEach(function(e){var n=e.model.dataKey,r=e.model.dataIndex;n&&r>=0&&(e[o]=(t[r]||{})[n])})}}},{key:"getRowColumn",value:function(t){var e=this.components.indexOf(t);return{column:e%this.columns,row:Math.floor(e/this.columns)}}},{key:"getCellsByRow",value:function(t){return this.components.slice(t*this.columns,(t+1)*this.columns)}},{key:"getCellsByColumn",value:function(t){for(var e=[],n=0;n<this.rows;n++)e.push(this.components[this.columns*n+t]);return e}},{key:"findMergedCellByX",value:function(t){for(var e,n=[],o=0;o<this.columns;o++)(!0===(e=this.components[t*this.columns+o]).merged||e.rowspan>1||e.colspan>1)&&n.push(e);return n}},{key:"findMergedCellByY",value:function(t){for(var e,n=[],o=0;o<this.rows;o++)(!0===(e=this.components[o*this.columns+t]).merged||e.rowspan>1||e.colspan>1)&&n.push(e);return n}},{key:"mergeCells",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.length-1!=n[n.length-1]-n[0])return!1;var o=[];if(t.forEach(function(t){var n=e.getRowColumn(t).column;-1==o.indexOf(n)&&o.push(n)}),o.length-1!=o[o.length-1]-o[0])return!1;var r=n.length,s=o.length,i=t.length;if(i!==r*s||i<2)return!1;t.sort(function(t,n){return e.getRowColumn(t).row*e.columns+e.getRowColumn(t).column-(e.getRowColumn(n).row*e.columns+e.getRowColumn(n).column)});var l=t[0];l.set({colspan:s,rowspan:r});for(var c=1;c<i;c++)t[c].merged=!0;this.root.selected=[l]}},{key:"splitCells",value:function(t){this.getRowColumn(t[0]);for(var e=t[0],n=this.components.indexOf(t[0]),o=this.components.length,r=this.components[o-1],s=o/(this.getRowColumn(r).row+1),i=0;i<e.rowspan;i++)for(var l=void 0,c=n;c<n+e.colspan;c++)l=s*i+c,this.components[l].merged=!1;e.colspan=1,e.rowspan=1}},{key:"deleteRows",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse();var o=this.heights.slice();n.forEach(function(t){var n=e.findMergedCellByX(t);if(0===n.length)e.remove(e.getCellsByRow(t));else{var o=[],r=[];n.forEach(function(t){var n,s,i;for(n=e.getRowColumn(t).column,i=(s=e.getRowColumn(t).row)*e.columns+n+1;i;){--i;var l=e.components[i];if(l.rowspan>1||l.colspan>1){var c=e.getRowColumn(l).column,u=e.getRowColumn(l).column+l.colspan,a=e.getRowColumn(l).row,h=e.getRowColumn(l).row+l.rowspan;n>=c&&n<u&&s>=a&&s<h&&-1==r.indexOf(i)&&(r.push(i),o.push(l))}}}),r.forEach(function(n){var o=Math.floor(n/e.columns);t===o&&o!==e.rows-1&&e.components[n].rowspan>1?(e.components[n+e.columns].rowspan=e.components[n].rowspan-1,e.components[n+e.columns].colspan=e.components[n].colspan,e.components[n+e.columns].merged=!1,e.components[n+e.columns].set("text",e.components[n].get("text"))):e.components[n].rowspan-=1}),e.remove(e.getCellsByRow(t))}}),o.splice(n,1),this.model.rows-=n.length,this.set("heights",o)}},{key:"deleteColumns",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.forEach(function(t){var n=e.widths.slice(),o=e.findMergedCellByY(t);if(0===o.length)e.remove(e.getCellsByColumn(t));else{var r=[],s=[];o.forEach(function(t){var n,o,i;for(n=e.getRowColumn(t).column,i=(o=e.getRowColumn(t).row)*e.columns+n+1;i;){--i;var l=e.components[i];if(l.rowspan>1||l.colspan>1){var c=e.getRowColumn(l).column,u=e.getRowColumn(l).column+l.colspan,a=e.getRowColumn(l).row,h=e.getRowColumn(l).row+l.rowspan;n>=c&&n<u&&o>=a&&o<h&&-1==s.indexOf(i)&&(s.push(i),r.push(l))}}}),s.forEach(function(n){var o=n%e.columns;t===o&&o!==e.columns-1&&e.components[n].colspan>1?(e.components[n+1].rowspan=e.components[n].rowspan,e.components[n+1].colspan=e.components[n].colspan-1,e.components[n+1].merged=!1,e.components[n+1].set("text",e.components[n].get("text"))):e.components[n].colspan-=1}),e.remove(e.getCellsByColumn(t))}n.splice(t,1),e.model.columns-=1,e.set("widths",n)})}},{key:"insertCellsAbove",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByX(t);if(0===i.length){for(var l=0;l<e.columns;l++)s.push(d(e.components[t*e.columns+l].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)});var c=e.heights.slice();c.splice.apply(c,[o,0].concat(r)),e.set("heights",c),e.model.rows+=n.length,e.clearCache()}else{if(n.length>1)return!1;var u=[],a=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,l=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,h=e.getRowColumn(s).row+s.rowspan;n>=i&&n<l&&o>=c&&o<h&&-1==a.indexOf(r)&&(a.push(r),u.push(s))}}}),a.forEach(function(i){if(a.length>=2)return!1;var l=Math.floor(i/e.columns),c={rowspan:e.components[i].rowspan,colspan:e.components[i].colspan,text:e.components[i].get("text"),merged:e.components[i].merged};if(l===t){for(var u=0;u<e.columns;u++)s.push(g("table-cell",e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[i+e.columns].rowspan=c.rowspan,e.components[i+e.columns].colspan=c.colspan,e.components[i+e.columns].set("text",c.text),e.components[i+e.columns].merged=c.merged}else{for(var h=0;h<e.columns;h++)s.push(d(e.components[t*e.columns+h].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[i].rowspan+=1}var f=e.heights.slice();f.splice.apply(f,[o,0].concat(r)),e.set("heights",f),e.model.rows+=n.length,e.clearCache()})}})}},{key:"insertCellsBelow",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).row;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){var n=e.findMergedCellByX(t);if(0===n.length){for(var i=0;i<e.columns;i++)s.push(d(e.components[t*e.columns+i].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)});var l=e.heights.slice();l.splice.apply(l,[o,0].concat(r)),e.set("heights",l),e.model.rows+=1,e.clearCache()}else{var c=[],u=[];n.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,l=e.getRowColumn(s).column+s.colspan,a=e.getRowColumn(s).row,h=e.getRowColumn(s).row+s.rowspan;n>=i&&n<l&&o>=a&&o<h&&-1==u.indexOf(r)&&(u.push(r),c.push(s))}}}),u.forEach(function(n){if(u.length>=2)return!1;var i=Math.floor(n/e.columns),l=e.components[n].rowspan;e.components[n].colspan,e.components[n].get("text"),e.components[n].merged;if(i+l-1===t){for(var c=0;c<e.columns;c++)s.push(g("table-cell",e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)})}else if(i===t){for(var a=0;a<e.columns;a++)s.push(d(e.components[t*e.columns+a].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[n].rowspan+=1,e.components[n+e.columns].rowspan=1,e.components[n+e.columns].colspan=1,e.components[n+e.columns].merged=!0,e.components[n+e.columns].set("text","")}else{for(var h=0;h<e.columns;h++)s.push(d(e.components[t*e.columns+h].model,e.app));r.push(e.heights[t]),s.reverse().forEach(function(t){e.insertComponentAt(t,o*e.columns)}),e.components[n].rowspan+=1}var f=e.heights.slice();f.splice.apply(f,[o,0].concat(r)),e.set("heights",f),e.model.rows+=1,e.clearCache()})}})}},{key:"insertCellsLeft",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByY(t);if(0===i.length){for(var l=0;l<e.rows;l++)s.push(d(e.components[t+e.columns*l].model,e.app));r.push(e.widths[t]);var c=e.columns,u=e.rows;s.reverse().forEach(function(t){0==u&&(u=e.rows,c++),u--,e.insertComponentAt(t,o+u*c)});var a=e.widths.slice();e.model.columns+=n.length,a.splice.apply(a,[o,0].concat(r)),e.set("widths",a)}else{var h=[],f=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,l=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,u=e.getRowColumn(s).row+s.rowspan;n>=i&&n<l&&o>=c&&o<u&&-1==f.indexOf(r)&&(f.push(r),h.push(s))}}}),f.forEach(function(i){if(f.length>=2)return!1;var l=i%e.columns;e.components[i].rowspan,e.components[i].colspan,e.components[i].get("text"),e.components[i].merged;if(l===t){for(var c=0;c<e.rows;c++)s.push(g("table-cell",e.app));r.push(e.widths[t]);var u=e.columns,a=e.rows;s.reverse().forEach(function(t){0==a&&(a=e.rows,u++),a--,e.insertComponentAt(t,o+a*u)})}else{e.components[i].colspan+=1;for(var h=0;h<e.rows;h++)s.push(d(e.components[t+e.columns*h].model,e.app));r.push(e.widths[t]);var m=e.columns,p=e.rows;s.reverse().forEach(function(t){0==p&&(p=e.rows,m++),p--,e.insertComponentAt(t,o+p*m)})}var w=e.widths.slice();e.model.columns+=n.length,w.splice.apply(w,[o,0].concat(r)),e.set("widths",w)})}})}},{key:"insertCellsRight",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){var i=e.findMergedCellByY(t);if(0===i.length){for(var l=0;l<e.rows;l++)s.push(d(e.components[t+e.columns*l].model,e.app));r.push(e.widths[t]);var c=e.columns,u=e.rows;s.reverse().forEach(function(t){0==u&&(u=e.rows,c++),u--,e.insertComponentAt(t,o+u*c)});var a=e.widths.slice();e.model.columns+=n.length,a.splice.apply(a,[o,0].concat(r)),e.set("widths",a)}else{var h=[],f=[];i.forEach(function(t){var n,o,r;for(n=e.getRowColumn(t).column,r=(o=e.getRowColumn(t).row)*e.columns+n+1;r;){--r;var s=e.components[r];if(s.rowspan>1||s.colspan>1){var i=e.getRowColumn(s).column,l=e.getRowColumn(s).column+s.colspan,c=e.getRowColumn(s).row,u=e.getRowColumn(s).row+s.rowspan;n>=i&&n<l&&o>=c&&o<u&&-1==f.indexOf(r)&&(f.push(r),h.push(s))}}}),f.forEach(function(i){if(f.length>=2)return!1;var l=Math.floor(i/e.columns),c=i%e.columns,u=(e.components[i].rowspan,e.components[i].colspan);e.components[i].get("text"),e.components[i].merged;if(c+u-1===t){for(var a=0;a<e.rows;a++)s.push(g("table-cell",e.app));r.push(e.widths[t]);var h=e.columns,m=e.rows;s.reverse().forEach(function(t){0==m&&(m=e.rows,h++),m--,e.insertComponentAt(t,o+m*h)})}else if(c===t){e.components[i].colspan+=1;for(var p=0;p<e.rows;p++)s.push(d(e.components[t+e.columns*p].model,e.app));r.push(e.widths[t]);var w=e.columns,v=e.rows;s.reverse().forEach(function(t){0==v&&(v=e.rows,w++),v--,e.insertComponentAt(t,o+v*w)}),e.components[i+l+1].rowspan=1,e.components[i+l+1].colspan=1,e.components[i+l+1].merged=!0,e.components[i+l+1].set("text","")}else{e.components[i].colspan+=1;for(var y=0;y<e.rows;y++)s.push(d(e.components[t+e.columns*y].model,e.app));r.push(e.widths[t]);var b=e.columns,C=e.rows;s.reverse().forEach(function(t){0==C&&(C=e.rows,b++),C--,e.insertComponentAt(t,o+C*b)})}var k=e.widths.slice();e.model.columns+=n.length,k.splice.apply(k,[o,0].concat(r)),e.set("widths",k)})}})}},{key:"distributeHorizontal",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.column)&&n.push(o.column)});var o=n.reduce(function(t,n){return t+e.widths[n]},0),r=Math.round(o/n.length*100)/100,s=this.widths.slice();n.forEach(function(t){s[t]=r}),this.set("widths",s)}},{key:"distributeVertical",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.row)&&n.push(o.row)});var o=n.reduce(function(t,n){return t+e.heights[n]},0),r=Math.round(o/n.length*100)/100,s=this.heights.slice();n.forEach(function(t){s[t]=r}),this.set("heights",s)}},{key:"toObjectArrayValue",value:function(t){if(!t||0===t.length)return null;if(!t[0].hasOwnProperty("__field1"))return t;var e={},n=[];for(var o in t[0])e[o]=t[0][o];for(var r=1;r<t.length;r++){var s={},i=t[r];for(var l in e){var c=e[l],u=i[l];s[c]=u}n.push(s)}return n}},{key:"onchange",value:function(t,e){if("rows"in t||"columns"in t){var n=this.rows,o=this.columns;this.buildCells(n,o,"rows"in e?e.rows:n,"columns"in e?e.columns:o)}"data"in t&&this.setCellsData()}},{key:"oncellchanged",value:function(t,e){("dataKey"in t||"dataIndex"in t)&&this.setCellsData()}},{key:"focusible",get:function(){return!1}},{key:"widths",get:function(){var t=this.get("widths");return t?t.length<this.columns?t.concat(_(0,this.columns-t.length)):t.length>this.columns?t.slice(0,this.columns):t:_(0,this.columns)}},{key:"heights",get:function(){var t=this.get("heights");return t?t.length<this.rows?t.concat(_(0,this.rows-t.length)):t.length>this.rows?t.slice(0,this.rows):t:_(0,this.rows)}},{key:"layout",get:function(){return e.Layout.get("table")}},{key:"rows",get:function(){return Number(this.get("rows"))}},{key:"columns",get:function(){return Number(this.get("columns"))}},{key:"lefts",get:function(){var t=this;return this.components.filter(function(e,n){return!(n%t.columns)})}},{key:"centers",get:function(){var t=this;return this.components.filter(function(e,n){return n%t.columns&&(n+1)%t.columns})}},{key:"rights",get:function(){var t=this;return this.components.filter(function(e,n){return!((n+1)%t.columns)})}},{key:"tops",get:function(){return this.components.slice(0,this.columns)}},{key:"middles",get:function(){return this.components.slice(this.columns,this.columns*(this.rows-1))}},{key:"bottoms",get:function(){return this.components.slice(this.columns*(this.rows-1))}},{key:"widths_sum",get:function(){var t=this,e=this.widths;return e?e.filter(function(e,n){return n<t.columns}).reduce(function(t,e){return t+e},0):this.columns}},{key:"heights_sum",get:function(){var t=this,e=this.heights;return e?e.filter(function(e,n){return n<t.rows}).reduce(function(t,e){return t+e},0):this.rows}},{key:"nature",get:function(){return B}},{key:"controls",get:function(){var t=this.widths,e=this.heights,n=this.textBounds,o=n.width/this.widths_sum,r=n.height/this.heights_sum,s=n.left,i=n.top,l=[];return t.slice(0,this.columns-1).forEach(function(t){s+=t*o,l.push({x:s,y:n.top,handler:M})}),e.slice(0,this.rows-1).forEach(function(t){i+=t*r,l.push({x:n.left,y:i,handler:A})}),l}},{key:"eventMap",get:function(){return{"(self)":{"(descendant)":{change:this.oncellchanged}}}}}]),o}();["rows","columns","widths","heights","widths_sum","heights_sum","controls"].forEach(function(t){return e.Component.memoize(S.prototype,t,!1)}),e.Component.register("table",S);var T={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"editor-table",label:"",name:"",property:{merge:!0,split:!0}},{type:"string",label:"data-key",name:"dataKey",property:"dataKey"},{type:"number",label:"data-index",name:"dataIndex",property:"dataIndex"}]};var P=function(t){function o(){return n(this,o),a(this,c(o).apply(this,arguments))}return l(o,e.RectPath(e.Component)),r(o,[{key:"_drawBorder",value:function(t,n,o,r,s,i){i&&i.strokeStyle&&i.lineWidth&&i.lineDash&&(t.beginPath(),t.moveTo(n,o),t.lineTo(r,s),e.Component.drawStroke(t,i))}},{key:"_draw",value:function(t){var e=this.model,n=e.left,o=e.top,r=e.width,s=e.height,i=this.model.border||{};t.beginPath(),t.lineWidth=0,t.rect(n,o,r,s),this.drawFill(t);var l=this.parent,c=l.components.indexOf(this),u=l.columns||1,a=l.rows||1;this._drawBorder(t,n,o,n+r,o,i.top),this._drawBorder(t,n,o+s,n,o,i.left),function(t,e,n){return(t+1)%n==0}(c,0,u)&&this._drawBorder(t,n+r,o,n+r,o+s,i.right),function(t,e,n){return t>=(e-1)*n}(c,a,u)&&this._drawBorder(t,n+r,o+s,n,o+s,i.bottom)}},{key:"nature",get:function(){return T}},{key:"merged",set:function(t){this.set("merged",!!t),t&&this.set("text","")},get:function(){return this.get("merged")}},{key:"rowspan",set:function(t){this.set("rowspan",t)},get:function(){return this.get("rowspan")}},{key:"colspan",set:function(t){this.set("colspan",t)},get:function(){return this.get("colspan")}}]),o}();e.Component.register("table-cell",P);var j={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"editor-table",label:"",name:"",property:{merge:!1,split:!1}}]},D=function(t){function o(){return n(this,o),a(this,c(o).apply(this,arguments))}return l(o,e.RectPath(e.Component)),r(o,[{key:"_drawBorder",value:function(t,n,o,r,s,i){i&&i.strokeStyle&&i.lineWidth&&i.lineDash&&(t.beginPath(),t.moveTo(n,o),t.lineTo(r,s),e.Component.drawStroke(t,i))}},{key:"_draw",value:function(t){var e=this.bounds,n=e.left,o=e.top,r=e.width,s=e.height,i=this.model.border||{};t.beginPath(),t.lineWidth=0,t.rect(n,o,r,s),this.drawFill(t);var l=this.parent,c=l.components.indexOf(this),u=l.columns||1;this._drawBorder(t,n,o,n+r,o,i.top),this._drawBorder(t,n,o+s,n,o,i.left),(c+1)%u==0&&this._drawBorder(t,n+r,o,n+r,o+s,i.right),this._drawBorder(t,n+r,o+s,n,o+s,i.bottom)}},{key:"nature",get:function(){return j}}]),o}();e.Component.register("data-cell",D);e.Layout.register("data-list",{reflow:function(t){var e=t.get("layoutConfig"),n=e&&e.columns||t.get("columns"),o=e&&e.rows||t.get("rows"),r=e&&e.widths||t.get("widths"),s=e&&e.heights||t.get("heights"),i=t.state.offset,l=void 0===i?{x:0,y:0}:i,c=r?r.filter(function(t,e){return e<n}).reduce(function(t,e){return t+e},0):n,u=s?s.filter(function(t,e){return e<o}).reduce(function(t,e){return t+e},0):o,a=t.textBounds,h=t.get("paddingLeft")||0,f=t.get("paddingTop")||0,m=a.width/c,p=a.height/u,g=l.x,d=l.y;t.components.forEach(function(t,e){var o=r?r[e%n]:1,i=s?s[0]:1,l=h+g,c=f+d,u=m*o,a=p*i;t.bounds={left:l,top:c,width:u,height:a},t.set("rotation",0),e%n==n-1?(g=0,d+=i*p):g+=o*m})},capturables:function(t){return t.components},drawables:function(t){return t.components},isStuck:function(t){return!0},keyNavigate:function(t,e,n){var o=t.get("layoutConfig"),r=o&&o.columns||t.get("columns"),s=o&&o.rows||t.get("rows"),i=t.getRowColumn(e),l=i.row,c=i.column;switch(n.code){case"ArrowUp":if(l>0)return t.getAt((l-1)*r+c);break;case"ArrowDown":if(l<s-1)return t.getAt((l+1)*r+c);break;case"ArrowRight":if(c<r-1)return t.getAt(l*r+c+1);break;case"ArrowLeft":if(c>0)return t.getAt(l*r+c-1);break;default:return e}},joinType:!0});var Y={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"columns",name:"columns",property:"columns"}],"value-property":"data"},F=function(t){function o(){return n(this,o),a(this,c(o).apply(this,arguments))}return l(o,e.Container),r(o,[{key:"render",value:function(t){h(c(o.prototype),"render",this).call(this,t),t.clip()}},{key:"created",value:function(){this.set("rows",2);var t=1*this.columns,e=this.size()-t;if(0!=e){if(e>0){var n=this._components.slice(e);this.remove(n)}else{for(var o=[],r=0;r<-e;r++)o.push(g("data-cell",this.app));this.add(o)}var s=this.get("widths"),i=this.get("heights");(!s||s.length<this.columns)&&this.set("widths",this.widths),(!i||i.length<1)&&this.set("heights",this.heights)}}},{key:"_onwheel",value:function(t){var e=this.bounds.height,n=this.state.offset,o=void 0===n?{x:0,y:0}:n,r=this.heights[0]/this.heights.reduce(function(t,e){return t+e})*e,s=this.data&&this.data.length?Math.min(-r*this.data.length+e,0):0;if(0!=t.deltaY||0!=t.deltaX){var i=t.deltaX+o.x,l=-t.deltaY+o.y;this.setState("offset",{x:Math.max(Math.min(0,i),0),y:Math.max(Math.min(0,l),s)})}}},{key:"_ondragstart",value:function(t){this.__START_OFFSET=i({x:0,y:0},this.state.offset),this.__START_Y=t.offsetY}},{key:"_ondragmove",value:function(t){if(this.__START_OFFSET){var e=this.bounds.height,n=this.heights[0]/this.heights.reduce(function(t,e){return t+e})*e,o=this.data&&this.data.length?-n*this.data.length+e:0,r=this.__START_OFFSET.y+(t.offsetY-this.__START_Y)/this.rootModel.state.scale.y;this.setState("offset",{x:0,y:Math.max(Math.min(0,r),o)})}}},{key:"_ondragend",value:function(t){delete this.__START_OFFSET,delete this.__START_Y}},{key:"containable",value:function(t){return"data-cell"==t.get("type")}},{key:"onchange",value:function(t,e){if("data"in t&&this.setCellsData(),"columns"in t){var n=this.columns;this.buildCells(n,Number(e.columns))}}},{key:"setCellsData",value:function(){var t=this;if(this.app.isViewMode){var n=this.data||[];if(n instanceof Array||(n=[n]),this.remove(this.components.slice(this.columns)),n.length>1){for(var o=[],r=this.getCellsByRow(0),s=1;s<n.length;s++)o=o.concat(r.map(function(n){return e.Model.compile(i({},n.model,{id:"",data:""}),t.app)}));this.add(o)}n.forEach(function(e,n){var o=i({_idx:n},e);t.getCellsByRow(n).forEach(function(t){t.data=o})})}}},{key:"setCellsStyle",value:function(t,e,n){var o=this.components,r=o.length,s=this.get("columns"),i=t.map(function(t){return o.indexOf(t)});i.forEach(function(t){var l=o[t];switch(n){case"all":v(l,e,n),y(0,s,i,t)&&v(o[E(s,t)],e,"right"),b(r,s,i,t)&&v(o[O(s,t)],e,"left"),C(0,s,i,t)&&v(o[x(s,t)],e,"bottom"),k(r,s,i,t)&&v(o[R(s,t)],e,"top");break;case"in":y(0,s,i,t)||v(l,e,"left"),b(r,s,i,t)||v(l,e,"right"),C(0,s,i,t)||v(l,e,"top"),k(r,s,i,t)||v(l,e,"bottom");break;case"out":y(0,s,i,t)&&(v(l,e,"left"),v(o[E(s,t)],e,"right")),b(r,s,i,t)&&(v(l,e,"right"),v(o[O(s,t)],e,"left")),C(0,s,i,t)&&(v(l,e,"top"),v(o[x(s,t)],e,"bottom")),k(r,s,i,t)&&(v(l,e,"bottom"),v(o[R(s,t)],e,"top"));break;case"left":y(0,s,i,t)&&(v(l,e,"left"),v(o[E(s,t)],e,"right"));break;case"right":b(r,s,i,t)&&(v(l,e,"right"),v(o[O(s,t)],e,"left"));break;case"center":y(0,s,i,t)||v(l,e,"left"),b(r,s,i,t)||v(l,e,"right");break;case"middle":C(0,s,i,t)||v(l,e,"top"),k(r,s,i,t)||v(l,e,"bottom");break;case"top":C(0,s,i,t)&&(v(l,e,"top"),v(o[x(s,t)],e,"bottom"));break;case"bottom":k(r,s,i,t)&&(v(l,e,"bottom"),v(o[R(s,t)],e,"top"));break;case"clear":v(l,m,"all"),y(0,s,i,t)&&v(o[E(s,t)],m,"right"),b(r,s,i,t)&&v(o[O(s,t)],m,"left"),C(0,s,i,t)&&v(o[x(s,t)],m,"bottom"),k(r,s,i,t)&&v(o[R(s,t)],m,"top")}})}},{key:"buildCells",value:function(t,e){if(t>e)for(var n=0;n<1;n++)for(var o=e;o<t;o++)this.insertComponentAt(g("data-cell",this.app),n*t+o);else if(t<e){for(var r=[],s=0;s<1;s++)for(var i=t;i<e;i++)r.push(this.components[s*e+i]);this.remove(r)}this.set({widths:this.widths,heights:this.heights}),this.setCellsData()}},{key:"getRowColumn",value:function(t){var e=this.components.indexOf(t);return{column:e%this.columns,row:Math.floor(e/this.columns)}}},{key:"getCellsByRow",value:function(t){return this.components.slice(t*this.columns,(t+1)*this.columns)}},{key:"getCellsByColumn",value:function(t){for(var e=[],n=0;n<this.rows;n++)e.push(this.components[this.columns*n+t]);return e}},{key:"mergeCells",value:function(t){}},{key:"splitCells",value:function(t){}},{key:"deleteRows",value:function(t){}},{key:"deleteColumns",value:function(t){var e=this;if(1==t[0].merged)return!1;var n=[];t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.forEach(function(t){var n=e.widths.slice();e.remove(e.getCellsByColumn(t)),n.splice(t,1),e.model.columns-=1,e.set("widths",n)})}},{key:"insertCellsAbove",value:function(t){}},{key:"insertCellsBelow",value:function(t){}},{key:"insertCellsLeft",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[0],r=[],s=[];n.forEach(function(t){for(var i=0;i<e.rows;i++)s.push(d(e.components[t+e.columns*i].model,e.app));r.push(e.widths[t]);var l=e.columns,c=e.rows;s.reverse().forEach(function(t){0==c&&(c=e.rows,l++),c--,e.insertComponentAt(t,o+c*l)});var u=e.widths.slice();e.model.columns+=n.length,u.splice.apply(u,[o,0].concat(r)),e.set("widths",u)})}},{key:"insertCellsRight",value:function(t){var e=this,n=[];if(t.forEach(function(t){var o=e.getRowColumn(t).column;-1==n.indexOf(o)&&n.push(o)}),n.sort(function(t,e){return t-e}),n.reverse(),n.length>=2)return!1;var o=n[n.length-1]+1,r=[],s=[];n.forEach(function(t){for(var i=0;i<e.rows;i++)s.push(d(e.components[t+e.columns*i].model,e.app));r.push(e.widths[t]);var l=e.columns,c=e.rows;s.reverse().forEach(function(t){0==c&&(c=e.rows,l++),c--,e.insertComponentAt(t,o+c*l)});var u=e.widths.slice();e.model.columns+=n.length,u.splice.apply(u,[o,0].concat(r)),e.set("widths",u)})}},{key:"distributeHorizontal",value:function(t){var e=this,n=[];t.forEach(function(t){var o=e.getRowColumn(t);-1==n.indexOf(o.column)&&n.push(o.column)});var o=n.reduce(function(t,n){return t+e.widths[n]},0),r=Math.round(o/n.length*100)/100,s=this.widths.slice();n.forEach(function(t){s[t]=r}),this.set("widths",s)}},{key:"distributeVertical",value:function(t){}},{key:"layout",get:function(){return e.Layout.get("data-list")}},{key:"focusible",get:function(){return!1}},{key:"widths_sum",get:function(){var t=this,e=this.widths;return e?e.filter(function(e,n){return n<t.columns}).reduce(function(t,e){return t+e},0):this.columns}},{key:"heights_sum",get:function(){var t=this,e=this.heights;return e?e.filter(function(e,n){return n<t.rows}).reduce(function(t,e){return t+e},0):this.rows}},{key:"widths",get:function(){var t=this.get("widths");return t?t.length<this.columns?t.concat(_(0,this.columns-t.length)):t.length>this.columns?t.slice(0,this.columns):t:_(0,this.columns)}},{key:"heights",get:function(){var t=this.get("heights");return t?t.length<2?t.concat(_(0,2-t.length)):t.length>2?t.slice(0,2):t:_(0,2)}},{key:"columns",get:function(){return Number(this.get("columns"))}},{key:"rows",get:function(){return 2}},{key:"nature",get:function(){return Y}},{key:"controls",get:function(){var t=this.widths,e=this.heights,n=this.textBounds,o=n.width/this.widths_sum,r=n.height/this.heights_sum,s=n.left,i=n.top,l=[];return t.slice(0,this.columns-1).forEach(function(t){s+=t*o,l.push({x:s,y:n.top,handler:M})}),e.slice(0,this.rows-1).forEach(function(t){i+=t*r,l.push({x:n.left,y:i,handler:A})}),l}},{key:"eventMap",get:function(){return{"(self)":{"(all)":{wheel:this._onwheel,touchstart:this._ondragstart,touchmove:this._ondragmove,touchend:this._ondragend}}}}}]),o}();e.Component.register("data-list",F),t.DataList=F,t.Table=S,t.TableCell=P,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=things-scene-table.js.map

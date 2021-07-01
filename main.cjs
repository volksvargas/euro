// jsonstat-euro v1.0.7 Copyright 2021 Xavier Badosa https://jsonstat.com
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=(e=require("jsonstat-toolkit"))&&"object"==typeof e&&"default"in e?e.default:e;function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){var t=e.lang||"en",l=e.version||"2.1",a=e.dataset||null,n=e.filter||null,o=e.label||null,i={class:"query",lang:t,version:l,dataset:a};return n&&"object"===r(n)&&0!==Object.keys(n).length&&(Object.keys(n).forEach((function(e){var t=n[e];Array.isArray(t)||(n[e]=[t]),0===n[e].length&&delete n[e]})),i.filter=n),o&&"object"===r(o)&&0!==Object.keys(o).length&&(i.label=o),i}function a(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function n(e,t){var r=JSON.parse(JSON.stringify(e));return a(r,"filter")&&(Object.keys(r.filter).forEach((function(e){r.filter[e]=r.filter[e].slice(0,1)})),!0===t&&(delete r.filter.time,r.filter.lastTimePeriod=["1"])),a(r,"label")&&a(r.label,"category")&&(Object.keys(r.label.category).forEach((function(e){r.label.category[e]=r.label.category[e].slice(0,1)})),!0===t&&delete r.label.category.time),l(r)}function o(e){var t=JSON.parse(JSON.stringify(e));return a(t,"filter")?(delete t.filter.time,t.filter.lastTimePeriod=["1"]):t.filter={lastTimePeriod:["1"]},l(t)}function i(e,t,r){void 0===r&&(r=Object.keys(t),t=l({dataset:null,filter:t}));var n=JSON.parse(JSON.stringify(e)),o=a(t,"filter"),i=a(t,"label")&&a(t.label,"category");return r.forEach((function(e){o&&a(t.filter,e)&&(a(n,"filter")||(n.filter={}),n.filter[e]=t.filter[e]),i&&a(t.label.category,e)&&(a(n,"label")?a(n.label,"category")||(n.label.category={}):n.label={},n.label.category[e]=t.label.category[e])})),l(n)}function s(e,t){var r=JSON.parse(JSON.stringify(e)),n=a(r,"filter"),o=a(r,"label"),i=o&&a(r.label,"category"),s=o&&a(r.label,"dimension");return t.forEach((function(e){n&&delete r.filter[e],o&&(i&&delete r.label.category[e],s&&delete r.label.dimension[e])})),l(r)}function c(e){if("string"==typeof e){if(/https?:\/\//i.test(e))return e;e={dataset:e}}if("object"===r(e)&&null!==e&&!Array.isArray(e)&&e.dataset){e=l(e);var t="".concat("https://ec.europa.eu/eurostat/wdds/rest/data/","v").concat(e.version,"/json/").concat(e.lang,"/").concat(e.dataset),a=[],n=e.filter||null;return n&&0!==Object.keys(n).length&&(Object.keys(n).forEach((function(e){n[e].forEach((function(t){a.push("".concat(e,"=").concat(t))}))})),t+="?"+a.join("&")),t}return null}function f(e){e.role={geo:[],time:[],metric:[],classification:[]},e.id.forEach((function(t){switch(e.Dimension(t).role="time"===t||"geo"===t?t:"classification",t){case"geo":case"time":e.role[t].push(t);break;case"unit":case"s_adj":case"indic_co":e.role.metric.push(t);break;default:e.role.classification.push(t)}})),e.role.geo.length||delete e.role.geo,e.role.time.length||delete e.role.time,e.role.metric.length||delete e.role.metric,e.role.classification.length||delete e.role.classification}function u(e){if(e)return t(c(e)).then((function(e){return"dataset"===e.class?(f(e),e):e}),(function(e){var t=e.message.slice(0,3),r=isNaN(t)?"418":t;return{class:"error",status:r,label:"418"!==r?e.message.slice(4):e.message}}))}function y(e,t){"string"==typeof e&&(e={dataset:e});var r=!1!==t?o(e):e;return u(r).then((function(e){if("error"===e.class)return e;var t={},l={},a={};return e.id.forEach((function(r){var n=e.Dimension(r);l[r]=n.label,t[r]=n.id,a[r]=n.Category().map((function(e){return e.label}))})),{class:"query",dataset:r.dataset,filter:t,label:{dataset:e.label,dimension:l,category:a},lang:r.lang||"en",version:r.version||"2.1"}}))}exports.addParamQuery=i,exports.fetchDataset=u,exports.fetchFullQuery=function(e){"string"==typeof e&&(e={dataset:e});var t=a(e,"filter")?e.filter:null;if(t&&0!==Object.keys(t).length){var r=Object.keys(t);return y(i(e,t),!1).then((function(e){return"error"===e.class?e:y(s(n(e),r),!1).then((function(t){return"error"===t.class?t:i(e,t,r)}))}))}return y(e,!1).then((function(e){return e}))},exports.fetchQuery=y,exports.getEmptyDataset=function(e){var r=a(e,"lang")?e.lang:"en",l=a(e,"dataset")?e.dataset:null,n={lang:r.toUpperCase(),datasetId:l},o=Object.keys(e.filter),i=o.map((function(t){return e.filter[t].length})),s={};o.forEach((function(t){s[t]={label:e.label.dimension[t],category:{index:e.filter[t],label:{}}},e.filter[t].forEach((function(r,l){Object.defineProperty(s[t].category.label,r,{value:e.label.category[t][l]})}))}));var c={version:"2.0",class:"dataset",label:e.label.dataset,extension:n,id:o,size:i,dimension:s,value:[]},u=t(c);return f(u),u},exports.getStatusLabel=function(e,t){return e.extension.status.label[t]},exports.getURL=c,exports.lastPeriodQuery=o,exports.removeParamQuery=s,exports.removeTimeQuery=function(e){return s(e,["time","lastTimePeriod","sinceTimePeriod"])},exports.setRole=f,exports.simpleQuery=n,exports.version="1.0.7";

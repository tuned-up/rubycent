(function(){"use strict";function e(e,t){return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,t.prototype}function t(){}function n(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function i(e){return function(){return this[e].apply(this,arguments)}}function s(e,t,n){for(var i=t||{},o=2;o<arguments.length;++o){var c=arguments[o];if(void 0!==c&&null!==c)for(var u in c){var h=r(c,u),a=r(i,u);if(h!==t&&void 0!==h)if(e&&"object"==typeof h&&null!==h)if(h instanceof Array)i[u]=s(e,a instanceof Array?a:[],h);else{var f="object"!=typeof a||a instanceof Array?{}:a;i[u]=s(e,f,h)}else i[u]=h}}return i}function r(e,t){try{return e[t]}catch(n){return void 0}}function o(e,t){return-1!==e.indexOf(t,e.length-t.length)}function c(e,t){return 0===e.lastIndexOf(t,0)}function u(e){return"/"==e.substring(e.length-1)&&(e=e.substring(0,e.length-1)),e}function h(e){return void 0===e||null===e?!1:"string"==typeof e||e instanceof String}function a(e){return void 0===e||null===e?!1:"function"==typeof e}function f(e,t){if(window.console){var n=window.console[e];a(n)&&n.apply(window.console,t)}}function l(e){this._sockjs=!1,this._sockjsVersion=null,this._status="disconnected",this._reconnect=!0,this._transport=null,this._messageId=0,this._clientId=null,this._subscriptions={},this._messages=[],this._isBatching=!1,this._isAuthBatching=!1,this._authChannels={},this._refreshTimeout=null,this._config={retry:3e3,info:"",debug:!1,insecure:!1,server:null,protocols_whitelist:["websocket","xdr-streaming","xhr-streaming","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"],transports:["websocket","xdr-streaming","xhr-streaming","eventsource","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"],privateChannelPrefix:"$",refreshEndpoint:"/centrifuge/refresh",authEndpoint:"/centrifuge/auth",authHeaders:{},refreshHeaders:{}},e&&this.configure(e)}function g(e,t){this._centrifuge=e,this.channel=t}Object.create||(Object.create=function(){function e(){}return function(t){if(1!=arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=t,new e}}()),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null==this)throw new TypeError;var t,n,i=Object(this),s=i.length>>>0;if(0===s)return-1;if(t=0,arguments.length>1&&(t=Number(arguments[1]),t!=t?t=0:0!=t&&t!=1/0&&t!=-(1/0)&&(t=(t>0||-1)*Math.floor(Math.abs(t)))),t>=s)return-1;for(n=t>=0?t:Math.max(s-Math.abs(t),0);s>n;n++)if(n in i&&i[n]===e)return n;return-1});var p=t.prototype;p.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},p.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},p.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},p.addListener=function(e,t){var i,s=this.getListenersAsObject(e),r="object"==typeof t;for(i in s)s.hasOwnProperty(i)&&-1===n(s[i],t)&&s[i].push(r?t:{listener:t,once:!1});return this},p.on=i("addListener"),p.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},p.once=i("addOnceListener"),p.defineEvent=function(e){return this.getListeners(e),this},p.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},p.removeListener=function(e,t){var i,s,r=this.getListenersAsObject(e);for(s in r)r.hasOwnProperty(s)&&(i=n(r[s],t),-1!==i&&r[s].splice(i,1));return this},p.off=i("removeListener"),p.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},p.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},p.manipulateListeners=function(e,t,n){var i,s,r=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)r.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(s=t[i])&&("function"==typeof s?r.call(this,i,s):o.call(this,i,s));return this},p.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},p.emitEvent=function(e,t){var n,i,s,r,o=this.getListenersAsObject(e);for(s in o)if(o.hasOwnProperty(s))for(i=o[s].length;i--;)n=o[s][i],n.once===!0&&this.removeListener(e,n.listener),r=n.listener.apply(this,t||[]),r===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},p.trigger=i("emitEvent"),p.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},p.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},p._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},p._getEvents=function(){return this._events||(this._events={})};var d={request:function(e,t,n){n.data=n.data||{};var i=function(e,t){var n,i=[];for(var s in e)if("object"==typeof e[s])for(var r in e[s])i.push(s+"="+encodeURIComponent(e[s][r]));else i.push(s+"="+encodeURIComponent(e[s]));return n=i.join("&"),""!=n?t?t.indexOf("?")<0?"?"+n:"&"+n:n:""},s={host:{},setHeaders:function(e){for(var t in e)this.xhr&&this.xhr.setRequestHeader(t,e[t])},process:function(n){var s=this;return this.xhr=null,window.ActiveXObject?this.xhr=new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest&&(this.xhr=new XMLHttpRequest),this.xhr&&(this.xhr.onreadystatechange=function(){if(4==s.xhr.readyState&&200==s.xhr.status){var e=s.xhr.responseText;if("undefined"==typeof JSON)throw"JSON undefined";e=JSON.parse(e),s.doneCallback&&s.doneCallback.apply(s.host,[e,s.xhr])}else 4==s.xhr.readyState&&s.failCallback&&s.failCallback.apply(s.host,[s.xhr]);s.alwaysCallback&&s.alwaysCallback.apply(s.host,[s.xhr])}),"get"==t?this.xhr.open("GET",e+i(n.data,e),!0):(this.xhr.open(t,e,!0),this.setHeaders({"X-Requested-With":"XMLHttpRequest","Content-type":"application/x-www-form-urlencoded"})),n.headers&&"object"==typeof n.headers&&this.setHeaders(n.headers),setTimeout(function(){"get"==t?s.xhr.send():s.xhr.send(i(n.data))},20),this},done:function(e){return this.doneCallback=e,this},fail:function(e){return this.failCallback=e,this},always:function(e){return this.alwaysCallback=e,this}};return s.process(n)}};e(l,t);var _=l.prototype;_._log=function(){f("info",arguments)},_._debug=function(){this._config.debug===!0&&f("debug",arguments)},_._configure=function(e){if(this._debug("Configuring centrifuge object with",e),e||(e={}),this._config=s(!1,this._config,e),!this._config.url)throw"Missing required configuration parameter 'url' specifying server URL";if(!this._config.project)throw"Missing required configuration parameter 'project' specifying project key in server configuration";if(!this._config.user&&""!==this._config.user){if(!this._config.insecure)throw"Missing required configuration parameter 'user' specifying user's unique ID in your application";this._debug("user not found but this is OK for insecure mode - anonymous access will be used"),this._config.user=""}if(!this._config.timestamp){if(!this._config.insecure)throw"Missing required configuration parameter 'timestamp'";this._debug("token not found but this is OK for insecure mode")}if(!this._config.token){if(!this._config.insecure)throw"Missing required configuration parameter 'token' specifying the sign of authorization request";this._debug("timestamp not found but this is OK for insecure mode")}if(this._config.url=u(this._config.url),o(this._config.url,"connection")){if(this._debug("client will connect to SockJS endpoint"),"undefined"==typeof SockJS)throw"include SockJS client library before Centrifuge javascript client library or use raw Websocket connection endpoint";this._sockjs=!0,this._sockjsVersion=SockJS.version}else o(this._config.url,"connection/websocket")?(this._debug("client will connect to raw Websocket endpoint"),this._config.url=this._config.url.replace("http://","ws://"),this._config.url=this._config.url.replace("https://","wss://")):(this._debug("client will detect connection endpoint itself"),"undefined"==typeof SockJS?(this._debug("no SockJS found, client will connect to raw Websocket endpoint"),this._config.url+="/connection/websocket",this._config.url=this._config.url.replace("http://","ws://"),this._config.url=this._config.url.replace("https://","wss://")):(this._debug("SockJS found, client will connect to SockJS endpoint"),this._config.url+="/connection",this._sockjs=!0,this._sockjsVersion=SockJS.version))},_._setStatus=function(e){this._status!==e&&(this._debug("Status",this._status,"->",e),this._status=e)},_._isDisconnected=function(){return this._isConnected()===!1},_._isConnected=function(){return"connected"===this._status},_._isConnecting=function(){return"connecting"===this._status},_._nextMessageId=function(){return++this._messageId},_._clearSubscriptions=function(){this._subscriptions={}},_._send=function(e){for(var t=0;t<e.length;++t){var n=e[t];n.uid=""+this._nextMessageId(),this._clientId&&(n.clientId=this._clientId),this._debug("Send",n),this._transport.send(JSON.stringify(n))}},_._connect=function(e){if(!this.isConnected()){this._clientId=null,this._reconnect=!0,this._clearSubscriptions(),this._setStatus("connecting");var t=this;if(e&&this.on("connect",e),this._sockjs===!0){var n={};c(this._sockjsVersion,"1.")?n.transports=this._config.transports:(this._log("SockJS <= 0.3.4 is deprecated, use SockJS >= 1.0.0 instead"),n.protocols_whitelist=this._config.protocols_whitelist),null!==this._config.server&&(n.server=this._config.server),this._transport=new SockJS(this._config.url,null,n)}else this._transport=new WebSocket(this._config.url);this._setStatus("connecting"),this._transport.onopen=function(){var e={method:"connect",params:{user:t._config.user,project:t._config.project,info:t._config.info}};t._config.insecure||(e.params.timestamp=t._config.timestamp,e.params.token=t._config.token),t.send(e)},this._transport.onerror=function(e){t._debug(e)},this._transport.onclose=function(){t._setStatus("disconnected"),t.trigger("disconnect"),t._reconnect===!0&&window.setTimeout(function(){t._reconnect===!0&&t._connect.call(t)},t._config.retry)},this._transport.onmessage=function(e){var n;n=JSON.parse(e.data),t._debug("Received",n),t._receive(n)}}},_._disconnect=function(){this._clientId=null,this._setStatus("disconnected"),this._subscriptions={},this._reconnect=!1,this._transport.close()},_._getSubscription=function(e){var t;return t=this._subscriptions[e],t?t:null},_._removeSubscription=function(e){try{delete this._subscriptions[e]}catch(t){this._debug("nothing to delete for channel ",e)}try{delete this._authChannels[e]}catch(t){this._debug("nothing to delete from authChannels for channel ",e)}},_._connectResponse=function(e){if(!this.isConnected())if(null===e.error){if(!e.body)return;var t=e.body.expired;if(t)return void this.refresh();if(this._clientId=e.body.client,this._setStatus("connected"),this.trigger("connect",[e]),this._refreshTimeout&&window.clearTimeout(this._refreshTimeout),null!==e.body.ttl){var n=this;this._refreshTimeout=window.setTimeout(function(){n.refresh.call(n)},1e3*e.body.ttl)}}else this.trigger("error",[e]),this.trigger("connect:error",[e])},_._disconnectResponse=function(e){null===e.error?this.disconnect():(this.trigger("error",[e]),this.trigger("disconnect:error",[e.error]))},_._subscribeResponse=function(e){null!==e.error&&this.trigger("error",[e]);var t=e.body;if(null!==t){var n=t.channel,i=this.getSubscription(n);i&&(null===e.error?(i.trigger("subscribe:success",[t]),i.trigger("ready",[t])):(i.trigger("subscribe:error",[e.error]),i.trigger("error",[e])))}},_._unsubscribeResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&null===e.error&&(i.trigger("unsubscribe",[t]),this._centrifuge._removeSubscription(n))},_._publishResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&(null===e.error?i.trigger("publish:success",[t]):(i.trigger("publish:error",[e.error]),this.trigger("error",[e])))},_._presenceResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&(null===e.error?(i.trigger("presence",[t]),i.trigger("presence:success",[t])):(i.trigger("presence:error",[e.error]),this.trigger("error",[e])))},_._historyResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&(null===e.error?(i.trigger("history",[t]),i.trigger("history:success",[t])):(i.trigger("history:error",[e.error]),this.trigger("error",[e])))},_._joinResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&i.trigger("join",[t])},_._leaveResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);i&&i.trigger("leave",[t])},_._messageResponse=function(e){var t=e.body,n=t.channel,i=this.getSubscription(n);null!==i&&i.trigger("message",[t])},_._refreshResponse=function(e){if(this._refreshTimeout&&window.clearTimeout(this._refreshTimeout),null!==e.body.ttl){var t=this;t._refreshTimeout=window.setTimeout(function(){t.refresh.call(t)},1e3*e.body.ttl)}},_._dispatchMessage=function(e){if(void 0!==e&&null!==e){var t=e.method;if(t)switch(t){case"connect":this._connectResponse(e);break;case"disconnect":this._disconnectResponse(e);break;case"subscribe":this._subscribeResponse(e);break;case"unsubscribe":this._unsubscribeResponse(e);break;case"publish":this._publishResponse(e);break;case"presence":this._presenceResponse(e);break;case"history":this._historyResponse(e);break;case"join":this._joinResponse(e);break;case"leave":this._leaveResponse(e);break;case"ping":break;case"refresh":this._refreshResponse(e);break;case"message":this._messageResponse(e)}}},_._receive=function(e){if(Object.prototype.toString.call(e)===Object.prototype.toString.call([])){for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];this._dispatchMessage(n)}}else Object.prototype.toString.call(e)===Object.prototype.toString.call({})&&this._dispatchMessage(e)},_._flush=function(){var e=this._messages.slice(0);this._messages=[],this._send(e)},_._ping=function(){var e={method:"ping",params:{}};this.send(e)},_.getClientId=function(){return this._clientId},_.isConnected=_._isConnected,_.isConnecting=_._isConnecting,_.isDisconnected=_._isDisconnected,_.configure=function(e){this._configure.call(this,e)},_.connect=_._connect,_.disconnect=_._disconnect,_.getSubscription=_._getSubscription,_.ping=_._ping,_.send=function(e){this._isBatching===!0?this._messages.push(e):this._send([e])},_.startBatching=function(){this._isBatching=!0},_.stopBatching=function(e){e=e||!1,this._isBatching=!1,e===!0&&this.flush()},_.flush=function(){this._flush()},_.startAuthBatching=function(){this._isAuthBatching=!0},_.stopAuthBatching=function(e){this._isAuthBatching=!1;var t=this._authChannels;this._authChannels={};var n=[];for(var i in t){var s=this.getSubscription(i);s&&n.push(i)}if(0==n.length)return void(e&&e());var r={client:this.getClientId(),"channels[]":n},o=this;d.request(this._config.authEndpoint,"post",{headers:this._config.authHeaders,data:r}).done(function(e){for(var t in n){var i=n[t],s=e[i];if(s)if(s.status&&200!==s.status)o._subscribeResponse({error:s.status,body:{channel:i}});else{var r={method:"subscribe",params:{channel:i,client:o.getClientId(),info:s.info,sign:s.sign}};o.send(r)}else o._subscribeResponse({error:404,body:{channel:i}})}}).fail(function(){o._debug("authorization request failed");for(var e in n){var t=n[e];o._subscribeResponse({error:"authorization request failed",body:{channel:t}})}return!1}).always(function(){e&&e()})},_.subscribe=function(e,t){if(arguments.length<1)throw"Illegal arguments number: required 1, got "+arguments.length;if(!h(e))throw"Illegal argument type: channel must be a string";if(this.isDisconnected())throw"Can not subscribe in disconnected state";var n=this.getSubscription(e);if(null!==n)return n;var i=new g(this,e);return this._subscriptions[e]=i,i.subscribe(t),i},_.unsubscribe=function(e){if(arguments.length<1)throw"Illegal arguments number: required 1, got "+arguments.length;if(!h(e))throw"Illegal argument type: channel must be a string";if(!this.isDisconnected()){var t=this.getSubscription(e);null!==t&&t.unsubscribe()}},_.publish=function(e,t,n){var i=this.getSubscription(e);return null===i?(this._debug("subscription not found for channel "+e),null):(i.publish(t,n),i)},_.presence=function(e,t){var n=this.getSubscription(e);return null===n?(this._debug("subscription not found for channel "+e),null):(n.presence(t),n)},_.history=function(e,t){var n=this.getSubscription(e);return null===n?(this._debug("subscription not found for channel "+e),null):(n.history(t),n)},_.refresh=function(){var e=this;this._debug("refresh"),d.request(this._config.refreshEndpoint,"post",{headers:this._config.refreshHeaders,data:{}}).done(function(t){if(e._config.user=t.user,e._config.project=t.project,e._config.timestamp=t.timestamp,e._config.info=t.info,e._config.token=t.token,e._reconnect&&e.isDisconnected())e.connect();else{var n={method:"refresh",params:{user:e._config.user,project:e._config.project,timestamp:e._config.timestamp,info:e._config.info,token:e._config.token}};e.send(n)}}).fail(function(t){e._debug(t),e._debug("error getting connect parameters"),e._refreshTimeout&&window.clearTimeout(e._refreshTimeout),e._refreshTimeout=window.setTimeout(function(){e.refresh.call(e)},3e3)})},e(g,t);var b=g.prototype;b.getChannel=function(){return this.channel},b.getCentrifuge=function(){return this._centrifuge},b.subscribe=function(e){var t={method:"subscribe",params:{channel:this.channel}};c(this.channel,this._centrifuge._config.privateChannelPrefix)?this._centrifuge._isAuthBatching?this._centrifuge._authChannels[this.channel]=!0:(this._centrifuge.startAuthBatching(),this.subscribe(e),this._centrifuge.stopAuthBatching()):this._centrifuge.send(t),e&&this.on("message",e)},b.unsubscribe=function(){this._centrifuge._removeSubscription(this.channel);var e={method:"unsubscribe",params:{channel:this.channel}};this._centrifuge.send(e)},b.publish=function(e,t){var n={method:"publish",params:{channel:this.channel,data:e}};t&&this.on("publish:success",t),this._centrifuge.send(n)},b.presence=function(e){var t={method:"presence",params:{channel:this.channel}};e&&this.on("presence",e),this._centrifuge.send(t)},b.history=function(e){var t={method:"history",params:{channel:this.channel}};e&&this.on("history",e),this._centrifuge.send(t)},"function"==typeof define&&define.amd?define(function(){return l}):"object"==typeof module&&module.exports?module.exports=l:this.Centrifuge=l}).call(this);
YUI.add("button-base",function(d){var j=d.Lang,l=d.ClassNameManager,E=function(){},k="press",q="type",y="push",t="submit",w="reset",n="split",o="menu",v="select",m="-pressed",g="-default",c="-disabled",h="no-label",u="before",x="after",B="boundingBox",i="callback",p="Change",r="contentBox",A="default",z="disabled",D="enabled",b="href",f="icon",C="label",a="tabIndex",s="title";function e(F){}e.EVENTS={PRESS:k};e.TYPES={PUSH:y,RESET:w,SUBMIT:t};e.ATTRS={label:{valueFn:"_labelValueFn",validator:j.isString,setter:"_labelSetterFn",lazyAdd:false},callback:{validator:j.isFunction},enabled:{value:true,validator:j.isBoolean},"default":{value:false,validator:j.isBoolean},icon:{value:A,setter:"_iconSetterFn",lazyAdd:false},iconPosition:{value:u},iconTemplate:{value:'<span class="yui3-icon" />'},href:{value:"#"},title:{validator:j.isString,setter:"_titleSetterFn"},tabIndex:{value:0},type:{value:y,validator:j.isString,lazyAdd:false}};e.prototype={_className:null,_mouseIsDown:false,_mouseUpHandle:null,_iconNode:null,_baseInitializer:function(){this.publish(k,{defaultFn:function(){this._defPressFn.apply(this,arguments);}});},_baseRenderUI:function(){var F=this.get(b);if(F){this.get(B).setAttribute(b,F);}else{this.get(B).set(a,0);}this.get(r).setContent(this.get(C));this._updateIcon();},_baseBindUI:function(){var F=this.get(B);F.on("click",this._defClickFn,this);F.on("mouseup",this._mouseUp,this);F.on("mousedown",this._mouseDown,this);F.after(a+p,this._afterTabIndexChange,this);this.after(A+p,this._afterDefaultChanged,this);this.after(D+p,this._afterEnabledChanged,this);this.after(f+"Position"+p,this._afterIconPositionChanged,this);this.after(f+"Template"+p,this._afterIconTemplateChanged,this);},_baseSyncUI:function(){},disable:function(){this.set(D,false);return this;},enable:function(){this.set(D,true);return this;},_defClickFn:function(G){var F=this.get(b);if(!this.get(D)){G.preventDefault();return;}if(!F||F==="#"){G.preventDefault();}this.fire(k,{click:G});},_defPressFn:function(F){this._executeCallback(F);},_mouseUp:function(){this.get(B).removeClass(this._className+m);this._mouseIsDown=false;if(this._mouseUpHandle!==null){this._mouseUpHandle.detach();this._mouseUpHandle=null;}},_mouseDown:function(){if(this.get(D)){this.get(B).addClass(this._className+m);this._mouseIsDown=true;if(this._mouseUpHandle===null){this._mouseUpHandle=d.on("mouseup",d.bind(this._listenForMouseUp,this));}}},_listenForMouseUp:function(){this._mouseUp();},_executeCallback:function(F){if(this.get(i)){(this.get(i))(F);}else{(this._callbackFromType())(F);}},_callbackFromType:function(){var F=this.get(B).ancestor("form");switch(this.get(q)){case t:if(F){return d.bind(F.submit,F);}break;case w:if(F){return d.bind(F.reset,F);}break;}return E;},_updateIcon:function(){var F=this.get("iconPosition"),H=this.get("boundingBox"),G=this._iconNode||d.Node.create(this.get("iconTemplate"));if(F===x){H.append(G);}else{H.prepend(G);}this._iconNode=G;},_updateEnabled:function(G){var H=this.get(B),F=this._className+c;if(G){H.removeClass(F);H.removeAttribute(z);}else{H.addClass(F);H.removeClass(this._className+m);H.setAttribute(z,z);}},_updateDefault:function(G){var H=this.get(B),F=this._className+g;if(G){H.addClass(F);H.setAttribute(A,A);}else{H.removeClass(F);H.removeAttribute(A);}},_updateTabIndex:function(F){var G=this.get(B);if(F!==undefined&&F!==null){G.setAttribute(a,F);}else{G.removeAttribute(a);}},_afterIconPositionChanged:function(F){this._updateIcon();},_afterIconTemplateChanged:function(F){if(this._iconNode){this._iconNode.remove(true);}this._iconNode=null;this._updateIcon();},_afterEnabledChanged:function(F){this._updateEnabled(F.newVal);},_afterDefaultChanged:function(F){this._updateDefault(F.newVal);},_afterTabIndexChange:function(F){this._updateTabIndex(F.newVal);},_iconSetterFn:function(F){this.get(B).replaceClass(l.getClassName(f,this.get(f)||A),l.getClassName(f,F||A));return F;},_labelSetterFn:function(G){var F=this.get(s);if(!G||G===""){this.get(B).addClass(this.getClassName(h));}else{this.get(B).removeClass(this.getClassName(h));}this.get(r).setContent(G);if(F===""||F===null||F===undefined){this.set(s,G);}return G;},_titleSetterFn:function(F){this.get(B).set(s,F);return F;},_labelValueFn:function(){}};d.namespace("Button").Base=e;},"@VERSION@",{requires:["node","event","event-mouseenter","classnamemanager"]});YUI.add("button-simple",function(f){var a="default",e="enabled",c="tabIndex",d="boundingBox",b="contentBox";f.namespace("Button").Simple=f.Base.create("button-simple",f.Plugin.Base,[f.Button.Base],{_cssPrefix:null,initializer:function(){this._baseInitializer();this._className="yui3-button";this._render();},_render:function(){this._renderUI();this._bindUI();this._syncUI();},_renderUI:function(){this._updateType();this._updateNode();this.get(d).addClass(this.getClassName());this.get(b).addClass(this.getClassName("content"));this._updateIcon();},_bindUI:function(){this._baseBindUI();},_syncUI:function(){this._updateDefault(this.get(a));this._updateEnabled(this.get(e));this._updateTabIndex(this.get(c));},getClassName:f.cached(function(){var h=f.Array(arguments),g="yui3-button",i="-";if(h[h.length-1]!==true){h.unshift(g);}else{h.pop();}return h.join(i);}),_boundingBoxGetterFn:function(){return this.get("host");},_contentBoxGetterFn:function(){var h=this.get(d),g=h.one(">*");if(g){return g;}else{return h;}},_labelValueFn:function(){var h=this.get(b),g=h.getContent();if(g===""&&h.get("tagName").toUpperCase()==="INPUT"){g=h.getAttribute("value");if(g===""){if(h.getAttribute("type").toUpperCase()==="SUBMIT"){g="Submit";}else{if(h.getAttribute("type").toUpperCase()==="RESET"){g="Reset";}}}}return g.replace("<","&lt;").replace(">","&gt;");},_updateType:function(){var k=this.get("host"),g=k.get("tagName").toUpperCase(),i=f.Button.Base.TYPES,h,j;if(g==="A"){h=k.getAttribute("href");if(h||h!=="#"){this.set("type",i.LINK);this.set("href",h);return;}}if(g==="INPUT"){j=k.getAttribute("type").toUpperCase();if(j==="SUBMIT"){this.set("type",i.SUBMIT);
return;}else{if(j==="RESET"){this.set("type",i.RESET);return;}}}this.set("type",i.LINK);},_updateNode:function(){var j=this.get("host"),i=j.get("tagName").toUpperCase(),k,h,g;if(i!=="A"){k=f.Node.create("<a>");k.setContent(j.getContent());k.setAttribute("class",j.getAttribute("class"));k.setAttribute("id",j.getAttribute("id"));j.replace(k);this._setStateVal("host",k);j=k;}h=j.one(">*");if(h===null){g=j.getContent();h=f.Node.create("<span>");if(g){h.setContent(g);}else{h.setContent(this.get("label"));}j.setContent(h);}}},{NS:"button",ATTRS:{boundingBox:{getter:"_"+d+"GetterFn"},contentBox:{getter:"_"+b+"GetterFn"}}});},"@VERSION@",{requires:["button-base","base-build","plugin","classnamemanager"]});YUI.add("button-advanced",function(a){var d="default",h="enabled",e="disabled",b="innerHTML",i="href",c="title",g="tabIndex",f=a.Base.create("button",a.Widget,[a.Button.Base,a.WidgetChild],{BOUNDING_TEMPLATE:"<a />",CONTENT_TEMPLATE:"<span />",_className:null,_defaultCB:function(){return null;},initializer:function(){this._className=this.getClassName();this._baseInitializer();},renderUI:function(){this._baseRenderUI();},bindUI:function(){this._baseBindUI();},syncUI:function(){this._updateDefault(this.get(d));this._updateEnabled(this.get(h));this._updateTabIndex(this.get(g));}},{ATTRS:{},HTML_PARSER:{enabled:function(j){return !j.get(e);},label:function(j){if(j.getAttribute("value")){return j.getAttribute("value");}if(j.get(b)){return j.get(b);}if(j.get("tagName")==="INPUT"){switch(j.get("type")){case"reset":return"Reset";case"submit":return"Submit";}}return null;},href:function(k){var j=k.getAttribute(i);if(j){return j;}return null;},type:function(k){var j=k.getAttribute("type");if(j){return j;}return null;},title:function(j){if(j.getAttribute(c)){return j.getAttribute(c);}if(j.getAttribute("value")){return j.getAttribute("value");}if(j.get(b)){return j.get(b);}return null;}}});a.namespace("Button").Advanced=f;},"@VERSION@",{requires:["button-base","base-build","widget","widget-child"]});YUI.add("button-toggle",function(d){var c=d.Lang,a="deselectedCallback",b="selected",f=null;f=d.Base.create("button-plugin-toggle",d.Plugin.Base,[],{_host:null,initializer:function(){this._host=this.get("host");this.beforeHostMethod("_defPressFn",this._defPressFn);this.after(b+"Change",this._selectedChangeFn,this);},_defPressFn:function(h){var g=(this.get(b)===0)?1:0;this.set(b,g);return new d.Do.Prevent();},_selectedChangeFn:function(i){var g=i.newVal,j=this._host.get("boundingBox"),h=this._host._className+"-"+b;if(g){j.addClass(h);this._host._executeCallback(i);}else{j.removeClass(h);this._executeDeselectCallback(i);}},_executeDeselectCallback:function(g){if(this.get(a)){(this.get(a))(g);}}},{NS:"tgl",ATTRS:{deselectedCallback:{validator:d.Lang.isFunction,value:function(){}},selected:{value:0}}});d.namespace("Button.Plugin").Toggle=f;var e=d.Base.create("button",d.Button.Advanced,[],{initializer:function(g){this.plug(f,g);},bindUI:function(){this.after("selectedChange",function(g){this.set("toggleSelected",g.newVal);},this);this.after("button:press",function(h){var g=this.get("selected")===1?0:1;this.set("selected",g);},this);e.superclass.bindUI.apply(this,arguments);},toggle:function(){if(this.hasPlugin("tgl")){var g=this.tgl;g.set("selected",!g.get("selected"));}},_deselectedCallbackSetter:function(g){if(this.hasPlugin("tgl")){return this.tgl.set(a,g);}return null;},_deselectedCallbackGetter:function(){if(this.hasPlugin("tgl")){return this.tgl.get(a);}return null;},_toggleSelectedSetter:function(g){if(this.hasPlugin("tgl")){return this.tgl.set(b,g);}return null;},_toggleSelectedGetter:function(){if(this.hasPlugin("tgl")){return this.tgl.get(b);}return null;}},{NAME:"button",ATTRS:{deselectedCallback:{setter:"_"+a+"Setter",getter:"_"+a+"Getter"},toggleSelected:{setter:"_toggleSelectedSetter",getter:"_toggleSelectedGetter"},type:{value:"toggle"}}});d.namespace("Button").Toggle=e;},"@VERSION@",{requires:["button-advanced","plugin","base-build"]});YUI.add("button-panel",function(b){var a=b.Lang,e="panelNode",i="panelContent",f="visible",d="panelVisible",j="panelOffset",c=null,g=null;g=b.Base.create("button-plugin-panel",b.Plugin.Base,[],{_panelNode:null,_host:null,initializer:function(){this._host=this.get("host");c=this._host._className+"-panel-"+f;this.afterHostMethod("render",this._render,this);this.afterHostEvent("press",this.toggleVisible,this);},_render:function(){this._renderUI();this._bindUI();this._syncUI();},_renderUI:function(){var k=b.Node.create('<div class="'+this._host._className+'-panel">'),l=this.get(j),m=this._host.get("boundingBox");k.setStyle("position","absolute");k.setY(m.getY()+m.get("offsetHeight")+l[1]);k.setX(m.getX()+l[0]);k.setContent(this.get(i));m.insert(k,"after");this.set(e,k);this._panelNode=k;},_bindUI:function(){this.after(d+"Change",this._visibilityChange,this);this.after(i+"Change",this._contentChange,this);this._panelNode.on("click",function(k){this.set("panelVisible",false);},this);},_syncUI:function(){this._updateVisibility(this.get(d));},toggleVisible:function(){this.set(d,!this.get(d));},_visibilityChange:function(k){this._updateVisibility(k.newVal);},_updateVisibility:function(k){k=a.isBoolean(k)?k:false;if(k){this._showPanel();}else{this._hidePanel();}},_showPanel:function(){this._panelNode.addClass(c);},_hidePanel:function(){this._panelNode.removeClass(c);},_contentChange:function(k){this._panelNode.setContent(k.newVal);}},{NS:"pnl",ATTRS:{panelNode:{value:null},panelContent:{value:""},panelVisible:{value:false},panelOffset:{value:[0,0]}}});b.namespace("Button.Plugin").Panel=g;function h(){h.superclass.constructor.apply(this,arguments);}b.extend(h,b.Button.Advanced,{initializer:function(k){this.plug(g,k);},toggleVisible:function(){if(this.hasPlugin("pnl")){this.pnl.toggleVisible();}},_panelNodeSetter:function(k){if(this.hasPlugin("pnl")){return this.pnl.set(e,k);}return k;},_panelNodeGetter:function(){if(this.hasPlugin("pnl")){return this.pnl.get(e);}return val;},_panelContentSetter:function(k){if(this.hasPlugin("pnl")){return this.pnl.set(i,k);
}return k;},_panelContentGetter:function(){if(this.hasPlugin("pnl")){return this.pnl.get(i);}return val;},_panelVisibleSetter:function(k){if(this.hasPlugin("pnl")){return this.pnl.set(e,k);}return k;},_panelVisibleGetter:function(){if(this.hasPlugin("pnl")){return this.pnl.get(e);}return val;},_panelOfsetSetter:function(k){if(this.hasPlugin("pnl")){return this.pnl.set(j,k);}return k;},_panelOffsetGetter:function(){if(this.hasPlugin("pnl")){return this.pnl.get(j);}return val;}},{NAME:"button",ATTRS:{panelNode:{setter:"_panelNodeSetter",getter:"_panelNodeGetter"},panelContent:{setter:"_panelContentSetter",getter:"_panelContentGetter"},panelVisible:{setter:"_panelVisibleSetter",getter:"_panelVisibleGetter"},type:{value:"panel"},panelOffset:{setter:"_panelOffsetSetter",getter:"_panelOffsetGetter"}}});b.namespace("Button").Panel=h;},"@VERSION@",{requires:["button-advanced","plugin","base-build"]});YUI.add("button-group",function(c){var b=c.Lang,a=null;a=c.Base.create("button-group",c.Widget,[c.WidgetParent,c.WidgetChild],{labelNode:null,initializer:function(d){},renderUI:function(){var d=c.Node.create('<span class="'+this._className+'-label"/>');this.get("boundingBox").prepend(d);this.labelNode=d;},bindUI:function(){this.on("button:press",function(g){if(this.get("alwaysSelected")){var f=this.get("selection"),d=g.target;if(f===d||(d instanceof c.ArrayList&&d.size()===1&&d.item(0)===d)){g.preventDefault();}}},this);},syncUI:function(){this.labelNode.setContent(this.get("label"));},_labelSetter:function(e){var d=this.labelNode;if(d){d.setContent(e);}return e;}},{ATTRS:{label:{validator:b.isString,setter:"_labelSetter"},defaultChildType:{value:c.Button.Advanced},alwaysSelected:{value:false}}});c.namespace("Button").Group=a;},"@VERSION@",{requires:["base-build","widget","widget-parent","widget-child","button-advanced"]});YUI.add("button",function(a){},"@VERSION@",{use:["button-base","button-simple","button-advanced"]});
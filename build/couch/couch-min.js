YUI.add("couch-base",function(e){var a=e.Lang,c=a.isBoolean,d="dataSource",b="couch:error";e.namespace("Couch").Base=e.Base.create("couch-base",e.Base,[],{initializer:function(){this.publish(b,{defaultFn:this._defErrorFn});},_getDataSource:function(f){if(f===true){return this._newDataSource();}return this.get(d);},_newDataSource:function(){return new e.Couch.DataSource(this.getAttrs());},_createDefaultDataSource:function(){return this._newDataSource();},_defErrorFn:function(f){}},{ATTRS:{dataSource:{valueFn:"_createDefaultDataSource"}}});e.QueryString._oldStringify=e.QueryString.stringify;e.QueryString.stringify=function(g,h,f){if(c(g)||Object.prototype.toString.call(g)==="[object Boolean]"){g=g.toString();}return e.QueryString._oldStringify(g,h,f);};},"@VERSION@",{requires:["base-build","querystring","json","event","couch-datasource"]});YUI.add("couch-connect",function(e){var c=e.Lang,b=c.isString,d="couch:error",f="couch:info",a="couch:fetchAll";e.namespace("Couch").Connect=e.Base.create("couch-base",e.Couch.Base,[],{initializer:function(){this.publish(f,{defaultFn:this._defInfoFn});this.publish(a,{defaultFn:this._defFecthAllFn});this.fetchInfo(true);},fetchInfo:function(g){var i=this._getDataSource(g),h={success:e.bind(function(j){this.fire(f,{response:e.JSON.parse(j.response.results[0].responseText)});},this),failure:e.bind(function(j){this.fire(d,{message:"An error occurred fetching the information: "+j.error.message});},this)};i.set("source",this.get("baseURI")+"/");i.sendRequest({callback:h});return i;},fetchAllDatabases:function(g){var i=this._getDataSource(g),h={success:e.bind(function(j){this.fire(a,{response:e.JSON.parse(j.response.results[0].responseText)});},this),failure:e.bind(function(j){this.fire(d,{message:"An error occurred fetching the list of databases: "+j.error.message});},this)};i.set("source",this.get("baseURI")+"/_all_dbs");i.sendRequest({callback:h});return i;},getDatabase:function(g){return(new e.Couch.DB({baseURI:this.get("baseURI"),name:g}));},replicate:function(i,j,g){if(!b(i)&&!b(j)){}var h=this._getDataSource(true);g=g||{};g.source=i;g.target=j;h.set("source",this.get("baseURI")+"/_replicate");h.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"POST",data:g}});},_baseURISetter:function(i){var h=i.length,g=i.substring(h-1);if(g==="/"){i=i.substring(0,h-1);}return i;},_defFecthAllFn:function(g){this._set("databases",g.response);},_defInfoFn:function(g){this._set("info",g.response);}},{ATTRS:{baseURI:{setter:"_baseURISetter"},databases:{value:[],readOnly:true},info:{value:{},readOnly:true}}});},"@VERSION@",{requires:["couch-base","couch-db"]});YUI.add("couch-datasource",function(a){a.namespace("Couch").DataSource=a.Base.create("couch-datasource",a.DataSource.IO,[],{},{});},"@VERSION@",{requires:["datasource"]});YUI.add("couch-db",function(c){var b="couch:error",d="couch:info",a="couch:fetchAll";c.namespace("Couch").DB=c.Base.create("couch-db",c.Couch.Base,[],{_uri:"",initializer:function(e){this.publish(d,{defaultFn:this._defInfoFn});this.publish(a,{defaultFn:this._defFecthAllFn});this.fetchInfo();},fetchInfo:function(){var g=this._getDataSource(true),e=this._uri,f={success:c.bind(function(h){this.fire(d,{response:c.JSON.parse(h.response.results[0].responseText)});},this),failure:c.bind(function(h){this.fire(b,{message:"An error occurred fetching the information for the databases: "+h.error.message});},this)};g.set("source",e);g.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"GET"},callback:f});return g;},fetchAllDocuments:function(f){var h=this._getDataSource(true),e=this._uri+"_all_docs",g={success:c.bind(function(i){this.fire(a,{response:c.JSON.parse(i.response.results[0].responseText)});},this),failure:c.bind(function(i){this.fire(b,{message:"An error occurred fetching the information for the databases: "+i.error.message});},this)};h.set("source",e);h.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"GET",data:f},callback:g});return h;},getDocument:function(e){return new c.Couch.Document({baseURI:this.get("baseURI"),databaseName:this.get("name"),id:e});},_baseURISetter:function(e){this._uri=e+"/"+this.get("name")+"/";return e;},_nameSetter:function(e){this._uri=this.get("baseURI")+"/"+e+"/";return e;},_defInfoFn:function(f){this._set("info",f.response);},_defFecthAllFn:function(f){this._set("documents",f.response);}},{ATTRS:{baseURI:{value:"",setter:"_baseURISetter"},name:{value:"",setter:"_nameSetter"},info:{readOnly:true},documents:{readOnly:true}}});},"@VERSION@",{requires:["couch-base","couch-document"]});YUI.add("couch-document",function(d){var c="couch:error",f="couch:info",b="couch:opened",e="couch:saved",a="couch:deleted";d.namespace("Couch").Document=d.Base.create("couch-document",d.Couch.Base,[],{_uri:"",initializer:function(g){this.publish(f,{defaultFn:this._defInfoFn});this.publish(b,{defaultFn:this._defOpenedFn});this.publish(e,{defaultFn:this._defSavedFn});this.publish(a,{defaultFn:this._defRemovedFn});this.fetchInfo();},fetchInfo:function(){var i=this._getDataSource(true),g=this._uri,h={success:d.bind(function(j){this.fire(f,{response:d.JSON.parse(j.response.results[0].responseText)});},this),failure:d.bind(function(j){this.fire(c,{message:"An error occurred fetching the information for the databases: "+j.error.message});},this)};i.set("source",g);i.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"GET"},callback:h});return i;},getAllViews:function(){var g=this.get("info");if(!g||!g.views){this.fire("EVENT_ERROR",{message:"There is no information for this document available."});return[];}return(d.Object.keys(g.views));},getView:function(h,g){g=g||{};g.name=h;g.baseURI=this._uri;return new d.Couch.View(g);},open:function(h){var j=this._getDataSource(true),g=this._uri,i={success:d.bind(function(k){this.fire(b,{response:d.JSON.parse(k.response.results[0].responseText)});},this),failure:d.bind(function(k){this.fire(c,{message:"An error occurred opening the document: "+k.error.message});
},this)};j.set("source",g);j.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"GET",data:h},callback:i});return j;},save:function(i){var g=this.get("data"),k=this._getDataSource(true),h=this._uri,j={success:d.bind(function(l){this.fire(e,{response:d.JSON.parse(l.response.results[0].responseText)});},this),failure:d.bind(function(l){this.fire(c,{message:"An error occurred opening the document: "+l.error.message});},this)};if(!g||!g._id){this.fire(c,{message:"No data found on the document to save."});return null;}h+=encodeURIComponent(g._id);if(i!==undefined){h+="?"+this._queryString(i);}k.set("source",h);k.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"PUT",data:g},callback:j});return k;},remove:function(g){},_defInfoFn:function(g){this.set("info",g.response);},_defOpenedFn:function(g){this._set("data",g.response);},_defSavedFn:function(g){},_defRemovedFn:function(g){},_baseURISetter:function(g){this._uri=g+"/"+this.get("databaseName")+"/"+this.get("id");return g;},_databaseNameSetter:function(g){this._uri=this.get("baseURI")+"/"+g+"/"+this.get("id");return g;},_idSetter:function(g){g=encodeURIComponent(g);this._uri=this.get("baseURI")+"/"+this.get("databaseName")+"/"+g;return g;}},{ATTRS:{baseURI:{value:"",setter:"_baseURISetter"},databaseName:{value:"",setter:"_databaseNameSetter"},id:{value:"",setter:"_idSetter"},info:{readOnly:true},data:{readOnly:true}}});},"@VERSION@",{requires:["couch-base","couch-view"]});YUI.add("couch-view",function(f){var a=f.Lang,d=a.isBoolean,b=a.isNumber,c="couch:error",e="couch:data";f.namespace("Couch").View=f.Base.create("couch-view",f.Couch.Base,[],{_uri:"",initializer:function(g){this.publish(e,{defaultFn:this._defDataFn});},fetchData:function(){var k=this._getDataSource(true),i=this._uri,j={success:f.bind(function(l){this.fire(e,{response:f.JSON.parse(l.response.results[0].responseText)});},this),failure:f.bind(function(l){this.fire(c,{message:"An error occurred fetching the information for the databases: "+l.error.message});},this)},h=this.getAttrs(),g={};f.Object.each(h,function(n,l,m){if(n===null||n===undefined){return;}if(l==="baseURI"||l==="name"||l==="dataSource"||l==="destroyed"||l==="initialized"||l==="data"){return;}g[l]=n;});k.set("source",i);k.sendRequest({cfg:{headers:{"Content-Type":"application/json"},method:"GET",data:g},callback:j});return k;},_baseURISetter:function(g){this._uri=g+"/_view/"+this.get("name");return g;},_nameSetter:function(g){this._uri=this.get("baseURI")+"/_view/"+g;return g;},_defDataFn:function(g){this._set("data",g.response);}},{ATTRS:{baseURI:{setter:"_baseURISetter"},name:{value:"",setter:"_nameSetter"},data:{},descending:{value:false,validator:d},endkey:{},"endkey_docid":{},group:{value:false,validator:d},"group_level":{},"include_docs":{value:false,validator:d},"inclusive_end":{value:true,validator:d},key:{},limit:{validotor:b},reduce:{validator:d},skip:{value:0,validator:b},stale:{validator:function(g){return(g==="ok"||g==="update_after");}},startkey:{},"startkey_docid":{}}});},"@VERSION@",{requires:["couch-base"]});YUI.add("couch",function(a){},"@VERSION@",{use:["couch-base","couch-connect","couch-db","couch-document","couch-view"]});
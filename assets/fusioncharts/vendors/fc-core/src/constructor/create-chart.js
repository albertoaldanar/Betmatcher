import{UNDEF,BLANK,pluckNumber}from'../lib';import{triggerEvent}from'../event-api';import{getDepsByType,getDep}from'../dependency-manager';import{priorityList}from'../schedular';import GlobalStore from'./global-store';let percentRegex=/\%/,globalStore=new GlobalStore,handleContainerResize=function(){var a,b,c={},d=function(){var e,f,g,h,i,j,k,l,m=0,n=parseInt(b.options.resizeTrackingInterval,10)||300,o={},p=function(){o.itemVar._containerOffsetW=o.parentEle.offsetWidth,o.itemVar._containerOffsetH=o.parentEle.offsetHeight};for(e in c)m+=1,f=c[e],g=f.jsVars,i=f.ref,!f.disposed&&(h=i&&i.parentNode)&&(j=i.style)&&(percentRegex.test(j.width)||percentRegex.test(j.height))?(k=h.offsetWidth,l=h.offsetHeight,!g.resizeLocked&&(k&&g._containerOffsetW!==k||l&&g._containerOffsetH!==l)&&(f.resizeTo&&f.resizeTo(),o.itemVar=g,o.parentEle=h,setTimeout(p,1))):(delete c[e],m-=1);a=m?setTimeout(d,n):clearTimeout(a)};return function(e,f,g){var h=e.jsVars,i=f||e.ref&&e.ref.parentNode||{};b=g,h._containerOffsetW=i.parentNode.offsetWidth,h._containerOffsetH=i.parentNode.offsetHeight,c[e.id]=e,a||(a=setTimeout(d,parseInt(g.options.resizeTrackingInterval,10)||300))}}();function createChart(a,b,c,d,e,f,g,h){var i=Math.max;let j,k,l,m,n,o,p=b.apiInstance,q=b.jsVars,r=percentRegex.test(b.width)?c.offsetWidth:b.width,s=percentRegex.test(b.height)?c.offsetHeight:b.height;if(c.FusionCharts=a.items[b.id],b.__state.beforedrawFired=!0,d=d||b.chartType(),j=getDep(d,'chartapi'),!j&&(l=getDep(d,'maps'))&&(j=getDep('maps','chartapi'),m=!0),p&&p.getName().toLowerCase()!==d.toLowerCase()&&(p.remove({instant:!0}),p=UNDEF),p&&p.getName().toLowerCase()===d.toLowerCase()||(p=b.apiInstance=new j,globalStore.attachChild(p,'chartAPI')),m)for(let a in l=l[0],l)l.hasOwnProperty(a)&&(p.config[a]=l[a]);if(p.addToEnv('core-options',a.options),p.addToEnv('chartInstance',b),p.addToEnv('chart',p),p.addToEnv('chart-container',c),p.addToEnv('eventListeners',[]),p.addToEnv('chartWidth',i(0,r)),p.addToEnv('chartHeight',i(0,s)),p._removeWaitingJobs(),p.setDummyEImethods(d),p.config.origRenderWidth=b.__state.renderedWidth,p.config.origRenderHeight=b.__state.renderedHeight,'base'===d||f)isDataErroneous(b,h),setChartMsgStyle(b,g),p.createBaseComponent(),p.getFromEnv('animationManager').setAnimationState('chartmessage'),p.setChartMessage(f,b,c),p.drawChartMessage();else if(!b.__state.resize){if(p.getFromEnv('toolTipController')||(n=getDep('ToolTipController'),o=new n(c,p),p.addToEnv('toolTipController',o)),p.disposeChartStyleSheet(),c.jsVars=b.jsVars,k=p.eiMethods,b.ref=c,q.type=d,k&&'string'!=typeof k)for(let a in k)c[a]=k[a];!h&&b.__state.newDataArrived?triggerEvent('beforedataload',b,{data:b.getChartData(getDepsByType('transcoder').JSON,!0,!0)},void 0,dataloadSuccess,dataloadCancel):dataloadSuccess.call(b,void 0,void 0,h)}else p.asyncDraw();b.disposed||invokeCallback(b,c,e,{hasRendered:!0,container:c},a)}function dataloadSuccess(a,b,c=!1){let d,e,f=this,g=f.apiInstance,h=f.getChartData(getDepsByType('transcoder').JSON,!0,!0),i=h.data;c||triggerEvent('dataloaded',f,{},[f.id]),f.__state&&(f.__state.newDataArrived=!1),g.addToEnv('dataSource',i),g.addToEnv('chart-attrib',i.chart),d=pluckNumber(i.chart&&i.chart.applycsstransform,0),g._checkInvalidData()||g._checkInvalidSpecificData()?(g.getContainer('parentgroup')&&g.getContainer('parentgroup').hide(),g.createBaseComponent(),g.getFromEnv('animationManager').setAnimationState('chartmessage'),g.setChartMessage(),g.drawChartMessage(),f._sudoSetState(1),triggerEvent('nodatatodisplay',f,{},[f.id])):(g.config.hasChartMessage=!1,e=g.getFromEnv('toolTipController'),d&&e?e.setApplyScale(d):e.setApplyScale(0),'timeseries'===g.getName()?g.setData(Object.assign({},i)):g.setData(i))}function dataloadCancel(a){triggerEvent('dataloadcancelled',a,{},[a.id]),a.__state&&(a.__state.newDataArrived=!1)}function postRenderHooks(a,b,c){a.apiInstance.addJob('fire-rendered',function(){if((a.apiInstance.config.hasRendered=c.hasRendered,'waiting'===a._getState()||'function'!=typeof b||b(c),'waiting'===a._getState()||(triggerEvent('drawcomplete',a,{width:a.jsVars.width,height:a.jsVars.height,drawCount:a.jsVars.drawCount,displayingMessage:'waiting'===a._getState()||'error'===a._getState(),renderer:'javascript'},[a.id]),a.__state&&delete a.__state.beforedrawFired),!a.disposed)&&'ready'===a._getState()){if(a.__state.rendering&&triggerEvent('rendered',a,{renderer:'javascript'},[a.id]),a.disposed)return;if(triggerEvent('renderComplete',a,{width:a.jsVars.width,height:a.jsVars.height,drawCount:a.jsVars.drawCount,renderer:'javascript'}),a.disposed)return;a.__state&&delete a.__state.rendering,a.__state.renderComplete=!0}},priorityList.postRender)}function invokeCallback(a,b,c,d,e){let f=a.jsVars,g=a.apiInstance,i=f.fcObj,j=i.width,k=i.height,h=f.overlayButton;f.width=g.getFromEnv('chartWidth'),f.height=g.getFromEnv('chartHeight'),f.container=b,f.hcObj=a,f.hcObj.container=b,f.instanceAPI=g,a.hasRendered&&f.overlayButtonActive&&h&&(h.innerHTML=BLANK,h.appendChild(document.createTextNode(f.overlayButtonMessage)),a.container.appendChild(h)),(/\%/g.test(j)||/\%/g.test(k))&&b&&b.parentNode&&!e.options.preventTrackResize&&handleContainerResize(a,b,e),postRenderHooks(a,c,d)}function isDataErroneous(a,b=!1){let c=a.options.dataErroneous;return!!c&&(a.__state.dataReady=!1,b||triggerEvent('dataInvalid',a,{error:c},UNDEF,function(){triggerEvent('dataxmlinvalid',a,{},[a.id])}),!0)}function setChartMsgStyle(a,b={}){a._chartMessageImageStyle=b.image||{},a._chartMessageStyle=b.message||{}}export{globalStore};export default createChart;
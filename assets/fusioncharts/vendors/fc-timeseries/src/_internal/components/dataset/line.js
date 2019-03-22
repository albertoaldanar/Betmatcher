import Column from'./column';import{pluck,polyPathToPath,UNDEF,defined,pluckNumber,extend2}from'../../../../../fc-core/src/lib';import LineGenerator from'../../../../../fc-utils/src/shape-generators/line-generator';import AreaGenerator from'../../../../../fc-utils/src/shape-generators/area-generator';import CurveMonotoneX from'../../../../../fc-utils/src/shape-generators/curve-factories/monotone';import LinearCurve from'../../../../../fc-utils/src/shape-generators/curve-factories/linear';import StepCurve from'../../../../../fc-utils/src/shape-generators/curve-factories/step';import{convertColor}from'../../../../../fc-core/src/lib/lib-graphics';import isValidNumber from'../../../../../fc-utils/src/type/is-valid-number';import{addDep}from'../../../../../fc-core/src/dependency-manager';import lineAnimation from'./line.animation';const HOVERED_ANCHOR_RADIUS=3.5,PLOT_HOVERED_ANCHOR_RADIUS=5.5,calculateMid=(c,a)=>(c+a)/2,_reducerFn=(a,b)=>Object.assign(a,b);let maxRadius=5,LINE='line',AREA='area',WHITE='#ffffff',isWithinShape=function(a,b,c,d,e){var f,g,h,i,j,k=Math.pow;return a?(f=a.x,g=a.y,h=c-f,i=d-g,j=Math.sqrt(k(h,2)+k(i,2)),{pointIndex:b,hovered:j<=maxRadius,pointObj:a,component:e}):{pointIndex:b,hovered:!1,component:e}};function getGenerator(a){switch(a){case'area':case'smooth-area':case'step-area':return new AreaGenerator;case'line':case'smooth-line':case'step-line':default:return new LineGenerator;}}function getCurve(a){switch(a){case'smooth-line':case'smooth-area':return CurveMonotoneX;case'step-area':case'step-line':return StepCurve;case'line':case'area':default:return LinearCurve;}}function getGenericType(a){return'line'===a||'smooth-line'===a||'step-line'===a?LINE:'area'===a||'smooth-area'===a||'step-area'===a?AREA:void 0}addDep({name:'continuousAnimation',type:'animationRule',extension:lineAnimation});class Line extends Column{constructor(){super(),this.getHoverInConfig=function(a,b){return{index:a,hovered:!0,radius:b?PLOT_HOVERED_ANCHOR_RADIUS:HOVERED_ANCHOR_RADIUS,isDsHovered:b}},this.getHoverOutConfig=function(a){return{index:a,hovered:!1}}}getName(){return'continuous'}__setDefaultConfig(){super.__setDefaultConfig();let a=this,b=a.config;b['default-stroke']='9194CC',b['default-fill']='9194CC',b['default-anchor-stroke']=convertColor(WHITE),b.type='line',b.plotStyle={},b.anchorStyle={},b.anchorHoverInStyle={},b.anchorHoverOutStyle={},b.anchorHighlightObj={},b.defaultStyle={"stroke-opacity":1,"fill-opacity":.6},b.defaultAnchorStyle={"fill-opacity":1,"stroke-width":1}}configureAttributes(a){let b,c,d=this,e=d.config;if(a.hasOwnProperty('index'))a.hovered?(e.mode='show',e.sharedAnchorIndex=a.index):(e.mode='hide',e.hideIndex=e.lastShownIndex),e.radius=a.radius,e.isDsHovered=a.isDsHovered,e.hoverMode=!0;else{for(b in a)if('primaryColor'===b){let f=a.plotCosmetics,g=a.genericCosmetics,h=a[b],i=a.type,j=getGenericType(i)===AREA,k=e.plotStyle,l=e.anchorStyle,m=e.anchorHoverInStyle,n=e.anchorHighlightObj,o=d.getFromEnv('getStyleDef'),p=o(g.style&&g.style.plot),q=o(g.style&&g.style['plot:hover']),r=o(g.style&&g.style['plot:highlight']),s=o(g.style&&g.style.anchor),t=o(g.style&&g.style['anchor:hover']),u=o(g.style&&g.style['anchor:highlight']),v=o(f.style&&f.style.generic),w=o(a.styleConfig&&a.styleConfig.plot),x=o(f.style&&f.style.plot),y=o(a.styleConfig&&a.styleConfig[i]),z=o(f.style&&f.style.anchor),A=o(a.styleConfig&&a.styleConfig.anchor),B=o(f.style&&f.style['generic:hover']),C=o(f.style&&f.style['generic:highlight']),D=o(a.styleConfig&&a.styleConfig['plot:hover']),E=o(a.styleConfig&&a.styleConfig['plot:highlight']),F=o(f.style&&f.style['anchor:hover']),G=o(f.style&&f.style['anchor:highlight']),H=o(a.styleConfig&&a.styleConfig['anchor:hover']),I=o(a.styleConfig&&a.styleConfig['anchor:highlight']);for(c in e.defaultStyle['stroke-linecap']=j?'butt':'round',[k,e.defaultStyle,p,v,w,x,y].reduce(_reducerFn),[l,e.defaultAnchorStyle,p,s,v,w,z,A].reduce(_reducerFn),k.fill=j?convertColor(pluck(h,e['default-fill']),100*k['fill-opacity']):'none',k.stroke=convertColor(j?pluck(k.stroke,h,e['default-stroke']):pluck(h,e['default-stroke']),100*k['stroke-opacity']),l.fill=convertColor(pluck(h,e['default-stroke'])),l.stroke=e['default-anchor-stroke'],[m,l,q,t,B,D,F,H].reduce(_reducerFn),[n,r,u,C,E,G,I].reduce(_reducerFn),Object.assign(Object.assign({},m),n))e.anchorHoverOutStyle[c]=l[c]||'';Object.keys(n).length||(n=e.anchorHighlightObj=extend2({},e.anchorHoverOutStyle)),e.connectNullData=pluckNumber(e.connectNullData,f.connectnulldata,g.connectnulldata,0),delete k['fill-opacity'],delete k['stroke-opacity']}else e[b]=a[b];if(!e.skipLimitCalc){e.limit=d._calculateLimits();const a=d.getFromEnv('chart');a.setYScaleLimit(e.scaleY.getId(),d.getId(),e.limit.y,e.limit.baseRequired),a.setXScaleLimit(e.scaleX.getId(),d.getId(),e.limit.x)}}}getPadding(){let a=this,b=a.getLinkedParent().config,c=a.config,d=b.enableMouseTracking?a.getValueFromPx(PLOT_HOVERED_ANCHOR_RADIUS):1,e=b.enableMarkers?a.getValueFromPx(c.dataMarkerPadding):0;return Math.max(d,e)}_getRelevantInfo(){var a=this.config;return{firstTimeStamp:a.firstTimeStamp,timeStampGap:a.timeStampGap,dataInfo:a.dataInfo,fill:a.plotStyle.stroke}}allocatePosition(){let a,b,c,e,f,g,h,i,j,k,l,m,n,o,p,d=this,q=d.config,[r,s,t,u]=q.indices,v=q.type,w=q.data,x=q.dataInfo,z=[],A=d.getFromEnv('binDecider'),B=d.getFromEnv('xScale'),C=d.getFromEnv('yScale'),D=A.getRangeThreshold()[2],E=w.length,[F,G]=B.getDomain();if(q.repositioningDone=d._isRepositioningNeeded()){if('visible'!==q.visibility)return;x=q.dataInfo=[],q.timeStampGap=D,q.availableWidth=B.getRangeValue(D)-B.getRangeValue(0),o=+B.getDomainValue(PLOT_HOVERED_ANCHOR_RADIUS)-+B.getDomainValue(0),q.actualStartDomain=+F-o,q.actualEndDomain=+G+o,w.forEach((b,d,w)=>{p=b[r],i=b[s],c=p.start,e=p.end,f=calculateMid(c,e),g=w[d+1],n=b[t],l=C.getRangeValue(n||Math.max(C.getDomain()[0],0)),m=C.getRangeValue(i),d||(j=q.firstTimeStamp=c);(v!==AREA||isValidNumber(l))&&(isValidNumber(i)&&isValidNumber(m)?(k=B.getBinIndex(c,j),a={startDate:c,endDate:e,midDate:f,value:i,paddingInTimestamp:o,yBaseValue:v===AREA?n:void 0,x:B.getRangeValue(new Date(c),new Date(e)),totalStackSum:defined(b[u])?b[u]:UNDEF,y:m,base:l,eventArgs:{index:d,dataValue:i}},x[k]=a,g?(z.push(a),h=calculateMid(g[r].start,g[r].end),!q.connectNullData&&h-f>1.5*D&&z.push(null)):1==E-d&&z.push(a)):!q.connectNullData&&z.push(null))}),b=getGenerator(v).setCurve(getCurve(v)).setDefined(a=>!!a).setXAccessor((a,b)=>z[b].x).setYAccessor((a,b)=>z[b].y),b.setYBaseAccessor&&b.setYBaseAccessor((a,b)=>z[b].base),q.path=b.generate(z),q.topPath=b.getLineYTop&&b.getLineYTop().generate(z)}}_isInvalidTooltext(a){let b=this,c=b.config;if(!a||a.midDate<c.actualStartDomain||a.midDate>c.actualEndDomain)return!0}_drawPlot(){let a,b=this,c=b.config,d=c.plotStyle,e=c.dataInfo,f=getGenericType(c.type),g=pluckNumber(d['stroke-width'],2),h=pluckNumber(d['stroke-width'],0);b.addGraphicalElement({el:'group',container:{id:'meso',label:'group'},component:b,label:'group',id:'meso-line',attr:{name:'line-common-meso',visibility:c.visibility}}),b.addGraphicalElement({el:'group',container:{id:'meso-line',label:'group'},component:b,label:'group',id:'meso-plot',attr:{name:'line-plot-meso',visibility:c.visibility}},!0),b.addGraphicalElement({el:'group',container:{id:'meso-line',label:'group'},component:b,label:'group',id:'meso-anchor',attr:{name:'line-anchor-meso',visibility:c.visibility}},!0),b.addGraphicalElement({el:'path',container:{label:'group',id:'meso-plot'},attr:Object.assign({},d,{path:c.path,"stroke-width":'area'===f?h:g}),label:'path',component:b},!0),c.topPath&&b.addGraphicalElement({el:'path',container:{label:'group',id:'meso-plot'},attr:Object.assign({},d,{path:c.topPath,fill:'none',"stroke-width":g}),label:'topPath',component:b},!0),'show'===c.mode?!isNaN(c.sharedAnchorIndex)&&(a=e[c.sharedAnchorIndex],c.lastShownIndex=c.sharedAnchorIndex,a&&!isNaN(a.value)&&b.addGraphicalElement({el:'path',container:{label:'group',id:'meso-anchor'},attr:Object.assign({path:polyPathToPath([2,a.x,a.y,c.radius,0,0]),visibility:'show'},c.isDsHovered?c.anchorHoverInStyle:c.anchorHighlightObj),id:'shared-anchor',label:c.dsType+'-anchor'})):!isNaN(c.hideIndex)&&(a=e[c.hideIndex],a&&!isNaN(a.value)&&b.addGraphicalElement({el:'path',container:{label:'group',id:'meso-anchor'},attr:{visibility:'hidden'},id:'shared-anchor',label:c.dsType+'-anchor'}))}setHoverInEffect(a,b){this.getFromEnv('animationManager').setAnimationState('mouseOver'),this.setData(this.getHoverInConfig(a,b),!0)}_getHoveredPlot(a,b){var c,d,e,f,g,h,i,k=Math.floor,l=this,m=l.getFromEnv('xScale'),n=[l.getChildren('pinMarker'),l.getChildren('flagMarker')],o=m.showPlotOverTick()?Math.round:k,p=l.config,q=p.dataInfo,r=q.length,s=l.getLinkedParent(),t=s.getTranslation(),u=t.x,v=t.y;if(a-=u,b-=v,i=m.getDomainValue(a-maxRadius).getTime(),h=(i-p.firstTimeStamp)/p.timeStampGap,d=k(Math.max(h,0)),i=m.getDomainValue(a+maxRadius).getTime(),h=(i-p.firstTimeStamp)/p.timeStampGap,e=Math.ceil(Math.min(h,r-1)),n.forEach(c=>{!f&&c&&(c=c[0])&&(f=c._checkPointOverMarker(h,a,b,p.availableWidth))}),!f)for(g=e;g>=d&&(c=q[g],f=isWithinShape(c,g,a,b,l),!f.hovered);g--);return f||(f={}),f.hovered?f.binIndexHovered=f.pointIndex:(f.binIndexHovered=o((m.getDomainValue(a).getTime()-p.firstTimeStamp)/p.timeStampGap),f.pointObj=p.dataInfo[f.binIndexHovered]||m.getBinBounds(a,p.firstTimeStamp),f.component=this),p.binIndexHovered=f.binIndexHovered,f}}export default Line;
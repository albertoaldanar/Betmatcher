import{pluckNumber}from'../../../fc-core/src/lib';const UNDEF=void 0,UNDERSCORE='_',DEFAULT_MACRO_PREFIX='$',DEFAULT_MACRO_SEPARATOR='.',pi2=2*Math.PI,threshold=1e-5,axis2d=[-pi2,-3*pi2/4,-pi2/2,-pi2/4,0],axis3d=[pi2,3*pi2/4,pi2/2,pi2/4,0],square=a=>a*a,deg2Rad=a=>a*(Math.PI/180),polarToCartesian=(a,b,c=!0,d={})=>{var e,f;return c||(b=deg2Rad(b)),e=a*Math.cos(b)+(d.x||0),f=a*Math.sin(b)+(d.y||0),{x:e,y:f}},getQuadrant=(a,b,c)=>a.x>=b?a.y<=c?0:3:a.y<=c?1:2,getEllipseRadius=(c,a,b)=>{let d,e=square(c),f=square(a);return 0===c||0===a?0:(d=c*a/Math.sqrt(f*square(Math.cos(b))+e*square(Math.sin(b))),d)},computeSlice2DBBox=a=>{var b=Math.abs,c=Math.min,d=Math.max;let e,f,g,h,j,k,l,m,n,o=a.ringpath,p=[],q=[],r=1/0,s=1/0,t=-Infinity,u=-Infinity;for(e=pluckNumber(o[2]),f=pluckNumber(o[3]),g=pluckNumber(o[4])%pi2,h=pluckNumber(o[5])%pi2,j=pluckNumber(o[0]),k=pluckNumber(o[1]),m=polarToCartesian(e,g,!0,{x:j,y:k}),n=polarToCartesian(e,h,!0,{x:j,y:k}),q.push(m),q.push(n),l=0;l<axis2d.length;l++)axis2d[l]>=g&&axis2d[l]<=h&&p.push(l);for(l=0;l<p.length;l++)m=polarToCartesian(e,axis2d[p[l]],!0,{x:j,y:k}),n=polarToCartesian(f,axis2d[p[l]],!0,{x:j,y:k}),q.push(m),q.push(n);for(m=polarToCartesian(f,g,!0,{x:j,y:k}),n=polarToCartesian(f,h,!0,{x:j,y:k}),q.push(m),q.push(n),l=0;l<q.length;l++)t=d(t,q[l].x),r=c(r,q[l].x),u=d(u,q[l].y),s=c(s,q[l].y);return{x:r,y:s,width:b(t-r),height:b(s-u)}},computeSlice3DBBox=a=>{var b=Math.abs,c=Math.min,d=Math.max;let e,f,g,h,j,k,l,m,n,o=[],p=[],q=1/0,r=1/0,s=-Infinity,t=-Infinity;e=pluckNumber(a.r),f=pluckNumber(e*a.radiusYFactor),g=pluckNumber(a.sAngle)%pi2,h=pluckNumber(a.eAngle)%pi2,j=pluckNumber(a.cx),k=pluckNumber(a.cy),m=polarToCartesian(getEllipseRadius(e,f,g),g,!0,{x:j,y:k}),n=polarToCartesian(getEllipseRadius(e,f,h),h,!0,{x:j,y:k}),p.push(m),p.push(n);for(let b=0;b<axis3d.length;b++)axis3d[b]>=g&&axis3d[b]<=h&&o.push(b);for(l=0;l<o.length;l++)m=polarToCartesian(getEllipseRadius(e,f,axis3d[o[l]]),axis3d[o[l]],!0,{x:j,y:k}),p.push(m);for(e=pluckNumber(a.innerR,0),f=pluckNumber(e*a.radiusYFactor,0),m=polarToCartesian(getEllipseRadius(e,f,g),g,!0,{x:j,y:k}),n=polarToCartesian(getEllipseRadius(e,f,h),h,!0,{x:j,y:k}),p.push(m),p.push(n),l=0;l<o.length;l++)m=polarToCartesian(getEllipseRadius(e,f,axis3d[o[l]]),axis3d[o[l]],!0,{x:j,y:k}),p.push(m);for(let b=0;b<p.length;b++)s=d(s,p[b].x),q=c(q,p[b].x),t=d(t,p[b].y),r=c(r,p[b].y);return{x:q,y:r,width:b(s-q),height:b(r-t)}},getEllipticalPoint=(c,a,b)=>{var d=Math.abs,e=Math.sqrt;let f,g,h;return h=Math.tan(b),f=c*a/e(a*a+c*c*h*h),g=c*a/e(c*c+a*a/(h*h)),b>pi2/4&&b<3*pi2/4?f*=-1:f=d(f),b>pi2/2&&b<pi2?g*=-1:g=d(g),d(f)<=threshold&&(f=0),d(g)<=threshold&&(g=0),{x:f,y:g}},compute3DSliceBounds=(c,d)=>{let e,f,g=d.props.element.attr,h=g.radiusYFactor,i=g.r,a=i*h,b=g.cx,j=g.cy,k=g.sAngle,l=g.eAngle;return'slicex'===c||'slicemiddlex'===c||'slicecenterx'===c?(e=(k+l)/2,f=getEllipticalPoint(i,a,e).x+b):'slicey'===c||'slicemiddley'===c||'slicecentery'===c?(e=(k+l)/2,f=getEllipticalPoint(i,a,e).y+j):'slicestartx'===c?f=getEllipticalPoint(i,a,k).x+b:'slicestarty'===c?f=getEllipticalPoint(i,a,k).y+j:'sliceendx'===c?f=getEllipticalPoint(i,a,l).x+b:'sliceendy'===c?f=getEllipticalPoint(i,a,l).y+j:f=xyCalculator(c,computeSlice3DBBox(g)),f},computeSliceBounds=(a,b)=>{let c,d,e,f,g,h,i,j,k=b.props.element.attr,l=k.ringpath;return d=l[0],e=l[1],f=l[2],h=l[4],i=l[5],('slicex'===a||'slicemiddlex'===a||'slicecenterx'===a?(j=(h+i)/2,c=polarToCartesian(f,j),g=c.x+d):'slicey'===a||'slicemiddley'===a||'slicecentery'===a?(j=(h+i)/2,c=polarToCartesian(f,j),g=c.y+e):'slicestartx'===a?g=polarToCartesian(f,i).x+d:'slicestarty'===a?g=polarToCartesian(f,i).y+e:'sliceendx'===a?g=polarToCartesian(f,h).x+d:'sliceendy'===a?g=polarToCartesian(f,h).y+e:g=xyCalculator(a,computeSlice2DBBox(k)),g)},computePlotBounds=(a,b)=>{let c,d,e,f,g,h=a.config||a;return'column3D'===b||'bar2D'===b||'bar3D'===b||'paretoColumn'===b||'waterFall2D'===b||'errorBar2D'===b||'candlestick'===b||'heatMap'===b||'dragColumn'===b||'sparkColumn'===b||'marimekko'===b||'task'===b||'column'===b?(d=h.props.element.attr,c={x:d.x+pluckNumber(d.xDepth,0),y:d.y-pluckNumber(d.yDepth,0),width:d.width,height:d.height}):'line'===b||'zoomLine'===b||'zoomScatter'===b||'scatter'===b||'spline'===b||'splinearea'===b||'multiaxisline'===b||'stepLine'===b||'errorScatter'===b||'errorLine'===b||'radar'===b||'selectScatter'===b||'dragLine'===b||'dragArea'===b||'kagi'===b||'sparkLine'===b||'area'===b?(e=a._xPos,f=a._yPos,g=+h.anchorProps.radius||0,c={x:e-g,y:f-g,width:2*g,height:2*g}):'bubble'===b?(d=h.props.element.attr,c={x:d.cx-d.r,y:d.cy-d.r,width:2*d.r,height:2*d.r}):'dragNode'===b?(d=h.props.element.attr,'rect'===h.shapeType?c={x:d.x,y:d.y,width:d.width,height:d.height}:(e=h._xPos,f=h._yPos,g=+h.radius||0,c={x:e-g,y:f-g,width:2*g,height:2*g})):'boxandwhisker2D'===b?(d=h.props.upperBoxElem.attr,c={x:d.x,y:d.y,width:d.width,height:d.height}):'category'===b||'polarCategory'===b||'log'===b||'numeric'===b?(d=h.props.label.attr,c={x:d.x-h.width/2,y:d.y-h.height/2,width:h.width,height:h.height},'end'===d['text-anchor']||'left'===d['text-anchor']?c.x=d.x-h.width:('start'===d['text-anchor']||'right'===d['text-anchor'])&&(c.x=d.x),'top'===d['vertical-align']?c.y=d.y:'bottom'===d['vertical-align']&&(c.y=d.y-h.height)):'multiLevelPie'===b?(d=h.props.element.attr,c=computeSlice2DBBox(d)):void 0,c},cleanMacro=a=>{let b,c,d='';for(b=0,c=a.length;b<c;b++)' '!==a[b]&&(d+=a[b]);return d},arrangeItems=(a=[])=>{let b,c,d=[],e=[];for(c=a.length,b=0;b<c;b++)'text'===a[b].type?e.push(a[b]):d.push(a[b]);return d.concat(e)},xyCalculator=(a,b)=>{var c=0;return c='startx'===a?b.x:'starty'===a?b.y:'x'===a||'middlex'===a||'centerx'===a?b.x+b.width/2:'y'===a||'middley'===a||'centery'===a?b.y+b.height/2:'endx'===a?b.x+b.width:'endy'===a?b.y+b.height:0,c},axisMacroParser=function(a,b){return function(c){let d,e,f,g,h=c.split(DEFAULT_MACRO_SEPARATOR).slice(1),i=isNaN(+h[0])?0:+h[0],j=isNaN(+h[0])?h[1]:h[2],k=isNaN(+h[0])?h[2]:h[3];return d=a.getChildren(b)[i],g=d.components,j=+j,g.labelIndexArr&&(j=g.labelIndexArr[j]),e=g.labels[j].config,f=computePlotBounds(e,d.getName()),xyCalculator(k,f)}},getEventData=(a,b,c)=>{let d=b.getElement(),e=c.getFromEnv('getMouseCoordinate')(c.getFromEnv('chart-container'),a,c),f=b.getLinkedParent();return{element:d,rawConfig:b.getAttribute(),pageX:e.pageX,pageY:e.pageY,chartX:e.chartX,chartY:e.chartY,annotationId:b.getId(),groupId:f&&f.getId(),annotationOptions:b.rawConfig,groupOptions:f&&f.rawConfig}},pluckBoolean=function(...a){let b,c,d;for(c=0,d=a.length;c<d;c++)if(b=a[c],!0===b||!1===b)return b;return!1},trim=a=>a.replace(/^\s+|\s+$/g,''),isMacro=a=>~a.indexOf(DEFAULT_MACRO_PREFIX),solveEquation=a=>{let b,c,d=+a[0],e=1,f=a.length;for(;e<f;++e)c=a[e],e%2?b=c:'+'===b?d+=+c:'-'===b?d-=+c:void 0;return d},getScaledVal=(a,b)=>{let c;switch(b.axis){case'x':case'toX':c=b.scaleX;break;case'y':case'toY':c=b.scaleY;break;default:c=b.scaleValue||1;}return a*c},parseEquation=(a,b,c=!1,d=DEFAULT_MACRO_PREFIX)=>{let e,f,g,h,k,l,m=a.split(/([+])/),n=[],o=m.length;for(f=0;f<o;f++)if(h=m[f],'+'!==h){for(h=m[f],e=h.split(/([-])/),(g=0,l=e.length);g<l;g++)k=e[g],'-'!==k&&(n.push(e[g]),g<l-1&&n.push('-'));f<o-1&&n.push('+')}return n.map(a=>{let e,f,g,h='',i='',j='';if(a.charAt(0)===d){if(i=a.replace(/[\$ ]/g,''),j=i.split(DEFAULT_MACRO_SEPARATOR)[0],!isNaN(+i))return+i;for(h in b)if(j===h){if(f=new RegExp(h,'g'),'function'==typeof b[h])try{e=j.replace(f,b[h](i))}catch(a){e=j.replace(f,0)}else e=j.replace(f,b[h]||0);break}}else g=+a,isNaN(g)?'+'!==a&&'-'!==a&&(a=0):a=c?getScaledVal(g,c).toString():g.toString(),e=a;return e})};export{deg2Rad,polarToCartesian,getQuadrant,computePlotBounds,computeSliceBounds,compute3DSliceBounds,cleanMacro,arrangeItems,axisMacroParser,xyCalculator,UNDEF,UNDERSCORE,DEFAULT_MACRO_PREFIX,DEFAULT_MACRO_SEPARATOR,pluckBoolean,trim,isMacro,solveEquation,parseEquation,getScaledVal,getEventData};
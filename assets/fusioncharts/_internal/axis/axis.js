import ComponentInterface from'../../core/component-interface';import{UNDEF,parseConfiguration,BLANKSTRING,pluckNumber,setLineHeight,pluckFontSize,parseUnsafeString,getDashStyle,getFirstValue,pluck,pInt,DASH_DEF,NORMAL,PXSTRING}from'../lib/lib';import{convertColor}from'../lib/lib-graphics';let _forceValidLowerLimit=(a,b)=>a<b?b:a;class Axis extends ComponentInterface{getType(){return'axis'}__setDefaultConfig(){super.__setDefaultConfig(),this.components={labels:[]};let a=this.config;a.setAdaptiveMin=0,a.adjustDiv=1,a.axisNameWidth=UNDEF,a.rotateAxisName=0,a.useEllipsesWhenOverflow=1,a.divLineColor=UNDEF,a.divLineAlpha=UNDEF,a.divLineThickness=UNDEF,a.divLineIsDashed=UNDEF,a.divLineDashLen=UNDEF,a.divLineDashGap=UNDEF,a.showAlternateGridColor=UNDEF,a.alternateGridColor=UNDEF,a.alternateGridAlpha=UNDEF,a.showZeroPlane=1,a.zeroPlaneAlpha=80,a.showZeroPlaneValue=1,a.showZeroPlaneOnTop=1,a.showAxisLine=UNDEF,a.axisLineThickness=UNDEF,a.axisLineAlpha=UNDEF,a.tickLength=0,a.trendlineToolText=UNDEF,a.trendlineColor='333333',a.trendlineThickness=1,a.trendlineAlpha=UNDEF,a.showTrendlinesOnTop=0,a.trendlinesAreDashed=0,a.trendlinesDashLen=5,a.trendlinesDashGap=2,a.isTrendZone=UNDEF,a.showTrendlines=1,a.showTrendlineLabels=1,a.showLabels=1,a.maxLabelHeight=UNDEF,a.rotateLabels=UNDEF,a.slantLabel=0,a.showAxisValues=1,a.showTooltip=1,a.isActive=!0,a.drawLabels=!0,a.drawOnlyCategoryLine=!1,a.drawLabelsOpposit=!1,a.drawPlotlines=!0,a.drawAxisLine=!0,a.drawPlotBands=!0,a.drawAxisName=!0,a.drawAxisNameOpposit=!1,a.axisNameAlignCanvas=!1,a.drawAxisNameFromBottom=!1,a.drawTrendLines=!0,a.drawTrendLabels=!0,a.drawTick=!0,a.drawTickMinor=!0,a.animateAxis=!0,a.drawAxisLineWRTCanvas=!0,a.isRelativeAxisInverse=!1,a.axisIndex=0,a.uniqueClassName=0,a.viewPortRatio={},a.canvas={},a.axisRange={},a.drawnStaggerLines=UNDEF,a.axisDimention={},a.forceZeroTick=!0,a.isZeroTickForced=!1,a.extremeLabels={firstLabel:{},lastLabel:{}},a._setRangeAgain=!1,a._defaultForceDecimal=UNDEF,a._defaultDecimalPrecision=UNDEF,a.rangeChanged=!1,a.dimensionChanged=!1,a.apparentScrollPos=0,a.visibleMin=UNDEF,a.visibleMax=UNDEF,a.setPadding=!1,a.trendLimits=UNDEF}configureAttributes(a){var b,c,d,e,f=Math.abs,g=this,h=g.config,i=g.getFromEnv('chart'),j=g.getFromEnv('dataSource'),k=i.config.is3D,l=j.chart,m=g.getFromEnv('number-formatter');b=h.rawAttr=a,h.referenceInfo=[],h.parsedTrendLabels=[],h.parsedVlineInfo=[],h.trendLines=b.trendlines,h.vTrendLines=b.vtrendlines,parseConfiguration(b,h),h.axisName=parseUnsafeString(b.axisName),h.axisValuePadding=h.axisNamePadding||pluckNumber(b.axisValuePadding,4),h.axisNamePadding=h.axisNamePadding||pluckNumber(b.axisNamePadding,5),h.maxLabelWidthPercent=pluckNumber(b.maxLabelWidthPercent),h.maxLabelWidthPercent=f(h.maxLabelWidthPercent),h.minLabelWidthPercent=f(pluckNumber(b.minLabelWidthPercent)),h.numDivLines=pluckNumber(b.numDivLines,4),h.numDivLines=_forceValidLowerLimit(h.numDivLines,0),h.categoryNumDivLines=pluckNumber(b.numDivLines,0),h.axisValuePadding=_forceValidLowerLimit(h.axisValuePadding,0),h.isReverse=pluckNumber(b.isReverse,0),h.isOpposit=pluckNumber(b.isOpposit,0),h.isVertical=pluckNumber(b.isVertical,0),h.categoryDivLinesFromZero=1,h.axisMinValue=m.getCleanValue(b.axisMinValue),h.axisMaxValue=m.getCleanValue(b.axisMaxValue),h.zeroPlaneColor=pluck(b.zeroPlaneColor,b.divLineColor),h.zeroPlaneThickness=pluck(b.zeroPlaneThickness,b.divLineThickness),h.axisLineColor=convertColor(b.axisLineColor,b.axisLineAlpha),h.tickAlpha=pluckNumber(b.tickAlpha,h.axisLineAlpha),h.tickColor=convertColor(pluck(b.tickColor,b.axisLineColor),h.tickAlpha),h.tickWidth=pluckNumber(b.tickWidth,h.axisLineThickness),h.maxZoomLimit=pluckNumber(l.maxzoomlimit,i.maxzoomlimit,1e3),h.showVLines=pluckNumber(l.showvlines,1),h.showVLinesOnTop=pluckNumber(l.showvlinesontop,0),h.showVLineLabels=pluckNumber(l.showvlinelabels,this.showVLineLabels,1),h.showVLineLabelBorder=pluckNumber(l.showvlinelabelborder,1),h.rotateVLineLabels=pluckNumber(l.rotatevlinelabels,0),h.vLineColor=pluck(l.vlinecolor,'333333'),h.vLineLabelColor=pluck(l.vlinelabelcolor),h.vLineThickness=pluck(l.vlinethickness,1),h.vLineAlpha=pluckNumber(l.vlinealpha,80),h.vLineLabelBgColor=pluck(l.vlinelabelbgcolor,'ffffff'),h.vLineLabelBgAlpha=pluckNumber(l.vlinelabelbgalpha,k?50:100),h.staggerLines=Math.max(pluckNumber(l.staggerlines,2),2),h.staggerLines=_forceValidLowerLimit(h.staggerLines,1),h.trendlineValuesOnOpp=pluck(b.trendlineValuesOnOpp,b.trendlineValuesOnOpp,0),h.labelDisplay=pluck(b.labelDisplay,'auto').toLowerCase(),h.labelStep=pluckNumber(b.labelStep,1),h.labelStep=Math.round(h.labelStep),h.labelStep=_forceValidLowerLimit(h.labelStep,1),h.startPad=0,h.endPad=0,h._oriLabelStep=h.labelStep,h.showLimits=pluckNumber(b.showLimits,h.showAxisValues),h.showUpperLimit=b.showLimits,h.showDivLineValues=pluckNumber(b.showDivLineValues,h.showAxisValues),h.showCanvasBorder=i.getChildren('canvas')[0].config.showCanvasBorder?1:0,h.axisBreak=b.axisBreaks,h.isBreak=!!h.axisBreak,h.isBreak&&g._processAxisBreak(),c=getFirstValue(b.axisNameBorderColor,BLANKSTRING),c=c?convertColor(c,pluckNumber(b.axisNameBorderAlpha,b.axisNameAlpha,100)):BLANKSTRING,h.name=h.name||{},h.name.style={fontFamily:pluck(b.axisNameFont,b.outCanfontFamily),fontSize:pluck(b.axisNameFontSize,pInt(b.outCanfontSize))+PXSTRING,color:convertColor(pluck(b.axisNameFontColor,b.outCancolor),pluckNumber(b.axisNameFontAlpha,b.axisNameAlpha,100)),fontWeight:pluckNumber(b.axisNameFontBold,1)?'bold':NORMAL,fontStyle:pluckNumber(b.axisNameFontItalic)?'italic':NORMAL,border:c||b.axisNameBgColor?pluckNumber(b.axisNameBorderThickness,1)+'px solid':UNDEF,borderColor:c,borderThickness:pluckNumber(b.axisNameBorderThickness,1),borderPadding:pluckNumber(b.axisNameBorderPadding,2),borderRadius:pluckNumber(b.axisNameBorderRadius,0),backgroundColor:b.axisNameBgColor?convertColor(b.axisNameBgColor,pluckNumber(b.axisNameBgAlpha,b.axisNameAlpha,100)):BLANKSTRING,borderDash:pluckNumber(b.axisNameBorderDashed,0)?getDashStyle(pluckNumber(b.axisNameBorderDashLen,4),pluckNumber(b.axisNameBorderDashGap,2)):DASH_DEF},h.name.style.lineHeight=setLineHeight(h.name.style),d=getFirstValue(l.trendvaluebordercolor,BLANKSTRING),d=d?convertColor(d,pluckNumber(l.trendvalueborderalpha,l.trendvaluealpha,100)):BLANKSTRING,h.trend=h.trend||{},h.trend.trendStyle={fontFamily:pluck(l.trendvaluefont,b.outCanfontFamily),color:pluck(l.trendvaluefontcolor,b.trendlineColor,b.outCancolor,'333333'),valueAlpha:l.trendvaluealpha,fontSize:pluckFontSize(l.trendvaluefontsize,pInt(b.outCanfontSize))+PXSTRING,fontWeight:pluckNumber(l.trendvaluefontbold)?'bold':NORMAL,fontStyle:pluckNumber(l.trendvaluefontitalic)?'italic':NORMAL,border:d||l.trendvaluebgcolor?pluckNumber(l.trendvalueborderthickness,1)+'px solid':'',borderColor:d,borderThickness:pluckNumber(l.trendvalueborderthickness,1),borderPadding:pluckNumber(l.trendvalueborderpadding,2),borderRadius:pluckNumber(l.trendvalueborderradius,0),backgroundColor:l.trendvaluebgcolor?convertColor(l.trendvaluebgcolor,pluckNumber(l.trendvaluebgalpha,l.trendvaluealpha,100)):BLANKSTRING,borderDash:pluckNumber(l.trendvalueborderdashed,0)?getDashStyle(pluckNumber(l.trendvalueborderdashlen,4),pluckNumber(l.trendvalueborderdashgap,2)):DASH_DEF},h.trend.trendStyle.lineHeight=setLineHeight(h.trend.trendStyle),h.labels=h.labels||{},h.lines=h.lines||{},h.band=h.band||{},e=getFirstValue(l.labelbordercolor,BLANKSTRING),e=e?convertColor(e,pluckNumber(l.labelborderalpha,l.labelalpha,100)):BLANKSTRING,h.labels.style={fontFamily:pluck(b.labelFont,b.outCanfontFamily),fontSize:pluckNumber(b.labelFontSize,pInt(b.outCanfontSize))+PXSTRING,fontWeight:pluckNumber(b.labelFontBold)?'bold':NORMAL,fontStyle:pluckNumber(b.labelFontItalic)?'italic':NORMAL,color:convertColor(pluck(b.labelFontColor,b.outCancolor),pluckNumber(b.labelFontAlpha,100)),labelLink:l.labellink,border:e||l.labelbgcolor?pluckNumber(l.labelborderthickness,1)+'px solid':'',borderColor:e,borderThickness:pluckNumber(l.labelborderthickness,1),borderPadding:pluckNumber(l.labelborderpadding,2),borderRadius:pluckNumber(l.labelborderradius,0),backgroundColor:l.labelbgcolor?convertColor(l.labelbgcolor,pluckNumber(l.labelbgalpha,l.labelalpha,100)):BLANKSTRING,borderDash:pluckNumber(l.labelborderdashed,0)?getDashStyle(pluckNumber(l.labelborderdashlen,4),pluckNumber(l.labelborderdashgap,2)):DASH_DEF},h.labels.style.lineHeight=setLineHeight(h.labels.style),h.numberFormatterFn=pluck(b.numberFormatterFn),h.apparentScrollPos=b.apparentScrollPos||h.apparentScrollPos,h.axisRange={},h.dataLimit={},h.axisEndLabelDisplaySpace={left:0,right:0,top:0,bottom:0},h.isConfigured=!0,h._defaultForceDecimal=UNDEF,h._defaultDecimalPrecision=UNDEF,h.lines.isDraw=pluckNumber(b.lines&&b.lines.isDraw,1),h.band.isDraw=pluckNumber(b.band&&b.band.isDraw,1)}createContainer(a,b,c){let d=this.getFromEnv('animationManager');return this.addContainer(a,d.setAnimation({container:c,attr:b,el:this.getContainer(a)||'group',component:this,label:'group'}))}createGroup(a,b,c,d='group'){let e=this.getFromEnv('animationManager');return e.setAnimation({container:c,attr:b,el:this.config[a]||'group',component:this,label:d})}getValuePadding(){var a=this.config;return{left:a.startPad,right:a.endPad}}draw(){var a,b,c,d,e=this,f=e.config,g=e.getFromEnv('chart'),h=g.config,i=f.isVertical,j=h.viewPortConfig,k=e.getChildren().limitUpdater,l=f.viewPortRatio||{};e._createContainer(),c=j.y*j.scaleY,d=j.x*j.scaleX,l.scaleX&&l.scaleY&&(l.scaleX!==j.scaleX||l.scaleY!==j.scaleY)?(l.scaleX=j.scaleX,l.scaleY=j.scaleY,e._drawComponents()):(i?(b=c-j.y*j.scaleY,f.axisContainer.transform('t0,'+b),f.axisLabelContainerTop.transform('t0,'+b)):(a=d-j.x*j.scaleX,f.axisContainer.transform('t'+a+',0'),f.axisLabelContainerTop.transform('t'+a+',0')),e._drawComponents()),e.addExtEventListener('animationcomplete',function(){k&&k.forEach(a=>{a.draw()})},e.getFromEnv('animationmanager')),e.addToEnv('prevScale',e.getScale().copy())}setScale(a){this.config.scale=a}getScale(){return this.config.scale}getLimit(){let a=this.config.axisRange;return{min:a.min,max:a.max,tickInterval:a.tickInterval}}getVisibleConfig(){let a=this.config;return{minValue:a.visibleMin,maxValue:a.visibleMax}}setAxisConfig(a){var b,c=this,d=c.config;for(b in a)a.hasOwnProperty(b)&&(d[b]=a[b])}getAxisConfig(a){var b=this,c=b.config;return a?c[a]:c}getVisibleLength(){var a=this,b=a.getVisibleConfig();return Math.abs(b.maxValue-b.minValue)}getAxisEndLabelDisplaySpace(){return this.config.axisEndLabelDisplaySpace||{}}getTicksLen(){let a=this.config.tickValues;return a&&a.tickValue.length||0}}export default Axis;
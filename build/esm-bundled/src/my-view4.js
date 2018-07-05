import{html,PolymerElement,GestureEventListeners}from"./my-app.js";const bundledImportMeta={...import.meta,url:new URL("../node_modules/plastic-resize-aware/plastic-element-query.js",import.meta.url).href};class PlasticElementQuery extends PolymerElement{static get template(){return html`
        <style>
          :host {
            display: none;
          }
        </style>
        <slot></slot>
      `}static get properties(){return{targetElement:{type:Object,value:null,observer:"_targetElementChanged"},refElement:{type:Object,value:null,observer:"_refElementChanged"},queryExpression:{type:String},assignClasses:{type:String},isMatching:{type:Boolean,readOnly:!0,value:!1,observer:"_isMatchingChanged"},_refElementSize:{type:Object,value:null,observer:"_refSizeChanged"},_refElement:{type:Object,observer:"_refElementRefChanged"},_targetElement:{type:Object,observer:"_targetElementRefChanged"}}}static get importMeta(){return bundledImportMeta}connectedCallback(){super.connectedCallback();if(!this._refElement){this._refElement=this._getDefaultParent()}if(!this._targetElement){this._targetElement=this._getDefaultParent()}}disconnectedCallback(){super.disconnectedCallback();if(this._refElement){this._refElement.removeEventListener("element-resize",this._handleResize)}}_getDefaultParent(){let currentElem=this,currentTag=this.tagName;while("PLASTIC-RESIZE-AWARE"!==currentTag){currentElem=currentElem.parentElement;if(!currentElem||"BODY"==currentElem.tagName){return null}currentTag=currentElem.tagName}return currentElem}_targetElementChanged(newValue){if(newValue){if("object"==typeof newValue){this._targetElement=newValue}else{if("string"==typeof newValue){let te=this._getElementFromParents(newValue);if(te){this._targetElement=te}else{console.error("Target element \""+newValue+"\" not found.")}}}}}_getElementFromParents(id,tagName){let p=this.parentElement,t=p?p.querySelector((tagName?tagName.toLowerCase():"")+"#"+id):null;while(p&&!t){p=p.parentElement;t=p?p.querySelector((tagName?tagName.toLowerCase():"")+"#"+id):null}return t}_refElementChanged(newValue){if(newValue){if("object"==typeof newValue){if(newValue&&newValue.tagName&&"PLASTIC-RESIZE-AWARE"==newValue.tagName){this._refElement=newValue}else{console.log("Reference element is not plastic-resize-aware")}}else{if("string"==typeof newValue){let te=document.getElementById(newValue);if(te&&te.tagName&&"PLASTIC-RESIZE-AWARE"==te.tagName){this._refElement=te}else{console.error("Reference element \""+newValue+"\" not found or is not plastic-resize-aware.")}}}}}_refSizeChanged(newValue){if(newValue&&newValue.hasOwnProperty("width")&&newValue.hasOwnProperty("height")){if(this.queryExpression){let m=this._matchQuery(this.queryExpression,{type:"screen",width:newValue.width+"px",height:newValue.height+"px"});if(m!==this.isMatching){this._setIsMatching(m)}}}else{if(this.isMatching){this._setIsMatching(!1)}}}_isMatchingChanged(newValue,oldValue){if(newValue&&!oldValue){if(this.assignClasses&&this._targetElement){let clist=this.assignClasses.split(" ").filter(e=>0<e.length);this._targetElement.classList.add(...clist)}this.dispatchEvent(new CustomEvent("element-query-match",{detail:{queryExpression:this.queryExpression,matches:!0,targetElement:this._targetElement,classList:this.assignClasses,width:newValue.width,height:newValue.height}}))}if(!newValue&&oldValue){if(this.assignClasses&&this._targetElement){let clist=this.assignClasses.split(" ").filter(e=>0<e.length);this._targetElement.classList.remove(...clist)}this.dispatchEvent(new CustomEvent("element-query-match",{detail:{queryExpression:this.queryExpression,matches:!1,targetElement:this._targetElement,classList:this.assignClasses,width:newValue.width,height:newValue.height}}))}}_refElementRefChanged(newValue,oldValue){if(oldValue){oldValue.removeEventListener("element-resize",this._handleResize)}if(newValue){newValue.addEventListener("element-resize",this._handleResize.bind(this))}}_targetElementRefChanged(){}_handleResize(e){this._refElementSize={width:e.detail.width,height:e.detail.height}}_parseQuery(mediaQuery){const RE_MEDIA_QUERY=/^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^\)]+\)))(?:\s*and\s*(.*))?$/i,RE_MQ_EXPRESSION=/^\(\s*([_a-z-][_a-z0-9-]*)\s*(?:\:\s*([^\)]+))?\s*\)$/,RE_MQ_FEATURE=/^(?:(min|max)-)?(.+)/;return mediaQuery.split(",").map(function(query){query=query.trim();var captures=query.match(RE_MEDIA_QUERY);if(!captures){throw new SyntaxError("Invalid CSS media query: \""+query+"\"")}var modifier=captures[1],type=captures[2],expressions=((captures[3]||"")+(captures[4]||"")).trim(),parsed={};parsed.inverse=!!modifier&&"not"===modifier.toLowerCase();parsed.type=type?type.toLowerCase():"all";if(!expressions){parsed.expressions=[];return parsed}expressions=expressions.match(/\([^\)]+\)/g);if(!expressions){throw new SyntaxError("Invalid CSS media query: \""+query+"\"")}parsed.expressions=expressions.map(function(expression){var captures=expression.match(RE_MQ_EXPRESSION);if(!captures){throw new SyntaxError("Invalid CSS media query: \""+query+"\"")}var feature=captures[1].toLowerCase().match(RE_MQ_FEATURE);return{modifier:feature[1],feature:feature[2],value:captures[2]}});return parsed})}_matchQuery(mediaQuery,values){return this._parseQuery(mediaQuery).some(query=>{var inverse=query.inverse,typeMatch="all"===query.type||values.type===query.type;if(typeMatch&&inverse||!(typeMatch||inverse)){return!1}var expressionsMatch=query.expressions.every(expression=>{var feature=expression.feature,modifier=expression.modifier,expValue=expression.value,value=values[feature];if(!value){return!1}switch(feature){case"orientation":case"scan":return value.toLowerCase()===expValue.toLowerCase();case"width":case"height":case"device-width":case"device-height":expValue=this._toPx(expValue);value=this._toPx(value);break;case"resolution":expValue=this._toDpi(expValue);value=this._toDpi(value);break;case"aspect-ratio":case"device-aspect-ratio":case"device-pixel-ratio":expValue=this._toDecimal(expValue);value=this._toDecimal(value);break;case"grid":case"color":case"color-index":case"monochrome":expValue=parseInt(expValue,10)||1;value=parseInt(value,10)||0;break;}switch(modifier){case"min":return value>=expValue;case"max":return value<=expValue;default:return value===expValue;}});return expressionsMatch&&!inverse||!expressionsMatch&&inverse})}_toDecimal(ratio){var decimal=+ratio,numbers;if(!decimal){numbers=ratio.match(/^(\d+)\s*\/\s*(\d+)$/);decimal=numbers[1]/numbers[2]}return decimal}_toDpi(resolution){const RE_RESOLUTION_UNIT=/(dpi|dpcm|dppx)?\s*$/;var value=parseFloat(resolution),units=(resolution+"").match(RE_RESOLUTION_UNIT)[1];switch(units){case"dpcm":return value/2.54;case"dppx":return 96*value;default:return value;}}_toPx(length){const RE_LENGTH_UNIT=/(em|rem|px|cm|mm|in|pt|pc)?\s*$/;var value=parseFloat(length),units=(length+"").match(RE_LENGTH_UNIT)[1];switch(units){case"em":return 16*value;case"rem":return 16*value;case"cm":return 96*value/2.54;case"mm":return 96*value/2.54/10;case"in":return 96*value;case"pt":return 72*value;case"pc":return 72*value/12;default:return value;}}}window.customElements.define("plastic-element-query",PlasticElementQuery);class MyView4 extends GestureEventListeners(PolymerElement){static get template(){return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {
          display: block;

          padding: 10px;
        }
        plastic-resize-aware {
          min-width: 20%;
        }
        .codetext {
          font-family: 'Courier New', Courier, monospace;
          color: black;
          font-weight: bold;
          background-color: #f9f8f7;
        }
        @keyframes shrinkIt {
          from {width: 800px;}
          to {width: 500px;}
        }
        .doShrinkIt {
          animation-name: shrinkIt;
          animation-duration: 12s;
        }
        .demoarea {
          width: 800px; 
          max-width: 100%; 
          min-height: 80px;
        }
        .participants {
          @apply(--layout-flex-4);
        }
        .converse {
          @apply(--layout-flex-8);
        }
        .participant {
          padding: 8px;
        }
        .participantPic {
          width: 80px;
          height: 80px;
        }
        .participantNameGroup {
          @apply(--layout-vertical);
          padding-left: 8px;
          padding-right: 8px;
        }
        .participantName {
          font-size: 14pt;
          font-weight: bold;
        }
        .participantTagLine {
          font-size: 11pt;
          font-weight: normal;
          font-style: italic;
        }
        .msmall plastic-image {
          width: 60px;
          height: 60px;
        }
        .msmall .participantName {
          font-size: 12pt;
        }
        .msmall .participantTagLine {
          font-size: 10pt;
        }
        .vsmall plastic-image {
          width: 40px;
          height: 40px;
        }
        .vsmall .participantName {
          font-size: 11pt;
        }
        .vsmall .participantTagLine {
          font-size: 9pt;
        }
        .xsmall plastic-image {
          display: none;
        }
        .xsmall .participantName {
          font-size: 10.5pt;
        }
        .xsmall .participantTagLine {
          font-size: 8pt;
        }
        .c2green {
          color: green;
        }
      </style>
      <h2>plastic-element-query</h2>
      <p><span class="codetext">plastic-element-query</span> is part of the <span class="codetext">plastic-resize-aware</span> package.
      It is a non visual element that allows you to use CSS media query style
expressions as **element queries** to apply and remove CSS classes on a target element. </p>
<p>The idea with <span class="codetext">plastic-element-query</span> is that there is a <i>reference element</i> which must be a 
<span class="codetext">plastic-resize-aware</span> element, who's size is monitored.  There is also a <i>target element</i>
which can be the same as the reference element or a different element.  The target element
is changed by modifying its <span class="codetext">classList</span> depending on the <span class="codetext">queryExpression</span> 
matching or not matching the reference element's size.</p>
<h3>Demo</h3>
<paper-button raised on-tap="_reset" disabled$="[[_isRunning]]">Start / Restart Demo</paper-button>
<br>
      <div id="demoContainer" class="demoarea layout horizontal">
          <div class="participants">
            <plastic-resize-aware id="ra1" >
              <template is="dom-repeat" items="[[participantList]]" as="p">
              <div class="participant layout horizontal">
                <plastic-image class="participantPic" sizing="contain" srcset="[[p.pic]]">
                </plastic-image>
                <div class="participantNameGroup">
                  <div class="participantName">[[p.name]]</div>
                  <div class="participantTagLine">[[p.tagline]]</div>
                </div>
              </div>
              </template>
              <plastic-element-query id="peqMsmall" query-expression="(max-width: 240px) and (min-width: 210px)" 
                assign-classes="msmall" on-element-query-match="logMatch"></plastic-element-query>
              <plastic-element-query id="peqVsmall" query-expression="(max-width: 210px) and (min-width: 180px)" 
                assign-classes="vsmall" on-element-query-match="logMatch"></plastic-element-query>
              <plastic-element-query id="peqXsmall" query-expression="(max-width: 180px)" 
                assign-classes="xsmall" on-element-query-match="logMatch"></plastic-element-query>
              <plastic-element-query id="peqC2green" query-expression="(max-width: 180px)" 
                assign-classes="c2green" on-element-query-match="logMatch"
                target-element="col2info"></plastic-element-query>
            </plastic-resize-aware>
          </div>
          <div id="col2info" class="converse">
            <ul id="chglist">
              <template is="dom-repeat" items="[[peqLog]]" as="l">
                <li>[[l.src]] - [[l.matches]]</li>
              </template>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus hendrerit vehicula. Sed nec erat posuere, elementum neque in, sollicitudin odio. Aliquam imperdiet metus vel tortor porttitor suscipit. Quisque congue accumsan mauris, id molestie magna ornare at. Phasellus lacinia urna at libero tempor volutpat. Duis molestie turpis est, non sollicitudin turpis pretium vel. Nulla non molestie nulla, eu dignissim sem.</p>
          </div>
        </div>
        
      
    <div id="sources"></div>
    `}static get properties(){return{participantList:{type:Array,notify:!0},peqLog:{type:Array,notify:!0,value:()=>{return[]}},_isRunning:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback();this.participantList=[{name:"Underdog",tagline:"There's no need to fear.",pic:"./images/underdog.jpg"},{name:"The Jetsons",pic:"./images/Jetsons.jpg",tagline:"You've got to meet us"},{name:"Bad Wolf",pic:"./images/badwolf.jpg",tagline:"Why you call me bad?"}];setTimeout(()=>{this._showSource()},1e3)}logResize(e){let li=document.createElement("li");li.innerHTML="Changed to "+e.detail.width+" x "+e.detail.height;this.$.chglist.appendChild(li)}trigChanged(o,n){if(!this._isRunning&&n){this.doChanges()}}testGetElem(id,el){let p=el.parentElement,t=p?p.querySelector("#"+id):null;while(p&&!t){p=p.parentElement;t=p?p.querySelector("#"+id):null}return t}_reset(){this.peqLog=[];this._isRunning=!0;this.$.demoContainer.style.animation="none";this.$.demoContainer.offsetHeight;this.$.demoContainer.style.animation=null;this.$.demoContainer.classList.add("doShrinkIt");setTimeout(()=>{this._isRunning=!1},13e3)}logMatch(e){const d=e.detail;this.push("peqLog",{src:e.target.id,matches:d.matches?"match":"no match"})}_showSource(){const mapMarkup=hljs.highlight("xml",`
    <div id="demoContainer" class="demoarea layout horizontal">
      <div class="participants">
        <plastic-resize-aware id="ra1" >
          <template is="dom-repeat" items="[[participantList]]" as="p">
          <div class="participant layout horizontal">
            <plastic-image class="participantPic" sizing="contain" srcset="[[p.pic]]">
            </plastic-image>
            <div class="participantNameGroup">
              <div class="participantName">[[p.name]]</div>
              <div class="participantTagLine">[[p.tagline]]</div>
            </div>
          </div>
          </template>
          <plastic-element-query id="peqMsmall" query-expression="(max-width: 240px) and (min-width: 210px)" 
            assign-classes="msmall" on-element-query-match="logMatch"></plastic-element-query>
          <plastic-element-query id="peqVsmall" query-expression="(max-width: 210px) and (min-width: 180px)" 
            assign-classes="vsmall" on-element-query-match="logMatch"></plastic-element-query>
          <plastic-element-query id="peqXsmall" query-expression="(max-width: 180px)" 
            assign-classes="xsmall" on-element-query-match="logMatch"></plastic-element-query>
          <plastic-element-query id="peqC2green" query-expression="(max-width: 180px)" 
            assign-classes="c2green" on-element-query-match="logMatch"
            target-element="col2info"></plastic-element-query>
        </plastic-resize-aware>
      </div>
      <div id="col2info" class="converse">
        <ul id="chglist">
          <template is="dom-repeat" items="[[peqLog]]" as="l">
            <li>[[l.src]] - [[l.matches]]</li>
          </template>
        </ul>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus hendrerit vehicula. Sed nec erat posuere, elementum neque in, sollicitudin odio. Aliquam imperdiet metus vel tortor porttitor suscipit. Quisque congue accumsan mauris, id molestie magna ornare at. Phasellus lacinia urna at libero tempor volutpat. Duis molestie turpis est, non sollicitudin turpis pretium vel. Nulla non molestie nulla, eu dignissim sem.</p>
      </div>
    </div>
    `);this.$.sources.innerHTML=`
    <h3>Markup</h3>
    <p>In this example the first 3 <span class="codetext">plastic-element-query</span> elements use 
    the default reference and target element - the parent <span class="codetext">plastic-resize-aware</span>. The last 
    <span class="codetext">plastic-element-query</span> specifies the target as <span class="codetext">col2info</span>
    so when that one matches the class <span class="codetext">c2green</span> will be applied to
    <span class="codetext">div#col2info</span></p>
    <pre><code class="html">${mapMarkup.value}</code></pre>`;const cssCode=hljs.highlight("css",`
    .msmall plastic-image {
      width: 60px;
      height: 60px;
    }
    .msmall .participantName {
      font-size: 12pt;
    }
    .msmall .participantTagLine {
      font-size: 10pt;
    }
    .vsmall plastic-image {
      width: 40px;
      height: 40px;
    }
    .vsmall .participantName {
      font-size: 11pt;
    }
    .vsmall .participantTagLine {
      font-size: 9pt;
    }
    .xsmall plastic-image {
      display: none;
    }
    .xsmall .participantName {
      font-size: 10.5pt;
    }
    .xsmall .participantTagLine {
      font-size: 8pt;
    }
    .c2green {
      color: green;
    }
    `);this.$.sources.innerHTML+=`<h3>CSS</h3>
    <pre><code class="css">${cssCode.value}</code></pre>`;const jsCode=hljs.highlight("javascript",`
  /**
   * Handle on-element-query-match event
   */
  logMatch(e) {
    this.push('peqLog', {
      src: e.target.id,
      matches: e.detail.matches ? "match" : "no match"
    });
  }
    `);this.$.sources.innerHTML+=`<h3>Javascript</h3>
    <pre><code class="javascript">${jsCode.value}</code></pre>`}}window.customElements.define("my-view4",MyView4);
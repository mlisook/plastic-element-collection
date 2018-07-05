define(["./my-app.js"],function(_myApp){"use strict";class MyView2 extends(0,_myApp.GestureEventListeners)(_myApp.PolymerElement){static get template(){return _myApp.html`
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
      </style>
      <h2>plastic-resize-aware</h2>
      <p><span class="codetext">plastic-resize-aware</span> is a container element that fires an event when its size changes.
      Sometimes you may need to take some action when the rendered size of an element changes. This element provides the 
something like the window resize event but for an individual element.</p>
<p>There are many reasons an element's size could change - CSS or class changes, content changes, content of other elements affecting
the flow, viewport changes, etc.</p>
<p><span class="codetext">plastic-element-query</span> is a non visual element that allows you to use CSS media query style
expressions as <i>element queries</i> to apply and remove CSS classes on a target element.</p>
<p>A prior version of the element is available for Polymer 2 - <span class="codetext">resize-aware</span> which does not 
include the element queries function.</p>
<h3>Demo</h3>
<paper-button raised on-tap="_reset" disabled$="[[_isRunning]]">Start / Restart Demo</paper-button>
<br>
      <div style="display: -webkit-flex; display: flex; max-width: 500px; width: 100%; min-height: 80px;">
          <div>
            <plastic-resize-aware id="ra1" on-element-resize="logResize">
              <div id="tester" style="background-color: azure; margin: 5px; padding: 5px;">
                <p>
                  This azure area is resize-aware.
                </p>
              </div>
            </plastic-resize-aware>
          </div>
          <div id="col2info" style=" margin: 5px; padding: 5px;"></div>
        </div>
        <ul id="chglist">
        </ul>
      
    <div id="sources"></div>
    `}static get properties(){return{trigRefresh:{type:Number,value:0,observer:"trigChanged"},_isRunning:{type:Boolean,value:!1}}}connectedCallback(){super.connectedCallback();setTimeout(()=>{this._showSource()},1e3)}logResize(e){let li=document.createElement("li");li.innerHTML="Changed to "+e.detail.width+" x "+e.detail.height;this.$.chglist.appendChild(li)}trigChanged(o,n){if(!this._isRunning&&n){this.doChanges()}}_reset(){if(!this._isRunning){this.doChanges()}}doChanges(){this._isRunning=!0;const t=this.$.tester,c2=this.$.col2info;t.innerHTML="<p>This azure area is <span class=\"codetext\">plastic-resize-aware</span>.</p>";c2.innerHTML="";this.$.chglist.innerHTML="";setTimeout(()=>{t.innerHTML="<p>This azure area is <span class=\"codetext\">plastic-resize-aware</span>.</p><p>It fires an event when its size changes. For example, if the content size changes.</p>"},5e3);setTimeout(()=>{c2.innerHTML="<p>... Or if other elements in the layout change the available space.</p>"},1e4);setTimeout(()=>{t.innerHTML+="<p>Or, of course, if the viewport changes. (try resizing the window).</p>"},15e3);setTimeout(()=>{t.innerHTML+="<p>The element uses a ResizeObserver, which is polyfilled if necessary.</p>"},19e3);setTimeout(()=>{c2.innerHTML="";this._isRunning=!1},22e3)}_showSource(){const mapMarkup=hljs.highlight("xml",`
    <paper-button raised on-tap="_reset" disabled$="[[_isRunning]]">Start / Restart Demo</paper-button>
<br>
      <div style="display: -webkit-flex; display: flex; max-width: 500px; width: 100%; min-height: 80px;">
          <div>
            <plastic-resize-aware id="ra1" on-element-resize="logResize">
              <div id="tester" style="background-color: azure; margin: 5px; padding: 5px;">
                <p>
                  This azure area is <span class="codetext">plastic-resize-aware</span>.
                </p>
              </div>
            </plastic-resize-aware>
          </div>
          <div id="col2info" style=" margin: 5px; padding: 5px;"></div>
        </div>
        <ul id="chglist">
        </ul>
    `);this.$.sources.innerHTML=`
    <p>In this example we receive resize notifications from <span class="codetext">plastic-resize-aware</span> and
    simply add them to a list.</p>
    <h3>Markup</h3>
    <pre><code class="html">${mapMarkup.value}</code></pre>`;const jsCode=hljs.highlight("javascript",`
  /**
   * Handle on-element-resize event
   */
  logResize(e) {
    let li = document.createElement('li');
    li.innerHTML = 'Changed to ' + e.detail.width + ' x ' + e.detail.height;
    this.$.chglist.appendChild(li);
  }
    `);this.$.sources.innerHTML+=`<h3>Javascript</h3>
    <pre><code class="javascript">${jsCode.value}</code></pre>`}}window.customElements.define("my-view2",MyView2)});
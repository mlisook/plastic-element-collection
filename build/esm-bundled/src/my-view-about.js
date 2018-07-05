import{PolymerElement,html}from"./my-app.js";class MyViewAbout extends PolymerElement{static get template(){return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <h1>About the Demo</h1>
        <p>This demo is a Polymer 3.0 app based on the 3.0 version of the starter kit.</p>
        <p>Although this uses the Polymer 3.0 version of the elements, a
        Polymer 2.x version is available also.  The API and use is identical. See the README of
        each element for 3.0 and 2.x installation instructions.</p>
        <h2>Builds and Differential Serving</h2>
        <p>The demo has 3 builds:</p><ul><li>esm-bundled</li><li>es6-bundled</li><li>es5-bundled</li></ul>
        <p>Since we are serving on a static server, Github's project page function, <a href="https://github.com/mlisook/plastic-diff-redirect">
        plastic-diff-redirect</a> is used to redirect to the best build for your browser based on the same
        selection mechanism in prpl-server-node.</p>
      </div>
    `}}window.customElements.define("my-view-about",MyViewAbout);
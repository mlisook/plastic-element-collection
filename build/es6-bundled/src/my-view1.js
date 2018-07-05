define(["exports","meta","./my-app.js"],function(_exports,meta,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.IronJsonpLibraryBehavior=_exports.$ironJsonpLibrary=void 0;meta=babelHelpers.interopRequireWildcard(meta);const IronJsonpLibraryBehavior={properties:{libraryLoaded:{type:Boolean,value:!1,notify:!0,readOnly:!0},libraryErrorMessage:{type:String,value:null,notify:!0,readOnly:!0}},observers:["_libraryUrlChanged(libraryUrl)"],_libraryUrlChanged:function(){if(this._isReady&&this.libraryUrl)this._loadLibrary()},_libraryLoadCallback:function(err,result){if(err){_myApp.Base._warn("Library load failed:",err.message);this._setLibraryErrorMessage(err.message)}else{this._setLibraryErrorMessage(null);this._setLibraryLoaded(!0);if(this.notifyEvent)this.fire(this.notifyEvent,result,{composed:!0})}},_loadLibrary:function(){LoaderMap.require(this.libraryUrl,this._libraryLoadCallback.bind(this),this.callbackName)},ready:function(){this._isReady=!0;if(this.libraryUrl)this._loadLibrary()}};_exports.IronJsonpLibraryBehavior=IronJsonpLibraryBehavior;var LoaderMap={apiMap:{},require:function(url,notifyCallback,jsonpCallbackName){var name=this.nameFromUrl(url);if(!this.apiMap[name])this.apiMap[name]=new Loader(name,url,jsonpCallbackName);this.apiMap[name].requestNotify(notifyCallback)},nameFromUrl:function(url){return url.replace(/[\:\/\%\?\&\.\=\-\,]/g,"_")+"_api"}},Loader=function(name,url,callbackName){this.notifiers=[];if(!callbackName){if(0<=url.indexOf(this.callbackMacro)){callbackName=name+"_loaded";url=url.replace(this.callbackMacro,callbackName)}else{this.error=new Error("IronJsonpLibraryBehavior a %%callback%% parameter is required in libraryUrl");return}}this.callbackName=callbackName;window[this.callbackName]=this.success.bind(this);this.addScript(url)};Loader.prototype={callbackMacro:"%%callback%%",loaded:!1,addScript:function(src){var script=document.createElement("script");script.src=src;script.onerror=this.handleError.bind(this);var s=document.querySelector("script")||document.body;s.parentNode.insertBefore(script,s);this.script=script},removeScript:function(){if(this.script.parentNode){this.script.parentNode.removeChild(this.script)}this.script=null},handleError:function(){this.error=new Error("Library failed to load");this.notifyAll();this.cleanup()},success:function(){this.loaded=!0;this.result=Array.prototype.slice.call(arguments);this.notifyAll();this.cleanup()},cleanup:function(){delete window[this.callbackName]},notifyAll:function(){this.notifiers.forEach(function(notifyCallback){notifyCallback(this.error,this.result)}.bind(this));this.notifiers=[]},requestNotify:function(notifyCallback){if(this.loaded||this.error){notifyCallback(this.error,this.result)}else{this.notifiers.push(notifyCallback)}}};(0,_myApp.Polymer)({is:"iron-jsonp-library",behaviors:[IronJsonpLibraryBehavior],properties:{libraryUrl:String,callbackName:String,notifyEvent:String}});_exports.$ironJsonpLibrary={IronJsonpLibraryBehavior:IronJsonpLibraryBehavior};class PlasticAspectRatio extends _myApp.PolymerElement{static get template(){return _myApp.html$1`
    <style>
       :host {
        display: inline-block;
        overflow: hidden;
      }
    </style>
    <div id="ctnr" style="box-sizing: border-box; position: relative; width: 100%;">
      <div id="spread" style="position: absolute; top: 0; left: 0;bottom: 0;right: 0;">
        <slot></slot>
      </div>
    </div>
`}static get is(){return"plastic-aspect-ratio"}static get properties(){return{aspectHeight:{type:Number,value:1},aspectWidth:{type:Number,value:1}}}static get observers(){return["_computeRatio(aspectHeight, aspectWidth)"]}_computeRatio(aspH,aspW){let h=aspH&&0<aspH?aspH:1,w=aspW&&0<aspW?aspW:1;this.$.ctnr.style.paddingTop=100*h/w+"%"}}window.customElements.define(PlasticAspectRatio.is,PlasticAspectRatio);class MyView1 extends _myApp.PolymerElement{static get template(){return _myApp.html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {
          display: block;

          padding: 10px;
        }
      
        .codetext {
          font-family: 'Courier New', Courier, monospace;
          color: black;
          font-weight: bold;
          background-color: #f9f8f7;
        }
        
      </style>
      <h2>plastic-aspect-ratio</h2>
      <p><span class="codetext">plastic-aspect-ratio</span> is a Polymer 3.0 custom element Where the height Depends on the width.
This allows you to set the width in any way, by percentage for example,
and still have the container retain its width to height aspect ratio.</p>
<p>The element is also available for Polymer 2 - see install instructions below.</p>
<h3>Installation</h3>
<h4>Polymer 3 Projects</h4>
<span class="codetext">npm i --save plastic-aspect-ratio</span>
<h4>Polymer 2 Projects</h4>
<span class="codetext">bower install --save plastic-aspect-ratio#^1.0.0</span>
<h3>Demo</h3>
      <h4>Often used as a container for images or videos</h4>
        <p>Typically style a single content item with width:100%, height:100% </p>
        <plastic-aspect-ratio style="width:60%;" aspect-width="5" aspect-height="6">
          <plastic-image id="i51a" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:20%;" aspect-width="5" aspect-height="6">
          <plastic-image id="i51b" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:10%;" aspect-width="5" aspect-height="6">
          <plastic-image id="i51c" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <h4>Can be used for any content</h4>
        <p>Overflow is hidden.</p>
        <plastic-aspect-ratio style="width:60%; background-color: blue; color: white;" aspect-height="1" aspect-width="2">
          <plastic-aspect-ratio style="width:60%; background-color: silver; color: white;" aspect-height="1" aspect-width="2">
            Any content
          </plastic-aspect-ratio>
          <plastic-aspect-ratio style="width:35%; background-color: azure; color: black;font-size:small;" aspect-height="1" aspect-width="2">
            Any content
          </plastic-aspect-ratio>
          <plastic-aspect-ratio style="width:60%; background-color: silver; color: white;" aspect-height="1" aspect-width="2">
            Any content
          </plastic-aspect-ratio>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:30%; background-color: slategrey; color: white;" aspect-height="1" aspect-width="2">
          <plastic-aspect-ratio style="width:60%; background-color: blue; color: white;" aspect-height="1" aspect-width="2">
            Any content
          </plastic-aspect-ratio>
          <plastic-aspect-ratio style="width:35%; background-color: azure; color: black;font-size:small;" aspect-height="1" aspect-width="2">
            Any content
          </plastic-aspect-ratio>
        </plastic-aspect-ratio>
        <h4>Use absolute or relative positioning to create an overlay</h4>
        <plastic-aspect-ratio style="width:50%;" aspect-width="4" aspect-height="3">
          <plastic-image id="i50a" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
          </plastic-image>
          <h3 style="position:absolute; top:5px;right:10px;color:white;">Grand Canyon, AZ</h3>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:25%;" aspect-width="4" aspect-height="3">
          <plastic-image id="i50b" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:15%;" aspect-width="4" aspect-height="3">
          <plastic-image id="i50c" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <plastic-aspect-ratio style="width:7%;" aspect-width="4" aspect-height="3">
          <plastic-image id="i50c" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
          </plastic-image>
        </plastic-aspect-ratio>
        <br>
        <plastic-aspect-ratio style="width:60%;" aspect-width="4" aspect-height="3">
          <plastic-image id="wp01" lazy-load="" preload="" fade="" use-element-dim="" sizing="cover" style="height: 100%; width: 100%;" srcset="./images/20160827_055746-150x150.jpg 150w,./images/20160827-055746-150x150.webp 150w,./images/20160827_055746-300x169.jpg 300w,./images/20160827-055746-300x169.webp 300w,./images/20160827_055746-768x432.jpg 768w,./images/20160827-055746-768x432.webp 768w" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACAAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8p8A/EK70MfZbvVJ0tAuF8qJGcHju3br611Go/EPS7pkY+K7tMDBV7ZevrxHRRXdSzKtTVt/W/8AmeRUwVOc3fr6f5H/2Q==">
          </plastic-image>
          <h3 style="position:absolute; bottom:5px;left:10px;color:white;">Casey, IL</h3>
        </plastic-aspect-ratio>
      
          <div id="sources"></div>
    `}static get properties(){return{_locationMarkers:{type:Array,value:function(){return[]}}}}static get importMeta(){return meta}connectedCallback(){super.connectedCallback();setTimeout(()=>{this._showSource()},1e3)}_showSource(){const mapMarkup=hljs.highlight("xml",`
    <h3>Often used as a container for images or videos</h3>
    <p>Typically style a single content item with width:100%, height:100% </p>
    <plastic-aspect-ratio style="width:60%;" aspect-width="5" aspect-height="6">
      <plastic-image id="i51a" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:20%;" aspect-width="5" aspect-height="6">
      <plastic-image id="i51b" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:10%;" aspect-width="5" aspect-height="6">
      <plastic-image id="i51c" lazy-load="" use-element-dim="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgAEwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AxPGPj298dxz7khtLS0ZQtsgH3+hZmwCTyeOg/PPNPHJcRK6OqKPlLMOCfQV2WgfCSyiguRcX91G1xgsUfHIwcjnnn1/lXNeM9L07QGX7PcSxRysAkpA3MAMEc4PXnjjn6V5FSuqsr3uz01SlSprSx6Rqc8senyMjspWMkY7HHWuO1u2gvr7N1BFNsQBQ6Ahclug6dqKK5aO5310f/9k=" sizing="cover" srcset="./images/IMG_20170426_112820-150x150.jpg 150w, ./images/IMG_20170426_112820-225x300.jpg 225w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    
    <h3>Can be used for any content</h3>
    <p>Overflow is hidden.</p>
    <plastic-aspect-ratio style="width:60%; background-color: blue; color: white;" aspect-height="1" aspect-width="2">
      <plastic-aspect-ratio style="width:60%; background-color: silver; color: white;" aspect-height="1" aspect-width="2">
        Any content
      </plastic-aspect-ratio>
      <plastic-aspect-ratio style="width:35%; background-color: azure; color: black;font-size:small;" aspect-height="1" aspect-width="2">
        Any content
      </plastic-aspect-ratio>
      <plastic-aspect-ratio style="width:60%; background-color: silver; color: white;" aspect-height="1" aspect-width="2">
        Any content
      </plastic-aspect-ratio>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:30%; background-color: slategrey; color: white;" aspect-height="1" aspect-width="2">
      <plastic-aspect-ratio style="width:60%; background-color: blue; color: white;" aspect-height="1" aspect-width="2">
        Any content
      </plastic-aspect-ratio>
      <plastic-aspect-ratio style="width:35%; background-color: azure; color: black;font-size:small;" aspect-height="1" aspect-width="2">
        Any content
      </plastic-aspect-ratio>
    </plastic-aspect-ratio>
    
    <h3>Use absolute or relative positioning to create an overlay</h3>
    <plastic-aspect-ratio style="width:50%;" aspect-width="4" aspect-height="3">
      <plastic-image id="i50a" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
      </plastic-image>
      <h3 style="position:absolute; top:5px;right:10px;color:white;">Grand Canyon, AZ</h3>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:25%;" aspect-width="4" aspect-height="3">
      <plastic-image id="i50b" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:15%;" aspect-width="4" aspect-height="3">
      <plastic-image id="i50c" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    <plastic-aspect-ratio style="width:7%;" aspect-width="4" aspect-height="3">
      <plastic-image id="i50c" use-element-dim="" lazy-load="" preload="" fade="" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACwAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8Aq6FfQ+F7JLPUYLG/uYRgSrbsjFTzjJYZI75H51R1j4qiG8WHTdJsJEMYc/JI5Gfow9+Pauz8X+GdJl8LWUjWn7yARhJBI4flTnLA5boOuelcvoOi6dq/h22uLuzhM4CqZYx5TP8AL/EUwW6Dk5pQzOtGCjF2KlgqTk21qf/Z" sizing="cover" srcset="./images/IMG_20170425_111558-150x150.jpg 150w, ./images/IMG_20170425_111558-300x225.jpg 300w, ./images/IMG_20170425_111558-768x576.jpg 768w" style="height: 100%; width: 100%;">
      </plastic-image>
    </plastic-aspect-ratio>
    <br>
    <plastic-aspect-ratio style="width:60%;" aspect-width="4" aspect-height="3">
      <plastic-image id="wp01" lazy-load="" preload="" fade="" use-element-dim="" sizing="cover" style="height: 100%; width: 100%;" srcset="./images/20160827_055746-150x150.jpg 150w,./images/20160827-055746-150x150.webp 150w,./images/20160827_055746-300x169.jpg 300w,./images/20160827-055746-300x169.webp 300w,./images/20160827_055746-768x432.jpg 768w,./images/20160827-055746-768x432.webp 768w" placeholder="data: image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2OTApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgACAAOAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8p8A/EK70MfZbvVJ0tAuF8qJGcHju3br611Go/EPS7pkY+K7tMDBV7ZevrxHRRXdSzKtTVt/W/8AmeRUwVOc3fr6f5H/2Q==">
      </plastic-image>
      <h3 style="position:absolute; bottom:5px;left:10px;color:white;">Casey, IL</h3>
    </plastic-aspect-ratio>
    `);this.$.sources.innerHTML=`
    <p>In this example <span class="codetext">plastic-aspect-ratio</span> is used with images and text blocks.  The
    example uses <span class="codetext">plastic-image</span> also, but one could just as easily use a regular <span class="codetext">img</span>
    or <span class="codetext">iron-image</span>.</p>
    <h3>Markup</h3>
    <pre><code class="html">${mapMarkup.value}</code></pre>`;const jsCode=hljs.highlight("javascript",`
  /**
   * There is no JS code needed for this demo
   */
    `);this.$.sources.innerHTML+=`<h3>Javascript</h3>
    <pre><code class="javascript">${jsCode.value}</code></pre>`}}window.customElements.define("my-view1",MyView1)});
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import "file-drop-element";
import "@polymer/paper-input/paper-input.js"
import "@polymer/paper-button/paper-button.js"
import alasql from "alasql";

class MyView2 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      <paper-input id="input" type="file"></paper-input>
      <paper-button id=submit on-click="submit">Create Report</paper-button>
      <div class="card">
        <div class="circle">2</div>
        <h1>View Two</h1>
        <p>Ea duis bonorum nec, falli paulo aliquid ei eum.</p>
        <p>Id nam odio natum malorum, tibique copiosae expetenda mel ea.Detracto suavitate repudiandae no eum. Id adhuc minim soluta nam.Id nam odio natum malorum, tibique copiosae expetenda mel ea.</p>
      </div>
    `;
  }
  submit() {
    let fileInput = this.shadowRoot.querySelector("#input");
    console.log(fileInput);
    console.log(fileInput.$.nativeInput.files)
    let fileUrl = window.URL.createObjectURL(fileInput.$.nativeInput.files[0])
    console.log(fileUrl);
    alasql(['SELECT * FROM CSV("?")'],[fileUrl])
    .then(function(res){
        console.log(res); // output depends on mydata.xls
    }).catch(function(err){
        console.log('Does the file exist? There was an error:', err);
    });
  }
}

window.customElements.define('my-view2', MyView2);

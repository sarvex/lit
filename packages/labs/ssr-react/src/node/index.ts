/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import {LitElementRenderer} from '@lit-labs/ssr/lib/lit-element-renderer.js';
import {getElementRenderer} from '@lit-labs/ssr/lib/element-renderer.js';
import React from 'react';

console.log('server index');

const isCustomElement = (tagName: string | {}) => {
  return typeof tagName === 'string' && customElements.get(tagName);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function patchCreateElement(createElement: any): any {
  return (type: string | {}, props: {}, ...children: {}[]) => {
    if (isCustomElement(type)) {
      const renderInfo = {
        elementRenderers: [LitElementRenderer],
        customElementInstanceStack: [],
        customElementHostStack: [],
        deferHydration: false,
      };

      const renderer = getElementRenderer(renderInfo, type as string);

      if (props != null) {
        for (const [k, v] of Object.entries(props)) {
          if (renderer.element) {
            if (k in renderer.element) {
              renderer.setProperty(k, v);
            } else {
              renderer.setAttribute(k, String(v));
            }
          }
        }
      }

      renderer.connectedCallback();

      const shadowRootContentIterable = renderer.renderShadow(renderInfo);

      if (shadowRootContentIterable) {
        const templateShadowRoot = createElement('template', {
          shadowroot: 'open',
          dangerouslySetInnerHTML: {
            __html: [...shadowRootContentIterable].join(''),
          },
        });

        return createElement(type, props, templateShadowRoot, ...children);
      }
    }
    return createElement(type, props, ...children);
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
React.createElement = patchCreateElement(React.createElement);

export default React;

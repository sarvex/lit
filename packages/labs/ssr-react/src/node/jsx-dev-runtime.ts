/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@lit-labs/ssr/lib/install-global-dom-shim.js';
// eslint-disable-next-line import/extensions
import * as ReactJSXDevRuntime from 'react/jsx-dev-runtime';
import {LitElementRenderer} from '@lit-labs/ssr/lib/lit-element-renderer.js';
import {getElementRenderer} from '@lit-labs/ssr/lib/element-renderer.js';
import {isCustomElement} from '../lib/utils.js';
import {createElement} from 'react';

export const jsxDEV = (
  type: any,
  props: any,
  key: any,
  isStaticChildren: any,
  source: any,
  self: any
) => {
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
        key: 'template-shadowroot',
        shadowroot: 'open',
        dangerouslySetInnerHTML: {
          __html: [...shadowRootContentIterable].join(''),
        },
      });

      const children: React.ReactNode[] = [templateShadowRoot];
      if (Array.isArray(props.children)) {
        children.push(...props.children);
      } else if (props.children !== undefined) {
        children.push(props.children);
      }

      return ReactJSXDevRuntime.jsxDEV(
        type,
        {
          ...props,
          children,
        },
        key,
        isStaticChildren,
        source,
        self
      );
    }
  }

  return ReactJSXDevRuntime.jsxDEV(
    type,
    props,
    key,
    isStaticChildren,
    source,
    self
  );
};

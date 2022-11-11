/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import {getElementRenderer} from '@lit-labs/ssr/lib/element-renderer.js';
import {LitElementRenderer} from '@lit-labs/ssr/lib/lit-element-renderer.js';
// eslint-disable-next-line import/extensions
import * as ReactJSXRuntime from 'react/jsx-runtime';
import {createElement} from 'react';
import {isCustomElement} from '../lib/utils.js';

export const Fragment = ReactJSXRuntime.Fragment;

export const jsx = (
  type: string | Object,
  props: {children?: [] | Object},
  key: string | undefined
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

      return ReactJSXRuntime.jsx(
        type,
        {
          ...props,
          children,
        },
        key
      );
    }
  }

  return ReactJSXRuntime.jsx(type, props, key);
};

export const jsxs = (
  type: string | Object,
  props: {children?: []},
  key: string | undefined
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

      return ReactJSXRuntime.jsxs(
        type,
        {
          ...props,
          children: [templateShadowRoot, ...(props.children ?? [])],
        },
        key
      );
    }
  }
  return ReactJSXRuntime.jsxs(type, props, key);
};

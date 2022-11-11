/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const isCustomElement = (tagName: string | Object) =>
  typeof tagName === 'string' && customElements.get(tagName);

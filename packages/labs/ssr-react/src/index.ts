/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import 'lit/experimental-hydrate-support.js';

export function patchCreateElement<T>(createElement: T) {
  return createElement;
}

import React from 'react';

console.log('client index');

export default React;

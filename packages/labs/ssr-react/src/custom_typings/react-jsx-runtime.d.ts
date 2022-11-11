/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export const jsx: any;
  export const jsxs: any;
}

declare module 'react/jsx-dev-runtime' {
  export const jsxDEV: any;
}

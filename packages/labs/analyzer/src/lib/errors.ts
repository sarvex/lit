/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ts from 'typescript';
import {DiagnosticCode} from './diagnostic-code.js';

export interface DiagnosticOptions {
  node: ts.Node;
  message: string;
  category?: ts.DiagnosticCategory;
  code?: DiagnosticCode | undefined;
}

export const createDiagnostic = ({
  node,
  message,
  category,
  code,
}: DiagnosticOptions) => {
  return {
    file: node.getSourceFile(),
    start: node.getStart(),
    length: node.getWidth(),
    category: category ?? ts.DiagnosticCategory.Error,
    code: code ?? DiagnosticCode.UNKNOWN,
    messageText: message ?? '',
  };
};

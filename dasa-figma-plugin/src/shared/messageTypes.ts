import { AuditResult } from './types';

export interface BaseMessage {
  type: string;
  requestId: string;
  payload?: unknown;
}

export interface UiToMainMessage extends BaseMessage {
  type:
    | 'AUDIT_SELECTION'
    | 'APPLY_QUICK_FIX'
    | 'APPLY_COPY_FIX'
    | 'APPLY_ALL_SAFE_FIXES'
    | 'APPLY_FOCUS_NODES'
    | 'FOCUS_COMPONENT'
    | 'GET_NODE_PREVIEW'
    | 'SWAP_WITH_COMPONENT'
    | 'EXPORT_REPORT'
    | 'CANCEL';
  payload?: {
    nodeIds?: string[];
    fixId?: string;
    nodeId?: string;
    newText?: string;
    componentId?: string;
    componentKey?: string;
  };
}

export interface MainToUiMessage extends BaseMessage {
  type:
    | 'AUDIT_RESULT'
    | 'PROGRESS'
    | 'ERROR'
    | 'QUICK_FIX_APPLIED'
    | 'EXPORT_READY'
    | 'NODE_PREVIEW';
  payload?: {
    result?: AuditResult;
    progress?: { current: number; total: number; message: string };
    error?: string;
    fixId?: string;
    success?: boolean;
    reportJson?: string;
    nodeId?: string;
    base64?: string;
  };
}

const VALID_UI_TYPES = new Set([
  'AUDIT_SELECTION', 'APPLY_QUICK_FIX', 'APPLY_COPY_FIX', 'APPLY_ALL_SAFE_FIXES',
  'APPLY_FOCUS_NODES', 'FOCUS_COMPONENT', 'GET_NODE_PREVIEW', 'SWAP_WITH_COMPONENT',
  'EXPORT_REPORT', 'CANCEL',
]);

export function isValidMessage(msg: unknown): msg is UiToMainMessage {
  if (typeof msg !== 'object' || msg === null) return false;
  const m = msg as Record<string, unknown>;
  return typeof m.type === 'string' && typeof m.requestId === 'string' && VALID_UI_TYPES.has(m.type);
}

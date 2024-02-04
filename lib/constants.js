"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TABINDEX = exports.CANFOCUS = void 0;
var CANFOCUS = exports.CANFOCUS = "\n  /*\n   * Implicit\n   */\n  label:not(:disabled), /* ? */\n  input:not(:disabled),\n  select:not(:disabled),\n  textarea:not(:disabled),\n  button:not(:disabled),\n  object:not(:disabled),\n  a[href],\n  area[href],\n  iframe,\n  embed,\n  /*\n   *  Explicit\n   */\n  *[tabindex]:not(:disabled),\n  *[contenteditable]:not(:disabled)\n";
var TABINDEX = exports.TABINDEX = "\n  /*\n   * Implicit\n   */\n  label:not([tabindex^='-']):not(:disabled), /* ? */\n  input:not([tabindex^='-']):not(:disabled),\n  select:not([tabindex^='-']):not(:disabled),\n  textarea:not([tabindex^='-']):not(:disabled),\n  button:not([tabindex^='-']):not(:disabled),\n  object:not([tabindex^='-']):not(:disabled),\n  a[href]:not([tabindex^='-']),\n  area[href]:not([tabindex^='-']),\n  /*\n   *  Explicit\n   */\n  *[tabindex]:not([tabindex^='-']):not(:disabled),\n  *[contenteditable]:not([tabindex^='-']):not(:disabled)\n";
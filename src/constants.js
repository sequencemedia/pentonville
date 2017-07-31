export const CANFOCUS = `
  /*
   * Implicit
   */
  label:not(:disabled), /* ? */
  input:not(:disabled),
  select:not(:disabled),
  textarea:not(:disabled),
  button:not(:disabled),
  object:not(:disabled),
  a[href],
  area[href],
  iframe,
  embed,
  /*
   *  Explicit
   */
  *[tabindex]:not(:disabled),
  *[contenteditable]:not(:disabled)
`

export const TABINDEX = `
  /*
   * Implicit
   */
  label:not([tabindex^='-']):not(:disabled), /* ? */
  input:not([tabindex^='-']):not(:disabled),
  select:not([tabindex^='-']):not(:disabled),
  textarea:not([tabindex^='-']):not(:disabled),
  button:not([tabindex^='-']):not(:disabled),
  object:not([tabindex^='-']):not(:disabled),
  a[href]:not([tabindex^='-']),
  area[href]:not([tabindex^='-']),
  /*
   *  Explicit
   */
  *[tabindex]:not([tabindex^='-']):not(:disabled),
  *[contenteditable]:not([tabindex^='-']):not(:disabled)
`

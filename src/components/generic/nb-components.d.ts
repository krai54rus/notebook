/**
 * Type declarations and global component registration for Nb* components
 * in @/components/generic. Use v-model / props as described below.
 */

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NbButton: typeof import('./NbButton.vue')['default']
    NbDnDItem: typeof import('./NbDnDItem.vue')['default']
    NbIcon: typeof import('./NbIcon.vue')['default']
    NbInput: typeof import('./NbInput.vue')['default']
    NbModalbox: typeof import('./NbModalbox.vue')['default']
    NbOverlay: typeof import('./NbOverlay.vue')['default']
    NbTextarea: typeof import('./NbTextarea.vue')['default']
    NbToolbar: typeof import('./NbToolbar.vue')['default']
  }
}

export {}

// --- NbButton ---

/** Props for NbButton. Color: white | black | green | red | blue | yellow | orange | purple | gray. Size: small | normal. */
export interface NbButtonProps {
  /** Button label text. */
  text?: string
  /** Color variant. */
  color?:
    | 'white'
    | 'black'
    | 'green'
    | 'red'
    | 'blue'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'gray'
  /** Size variant. */
  size?: 'small' | 'normal'
  /** Outline style. */
  outline?: boolean
  /** Depressed style. */
  depressed?: boolean
  /** Plain (transparent) style. */
  plain?: boolean
  /** Full width. */
  block?: boolean
  /** Disabled state. */
  disabled?: boolean
}

/** Emits for NbButton. */
export interface NbButtonEmits {
  click: []
}

/** Slots for NbButton: default (main content), before-text, after-text. */
export type NbButtonSlots = {
  default?: () => unknown
  'before-text'?: () => unknown
  'after-text'?: () => unknown
}

// --- NbInput ---

/** Input visual type. */
export type NbInputType = 'regular' | 'outlined' | 'solo' | 'filled'

/** Input size. */
export type NbInputSize = 'small' | 'normal'

/** Props for NbInput. Supports v-model via modelValue. */
export interface NbInputProps {
  /** Bound value (use v-model). */
  modelValue?: string
  /** Floating label text. */
  label?: string
  /** Visual style. */
  type?: NbInputType
  color?: string
  placeholder?: string
  size?: NbInputSize
  /** When true, focus does not trigger floating label. */
  noFocus?: boolean
  resize?: boolean
}

/** Emits for NbInput. */
export interface NbInputEmits {
  'update:modelValue': [value: string]
  change: [event: Event]
}

// --- NbTextarea ---

/** Props for NbTextarea. Uses value + @input (consider migrating to modelValue). */
export interface NbTextareaProps {
  value?: string
  placeholder?: string
  resize?: boolean
  label?: string
  type?: string
}

/** Emits for NbTextarea. */
export interface NbTextareaEmits {
  input: [payload: unknown]
  change: [payload: unknown]
}

// --- NbModalbox ---

/** Props for NbModalbox (currently none; content via slots). */
export interface NbModalboxProps {}

/** Emits for NbModalbox. */
export interface NbModalboxEmits {
  close: []
  change: []
}

/** Slots for NbModalbox: header, content, footer. */
export type NbModalboxSlots = {
  header?: () => unknown
  content?: () => unknown
  footer?: () => unknown
}

// --- NbOverlay ---

/** Props for NbOverlay (none). */
export interface NbOverlayProps {}

/** Emits for NbOverlay. */
export interface NbOverlayEmits {
  close: []
}

/** Slots for NbOverlay: default. */
export type NbOverlaySlots = {
  default?: () => unknown
}

// --- NbToolbar ---

/** Props for NbToolbar. */
export interface NbToolbarProps {
  /** Toolbar title. */
  title?: string
  /** CSS height (e.g. 'auto', '56px'). */
  height?: string
  items?: unknown[]
}

/** Slots for NbToolbar: caption (replaces title), content. */
export type NbToolbarSlots = {
  caption?: () => unknown
  content?: () => unknown
}

// --- NbIcon ---

/** Props for NbIcon. Icon name must exist in generic/icons.js. */
export interface NbIconProps {
  /** Icon name from icons.js. */
  name: string
}

/** Emits for NbIcon. */
export interface NbIconEmits {
  click: []
}

// --- NbDnDItem ---

/** Payload emitted by NbDnDItem drag-start and click. */
export interface NbDnDItemDragPayload {
  e: Event
  dragItem?: {
    item: unknown
    index: number
    columnIndex: number
    elem: unknown
  }
  item?: unknown
  index?: number
  columnIndex?: number
  elem?: unknown
}

/** Props for NbDnDItem (drag-and-drop column item). */
export interface NbDnDItemProps {
  item?: unknown
  index?: number
  columnIndex?: number
}

/** Emits for NbDnDItem. */
export interface NbDnDItemEmits {
  'drag-start': [payload: NbDnDItemDragPayload]
  click: [payload: NbDnDItemDragPayload]
}

/** Slots for NbDnDItem: default. */
export type NbDnDItemSlots = {
  default?: () => unknown
}

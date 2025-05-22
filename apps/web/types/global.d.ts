/// <reference types="vite/client" />
import type { Component, JSX } from 'solid-js'


declare global {
    /** Svg 图标类型 */
    type SvgIconProps = JSX.IntrinsicElements['svg']
    type SvgIcon = Component<SvgIconProps>
}

export { }
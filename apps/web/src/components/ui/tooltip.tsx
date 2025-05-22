import CorvuTooltip from '@corvu/tooltip'
import type { RootProps, } from '@corvu/tooltip'
import type { Component, JSX, } from 'solid-js'
import { splitProps, children, mergeProps, } from 'solid-js'


export interface TooltipProps extends Omit<RootProps, 'children'> {
    children?: JSX.Element
    content?: string
}

export const Tooltip: Component<TooltipProps> = (_props) => {
    const props = mergeProps({
        openDelay: 500,
    }, _props)
    const [local, other] = splitProps(props, ['children', 'content'])
    const resolved = children(() => local.children)

    return (
        <CorvuTooltip {...other}>
            <CorvuTooltip.Trigger>
                {resolved()}
            </CorvuTooltip.Trigger>

            <CorvuTooltip.Portal>
                <CorvuTooltip.Content
                    class="rounded-lg text-xs z-50 bg-background-elevated-highlight text-content px-3 py-2 font-medium"
                >
                    {props.content}
                </CorvuTooltip.Content>
            </CorvuTooltip.Portal>
        </CorvuTooltip>
    )
}

// export function TooltipTrigger<T extends ValidComponent>(props: DynamicProps<T, TriggerProps<T>>) {
//     return (
//         <CorvuTooltip.Trigger  {...props} />
//     )
// }
export const TooltipTrigger = CorvuTooltip.Trigger
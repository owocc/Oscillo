import { twMerge, } from 'tailwind-merge'

import type { ClassNameValue } from 'tailwind-merge'

export const cn = (...args: ClassNameValue[]) => {
    return twMerge(...args)
}
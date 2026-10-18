//@ts-ignore
import { formatColor, parseColor } from 'tailwindcss/lib/util/color'
import { CssPropertiesObject } from './typeHelpers'

export const colorWithOpacity = (color: string | ((v: any) => any), opacityVariableName: string, returnPropertiesCallback: (color: string) => CssPropertiesObject) => {
   if (typeof color === 'function') {
      const withOpacity = color({ opacityVariable: opacityVariableName, opacityValue: `var(${opacityVariableName})` })
      return { [opacityVariableName]: '1', ...returnPropertiesCallback(withOpacity) }
   }
   const parsed = parseColor(color)
   if (parsed === null) return { ...returnPropertiesCallback(color) }
   if (parsed.alpha !== undefined) return { ...returnPropertiesCallback(color) }
   const withOpacity = formatColor({ ...parsed, alpha: `var(${opacityVariableName})` })
   return { [opacityVariableName]: '1', ...returnPropertiesCallback(withOpacity) }
}
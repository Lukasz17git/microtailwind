# Microtailwind

Plugins for **Tailwind CSS v3** with shorter class names, rem values written in px, and light and dark values for utilities and components, with themes.

- **Shorter class names** (`fccc`, `g-4`, `tc-white`), next to Tailwind's own, which keep working.
- **Expanded theme**: px values with a dot become rem (`gap-16.` -> `gap: 1rem`), plus more %, em, opacity and z-index values.
- **Dark mode values**: `[light, dark]` pairs for utilities and components, Tailwind's or your own.
- **Themes**: other values for the same classes under a theme class (`.snow`).
- Works with the other Tailwind plugins.

The package also has `tailwind.config.example.js` (a full setup) and `abreviations.js` (every short name).

## Installation

```bash
npm install -D microtailwind
```

## Configuration

```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin'
import { microtailwind, themeMiddleware, withMicrotailwindExtensions } from 'microtailwind'

export default {
   /** rest of the config */
   darkMode: 'class', // needed: dark values apply under the 'dark' class
   theme: {
      extend: withMicrotailwindExtensions({
         /** your theme extensions (merged; yours win on conflicts) */
      }),
   },
   plugins: [
      plugin(microtailwind), // shorter class names
      plugin(themeMiddleware(({ addUtility, addComponents, addVariants }) => {
         /** Utilities */
         addUtility('bg', {
            primary: ['aliceblue', '#161616'], // bg-primary: [light, dark]
            secondary: '#BA0021', // bg-secondary, same in light and dark
            'slate-300': [, '#1F2933'], // keeps Tailwind's bg-slate-300 and adds a dark value
         })
         /** Components */
         addComponents({
            '.icon': '@apply w-24. h-24.',
            '.button': '@apply min-w-80. py-12. px-16. br-5.',
            '.button-primary': {
               _apply: '@apply button',
               backgroundColor: ['fuchsia', 'darkmagenta'],
            },
         })
         /** Component variants: .button-secondary and .icon-primary */
         addVariants({
            '.button': {
               secondary: {
                  _apply: ['@apply text-black', '@apply text-white'],
                  backgroundColor: ['lime', 'orange'],
               },
            },
            '.icon': {
               primary: ['@apply bg-sky-600', '@apply bg-sky-400'],
            },
         })
      })),
      plugin(themeMiddleware('snow', ({ addComponents }) => {
         /** .button-primary under the "snow" theme */
         addComponents({
            '.button-primary': {
               backgroundColor: ['ghostwhite', 'cornflowerblue'],
            },
         })
      })),
   ],
}
```

`@apply` takes class names without the dot (`'@apply button'`); with it (`'@apply .button'`) Tailwind fails with "The `.button` class does not exist".

## TypeScript Types

```typescript
import type { AddComponents, AddUtility, AddVariants, Components } from 'microtailwind/types'
```

## Theme and Dark Mode

Add dark mode and theme values to **existing Tailwind CSS projects.**

Any CSS and `@apply` value can be:

- **string:** the same in light and dark mode
- **tuple:** `[light, dark]`, `[, dark]` or `[light]`

Add the `dark` class and the theme class to an element around your app. Values without a theme apply under any ancestor with `dark`; a theme's dark values need both classes on the same element (`.dark.snow .button-primary`).

```html
<body class="dark snow">
   <!-- your app -->
</body>
```

### ThemeMiddleware

Middleware function to add theme and dark mode support to TailwindCSS utilities and components.

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

/** To be able to change the default darkmode classname*/
themeMiddleware.darkmodeClassname = 'custom_dark' // default is 'dark'

export default {
   /** Rest of the config */
  plugins: [
      /** without theme */
      plugin(themeMiddleware(({ addUtility, addComponents, addVariants }) => {
         /** Rest of the code */
      })),

      /** with theme */
      plugin(themeMiddleware('my_theme',({ addUtility, addComponents, addVariants }) => {
         /** Rest of the code */
      }))
   ],
}
```

### AddUtility

Used to add dark mode support to TailwindCSS Utilities, default ones or custom ones.
  
```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware('theme',({ addUtility }) => {
         addUtility('bg', {
         /** creates/adds "bg-slate-500" color to #1F2933 in dark mode */
         'slate-500': [, '#1F2933'],
         /** creates/adds "bg-btn-main" with #002D62 color in light mode and #6699CC in dark mode  */
         'btn-main': ['#002D62', '#6699CC'],
         /** creates/adds "bg-btn-secondary" which will have the color #BA0021 in light mode and dark mode */
         'btn-secondary': '#BA0021', // or ['#BA0021']
         })
      }))
   ],
}
```

### AddCustomUtility

Used to add dark mode support to Custom TailwindCSS Utilities, **second parameter is the CSS property name.**
  
```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addCustomUtility }) => {
         addCustomUtility('bgcolor', 'background-color', { //or backgroundColor
         /** creates/adds "bgcolor-slate-500" color to #1F2933 in dark mode */
         'slate-500': [, '#1F2933'],
         /** creates/adds "bgcolor-btn-main" with #002D62 color in light mode and #6699CC in dark mode  */
         'btn-main': ['#002D62', '#6699CC'],
         /** creates/adds "bgcolor-btn-secondary" which will have the color #BA0021 in light mode and dark mode */
         'btn-secondary': '#BA0021', // or ['#BA0021']
         })
      }))
   ],
}
```

### AddComponents

Creates Tailwind CSS components with dark mode support.

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addComponents }) => {
         addComponents({
            '.icon':  '@apply w-24. h-24.',
            '.label': [, '@apply tc-gray-100'], // dark mode only
            '.action-icon': {
               _apply: '@apply frcc h-40. w-40. br-6. tc-red-800 dark:tc-red-600',
            },
            '.button': {
               _apply: '@apply h-40. frcc br-8. py-8. px-20. tw-semibold ts-14.', //light and dark
               backgroundColor: ['silver', 'beige'], //[light, dark]
               color: ['black', 'white'], //[light, dark]
            },
            '.button-primary': {
               _apply: [, '@apply ts-16. tw-bold'], //[light, dark]
               backgroundColor: ['blue', 'red'], //[light, dark]
               color: ['cadetblue', 'white'], //[light, dark]
            },
         })
      })),
   ],
}
```

### AddVariants

Creates component variants with dark mode support: each key becomes `<component>-<variant>` (`.button` + `primary` -> `.button-primary`).
In a `tailwind.config.ts`, a generic with the component names catches typos (`addVariants<'.button' | '.icon'>({ ... })`).
`'@apply button'` below needs `.button` added with `addComponents`.

```javascript
//tailwind.config.js
import { themeMiddleware } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** Rest of the config */
  plugins: [
      plugin(themeMiddleware(({ addVariants }) => {
         addVariants({
            '.button': {
               primary: {
                  _apply: '@apply button ts-16. tw-bold', //light and dark, .button classes included
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
               secondary: {
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
               tertiary: {
                  _apply: [, '@apply ts-16. tw-bold'], //[light, dark]
                  backgroundColor: ['blue', 'red'], //[light, dark]
                  color: ['cadetblue', 'white'], //[light, dark]
               },
               default: ['@apply bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90', '@apply bg-gray-50 text-gray-900 hover:bg-gray-50/90'],
               destructive: '@apply bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90',
            },
         })
      })),
   ],
}
```

## Expanded Tailwind CSS Default Theme

**Expands Tailwind CSS's default theme with px values written in rem and more values for the usual utilities.**

```javascript
//tailwind.config.js
import { withMicrotailwindExtensions } from 'microtailwind'

export default {
   /** rest of the config */
   theme: {
      extend: withMicrotailwindExtensions({
         /** your theme extensions (merged; yours win on conflicts) */
      }),
   }
}

```

```jsx
//usage example

<div className="m-a w-100% gap-16."></div> 
/** margin: auto, width: 100%, gap: 1rem (16px) */
```

Includes:

- Pixel based values transformed into rem values automatically with the dot notation.
  - Example: 2. (2px => 0.125rem)
- Expanded percentage values for the width, height, padding, margin, etc.
- Expanded "em" values for the width, height, padding, margin, etc.
- "min", "max", "fit", "a"(auto) values for the width, height, padding, margin, etc.
- More opacity values.
- More z-index values.
- And many more.

## Microtailwind Abreviations

Shorter TailwindCSS utilities fully compatible with the default ones.
Custom shorter Flexbox utilities.

```javascript
//tailwind.config.js
import { microtailwind } from 'microtailwind'
import plugin from 'tailwindcss/plugin'

export default {
   /** rest of the config */
   plugins: [
      plugin(microtailwind),
   ],
}
```

```javascript
//usage example
<div
 //tailwindcss
 className="flex flex-col justify-center items-center gap-[4px] p-[4px] text-white border-black rounded-[6px]"
 //microtailwind
 className="fccc g-[4px] p-[4px] tc-white bc-black br-[6px]"
 //microtailwind with expanded theme
 className="fccc g-4. p-4. tc-white bc-black br-6."
 ></div>
```

Every short name is in [abreviations.js](https://github.com/Lukasz17git/microtailwind/blob/master/abreviations.js).

`microtailwindExperimental` adds `fs0`, `fs1`, `fg0` and `fg1` (`flex-shrink` and `flex-grow` set to `0` or `1`): `plugin(microtailwindExperimental)`.

## Development

| Script          | Does                                                                  |
| --------------- | --------------------------------------------------------------------- |
| `npm run dev`   | Runs the tests in watch mode                                          |
| `npm test`      | Runs the tests once                                                   |
| `npm run lint`  | Type-checks with `tsc`                                                |
| `npm run build` | Builds ESM + CJS to `dist` and `types.d.ts` for `microtailwind/types` |
| `npx changeset` | Adds a changeset for the next release                                 |

### Releasing

1. Run `npx changeset`, pick the bump type and describe the change, and commit the generated file.
2. When pushed to `master`, CI opens a "Version Packages" PR and runs the checks on it.
3. Merging that PR publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (no npm token needed).

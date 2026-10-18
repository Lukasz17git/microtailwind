
//@ts-ignore
import { parseBoxShadowValue, formatBoxShadowValue } from 'tailwindcss/lib/util/parseBoxShadowValue'
//@ts-ignore
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import { PluginCreator } from "tailwindcss/types/config"
import { colorWithOpacity } from '../utils/colorWithOpacity'


const transformShadowValue = (value: any) => {
   if (typeof value === 'function') value = value({})
   if (Array.isArray(value)) value = value.join(', ')
   return value
}

const borderStyleValues = {
   none: 'none',
   hidden: 'hidden',
   dotted: 'dotted',
   dashed: 'dashed',
   double: 'double',
   groove: 'groove',
   ridge: 'ridge',
   inset: 'inset',
   outset: 'outset',
   solid: 'solid'
}

export const microtailwind: PluginCreator = ({ addVariant, addUtilities, matchUtilities, theme }) => {

   // MODIFIERS
   addVariant('h', '&:hover')
   addVariant('f', '&:focus')
   addVariant('hf', ['&:hover', '&:focus'])
   addVariant('d', ':is(.dark &)')

   // USEFULL VARIANTS
   addVariant('active-field', ['.peer:not(:placeholder-shown) ~ &', '.peer:focus ~ &', '.peer:-webkit-autofill ~ &'])
   addVariant('state-on', '&[data-state=on]')
   addVariant('state-off', '&[data-state=off]')
   addVariant('state-open', '&[data-state=open]')
   addVariant('state-closed', '&[data-state=closed]')
   addVariant('disabled', ['&[disabled]', '&[data-disabled=true]'])

   // SHADOW
   matchUtilities(
      {
         s: (value) => {

            value = transformShadowValue(value)
            let ast = parseBoxShadowValue(value)

            for (let shadow of ast) {
               if (!shadow.valid) continue;
               shadow.color = 'var(--tw-shadow-color)'
            }

            return {
               '--tw-shadow': value === 'none' ? '0 0 #0000' : value,
               '--tw-shadow-colored': value === 'none' ? '0 0 #0000' : formatBoxShadowValue(ast),
               'box-shadow': [`var(--tw-ring-offset-shadow, 0 0 #0000)`, `var(--tw-ring-shadow, 0 0 #0000)`, `var(--tw-shadow)`,].join(', '),
            }
         }
      },
      { values: theme('boxShadow'), type: ['shadow'] }
   )
   // SHADOW COLOR
   matchUtilities(
      {
         sc: (value) => ({
            // '--tw-shadow-color': typeof value === 'function' ? value({}) : value,
            '--tw-shadow-color': value,
            '--tw-shadow': 'var(--tw-shadow-colored)',
         })
      },
      { values: flattenColorPalette(theme('boxShadowColor')), type: ['color', 'any'] }
   )
   // OPACITY
   matchUtilities(
      { o: (value) => ({ opacity: value }) },
      { values: theme('opacity') }
   )
   //BACKGROUND OPACITY
   matchUtilities(
      { bgo: (value) => ({ "--tw-bg-opacity": value }) },
      { values: theme('opacity') }
   )
   // GAP
   matchUtilities(
      { g: (value) => ({ gap: value }) },
      { values: theme('spacing') }
   );
   // GAP X
   matchUtilities(
      { gx: (value) => ({ columnGap: value }) },
      { values: theme('spacing') }
   );
   // GAP Y
   matchUtilities(
      { gy: (value) => ({ rowGap: value }) },
      { values: theme('spacing') }
   );
   // BORDER RADIUS
   matchUtilities(
      { br: (value) => ({ borderRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER TOP RADIUS
   matchUtilities(
      { btr: (value) => ({ borderTopLeftRadius: value, borderTopRightRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER RIGHT RADIUS
   matchUtilities(
      { brr: (value) => ({ borderTopRightRadius: value, borderBottomRightRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER BOTTOM RADIUS
   matchUtilities(
      { bbr: (value) => ({ borderBottomRightRadius: value, borderBottomLeftRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER LEFT RADIUS
   matchUtilities(
      { blr: (value) => ({ borderTopLeftRadius: value, borderBottomLeftRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER TOP LEFT RADIUS
   matchUtilities(
      { btlr: (value) => ({ borderTopLeftRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER TOP RIGHT RADIUS
   matchUtilities(
      { btrr: (value) => ({ borderTopRightRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER BOTTOM RIGHT RADIUS
   matchUtilities(
      { bbrr: (value) => ({ borderBottomRightRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER BOTTOM LEFT RADIUS
   matchUtilities(
      { bblr: (value) => ({ borderBottomLeftRadius: value }) },
      { values: theme('spacing') }
   );
   // BORDER COLOR
   matchUtilities(
      { bc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ border: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER Y-AXIS COLOR
   matchUtilities(
      { byc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderTop: `solid ${c}`, borderBottom: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER X-AXIS COLOR
   matchUtilities(
      { bxc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderRight: `solid ${c}`, borderLeft: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER TOP COLOR
   matchUtilities(
      { btc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderTop: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER RIGHT COLOR
   matchUtilities(
      { brc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderRight: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER BOTTOM COLOR
   matchUtilities(
      { bbc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderBottom: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER LEFT COLOR
   matchUtilities(
      { blc: (value) => colorWithOpacity(value, '--tw-border-opacity', c => ({ borderLeft: `solid ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // BORDER OPACITY
   matchUtilities(
      { bo: (value) => ({ "--tw-border-opacity": value }) },
      { values: theme('opacity') }
   );
   // // BORDER STYLES
   // addUtilities({
   //    ".bs-none": { borderStyle: "none" },
   //    ".bs-dotted": { borderStyle: "dotted" },
   //    ".bs-dashed": { borderStyle: "dashed" },
   //    ".bs-double": { borderStyle: "double" },
   //    ".bs-solid": { borderStyle: "solid" },
   // });
   // BORDER STYLE
   matchUtilities(
      { bs: (value) => ({ borderStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER X-AXIS STYLE
   matchUtilities(
      { bxs: (value) => ({ borderRightStyle: value, borderLeftStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER Y-AXIS STYLE
   matchUtilities(
      { bys: (value) => ({ borderTopStyle: value, borderBottomStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER TOP STYLE
   matchUtilities(
      { bts: (value) => ({ borderTopStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER RIGHT STYLE
   matchUtilities(
      { brs: (value) => ({ borderRightStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER BOTTOM STYLE
   matchUtilities(
      { bbs: (value) => ({ borderBottomStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER LEFT STYLE
   matchUtilities(
      { bls: (value) => ({ borderLeftStyle: value }) },
      { values: borderStyleValues }
   );
   // BORDER WIDTH
   matchUtilities(
      { bw: (value) => ({ borderWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER X-AXIS WIDTH
   matchUtilities(
      { bxw: (value) => ({ borderRightWidth: value, borderLeftWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER Y-AXIS WIDTH
   matchUtilities(
      { byw: (value) => ({ borderTopWidth: value, borderBottomWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER TOP WIDTH
   matchUtilities(
      { btw: (value) => ({ borderTopWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER RIGHT WIDTH
   matchUtilities(
      { brw: (value) => ({ borderRightWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER BOTTOM WIDTH
   matchUtilities(
      { bbw: (value) => ({ borderBottomWidth: value }) },
      { values: theme('spacing') }
   );
   // BORDER LEFT WIDTH
   matchUtilities(
      { blw: (value) => ({ borderLeftWidth: value }) },
      { values: theme('spacing') }
   );
   // OUTLINE NONE
   addUtilities({
      ".os-none": { outline: "none" }
   })
   // OUTLINE COLOR
   matchUtilities(
      { oc: (value) => colorWithOpacity(value, '--tw-outline-opacity', c => ({ outline: `solid 3px ${c}` })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // OUTLINE OPACITY
   matchUtilities(
      { oo: (value) => ({ "--tw-outline-opacity": value }) },
      { values: theme('opacity') }
   );
   // OUTLINE WIDTH
   matchUtilities(
      { ow: (value) => ({ outlineWidth: value }) },
      { values: theme('spacing') }
   );
   // TEXT
   addUtilities({
      ".tc": { textAlign: "center" },
      ".tj": { textAlign: "justify" },
      ".ts": { textAlign: "start" },
      ".te": { textAlign: "end" },
      ".tl": { textAlign: "left" },
      ".tr": { textAlign: "right" },
      ".tw": { whiteSpace: "nowrap" },
      ".tcap": { textTransform: "capitalize" },
      ".tlower": { textTransform: "lowercase" },
      ".tupper": { textTransform: "uppercase" }
   });
   // TEXT SIZE
   matchUtilities(
      { ts: (value) => ({ fontSize: value }) },
      { values: theme('spacing') }
   );
   // TEXT COLOR
   matchUtilities(
      { tc: (value) => colorWithOpacity(value, '--tw-text-opacity', c => ({ color: c })) },
      { values: flattenColorPalette(theme('colors')), type: ['color'] }
   );
   // TEXT OPACITY
   matchUtilities(
      { to: (value) => ({ "--tw-t-opacity": value }) },
      { values: theme('opacity') }
   );
   // TEXT FAMILY
   matchUtilities(
      { tf: (value) => ({ fontFamily: value }) },
      { values: theme('fontFamily') }
   );
   // TEXT WEIGHT
   matchUtilities(
      { tw: (value) => ({ fontWeight: value }) },
      { values: theme('fontWeight') }
   );
   // LINE HEIGHT
   matchUtilities(
      { lh: (value) => ({ lineHeight: value }) },
      { values: theme('spacing') }
   );
   // LETTER SPACING
   matchUtilities(
      { ls: (value) => ({ letterSpacing: value }) },
      { values: theme('spacing') }
   );
   // FLEX
   addUtilities({
      ".fw": {
         display: "flex",
         flexWrap: "wrap"
      },
      ".fwr": {
         display: "flex",
         flexWrap: "wrap-reverse"
      },
      ".fr": {
         display: "flex",
         flexDirection: "row"
      },
      ".frc": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center"
      },
      ".frnc": {
         display: "flex",
         flexDirection: "row",
         justifyContent: "center"
      },
      ".frcc": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "center"
      },
      ".frcb": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between"
      },
      ".frca": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-around"
      },
      ".frce": {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-evenly"
      },
      ".fc": {
         display: "flex",
         flexDirection: "column"
      },
      ".fcc": {
         display: "flex",
         flexDirection: "column",
         alignItems: "center"
      },
      ".fcnc": {
         display: "flex",
         flexDirection: "column",
         justifyContent: "center"
      },
      ".fcnb": {
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between"
      },
      ".fcna": {
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-around"
      },
      ".fcne": {
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-evenly"
      },
      ".fccc": {
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center"
      },
   })
   // POSITION
   addUtilities({
      ".pos-a": { position: "absolute" },
      ".pos-r": { position: "relative" },
      ".pos-f": { position: "fixed" },
      ".pos-s": { position: "sticky" }
   })
   // TRANSFORM TO CENTER
   addUtilities({
      ".transform-to-center": { top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
   })
   // TOP
   matchUtilities(
      { t: (value) => ({ top: value }) },
      { values: theme('spacing'), supportsNegativeValues: true }
   );
   // RIGHT
   matchUtilities(
      { r: (value) => ({ right: value }) },
      { values: theme('spacing'), supportsNegativeValues: true }
   );
   // BOTTOM
   matchUtilities(
      { b: (value) => ({ bottom: value }) },
      { values: theme('spacing'), supportsNegativeValues: true }
   );
   // LEFT
   matchUtilities(
      { l: (value) => ({ left: value }) },
      { values: theme('spacing'), supportsNegativeValues: true }
   );
   // OVERFLOW
   addUtilities({
      ".oh": { overflow: "hidden" },
      ".ov": { overflow: "visible" },
      ".oa": { overflow: "auto" },
      ".oyh": { overflowY: "hidden" },
      ".oyv": { overflowY: "visible" },
      ".oya": { overflowY: "auto" },
      ".oxh": { overflowX: "hidden" },
      ".oxa": { overflowX: "auto" },
      ".oxv": { overflowX: "visible" },
   })
   // DISPLAY
   /*** Maybe con d-b d-g d-f o solo b f g ib i */
   addUtilities({
      ".iblock": { display: "inline-block" },
      ".iflex": { display: "inline-flex" },
      ".igrid": { display: "inline-grid" },
      ".none": { display: "none" },
   })
   // VISIBILITY
   addUtilities({
      ".hide": { visibility: "hidden" },
   })
   // CURSOR
   addUtilities({
      ".pointer": { cursor: 'pointer', userSelect: 'none' },
   })
   // OBJECT FIT
   addUtilities({
      ".cover": { objectFit: "cover" },
      ".contain": { objectFit: "contain" },
      ".fill": { objectFit: "fill" },
   })
}

// TO TEST //
export const microtailwindExperimental: PluginCreator = ({ addUtilities }) => {

   addUtilities({
      '.fs0': {
         flexShrink: "0"
      },
      '.fs1': {
         flexShrink: "1"
      },
      '.fg0': {
         flexGrow: "0"
      },
      '.fg1': {
         flexGrow: "1"
      },
   })

   addUtilities({
      ".g": {
         display: "grid",
      },
      ".gc": {
         display: "grid",
         alignItems: 'center'
      },
      ".gnc": {
         display: "grid",
         justifyItems: 'center'
      },
      ".gcc": {
         display: "grid",
         alignItems: 'center',
         justifyItems: 'center'
      }
   })
}
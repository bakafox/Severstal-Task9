import antfu from '@antfu/eslint-config'

export default antfu({
    react: true,
    typescript: true,

    ignores: [
        'tsconfig.*',
        'package*',
    ],

    stylistic: {
        indent: 4,
        quotes: 'single',
    },
})

export default {
  '{apps,libs}/**/*.{ts,tsx}': [
    files => `nx affected --target=typeCheck --files=${files.join(',')}`
  ],
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    files => `npx nx affected:lint --fix --files=${files.join(',')}`,
    files => `npx nx format:write --files=${files.join(',')}`
  ],
  "{apps,libs}/**/*.{css,scss}": [
    files => `npx stylelint ${files.join(' ')} --fix --allow-empty-input`,
    files => `npx nx format:write --files=${files.join(',')}`
  ]
}

import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig(
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  perfectionist.configs['recommended-alphabetical'],
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            ['value-builtin', 'value-external', 'type-builtin', 'type-external'],
            ['type-internal', 'value-internal'],
            ['type-parent', 'type-sibling', 'type-index', 'value-parent', 'value-sibling', 'value-index'],
            'side-effect-style',
            'unknown',
          ],
          internalPattern: ['@/.*'],
        },
      ],
    },
  },
);

export default eslintConfig;

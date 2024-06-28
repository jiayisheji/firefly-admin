import { createRequire } from 'module';

// 创建兼容 CommonJS 的导入方法
const require = createRequire(import.meta.url);

// 导入 .cjs 文件
const { scopes, types, subjectLimit } = require('./.cz-config.js');

export default {
  extends: ['@commitlint/config-conventional'],
  "rules": {
    "header-max-length": [2, "always", subjectLimit],
    /**
     * scope-enum 提交 scope 的枚举
     */
    'scope-enum': [2, 'always', scopes.map((s) => s.name)],
    /**
     * type-enum 提交的类型枚举
     */
    'type-enum': [2, 'always', types.map((t) => t.value)],
  }
}

import { ExecutorContext } from '@nx/devkit';

import executor from './executor';
import { TypeCheckExecutorSchema } from './schema';

const options: TypeCheckExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('TypeCheck Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});

import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';

import { TypeCheckExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<TypeCheckExecutorSchema> = async (options, context: ExecutorContext) => {
  const { root, projectType } = context.projectsConfigurations.projects[context.projectName];
  const nxTsConfig =
    projectType === 'application' ? 'tsconfig.app.json' : projectType === 'library' ? 'tsconfig.lib.json' : '';

  const tsConfig = options.tsConfig ?? nxTsConfig;

  if (!tsConfig) {
    throw new Error(`Using "tsConfig" is not found.`);
  }

  return await runCommands(
    {
      command: `tsc -p ${tsConfig} --pretty --noEmit`,
      cwd: root,
      forwardAllArgs: false,
      __unparsed__: [],
    },
    context
  );
};

export default runExecutor;

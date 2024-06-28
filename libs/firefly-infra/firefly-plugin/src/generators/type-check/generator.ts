import { Tree, formatFiles, readProjectConfiguration, updateProjectConfiguration } from '@nx/devkit';

import { TypeCheckGeneratorSchema } from './schema';

export async function typeCheckGenerator(tree: Tree, options: TypeCheckGeneratorSchema) {
  const project = readProjectConfiguration(tree, options.project);

  // add type-check to the project.json
  project.targets['type-check'] = {
    executor: '@firefly-admin/firefly-plugin:type-check',
    options: options.tsConfig
      ? {
          tsConfig: options.tsConfig,
        }
      : {},
  };

  updateProjectConfiguration(tree, options.project, project);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}

export default typeCheckGenerator;

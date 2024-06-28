const { getProjects } = require('nx/src/generators/utils/project-configuration.js');
const { FsTree } = require('nx/src/generators/tree.js');

/**
 * get nx projects
 * @param {(params: Pick<Nx.ProjectConfiguration, 'name' | 'projectType' | 'tags'>) => boolean} selector
 * @returns {string[]} a list containing project.name
 */
function getNXProjectNames(context, selector = () => true) {
  const ctx = context || {};
  const cwd = ctx.cwd || process.cwd();

  const projects = getProjects(new FsTree(cwd, false));
  return Array.from(projects.entries())
    .map(([name, project]) => ({
      name,
      ...project,
    }))
    .filter((project) =>
      selector({
        name: project.name,
        projectType: project.projectType,
        tags: project.tags,
      })
    )
    .filter((project) => project.targets)
    .map((project) => project.name)
    .map((name) => (name.charAt(0) === '@' ? name.split('/')[1] : name));
}

/**
 * nx project scopes
 */
const projectScopes = getNXProjectNames({}, ({ name, projectType }) =>
  !name.includes('e2e') && projectType == 'application' || projectType == 'library'
).map(name => ({ name }));

// default scopes
const defaultScopes = [
  {
    name: 'tools',
    readme: '/tools',
  },
  {
    name: 'docs',
    readme: '/docs',
  },
  {
    name: 'deps',
    readme: 'bump package-name from 7.0.1 to 8.0.1',
  },
];

const scopes = [...projectScopes, ...defaultScopes].filter(Boolean);

module.exports = {
  types: [
    { value: 'feat', name: '✨ A new feature' },
    { value: 'fix', name: '🐛 A bug fix' },
    { value: 'docs', name: '📚 Documentation only changes' },
    { value: 'style', name: '💎 Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)' },
    { value: 'refactor', name: '📦 A code change that neither fixes a bug nor adds a feature' },
    { value: 'perf', name: '🚀 A code change that improves performance' },
    { value: 'test', name: '🚨 Adding missing tests or correcting existing tests' },
    { value: 'build', name: '🔧 Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)' },
    { value: 'ci', name: '⚙️  Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)' },
    { value: 'chore', name: '♻️  Other changes that don\'t modify src or test files' },
    { value: 'revert', name: '🗑️  Reverts a previous commit' },
  ],

  scopes,

  usePreparedCommit: false, // to re-use commit from ./.git/COMMIT_EDITMSG
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [

      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  // skipQuestions: ['scope', 'body'],

  // limit subject length
  subjectLimit: 72,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};

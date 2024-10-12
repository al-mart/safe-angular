import * as prettier from 'prettier';
import * as sortPackageJson from 'sort-package-json';
import * as parsers from 'prettier/parser-babel';

const parser = parsers['json-stringify'];

export const pluginSortPackageJson = {
  'json-stringify': {
    ...parser,
    async parse(text, options) {
      const isPackageJson = options.filepath && /package\.json$|ng-package\.json$/.test(options.filepath);

      if (!isPackageJson) {
        return parser.parse(text, options);
      }

      // To avoid parsing errors
      text = await (await prettier).format(text, { filepath: options.filepath });

      if (parser.preprocess) {
        text = parser.preprocess(text, options);
      }

      const json = JSON.parse(text);
      const unsortedScripts = deepClone((json && json.scripts) || {});
      const sortPackage = await sortPackageJson;
      const sorted = sortPackage.default(json);

      /**
       * @note: add the scripts field if it's provided
       * the scripts must be unsorted
       */
      if (json && json.hasOwnProperty('scripts')) {
        sorted.scripts = unsortedScripts;
      }

      text = JSON.stringify(sorted);

      return parser.parse(text, options);
    },
  },
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

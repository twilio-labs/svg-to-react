import svgr from '@svgr/core';
import {format, resolveConfig} from 'prettier';
import {config} from './config';
import {fileTemplateReactDefault, fileTemplateReactHooks, IFileTemplateArgs} from './templates';
import {fileNameToComponentName, removeLastCharacter} from './utils';

interface IOptions {
  useHooks: boolean;
  template?: ({componentName, svg}: IFileTemplateArgs) => string;
}

const DEFAULT_OPTIONS = {
  useHooks: false,
  template: null,
};

export async function convertSvgToReact(
  svgName: string,
  svgData: string,
  options: IOptions = DEFAULT_OPTIONS
): Promise<string> {
  const componentName = fileNameToComponentName(svgName);

  // Convert the SVG into our ideal format
  let svgDataCleaned = '';
  try {
    svgDataCleaned = await svgr(svgData, config, {componentName});
  } catch (e) {
    console.error(`Couldn't process svg data through SVGR: `, e);
  }

  // Remove the trailing semicolon from the generated SVG
  // I use my own templating to solve for issues in theirs, which is why I need to do this
  const noTrailingSemicolonSvg = removeLastCharacter(svgDataCleaned);

  // Dump the SVG JSX into our template
  let fileTemplate = options.useHooks ? fileTemplateReactHooks : fileTemplateReactDefault;
  if (options.template != null) {
    fileTemplate = options.template;
  }

  const templateJSX = fileTemplate({
    componentName,
    svg: noTrailingSemicolonSvg,
  });

  // Run our template through prettier to make it come out nice and clean
  let prettierOptions = {};
  try {
    prettierOptions = await resolveConfig(process.cwd());
  } catch (e) {
    console.error(`Couldn't fetch prettier options: `, e);
  }

  return format(templateJSX, prettierOptions);
}

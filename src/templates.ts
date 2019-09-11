// Note on a11y: https://css-tricks.com/can-make-icon-system-accessible/
import {pascalCaseWordSplitter} from './utils';

export interface IFileTemplateArgs {
  componentName: string;
  svg: string;
}

export const fileTemplateReactDefault = ({componentName, svg}: IFileTemplateArgs): string => `
/**!
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import React from 'react';
import {UID} from 'react-uid';

export interface ${componentName}Props {
  className?: string,
  size?: number,
  color?: string,
  title?: string;
  decorative?: boolean;
}

const ${componentName} = ({title = '${pascalCaseWordSplitter(
  componentName
)}', decorative = true, className, color, size}: ${componentName}Props) => (
  <UID>
    {uid => (
      <span style={{color, width: size, height: size, display: 'inline-block'}} className={className}>
        ${svg}
      </span>
    )}
  </UID>
);


export default ${componentName};
`;

export const fileTemplateReactHooks = ({componentName, svg}: IFileTemplateArgs): string => `
/**!
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import React from 'react';
import {useUID} from 'react-uid';

export interface ${componentName}Props {
  className?: string,
  size?: number,
  color?: string,
  title?: string;
  decorative?: boolean;
}

const ${componentName} = React.memo(({title = '${pascalCaseWordSplitter(
  componentName
)}', decorative = true, className, color, size}: ${componentName}Props) => {
  const uid = useUID();
  return (
    <span style={{color, width: size, height: size, display: 'inline-block'}} className={className}>
      ${svg}
    </span>
  );
});

export default ${componentName};
`;

// SVGR's templating is super bad (can be seen by the amount of issues on github pertaining to it), so I
// do a very minimal pass here and use my own template defined above.
export const svgTemplate = (
  {template}: any,
  _opts: {},
  {/*imports, componentName, props, exports,*/ jsx}: {jsx: any}
) => {
  const typeScriptTpl = template.smart({plugins: ['typescript']});

  return typeScriptTpl.ast`
${jsx}
`;
};

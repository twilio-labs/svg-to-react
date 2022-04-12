// Note on a11y: https://css-tricks.com/can-make-icon-system-accessible/
import {pascalCaseWordSplitter} from './utils';

export interface FileTemplateArgs {
  componentName: string;
  svg: string;
}

export const fileTemplateReactDefault = ({componentName, svg}: FileTemplateArgs): string => `
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
    {titleId => (
      <span style={{color, width: size, height: size, display: 'inline-block'}} className={className}>
        ${svg}
      </span>
    )}
  </UID>
);


export default ${componentName};
`;

export const fileTemplateReactHooks = ({componentName, svg}: FileTemplateArgs): string => `
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
  const titleId = useUID();
  return (
    <span style={{color, width: size, height: size, display: 'inline-block'}} className={className}>
      ${svg}
    </span>
  );
});

export default ${componentName};
`;

export const fileTemplateReactForwardRef = ({componentName, svg}: FileTemplateArgs): string => `
/**
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import * as React from 'react';
import {useUID} from 'react-uid';

export interface ${componentName}Props {
  className?: string,
  size?: number,
  color?: string,
  title?: string;
  decorative?: boolean;
}

const ${componentName} = React.forwardRef<HTMLElement, ${componentName}Props>(({title = '${pascalCaseWordSplitter(
  componentName
)}', decorative = true, className, color, size}, ref) => {
  const titleId = useUID();

  return (
    <span style={{color, width: size, height: size, display: 'inline-block'}} className={className} ref={ref}>
      ${svg}
    </span>
  );
});

export default ${componentName};
`;

// I do a very minimal pass here and use my own templates defined above.
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

import {convertSvgToReact} from '../src/main';

const SRC_SVG = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#001833;}
</style>
<path id="path-1_1_" class="st0" d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8
	s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z M14.3,15.3H16L12.9,8h-1.7L8,15.3h1.7l0.6-1.4h3.4L14.3,15.3z M10.8,12.6L12,9.7l1.2,2.8h-2.4
	V12.6L10.8,12.6z"/>
</svg>
`;

describe('Converting SVG to React', () => {
  it('Runs on < React 16.7', async () => {
    const result = `/**!
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import React from 'react';
import {UID} from 'react-uid';

export interface AutomaticIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
  decorative?: boolean;
}

const AutomaticIcon = ({title = 'Automatic Icon', decorative = true, className, color, size}: AutomaticIconProps) => (
  <UID>
    {uid => (
      <div style={{color, width: size, height: size}} className={className}>
        <svg role=\"img\" aria-hidden={decorative} aria-labelledby={uid} height=\"100%\" width=\"100%\" viewBox=\"0 0 24 24\">
          <title id={uid}>{title}</title>
          <path
            fill=\"currentColor\"
            d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm2.3-4.7H16L12.9 8h-1.7L8 15.3h1.7l.6-1.4h3.4l.6 1.4zm-3.5-2.7L12 9.7l1.2 2.8h-2.4v.1z\"
          />
        </svg>
      </div>
    )}
  </UID>
);

export default AutomaticIcon;
`;

    const convertedSrc = await convertSvgToReact('AutomaticIcon', SRC_SVG, {useHooks: false});
    expect(convertedSrc).toBe(result);
  });

  it('Runs on React >= 16.7', async () => {
    const result = `/**!
 * This file was automatically generated with @twilio-labs/svg-to-react
 */
import React from 'react';
import {useUID} from 'react-uid';

export interface AutomaticIconProps {
  className?: string;
  size?: number;
  color?: string;
  title?: string;
  decorative?: boolean;
}

const AutomaticIcon = React.memo(
  ({title = 'Automatic Icon', decorative = true, className, color, size}: AutomaticIconProps) => {
    const uid = useUID();
    return (
      <div style={{color, width: size, height: size}} className={className}>
        <svg role="img" aria-hidden={decorative} aria-labelledby={uid} height="100%" width="100%" viewBox="0 0 24 24">
          <title id={uid}>{title}</title>
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm2.3-4.7H16L12.9 8h-1.7L8 15.3h1.7l.6-1.4h3.4l.6 1.4zm-3.5-2.7L12 9.7l1.2 2.8h-2.4v.1z"
          />
        </svg>
      </div>
    );
  }
);

export default AutomaticIcon;
`;

    const convertedSrc = await convertSvgToReact('AutomaticIcon', SRC_SVG, {useHooks: true});
    expect(convertedSrc).toBe(result);
  });
});

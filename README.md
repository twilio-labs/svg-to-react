<h1 align="center">@twilio-labs/svg-to-react</h1>
<p align="center">A utility to convert raw svg files into accessible and extendable React Components. <a href="https://github.com/twilio-labs/svg-to-react/blob/master/RATIONALE.md">Why icon components?</a>.</p>
<p align="center">
<a href="https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md"><img alt="Code of Conduct" src="https://img.shields.io/badge/%F0%9F%92%96-Code%20of%20Conduct-blueviolet.svg?style=flat-square"></a> 
<a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
</p>
<hr>


## Installation

```sh
# Yarn
yarn add @twilio-labs/svg-to-react --dev

# NPM
npm i @twilio-labs/svg-to-react --save-dev
```

## Usage

### CLI 

Follow the on-screen instructions after running 
```js
yarn build
yarn convert
```


### NodeJS 
```js
const fs = require('fs');
const {convertSvgToReact} = require('@twilio-labs/svg-to-react');

fs.readFile(`path/to/file`, 'utf8', async (err, fileContents) => {
    // TODO: Handle error case here

    // Convert the SVG into our ideal format
    // Arguments: SVG Contents, Options
    const generatedComponent = await convertSvgToReact(fileContents, {useHooks: false});

    fs.writeFile(`path/to/output/file`, generatedComponent, 'utf8', err => {
        // TODO: Handle error case here
    });
});
```

## Options

|option name|type|details|
|-----------|----|--------|
|useHooks|boolean|Whether to use 'hooks', a feature only available in React 16.7+|
|template|function|Allows you to pass your own [template function](https://github.com/twilio-labs/svg-to-react/blob/master/src/templates.ts).|


## Dependencies

The generated React component depends on [react-uid](https://github.com/thearnica/react-uid) for accessibility by default.  We recommend this library for unique ID generation to satisfy accessibility needs.  You can avoid this dependency by providing a custom template.



# Contributing

This project welcomes contributions from the community. 


## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️


## Maintainers

This project is maintained by the [design systems team](https://github.com/orgs/twilio-labs/teams/design-systems).


---

# Demo

#### Input
```html
<?xml version="1.0" encoding="utf-8"?>
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
```

#### Output (useHooks = false)
```js
/**!
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
        <svg role="img" aria-hidden={decorative} aria-labelledby={uid} height="100%" width="100%" viewBox="0 0 24 24">
          <title id={uid}>{title}</title>
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm2.3-4.7H16L12.9 8h-1.7L8 15.3h1.7l.6-1.4h3.4l.6 1.4zm-3.5-2.7L12 9.7l1.2 2.8h-2.4v.1z"
          />
        </svg>
      </div>
    )}
  </UID>
);

export default AutomaticIcon;
```

#### Output (useHooks = true)
```js
/**!
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
```
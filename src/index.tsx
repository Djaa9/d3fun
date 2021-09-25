import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph';
import { NivoGraph } from './NivoGraph';
import { css } from '@emotion/css';

const divStyle = css({
  height: 500,
  width: 500
});

ReactDOM.render(
  <React.StrictMode>
    <div className={divStyle}>
      <NivoGraph />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
/** @jsxRuntime classic */
/** @jsx patchedCreateElement */
import {patchCreateElement} from '@lit-labs/ssr-react';
import React from 'react';
import type {NextPage} from 'next';
import '../src/simple-greeter.ts';

const patchedCreateElement = patchCreateElement(React.createElement);

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <simple-greeter></simple-greeter>
      </main>
    </div>
  );
};

export default Home;

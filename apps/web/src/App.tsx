import { children } from "solid-js";
import { ApplicationLayout } from './components/layout'
import type { Component, ParentProps } from 'solid-js';
import './themes/theme-spotify.css'
import './core/audio/controller'

const App: Component<ParentProps> = (props) => {
  const resolved = children(() => props.children)
  return (
    <ApplicationLayout>
      {resolved()}
    </ApplicationLayout>
  );
};

export default App;

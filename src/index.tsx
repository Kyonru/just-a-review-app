import React, {Component} from 'react';
import App from 'src/main';
import {Provider as PaperProvider} from 'react-native-paper';

export default class GlobalAppComponent extends Component {
  render() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }
}

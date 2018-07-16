import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import reducer from 'src/reducers/reducer';
import App from './components/App/App';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    render(App);
  });
}

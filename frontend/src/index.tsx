import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from './store';
import { initialState } from "./reducers";
import AppConnected from "./containers/AppConnected";

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <AppConnected />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
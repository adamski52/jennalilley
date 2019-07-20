import { combineReducers } from 'redux';
import GlobalHandler from './GlobalHandler';
import HomePageHandler from './HomePageHandler';

export default combineReducers({
    global: GlobalHandler.REDUCER,
    home: HomePageHandler.REDUCER
});
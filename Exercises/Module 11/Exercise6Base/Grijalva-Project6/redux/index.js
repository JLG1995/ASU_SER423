import { combineReducers, createStore } from 'redux';

import {
    fetchPhotos,
    addPhoto,
    removePhoto,
} from './photos/actions';

import photos from './photos/reducers';
const reducers = combineReducers({
    photos,
});
const store = createStore(reducers);
export default store;

// Saving the stringified state
const unsubscribe = store.subscribe(() => {
    store.currentStateStr = JSON.stringify(store.getState(), null, 2);
    console.log(store.currentStateStr);
});

// store.dispatch(fetchPhotos());

/*
store.dispatch(addPhoto({
    "albumId": 2,
    "title": "dolore esse a in eos sed",
    "url": `http://placehold.it/600/`,
    "thumbnailUrl": `http://placehold.it/150/`
}));

store.dispatch(removePhoto({ id: 1 }));

unsubscribe();
*/
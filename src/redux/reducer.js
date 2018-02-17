import * as constants from './AppConstants';

export default function(store = constants.initialState, action) {
    switch (action.type) {
        case constants.ADD_RESUME_ITEMS:
            return {
                ...store,
                resumeItems: store.resumeItems.concat(...action.resumeItems),
            };
        default:
            return store
    }
}
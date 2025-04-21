export default function (state = [], action) {
    switch (action.type) {
        case "FETCH_SERVICE_CATEGORIES":
            return action.payload || false;
        default:
            return state;
    }
}
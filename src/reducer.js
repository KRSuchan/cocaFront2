// reducer.js
import moment from 'moment';

const initialState = {
    date: moment(),
    selectedGroup: {groupId : -1},
    groups: [
        { groupId: -1, groupName: '내 캘린더', isAdmin: false }
    ] // 초기 더미 데이터
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DATE':
            return { ...state, date: action.payload };
        case 'SET_GROUPS':
            const defaultGroup = { groupId: -1, groupName: '내 캘린더', isAdmin: false };
            const groupsWithDefault = [defaultGroup, ...action.payload];
            return { ...state, groups: groupsWithDefault };
        case 'SELECT_GROUP':
            return { ...state, selectedGroup: action.payload };
        default:
            return state;
    }
};

export default reducer;

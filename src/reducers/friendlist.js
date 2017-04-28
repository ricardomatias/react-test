import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';
import { convertListToPages } from '../utils';

const initialState = {
  currentPage: 1,
  friends: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  friendsById: {
    1: {
      id: 1,
      name: 'Theodore Roosevelt',
      sex: 'M',
      starred: true
    },
    2: {
      id: 2,
      name: 'Abraham Lincoln',
      sex: 'M',
      starred: false
    },
    3: {
      id: 3,
      name: 'George Washington',
      sex: 'M',
      starred: false
    },
    4: {
      id: 4,
      name: 'George W. Bush',
      sex: 'M',
      starred: false
    },
    5: {
      id: 5,
      name: 'Donald Trump',
      sex: 'M',
      starred: false
    },
    6: {
      id: 6,
      name: 'Ronald Reagan',
      sex: 'M',
      starred: false
    },
    7: {
      id: 7,
      name: 'John F. Kennedy',
      sex: 'M',
      starred: false
    },
    8: {
      id: 8,
      name: 'Barack Obama',
      sex: 'M',
      starred: false
    }
  }
};

export default function friends(state = initialState, action) {
  switch (action.type) {

    case types.ADD_FRIEND:
      const newId = state.friends[state.friends.length-1] + 1;

      const newState = {
        ...state,
        friends: state.friends.concat(newId),
        friendsById: {
          ...state.friendsById,
          [newId]: {
            id: newId,
            name: action.name,
            starred: false,
            sex: 'M'
          }
        }
      };

      return {
        ...newState,
        currentPage: convertListToPages(newState.friends).length
      }

    case types.DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter(id => id !== action.id),
        friendsById: omit(state.friendsById, action.id)
      }

    case types.STAR_FRIEND:
      return {
        ...state,
        friendsById: mapValues(state.friendsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { starred: !friend.starred }) :
            friend
        })
      }
    case types.SELECT_SEX:
      return {
        ...state,
        friendsById: mapValues(state.friendsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { sex: action.sex }) :
            friend
        })
      }
    case types.SELECT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }

    default:
      return state;
  }
}

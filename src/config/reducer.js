import uuid from 'react-native-uuid';
import {
  ADD_TOKEN,
  DELETE_TOKEN,
  LOGOUT,
  RESET_TOKENS,
  SET_CALL_TO_ACTION_DISMISSED,
  SET_DEFAULT_TOKEN,
  SET_NETWORK,
  SET_CURRENCY,
  SET_PIN_CODE,
  SET_PRIVATE_KEY,
  SET_WALLET_ADDRESS,
  SET_CURRENT_ROUTE,
  IS_KEY_EXPORTED,
} from './actionTypes';
import { defaultTokens, currencyList } from '../utils/constants';
import AnalyticsUtils from '../utils/analytics';

const defaultState = {
  availableTokens: defaultTokens,
  callToActionDismissed: false,
  selectedToken: defaultTokens[0],
  network: 'mainnet',
  currentCurrency: 'USD',
  currencyList: currencyList,
  currentRoute: 'Wallet',
  isKeyExported: false,
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      AnalyticsUtils.trackEvent('Add custom token', {
        contractAddress: action.token.contractAddress,
        decimals: action.token.decimals,
        name: action.token.name,
        symbol: action.token.symbol,
      });

      return {
        ...state,
        availableTokens: state.availableTokens.concat([
          Object.assign(
            action.token,
            { id: uuid.v4() },
            action.token.name === 'ELTCOIN'
              ? {
                  symbol: 'ELT',
                }
              : {},
          ),
        ]),
      };
    case DELETE_TOKEN:
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.id !== action.token.id,
        ),
        selectedToken: state.availableTokens[0],
      };
    case RESET_TOKENS:
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.name === 'XDC',
        ),
        selectedToken: state.availableTokens.filter(
          token => token.name === 'XDC',
        )[0],
      };
    case SET_CALL_TO_ACTION_DISMISSED:
      return {
        ...state,
        callToActionDismissed: true,
      };
    case IS_KEY_EXPORTED:
      return {
        ...state,
        isKeyExported: true,
      };
    case SET_DEFAULT_TOKEN:
      return {
        ...state,
        selectedToken: action.token,
      };
    case SET_NETWORK:
      AnalyticsUtils.trackEvent('Set network', {
        network: action.network,
      });

      return {
        ...state,
        network: action.network,
      };
    case SET_CURRENCY:
      return {
        ...state,
        currentCurrency: action.currency,
      };
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode,
      };
    case SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.privateKey,
      };
    case SET_CURRENT_ROUTE:
      return {
        ...state,
        currentRoute: action.route
      }
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    case "persist/REHYDRATE":
      if(action.payload) {
        if(action.payload.availableTokens) {
          const defaultTokensLength = defaultTokens.length;
          const payloadTokensLength = action.payload.availableTokens.length;
          for(i = 0; i < defaultTokensLength; i++) {
            action.payload.availableTokens[i] = defaultTokens[i];
          }
        }
      }

      return state;
    default:
      return state;
  }
};

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  
  return appReducer(state, action);
};

export { defaultState, rootReducer };

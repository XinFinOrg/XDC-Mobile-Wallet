import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isSignUp: false,
    error: "",
    data: "",
    loading: false,
}

const signupStart = (state, action) => {
    return {
        ...state,
        isSignUp: true,
        error: "",
        loading: true
    }
}

const signupSuccess = (state, action) => {
    return {
        ...state,
        isSignUp: true,
        error: "",
        data: action.signupData.data.message,
        loading: false
    }
}

const signupFail = (state, action) => {
    console.log('signupfail:::', action);
    return {
        ...state,
        isSignUp: false,
        error: action.error.message,
        loading: true
    }
}

const signupFinish = (state, action) => {
    console.log('signupFinish:::', action);
    return {
        ...state,
        data: "",
        error: "",
        loading: true
    }
}

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.SIGNUP_FINISH: return signupFinish(state, action);
        default:
            return {
                ...state,
                isSignUp: false
            }
    }
}

export default signUpReducer;
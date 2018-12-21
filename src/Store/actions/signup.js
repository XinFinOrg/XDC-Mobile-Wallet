import * as actionTypes from './actionTypes';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (signupData) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        signupData: signupData
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const signupFinish = () => {
    return {
        type: actionTypes.SIGNUP_FINISH
    };
};

export const signup = (formData) => {
    return dispatch => {
        dispatch(signupStart());
        dispatch(signupSuccess());
        dispatch(signupFail());
        dispatch(signupFinish());
    };
};
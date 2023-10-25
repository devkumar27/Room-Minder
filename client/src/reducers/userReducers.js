const login = (state) => {
    state.isLogin = true;
}

const logout = (state) => {
    state.isLogin = false;
}

export {
    login,
    logout
};
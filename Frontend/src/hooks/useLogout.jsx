import useAuthContext from "./useAuthContext"
// import useQuizzesContext from "./useQuizzesContext"

const useLogout = () => {
    const { dispatch } = useAuthContext()
    // const { dispatch: quizzesContext } = useQuizzesContext()

    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem("user")

        // dispatch logout action
        dispatch({type: "LOGOUT"})
        // quizzesContext({type: "SET_QUIZZES", payload: null})
    }
    
    return {logout}
}

export default useLogout
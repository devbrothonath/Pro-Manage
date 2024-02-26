import useAuthContext from "./useAuthContext"
import useTasksContext from "./useTasksContext"

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: tasksDispatch } = useTasksContext()

    const logout = () => {
        // remove user from localStorage
        localStorage.removeItem("user")

        // dispatch logout action
        dispatch({type: "LOGOUT"})
        tasksDispatch({type: "SET_TASKS", payload: null})
    }
    
    return {logout}
}

export default useLogout
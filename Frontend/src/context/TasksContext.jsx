import React, { createContext, useReducer } from "react";

export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        // ...state,
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload._id),
      };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks
          ? state.tasks.map((task) =>
              task._id === action.payload._id ? action.payload : task
            )
          : [action.payload],
      };
    // case "SET_BOARDS":
    //   return {
    //     // ...state,
    //     boards: action.payload,
    //   };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
    // boards: null,
  });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};

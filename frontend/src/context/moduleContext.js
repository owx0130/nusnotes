import { createContext, useReducer } from "react";

export const ModuleContext = createContext();

export const modulesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MODULES":
      return {
        ...state,
        modules: action.payload,
      };
    case "SET_MODULE":
      return {
        ...state,
        module: action.payload,
      };
    case "CREATE_MODULE":
      return {
        modules: [...state.modules, action.payload],
      };
    case "DELETE_MODULE":
      return {
        modules: state.modules.filter(
          (module) => module._id !== action.payload._id
        ),
      };
    case "UPDATE_MODULE":
      const updatedmodules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return {
            ...module,
            users: [...module.users, action.payload.user],
          };
        }
        return module;
      });
      return {
        modules: updatedmodules,
      };
  }
};

export const ModulesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modulesReducer, {
    modules: null,
  });

  return (
    <ModuleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModuleContext.Provider>
  );
};
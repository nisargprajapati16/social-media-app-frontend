import { useReducer } from "react";
import { createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    localStorage.setItem("jwtToken", data.token);
    dispatch({ type: "LOGIN", payload: data });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user: state?.user }}
      {...props}
    />
  );
};

export { AuthProvider, AuthContext };

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "./axiosInstance";
import { notification } from "antd";

interface User {
  id: string;
  name: string;
  email: string;
}

interface loginPayload {
  email: string;
  password: string;
}

interface signUpPayload {
  name: string;
  email: string;
  password: string;
}

interface postMessagePayload {
  message: string;
}
interface AppContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: loginPayload) => Promise<void>;
  signup: (payload: signUpPayload) => Promise<void>;
  logOut: () => Promise<void>;
  strangers: object | null | unknown[];
  allUsers: () => void;
  postMessage: (payload, userId) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

const getUserAuthStatus = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get("/auth/check-auth");
    return response.data; // Assuming the response contains a user object
  } catch (error) {
    console.error("User authentication failed:", error);
    return null;
  }
};

const AppContextProvider: React.FC<AppContextProviderProps> = React.memo(
  ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [strangers, setStrangers] = useState<object | null>(null);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
      const checkAuth = async () => {
        setIsLoading(true);
        const authenticatedUser = await getUserAuthStatus();
        if (authenticatedUser) {
          setIsAuthenticated(true);
          setUser(authenticatedUser);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, []);

    const login = async (payload: loginPayload) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/auth/login", payload);
        notification.success({
          message: "Login Successful",
          description:
            response.data.message || "You have successfully signed in!",
        });
        setUser(response.data);
        setIsLoading(false);
        setIsAuthenticated(true);
      } catch (error) {
        notification.error({
          message: "Login Failed",
          description:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
        console.error(`Error submitting login from ${error}`);
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    const signUp = async (payload: signUpPayload) => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/auth/signup", payload);
        notification.success({
          message: "Sign Up Successful",
          description:
            response.data.message || "You have successfully signed up!",
        });
        setIsAuthenticated(false); //since user has to verify the email and again will be pushed to login screen
        setIsLoading(false);
      } catch (error) {
        notification.error({
          message: "Sign Up Failed",
          description:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
        console.error("Error signing up the user " + error);
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    };

    const logOut = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/auth/logout");
        notification.success({
          description: response.data.message || "logout successful",
        });
        setIsAuthenticated(false);
        setIsLoading(false);
      } catch (error) {
        notification.error({
          description: "Error logging out.",
        });
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };

    const allUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/message/users");
        const allStrangers = response.data;
        setStrangers(allStrangers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          description: "Error getting all users.",
        });
        console.error(`error getting all users ${error}`);
      }
    };

    const postMessage = async (payload, userToSend) => {
      try {
        const response = await axiosInstance.post(
          `/message/send/${userToSend}`,
          payload
        );
        // setConversation(response.data);
      } catch (error) {
        console.error(`Error sending message ${error}`);
      }
    };

    const getConversation = async (userToSend) => {
      try {
        const response = await axiosInstance.get(`/message/${userToSend}`);
        setConversation(response.data);
      } catch (error) {
        console.error(`Error getting the conversation ${error}`);
      }
    };

    const contextValue: AppContextValue = {
      user,
      isLoading,
      isAuthenticated,
      login,
      signUp,
      logOut,
      strangers,
      allUsers,
      postMessage,
      conversation,
      getConversation,
    };

    return (
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
  }
);

export default AppContextProvider;

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "AppContext is undefined. Ensure you are wrapping your component tree with AppContextProvider."
    );
  }
  return context;
};

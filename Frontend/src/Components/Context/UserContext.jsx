import React, { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  const fetchUser = useCallback(async () => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ token }),
    });

    const resUser = await res.json();

    if (res.ok) {
      setUser(resUser);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

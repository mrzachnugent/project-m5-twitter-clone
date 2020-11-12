import React, { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const dummyProfileHandle = "treasurymog";
  const [currentUser, setCurrentUser] = useState({});
  const [loadingStatus, setLoadingStatus] = useState("loading");
  useEffect(() => {
    fetch(`/api/${dummyProfileHandle}/profile`)
      .then((res) => res.json())
      .then((json) => setCurrentUser(json.profile))
      .then(() => setLoadingStatus("loaded"))
      .catch((err) => setLoadingStatus("error"));
  }, []);

  console.log("status: " + loadingStatus);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, loadingStatus, setLoadingStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

import { Switch, Route } from "react-router-dom";
import HomeFeed from "./Components/HomeFeed/HomeFeed";
import Notifications from "./Components/Notifications/Notifications";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
import TweetDetails from "./Components/Tweets/TweetDetails";
import Profile from "./Components/Profile/Profile";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Components/Sidebar";
import styled from "styled-components";
import React, { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Viewport>
      <GlobalStyles />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomeFeed isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route path="/tweet/:tweetId">
          <TweetDetails
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Route>
        <Route path="/:profileId">
          <Profile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Route>
      </Switch>
    </Viewport>
  );
}

const Viewport = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1400px;
`;

export default App;

import { Switch, Route } from "react-router-dom";
import HomeFeed from "./Components/HomeFeed/HomeFeed";
import Notifications from "./Components/Notifications/Notifications";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
import TweetDetails from "./Components/Tweets/TweetDetails";
import Profile from "./Components/Profile/Profile";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Components/Sidebar";
import styled from "styled-components";

function App() {
  return (
    <Viewport>
      <GlobalStyles />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <HomeFeed />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
        <Route path="/tweet/:tweetId">
          <TweetDetails />
        </Route>
        <Route path="/:profileId">
          <Profile />
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

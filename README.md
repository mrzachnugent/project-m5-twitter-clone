# Critter - Twitter clone

Social network/"micro-blogging" platform. 

---

## Functionality


### View a single tweet

![Single tweet view](./assets/screenshots/single-tweet-view.png)

When the user navigates to `/tweet/:tweetId`, they see the details for the specified tweet.

### View a "home feed"

When navigating to the root URL `/`, the user sees a list of tweets from the accounts that the current user follows.

![Home feed view](./assets/screenshots/index-view.gif)

### View a profile page

When navigating to `/:profileId`, information about that user is displayed, above a list of that user's tweets (and retweets):

![Home feed view](./assets/screenshots/profile-view.png)

### Liking a tweet

When clicking the "like" button, it increments the # of likes. Clicking again will "unlike" the tweet.

![liking tweets](./assets/screenshots/like-tweet.gif)

### Posting a new tweet

On the homepage, the user is able to create a new tweet by writing in the box and clicking "Meow":

![Posting a new tweet](./assets/screenshots/post-tweet.gif)

It shows up in the feed below after posting.

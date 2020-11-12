import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../CurrentUserContext";
import { useParams } from "react-router-dom";
import { PageWrapper, PrimaryButton } from "../../GlobalStyles";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import styled from "styled-components";
import moment from "moment";
import TweetOverview from "../Tweets/TweetOverview";
import { LoadingSpinnner } from "../LoadingSpinner";
import { ErrorSection } from "../ErrorSection";
import { COLORS } from "../../constants";

const Profile = () => {
  const [twitterProfile, setTwitterProfile] = useState({});
  const [tabSelected, setTabSelected] = useState("tweets");
  const { profileId } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const { handle } = currentUser;
  const [profileLoadingStatus, setProfileLoadingStatus] = useState("loading");
  const [loadingStatus, setLoadingStatus] = useState("loading");

  const [feedTweetIDs, setFeedTweetIDs] = useState([]);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((json) => setTwitterProfile(json.profile))
      .then(() => setProfileLoadingStatus("loaded"))
      .catch(() => setProfileLoadingStatus("error"));

    return () => setProfileLoadingStatus("loading");
  }, []);

  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((json) => json.tweetIds)
      .then((ids) => setFeedTweetIDs(ids))
      .then(() => setLoadingStatus("loaded"))
      .catch(() => setLoadingStatus("error"));

    return () => setLoadingStatus("loading");
  }, []);

  return (
    <PageWrapper>
      {profileLoadingStatus === "loading" && <LoadingSpinnner />}
      {profileLoadingStatus === "loaded" && (
        <>
          <BannerImage
            src={twitterProfile.bannerSrc}
            alt={`${twitterProfile.handle}'s banner`}
          />
          <AvatarAndFollow>
            <AvatarImage
              src={twitterProfile.avatarSrc}
              alt={`${twitterProfile.handle}'s avatar`}
            />
            {profileId !== handle && (
              <FollowButton>
                {twitterProfile.isBeingFollowedByYou && <span>Following</span>}
                {!twitterProfile.isBeingFollowedByYou && <span>Follow</span>}
              </FollowButton>
            )}
          </AvatarAndFollow>
          <InfoSection>
            <DisplayNameText>{twitterProfile.displayName}</DisplayNameText>
            <HandleAndIsFollowing>
              @{twitterProfile.handle}
              {twitterProfile.isFollowingYou && <span>Follows you</span>}
            </HandleAndIsFollowing>
            <BioText>{twitterProfile.bio}</BioText>
            <LocationAndJoined>
              {twitterProfile.location && (
                <IconAndText>
                  <FiMapPin />
                  <SpecsText>{twitterProfile.location}</SpecsText>
                </IconAndText>
              )}
              <IconAndText>
                <FiCalendar />
                <SpecsText>
                  Joined{" "}
                  {moment(new Date(twitterProfile.joined)).format("MMMM YYYY")}
                </SpecsText>
              </IconAndText>
            </LocationAndJoined>
            <FollowContainer>
              <div>
                <FollowText>
                  <span>{twitterProfile.numFollowing}</span> Following
                </FollowText>
              </div>
              <div>
                <FollowText>
                  <span>{twitterProfile.numFollowers}</span> Followers
                </FollowText>
              </div>
            </FollowContainer>
          </InfoSection>
          <TabsContainer>
            <TabBox className="selected" tabIndex="0">
              <p>Tweets</p>
            </TabBox>
            <TabBox tabIndex="0">
              <p>Media</p>
            </TabBox>
            <TabBox tabIndex="0">
              <p>Likes</p>
            </TabBox>
          </TabsContainer>
        </>
      )}
      {loadingStatus === "loading" && <LoadingSpinnner />}
      {loadingStatus === "loaded" && (
        <>
          {feedTweetIDs.map((id) => (
            <TweetOverview tweetId={id} key={id} />
          ))}
        </>
      )}
    </PageWrapper>
  );
};

const BannerImage = styled.img`
  width: 100%;
  min-height: 100px;
`;

const AvatarAndFollow = styled.div`
  height: 75px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  position: absolute;
  height: 150px;
  width: 150px;
  top: -75px;
  left: 15px;
  border: 3px solid #fff;
`;

const FollowButton = styled(PrimaryButton)`
  margin-right: 15px;
`;

const InfoSection = styled.div`
  padding: 15px;
`;

const DisplayNameText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const HandleAndIsFollowing = styled.p`
  padding: 5px 0 22px 0;
  color: #666;
  font-size: 14px;

  span {
    background: #e6e6e6;
    border-radius: 7px;
    padding: 4px;
    margin-left: 10px;
  }
`;

const BioText = styled.p`
  font-weight: 500;
`;

const LocationAndJoined = styled.div`
  display: flex;
  padding: 15px 0;
`;

const IconAndText = styled.div`
  display: flex;
  color: #666;
  padding-right: 15px;
`;

const SpecsText = styled.p`
  padding: 0 7px;
`;

const FollowContainer = styled.div`
  display: flex;
`;

const FollowText = styled.p`
  padding-right: 25px;
  span {
    font-weight: 700;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .selected {
    border-bottom: 2px solid ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const TabBox = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
  padding: 20px 0;
  cursor: pointer;

  &:focus {
    outline-color: ${COLORS.focused};
  }
`;
export default Profile;

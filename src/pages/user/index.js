import styled from "styled-components";
import HeaderWithSearch from "../../components/HeaderWithSearch";
import { useParams } from "react-router-dom";
import UserPost from "../../components/UserPost";
import api from "../../services/api";
import Trending from "../../components/Trending";
import TooltipLikes from "../../components/TooltipLikes.js";
import InfiniteScroll from "react-infinite-scroller";
import LoadingSkeleton from "../../components/LoadingSkeleton.js";
import useGetPostsData from "../../hooks/useGetPostsData.js";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext.js";
import { useState } from "react";
import { useEffect } from "react";

export default function UserPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const {
    getUserAndPostsData,
    postsData,
    page,
    loadMore,
    setPostsData,
  } = useGetPostsData(api.getPostsByUserId, id);

  const [follow, setFollow] = useState(false)
  const [followers, setFollowers] = useState([])
  const [disabled, setDisabled] = useState(false)

  function followUser() {
    setDisabled("disabled")
    if (follow === false) {
      const body = { followId: id }
      api
        .followUser(token, body)
        .then(() => {
          setFollow(true)
          setDisabled(false)
        })
        .catch(() => {
          alert("Algo deu errado, por favor recarregue a pagina")
          setDisabled(false)
        })
    } else {
      const body = { followId: id }
      api
        .unfollowUser(token, body)
        .then(() => {
          setFollow(false)
          setDisabled(false)
        })
        .catch(() => {
          alert("Algo deu errado, por favor recarregue a pagina")
          setDisabled(false)
        })
    }
  }

  useEffect(() => {
    api
      .followers(token)
      .then(res => {
        setFollowers(res.data)
      })
      .catch(() => console.log("Deu errado"))
    getUserAndPostsData();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    for (let i = 0; i < followers.length; i++) {
      if (followers[i].followUserId === id) {
        setFollow(true)
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followers])

  return (
    <PageContainer>
      <HeaderWithSearch />
      <main>
        <Header follow={follow}>
        <Title>
          <img src={postsData && postsData.user.image} alt="userImage"></img>
          {postsData && postsData.user.username}'s posts
        </Title>
          {postsData && !postsData.isMe && <button disabled={disabled} onClick={followUser} >{follow ? "Unfollow" : "Follow"}</button>}
        </Header>
        <MainContainer>
          <Container>
            {!postsData && <LoadingSkeleton />}
            {
              postsData && (
                <InfiniteScroll
                  pageStart={page}
                  loadMore={() =>
                    getUserAndPostsData(postsData.posts[0].post.id, page)
                  }
                  hasMore={loadMore}
                  loader={<LoadingSkeleton />}
                >
                  {postsData.posts.map((postData, index) => (
                    <UserPost
                      postInfo={postData}
                      key={index}
                      updatePostData={getUserAndPostsData}
                      postsData={postsData}
                      setPostsData={setPostsData}
                    />
                  ))}
                </InfiniteScroll>
              )
            }

            <TooltipLikes />
          </Container>
          <Trending />
        </MainContainer>
      </main>
    </PageContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 25px;
  @media (max-width: 950px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 50vw;
  max-width: 611px;
  margin: 0px auto;
  @media (max-width: 950px) {
    width: 100%;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 950px) {
    main {
      width: 100%;
    }
  }
`;

const Title = styled.div`
  display: flex;
  margin-top: 135px;
  margin-bottom: 41px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  img {
    margin-left: 20px;
    margin-right: 20px;
    width: 53px;
    height: 53px;
    border-radius: 53px;
    object-fit: cover;
  }
  @media (max-width: 950px) {
    padding-left: 17px;
  }
  @media (max-width: 611px) {
    margin-top: 90px;
    font-size: 33px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  button{
    width: 112px;
    height: 31px;
    background: ${props => props.follow ? "#ffffff" : "#1877F2"};
    border-radius: 5px;
    color: ${props => props.follow ? "#1877F2" : "#ffffff"};
    outline: 0;
    border: 0;
    cursor: pointer;
    margin-bottom: 50px;
  }
`
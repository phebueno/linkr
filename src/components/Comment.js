import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

export default function Comment({ data }) {

    const [autho, setAutho] = useState("")

    useEffect(() => {
        if (data.id === data.userId) {
            return setAutho("•   post's author")
        }
        if(data.follow === true){
            setAutho("•   following")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CommentContainer>
            <img src={data.image} alt="user-comment"></img>
            <Description>
                <Title>{data.username}<span>{autho}</span></Title>
                <CommentText>{data.comment}</CommentText>
            </Description>
        </CommentContainer>
    )
}

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    width: 92%;
    height: auto;
    border-top:1px solid #353535;
    border-bottom: 1px solid #353535;
    margin-left: 25px;
    margin-right: 18px;
    padding-bottom: 18px;
    padding-top: 22px;
    img{
        width: 39px;
        height: 39px;
        border-radius: 39px;
        object-fit: cover;
        margin-right: 18px;
    }
`

const Description = styled.div`
    font-family: 'Lato',sans-serif;
    font-style: normal;
    font-size:14px;
    line-height: 17px;
`
const Title = styled.p`
    color: #F3F3F3;
    font-weight: 700;
    margin-bottom: 3px;
    span{
        color: #565656;
        margin-left: 4px;
    }
`

const CommentText = styled.p`
    color: #ACACAC;
    font-weight: 400;
`
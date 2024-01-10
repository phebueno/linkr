import { useState } from "react";
import api from "../services/api";
import styled from "styled-components";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { SlPaperPlane } from "react-icons/sl"

export default function AddComment({ postId,showComments, postData, setPostData }) {

    const { token, userAuthData } = useContext(AuthContext);
    const [comment, setComment] = useState("")

    function sendComment(e) {
        e.preventDefault()
        const body ={
            comment:comment
        }
        api.addComment(token,body,postId)
            .then((res)=>{
                showComments();
                setPostData({...postData, comments: Number(postData.comments)+1})
            })
            .catch((err)=>{
                alert("Todos os campos são obrigatórios")
            })        
    }

    return (
        <AddCommentContainer>
            <img src={userAuthData.img} alt="user"></img>
            <div>
                <div>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="write a comment..."></input>
                    <SlPaperPlane onClick={(e) => sendComment(e)}>
                    </SlPaperPlane>
                </div>
            </div>

        </AddCommentContainer>
    )
}

const AddCommentContainer = styled.div`
    display: flex;
    align-items: center;
    svg{
        cursor: pointer;
        color: #f3f3f3;
        height: 15px;
        width: 15px;
    }
    div{
        display: flex;
        align-items: center;
        width: 100%;
        background: #252525;
        border-radius: 8px;
        margin-right: 23px;
    }
    img{
        width: 39px;
        height: 39px;
        border-radius: 39px;
        object-fit: cover;
        margin-left: 25px;
        margin-top: 19px;
        margin-bottom: 25px;
        margin-right: 14px;
    }
    input{
        width: 100%;
        height: 39px;
        border-radius: 8px;
        background-color: #252525;
        border: none;
        font-family: 'Lato',sans-serif;
        font-style: italic;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.05em;
        color: #575757;
        padding-left: 15px;
    }
    input::placeholder{
        color: #575757;
    }
    input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
`
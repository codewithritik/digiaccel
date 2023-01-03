import styled from "styled-components";

export const Contanier = styled.div`
 width:100%;
    min-height:100vh;
    background: #F8FAFB;
    color:black;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding:20px 0px; 


     .model-div{
        text-align:left;
        min-width:500px;
        max-width:700px;
        padding:20px;
        background-color:white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        min-height:60vh;
    }

    .onerror{
        height:auto
        background-color:#F8FAFB !important;
        color:black;
        font-weight:400;

        img{
            width:300px;
            height:300px;
        }

    }



`
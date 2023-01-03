import styled from "styled-components";

export const Contanier = styled.div`

   width:100%;
    min-height:100vh;
    background: #F8FAFB;
    color: ${props => props.primary ? "white" : "black"};
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding:20px 0px; 

 .model-div{
        text-align:center;
        min-width:500px;
        max-width:700px;
        padding:20px;
        background-color:white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        min-height:70vh;
    }


    .linkDiv{
        margin-top:20px;
        display:flex;
        padding:0px 10px;
         box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
         justify-content:space-between;
         align-items:center;
         border-radius:5px;
        
         .completbtn{
            border-radius:5px;
            background-color:#9a94fc;

            &:hover{
                 background-color:#cac7fc;
            }
         }
    }


`;
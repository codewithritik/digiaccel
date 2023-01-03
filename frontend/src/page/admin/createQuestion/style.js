import styled from "styled-components";


export const QuestionCont = styled.div`

    width:100%;
    min-height:100vh;
    background: #F8FAFB;
    color:white;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding:20px 0px; 

    


    .model-div{
        min-width:500px;
        max-width:700px;
        padding:20px;
        background-color:white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        color:black;
    }



     @media only screen and (max-width: 600px){
         padding:0px 0px; 
             
         .model-div{

            width:100%;
            padding:20px;
            background-color:white;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;


                }

    }


`
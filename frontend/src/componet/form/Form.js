import styled from "styled-components";


export const SignupCont = styled.div`
    width:100%;
    height:100vh;
    background: #F8FAFB;
    color: black;
    display:flex;




    .LeftContanier{
        width:60%;
        padding:10%;
        img{
            max-width:100%;
            margin:auto;
           object-fit: cover;
        }
    }

    .RightContanier{
         width:40%;
   
        display: flex;
         flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;


        &>div{
           width:90%;
         
        }
        .formdiv{
            margin-top:20px;
        }





    }

       @media only screen and (max-width: 768px){
             .LeftContanier{
                width:0%;
                display:none;
             }
             
        .RightContanier{
            width:90%;
            margin:auto;

        }

        }




`;

export const LoginBtn = styled.button`

  background:  #6C63FF;
  color:  white;
  font-size: 20px;
  padding: 0.25em 1em;
  border: 0px solid palevioletred;
  border-radius: 10px;
  width:100%;
  margin-top:20px;

  &:hover{
    background:  #a9a5f7;
    color:black;
  }

`
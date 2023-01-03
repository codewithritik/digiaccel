import axios from 'axios';
import { FalierToaster, SuccessToaster } from '../componet/Toster/toster';




// for admin regration
export const AdminAction = {
    adminLoading:"admindetilsLoading",
    adminSucess:"admindetilssucess",
    adminError:"admindetilsLoadingerror"
}

export const adminLoading = (data) => {
    return {
        type: AdminAction.adminLoading,
        payload: data
    };
    
}

export const adminSucess = (data) => {
    return {
        type: AdminAction.adminSucess,
        payload:data
    };
    
}

export const adminError = (data) => {
    return {
        type: AdminAction.adminError,
         payload:data
    };
    
}



export const AdminRegistration = (formValue, setCookie, navigate) => (dispatch) => {
  
    dispatch(adminLoading(true));

    axios.post(`${process.env.REACT_APP_BASEURL}admin/register`, formValue)
        .then((res) => {
            const auth_token = res?.data?.data?.auth_token
            // console.log(res?.data?.data?.auth_token)
            setCookie("auth_token", auth_token, { path: '/' })

            dispatch(adminSucess(res?.data?.data?.NewAdminDetails));

            // console.log("this is res", res?.data?.data?.UserIdDetails?.uniqueId)
            SuccessToaster(`Welcome Mr.${formValue.name}`)
            const uniqueId = res?.data?.data?.UserIdDetails?.uniqueId

            navigate(`/question/${uniqueId}/1`)
        })
        .catch((err) => {
   
            dispatch(adminError(err?.response?.data?.msg  || err.message));
            FalierToaster(`${err?.response?.data?.msg || err.message || "something went wrong"}`)
        });
  
    
}

export const AdminLoginFunction = (formValue, setCookie, navigate) => (dispatch) => {

    dispatch(adminLoading(true));

    axios.post(`${process.env.REACT_APP_BASEURL}admin/login`, formValue)
        .then((res) => {
            const data = res?.data?.data
            // console.log(res?.data?.data?.auth_token)
            setCookie("auth_token", data?.auth_token, { path: '/' })

            dispatch(adminSucess(data?.adminDetails));

            SuccessToaster(`Welcome Mr.${data?.adminDetails?.name}`)
            // const uniqueId = res?.data?.data?.UserIdDetails?.uniqueId

            navigate(`/allquizlink`)
        })
        .catch((err) => {

            dispatch(adminError(err?.response?.data?.msg || err.message));
            FalierToaster(`${err?.response?.data?.msg || err.message || "something went wrong"}`)
        });


}


export const GetAdminDetails = (config) => (dispatch) => {


    dispatch(adminLoading(true));

    

    axios.get(`${process.env.REACT_APP_BASEURL}admin/details`, config)
        .then((res) => {
  

            dispatch(adminSucess(res?.data?.data));

            // console.log("this is res", res?.data?.data?.UserIdDetails?.uniqueId)
            // SuccessToaster(`Welcome Mr.${formValue.name}`)
            // const uniqueId = res?.data?.data?.UserIdDetails?.uniqueId
        })
        .catch((err) => {

            console.log(err)
            dispatch(adminError(err?.response?.data?.msg || err.message));
            
        });


}




// for user regration
export const UserAction = {
    userLoading: "UserdetilsLoading",
    userSucess: "Userdetilssucess",
    userError: "UserdetilsLoadingerror",
    userMark: "usermarksatladt",
    questionDifficulty:"questionDifficultyxyz"
}

export const userLoading = (data) => {
    return {
        type: UserAction.userLoading,
        payload: data
    };

}

export const userSucess = (data) => {
    return {
        type: UserAction.userSucess,
        payload: data
    };

}

export const userError = (data) => {
    return {
        type: UserAction.userError,
        payload: data
    };

}



export const UserRegistration = (formValue, setCookie, navigate, uniqueId) => (dispatch) => {


    dispatch(userLoading(true));

    axios.post(`${process.env.REACT_APP_BASEURL}user/register`, formValue)
        .then((res) => {
            const user_token = res?.data?.data?.user_token
            // console.log(res?.data?.data?.user_token)
            setCookie("user_token", user_token, { path: '/' })

            dispatch(userSucess(res?.data?.data?.NewuserDetails));

            SuccessToaster(`Welcome Mr.${formValue.name}`)

            navigate(`/user/quiz/${uniqueId}`)
        
        })
        .catch((err) => {

            dispatch(userError(err?.response?.data?.msg || err.message));
            FalierToaster(`${err?.response?.data?.msg || err.message }`)
        });

}

export const UserLoginFuction = (formValue, setCookie, navigate, uniqueId) => (dispatch) => {


    dispatch(userLoading(true));

    axios.post(`${process.env.REACT_APP_BASEURL}user/login`, formValue)
        .then((res) => {
            const user_token = res?.data?.data?.user_token
            // console.log(res?.data?.data?.user_token)
            setCookie("user_token", user_token, { path: '/' })

            dispatch(userSucess(res?.data?.data?.userDetails));

            SuccessToaster(`Welcome Mr.${formValue.name}`)

            navigate(`/quiz/${uniqueId}`)

        })
        .catch((err) => {
            console.log(err?.response)

            dispatch(userError(err?.response?.data?.msg || err.message));
            FalierToaster(`${err?.response?.data?.msg || err.message}`)
        });

}




// for queside data
export const QuestionAction = {
    questionLoading: "QuestiondetilsLoading",
    questionSucess: "Questiondetilssucess",
    questionError: "QuestiondetilsLoadingerror"
}

export const questionLoading = (data) => {
    return {
        type: QuestionAction.questionLoading,
        payload: data
    };

}

export const questionSucess = (data) => {
    return {
        type: QuestionAction.questionSucess,
        payload: data
    };

}

export const questionError = (data) => {
    return {
        type: QuestionAction.questionError,
        payload: data
    };

}



export const GetQuizeData = (id, config, questionDifficulty) => (dispatch) => {


    dispatch(questionLoading(true));

    axios.get(`${process.env.REACT_APP_BASEURL}quiz/${id}`, config)
        .then((res) => {
          

            dispatch(questionSucess(res?.data?.data));
            // console.log("this is reds", res?.data )
        })
        .catch((err) => {

            dispatch(questionError(err?.response?.data?.msg || err.message));
    
        });


}


export const GetQuizeDataByAdminID = (config,) => (dispatch) => {


    dispatch(questionLoading(true));

    axios.get(`${process.env.REACT_APP_BASEURL}quiz/admin`, config)
        .then((res) => {


            dispatch(questionSucess(res?.data?.data));
        })
        .catch((err) => {

            dispatch(questionError(err?.response?.data?.msg || err.message));

        });


}



export const Usermarks = (data) => {
    return {
        type: UserAction.userMark,
        payload:data
    }
}

export const QuestionDifficultyAction = (data) => {
    return {
        type: UserAction.questionDifficulty,
        payload: data
    }
}
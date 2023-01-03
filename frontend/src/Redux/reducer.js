import { AdminAction, QuestionAction, UserAction } from "./action";

const initstate = {
  adminData: {
    onLoading: false,
    data: [],
    onError:false
  },

   userData: {
    onLoading: false,
    data: [],
    onError: false
  },
   
  quizeData: {
    onLoading: false,
    data: [],
    onError: false
  },

  userResult: 0,
  questionDifficulty:5
};




export const Reducer = (state = initstate, action) => {
  switch (action.type) {
    
    case (AdminAction.adminLoading): {
      return {
        ...state,
        adminData: {
          onLoading: action.payload,
          data: [],
          onError: false
        }
      }
    }
    case (AdminAction.adminSucess): {
      return {
        ...state,
        adminData: {
          onLoading: false,
          data: action.payload,
          onError: false
        }
      }
    }
    case (AdminAction.adminError): {
      return {
        ...state,
        adminData: {
          onLoading: false,
          data: [],
          onError: action.payload
        }
      }
    }
      

    case (UserAction.userLoading): {
      return {
        ...state,
        userData: {
          onLoading: action.payload,
          data: [],
          onError: false
        }
      }
    }
    case (UserAction.userSucess): {
      return {
        ...state,
        userData: {
          onLoading: false,
          data: action.payload,
          onError: false
        }
      }
    }
    case (UserAction.userError): {
      return {
        ...state,
        userData: {
          onLoading: false,
          data: [],
          onError: action.payload
        }
      }
    }
      
    case (QuestionAction.questionLoading): {
      return {
        ...state,
        quizeData: {
          onLoading: action.payload,
          data: [],
          onError: false
        }
      }
    }
    case (QuestionAction.questionSucess): {
      return {
        ...state,
        quizeData: {
          onLoading: false,
          data: action.payload,
          onError: false
        }
      }
    }
    case (QuestionAction.questionError): {
      return {
        ...state,
        quizeData: {
          onLoading: false,
          data: [],
          onError: action.payload
        }
      }
    }
    case (UserAction.userMark): {
      return {
        ...state,
        userResult: action.payload
      }
    }
    case (UserAction.questionDifficulty): {
      return {
        ...state,
        questionDifficulty: action.payload
      }
    }

      
    default:
      return state;
  }
};
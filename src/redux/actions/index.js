export const addSubmission = (submission) => {
    return {
        type: 'ADD_SUBMISSION',
        payload: submission
    }
}

export const getSubmissions = ()=>{
    return {
        type : 'GET_SUBMISSIONS'
    }
}

export const addFeedback=(feedback)=>{
    return{
        type:'ADD_FEEDBACK',
        payload: feedback
    }
}

export const getFeedbacks = () =>{
    return{
        type:'GET_FEEDBACKS'
    }
}
export const addSubmission = (submission) => {
    return {
        type: 'ADDSUBMISSION',
        payload: submission
    }
}

export const getSubmissions = ()=>{
    return {
        type : 'GETSUBMISSIONS'
    }
}
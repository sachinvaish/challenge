const initialFeedbacks = [
    {
        "submission_id": "63749eca6057278e2f24b74a",
        "user_id": "637473c9b93c78059660ccdc",
        "feedback": "This is nice DESIGN",
        "_id": "642f38b90378df8748e1",
        "date": "2022-12-10T02:27:31.674Z"
    },
    {
        "submission_id": "63749eca6057278e2f24b74a",
        "user_id": "637473c9b93c78059660ccdc",
        "feedback": "This is nice submission feedback",
        "_id": "639442f378b90352d8e1",
        "date": "2022-12-10T03:27:31.674Z"
    },
    {
        "submission_id": "63749ecr6057278e2f24b74a",
        "user_id": "637473c9b93c78059660ccdc",
        "feedback": "Amazing Design",
        "_id": "63442f378352df8748e1",
        "date": "2022-12-10T01:27:31.674Z"
    },
    {
        "submission_id": "63449ecr6057278e2f24b74a",
        "user_id": "637473c9b93c78059660ccdc",
        "feedback": "This is 4th Feedback",
        "_id": "639442f378b903f874e1",
        "date": "2022-12-10T11:27:31.674Z"
    }
];

export const handleFeedbacks=(state=initialFeedbacks, action)=>{
    switch(action.type){
        case 'ADD_FEEDBACK':{
            return [...state,{...state,...action.payload}];
        }
        case 'GET_FEEDBACKS' :{
            return state;
        }
        default : return state;
    }
}
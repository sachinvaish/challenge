import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const submissionApi = createApi({
    reducerPath: 'submissionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/'
    }),
    endpoints:(builder)=>({
        getPosts:builder.query({
            query:()=>({
                url:'posts',
                method:'GET'
            })
        }),
        createSubmission : builder.mutation({
            query : (newSubmission)=>{
                console.log(newSubmission);
                return{
                    url : 'submissions',
                    method : 'POST',
                    body : newSubmission,
                    headers : {
                        'Content-type':'application/json; charset=UTF-8'
                    }
                }
            }
        })
    })
})

export const {useCreateSubmissionMutation, useGetPostsQuery } = submissionApi;


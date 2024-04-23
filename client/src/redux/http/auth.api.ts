    import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

    export const authApi  = createApi({
        reducerPath:"authApi",
        baseQuery:fetchBaseQuery({
            baseUrl:"http://localhost:5000/api/user"
        }),

        endpoints: (builder) => ({
            loginUser: builder.mutation({
                query: (body: {email:string; password:string}) => {
                     return {
                         url: "/login",
                         method: "post",
                         body,
                     }
                }
            }),
            registerUser: builder.mutation({
                query: (body: {name:string; last_name:string; username:string; email:string; password:string}) => {
                    return {
                        url: "/registration",
                        method: "post",
                        body,
                    }
                }
            })
        })
        })


export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
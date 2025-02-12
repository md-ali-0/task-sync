import { TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/login",
                    body: data,
                    method: "POST",
                };
            },
        }),
        SignUpUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/register",
                    body: data,
                    method: "POST",
                };
            },
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: `/auth/profile`,
                };
            },
            transformResponse: (response: TResponseRedux<User>) => {
                return response.data;
            },
            providesTags: ["user"],
        }),
        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    url: `/auth/profile`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["user"],
        }),
        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/forgot-password",
                    body: data,
                    method: "POST",
                };
            },
        }),
        resetPassword: builder.mutation({
            query: ({ id, password, token }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: { id, password },
                headers: {
                    Authorization: token,
                },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignUpUserMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
} = authApi;

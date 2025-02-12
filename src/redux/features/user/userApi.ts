import { TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: `/users/`,
                };
            },
            transformResponse: (response: TResponseRedux<User[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/${data.id}`,
                    method: "PATCH",
                    body: data.data,
                };
            },
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = userApi;

import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql(`
query (
  $options: PageQueryOptions
) {
    posts(options: $options) {
        data {
            id
            title
            body
            user {
                username
                name
            }
        }
        meta {
            totalCount
        }
    }
}
`);

export const PostById = '';

export const UserPost = '';

export const CreatePost = '';

export const DELETE_POST = gql(`
mutation (
  $id: ID!
) {
  deletePost(id: $id)
}
`);

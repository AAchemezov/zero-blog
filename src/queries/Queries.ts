import { gql } from '@apollo/client';

export const NameParts = gql`
    fragment NameParts on User {
        username
        name
    }`;

export const GET_ALL_POSTS = gql`
query ($options: PageQueryOptions) {
    posts(options: $options) {
        data {
            id
            title
            body
            user {
                ...NameParts
            }
        }
        meta {
            totalCount
        }
    }
}
${NameParts}
`;

export const GET_POST = gql`
    query ($id: ID!) {
        post(id: $id) {
            id
            title
            body
            user {
                ...NameParts
            }
            comments {
                data {
                    id
                    body
                    name
                    email
                }
            }
        }
    }
    ${NameParts}
`;

export const GET_ALL_TODOS = gql`
    query ($options: PageQueryOptions) {
        todos(options: $options) {
            data {
                id
                title
                completed
                user {
                    ...NameParts
                }
            }
#            links {
#                first {
#                    limit
#                    page
#                }
#            }
            meta {
                totalCount
            }
        }
    }
    ${NameParts}
`;

export const PostById = '';

export const UserPost = '';

export const CreatePost = '';

export const DELETE_POST = gql`
mutation ($id: ID!) {
  deletePost(id: $id)
}
`;

export const DELETE_TODO = gql`
    mutation ($id: ID!) {
        deleteTodo(id: $id)
    }
`;

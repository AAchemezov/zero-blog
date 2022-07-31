import { gql } from '@apollo/client';

export const NameParts = gql`
    fragment NameParts on User {
        username
        name
    }`;

export const PostParts = gql`
    fragment PostParts on Post {
        id
        title
        body
    }`;

export const GET_POSTS = gql`
query ($options: PageQueryOptions) {
    posts(options: $options) {
        data {
            ...PostParts
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
${PostParts}
`;

export const GET_POST = gql`
    query ($id: ID!) {
        post(id: $id) {
            ...PostParts
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
    ${PostParts}
`;

export const GET_POST_DETAIL = gql`
    query ($id: ID!) {
        post(id: $id) {
            ...PostParts
        }
    }
    ${PostParts}
`;

export const CREATE_POST = gql`
    mutation (
        $input: CreatePostInput!
    ) {
        post : createPost(input: $input) {
            ...PostParts
        } 
    }
    ${PostParts}
`;

export const UPDATE_POST = gql`
    mutation mutation (
        $id: ID!,
        $input: UpdatePostInput!
    ) {
        post : updatePost(id: $id, input: $input) {
            ...PostParts
        }
    }
    ${PostParts}
`;

export const DELETE_POST = gql`
    mutation ($id: ID!) {
        deletePost(id: $id)
    }
`;

export const GET_TODOS = gql`
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
            meta {
                totalCount
            }
        }
    }
    ${NameParts}
`;

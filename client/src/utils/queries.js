import {gql, useQuery} from '@apollo/client'

export const GET_ME = gql`
query GetMe {
    me {
        username
        savedBooks
        bookId
        title
        description
        authors
        image
        link
    }
}
`;
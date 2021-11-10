import {gql, useMutation} from '@apollo/client'

const ADD_USER = gql`
mutation Createuser($username: String!, $email:String!, $password: String!){
    addUser($username: $username, email:$email, password: $password!) {
        token
        user{
            username
        }
    }
}
`

export function useCreateUser(){
    const [Createuser,  {data, error, loading}] = useMutation(ADD_USER);

    async function handleCreateUser(payload){
        const {username, email, password} = payload;

let addUser;
try {
    const {data: { addUser } } = await createUser(
        {
            variables: {
                username,
                email,
                password
            }
        });
        return addUser
    } catch (error) {
        console.log(error.graphQLErrors)
    }

    return addUser
}

return {
    createUser:handleCreateUser,
    data:data,
    loading: loading,
    error
}


export const SAVE_BOOK = gql`
mutation SaveBook($bookId: String!, $Title: String!, $Authors: [String]!, $description: String, $image: String, $link: String){
    saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
        username
    savedBooks }
    bookId
    title
    authors
    description
    image
    link
}
}
}
`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
    username
    savedBooks{
        bookId
        title
        authors
        description
        image
        link
        }
    }
}
`


export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            username
        }
    }
}
`


}
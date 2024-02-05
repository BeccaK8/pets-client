import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// Axios default functionality is to set a GET request
// so just need to send a URL
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
// CREATE -> Add a pet
// UPDATE -> Adjust a pet
// DELETE -> Set a pet free

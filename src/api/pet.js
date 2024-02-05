import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// Axios default functionality is to set a GET request
// so just need to send a URL
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

// CREATE -> Add a pet
export const createPet = (user, newPet) => {
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}

// UPDATE -> Adjust a pet
// DELETE -> Set a pet free

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `Bearer ${newToken}`}

const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = await axios.get(baseUrl, config)
    return request.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}


const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.data
}

// use some other name for variable!
const erase = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = await axios.delete(`${baseUrl}/${id}`, config)
    return request.data
  }

export default {getAll,create, update, erase, setToken}
import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    const deliverData = request.data.map(user => (
        {
            username: user.username,
            name: user.name || user.username,
            id : user.id,
            blogs : user.blogs,
            liked: user.liked
        }
    ))
    return deliverData
}

export default {getAll}
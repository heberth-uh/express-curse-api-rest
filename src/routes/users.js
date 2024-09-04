const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router()

router.get('/users', (req, res) => {
    const title = 'Users page'
    res.render('users', { title })
})

router.get('/posts', async (req, res) => {
    const title = 'Post page'
    const responde = await axios.get('https://jsonplaceholder.typicode.com/posts')
    res.render('posts', {
        title,
        posts: responde.data
    })
})
module.exports = router;

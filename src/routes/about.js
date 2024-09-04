const { Router } = require('express');
const router = Router()


router.get('/about', (req, res) => {
    const title = 'About page'
    res.render('about', { title })
})

module.exports = router;

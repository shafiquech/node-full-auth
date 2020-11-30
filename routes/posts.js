const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: { title: 'My fist post', desc: 'My desc' },
        identity: req.user
    });

});

module.exports = router;
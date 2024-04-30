import express from 'express';

// Routing
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth/login')
})
    

export default router;
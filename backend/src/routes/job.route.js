const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/job.controller')
const verifyToken = require('../middleware/verifyToken')
const isEmployer = require('../middleware/verifyRole')

router.post('/',verifyToken,isEmployer,jobsController.postJob)
router.get('/',jobsController.getAllJobs)
router.get('/:id',jobsController.getSingleJob)

module.exports= router
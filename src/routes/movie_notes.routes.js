const { Router } = require("express")

const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesController = new MovieNotesController()

const movieNotesRoutes = Router()

movieNotesRoutes.post("/:user_id", movieNotesController.create)
movieNotesRoutes.put("/", movieNotesController.update)


module.exports = movieNotesRoutes
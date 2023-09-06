const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieNotesController {
    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        if(rating < 1 || rating > 5) throw new AppError("A nota deve estar entre 1 e 5")

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = tags.map(name => {
            return {
              note_id,
              name,
              user_id
            }
        })

        console.log(tagsInsert)
      
        await knex("movie_tags").insert(tagsInsert)

        response.json()
    }

    async update(request, response){
        const { id, new_rating } = request.query

        if(new_rating < 1 || new_rating > 5) throw new AppError("A nota deve estar entre 1 e 5")

        const note = await knex("movie_notes").select("id")
            .where({ id })
            .then(rows => {
                if(!rows[0]) throw new AppError("Nota não cadastrada")
            })

        await knex("movie_notes").select("id")
            .where({ id })
            .update({ rating : new_rating })


        response.json()
    }
}

module.exports = MovieNotesController
const knex = require("../database/knex")
const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const hashedPassword = await hash(password, 8)

        await knex("users").select("email")
            .where({ email })
            .then(rows => {
                if(rows[0]) throw new AppError("Email ja cadastrado")
            })

        await knex('users').insert({
            name,
            email,
            password : hashedPassword,
            avatar : null
        })

        response.status(201).json()
    }

    async delete(request, response) {
        const { id } = request.params
    
        await knex("users").where({ id }).delete()
    
        return response.json()
    }
}

module.exports = UsersController
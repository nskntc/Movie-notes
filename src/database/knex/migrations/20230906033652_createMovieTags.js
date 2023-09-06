exports.up = async knex => {
    await knex.schema.createTable("movie_tags", table => {
        table.increments("id").primary();
        table.text("name");
        table.integer("user_id").references("id").inTable("users");
        table.integer("note_id").references("id").inTable("movie_notes");
    })
};
  
exports.down = knex => knex.schema.dropTable("movie_tags");

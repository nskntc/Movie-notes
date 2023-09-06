exports.up = async knex => {
    const exists = await knex.schema.hasTable('users')
    if (!exists){
        await knex.schema.createTable("users", table => {
            table.increments("id").primary();
            table.text("name");
            table.text("email");
            table.text("password");
            table.text("avatar");
        
            table.timestamp("created_at").default(knex.fn.now());
            table.timestamp("updated_at").default(knex.fn.now());
        })
    }
};
  
exports.down = knex => knex.schema.dropTable("users");

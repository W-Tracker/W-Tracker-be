exports.up = function(knex) {
    return knex.schema.createTable("strains", tbl => {
        tbl.increments()
        tbl.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
        tbl.string("name", 255).notNullable()
        tbl.integer("hits", 255).notNullable()
        tbl.float("feel").notNullable()
        tbl.string("strain", 255)
        tbl.string("type", 255).notNullable()
        tbl.string("concentrate", 255)
        tbl.boolean("favorites")
        tbl.float("percentage")
        tbl.text("other", "longtext")
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("strains")
};

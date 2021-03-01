
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "TGIFernandooo", password: "spawnbuffs", firstName: "Fernando", lastName: "Chavez", role: "admin", email:"asdf"}
      ]);
    });
};

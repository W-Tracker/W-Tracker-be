
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('strains').del()
    .then(function () {
      // Inserts seed entries
      return knex('strains').insert([
        {user_id: 1, name: 'blue beary', hits: 3, feel: 80.35, strain: "Indica Hybrid", type: "Consintrate", concentrate: "Live Resin", favorites: true, other: "Spawn buffs plzzzzz", percentage: 86.86}
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('custom_location').del()
  await knex('custom_location').insert([
    { id: 1, locationName: 'McDonalds' },
    { id: 2, locationName: 'BurgerKing' },
    { id: 3, locationName: 'Wendys' },
  ])
}

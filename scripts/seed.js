const { db } = require('@vercel/postgres');
const {
  users,
  workouts
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

// Creates and inserts data into "users" table
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, name, email)
        VALUES (${user.id}, ${user.name}, ${user.email})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}


// Creates and inserts data into "workouts" table
async function seedWorkouts(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "workouts" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS workouts (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          date DATE NOT NULL
        );
      `;
  
      console.log(`Created "workouts" table`);
  
      // Insert data into the "workouts" table
      const insertedWorkouts = await Promise.all(
        workouts.map(async (workout) => {
          return client.sql`
          INSERT INTO workouts (user_id, title, description, date)
          VALUES (${workout.user_id}, ${workout.title}, ${workout.description}, ${workout.date})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedWorkouts.length} workouts`);
  
      return {
        createTable,
        workouts: insertedWorkouts,
      };
    } catch (error) {
      console.error('Error seeding workouts:', error);
      throw error;
    }
  }


async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedWorkouts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
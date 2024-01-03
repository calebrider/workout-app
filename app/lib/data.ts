import { sql } from '@vercel/postgres';
import { User, UserDisplay, Workout, WorkoutDisplay } from './definitions';

export async function fetchUsers() {
  try {
    const data = await sql<UserDisplay>`
      SELECT * FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function upsertUser(id: string, name: string | null | undefined, email: string | null | undefined) {
  try {
    const data = await sql<Workout>`
    INSERT INTO users (Id, Name, Email)
    VALUES (${id}, ${name}, ${email})
    ON CONFLICT (Id)
    DO
      UPDATE SET Name=${name};    
    `;
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to upsert user.')
  }
}

export async function fetchWorkouts() {
  try {
    const data = await sql<Workout>`
      SELECT workouts.id, workouts.title, workouts.description, TO_CHAR(workouts.date :: DATE, 'YYYY-MM-DD')
      FROM workouts
      ORDER BY date DESC
    `;

    const workouts = data.rows;
    console.log(workouts)
    return workouts;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch all workouts.')
  }
}

export async function fetchWorkoutsByUserId(user_id: string) {
  try {
    const data = await sql<WorkoutDisplay>`
      SELECT workouts.id, workouts.title, workouts.description, workouts.date
      FROM workouts
      WHERE workouts.user_id = ${user_id}
      ORDER BY date DESC
    `;

    const workouts = data.rows;

    return workouts;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch workouts.');
  }
}

export async function upsertWorkout(workout: any) {
  try {
    const data = await sql<Workout>`
    INSERT INTO workouts (Id, user_id, Title, Description, Date)
    VALUES (${workout.id}, '34009fbc-4326-4821-980b-ff7e8bd23316', ${workout.title}, ${workout.description}, ${workout.to_char})
    ON CONFLICT (Id)
    DO
      UPDATE SET Title=${workout.title}, Description=${workout.description};    
    `;
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to upsert workout.')
  }
}

export async function deleteWorkoutById(id: string) {
  try {
    const data = await sql<Workout>`
      DELETE FROM workouts
      WHERE workouts.id = ${id}
    `;
    
    return data
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch all workouts.')
  }

}

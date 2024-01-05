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

export async function upsertUser(email: string | null | undefined, name: string | null | undefined) {
  try {
    const data = await sql<Workout>`
    INSERT INTO users (Email, Name)
    VALUES (${email}, ${name})
    ON CONFLICT (Email)
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
    return workouts;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch all workouts.')
  }
}

export async function fetchWorkoutsByUser(userEmail: string | null | undefined) {
  try {
    const data = await sql<WorkoutDisplay>`
      SELECT workouts.id, workouts.title, workouts.description, workouts.date
      FROM workouts
      WHERE workouts.user_email = ${userEmail}
      ORDER BY date DESC
    `;

    const workouts = data.rows;

    return workouts;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch workouts.');
  }
}

export async function upsertWorkout(workout: any, userEmail: string | null | undefined) {
  try {
    const data = await sql<Workout>`
    INSERT INTO workouts (Id, user_email, Title, Description, Date)
    VALUES (${workout.id}, ${userEmail}, ${workout.title}, ${workout.description}, ${workout.date})
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

// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type UserDisplay = {
    name: string;
}

export type Workout = {
    user_id: string;
    title: string;
    description: string;
    date: string;
}

export type WorkoutDisplay = {
    title: string;
    description: string;
    date: string;
}

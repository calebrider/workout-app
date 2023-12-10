// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data 
const users = [
{
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Bob Smith',
    email: 'bob@smith.com',
    password: '123456'
},
{
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Joe Shmoe',
    email: 'joe@shmoe.com',
    password: 'abcdef'
},
{
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Gertrude Taylor',
    email: 'gertrude@taylor.com',
    password: 'password'
},
{
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Deborah White',
    email: 'deborah@white.com',
    password: 'pass'
}
];

const workouts = [
{
    user_id: users[0].id,
    title: "Leg Day",
    description: 'Squats: 3x10 @ 405 lbs',
    date: '2022-12-06',
},
{
    user_id: users[1].id,
    title: "Push Day",
    description: 'Bench: 3x6 245 lbs',
    date: '2022-11-14',
},
{
    user_id: users[2].id,
    title: "Pull Day",
    description: 'Pull ups: 3x15',
    date: '2022-10-29',
},
{
    user_id: users[3].id,
    title: "Run",
    description: '1 mile in 4:30',
    date: '2023-09-10',
},
{
    user_id: users[0].id,
    title: "Sprint Endurance",
    description: '3x400m @ 52s, 54s, 56s',
    date: '2023-09-10',
}
];


module.exports = {
    users,
    workouts
};
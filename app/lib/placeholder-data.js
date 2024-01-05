// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data 
const users = [
{
    email: 'bob@smith.com',
    name: 'Bob Smith'
},
{
    email: 'joe@shmoe.com',
    name: 'Joe Shmoe'
},
{
    email: 'gertrude@taylor.com',
    name: 'Gertrude Taylor'
},
{
    email: 'deborah@white.com',
    name: 'Deborah White'
}
];

const workouts = [
{
    user_email: users[0].email,
    title: "Leg Day",
    description: 'Squats: 3x10 @ 405 lbs',
    date: new Date('2022-12-06'),
},
{
    user_email: users[1].email,
    title: "Push Day",
    description: 'Bench: 3x6 245 lbs',
    date: new Date('2022-11-14'),
},
{
    user_email: users[2].email,
    title: "Pull Day",
    description: 'Pull ups: 3x15',
    date: new Date('2022-10-29'),
},
{
    user_email: users[3].email,
    title: "Run",
    description: '1 mile in 4:30',
    date: new Date('2023-09-10'),
},
{
    user_email: users[0].email,
    title: "Sprint Endurance",
    description: '3x400m @ 52s, 54s, 56s',
    date: new Date('2023-09-10'),
}
];

module.exports = {
    users,
    workouts
};

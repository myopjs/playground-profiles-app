export type UserData = {
    name: string;
    email: string;
    initials: string;
    profileImage: string | null;
}

export const mockUsers: UserData[] = [
    {
        name: 'Alex Rivera',
        email: 'alex.rivera@company.com',
        initials: 'AR',
        profileImage: null
    },
    {
        name: 'Jamie Park',
        email: 'jamie.park@company.com',
        initials: 'JP',
        profileImage: null
    },
    {
        name: 'Sam Foster',
        email: 'sam.foster@company.com',
        initials: 'SF',
        profileImage: null
    },
    {
        name: 'Riley Kim',
        email: 'riley.kim@company.com',
        initials: 'RK',
        profileImage: null
    },
    {
        name: 'Taylor Brooks',
        email: 'taylor.brooks@company.com',
        initials: 'TB',
        profileImage: null
    }
];

export const getRandomUser = (): UserData => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
};

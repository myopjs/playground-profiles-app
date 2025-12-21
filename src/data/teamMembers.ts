export type TeamMember =  {
    id: string;
    initials: string;
    name: string;
    title: string;
    location: string;
    tenure: string;
    experience: string;
    skills: string[];
    role: string;
    avatarColor: string;
    profileImage: string | null;
}

export const teamMembersData: TeamMember[] = [
    {
        id: '1',
        initials: 'AR',
        name: 'Alex Rivera',
        title: 'Design Director',
        location: 'San Francisco, CA',
        tenure: '5.2y',
        experience: '12y',
        skills: ['Design Leadership', 'Strategy', 'Team Management'],
        role: 'Manager',
        avatarColor: '#9B59B6',
        profileImage: null
    },
    {
        id: '2',
        initials: 'JP',
        name: 'Jamie Park',
        title: 'Product Designer',
        location: 'Seattle, WA',
        tenure: '1.5y',
        experience: '3y',
        skills: ['UI Design', 'Mobile Design', 'Prototyping'],
        role: 'Team',
        avatarColor: '#3498DB',
        profileImage: null
    },
    {
        id: '3',
        initials: 'SF',
        name: 'Sam Foster',
        title: 'UX Researcher',
        location: 'Austin, TX',
        tenure: '2.1y',
        experience: '4y',
        skills: ['User Research', 'Data Analysis', 'Usability Testing'],
        role: 'Team',
        avatarColor: '#1ABC9C',
        profileImage: null
    },
    {
        id: '4',
        initials: 'RK',
        name: 'Riley Kim',
        title: 'Senior Product Designer',
        location: 'New York, NY',
        tenure: '3.5y',
        experience: '7y',
        skills: ['Product Design', 'Design Systems', 'Accessibility'],
        role: 'Senior Member',
        avatarColor: '#E74C3C',
        profileImage: null
    },
    {
        id: '5',
        initials: 'TB',
        name: 'Taylor Brooks',
        title: 'Senior UX Designer',
        location: 'Remote',
        tenure: '2.3y',
        experience: '5.5y',
        skills: ['UX Design', 'Information Architecture', 'Wireframing'],
        role: 'Senior Member',
        avatarColor: '#F39C12',
        profileImage: null
    },
    {
        id: '6',
        initials: 'MC',
        name: 'Morgan Chen',
        title: 'UI/UX Designer',
        location: 'Los Angeles, CA',
        tenure: '1.8y',
        experience: '4y',
        skills: ['Visual Design', 'Branding', 'Illustration', 'Animation'],
        role: 'Team',
        avatarColor: '#F1C40F',
        profileImage: null
    },
    {
        id: '7',
        initials: 'JD',
        name: 'Jordan Davis',
        title: 'Product Manager',
        location: 'Boston, MA',
        tenure: '4.2y',
        experience: '9y',
        skills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management'],
        role: 'Manager',
        avatarColor: '#2ECC71',
        profileImage: null
    },
    {
        id: '8',
        initials: 'AS',
        name: 'Avery Smith',
        title: 'Design Researcher',
        location: 'Chicago, IL',
        tenure: '0.9y',
        experience: '2y',
        skills: ['Qualitative Research', 'Ethnography', 'Workshop Facilitation'],
        role: 'Team',
        avatarColor: '#E67E22',
        profileImage: null
    },
    {
        id: '9',
        initials: 'CM',
        name: 'Casey Martinez',
        title: 'Interaction Designer',
        location: 'Denver, CO',
        tenure: '2.7y',
        experience: '6y',
        skills: ['Interaction Design', 'Motion Design', 'Micro-interactions', 'Figma'],
        role: 'Team',
        avatarColor: '#16A085',
        profileImage: null
    },
    {
        id: '10',
        initials: 'PS',
        name: 'Peyton Sullivan',
        title: 'Content Designer',
        location: 'Portland, OR',
        tenure: '1.3y',
        experience: '3.5y',
        skills: ['UX Writing', 'Content Strategy', 'Voice & Tone'],
        role: 'Team',
        avatarColor: '#8E44AD',
        profileImage: null
    },
    {
        id: '11',
        initials: 'DR',
        name: 'Dakota Reed',
        title: 'Design Engineer',
        location: 'San Diego, CA',
        tenure: '3.1y',
        experience: '8y',
        skills: ['Front-end Development', 'React', 'CSS', 'Prototyping'],
        role: 'Senior Member',
        avatarColor: '#D35400',
        profileImage: null
    },
    {
        id: '12',
        initials: 'EW',
        name: 'Emerson Wong',
        title: 'UX Strategist',
        location: 'Miami, FL',
        tenure: '4.5y',
        experience: '10y',
        skills: ['UX Strategy', 'Service Design', 'Business Analysis', 'Workshops'],
        role: 'Senior Member',
        avatarColor: '#27AE60',
        profileImage: null
    }
];



# Team Profiles Manager (Vite + React + TS)

A team profiles management demo application built with React and Myop components, featuring team member views, profile editing, and analytics dashboard.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check and build
- `npm run preview` — preview production build

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

## Features

- User authentication with session persistence
- Team members display in table or cards view
- Profile editing with slide-in modal
- Analytics dashboard with team insights
- Navigation sidebar with user profile menu
- Responsive layout with multiple view options

## Myop Components

The application uses the following Myop components:

### Signup
Authentication component displaying:
- Google sign-in/sign-up options
- Email sign-in/sign-up options
- Full-screen authentication flow

### Sidebar
Navigation sidebar component featuring:
- Application branding
- Navigation items (Home, Analytics)
- Active state indication for current route
- User profile trigger for popover menu

### Profile Popover
User profile dropdown menu displaying:
- User avatar with initials
- User name and email
- Logout functionality
- Slide-in/out animation

### Header Insights
Header component showing:
- Welcome message with user name
- Team overview statistics
- Quick insights about the team

### Table Header
Table controls component featuring:
- View toggle between table and cards
- Section title
- Action buttons for view switching

### Table
Team members table view displaying:
- Member name and avatar
- Role and department
- Contact information
- Click to select a member for editing

### Cards View
Alternative team members display featuring:
- Grid layout of member cards
- Member photo, name, and role
- Visual card-based presentation
- Click to select a member for editing

### Edit Profile
Profile editing modal component featuring:
- Editable profile fields
- Save and cancel actions
- Member details form

### Analytics
Analytics dashboard component displaying:
- Team statistics and metrics
- Data visualizations
- Generation and distribution insights
- Back navigation to home

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v7
- @myop/react for component integration

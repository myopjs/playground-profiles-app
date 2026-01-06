# Playground Profiles App

A React-based team management and profile system built with the Myop component. This application demonstrates how to build dynamic, customizable applications with authentication, CRUD operations, and analytics dashboards.

## Overview

The Profiles App is part of the Myop Playground monorepo and showcases:

- User authentication with session persistence
- Team member management (view, add, edit, delete)
- Multiple view layouts (table, cards, organizational tree)
- Analytics dashboard with team insights
- Dynamic component customization via URL parameters
- Responsive design with mobile-first approach

## Features

### User Authentication
- Mock authentication with 5 predefined demo users
- Session persistence via localStorage
- Sign-in/Logout flow with user data display

### Team Management
- **View Members**: Switch between table, cards, and organizational tree views
- **Add Members**: Full form with role selection, manager assignment, and skill tags
- **Edit Profiles**: Modal-based profile editing with instant updates
- **Delete Members**: Remove team members with confirmation notifications

### Analytics Dashboard
- Team composition metrics
- Skills distribution analysis with color-coded categories
- Experience and tenure range breakdowns
- Seniority level distribution
- Performance summary generation

### Dynamic Component System
- 11 different component slots can be overridden via URL parameters
- Support for component preview mode
- Example: 

### Dynamic Component Customization
Override any UI component via URL query parameters:
```
`?signup=custom-id&table=another-id`
```

### Responsive Design
- Mobile-first approach with 700px breakpoint
- Collapsible sidebar on mobile
- Portal-based rendering for mobile modals
- Adaptive layouts for all views

## Project Structure

```
playground-profiles-app/
├── src/
│   ├── main.tsx                    # React root with Router
│   ├── index.css                   # Global styles
│   ├── ui/                         # UI Components
│   │   ├── App.tsx                 # Main app container
│   │   ├── HomePage.tsx            # Team view + edit modal
│   │   ├── Analytics.tsx           # Analytics dashboard
│   │   ├── AddMember.tsx           # Add member form
│   │   ├── SideBar.tsx             # Navigation sidebar
│   │   ├── ProfilePopover.tsx      # User menu dropdown
│   │   └── Toast.tsx               # Notification component
│   ├── data/
│   │   ├── mockUsers.ts            # Auth mock users (5 users)
│   │   ├── teamMembers.ts          # Team data (12 members)
│   │   └── analyticsData.ts        # Analytics data generation
│   └── utils/
│       ├── componentsIds.ts        # Myop component ID mappings
│       └── queryParams.ts          # URL parameter handling
├── package.json                    # Package configuration
├── vite.config.ts                  # Vite build config
├── tsconfig.json                   # TypeScript references
├── tsconfig.app.json               # App TypeScript config
└── index.html                      # HTML entry point
```

## Installation & Development

Run commands from the monorepo root or this package directory:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at http://localhost:5173/profiles/ |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Dependencies

### Production
- `@myop/react` (^0.0.30) - Myop component framework
- `react` (^19.2.0) - UI library
- `react-dom` (^19.2.0) - React DOM renderer
- `react-router-dom` (^7.11.0) - Routing

### Development
- `vite` (^7.2.4) - Build tool
- `typescript` (~5.9.3) - Type checking
- `eslint` (^9.39.1) - Linting
- `@vitejs/plugin-react` (^5.1.1) - React plugin for Vite

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Team members view with table/cards/tree |
| `/analytics` | Analytics | Team analytics dashboard |
| `/add-member` | AddMember | Form to add new team members |

## Myop Component Integration

The app uses the `@myop/react` package to render dynamic, customizable components:

```tsx
import {MyopComponent, preloadComponents} from '@myop/react';
import {useEffect} from "react";
import {COMPONENTS_IDS} from "../utils/componentsIds";

export const CustomComponent = () => {

    const [donePreload, setDonePreload] = useState<boolean>(false);
    // ...
    // ...


    // Preload components on startup
    useEffect(() => {
        Promise.resolve(preloadComponents([tableId, headerInsightsId, ...]))
            .then(() => setDonePreload(true));
    }, []);


    if (!donePreload) {
        return (<div/>)
    }

    // Render component with data and event handlers after preload
    return <MyopComponent
        componentId={COMPONENTS_IDS.tableId}
        data={data}
        on={handleCtaEvents}
    />
}
```



### Data Flow
```
React App → myop_init_interface(data) → Myop Component
Myop Component → myop_cta_handler(action) → React App
```

## MyopComponent Reference

This section documents each `<MyopComponent>` used in the app, including the data structures they receive and the CTA (Call-to-Action) events they emit.

---

### 1. Signup (`signup`)

**Query Param:** `signup`

**Data Structure:** None

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `google_signin` | None | User clicked Google sign-in |
| `email_signin` | None | User clicked email sign-in |
| `google_signup` | None | User clicked Google sign-up |
| `email_signup` | None | User clicked email sign-up |

---

### 2. Sidebar (`sidebar`)

**Query Param:** `sidebar`

**Data Structure:**
```typescript
{
  userData: {
    name: string;           // User display name
    role: string;           // "Settings"
    initials: string;       // User initials (e.g., "JD")
    profileImage: string | null;
  };
  activeNavItem: string;    // 'home' | 'analytics'
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `profile_clicked` | None | User clicked profile area (opens popover) |
| `nav_clicked` | `{ navId: string }` | User clicked navigation item |
| `sidebar_toggled` | `{ expanded: boolean }` | Sidebar expand/collapse state changed |

---

### 3. Header Insights (`headerInsights`)

**Query Param:** `headerInsights`

**Data Structure:**
```typescript
{
  userName: string;         // Current user's name
  stats: {
    experience: { value: string; label: string };  // e.g., "5.2 yrs", "Avg Experience"
    members: { value: number; label: string };     // e.g., 12, "Members"
    skills: { value: number; label: string };      // e.g., 25, "Skills"
    projects: { value: number; label: string };    // e.g., 23, "Projects"
  };
  isMobileView: boolean;
  action?: { action: string };  // Optional action trigger (e.g., { action: 'showShareCopied' })
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `action_clicked` | `{ action: 'viewHighlights' }` | User clicked to view analytics |
| `action_clicked` | `{ action: 'addMember' }` | User clicked to add member |
| `action_clicked` | `{ action: 'shareTeam' }` | User clicked to share team URL |

---

### 4. Table Header (`tableHeader`)

**Query Param:** `tableHeader`

**Data Structure:**
```typescript
{
  title: string;            // "Your Team"
  activeView: ViewType;     // 'table' | 'cards' | 'tree'
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `view-changed` | `{ view: 'table' / 'cards' / 'tree' }` | User switched view mode |

---

### 5. Table View (`table`)

**Query Param:** `table`

**Data Structure:**
```typescript
{
  teamData: TeamMember[];   // Array of team members
  isMobileView: boolean;
}

interface TeamMember {
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
  email: string;
  phone: string;
  about: string;
  relationship: string;
  relationshipType: string;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `member_clicked` | `{ member: TeamMember }` | User clicked a team member row |
| `addMember` | None | User clicked add member button |

---

### 6. Cards View (`cardsView`)

**Query Param:** `cardsView`

**Data Structure:**
```typescript
{
  teamMembers: TeamMember[];  // Array of team members
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `member_clicked` | `{ member: TeamMember }` | User clicked a member card |
| `addMember` | None | User clicked add member button |

---

### 7. Tree View (`treeView`)

**Query Param:** `treeView`

**Data Structure:**
```typescript
{
  teamMembers: TeamMember[];  // Array of team members
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `member_clicked` | `{ member: TeamMember }` | User clicked a member in the org tree |
| `addMember` | None | User clicked add member button |

---

### 8. Edit Profile (`editProfile`)

**Query Param:** `editProfile`

**Data Structure:**
```typescript
{
  profile: {
    id: string;
    initials: string;
    name: string;
    title: string;
    experience: string;
    tenure: string;
    location: string;
    skills: string[];
    profileImage: string | null;
    avatarColor: string;
    badge: string;              // Role badge (e.g., "Manager")
    email: string;
    phone: string;
    about: string;
    relationship: string;
    relationshipType: string;
    teamSize: number;           // Number of direct reports
    tenureRank: number;         // Tenure ranking (1 = longest)
  };
  isEditing: boolean;           // Edit mode flag
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `close` | None | User closed the modal |
| `delete` | `{ profile: { id, name, ... } }` | User deleted the profile |
| `save` | `{ profile: { id, name, title, initials, email, phone, location, skills, about, experience, tenure, profileImage } }` | User saved profile changes |

---

### 9. Profile Popover (`profilePopover`)

**Query Param:** `profilePopover`

**Data Structure:**
```typescript
{
  userData: {
    name: string;
    email: string;
    initials: string;
    profileImage: string | null;
  };
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `logout_clicked` | None | User clicked logout |
| `click_outside` | None | User clicked outside popover |
| `escape_pressed` | None | User pressed Escape key |
| `drag_closed` | None | User dragged to close (mobile) |
| `open_clicked` | `{ componentId: string, selectedComponent: string }` | User clicked to open component in new tab |

---

### 10. Analytics (`analytics`)

**Query Param:** `analytics`

**Data Structure:**
```typescript
{
  stats: Array<{
    type: string;       // 'members' | 'experience' | 'skills' | 'tenure'
    value: string;
    label: string;
    color: string;      // 'purple' | 'blue' | 'orange' | 'green'
  }>;
  topSkills: Array<{
    name: string;
    count: number;
  }>;
  experienceDistribution: Array<{
    label: string;      // '0-3' | '3-5' | '5-7' | '7-10' | '10+'
    value: number;
  }>;
  tenureDistribution: Array<{
    label: string;      // '0-1' | '1-2' | '2-3' | '3-5' | '5+'
    value: number;
  }>;
  skillsDistribution: Array<{
    name: string;       // Category name
    percentage: number;
    members: string;    // e.g., "15 skills"
    color: string;
    colorClass: string;
  }>;
  seniority: Array<{
    level: string;      // 'Junior' | 'Mid-Level' | 'Senior' | 'Lead'
    range: string;      // e.g., "0-3 years"
    count: number;
    color: string;
  }>;
  performance: {
    title: string;
    description: string;
  };
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `back_clicked` | None | User clicked back button |

---

### 11. Add Profile (`addProfile`)

**Query Param:** `addProfile`

**Data Structure:**
```typescript
{
  managersList: Array<{
    id: string;
    name: string;       // Format: "Name - Title"
  }>;
  isMobileView: boolean;
}
```

**CTA Handlers:**

| Action | Payload | Description |
|--------|---------|-------------|
| `cancel` | None | User cancelled adding member |
| `back` | None | User clicked back button |
| `submit` | `{ formData: FormData }` | User submitted new member form |

**FormData Structure:**
```typescript
{
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  yearsExperience: number;
  companyTenure: number;
  skills: string[];
  reportsTo: string;        // Manager ID
  profilePicture: string | null;
}
```

---

## Component Slots Summary

| Slot | Query Param | Description |
|------|-------------|-------------|
| Signup | `signup` | Authentication page |
| Table | `table` | Team table view |
| Header Insights | `headerInsights` | Welcome header with stats |
| Sidebar | `sidebar` | Navigation sidebar |
| Cards View | `cardsView` | Cards team view |
| Tree View | `treeView` | Organizational tree view |
| Profile Popover | `profilePopover` | User dropdown menu |
| Table Header | `tableHeader` | View toggle controls |
| Edit Profile | `editProfile` | Profile editor modal |
| Analytics | `analytics` | Analytics dashboard |
| Add Profile | `addProfile` | Add member form |

## Data Types

### UserData
```typescript
interface UserData {
  name: string;
  email: string;
  initials: string;
  profileImage: string | null;
}
```

### TeamMember
```typescript
interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  location: string;
  tenure: string;
  experience: string;
  skills: string[];
  role: string;           // 'Manager' | 'Team' | 'Senior Member'
  avatarColor: string;
  profileImage: string | null;
  email: string;
  phone: string;
  about: string;
  relationship: string;
  relationshipType: string;
}
```

### AnalyticsData
```typescript
interface AnalyticsData {
  stats: { label: string; value: string | number }[];
  topSkills: { skill: string; count: number; color: string }[];
  experienceDistribution: { range: string; count: number }[];
  tenureDistribution: { range: string; count: number }[];
  skillsByCategory: { category: string; skills: string[]; color: string }[];
  seniorityLevels: { level: string; count: number; percentage: number }[];
  performanceSummary: { metric: string; value: string }[];
}
```

## State Management

### App.tsx
- `currentUser`: User authentication state (persisted to localStorage)
- `members`: Array of team members
- `isMobileView`: Responsive design state (breakpoint: 700px)
- `isSidebarExpanded`: Mobile sidebar toggle

### HomePage.tsx
- `view`: Current view type ('table' | 'cards' | 'tree')
- `selectedMember`: Member selected for profile modal
- `isProfileOpen`: Modal visibility state
- `toastOpen`: Toast notification state

## Mock Data

### Users (5 predefined)
Mock users for authentication simulation with random selection via `getRandomUser()`.

### Team Members (12 predefined)
Diverse team covering roles:
- Managers
- Designers
- Researchers
- Content specialists
- Engineers
- Strategists

### Skill Categories
- **Design**: UI, Visual Design, Prototyping, etc.
- **Research**: User Research, Data Analysis, etc.
- **Development**: React, TypeScript, CSS, etc.
- **Content**: Content Strategy, SEO, Copywriting, etc.
- **Leadership**: Team Management, Mentoring, etc.


## Analytics Insights

The analytics dashboard provides:
- Team size and average experience metrics
- Skills distribution with category grouping
- Experience ranges (0-2, 3-5, 6-10, 10+ years)
- Tenure distribution analysis
- Seniority breakdown (Junior, Mid-level, Senior, Lead, Manager)

## Utility Functions

### queryParams.ts
- `getComponentId(key)` - Resolves component IDs from URL params or defaults to built-in component IDs
- `QUERY_PARAMS` - Object mapping component keys to their URL query parameter names

### componentsIds.ts
- `COMPONENTS_IDS` - Object mapping component keys to their default Myop component UUIDs

### analyticsData.ts
- `generateAnalyticsData(members)` - Generates complete analytics data from team members array
- `parseYears(str)` - Parses year strings (e.g., "5y") to numbers
- `getSkillCategory(skill)` - Maps skills to categories (Design, Research, Development, Content, Leadership)
- `getSeniorityLevel(experience)` - Determines seniority level (Junior, Mid-Level, Senior, Lead) based on years

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

## Component Override via Query Params

You can override any Myop component at runtime by adding query parameters to the URL. This is useful for testing alternative component implementations or previewing new versions.

### Available Query Parameters

| Query Param | Default Component | Description |
|-------------|-------------------|-------------|
| `signup` | Signup page | Authentication component |
| `table` | Team members table | Table view of team members |
| `headerInsights` | Header insights | Welcome header with stats |
| `sidebar` | Navigation sidebar | Left navigation menu |
| `cardsView` | Cards view | Grid layout of member cards |
| `profilePopover` | Profile popover | User profile dropdown menu |
| `tableHeader` | Table header | View toggle controls |
| `editProfile` | Edit profile modal | Profile editing form |
| `analytics` | Analytics dashboard | Team analytics page |

### Usage

To override a component, add the query parameter with the custom component ID:

```
http://localhost:5173/?table=your-custom-component-id
```

You can override multiple components at once:

```
http://localhost:5173/?table=custom-table-id&sidebar=custom-sidebar-id
```

### Example

To test a new version of the header insights component:

```
http://localhost:5173/?headerInsights=abc123-new-header-component-id
```

The application will use the custom component ID instead of the default one. If the query parameter is not present or empty, it falls back to the default component.

## Component Data Structures

This section documents the `myop_init_interface` and `myop_cta_handler` APIs for each component, enabling proper component overrides.

---

### Signup

**`myop_init_interface(data)`**

```typescript
interface SignupInitData {
  mode?: 'signup' | 'signin';
  branding?: {
    logoInitials?: string;    // e.g., 'MT'
    companyName?: string;     // e.g., 'BestTeam'
    title?: string;           // e.g., 'Your Team Journey at a Glance'
    accentColor?: string;     // e.g., '#50FFEE'
  };
  config?: {
    showGoogleAuth?: boolean;
    showEmailAuth?: boolean;
    showNoCreditCard?: boolean;
  };
}

// Actions (via data.action):
// - 'setMode': payload = 'signup' | 'signin'
// - 'setBranding': payload = { logoInitials?, companyName?, title?, accentColor? }
// - 'setConfig': payload = { showGoogleAuth?, showEmailAuth?, showNoCreditCard? }
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `google_signup` | `{ mode: 'signup' }` |
| `google_signin` | `{ mode: 'signin' }` |
| `email_signup` | `{ mode: 'signup' }` |
| `email_signin` | `{ mode: 'signin' }` |
| `mode_changed` | `{ mode: 'signup' \| 'signin' }` |

---

### Sidebar

**`myop_init_interface(data)`**

```typescript
interface SidebarInitData {
  appLogo?: string;           // e.g., 'MT'
  appTitle?: string;          // e.g., 'My Team'
  appSubtitle?: string;       // e.g., 'Profile Manager'
  navItems?: Array<{
    id: string;               // e.g., 'home', 'analytics'
    icon: string;             // 'home' | 'analytics' | 'users' | 'settings' | 'calendar' | 'folder'
    text: string;             // Display label
  }>;
  activeNavItem?: string;     // Nav item id
  userData?: {
    name: string;
    role: string;
    initials: string;
    profileImage?: string | null;
  };
}

// Actions:
// - 'setActiveNav': payload = navId string
// - 'setNavItems': payload = navItems array
// - 'setUserData': payload = userData object
// - 'setHeader': payload = { appLogo?, appTitle?, appSubtitle? }
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `nav_clicked` | `{ navId: string, navItem: { id, icon, text } }` |
| `profile_clicked` | `{ userData: { name, role, initials, profileImage } }` |

---

### Profile Popover

**`myop_init_interface(data)`**

```typescript
interface ProfilePopoverInitData {
  userData?: {
    name: string;
    email: string;
    initials: string;
    profileImage?: string | null;
  };
  config?: {
    isVisible?: boolean;
  };
  selectedComponent?: string;  // Component to override (e.g., 'Table', 'Sidebar')
  componentId?: string;        // Custom component ID
}

// Available components for override:
// 'Signup', 'Sidebar', 'Profile Popover', 'Header Insights',
// 'Table Header', 'Table', 'Cards View', 'Edit Profile', 'Analytics'

// Actions:
// - 'setUserData': payload = userData object
// - 'setSelectedComponent': payload = component name string
// - 'setComponentId': payload = string
// - 'show': no payload
// - 'hide': no payload
// - 'toggle': no payload
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `component_selected` | `{ component: string }` |
| `open_clicked` | `{ componentId: string, selectedComponent: string }` |
| `settings_clicked` | `{}` |
| `logout_clicked` | `{}` |
| `click_outside` | `{}` |
| `escape_pressed` | `{}` |

---

### Table Header

**`myop_init_interface(data)`**

```typescript
interface TableHeaderInitData {
  title?: string;                    // e.g., 'Your Team'
  activeView?: 'table' | 'cards';
}
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `view-changed` | `{ view: 'table' \| 'cards' }` |

---

### Table

**`myop_init_interface(data)`**

```typescript
interface TableInitData {
  teamData?: Array<{
    id: string;
    initials: string;
    name: string;
    title: string;
    location: string;
    tenure: string;           // e.g., '2.5y'
    experience: string;       // e.g., '6y'
    skills: string[];
    avatarColor?: string;
    profileImage?: string | null;
  }>;
}

// Actions:
// - 'setTeamData': payload = teamData array
// - 'updateMember': payload = { id, ...fieldsToUpdate }
// - 'addMember': payload = member object
// - 'removeMember': payload = { id }
// - 'sort': payload = { column: string, direction: 'asc' | 'desc' }
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `member_clicked` | `{ member: MemberObject, index: number }` |
| `sort` | `{ column: string, direction: 'asc' \| 'desc', sortedIds: string[] }` |

---

### Cards View

**`myop_init_interface(data)`**

```typescript
interface CardsViewInitData {
  teamMembers?: Array<{
    id: string;
    initials: string;
    name: string;
    title: string;
    location: string;
    tenure: string;
    experience: string;
    role?: string;            // 'Manager' | 'Team' | 'Peer'
    avatarColor?: string;
    profileImage?: string | null;
  }>;
  config?: {};
}

// Actions:
// - 'setData': payload = teamMembers array
// - 'updateMember': payload = { id, ...fieldsToUpdate }
// - 'addMember': payload = member object
// - 'removeMember': payload = { id }
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `member_clicked` | `{ member: MemberObject, index: number }` |

---

### Edit Profile

**`myop_init_interface(data)`**

```typescript
interface EditProfileInitData {
  profile?: {
    id: string;
    initials: string;
    name: string;
    badge?: string;           // e.g., 'Senior', 'Member'
    title: string;
    experience: string;       // e.g., '8y'
    tenure: string;           // e.g., '3y'
    tenureRank: string;       // e.g., '85%'
    teamSize: string;         // e.g., '12'
    about: string;
    email: string;
    phone: string;
    location: string;
    skills: string[];
    relationship: string;     // e.g., 'Reports to Sarah Smith'
    relationshipType: string; // e.g., 'Direct Report'
    profileImage?: string | null;
    avatarColor?: string;
  };
  isEditing?: boolean;
}

// Actions:
// - 'setProfile': payload = profile object
// - 'setEditing': payload = boolean
// - 'updateImage': payload = base64 image string
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `close` | `{ profile: ProfileObject }` |
| `edit_started` | `{ profile: ProfileObject }` |
| `delete` | `{ profile: ProfileObject }` |
| `edit_cancelled` | `{ profile: ProfileObject }` |
| `save` | `{ profile: ProfileObject }` |
| `image_updated` | `{ id: string, profileImage: string }` |

---

### Header Insights

**`myop_init_interface(data)`**

```typescript
interface HeaderInsightsInitData {
  userName?: string;
  stats?: {
    experience?: { value: string; label: string };  // e.g., { value: '5.2 yrs', label: 'Avg Experience' }
    members?: { value: number; label: string };
    skills?: { value: number; label: string };
    projects?: { value: number; label: string };
  };
}

// Actions:
// - 'setUserName': payload = string
// - 'setStats': payload = stats object
// - 'updateStat': payload = { key: 'experience'|'members'|'skills'|'projects', value, label? }
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `action_clicked` | `{ action: 'addMember' \| 'viewHighlights' \| 'shareTeam' }` |

---

### Analytics

**`myop_init_interface(data)`**

```typescript
interface AnalyticsInitData {
  stats?: Array<{
    type: 'members' | 'experience' | 'skills' | 'tenure';
    value: string;
    label: string;
    color: 'purple' | 'blue' | 'orange' | 'green';
  }>;
  topSkills?: Array<{
    name: string;
    count: number;
  }>;
  experienceDistribution?: Array<{
    label: string;    // e.g., '0-1', '1-3', '3-5'
    value: number;
  }>;
  tenureDistribution?: Array<{
    label: string;
    value: number;
  }>;
  skillsDistribution?: Array<{
    name: string;
    percentage: number;
    members: string;  // e.g., '8 members'
    color: string;    // hex color
    colorClass: 'purple' | 'blue' | 'green' | 'red' | 'orange';
  }>;
  seniority?: Array<{
    level: string;    // e.g., 'Junior', 'Mid-Level', 'Senior', 'Lead'
    range: string;    // e.g., '0-2 years'
    count: number;
    color: 'purple' | 'blue' | 'orange' | 'green';
  }>;
  performance?: {
    title: string;
    description: string;
  };
}

// Actions:
// - 'setAnalyticsData': payload = full analytics data object
```

**`myop_cta_handler(action, payload)`**

| Action | Payload |
|--------|---------|
| `back_clicked` | `{}` |

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v7
- @myop/react for component integration

import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {useState} from "react";
import {teamMembersData, type TeamMember} from '../data/teamMembers.ts';
import type {UserData} from "../data/mockUsers.ts";


export const HomePage = ({userData}:{ userData: UserData}) => {

    const [view, setView] = useState('table')
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

    const handleCta = (action: string, payload: any) => {
        if (action === 'view-changed' && payload) {
            setView(payload.view);
        }
    };

    const handleMemberClick = (action: string, payload: any) => {
        if (action === 'member_clicked' && payload?.member) {
            setSelectedMember(payload.member);
        }
    };

    const handleEditProfileCta = (action: string) => {
        if (action === 'close') {
            setSelectedMember(null);
        }
    };

    const mapMemberToProfile = (member: TeamMember) => ({
        profile: {
            id: member.id,
            initials: member.initials,
            name: member.name,
            title: member.title,
            experience: member.experience,
            tenure: member.tenure,
            location: member.location,
            skills: member.skills,
            profileImage: member.profileImage,
            avatarColor: member.avatarColor,
            badge: member.role,
        },
        isEditing: false
    });

    return  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Insights */}
        <div style={{ height: '35vh', paddingRight: '24px', paddingLeft: '24px' }}>
            <MyopComponent componentId={COMPONENTS_IDS.headerInsights} data={{ userName: userData.name}} />
        </div>

        {/* Content Header */}
        <div style={{  padding: '0 24px 24px' }} >
            <MyopComponent
                componentId={COMPONENTS_IDS.tableHeader}
                on={handleCta as any}
            />

        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px' }}>
            { view === 'table' ?
                <MyopComponent componentId={COMPONENTS_IDS.table} data={teamMembersData} on={handleMemberClick as any} />:
                <MyopComponent componentId={COMPONENTS_IDS.cardsView} data={teamMembersData} on={handleMemberClick as any} />
            }
        </div>

        {/* Edit Profile Modal */}
        {selectedMember && (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    zIndex: 1000,
                }}
                onClick={() => setSelectedMember(null)}
            >
                <div
                    style={{
                        width: '384px',
                        height: '100%',
                        backgroundColor: '#fff',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <MyopComponent
                        componentId={COMPONENTS_IDS.editProfile}
                        data={mapMemberToProfile(selectedMember)}
                        on={handleEditProfileCta as any}
                    />
                </div>
            </div>
        )}
    </div>
}
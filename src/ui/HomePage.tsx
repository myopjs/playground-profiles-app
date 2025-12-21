import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds.ts";
import {useState, useEffect} from "react";
import {teamMembersData, type TeamMember} from '../data/teamMembers.ts';
import type {UserData} from "../data/mockUsers.ts";


export const HomePage = ({userData}:{ userData: UserData}) => {

    const [view, setView] = useState('table')
    const [members, setMembers] = useState<TeamMember[]>(teamMembersData)
    const [membersVersion, setMembersVersion] = useState(0)
    const [isTableReady, setIsTableReady] = useState(true)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isProfileVisible, setIsProfileVisible] = useState(false)

    useEffect(() => {
        if (selectedMember) {
            setIsProfileOpen(true);
            requestAnimationFrame(() => setIsProfileVisible(true));
        }
    }, [selectedMember]);

    // Debug: log when members state changes
    useEffect(() => {
        console.log('Members state updated, version:', membersVersion, 'first member:', members[0]?.name);
    }, [members, membersVersion]);

    // Force table remount when version changes
    useEffect(() => {
        if (membersVersion > 0) {
            setIsTableReady(false);
            const timer = setTimeout(() => setIsTableReady(true), 50);
            return () => clearTimeout(timer);
        }
    }, [membersVersion]);

    const closeProfile = () => {
        setIsProfileVisible(false);
        setTimeout(() => {
            setIsProfileOpen(false);
            setSelectedMember(null);
        }, 300);
    };

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

    const handleEditProfileCta = (action: string, payload: any) => {
        console.log('handleEditProfileCta called:', action, payload);
        if (action === 'close') {
            closeProfile();
        }
        if (action === 'save' && payload?.profile) {
            const updatedProfile = payload.profile;
            console.log('Updating members with:', updatedProfile);
            setMembers(prevMembers => {
                const newMembers = prevMembers.map(member => {
                    if (String(member.id) === String(updatedProfile.id)) {
                        console.log('Found match, updating:', member.name, '->', updatedProfile.name);
                        return {
                            ...member,
                            name: updatedProfile.name ?? member.name,
                            title: updatedProfile.title ?? member.title,
                            initials: updatedProfile.initials ?? member.initials,
                            email: updatedProfile.email ?? member.email,
                            phone: updatedProfile.phone ?? member.phone,
                            location: updatedProfile.location ?? member.location,
                            skills: updatedProfile.skills ?? member.skills,
                            about: updatedProfile.about ?? member.about,
                            experience: updatedProfile.experience ?? member.experience,
                            tenure: updatedProfile.tenure ?? member.tenure,
                            profileImage: updatedProfile.profileImage,
                        };
                    }
                    return member;
                });
                console.log('New members array:', newMembers);
                return newMembers;
            });
            setSelectedMember(prev => prev ? { ...prev, ...updatedProfile } : null);
            setMembersVersion(v => v + 1);
            console.log('State updates triggered');
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
            email: member.email,
            phone: member.phone,
            about: member.about,
            relationship: member.relationship,
            relationshipType: member.relationshipType,
        },
        isEditing: false
    });

    return  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header Insights */}
        <div style={{ height: '244px', paddingRight: '24px', paddingLeft: '24px' }}>
            <MyopComponent componentId={COMPONENTS_IDS.headerInsights} data={{ userName: userData.name}} />
        </div>

        {/* Content Header */}
        <div style={{  paddingRight: '24px', paddingLeft: '24px', paddingBottom: '16px', height: '40px' }} >
            <MyopComponent
                componentId={COMPONENTS_IDS.tableHeader}
                on={handleCta as any}
            />

        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '0 24px 24px' }}>
            {isTableReady && (
                view === 'table' ?
                    <MyopComponent key={`table-v${membersVersion}`} componentId={COMPONENTS_IDS.table} data={members} on={handleMemberClick as any} />:
                    <MyopComponent key={`cards-v${membersVersion}`} componentId={COMPONENTS_IDS.cardsView} data={members} on={handleMemberClick as any} />
            )}
        </div>

        {/* Edit Profile Modal */}
        {isProfileOpen && selectedMember && (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: isProfileVisible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
                    backdropFilter: isProfileVisible ? 'blur(4px)' : 'blur(0px)',
                    WebkitBackdropFilter: isProfileVisible ? 'blur(4px)' : 'blur(0px)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    zIndex: 1000,
                    transition: 'background-color 300ms ease-out, backdrop-filter 300ms ease-out',
                }}
                onClick={closeProfile}
            >
                <div
                    style={{
                        width: '384px',
                        height: '100%',
                        backgroundColor: '#fff',
                        transform: isProfileVisible ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 300ms ease-out',
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
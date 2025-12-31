import { CreateProfile } from "@myop/CreateProfile";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import type {TeamMember} from '../data/teamMembers.ts';

interface AddMemberProps {
    members: TeamMember[];
    onAddMember: (member: TeamMember) => void;
    isMobileView: boolean;
}

export const AddMember = ({members, onAddMember, isMobileView}: AddMemberProps) => {
    const navigate = useNavigate();

    const managersList = useMemo(() => {
        return members
            .filter(m => m.role === 'Manager' || m.role === 'Senior Member')
            .map(m => ({ id: m.id, name: `${m.name} - ${m.title}` }));
    }, [members]);

    const handleAddProfileCta = (action: string, payload: any): void => {
        if (action === 'cancel' || action === 'back') {
            navigate('/');
        }
        if (action === 'submit' && payload?.formData) {
            const formData = payload.formData;
            const manager = members.find(m => String(m.id) === String(formData.reportsTo));
            const newMember: TeamMember = {
                id: crypto.randomUUID(),
                initials: getInitials(formData.fullName || ''),
                name: formData.fullName || '',
                title: formData.jobTitle || '',
                location: formData.location || '',
                tenure: `${formData.companyTenure || 0}y`,
                experience: `${formData.yearsExperience || 0}y`,
                skills: formData.skills || [],
                role: 'Team',
                avatarColor: getRandomAvatarColor(),
                profileImage: formData.profilePicture || null,
                email: formData.email || '',
                phone: formData.phone || '',
                about: '',
                relationship: manager ? `${formData.fullName} reports to ${manager.name}` : '',
                relationshipType: 'Team member'
            };
            onAddMember(newMember);
            navigate('/');
        }
    };

    return (
        <div className="add-member-container">
            <CreateProfile
                data={{ managersList, isMobileView }}
                on={handleAddProfileCta}
            />
        </div>
    );
};

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function getRandomAvatarColor(): string {
    const colors = [
        '#9B59B6', '#3498DB', '#1ABC9C', '#E74C3C', '#F39C12',
        '#F1C40F', '#2ECC71', '#E67E22', '#16A085', '#8E44AD',
        '#D35400', '#27AE60'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
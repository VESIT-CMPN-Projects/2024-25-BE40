import React, { useState, useEffect } from 'react';
import { Menu, Edit, Save } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../api/profile';
import { ProfileData } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface LayoutContext {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Profile: React.FC = () => {
  const { setIsSidebarOpen } = useOutletContext<LayoutContext>();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const data = await fetchProfile(user.type);
        setProfileData(data);
      }
    };
    loadProfile();
  }, [user]);

  const handleEditSave = async () => {
    if (isEditing) {
      setIsSaving(true);
      await updateProfile(profileData!, user?.type || "PATIENT");
      setIsSaving(false);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const renderField = (label: string, value: string, key: keyof ProfileData) => (
    <div className="flex items-center justify-between border-b border-gray-100 last:border-b-0 pb-6">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <div className="min-w-[192px] flex justify-end">
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setProfileData({ ...profileData!, [key]: e.target.value })}
            className="w-full text-right border-gray-200 text-sm transition-all duration-200 outline-none"
          />
        ) : (
          <span className="text-sm text-gray-900 transition-all duration-200">{value}</span>
        )}
      </div>
    </div>
  );

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold text-gray-900">Profile</h1>
        </div>
        <button
          onClick={handleEditSave}
          disabled={isSaving}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isEditing
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'text-purple-600 hover:bg-purple-50'
            } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-6">
            {user?.type === 'DOCTOR' ? (
              <>
                {renderField('Doctor ID', profileData.doctor_id || '', 'doctor_id')}
                {renderField('Name', profileData.name, 'name')}
                {renderField('Medical Degree', profileData.medical_degree || '', 'medical_degree')}
                {renderField('Speciality', profileData.speciality || '', 'speciality')}
                {renderField('Hospital', profileData.hospital || '', 'hospital')}
              </>
            ) : (
              <>
                {renderField('Name', profileData.name, 'name')}
                {renderField('Age', profileData.age, 'age')}
                {renderField('Gender', profileData.gender, 'gender')}
                {renderField('Weight', profileData.weight, 'weight')}
                {renderField('Blood Group', profileData.blood_group, 'blood_group')}
                {renderField('Profession', profileData.profession, 'profession')}
                {renderField('Medical Conditions', profileData.medical_conditions, 'medical_conditions')}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
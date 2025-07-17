import React, { useState } from 'react';

const UserList = ({ users, selectedUser, setSelectedUser }) => {
    const [activeTab, setActiveTab] = useState('online');

    const renderUsers = () => {
        let filtered = [];

        if (activeTab === 'online') {
            filtered = users.filter((u) => u.online);
        } else if (activeTab === 'offline') {
            filtered = users.filter((u) => !u.online);
        } else {
            filtered = users;
        }

        return (
            <ul className="space-y-2">
                {filtered.map((user) => (
                    <li
                        key={user._id}
                        className={`flex items-center gap-2 cursor-pointer p-1 rounded ${selectedUser?._id === user._id ? 'bg-gray-200' : ''
                            }`}
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className="relative flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full uppercase">
                            {user.username.charAt(0)}
                            {user.online && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                            )}
                        </div>
                        <span>{user.username}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Users</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {['online', 'offline', 'all'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-3 py-1 rounded ${activeTab === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* User List */}
            {renderUsers()}

            {/* Public Chat Button */}
            <button
                className="mt-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded w-full"
                onClick={() => setSelectedUser(null)}
            >
                Public Chat
            </button>
        </div>
    );
};

export default UserList;
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import axios from 'axios';

function UsersTable() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user.role !== 'Admin') return;

        async function fetchUsers() {
            showLoading();
            try {
                const response = await axios.get('/api/users', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setUsers(response.data);
            } catch (err) {
                showToast('error', 'Failed to load users.');
            } finally {
                hideLoading();
            }
        }

        fetchUsers();
    }, [user]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put('/api/users/update-role', { userId, newRole }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
            showToast('success', 'Role updated successfully!');
        } catch (err) {
            showToast('error', 'Failed to update role.');
        }
    };

    const handleResetPassword = async (userId) => {
        const tempPassword = prompt('Enter a temporary password for the user:');

        if (!tempPassword){
            showToast('info', 'Password reset was cancelled.');
            return;
        }

        try {
            await axios.put('/api/users/reset-password', { userId, tempPassword }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            showToast('success', 'Password reset successfully!');
        } catch (err) {
            showToast('error', 'Failed to reset password.');
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')){
            showToast('info', 'User deletion was cancelled.');
            return;
        };

        try {
            await axios.delete(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setUsers(users.filter(user => user.id !== userId));
            showToast('success', 'User deleted successfully!');
        } catch (err) {
            showToast('error', 'Failed to delete user.');
        }
    };

    return(
        <div id='users-table'>
            <h1>Manage Users</h1>
            
            {users.length > 0 ? (
                <div className='table-container'>
                    <table className='users-table'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th colSpan='2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                                            <option value='Visitor'>Visitor</option>
                                            <option value='Exhibitor'>Exhibitor</option>
                                            <option value='Admin'>Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleResetPassword(user.id)}>RESET PASSWORD</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user.id)}>DELETE</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
}

export default UsersTable;
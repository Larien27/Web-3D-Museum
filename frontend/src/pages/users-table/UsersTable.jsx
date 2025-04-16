import { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

function UsersTable() {
    const { showToast } = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                showToast('error', 'Failed to load users.');
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put('/api/users/update-role', { userId, newRole });
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
            await axios.put('/api/users/reset-password', { userId, tempPassword });
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
            await axios.delete(`/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            showToast('success', 'User deleted successfully!');
        } catch (err) {
            showToast('error', 'Failed to delete user.');
        }
    };

    if (loading) return <p>Loading users...</p>;

    return(
        <div id='users-table'>
            <h1>Manage Users</h1>
            
            {users.length > 0 ? (
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
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
                </table>
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
}

export default UsersTable;
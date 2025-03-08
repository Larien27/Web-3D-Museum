import { useEffect, useState } from 'react';
import axios from 'axios';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    });

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put('/api/users/update-role', { userId, newRole });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        } catch (err) {
            setError('Failed to update role.');
        }
    };

    const handleResetPassword = async (userId) => {
        const tempPassword = prompt('Enter a temporary password for the user:');

        if (!tempPassword) {
            alert("Password reset was cancelled.");
            return;
        }

        try {
            await axios.put('/api/users/reset-password', { userId, tempPassword });
            alert('Password reset successfully!');
        } catch (err) {
            alert('Failed to reset password.');
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className='error'>{error}</p>;

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
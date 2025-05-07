import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLoading } from '../../context/LoadingContext';
import axios from 'axios';

function ReportsList() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const { showLoading, hideLoading } = useLoading();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (user.role !== 'Admin') return;
        
        async function fetchReports() {
            showLoading();
            try {
                const response = await axios.get('/api/reports/pending', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setReports(response.data);
            } catch (err) {
                showToast('error', 'Failed to load reports.');
            } finally {
                hideLoading();
            }
        }

        fetchReports();
    }, []);

    const handleResolved = async (reportId) => {
        if (!window.confirm('Are you sure you want to mark this report as resolved?')){
            showToast('info', 'Report resolution was cancelled.');
            return;
        };

        try {
            await axios.patch(`/api/reports/${reportId}/resolve`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setReports(reports.filter(report => report.id !== reportId));
            showToast('success', 'Report marked as resolved!');
        } catch (err) {
            showToast('error', 'Failed to update report.');
        }
    };

    const handleDelete = async (reportId) => {
        if (!window.confirm('Are you sure you want to delete this report?')){
            showToast('info', 'Report deletion was cancelled.');
            return;
        };

        try {
            await axios.delete(`/api/reports/${reportId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setReports(reports.filter(report => report.id !== reportId));
            showToast('success', 'Report deleted successfully!');
        } catch (err) {
            showToast('error', 'Failed to delete report.');
        }
    };

    return(
        <div id='reports-list'>
            <h1>Reported Artefacts</h1>

            {reports.length > 0 ? (
                <table>
                    <tr>
                        <th>Artefact</th>
                        <th>User</th>
                        <th>Reason</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>
                                <Link to={`/artefacts/${report.artefact_id}/`}>{report.title}</Link></td>
                            <td>{report.username}</td>
                            <td>{report.reason}</td>
                            <td>
                                <button onClick={() => handleResolved(report.id)}>MARK AS RESOLVED</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(report.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </table>
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
}

export default ReportsList;
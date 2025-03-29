import { useEffect, useState } from 'react';
import axios from 'axios';

function ReportsList() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchReports() {
            try {
                const response = await axios.get('/api/artefacts/reports');
                setReports(response.data);
            } catch (err) {
                setError('Failed to load reports.');
            } finally {
                setLoading(false);
            }
        }

        fetchReports();
    }, []);

    const handleResolved = async (reportId) => {
        if (!window.confirm('Are you sure you want to mark this report as resolved?')) return;

        try {
            await axios.patch(`/api/artefacts/reports/${reportId}/resolve`);
            setReports(reports.filter(report => report.id !== reportId));
        } catch (err) {
            setError('Failed to update report.');
        }
    };

    const handleDelete = async (reportId) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;

        try {
            await axios.delete(`/api/artefacts/reports/${reportId}`);
            setReports(reports.filter(report => report.id !== reportId));
        } catch (err) {
            setError('Failed to delete report.');
        }
    };

    if (loading) return <p>Loading reports...</p>;
    if (error) return <p className='error'>{error}</p>;

    return(
        <div id='reports-list'>
            <h1>Reported Artefacts</h1>

            {reports.length > 0 ? (
                <table>
                    <tr>
                        <th>Artefact</th>
                        <th>Exhibition</th>
                        <th>Reason</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.title}</td>
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
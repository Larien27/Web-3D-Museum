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
                            <td>EDIT</td>
                            <td>ACCEPT</td>
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
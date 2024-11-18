function ReportsList() {
    return(
        <div id='reports-list'>
            <h1>Reports</h1>
            <table>
                <tr>
                    <th>Artefact</th>
                    <th>Exhibition</th>
                    <th>Comment</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>Artefact No. 1</td>
                    <td>Great Artefacts Only</td>
                    <td>The artefact is not appropriate for this exhibition.</td>
                    <td>EDIT</td>
                    <td>ACCEPT</td>
                </tr>
            </table>
        </div>
    );
}

export default ReportsList;
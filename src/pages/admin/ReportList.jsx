

export default function ReportList({reports}) {
    return ( <div>
        <h1>{"Reports: " + reports.length}</h1>
        {reports.map(report => (
            <div key={report.id}>
                <p>Reason: {report.reason}</p>
            </div>
        ))}
        </div>
    )
}
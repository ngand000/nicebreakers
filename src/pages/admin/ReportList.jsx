

export default function ReportList({reports}) {

    const listStyle = {display: "flex", flexWrap: "wrap"}

    const reasonStyle = {display: "flex", border: "1px solid black", borderRadius: "10px", width: "30%", margin: "1% 1% 1% 1%", fontSize: "3.5vmin", overflowX: "hidden"}

    return ( <div>
        <h1>{"Reports: " + reports.length}</h1>
            <div style={listStyle}>
                {reports.map(report => (
                    <div key={report.id} style={reasonStyle}>
                        <p>{report.reason}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
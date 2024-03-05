import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ReportList from "./ReportList";

const reports = [{id: 1, reason: "bad", postId: 0}, {id: 2, reason: "2", postId: 0}, {id: 3, reason: "yahoo", postId: 0}]

it('test reason 1', () => {
    render(<MemoryRouter>
        <ReportList reports={reports}/>
    </MemoryRouter>)
    expect(screen.getByText(/bad/i)).toBeInTheDocument()
})

it('test reason 2', () => {
    render(<MemoryRouter>
        <ReportList reports={reports}/>
    </MemoryRouter>)
    expect(screen.getByText(/2/i)).toBeInTheDocument()
})

it('test reason 3', () => {
    render(<MemoryRouter>
        <ReportList reports={reports}/>
    </MemoryRouter>)
    expect(screen.getByText(/yahoo/i)).toBeInTheDocument()
})
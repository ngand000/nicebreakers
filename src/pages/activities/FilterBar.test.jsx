import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import FilterBar from "./FilterBar";

it('testAllActivityFilters', () => {
    render(<MemoryRouter>
        <FilterBar removeFilter={() => {}} openPopup={() => {}} setEndorsed={() => {}} activities={true} />
    </MemoryRouter>)
    expect(screen.getByText(/Group Size/i)).toBeInTheDocument()
    expect(screen.getByText(/Ages/i)).toBeInTheDocument()
    expect(screen.getByText(/Duration\(min\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Endorsed/i)).toBeInTheDocument()
})

it('testEndorsed', () => {
    let bool = false
    render(<MemoryRouter>
        <FilterBar removeFilter={() => {}} openPopup={() => {}} setEndorsed={() => {bool = true}} activities={true} />
    </MemoryRouter>)
    const endorsed = screen.getByText(/Endorsed/i)
    if (bool) {
        throw "failed"
    }
    endorsed.click()
    if (!bool) {
        throw "failed"
    }
})

it('testOtherClick', () => {
    let bool = false
    render(<MemoryRouter>
        <FilterBar removeFilter={() => {}} openPopup={() => {bool = true}} setEndorsed={() => {}} activities={true} />
    </MemoryRouter>)
    const endorsed = screen.getByText(/Ages/i)
    if (bool) {
        throw "failed"
    }
    endorsed.click()
    if (!bool) {
        throw "failed"
    }
})

it('testAllQuestionFilters', () => {
    let bool = true
    render(<MemoryRouter>
        <FilterBar removeFilter={() => {}} openPopup={() => {}} setEndorsed={() => {}} />
    </MemoryRouter>)
    try {
        screen.getByText(/Group Size/i)
        bool = false
    } catch (e) {

    }
    expect(screen.getByText(/Ages/i)).toBeInTheDocument()
    try {
        screen.getByText(/Duration\(min\)/i)
        bool = false
    } catch (e) {

    }
    expect(screen.getByText(/Endorsed/i)).toBeInTheDocument()
    if (!bool) {
        throw "failed"
    }
})
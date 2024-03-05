import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Filter from "./Filter";

it('test name', () => {
    render(<MemoryRouter>
        <Filter color={"red"} onClick={() => {}} removeFilter={() => {}} label={"Filter"} />
    </MemoryRouter>)
    expect(screen.getByText(/Filter/i)).toBeInTheDocument()
})

it('test click', () => {
    let bool = false
    render(<MemoryRouter>
        <Filter color={"red"} onClick={() => {bool = true}} removeFilter={() => {}} label={"Filter"} />
    </MemoryRouter>)
    const filter = screen.getByText(/Filter/i)
    if (bool) {
        throw "failed"
    }
    filter.click()
    if (!bool) {
        throw "failed"
    }
})

it('test second click', () => {
    let bool = false
    render(<MemoryRouter>
        <Filter color={"red"} onClick={() => {}} removeFilter={() => {bool = true}} label={"Filter"} />
    </MemoryRouter>)
    const filter = screen.getByText(/Filter/i)
    filter.click()
    filter.click()
    if (bool) {
        throw "failed"
    }
})
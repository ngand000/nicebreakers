import { render, screen } from '@testing-library/react';
import FilterEntry from "./FilterEntry";
import {MemoryRouter} from "react-router-dom";
import * as assert from "assert";



it('testTitle', () => {
    render(<MemoryRouter>
        <FilterEntry filter={"Age"} />
    </MemoryRouter>)
    expect(screen.getByText(/Filter by Age/i)).toBeInTheDocument()
});

it('testClose', () => {
    render(<MemoryRouter>
        <FilterEntry filter={"Age"} />
    </MemoryRouter>)
    expect(screen.getByText(/Close/i)).toBeInTheDocument()
});

it('testOnClose', () => {
    let bool = false
    render(<MemoryRouter>
        <FilterEntry filter={"Age"} onClose={() => {bool = true}} />
    </MemoryRouter>)
    const close = screen.getByText(/Close/i)
    if (bool) {
        throw "failed"
    }
    close.click()
    if (!bool) {
        throw "failed"
    }
});

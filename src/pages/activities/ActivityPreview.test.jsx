import { render, screen } from '@testing-library/react';
import ActivityPreview from "./ActivityPreview";
import {MemoryRouter} from "react-router-dom";

const act = {name: "ActivityName", likes: 32, playerCount: [3, 20], duration: [10, 15], abstract: "This is an activity"}

it('testActivityName', () => {
    render(<MemoryRouter>
        <ActivityPreview activity={act} />
    </MemoryRouter>)
    expect(screen.getByText(/ActivityName/i)).toBeInTheDocument()
})

it('testActivityLikes', () => {
    render(<MemoryRouter>
        <ActivityPreview activity={act} />
    </MemoryRouter>)
    expect(screen.getByText(/32/i)).toBeInTheDocument()
})

it('testActivityGroupSize', () => {
    render(<MemoryRouter>
        <ActivityPreview activity={act} />
    </MemoryRouter>)
    expect(screen.getByText(/3-20/i)).toBeInTheDocument()
})

it('testActivityDuration', () => {
    render(<MemoryRouter>
        <ActivityPreview activity={act} />
    </MemoryRouter>)
    expect(screen.getByText(/3-20/i)).toBeInTheDocument()
})

it('testActivityAbstract', () => {
    render(<MemoryRouter>
        <ActivityPreview activity={act} />
    </MemoryRouter>)
    expect(screen.getByText(/This is an activity/i)).toBeInTheDocument()
})
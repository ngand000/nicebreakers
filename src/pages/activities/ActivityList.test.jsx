import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ActivityList from "./ActivityList";

const activities = [{name: "ActivityName", likes: 32, playerCount: [3, 20], duration: [10, 15], abstract: "This is an activity"},
    {name: "Activity2", likes: 6, playerCount: [2, 10], duration: [1, 5], abstract: "This is not an activity"}]

it('testActivityNames', () => {
    render(<MemoryRouter>
        <ActivityList activities={activities}/>
    </MemoryRouter>)
    expect(screen.getByText(/ActivityName/i)).toBeInTheDocument()
    expect(screen.getByText(/Activity2/i)).toBeInTheDocument()
})

it('testActivityAbstracts', () => {
    render(<MemoryRouter>
        <ActivityList activities={activities}/>
    </MemoryRouter>)
    expect(screen.getByText(/This is an activity/i)).toBeInTheDocument()
    expect(screen.getByText(/This is not an activity/i)).toBeInTheDocument()
})

it('testAdmin', () => {
    let bool = false
    render(<MemoryRouter>
        <ActivityList activities={activities} admin={() => {bool = true}}/>
    </MemoryRouter>)
    const a1 = screen.getByText(/This is an activity/i)
    if (bool) {
        throw "failed"
    }
    a1.click()
    if (!bool) {
        throw "failed"
    }
})
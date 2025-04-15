import { PaymentForm } from "./PaymentForm"
import { waitFor, render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'

describe("Tests for the PaymentForm component", () => {

    it("Renders the header, inputs, and dropdowns", () => {
        render(<PaymentForm setPayments={vi.fn()}/>)
        const button = screen.getByText(/Make Payment/i)
        fireEvent.click(button)

        expect(screen.getByText("Payment Date")).toBeInTheDocument()
        expect(screen.getByText(/Sender/)).toBeInTheDocument()
        expect(screen.getByText(/Receiver/)).toBeInTheDocument()
        expect(screen.getByText(/Amount/)).toBeInTheDocument()
        expect(screen.getByText(/Currency/)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Submit/ })).toBeInTheDocument()
    })

    it("Populates the sender dropdown when user data is called", async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: {data: [{id: '1', name: 'Ryan'}, {id: '2', name: 'Sparks'}]}
        })

        render(<PaymentForm setPayments={vi.fn()}/>)
        const button = screen.getByText(/Make Payment/i)
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByRole('option', {name: 'Ryan'})).toBeInTheDocument()
        })
        
    })
})
    
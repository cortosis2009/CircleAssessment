import { SearchPayments } from "./SearchPayments"
import { fireEvent, render, screen } from '@testing-library/react'
import { twoPayments } from '../Utils/testutils'

describe("Tests for the SearchPayments component", () => {

    it("Renders the header, search bar, and dropdowns", () => {
        render(<SearchPayments payments={[]}/>)
        expect(screen.getByRole('heading', {name: /Search Payments/})).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/search payment history/i)).toBeInTheDocument()
        expect(screen.getByText(/sort by/i)).toBeInTheDocument()
        expect(screen.getByText(/currency/i)).toBeInTheDocument()
        expect(screen.getByText(/type in the search bar/i)).toBeInTheDocument
    })

    it("Searches data properly", () => {
        render(<SearchPayments payments={twoPayments}/>)

        const input = screen.getByPlaceholderText(/search payment history/i)
        fireEvent.change(input, {target: {value: '123'}})

        expect(screen.queryByText('123')).toBeInTheDocument()
        expect(screen.queryByText('456')).not.toBeInTheDocument()
    })

    it("Filters data properly by currency", async () => {
        render(<SearchPayments payments={twoPayments}/>)

        const input = screen.getByPlaceholderText(/search payment history/i)
        fireEvent.change(input, {target: {value: 'Test'}})

        const dropdown = screen.getByText(/currency/i).closest('select') //select nearest to the text
        fireEvent.change(dropdown!, {target: {value: 'USD'}})

        expect(await screen.findByText('123')).toBeInTheDocument()
        expect(screen.queryByText('456')).not.toBeInTheDocument()
    })

    it("Sorts data properly by amount", async () => {
        render(<SearchPayments payments={twoPayments}/>)

        const input = screen.getByPlaceholderText(/search payment history/i)
        fireEvent.change(input, {target: {value: 'Test'}})

        const dropdown = screen.getByText(/sort by/i).closest('select') //select nearest to the text
        fireEvent.change(dropdown!, {target: {value: 'Amount asc'}}) //why

        const results1 = await screen.findAllByText(/Amount:/)
        expect(results1[0]).toHaveTextContent(/123/)
        expect(results1[1]).toHaveTextContent(/456/)

        fireEvent.change(dropdown!, {target: {value: 'Amount desc'}}) //why

        const results2 = await screen.findAllByText(/Amount:/)
        expect(results2[0]).toHaveTextContent(/456/)
        expect(results2[1]).toHaveTextContent(/123/)
    })
})
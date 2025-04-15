import { MostRecent } from "./MostRecent"
import { render, screen } from '@testing-library/react'
import * as DashboardTypes from '../Types/ryantypes'
import { payments, sender, receiver, twoPayments } from '../Utils/testutils'

describe("Tests for the MostRecent component", () => {

    it("Renders the header with no payment content", () => {
        render(<MostRecent payments={[]}/>)
        expect(screen.getByRole('heading', {name: 'Recent Payments'})).toBeInTheDocument()
        expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    })

    it("Only renders 25 payments at most", () => {
        render(<MostRecent payments={payments}/>)
        expect(screen.queryAllByRole('listitem')).toHaveLength(25)
    })

    it("Payment info displayed correctly", () => {
        const singlePayment: DashboardTypes.sendPaymentInfo[] = [{
            id: '234',
            date: new Date().toISOString(),
            sender: sender,
            receiver: receiver,
            amount: '34534',
            currency: 'BTC',
            memo: 'test memo'
        }]
        render(<MostRecent payments={singlePayment}/>)
        expect(screen.getByText(/34534/)).toBeInTheDocument()
        expect(screen.getByText(/Test Sender/)).toBeInTheDocument()
        expect(screen.getByText(/Test Receiver/)).toBeInTheDocument()
        expect(screen.getByText(/BTC/)).toBeInTheDocument()
    })

    it("Displays the most recent payment first", () => {
        render(<MostRecent payments={twoPayments}/>)
        const listitems = screen.getAllByRole('listitem')
        expect(listitems[0]).toHaveTextContent('BTC')
        expect(listitems[1]).toHaveTextContent('USD')
    })
})
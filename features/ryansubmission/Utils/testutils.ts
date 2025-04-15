import * as DashboardTypes from '../Types/ryantypes'
import { User } from '../../../packages/server/users/users'

export const payments: DashboardTypes.sendPaymentInfo[] = []
export const sender: User = {
    id: 23423,
    name: 'Test Sender'
}
export const receiver: User = {
    id: 234223,
    name: 'Test Receiver'
}
for (let i = 0; i < 30; i++ ) {
    payments.push({
        id: `${i}`,
        date: new Date().toISOString(),
        sender: sender,
        receiver: receiver,
        amount: `${i}`,
        currency: 'BTC',
        memo: 'test memo'
    })
}

export const twoPayments: DashboardTypes.sendPaymentInfo[] = [
    {id: '44', date: new Date().toISOString(), sender: sender, receiver: receiver, amount: '123', currency: 'USD', memo: ''},
    {id: '55', date: new Date().toISOString(), sender: sender, receiver: receiver, amount: '456', currency: 'BTC', memo: ''}

]
    
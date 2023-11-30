import { isOvernight, isSunday } from "../src/RideCalculator"

test('Deve testar se é de noite', function name() {
    const segment = { distance: 10, date: new Date('2021-03-07T23:00:00')}
    expect(isOvernight(segment)).toBeTruthy();
})

test('Deve testar se é domingo', function name() {
    const segment = { distance: 10, date: new Date('2021-03-07T10:00:00')}
    expect(isSunday(segment)).toBeTruthy();
})
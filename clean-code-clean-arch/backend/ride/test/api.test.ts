import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
}

test('Deve fazer o calculo de preco de uma corrida durante o dia', async function () {
    const input = {
        segments: [
            { distance: 10, date: '2021-03-01T10:00:00'}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input)
    const output = response.data;
    expect(output.price).toBe(21);
});


test('Deve retornar um erro se a distancia for invalida', async function () {
    const input = {
        segments: [
            { distance: -10, date: '2021-03-01T10:00:00'}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input)
    expect(response.status).toBe(422);
    expect(response.data).toBe('Invalid distance');
});
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
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    expect(output.price).toBe(21);
});


test('Deve retornar um erro se a distancia for invalida', async function () {
    const input = {
        segments: [
            { distance: -10, date: '2021-03-01T10:00:00'}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    expect(response.status).toBe(422);
    expect(response.data).toBe('Invalid distance');
});

test('Deve cadastrar o passageiro', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
    const outuputCreatePassenger = responseCreatePassenger.data;
    expect(outuputCreatePassenger.passengerId).toBeDefined();

    const response = await axios.get(`http://localhost:3000/passengers/${outuputCreatePassenger.passengerId}`);
    expect(response.data.name).toBe("John Doe");
    expect(response.data.email).toBe("john.doe@gmail.com");
    expect(response.data.document).toBe("83432616074");
});
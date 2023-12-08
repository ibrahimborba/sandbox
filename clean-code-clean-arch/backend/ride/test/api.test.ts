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
    const response = await axios.post("http://localhost:3000/passengers", input);
    const output = response.data;
    expect(output.passengerId).toBeDefined();
});

test('Não deve cadastrar o passageiro com cpf errado', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076"
    };
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe('Invalid cpf');
});

test('Deve obter o passageiro', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074"
    };
    const responseCreate = await axios.post("http://localhost:3000/passengers", input);
    const outputCreate = responseCreate.data;
    const responseGet = await axios.get(`http://localhost:3000/passengers/${outputCreate.passengerId}`);
    expect(responseGet.data.name).toBe("John Doe");
    expect(responseGet.data.email).toBe("john.doe@gmail.com");
    expect(responseGet.data.document).toBe("83432616074");
});

test('Deve cadastrar o motorista', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:3000/drivers", input);
    const output = response.data;
    expect(output.driverId).toBeDefined();
});

test('Não deve cadastrar o motorista com cpf errado', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616076",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:3000/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe('Invalid cpf');
});

test('Deve obter o passageiro', async function () {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const responseCreate = await axios.post("http://localhost:3000/drivers", input);
    const outputCreate = responseCreate.data;
    const responseGet = await axios.get(`http://localhost:3000/drivers/${outputCreate.driverId}`);
    expect(responseGet.data.name).toBe("John Doe");
    expect(responseGet.data.email).toBe("john.doe@gmail.com");
    expect(responseGet.data.document).toBe("83432616074");
    expect(responseGet.data.carPlate).toBe("AAA9999");
});
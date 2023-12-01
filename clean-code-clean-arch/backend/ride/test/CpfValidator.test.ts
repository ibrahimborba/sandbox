import Cpf from "../src/Cpf";

test.each([
    "83432616074",
    "74587887803",
    "87175659520"
])('Deve testar se um cpf é válido', function (value: string) {
    const cpf = new Cpf(value);
    expect(cpf.value).toBe(value);    
});

test.each([
    "83432616076",
    "99999999999",
    "834326160",
    "",
])('Deve testar se um cpf é inválido', function (value: string) {
    expect(() => new Cpf(value)).toThrow(new Error("Invalid cpf"));
});
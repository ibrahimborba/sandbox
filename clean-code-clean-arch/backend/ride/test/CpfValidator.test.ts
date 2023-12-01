import { validate } from "../src/cpf"

test.each([
    "83432616074",
    "74587887803",
    "87175659520"
])('Deve testar se um cpf é válido', function (cpf: string) {
    const isValid = validate(cpf)
    expect(isValid).toBeTruthy();    
});

test.each([
    "83432616076",
    "99999999999",
    "834326160",
    "",
])('Deve testar se um cpf é inválido', function (cpf: string) {
    const isValid = validate(cpf)
    expect(isValid).toBeFalsy();    
});
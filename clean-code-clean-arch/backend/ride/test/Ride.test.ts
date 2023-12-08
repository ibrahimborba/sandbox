import axios from 'axios';
import { calculate } from '../src/RideCalculator';
import Ride from '../src/Ride';

test('Deve fazer o calculo de preco de uma corrida durante o dia', function () {
    const ride = new Ride();
    ride.addSegment(10, new Date('2021-03-01T10:00:00'))
    expect(ride.calculate()).toBe(21);
});

test('Deve fazer o calculo de preco de uma corrida durante a noite', function () {
    const ride = new Ride();
    ride.addSegment(10, new Date('2021-03-01T23:00:00'))
    expect(ride.calculate()).toBe(39);
});

test('Deve fazer o calculo de preco de uma corrida no domingo de dia', function () {
    const ride = new Ride();
    ride.addSegment(10, new Date('2021-03-07T10:00:00'))
    expect(ride.calculate()).toBe(29);
});

test('Deve fazer o calculo de preco de uma corrida no domingo de noite', function () {
    const ride = new Ride();
    ride.addSegment(10, new Date('2021-03-07T23:00:00'))
    expect(ride.calculate()).toBe(50);
});

test('Deve retornar erro se a distancia for invalida', function () {
    const ride = new Ride();
    expect(() => ride.addSegment(-10, new Date('2021-03-01T10:00:00'))).toThrow(new Error('Invalid distance'));
});

test('Deve retornar erro se a data for invalida', function () {
    const ride = new Ride();
    expect(() => ride.addSegment(10, new Date('data'))).toThrow(new Error('Invalid date'));
});

test('Deve ter o preco minimo de 10', function () {
    const ride = new Ride();
    ride.addSegment(1, new Date('2021-03-01T10:00:00'));
    expect(ride.calculate()).toBe(10);
});

test('Deve fazer o calculo de preco de uma corrida com multiplos segmentos', function () {
    const ride = new Ride();
    ride.addSegment(10, new Date('2021-03-01T10:00:00'));
    ride.addSegment(10, new Date('2021-03-01T10:00:00'));
    expect(ride.calculate()).toBe(42);
});
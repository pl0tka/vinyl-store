import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, it } from 'node:test';
import { OrderService } from './order.service.js';
import { OrderRepository } from './order.repository.js';
import { VinylService } from '../vinyl/vinyl.service.js';
import assert from 'node:assert';
import { ERROR_MESSAGES } from '../../common/constants/constants.js';
import { OrderStatus } from '../../common/constants/order-status.enum.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { LoggerService } from '../../logger/logger.service.js';

let orderService: OrderService;
let mockOrderRepository: OrderRepository;
let mockVinylService: VinylService;
let mockLoggerService: LoggerService;

beforeEach(() => {
    mockOrderRepository = {
        create: async (userId: string, vinyls: any[], price: number) => {
            return {
                id: 1,
                price,
            };
        },
        updateStatus: async (orderId: string, status: OrderStatus) => {
            return;
        },
    } as unknown as OrderRepository;

    mockVinylService = {
        findById: async (id: string) => {
            if (id === 'vinyl-id-1') {
                return { id: 'vinyl-id-1', price: 25 };
            } else {
                return null;
            }
        },
    } as unknown as VinylService;

    mockLoggerService = {
        setContext: () => {},
        logToDB: () => {},
        error: () => {},
    } as unknown as LoggerService;

    orderService = new OrderService(
        mockOrderRepository,
        mockVinylService,
        mockLoggerService
    );
});

describe('OrderService', () => {
    describe('create', () => {
        const invalidOrderDto: CreateOrderDto = {
            vinyls: [{ id: 2, count: 1 }],
        };

        it('should throw NotFoundException if vinyl does not exist', async () => {
            try {
                await orderService.create('user-id-1', invalidOrderDto);
            } catch (err) {
                assert.ok(err instanceof NotFoundException);
                assert.strictEqual(err.message, ERROR_MESSAGES.VINYL_NOT_FOUND);
            }
        });
    });

    describe('updateStatus', () => {
        it('should update the order status when a valid order id and status are provided', async () => {
            await assert.doesNotReject(async () => {
                await orderService.updateStatus(
                    'order-id-1',
                    OrderStatus.SUCCESS
                );
            });
        });

        it('should handle errors if update fails)', async () => {
            await assert.doesNotReject(async () => {
                await orderService.updateStatus(
                    'invalid-order-id',
                    OrderStatus.FAILED
                );
            });
        });
    });
});

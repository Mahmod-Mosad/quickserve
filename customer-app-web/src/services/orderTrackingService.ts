import type { DriverInfo } from '../types/driver';

// ⚠️ MOCK FUNCTION — هتتستبدل بـ GET /orders/:id/driver لما الباك يخلص
export async function getDriverInfo(_orderId: string): Promise<DriverInfo> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: 'driver-1',
    name: 'Ahmed',
    rating: 4.8,
    deliveryCount: 1200,
  };
}
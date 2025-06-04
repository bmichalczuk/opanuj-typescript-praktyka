type MessageType = 'orderCreated' | 'orderCancelled';
type MessagePayload = OrderCreatedMessage['payload'] | OrderCancelledMessage['payload'];

interface Message<T extends OrderCancelledMessage | OrderCreatedMessage> {
  type: T['type'];
  payload: T['payload'];
}
interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

export class MessageBus {
  private subscribers: {
    orderCreated: ((message: OrderCreatedMessage) => void)[];
    orderCancelled: ((message: OrderCancelledMessage) => void)[];
  };

  private orders: Map<string, Order>;
  constructor() {
    this.subscribers = {
      orderCreated: [],
      orderCancelled: [],
    };

    this.orders = new Map();
  }

  subscribe<T extends OrderCancelledMessage | OrderCreatedMessage>(
    type: T['type'],
    subscriber: (message: Message<T>) => void,
  ): void {
    if (type === 'orderCreated') {
      this.subscribers.orderCreated.push(subscriber);
    } else if (type === 'orderCancelled') {
      this.subscribers.orderCancelled.push(subscriber);
    } else {
      throw new Error(`Unknown message type: ${type}`);
    }
    //throw new Error('Not implemented');
  }

  publish<T extends OrderCancelledMessage | OrderCreatedMessage>(message: T): void {
    // throw new Error('Not implemented');
    if (message.type === 'orderCreated') {
      this.orders.set(message.payload.orderId, message.payload);
      this.subscribers.orderCreated.forEach((subscriber) => {
        subscriber(message);
      });
      return;
    }
    if (message.type === 'orderCancelled') {
      this.subscribers.orderCancelled.forEach((subscriber) => {
        subscriber(message);
      });
      return;
    }
  }
  getOrderDetails(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    return order.items;
  }
}

export class InventoryStockTracker {
  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message: OrderCreatedMessage) => {
      message.payload.items.forEach((item) => {
        if (this.stock[item.productId] > item.quantity) {
          this.stock[item.productId] -= item.quantity;
        } else {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }
      });
    });

    this.bus.subscribe<OrderCancelledMessage>(
      'orderCancelled',
      (message: OrderCancelledMessage) => {
        const orderItems = this.bus.getOrderDetails(message.payload.orderId);
        // if (!this.stock[message.payload.orderId]) {
        //    throw new Error(`Order ${message.payload.orderId} not found`);
        // }
        orderItems.forEach((item) => {
          this.stock[item.productId] += item.quantity;
        });
      },
    );
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}

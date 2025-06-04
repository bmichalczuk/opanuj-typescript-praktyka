type MessageType = 'orderCreated' | 'orderCancelled';

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

export class MessageBus<T extends OrderCreatedMessage, K extends OrderCancelledMessage> {
  private subscribers: {
    [type in MessageType]?: ((message: T | K) => void)[];
  };

  constructor() {
    this.subscribers = {
      orderCreated: [],
      orderCancelled: [],
    };
  }

  subscribe<Z extends T | K>(type: MessageType, subscriber: (message: Message<Z>) => void): void {
    this.subscribers[type]?.push(subscriber); //??
  }

  publish(message: T | K): void {
    this.subscribers[message.type]?.forEach((subscriber) => {
      subscriber(message);
    });
  }
}

export class InventoryStockTracker {
  constructor(
    private bus: MessageBus<OrderCreatedMessage, OrderCancelledMessage>,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    //throw new Error('Not implemented');
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', (message) => {
      message.payload.items?.forEach((item) => {
        this.stock[item.productId] = (this.stock[item.productId] || 0) - item.quantity;
      });
    });

    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', (message) => {
      this.stock[message.payload.orderId] = this.stock[message.payload.orderId] + 1;
      console.log(this.stock); // Assuming quantity is 1 for cancellation
    });
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}

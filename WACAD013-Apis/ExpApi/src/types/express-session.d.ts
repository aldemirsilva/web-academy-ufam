import "express-session";

declare module "express-session" {
  interface CartItem {
    purchaseId: string;
    productId: string;
    quantity: number;
  }

  interface SessionData {
    uid: string;
    userTypeId: string;
    purchaseId: string;
    cart: CartItem[];
  }
}

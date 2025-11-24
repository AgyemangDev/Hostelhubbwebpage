# Orders Data Structure in Firestore

This document outlines the data structure for the `orders` collection in Firestore.

## Collection Name

`orders`

## Document ID

Each document will have a unique, auto-generated Firestore document ID.

## Document Fields

An order document will contain the following fields:

| Field Name | Data Type | Description | Example |
|---|---|---|---|
| `orderId` | `string` | The unique ID of the order. This will be the same as the document ID. | `vY3x...` |
| `userId` | `string` | The ID of the user who placed the order. | `uSeR...` |
| `sellerId` | `string` | The ID of the seller this order is for. This will be used to query orders for a specific seller. | `sElLeR...` |
| `items` | `array` | An array of objects, where each object represents a product in the order. | `[{ productId: "pRoD...", name: "Product A", quantity: 2, price: 100 }]` |
| `totalPrice` | `number` | The total price of the order. | `200` |
| `status` | `string` | The current status of the order. Can be one of: 'Pending', 'Processing', 'Completed', 'Cancelled'. | `'Pending'` |
| `createdAt` | `timestamp` | The timestamp of when the order was created. | `firebase.firestore.Timestamp.now()` |
| `shippingAddress`| `object` | The shipping address of the user. | `{ name: "John Doe", address: "123 Main St", city: "Anytown", zip: "12345" }` |
| `paymentDetails` | `object` | Details about the payment. | `{ method: "Credit Card", transactionId: "tRaNs..." }` |

# Conference Registration API Documentation

This document provides a detailed overview of the API endpoints for the conference registration backend application.

## Base URL

All API endpoints are prefixed with `/api`.

---

## 1. Authentication (`/api`)

These endpoints handle user authentication, registration, and profile management.

### `POST /api/signup`

- **Description**: Registers a new user account.
- **Auth**: Public
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "captchaInput": "string"
  }
  ```
- **Response (Success `201`)**:
  - Sets an `auth_token` HTTP-only cookie.
  - Returns: `{ "message": "User created successfully", "data": { "registrationId": "REG..." } }`
- **Response (Error)**: `400` for invalid CAPTCHA, existing user, or missing fields.

### `POST /api/login`

- **Description**: Logs in a user.
- **Auth**: Public
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (Success `200`)**:
  - Sets an `auth_token` HTTP-only cookie.
  - Returns: `{ "message": "Login successful", "user": { ... } }`
- **Response (Error)**: `400` or `401` for invalid credentials.

### `POST /api/logout`

- **Description**: Logs out the currently authenticated user.
- **Auth**: User
- **Response (Success `200`)**:
  - Clears the `auth_token` cookie.
  - Returns: `{ "message": "Logged out" }`

### `GET /api/me`

- **Description**: Retrieves the profile of the currently authenticated user.
- **Auth**: User
- **Response (Success `200`)**: User object.
- **Response (Error)**: `404` if the user is not found.

### `POST /api/change-password`

- **Description**: Changes the password for the authenticated user.
- **Auth**: User
- **Body**:
  ```json
  {
    "newPassword": "string"
  }
  ```
- **Response (Success `200`)**: `{ "message": "Password changed successfully" }`
- **Response (Error)**: `400` if the new password is too short.

### `POST /api/forgot-password`

- **Description**: Resets a user's password and sends the new one via email.
- **Auth**: Public
- **Body**: `{ "email": "string" }`
- **Response (Success `200`)**: `{ "message": "New password generated & sent to your email" }`
- **Response (Error)**: `404` if the user is not found.

### `POST /api/upload-profile`

- **Description**: Uploads or updates the profile image for the authenticated user.
- **Auth**: User
- **Body**: `FormData` with a single field `profileImage` containing the image file.
- **Response (Success `200`)**: `{ "message": "Profile image uploaded successfully", "user": { ... } }`
- **Response (Error)**: `400` if no image file is provided.

### `GET /api/captcha`

- **Description**: Generates an SVG CAPTCHA image.
- **Auth**: Public
- **Response (Success `200`)**:
  - Returns an SVG image.
  - Sets a `captcha_text` HTTP-only cookie for verification.

---

## 2. Registration (`/api/registeration`)

These endpoints manage the detailed conference registration process for a user.

### `POST /api/registeration/register`

- **Description**: Submits the multi-step registration form data for the authenticated user.
- **Auth**: User
- **Body**: A JSON object containing all the fields from the registration form.
- **Response (Success `201`)**: `{ "message": "Registration successful", "registeredUser": { ... } }`
- **Response (Error)**: `400` if the user is already registered or for validation errors.

### `GET /api/registeration/my-registration`

- **Description**: Retrieves the detailed registration data for the authenticated user.
- **Auth**: User
- **Response (Success `200`)**: The user's full registration data object.
- **Response (Error)**: `404` if no registration is found for the user.

---

## 3. Payments (`/api/payment`)

Endpoints for handling payments, primarily through Razorpay.

### `POST /api/payment/create-order`

- **Description**: Creates a new payment order with Razorpay.
- **Auth**: User
- **Body**: `{ "amount": number }` (amount in the smallest currency unit, e.g., paise for INR).
- **Response (Success `200`)**: The Razorpay order object.
- **Response (Error)**: `400` if the amount is invalid.

### `POST /api/payment/record-payment`

- **Description**: Verifies and records a payment after it has been completed on the client-side with Razorpay.
- **Auth**: User
- **Body**:
  ```json
  {
    "razorpayPaymentId": "string",
    "razorpayOrderId": "string",
    "razorpaySignature": "string",
    "amount": number
  }
  ```
- **Response (Success `201`)**: `{ "success": true, "payment": { ... } }`
- **Response (Error)**: `400` for invalid signature or missing details.

---

## 4. Announcements (`/api/announcements`)

Endpoints for creating and managing announcements.

### `GET /api/announcements/my`

- **Description**: Retrieves all announcements visible to the authenticated user.
- **Auth**: User
- **Response (Success `200`)**: An array of announcement objects.

### `POST /api/announcements/create-announcement`

- **Description**: Creates a new announcement as a draft.
- **Auth**: Admin
- **Body**:
  ```json
  {
    "title": "string",
    "body": "string",
    "audience": "string"
  }
  ```
- **Response (Success `201`)**: The newly created announcement object.
- **Response (Error)**: `400` for missing fields.

### `GET /api/announcements/get-announcements`

- **Description**: Retrieves all announcements (for the admin panel).
- **Auth**: Admin
- **Response (Success `200`)**: An array of all announcement objects.

### `POST /api/announcements/send-announcement/:id`

- **Description**: Sends a draft announcement to the specified audience via email.
- **Auth**: Admin
- **URL Params**: `id` - The ID of the announcement to send.
- **Response (Success `200`)**: The updated announcement object with `status: "sent"`.
- **Response (Error)**: `404` if not found, `400` if already sent.

---

## 5. Admin (`/api/admin`)

These endpoints are restricted to users with the `admin` role.

### `GET /api/admin/users`

- **Description**: Retrieves a paginated list of all users with their basic registration data.
- **Auth**: Admin
- **Query Params**:
  - `page` (number, optional, default: 1)
  - `limit` (number, optional, default: 10)
- **Response (Success `200`)**:
  ```json
  {
    "users": [ ... ],
    "pagination": { ... }
  }
  ```

### `PATCH /api/admin/edit-user/:id`

- **Description**: Updates a user's details.
- **Auth**: Admin
- **URL Params**: `id` - The ID of the user to edit.
- **Body**: A JSON object with the fields to update (e.g., `{ "name": "New Name" }`).
- **Response (Success `200`)**: `{ "message": "User updated successfully", "updatedUser": { ... } }`
- **Response (Error)**: `404` if the user is not found.

### `DELETE /api/admin/delete-user/:id`

- **Description**: Deletes a user from the database.
- **Auth**: Admin
- **URL Params**: `id` - The ID of the user to delete.
- **Response (Success `200`)**: `{ "message": "User deleted successfully", "deletedUser": { ... } }`
- **Response (Error)**: `404` if the user is not found.

### `GET /api/admin/paymentstatus`

- **Description**: Retrieves a paginated and filterable list of all payments.
- **Auth**: Admin
- **Query Params**:
  - `page` (number, optional, default: 1)
  - `limit` (number, optional, default: 10)
  - `status` (string, optional): "Success", "Pending", or "Failed"
  - `from` (string, optional): Start date (e.g., "YYYY-MM-DD")
  - `to` (string, optional): End date (e.g., "YYYY-MM-DD")
  - `user` (string, optional): Search by user name, email, or ID.
- **Response (Success `200`)**:
  ```json
  {
    "payments": [ ... ],
    "pagination": { ... }
  }
  ```

### `GET /api/admin/users-registration-data/:id`

- **Description**: Retrieves the full registration details for a specific user.
- **Auth**: Admin
- **URL Params**: `id` - The ID of the user.
- **Response (Success `200`)**: The full registration data object for the specified user.
- **Response (Error)**: `404` if no registration data is found.

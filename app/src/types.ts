export type Futsal = {
  id: number;
  name: string;
  location: string;
  imageURL: string;
};

export interface FutsalListResponse {
  data: Futsal[];
  status: number;
  message: string;
}

export interface FutsalResponse {
  data: Futsal;
  status: number;
  message: string;
}

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface SlotListResponse {
  status: number;
  message: string;
  data: Slot[];
}

export interface Booking {
  id: number;
  futsalId: number;
  timeSlotId: number;
  bookingDate: string;
  customerName: string;
  phone?: string;
  status: string;
  createdAt: string;
}

export interface BookingResponse {
  status: number;
  message: string;
  data: Booking;
}

export type FutsalInput = Futsal;

export type FutsalUpdateInput = Partial<Futsal>;

// For updating a booking partially
export type BookingUpdateInput = Partial<{
  futsalId: number;
  timeSlotId: number;
  bookingDate: string;
  customerName: string;
  phone?: string;
  status: string;
}>;

//users
export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
};

export interface UserListResponse {
  data: User[];
  status: number;
  message: string;
}

export interface UserResponse {
  data: User;
  status: number;
  message: string;
}

export type UserInput = {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

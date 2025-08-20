export type Futsal = {
  id: number,
  name: string;
  location: string;
  imageURL: string;
};

export interface FutsalListResponse {
  data: Futsal[],
  status: number,
  message: string
}

export interface FutsalResponse {
  data: Futsal,
  status: number,
  message: string
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


export type FutsalUpdateInput = Partial<Futsal>

// For updating a booking partially
export type BookingUpdateInput = Partial<{
  futsalId: number;
  timeSlotId: number;
  bookingDate: string;
  customerName: string;
  phone?: string;
  status: string;
}>;

import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '../../entities/flight';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: State;
}

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export const reducer = createReducer(
  initialState,
  // on(FlightBookingActions.loadFlightBookings, (state) => state)

  on(FlightBookingActions.flightsLoaded, (state, action): State => {
    const flights = action.flights;
    return { ...state, flights };
  })
);

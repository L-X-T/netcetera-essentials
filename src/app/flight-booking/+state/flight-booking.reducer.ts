import { createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '../../entities/flight';
import { HttpErrorResponse } from '@angular/common/http';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: State;
}

export interface State {
  flights: Flight[];
  negativeList: number[];
  isLoadingFlights: boolean;
  loadFlightsError: HttpErrorResponse | null;
}

export const initialState: State = {
  flights: [],
  negativeList: [3, 4, 5],
  isLoadingFlights: false,
  loadFlightsError: null
};

export const reducer = createReducer(
  initialState,
  // on(FlightBookingActions.loadFlightBookings, (state) => state)

  on(FlightBookingActions.loadFlights, (state, action): State => {
    return { ...state, flights: [], isLoadingFlights: true, loadFlightsError: null };
  }),

  on(FlightBookingActions.loadFlightsError, (state, action): State => {
    const loadFlightsError = action.err;
    return { ...state, isLoadingFlights: false, loadFlightsError };
  }),

  on(FlightBookingActions.loadFlightsSuccess, (state, action): State => {
    const flights = action.flights;
    return { ...state, flights, isLoadingFlights: false };
  }),

  on(FlightBookingActions.updateFlight, (state, action): State => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);

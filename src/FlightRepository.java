public class FlightRepository {

    private Flight[] flights;
    private int size;

    public FlightRepository(int capacity) {

        flights = new Flight[capacity];
        size = 0;
    }

    public void addFlight(Flight flight) {

        if (size < flights.length) {

            flights[size] = flight;
            size++;
        }
    }

    public Flight getFlight(int index) {

        if (index < 0 || index >= size) {
            return null;
        }

        return flights[index];
    }

    public int size() {
        return size;
    }

    public Flight[] getFlights() {
        return flights;
    }
}

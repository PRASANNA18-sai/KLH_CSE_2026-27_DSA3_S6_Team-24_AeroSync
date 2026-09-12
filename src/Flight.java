public class Flight {

    private String flightId;
    private String airline;
    private String source;
    private String destination;
    private String aircraft;

    public Flight(String flightId,
                  String airline,
                  String source,
                  String destination,
                  String aircraft) {

        this.flightId = flightId;
        this.airline = airline;
        this.source = source;
        this.destination = destination;
        this.aircraft = aircraft;
    }

    public String getFlightId() {
        return flightId;
    }

    public String getAirline() {
        return airline;
    }

    public String getSource() {
        return source;
    }

    public String getDestination() {
        return destination;
    }

    public String getAircraft() {
        return aircraft;
    }

    public String getSearchText() {

        return flightId + " "
                + airline + " "
                + source + " "
                + destination + " "
                + aircraft;
    }

    @Override
    public String toString() {

        return "Flight ID : " + flightId +
                "\nAirline   : " + airline +
                "\nRoute     : " + source +
                " -> " + destination +
                "\nAircraft  : " + aircraft;
    }
}

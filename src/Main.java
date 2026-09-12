public class Main {

    public static void main(String[] args) {

        System.out.println("=================================");
        System.out.println("        AEROSYNC SYSTEM");
        System.out.println("=================================");

        FlightRepository repository =
                new FlightRepository(100);

        FlightLoader.loadFlights(
                "data/flights.txt",
                repository
        );

        System.out.println(
                "Flights Loaded : "
                        + repository.size());

        System.out.println();
        System.out.println("First Flight:");
        System.out.println(
                repository.getFlight(0));
    }
}

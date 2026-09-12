public class SearchEngine {

    private FlightRepository repository;

    public SearchEngine(FlightRepository repository) {
        this.repository = repository;
    }

    public void displayAllFlights() {

        System.out.println();
        System.out.println("========== FLIGHT REPOSITORY ==========");

        for (int i = 0; i < repository.size(); i++) {

            System.out.println();
            System.out.println(
                    repository.getFlight(i));
        }
    }

    public void basicSearch(String keyword) {

        System.out.println();
        System.out.println("========== BASIC SEARCH ==========");

        keyword = keyword.toLowerCase();

        int matches = 0;

        for (int i = 0; i < repository.size(); i++) {

            Flight flight =
                    repository.getFlight(i);

            String text =
                    flight.getSearchText().toLowerCase();

            if (text.indexOf(keyword) >= 0) {

                System.out.println();
                System.out.println(flight);

                matches++;
            }
        }

        System.out.println();
        System.out.println("Matches : " + matches);
    }
}

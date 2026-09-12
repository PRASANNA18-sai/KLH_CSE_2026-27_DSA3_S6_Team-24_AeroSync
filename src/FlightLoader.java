import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FlightLoader {

    public static void loadFlights(
            String filePath,
            FlightRepository repository) {

        try {

            BufferedReader reader =
                    new BufferedReader(
                            new FileReader(filePath));

            String line;

            while ((line = reader.readLine()) != null) {

                if (line.trim().isEmpty()) {
                    continue;
                }

                String[] parts = line.split("\\|");

                if (parts.length == 5) {

                    Flight flight =
                            new Flight(
                                    parts[0],
                                    parts[1],
                                    parts[2],
                                    parts[3],
                                    parts[4]
                            );

                    repository.addFlight(flight);
                }
            }

            reader.close();

        } catch (IOException e) {

            System.out.println(
                    "Error loading flight data: "
                    + e.getMessage());
        }
    }
}

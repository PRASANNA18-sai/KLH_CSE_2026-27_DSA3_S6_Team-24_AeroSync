import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner =
                new Scanner(System.in);

        System.out.println(
                "======================================");

        System.out.println(
                "              AEROSYNC");

        System.out.println(
                " Intelligent Aviation Search System");

        System.out.println(
                "======================================");

        FlightRepository repository =
                new FlightRepository(20);

        FlightLoader.loadFlights(
                "data/flights.txt",
                repository);

        System.out.println();

        System.out.println(
                "Flights Loaded : "
                        + repository.size());

        SearchEngine searchEngine =
                new SearchEngine(repository);

        while (true) {

            System.out.println();
            System.out.println(
                    "============== MENU ==============");

            System.out.println(
                    "1. Display Flights");

            System.out.println(
                    "2. Basic Flight Search");

            System.out.println(
                    "3. KMP Pattern Search");

            System.out.println(
                    "4. Naive Pattern Search");

            System.out.println(
                    "5. Rabin-Karp Search");

            System.out.println(
                    "6. Z Algorithm Search");

            System.out.println(
                    "7. Fuzzy Search");

            System.out.println(
                    "8. Compare Two Texts");

            System.out.println(
                    "9. Trie Autocomplete");

            System.out.println(
                    "10. Suffix Array Demo");

            System.out.println(
                    "11. TSP Route Optimization");

            System.out.println(
                    "0. Exit");

            System.out.print(
                    "Enter choice : ");

            String input =
                    scanner.nextLine();

            int choice;

            try {
                choice =
                        Integer.parseInt(input);

            } catch (NumberFormatException e) {

                System.out.println(
                        "Invalid choice.");

                continue;
            }

            if (choice == 0) {
                break;
            }

            switch (choice) {

                case 1:

                    searchEngine
                            .displayAllFlights();

                    break;

                case 2:

                    System.out.print(
                            "Enter keyword : ");

                    String basic =
                            scanner.nextLine();

                    searchEngine
                            .basicSearch(basic);

                    break;

                case 3:

                    runKMP(scanner, repository);

                    break;

                case 4:

                    runNaive(scanner, repository);

                    break;

                case 5:

                    runRabinKarp(
                            scanner,
                            repository);

                    break;

                case 6:

                    runZAlgorithm(
                            scanner,
                            repository);

                    break;

                case 7:

                    runFuzzySearch(
                            scanner,
                            repository);

                    break;

                case 8:

                    runSimilarity(scanner);

                    break;

                case 9:

                    runTrie(repository, scanner);

                    break;

                case 10:

                    runSuffixArray(scanner);

                    break;

                case 11:

                    runTSP();

                    break;

                default:

                    System.out.println(
                            "Invalid choice.");
            }
        }

        scanner.close();

        System.out.println();
        System.out.println(
                "AeroSync closed.");
    }

    private static void runNaive(
            Scanner scanner,
            FlightRepository repository) {

        System.out.print(
                "Enter pattern : ");

        String pattern =
                scanner.nextLine()
                        .toLowerCase();

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            int[] positions =
                    NaiveMatcher.search(
                            flight.getSearchText()
                                    .toLowerCase(),
                            pattern);

            if (positions.length > 0) {

                System.out.println();
                System.out.println(
                        flight);

                printPositions(positions);
            }
        }
    }

    private static void runKMP(
            Scanner scanner,
            FlightRepository repository) {

        System.out.print(
                "Enter pattern : ");

        String pattern =
                scanner.nextLine()
                        .toLowerCase();

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            int[] positions =
                    KMPMatcher.search(
                            flight.getSearchText()
                                    .toLowerCase(),
                            pattern);

            if (positions.length > 0) {

                System.out.println();
                System.out.println(flight);

                printPositions(positions);
            }
        }
    }

    private static void runRabinKarp(
            Scanner scanner,
            FlightRepository repository) {

        System.out.print(
                "Enter pattern : ");

        String pattern =
                scanner.nextLine()
                        .toLowerCase();

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            int[] positions =
                    RabinKarp.search(
                            flight.getSearchText()
                                    .toLowerCase(),
                            pattern);

            if (positions.length > 0) {

                System.out.println();
                System.out.println(flight);

                printPositions(positions);
            }
        }
    }

    private static void runZAlgorithm(
            Scanner scanner,
            FlightRepository repository) {

        System.out.print(
                "Enter pattern : ");

        String pattern =
                scanner.nextLine()
                        .toLowerCase();

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            int[] positions =
                    ZAlgorithm.search(
                            flight.getSearchText()
                                    .toLowerCase(),
                            pattern);

            if (positions.length > 0) {

                System.out.println();
                System.out.println(flight);

                printPositions(positions);
            }
        }
    }

    private static void runFuzzySearch(
            Scanner scanner,
            FlightRepository repository) {

        System.out.print(
                "Enter word : ");

        String word =
                scanner.nextLine()
                        .toLowerCase();

        System.out.println();
        System.out.println(
                "Fuzzy Results:");

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            String[] words =
                    flight.getSearchText()
                            .toLowerCase()
                            .split(" ");

            for (int j = 0;
                 j < words.length;
                 j++) {

                String clean =
                        words[j]
                                .replaceAll(
                                        "[^a-z0-9]",
                                        "");

                if (clean.length() == 0) {
                    continue;
                }

                int distance =
                        LevenshteinDistance
                                .distance(
                                        word,
                                        clean);

                if (distance <= 2) {

                    System.out.println(
                            clean +
                                    "  (distance = "
                                    + distance
                                    + ")");

                    System.out.println(
                            flight.getFlightId());
                }
            }
        }
    }

    private static void runSimilarity(
            Scanner scanner) {

        System.out.print(
                "Enter first text : ");

        String first =
                scanner.nextLine();

        System.out.print(
                "Enter second text : ");

        String second =
                scanner.nextLine();

        double similarity =
                SimilarityAnalyzer
                        .similarity(
                                first,
                                second);

        int local =
                SimilarityAnalyzer
                        .localSimilarity(
                                first,
                                second);

        System.out.println();

        System.out.println(
                "Global Similarity : "
                        + String.format(
                        "%.2f",
                        similarity * 100)
                        + "%");

        System.out.println(
                "Local Alignment Score : "
                        + local);
    }

    private static void runTrie(
            FlightRepository repository,
            Scanner scanner) {

        Trie trie =
                new Trie();

        for (int i = 0;
             i < repository.size();
             i++) {

            Flight flight =
                    repository.getFlight(i);

            trie.insert(flight.getSource());
            trie.insert(flight.getDestination());
            trie.insert(flight.getAirline());
        }

        System.out.print(
                "Enter prefix : ");

        String prefix =
                scanner.nextLine();

        trie.printSuggestions(prefix);
    }

    private static void runSuffixArray(
            Scanner scanner) {

        System.out.print(
                "Enter text : ");

        String text =
                scanner.nextLine();

        SuffixArray suffixArray =
                new SuffixArray(text);

        suffixArray.display();

        int[] array =
                suffixArray.getArray();

        int[] lcp =
                LCPArray.build(
                        text,
                        array);

        System.out.println();
        System.out.println(
                "LCP Array:");

        for (int i = 0;
             i < lcp.length;
             i++) {

            System.out.print(
                    lcp[i] + " ");
        }

        System.out.println();
    }

    private static void runTSP() {

        int[][] distance = {

                {0, 10, 15, 20},

                {10, 0, 35, 25},

                {15, 35, 0, 30},

                {20, 25, 30, 0}
        };

        int answer =
                BitmaskTSP.solve(distance);

        System.out.println();

        System.out.println(
                "Minimum airport route cost : "
                        + answer);
    }

    private static void printPositions(
            int[] positions) {

        System.out.print(
                "Positions : ");

        for (int i = 0;
             i < positions.length;
             i++) {

            System.out.print(
                    positions[i] + " ");
        }

        System.out.println();
        System.out.println(
                "Occurrences : "
                        + positions.length);
    }
}

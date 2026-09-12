public class SimilarityAnalyzer {

    public static int editDistance(
            String first,
            String second) {

        return LevenshteinDistance.distance(
                first.toLowerCase(),
                second.toLowerCase());
    }

    public static double similarity(
            String first,
            String second) {

        first = first.toLowerCase();
        second = second.toLowerCase();

        int distance =
                LevenshteinDistance.distance(
                        first,
                        second);

        int maximum =
                Math.max(
                        first.length(),
                        second.length());

        if (maximum == 0) {
            return 1.0;
        }

        return 1.0 -
                ((double) distance / maximum);
    }

    public static int localSimilarity(
            String first,
            String second) {

        return SmithWaterman.localAlignment(
                first.toLowerCase(),
                second.toLowerCase(),
                2,
                -1,
                -1);
    }
}

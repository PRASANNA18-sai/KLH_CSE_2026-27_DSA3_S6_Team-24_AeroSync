public class SmithWaterman {

    public static int localAlignment(
            String a,
            String b,
            int match,
            int mismatch,
            int gap) {

        int n = a.length();
        int m = b.length();

        int[][] dp =
                new int[n + 1][m + 1];

        int best = 0;

        for (int i = 1; i <= n; i++) {

            for (int j = 1; j <= m; j++) {

                int diagonal =
                        dp[i - 1][j - 1]
                                + (a.charAt(i - 1) ==
                                b.charAt(j - 1)
                                ? match
                                : mismatch);

                int up =
                        dp[i - 1][j] + gap;

                int left =
                        dp[i][j - 1] + gap;

                dp[i][j] =
                        Math.max(
                                0,
                                Math.max(
                                        diagonal,
                                        Math.max(
                                                up,
                                                left)));

                if (dp[i][j] > best) {
                    best = dp[i][j];
                }
            }
        }

        return best;
    }
}

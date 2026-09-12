public class NeedlemanWunsch {

    public static int align(
            String a,
            String b,
            int match,
            int mismatch,
            int gap) {

        int n = a.length();
        int m = b.length();

        int[][] dp =
                new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            dp[i][0] =
                    dp[i - 1][0] + gap;
        }

        for (int j = 1; j <= m; j++) {
            dp[0][j] =
                    dp[0][j - 1] + gap;
        }

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
                                diagonal,
                                Math.max(
                                        up,
                                        left));
            }
        }

        return dp[n][m];
    }
}

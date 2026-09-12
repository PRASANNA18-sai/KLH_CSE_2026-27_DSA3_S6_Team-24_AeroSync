public class DamerauLevenshtein {

    public static int distance(
            String a,
            String b) {

        int n = a.length();
        int m = b.length();

        int[][] dp =
                new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = i;
        }

        for (int j = 0; j <= m; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= n; i++) {

            for (int j = 1; j <= m; j++) {

                int cost =
                        a.charAt(i - 1) ==
                                b.charAt(j - 1)
                                ? 0
                                : 1;

                dp[i][j] =
                        Math.min(
                                dp[i - 1][j] + 1,
                                Math.min(
                                        dp[i][j - 1] + 1,
                                        dp[i - 1][j - 1]
                                                + cost));

                if (i > 1 && j > 1 &&
                        a.charAt(i - 1) ==
                                b.charAt(j - 2) &&
                        a.charAt(i - 2) ==
                                b.charAt(j - 1)) {

                    dp[i][j] =
                            Math.min(
                                    dp[i][j],
                                    dp[i - 2][j - 2]
                                            + 1);
                }
            }
        }

        return dp[n][m];
    }
}

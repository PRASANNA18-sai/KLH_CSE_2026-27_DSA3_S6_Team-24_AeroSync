public class WeightedEditDistance {

    public static int distance(
            String a,
            String b,
            int insertionCost,
            int deletionCost,
            int substitutionCost) {

        int n = a.length();
        int m = b.length();

        int[][] dp =
                new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {

            dp[i][0] =
                    dp[i - 1][0]
                            + deletionCost;
        }

        for (int j = 1; j <= m; j++) {

            dp[0][j] =
                    dp[0][j - 1]
                            + insertionCost;
        }

        for (int i = 1; i <= n; i++) {

            for (int j = 1; j <= m; j++) {

                int replacement =
                        a.charAt(i - 1) ==
                                b.charAt(j - 1)
                                ? 0
                                : substitutionCost;

                int insert =
                        dp[i][j - 1]
                                + insertionCost;

                int delete =
                        dp[i - 1][j]
                                + deletionCost;

                int replace =
                        dp[i - 1][j - 1]
                                + replacement;

                dp[i][j] =
                        Math.min(
                                insert,
                                Math.min(
                                        delete,
                                        replace));
            }
        }

        return dp[n][m];
    }
}

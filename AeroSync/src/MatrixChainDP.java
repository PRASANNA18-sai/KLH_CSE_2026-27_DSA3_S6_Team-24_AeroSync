public class MatrixChainDP {

    public static long minimumCost(
            int[] dimensions) {

        int n =
                dimensions.length - 1;

        long[][] dp =
                new long[n][n];

        for (int length = 2;
             length <= n;
             length++) {

            for (int i = 0;
                 i <= n - length;
                 i++) {

                int j =
                        i + length - 1;

                dp[i][j] =
                        Long.MAX_VALUE;

                for (int k = i;
                     k < j;
                     k++) {

                    long cost =
                            dp[i][k]
                                    + dp[k + 1][j]
                                    + (long) dimensions[i]
                                    * dimensions[k + 1]
                                    * dimensions[j + 1];

                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                    }
                }
            }
        }

        return dp[0][n - 1];
    }
}

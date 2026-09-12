public class BitmaskTSP {

    private static final int INF =
            1000000000;

    public static int solve(
            int[][] distance) {

        int n = distance.length;

        if (n > 20) {
            throw new IllegalArgumentException(
                    "Bitmask TSP supports small graphs.");
        }

        int totalMasks =
                1 << n;

        int[][] dp =
                new int[totalMasks][n];

        for (int mask = 0;
             mask < totalMasks;
             mask++) {

            for (int city = 0;
                 city < n;
                 city++) {

                dp[mask][city] = INF;
            }
        }

        dp[1][0] = 0;

        for (int mask = 1;
             mask < totalMasks;
             mask++) {

            for (int current = 0;
                 current < n;
                 current++) {

                if ((mask &
                        (1 << current)) == 0) {
                    continue;
                }

                if (dp[mask][current] ==
                        INF) {
                    continue;
                }

                for (int next = 0;
                     next < n;
                     next++) {

                    if ((mask &
                            (1 << next)) != 0) {
                        continue;
                    }

                    int newMask =
                            mask |
                                    (1 << next);

                    int newCost =
                            dp[mask][current]
                                    + distance[current][next];

                    if (newCost <
                            dp[newMask][next]) {

                        dp[newMask][next] =
                                newCost;
                    }
                }
            }
        }

        int fullMask =
                totalMasks - 1;

        int answer = INF;

        for (int city = 1;
             city < n;
             city++) {

            int routeCost =
                    dp[fullMask][city]
                            + distance[city][0];

            if (routeCost < answer) {
                answer = routeCost;
            }
        }

        return answer;
    }
}

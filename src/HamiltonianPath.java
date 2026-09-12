public class HamiltonianPath {

    public static boolean exists(
            int[][] graph) {

        int n = graph.length;

        if (n > 20) {
            return false;
        }

        int total =
                1 << n;

        boolean[][] dp =
                new boolean[total][n];

        for (int i = 0; i < n; i++) {
            dp[1 << i][i] = true;
        }

        for (int mask = 1;
             mask < total;
             mask++) {

            for (int current = 0;
                 current < n;
                 current++) {

                if (!dp[mask][current]) {
                    continue;
                }

                for (int next = 0;
                     next < n;
                     next++) {

                    if ((mask &
                            (1 << next)) != 0) {
                        continue;
                    }

                    if (graph[current][next] == 1) {

                        dp[mask |
                                (1 << next)][next] =
                                true;
                    }
                }
            }
        }

        int full =
                total - 1;

        for (int i = 0; i < n; i++) {

            if (dp[full][i]) {
                return true;
            }
        }

        return false;
    }
}

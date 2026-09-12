public class SOSDP {

    public static int[] subsetSum(
            int[] values,
            int bits) {

        int size =
                1 << bits;

        int[] dp =
                new int[size];

        for (int i = 0;
             i < values.length &&
                     i < size;
             i++) {

            dp[i] = values[i];
        }

        for (int bit = 0;
             bit < bits;
             bit++) {

            for (int mask = 0;
                 mask < size;
                 mask++) {

                if ((mask &
                        (1 << bit)) != 0) {

                    dp[mask] +=
                            dp[mask ^
                                    (1 << bit)];
                }
            }
        }

        return dp;
    }
}

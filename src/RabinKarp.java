public class RabinKarp {

    private static final long MOD1 = 1000000007L;
    private static final long MOD2 = 1000000009L;

    private static final long BASE = 911382323L;

    public static int[] search(
            String text,
            String pattern) {

        if (pattern.length() == 0 ||
                pattern.length() > text.length()) {

            return new int[0];
        }

        int m = pattern.length();
        int n = text.length();

        long patternHash1 = 0;
        long patternHash2 = 0;

        long windowHash1 = 0;
        long windowHash2 = 0;

        long highPower1 = 1;
        long highPower2 = 1;

        for (int i = 0; i < m - 1; i++) {

            highPower1 =
                    (highPower1 * BASE) % MOD1;

            highPower2 =
                    (highPower2 * BASE) % MOD2;
        }

        for (int i = 0; i < m; i++) {

            patternHash1 =
                    (patternHash1 * BASE
                            + pattern.charAt(i))
                            % MOD1;

            patternHash2 =
                    (patternHash2 * BASE
                            + pattern.charAt(i))
                            % MOD2;

            windowHash1 =
                    (windowHash1 * BASE
                            + text.charAt(i))
                            % MOD1;

            windowHash2 =
                    (windowHash2 * BASE
                            + text.charAt(i))
                            % MOD2;
        }

        int[] positions =
                new int[n];

        int count = 0;

        for (int i = 0;
             i <= n - m;
             i++) {

            if (patternHash1 == windowHash1 &&
                    patternHash2 == windowHash2) {

                boolean match = true;

                for (int j = 0; j < m; j++) {

                    if (text.charAt(i + j) !=
                            pattern.charAt(j)) {

                        match = false;
                        break;
                    }
                }

                if (match) {
                    positions[count++] = i;
                }
            }

            if (i < n - m) {

                windowHash1 =
                        (windowHash1
                                - text.charAt(i)
                                * highPower1 % MOD1
                                + MOD1)
                                % MOD1;

                windowHash1 =
                        (windowHash1 * BASE
                                + text.charAt(i + m))
                                % MOD1;

                windowHash2 =
                        (windowHash2
                                - text.charAt(i)
                                * highPower2 % MOD2
                                + MOD2)
                                % MOD2;

                windowHash2 =
                        (windowHash2 * BASE
                                + text.charAt(i + m))
                                % MOD2;
            }
        }

        int[] result = new int[count];

        for (int i = 0; i < count; i++) {
            result[i] = positions[i];
        }

        return result;
    }
}

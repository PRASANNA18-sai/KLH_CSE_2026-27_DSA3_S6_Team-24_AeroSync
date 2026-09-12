public class ZAlgorithm {

    public static int[] search(
            String text,
            String pattern) {

        if (pattern.length() == 0) {
            return new int[0];
        }

        String combined =
                pattern + "$" + text;

        int[] z =
                buildZ(combined);

        int[] positions =
                new int[text.length()];

        int count = 0;

        for (int i = pattern.length() + 1;
             i < combined.length();
             i++) {

            if (z[i] == pattern.length()) {

                positions[count++] =
                        i - pattern.length() - 1;
            }
        }

        int[] result = new int[count];

        for (int i = 0; i < count; i++) {
            result[i] = positions[i];
        }

        return result;
    }

    public static int[] buildZ(String text) {

        int[] z =
                new int[text.length()];

        int left = 0;
        int right = 0;

        for (int i = 1;
             i < text.length();
             i++) {

            if (i <= right) {
                z[i] =
                        Math.min(
                                right - i + 1,
                                z[i - left]);
            }

            while (i + z[i] < text.length() &&
                    text.charAt(z[i]) ==
                            text.charAt(i + z[i])) {

                z[i]++;
            }

            if (i + z[i] - 1 > right) {

                left = i;
                right = i + z[i] - 1;
            }
        }

        return z;
    }
}

public class KMPMatcher {

    public static int[] search(
            String text,
            String pattern) {

        if (pattern.length() == 0 ||
                pattern.length() > text.length()) {

            return new int[0];
        }

        int[] lps =
                buildLPS(pattern);

        int[] positions =
                new int[text.length()];

        int count = 0;

        int i = 0;
        int j = 0;

        while (i < text.length()) {

            if (text.charAt(i) ==
                    pattern.charAt(j)) {

                i++;
                j++;

                if (j == pattern.length()) {

                    positions[count++] =
                            i - j;

                    j = lps[j - 1];
                }

            } else {

                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        int[] result = new int[count];

        for (i = 0; i < count; i++) {
            result[i] = positions[i];
        }

        return result;
    }

    public static int[] buildLPS(
            String pattern) {

        int[] lps =
                new int[pattern.length()];

        int length = 0;
        int i = 1;

        while (i < pattern.length()) {

            if (pattern.charAt(i) ==
                    pattern.charAt(length)) {

                length++;
                lps[i] = length;
                i++;

            } else {

                if (length != 0) {
                    length =
                            lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        return lps;
    }
}

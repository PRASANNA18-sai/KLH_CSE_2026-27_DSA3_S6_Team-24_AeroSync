public class NaiveMatcher {

    public static int[] search(
            String text,
            String pattern) {

        if (pattern.length() == 0 ||
                pattern.length() > text.length()) {

            return new int[0];
        }

        int[] positions =
                new int[text.length()];

        int count = 0;

        for (int i = 0;
             i <= text.length() - pattern.length();
             i++) {

            int j = 0;

            while (j < pattern.length() &&
                    text.charAt(i + j) ==
                            pattern.charAt(j)) {

                j++;
            }

            if (j == pattern.length()) {
                positions[count++] = i;
            }
        }

        int[] result = new int[count];

        for (int i = 0; i < count; i++) {
            result[i] = positions[i];
        }

        return result;
    }
}

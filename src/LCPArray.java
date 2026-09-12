public class LCPArray {

    public static int[] build(
            String text,
            int[] suffixArray) {

        int n = text.length();

        int[] rank =
                new int[n];

        int[] lcp =
                new int[n];

        for (int i = 0; i < n; i++) {

            rank[suffixArray[i]] = i;
        }

        int k = 0;

        for (int i = 0; i < n; i++) {

            if (rank[i] == n - 1) {

                k = 0;
                continue;
            }

            int j =
                    suffixArray[
                            rank[i] + 1];

            while (i + k < n &&
                    j + k < n &&
                    text.charAt(i + k) ==
                            text.charAt(j + k)) {

                k++;
            }

            lcp[rank[i]] = k;

            if (k > 0) {
                k--;
            }
        }

        return lcp;
    }
}

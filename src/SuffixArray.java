public class SuffixArray {

    private String text;
    private IntegerSuffix[] suffixes;

    private static class IntegerSuffix {

        int index;
        int rank;
        int nextRank;

        IntegerSuffix(int index) {
            this.index = index;
        }
    }

    public SuffixArray(String text) {

        this.text = text;
        build();
    }

    private void build() {

        int n = text.length();

        suffixes =
                new IntegerSuffix[n];

        for (int i = 0; i < n; i++) {

            suffixes[i] =
                    new IntegerSuffix(i);

            suffixes[i].rank =
                    text.charAt(i);
        }

        int[] tempRank =
                new int[n];

        for (int k = 1; k < n; k *= 2) {

            for (int i = 0; i < n; i++) {

                int next =
                        i + k;

                suffixes[i].nextRank =
                        next < n
                                ? suffixes[next].rank
                                : -1;
            }

            quickSort(0, n - 1);

            tempRank[0] = 0;

            for (int i = 1; i < n; i++) {

                if (compare(
                        suffixes[i - 1],
                        suffixes[i]) < 0) {

                    tempRank[i] =
                            tempRank[i - 1] + 1;

                } else {

                    tempRank[i] =
                            tempRank[i - 1];
                }
            }

            for (int i = 0; i < n; i++) {

                suffixes[i].rank =
                        tempRank[i];
            }

            if (tempRank[n - 1] ==
                    n - 1) {

                break;
            }
        }
    }

    private int compare(
            IntegerSuffix a,
            IntegerSuffix b) {

        if (a.rank != b.rank) {
            return a.rank - b.rank;
        }

        return a.nextRank - b.nextRank;
    }

    private void quickSort(
            int low,
            int high) {

        if (low >= high) {
            return;
        }

        int i = low;
        int j = high;

        IntegerSuffix pivot =
                suffixes[(low + high) / 2];

        while (i <= j) {

            while (compare(
                    suffixes[i],
                    pivot) < 0) {
                i++;
            }

            while (compare(
                    suffixes[j],
                    pivot) > 0) {
                j--;
            }

            if (i <= j) {

                IntegerSuffix temp =
                        suffixes[i];

                suffixes[i] =
                        suffixes[j];

                suffixes[j] =
                        temp;

                i++;
                j--;
            }
        }

        if (low < j) {
            quickSort(low, j);
        }

        if (i < high) {
            quickSort(i, high);
        }
    }

    public int[] getArray() {

        int[] result =
                new int[suffixes.length];

        for (int i = 0;
             i < suffixes.length;
             i++) {

            result[i] =
                    suffixes[i].index;
        }

        return result;
    }

    public void display() {

        int[] array =
                getArray();

        System.out.println(
                "Suffix Array:");

        for (int i = 0;
             i < array.length;
             i++) {

            System.out.println(
                    array[i] + " : "
                            + text.substring(
                            array[i]));
        }
    }
}

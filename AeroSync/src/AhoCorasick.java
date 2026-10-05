public class AhoCorasick {

    private static final int ALPHABET = 128;

    private static class Node {

        Node[] next;
        Node fail;
        boolean output;

        Node() {

            next = new Node[ALPHABET];
            fail = null;
            output = false;
        }
    }

    private Node root;

    public AhoCorasick() {
        root = new Node();
    }

    public void addPattern(String pattern) {

        pattern =
                pattern.toLowerCase();

        Node current = root;

        for (int i = 0;
             i < pattern.length();
             i++) {

            char c = pattern.charAt(i);

            if (c >= ALPHABET) {
                continue;
            }

            if (current.next[c] == null) {

                current.next[c] =
                        new Node();
            }

            current =
                    current.next[c];
        }

        current.output = true;
    }

    public void buildFailureLinks() {

        Node[] queue =
                new Node[10000];

        int front = 0;
        int rear = 0;

        root.fail = root;

        for (int i = 0;
             i < ALPHABET;
             i++) {

            if (root.next[i] != null) {

                root.next[i].fail = root;

                queue[rear++] =
                        root.next[i];
            }
        }

        while (front < rear) {

            Node current =
                    queue[front++];

            for (int c = 0;
                 c < ALPHABET;
                 c++) {

                Node child =
                        current.next[c];

                if (child == null) {
                    continue;
                }

                Node fallback =
                        current.fail;

                while (fallback != root &&
                        fallback.next[c] == null) {

                    fallback =
                            fallback.fail;
                }

                if (fallback.next[c] != null &&
                        fallback.next[c] != child) {

                    child.fail =
                            fallback.next[c];

                } else {

                    child.fail = root;
                }

                if (child.fail.output) {
                    child.output = true;
                }

                queue[rear++] = child;
            }
        }
    }

    public int countMatches(
            String text) {

        text =
                text.toLowerCase();

        Node current = root;

        int matches = 0;

        for (int i = 0;
             i < text.length();
             i++) {

            char c = text.charAt(i);

            if (c >= ALPHABET) {
                continue;
            }

            while (current != root &&
                    current.next[c] == null) {

                current =
                        current.fail;
            }

            if (current.next[c] != null) {

                current =
                        current.next[c];

            } else {

                current = root;
            }

            if (current.output) {
                matches++;
            }
        }

        return matches;
    }
}
